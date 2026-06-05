import type { Request, Response, NextFunction } from "express";

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") return stripHtml(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitizeValue(v)])
    );
  }
  return value;
}

export function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }
  next();
}
