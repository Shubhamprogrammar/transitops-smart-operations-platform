import { z } from "zod";

export const createTripSchema = z.object({
  vehicleId: z.number().int().positive("Vehicle ID is required"),
  driverId: z.number().int().positive("Driver ID is required"),
  cargoWeight: z.number().int().positive("Cargo weight must be greater than 0"),
  distance: z.number().int().positive().optional(),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
