import type { Request, Response, NextFunction } from "express";
import {
  createPreferenceByIds,
  handlePaymentWebhook,
} from "../services/payment.service.js";

export async function postCreatePreference(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await createPreferenceByIds(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function postWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const topic = (req.query.type as string) ?? req.body?.type;
    const id =
      (req.query["data.id"] as string) ??
      req.body?.data?.id ??
      req.body?.id;

    if (topic === "payment" || req.body?.action?.includes("payment")) {
      await handlePaymentWebhook({ id, type: topic, action: req.body?.action });
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("[Webhook]", err);
    res.status(200).send("OK");
  }
}
