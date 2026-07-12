import { z } from "zod";
import { VehicleStatusEnum } from "../types";

export const createVehicleSchema = z.object({
  vehicleName: z.string().min(1, "Vehicle name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  capacity: z.number().int().positive("Capacity must be greater than zero"),
  status: VehicleStatusEnum.optional().default("AVAILABLE"),
});

export const updateVehicleSchema = z.object({
  vehicleName: z.string().min(1).optional(),
  registrationNumber: z.string().min(1).optional(),
  vehicleType: z.string().min(1).optional(),
  capacity: z.number().int().positive("Capacity must be greater than zero").optional(),
  status: VehicleStatusEnum.optional(),
});

export const updateVehicleStatusSchema = z.object({
  status: VehicleStatusEnum,
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
export type UpdateVehicleStatusInput = z.infer<typeof updateVehicleStatusSchema>;
