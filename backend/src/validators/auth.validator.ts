import { z } from "zod";

export const RoleEnum = z.enum([
  "FLEET_MANAGER",
  "DRIVER",
  "SAFETY_OFFICER",
  "ANALYST",
]);

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: RoleEnum.optional().default("FLEET_MANAGER"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
