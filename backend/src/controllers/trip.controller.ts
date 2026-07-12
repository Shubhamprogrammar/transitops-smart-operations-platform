import { Request, Response, NextFunction } from "express";
import { createTripSchema, CreateTripInput } from "../validators/trip.validator";
import {
  createTrip,
  dispatchTrip,
  completeTrip,
  cancelTrip,
  getAllTrips,
  getTripById,
} from "../services/trip.service";

const VALIDATION_ERRORS: Record<string, number> = {
  "Vehicle not found": 404,
  "Driver not found": 404,
  "Vehicle not available": 400,
  "Driver not available": 400,
  "Driver license expired": 400,
  "Cargo exceeds vehicle capacity": 400,
  "Trip not found": 404,
  "Only draft trips can be dispatched": 400,
  "Only dispatched or active trips can be completed": 400,
  "Completed trips cannot be cancelled": 400,
};

// ─── Create Trip ────────────────────────────────────────────────────────

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

// ─── Dispatch Trip ──────────────────────────────────────────────────────

export const dispatchTripHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tripId = Number(req.params.id);

    if (isNaN(tripId)) {
      res.status(400).json({ success: false, message: "Invalid trip ID" });
      return;
    }

    const trip = await dispatchTrip(tripId);

    res.json({ success: true, data: trip });
  } catch (error) {
    if (error instanceof Error) {
      const status = VALIDATION_ERRORS[error.message];
      if (status) {
        res.status(status).json({ success: false, message: error.message });
        return;
      }
    }
    next(error);
  }
};

// ─── Complete Trip ──────────────────────────────────────────────────────

export const completeTripHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tripId = Number(req.params.id);

    if (isNaN(tripId)) {
      res.status(400).json({ success: false, message: "Invalid trip ID" });
      return;
    }

    const trip = await completeTrip(tripId);

    res.json({ success: true, data: trip });
  } catch (error) {
    if (error instanceof Error) {
      const status = VALIDATION_ERRORS[error.message];
      if (status) {
        res.status(status).json({ success: false, message: error.message });
        return;
      }
    }
    next(error);
  }
};

// ─── Cancel Trip ────────────────────────────────────────────────────────

export const cancelTripHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tripId = Number(req.params.id);

    if (isNaN(tripId)) {
      res.status(400).json({ success: false, message: "Invalid trip ID" });
      return;
    }

    const trip = await cancelTrip(tripId);

    res.json({ success: true, data: trip });
  } catch (error) {
    if (error instanceof Error) {
      const status = VALIDATION_ERRORS[error.message];
      if (status) {
        res.status(status).json({ success: false, message: error.message });
        return;
      }
    }
    next(error);
  }
};

// ─── Get All Trips ──────────────────────────────────────────────────────

export const getAllTripsHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const trips = await getAllTrips();

    res.json({ success: true, data: trips });
  } catch (error) {
    next(error);
  }
};

// ─── Get Single Trip ────────────────────────────────────────────────────

export const getTripByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tripId = Number(req.params.id);

    if (isNaN(tripId)) {
      res.status(400).json({ success: false, message: "Invalid trip ID" });
      return;
    }

    const trip = await getTripById(tripId);

    res.json({ success: true, data: trip });
  } catch (error) {
    if (error instanceof Error) {
      const status = VALIDATION_ERRORS[error.message];
      if (status) {
        res.status(status).json({ success: false, message: error.message });
        return;
      }
    }
    next(error);
  }
};
