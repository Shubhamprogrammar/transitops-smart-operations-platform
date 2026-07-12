import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import {
  getDashboardSummary,
  getVehicleStatusDistribution,
  getTripStatusDistribution,
  getExpensesByType,
  getFuelSummary,
} from "../services/dashboard.service";

export const getSummary = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const summary = await getDashboardSummary();
    sendSuccess(res, summary, "Dashboard summary fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getVehicleStatus = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getVehicleStatusDistribution();
    sendSuccess(res, data, "Vehicle status distribution fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getTripStatus = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getTripStatusDistribution();
    sendSuccess(res, data, "Trip status distribution fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getExpensesByType();
    sendSuccess(res, data, "Expenses grouped by type fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getFuel = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getFuelSummary();
    sendSuccess(res, data, "Fuel summary fetched successfully");
  } catch (error) {
    next(error);
  }
};
