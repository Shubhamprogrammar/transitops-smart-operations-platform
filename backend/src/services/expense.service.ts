import { prisma } from "../config/prisma";
import { AppError } from "../helpers/errors";
import {
  CreateExpenseInput,
  UpdateExpenseInput,
} from "../validators/expense.validator";

const EXPENSE_INCLUDE = {
  vehicle: true,
  trip: true,
} as const;

export const createExpense = async (data: CreateExpenseInput) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  });

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  if (data.tripId) {
    const trip = await prisma.trip.findUnique({
      where: { id: data.tripId },
    });

    if (!trip) {
      throw new AppError("Trip not found", 404);
    }
  }

  const expense = await prisma.expense.create({
    data: {
      vehicleId: data.vehicleId,
      tripId: data.tripId ?? null,
      expenseType: data.expenseType,
      amount: data.amount,
      description: data.description,
      expenseDate: new Date(data.expenseDate),
    },
    include: EXPENSE_INCLUDE,
  });

  return expense;
};

export const getAllExpenses = async () => {
  const expenses = await prisma.expense.findMany({
    orderBy: { createdAt: "desc" },
    include: EXPENSE_INCLUDE,
  });
  return expenses;
};

export const getExpenseById = async (id: number) => {
  const expense = await prisma.expense.findUnique({
    where: { id },
    include: EXPENSE_INCLUDE,
  });

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  return expense;
};

export const updateExpense = async (id: number, data: UpdateExpenseInput) => {
  const expense = await prisma.expense.findUnique({ where: { id } });

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  if (data.tripId) {
    const trip = await prisma.trip.findUnique({
      where: { id: data.tripId },
    });

    if (!trip) {
      throw new AppError("Trip not found", 404);
    }
  }

  const updateData: Record<string, unknown> = { ...data };
  if (data.expenseDate) {
    updateData.expenseDate = new Date(data.expenseDate);
  }

  const updated = await prisma.expense.update({
    where: { id },
    data: updateData,
    include: EXPENSE_INCLUDE,
  });

  return updated;
};

export const deleteExpense = async (id: number) => {
  const expense = await prisma.expense.findUnique({ where: { id } });

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  await prisma.expense.delete({ where: { id } });
};
