import type { Request, Response, NextFunction } from "express";
import { listTreatments } from "../services/treatment.service.js";

export async function getTreatments(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const treatments = await listTreatments();
    res.json({ treatments });
  } catch (err) {
    next(err);
  }
}
