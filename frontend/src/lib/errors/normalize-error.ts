import { ApiError } from "./api-error";
import { AppError } from "./app-error";

export function normalizeError(error: unknown): AppError {
  if (error instanceof ApiError) {
    return new AppError(error.message, error.code);
  }

  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError("An unexpected error occurred.");
}
