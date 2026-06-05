import Link from "next/link";
import { CheckCircle2, Calendar, Clock, Sparkles } from "lucide-react";
import { fetchReservation } from "@/lib/api-server";

interface PageProps {
  searchParams: Promise<{ reserva?: string; pending?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const reservaId = params.reserva;

  let reserva = null;
  if (reservaId) {
    reserva = await fetchReservation(reservaId);
  }

  const isPending = params.pending === "1" || reserva?.estado === "pendiente";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-light/50 dark:bg-black-soft/30">
      <div className="gradient-border max-w-lg w-full p-8 md:p-12 text-center">
        <CheckCircle2 className="mx-auto h-20 w-20 text-olive" />
        <h1 className="mt-6 font-display text-3xl font-semibold">
          {isPending
            ? "Pago en proceso"
            : "Tu cita ha sido reservada exitosamente"}
        </h1>

        {reserva ? (
          <div className="mt-8 space-y-4 text-left rounded-2xl glass p-6">
            <p className="text-sm text-gray-text">Detalles de tu reserva</p>
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-purple shrink-0" />
              <div>
                <p className="text-xs text-gray-text">Tratamiento</p>
                <p className="font-medium">{reserva.tratamiento.nombre}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple shrink-0" />
              <div>
                <p className="text-xs text-gray-text">Fecha</p>
                <p className="font-medium">{reserva.fecha}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-olive shrink-0" />
              <div>
                <p className="text-xs text-gray-text">Hora</p>
                <p className="font-medium">{reserva.hora}</p>
              </div>
            </div>
            <p className="text-sm pt-2 border-t border-purple/10">
              <span className="text-gray-text">Nombre: </span>
              {reserva.cliente.nombre}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-gray-text">
            Gracias por tu pago. Te enviaremos confirmación por correo.
          </p>
        )}

        {isPending && (
          <p className="mt-4 text-sm text-gray-text">
            Estamos confirmando tu pago. Recibirás un correo cuando se apruebe.
          </p>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-purple px-8 py-4 text-lg font-medium text-white shadow-lg shadow-purple/25 hover:bg-purple-dark transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
