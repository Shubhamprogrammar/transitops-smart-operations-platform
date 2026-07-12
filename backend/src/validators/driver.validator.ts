import { z } from "zod";
import { DriverStatusEnum } from "../types";

export const createDriverSchema = z.object({
  name: z.string().min(1, "Driver name is required"),
  phone: z.string().min(1, "Phone number is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseExpiry: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    },
    { message: "License expiry date must be in the future" },
  ),
  status: DriverStatusEnum.optional().default("AVAILABLE"),
});

export const updateDriverSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  licenseNumber: z.string().min(1).optional(),
  licenseExpiry: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date > new Date();
      },
      { message: "License expiry date must be in the future" },
    )
    .optional(),
  status: DriverStatusEnum.optional(),
});

export const updateDriverStatusSchema = z.object({
  status: DriverStatusEnum,
});

export type CreateDriverInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;
export type UpdateDriverStatusInput = z.infer<typeof updateDriverStatusSchema>;
