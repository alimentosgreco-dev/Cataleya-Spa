import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validateBody, validateQuery } from "../middleware/validate.js";
import {
  createReservationSchema,
  createPreferenceSchema,
  availabilityQuerySchema,
} from "./schemas.js";
import { postReservation, getReservation } from "../controllers/reservation.controller.js";
import { postCreatePreference, postWebhook } from "../controllers/payment.controller.js";
import { getAvailability } from "../controllers/availability.controller.js";
import { getTreatments } from "../controllers/treatment.controller.js";

const router = Router();

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: "Demasiadas solicitudes. Intenta más tarde." },
});

const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "cataleya-api" });
});

router.get("/treatments", getTreatments);

router.get(
  "/availability",
  bookingLimiter,
  validateQuery(availabilityQuerySchema),
  getAvailability
);

router.post(
  "/reservations",
  bookingLimiter,
  validateBody(createReservationSchema),
  postReservation
);

router.get("/reservations/:id", getReservation);

router.post(
  "/payments/create-preference",
  bookingLimiter,
  validateBody(createPreferenceSchema),
  postCreatePreference
);

router.post("/payments/webhook", webhookLimiter, postWebhook);

export default router;
