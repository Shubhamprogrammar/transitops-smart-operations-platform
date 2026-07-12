import { z } from "zod";

export const createFuelLogSchema = z.object({
  vehicleId: z.number().int().positive("Vehicle ID is required"),
  tripId: z.number().int().positive().optional().nullable(),
  liters: z.number().positive("Liters must be greater than zero"),
  cost: z.number().positive("Cost must be greater than zero"),
  fuelStation: z.string().optional(),
  filledAt: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "Filled date must be a valid date" },
  ),
});

export const updateFuelLogSchema = z.object({
  tripId: z.number().int().positive().optional().nullable(),
  liters: z.number().positive("Liters must be greater than zero").optional(),
  cost: z.number().positive("Cost must be greater than zero").optional(),
  fuelStation: z.string().optional(),
  filledAt: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Filled date must be a valid date" },
    )
    .optional(),
});

export type CreateFuelLogInput = z.infer<typeof createFuelLogSchema>;
export type UpdateFuelLogInput = z.infer<typeof updateFuelLogSchema>;
