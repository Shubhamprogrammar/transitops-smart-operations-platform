import { z } from "zod";

export const VehicleStatusEnum = z.enum([
  "AVAILABLE",
  "ON_TRIP",
  "IN_SHOP",
  "RETIRED",
]);

export const DriverStatusEnum = z.enum([
  "AVAILABLE",
  "ON_TRIP",
  "SUSPENDED",
]);

export const MaintenanceStatusEnum = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
]);

export const ExpenseTypeEnum = z.enum([
  "FUEL",
  "TOLL",
  "PARKING",
  "REPAIR",
  "OTHER",
]);

export const TripStatusEnum = z.enum([
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);

export type VehicleStatusType = z.infer<typeof VehicleStatusEnum>;
export type DriverStatusType = z.infer<typeof DriverStatusEnum>;
export type MaintenanceStatusType = z.infer<typeof MaintenanceStatusEnum>;
export type ExpenseTypeType = z.infer<typeof ExpenseTypeEnum>;
export type TripStatusType = z.infer<typeof TripStatusEnum>;
