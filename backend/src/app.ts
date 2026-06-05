import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { sanitizeBody } from "./middleware/sanitize.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((o) => o.trim()),
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "100kb",
    verify: (req, _res, buf) => {
      (req as express.Request & { rawBody?: Buffer }).rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(sanitizeBody);

app.use("/api", routes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Cataleya API listening on http://localhost:${env.PORT}`);
});

export default app;
