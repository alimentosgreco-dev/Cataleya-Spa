import { EstadoReserva } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { TIME_SLOTS } from "../types/index.js";
import { AppError } from "../middleware/errorHandler.js";

function parseDateOnly(fecha: string): Date {
  const d = new Date(`${fecha}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) {
    throw new AppError(400, "Fecha inválida");
  }
  return d;
}

function isSunday(date: Date): boolean {
  return date.getUTCDay() === 0;
}

function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const check = new Date(date);
  check.setUTCHours(0, 0, 0, 0);
  return check < today;
}

export async function getAvailableSlots(fecha: string): Promise<string[]> {
  const date = parseDateOnly(fecha);

  if (isSunday(date)) {
    return [];
  }

  if (isPastDate(date)) {
    return [];
  }

  const booked = await prisma.reserva.findMany({
    where: {
      fecha: date,
      estado: EstadoReserva.pagado,
    },
    select: { hora: true },
  });

  const taken = new Set(booked.map((r) => r.hora));
  return TIME_SLOTS.filter((slot) => !taken.has(slot));
}

export async function assertSlotAvailable(fecha: string, hora: string): Promise<void> {
  if (!TIME_SLOTS.includes(hora as (typeof TIME_SLOTS)[number])) {
    throw new AppError(400, "Horario no válido. Horarios: 10:00 - 17:00");
  }

  const available = await getAvailableSlots(fecha);
  if (!available.includes(hora)) {
    throw new AppError(409, "Este horario ya no está disponible");
  }
}
