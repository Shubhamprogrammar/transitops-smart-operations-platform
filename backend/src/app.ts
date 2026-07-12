import express from "express";
import cors from "cors";
import { router } from "./routes";
import { isAppError } from "./helpers/errors";
import { requestLogger, logger } from "./utils/logger";

export const app = express();

app.use(cors(({origin: ["http://localhost:3000", "https://transitops-smart-transport-operations.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })));
app.use(express.json());

// HTTP request logging
app.use(requestLogger);

app.use("/api", router);

// 404 handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (isAppError(error)) {
      logger.warn(`AppError: ${error.message}`, {
        statusCode: error.statusCode,
        stack: error.stack,
      });
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
      return;
    }

    const message =
      error instanceof Error ? error.message : "Internal server error";

    logger.error(`Unhandled error: ${message}`, {
      error: error instanceof Error ? { stack: error.stack } : {},
    });

    res.status(500).json({ success: false, message });
  },
);
