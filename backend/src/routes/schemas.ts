import { z } from "zod";
import { TIME_SLOTS } from "../types/index.js";

const timeSlotSchema = z.enum(TIME_SLOTS);

export const createReservationSchema = z.object({
  nombre: z.string().min(3).max(120),
  correo: z.string().email().max(255),
  telefono: z.string().min(10).max(20),
  tratamientoId: z.string().min(1).max(20),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato: YYYY-MM-DD"),
  hora: timeSlotSchema,
  comentarios: z.string().max(500).optional(),
});

export const createPreferenceSchema = z.object({
  clienteId: z.string().uuid(),
  tratamientoId: z.string().min(1),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hora: timeSlotSchema,
});

export const availabilityQuerySchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
