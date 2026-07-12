import { z } from "zod";
import { TripStatusEnum } from "../types";

export const createTripSchema = z.object({
  vehicleId: z.number().int().positive("Vehicle ID is required"),
  driverId: z.number().int().positive("Driver ID is required"),
  source: z.string().min(1, "Source is required"),
  destination: z.string().min(1, "Destination is required"),
  cargoWeight: z.number().int().positive("Cargo weight must be greater than 0"),
  distance: z.number().int().positive().optional(),
});

export const updateTripStatusSchema = z.object({
  status: TripStatusEnum,
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripStatusInput = z.infer<typeof updateTripStatusSchema>;
