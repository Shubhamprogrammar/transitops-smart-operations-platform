import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import { validateRequest } from "../helpers/validation";
import {
  createFuelLogSchema,
  updateFuelLogSchema,
} from "../validators/fuelLog.validator";
import {
  createFuelLog,
  getAllFuelLogs,
  getFuelLogById,
  updateFuelLog,
  deleteFuelLog,
} from "../services/fuelLog.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = validateRequest(createFuelLogSchema, req.body, res);
    if (!data) return;

    const fuelLog = await createFuelLog(data);
    sendSuccess(res, fuelLog, "Fuel log created successfully", 201);
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
    const fuelLogs = await getAllFuelLogs();
    sendSuccess(res, fuelLogs, "Fuel logs fetched successfully");
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
    const fuelLog = await getFuelLogById(id);
    sendSuccess(res, fuelLog, "Fuel log fetched successfully");
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
    const data = validateRequest(updateFuelLogSchema, req.body, res);
    if (!data) return;

    const fuelLog = await updateFuelLog(id, data);
    sendSuccess(res, fuelLog, "Fuel log updated successfully");
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
    await deleteFuelLog(id);
    sendSuccess(res, null, "Fuel log deleted successfully");
  } catch (error) {
    next(error);
  }
};
