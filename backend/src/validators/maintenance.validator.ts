import { z } from "zod";
import { MaintenanceStatusEnum } from "../types";

export const createMaintenanceSchema = z.object({
  vehicleId: z.number().int().positive("Vehicle ID is required"),
  maintenanceType: z.string().min(1, "Maintenance type is required"),
  description: z.string().optional(),
  cost: z.number().positive("Cost must be greater than zero"),
  status: MaintenanceStatusEnum.optional().default("OPEN"),
  scheduledDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "Scheduled date must be a valid date" },
  ),
  completedDate: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Completed date must be a valid date" },
    )
    .optional()
    .nullable(),
});

export const updateMaintenanceSchema = z.object({
  maintenanceType: z.string().min(1).optional(),
  description: z.string().optional(),
  cost: z.number().positive("Cost must be greater than zero").optional(),
  status: MaintenanceStatusEnum.optional(),
  scheduledDate: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Scheduled date must be a valid date" },
    )
    .optional(),
  completedDate: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Completed date must be a valid date" },
    )
    .optional()
    .nullable(),
});

export type CreateMaintenanceInput = z.infer<typeof createMaintenanceSchema>;
export type UpdateMaintenanceInput = z.infer<typeof updateMaintenanceSchema>;
