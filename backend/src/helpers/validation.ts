import { Response } from "express";
import { z } from "zod";

export const validateRequest = <T>(
  schema: z.ZodType<T>,
  body: unknown,
  res: Response,
): T | null => {
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
    return null;
  }

  return parsed.data;
};
