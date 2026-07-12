import { z } from "zod";
import { DriverStatusEnum } from "../types";

function isValidLicenseExpiry(val: string): boolean {
  const date = new Date(val);
  if (isNaN(date.getTime())) return false;

  const now = new Date();
  // Must be in the future but within 50 years (reasonable license expiry range)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 50);

  return date > now && date < maxDate;
}

export const createDriverSchema = z.object({
  name: z.string().min(1, "Driver name is required"),
  phone: z.string().min(1, "Phone number is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseExpiry: z.string().refine(isValidLicenseExpiry, {
    message: "License expiry date must be a valid future date within 50 years",
  }),
  status: DriverStatusEnum.optional().default("AVAILABLE"),
});

export const updateDriverSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  licenseNumber: z.string().min(1).optional(),
  licenseExpiry: z.string().refine(isValidLicenseExpiry, {
    message: "License expiry date must be a valid future date within 50 years",
  }).optional(),
  status: DriverStatusEnum.optional(),
});

export const updateDriverStatusSchema = z.object({
  status: DriverStatusEnum,
});

export type CreateDriverInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;
export type UpdateDriverStatusInput = z.infer<typeof updateDriverStatusSchema>;
