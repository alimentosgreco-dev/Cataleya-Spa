import { EstadoPago, EstadoReserva } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { preferenceClient } from "../config/mercadopago.js";
import { env } from "../config/env.js";
import { AppError } from "../middleware/errorHandler.js";

function mapMpStatus(status: string | undefined): EstadoPago {
  switch (status) {
    case "approved":
      return EstadoPago.aprobado;
    case "rejected":
      return EstadoPago.rechazado;
    case "cancelled":
      return EstadoPago.cancelado;
    default:
      return EstadoPago.pendiente;
  }
}

export async function createPreferenceForReservation(reservaId: string) {
  const reserva = await prisma.reserva.findUnique({
    where: { id: reservaId },
    include: {
      cliente: true,
      tratamiento: true,
      pago: true,
    },
  });

  if (!reserva) {
    throw new AppError(404, "Reserva no encontrada");
  }

  if (!reserva.tratamiento.precio) {
    throw new AppError(400, "Tratamiento sin precio definido");
  }

  const monto = Number(reserva.tratamiento.precio);
  if (monto <= 0) {
    throw new AppError(400, "El tratamiento requiere precio fijo para pago en línea");
  }

  const payload = {
  items: [
    {
      id: reserva.tratamientoId,
      title: reserva.tratamiento.nombre.slice(0, 256),
      quantity: 1,
      unit_price: monto,
      currency_id: "MXN",
    },
  ],
  payer: {
    name: reserva.cliente.nombre,
    email: reserva.cliente.correo,
  },
  external_reference: reserva.id,
  back_urls: {
    success: `${env.FRONTEND_URL}/success`,
    failure: `${env.FRONTEND_URL}/error`,
    pending: `${env.FRONTEND_URL}/success?pending=1`,
  },
  //auto_return: "approved",
  notification_url: `${env.BACKEND_URL}/api/payments/webhook`,
};

console.log("MP PAYLOAD:");
console.log(JSON.stringify(payload, null, 2));

const preference = await preferenceClient.create({
  body: payload,
});
  const preferenceId = preference.id;
  const initPoint = preference.init_point ?? preference.sandbox_init_point;

  if (!preferenceId || !initPoint) {
    throw new AppError(502, "No se pudo crear la preferencia de Mercado Pago");
  }

  await prisma.pago.upsert({
    where: { reservaId: reserva.id },
    create: {
      reservaId: reserva.id,
      preferenceId: String(preferenceId),
      monto,
      estado: EstadoPago.pendiente,
    },
    update: {
      preferenceId: String(preferenceId),
      monto,
    },
  });

  return {
    preference_id: preferenceId,
    init_point: initPoint,
  };
}

export async function createPreferenceByIds(input: {
  clienteId: string;
  tratamientoId: string;
  fecha: string;
  hora: string;
}) {
  const reserva = await prisma.reserva.findFirst({
    where: {
      clienteId: input.clienteId,
      tratamientoId: input.tratamientoId,
      fecha: new Date(`${input.fecha}T12:00:00.000Z`),
      hora: input.hora,
      estado: EstadoReserva.pendiente,
    },
    orderBy: { id: "desc" },
  });

  if (!reserva) {
    throw new AppError(404, "Reserva pendiente no encontrada");
  }

  return createPreferenceForReservation(reserva.id);
}

export async function handlePaymentWebhook(data: {
  id?: string | number;
  type?: string;
  action?: string;
}) {
  if (!data.id) return { processed: false };

  const paymentId = String(data.id);

  const { paymentClient } = await import("../config/mercadopago.js");
  const payment = await paymentClient.get({ id: paymentId });

  const reservaId = payment.external_reference;
  if (!reservaId) return { processed: false };

  const estadoPago = mapMpStatus(payment.status);

  await prisma.$transaction(async (tx) => {
    await tx.pago.updateMany({
      where: { reservaId },
      data: {
        paymentId,
        estado: estadoPago,
        fechaPago: estadoPago === EstadoPago.aprobado ? new Date() : null,
      },
    });

    if (estadoPago === EstadoPago.aprobado) {
      await tx.reserva.update({
        where: { id: reservaId },
        data: { estado: EstadoReserva.pagado },
      });
    } else if (
      estadoPago === EstadoPago.rechazado ||
      estadoPago === EstadoPago.cancelado
    ) {
      await tx.reserva.update({
        where: { id: reservaId },
        data: { estado: EstadoReserva.cancelado },
      });
    }
  });

  return { processed: true, reservaId, estado: estadoPago };
}
