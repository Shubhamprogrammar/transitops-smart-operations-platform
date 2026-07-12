import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import { validateRequest } from "../helpers/validation";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../validators/expense.validator";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../services/expense.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = validateRequest(createExpenseSchema, req.body, res);
    if (!data) return;

    const expense = await createExpense(data);
    sendSuccess(res, expense, "Expense created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const expenses = await getAllExpenses();
    sendSuccess(res, expenses, "Expenses fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const expense = await getExpenseById(id);
    sendSuccess(res, expense, "Expense fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const data = validateRequest(updateExpenseSchema, req.body, res);
    if (!data) return;

    const expense = await updateExpense(id, data);
    sendSuccess(res, expense, "Expense updated successfully");
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await deleteExpense(id);
    sendSuccess(res, null, "Expense deleted successfully");
  } catch (error) {
    next(error);
  }
};
