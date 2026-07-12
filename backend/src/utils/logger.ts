import winston from "winston";
import { env } from "../config/env";

// Helper to sanitize metadata for JSON serialization (Error objects lose their props otherwise)
const sanitizeMeta = (meta: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(meta).map(([key, value]) => [
      key,
      value instanceof Error
        ? { message: value.message, stack: value.stack }
        : value,
    ]),
  );

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  env.nodeEnv === "production"
    ? winston.format.json()
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, stack, ...meta }) => {
            const sanitized = sanitizeMeta(meta as Record<string, unknown>);
            const metaStr = Object.keys(sanitized).length
              ? ` ${JSON.stringify(sanitized)}`
              : "";
            const stackStr = stack ? `\n${stack}` : "";
            return `${timestamp} [${level}]: ${message}${metaStr}${stackStr}`;
          },
        ),
      ),
);

export const logger = winston.createLogger({
  level: env.nodeEnv === "production" ? "info" : "debug",
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
});

/**
 * Express middleware to log incoming HTTP requests.
 * Logs method, URL, status code, response time, and content length.
 */
export const requestLogger = (
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction,
): void => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";

    logger.log(level, `${req.method} ${req.originalUrl}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.getHeader("content-length") || 0,
      userAgent: req.headers["user-agent"] || "-",
      ip: req.ip || req.socket.remoteAddress,
    });
  });

  next();
};
