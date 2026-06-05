import type { Request, Response, NextFunction } from "express";
import { getAvailableSlots } from "../services/availability.service.js";

export async function getAvailability(
  req: Request & { validatedQuery?: { fecha: string } },
  res: Response,
  next: NextFunction
) {
  try {
    const fecha =
      (req as Request & { validatedQuery?: { fecha: string } }).validatedQuery
        ?.fecha ?? (req.query.fecha as string);
    const slots = await getAvailableSlots(fecha);
    res.json({ fecha, slots });
  } catch (err) {
    next(err);
  }
}
