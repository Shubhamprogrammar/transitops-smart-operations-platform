import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import { validateRequest } from "../helpers/validation";
import {
  createDriverSchema,
  updateDriverSchema,
  updateDriverStatusSchema,
} from "../validators/driver.validator";
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  updateDriverStatus,
} from "../services/driver.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = validateRequest(createDriverSchema, req.body, res);
    if (!data) return;

    const driver = await createDriver(data);
    sendSuccess(res, driver, "Driver created successfully", 201);
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
    const drivers = await getAllDrivers();
    sendSuccess(res, drivers, "Drivers fetched successfully");
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
    const driver = await getDriverById(id);
    sendSuccess(res, driver, "Driver fetched successfully");
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
    const data = validateRequest(updateDriverSchema, req.body, res);
    if (!data) return;

    const driver = await updateDriver(id, data);
    sendSuccess(res, driver, "Driver updated successfully");
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
    await deleteDriver(id);
    sendSuccess(res, null, "Driver deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const data = validateRequest(updateDriverStatusSchema, req.body, res);
    if (!data) return;

    const driver = await updateDriverStatus(id, data.status);
    sendSuccess(res, driver, "Driver status updated successfully");
  } catch (error) {
    next(error);
  }
};
