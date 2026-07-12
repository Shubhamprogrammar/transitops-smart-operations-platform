import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import { validateRequest } from "../helpers/validation";
import {
  createTripSchema,
  updateTripStatusSchema,
} from "../validators/trip.validator";
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTripStatus,
} from "../services/trip.service";

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

    const trip = await createTrip(parsed.data);
    sendSuccess(res, trip, "Trip created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getAllTripsHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const trips = await getAllTrips();
    sendSuccess(res, trips, "Trips fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getTripByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const trip = await getTripById(id);
    sendSuccess(res, trip, "Trip fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const updateTripStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const data = validateRequest(updateTripStatusSchema, req.body, res);
    if (!data) return;

    const trip = await updateTripStatus(id, data);
    sendSuccess(res, trip, "Trip status updated successfully");
  } catch (error) {
    next(error);
  }
};
