import { EstadoReserva } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { assertSlotAvailable } from "./availability.service.js";
import { createPreferenceForReservation } from "./payment.service.js";
import { AppError } from "../middleware/errorHandler.js";

export interface CreateReservationInput {
  nombre: string;
  correo: string;
  telefono: string;
  tratamientoId: string;
  fecha: string;
  hora: string;
  comentarios?: string;
}

export async function createReservation(input: CreateReservationInput) {
  const tratamiento = await prisma.tratamiento.findUnique({
    where: { id: input.tratamientoId },
  });

  if (!tratamiento) {
    throw new AppError(404, "Tratamiento no encontrado");
  }

  if (Number(tratamiento.precio) <= 0) {
    throw new AppError(
      400,
      "Este tratamiento no admite pago en línea. Contáctanos por WhatsApp."
    );
  }

  await assertSlotAvailable(input.fecha, input.hora);

  const fechaDate = new Date(`${input.fecha}T12:00:00.000Z`);

  const clienteRecord = await prisma.cliente.upsert({
    where: { correo: input.correo.toLowerCase() },
    create: {
      nombre: input.nombre,
      correo: input.correo.toLowerCase(),
      telefono: input.telefono,
    },
    update: {
      nombre: input.nombre,
      telefono: input.telefono,
    },
  });

  const reserva = await prisma.reserva.create({
    data: {
      clienteId: clienteRecord.id,
      tratamientoId: input.tratamientoId,
      fecha: fechaDate,
      hora: input.hora,
      comentarios: input.comentarios ?? null,
      estado: EstadoReserva.pendiente,
      pago: {
        create: {
          monto: tratamiento.precio,
          estado: "pendiente",
        },
      },
    },
    include: {
      cliente: true,
      tratamiento: true,
    },
  });

  const payment = await createPreferenceForReservation(reserva.id);

  return {
    reserva: {
      id: reserva.id,
      fecha: input.fecha,
      hora: reserva.hora,
      estado: reserva.estado,
      cliente: {
        id: reserva.cliente.id,
        nombre: reserva.cliente.nombre,
        correo: reserva.cliente.correo,
      },
      tratamiento: {
        id: reserva.tratamiento.id,
        nombre: reserva.tratamiento.nombre,
        precio: Number(reserva.tratamiento.precio),
      },
    },
    payment,
  };
}

export async function getReservationById(id: string) {
  const reserva = await prisma.reserva.findUnique({
    where: { id },
    include: {
      cliente: true,
      tratamiento: true,
      pago: true,
    },
  });

  if (!reserva) {
    throw new AppError(404, "Reserva no encontrada");
  }

  return {
    id: reserva.id,
    fecha: reserva.fecha.toISOString().split("T")[0],
    hora: reserva.hora,
    estado: reserva.estado,
    comentarios: reserva.comentarios,
    cliente: {
      nombre: reserva.cliente.nombre,
      correo: reserva.cliente.correo,
      telefono: reserva.cliente.telefono,
    },
    tratamiento: {
      id: reserva.tratamiento.id,
      nombre: reserva.tratamiento.nombre,
      precio: Number(reserva.tratamiento.precio),
    },
    pago: reserva.pago
      ? {
          estado: reserva.pago.estado,
          monto: Number(reserva.pago.monto),
        }
      : null,
  };
}
