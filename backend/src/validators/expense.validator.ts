import { z } from "zod";
import { ExpenseTypeEnum } from "../types";

export const createExpenseSchema = z.object({
  vehicleId: z.number().int().positive("Vehicle ID is required"),
  tripId: z.number().int().positive().optional().nullable(),
  expenseType: ExpenseTypeEnum,
  amount: z.number().positive("Amount must be greater than zero"),
  description: z.string().optional(),
  expenseDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "Expense date must be a valid date" },
  ),
});

export const updateExpenseSchema = z.object({
  tripId: z.number().int().positive().optional().nullable(),
  expenseType: ExpenseTypeEnum.optional(),
  amount: z.number().positive("Amount must be greater than zero").optional(),
  description: z.string().optional(),
  expenseDate: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Expense date must be a valid date" },
    )
    .optional(),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
