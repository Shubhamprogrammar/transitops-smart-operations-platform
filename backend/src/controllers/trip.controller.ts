import { Request, Response, NextFunction } from "express";
import { createTripSchema, CreateTripInput } from "../validators/trip.validator";
import { createTrip } from "../services/trip.service";

const VALIDATION_ERRORS: Record<string, number> = {
  "Vehicle not found": 404,
  "Driver not found": 404,
  "Vehicle not available": 400,
  "Driver not available": 400,
  "Driver license expired": 400,
  "Cargo exceeds vehicle capacity": 400,
};

export const createTripHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsed = createTripSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data: CreateTripInput = parsed.data;
    const trip = await createTrip(data);

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    if (error instanceof Error) {
      const status = VALIDATION_ERRORS[error.message];
      if (status) {
        res.status(status).json({ message: error.message });
        return;
      }
    }
    next(error);
  }
};
