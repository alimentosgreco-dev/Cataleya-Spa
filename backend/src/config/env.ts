import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  MP_ACCESS_TOKEN: z.string().min(1, "MP_ACCESS_TOKEN es requerido"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  BACKEND_URL: z.string().url().default("http://localhost:4000"),
  JWT_SECRET: z.string().min(16).default("dev_jwt_secret_change_me"),
  CORS_ORIGIN: z
    .string()
    .default("http://localhost:3000,http://localhost:3001"),
});

export const env = envSchema.parse(process.env);
