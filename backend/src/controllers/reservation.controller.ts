import type { Request, Response, NextFunction } from "express";
import {
  createReservation,
  getReservationById,
} from "../services/reservation.service.js";

export async function postReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await createReservation(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await getReservationById(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
