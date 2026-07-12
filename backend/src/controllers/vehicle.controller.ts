import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import { validateRequest } from "../helpers/validation";
import {
  createVehicleSchema,
  updateVehicleSchema,
  updateVehicleStatusSchema,
} from "../validators/vehicle.validator";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus,
} from "../services/vehicle.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = validateRequest(createVehicleSchema, req.body, res);
    if (!data) return;

    const vehicle = await createVehicle(data);
    sendSuccess(res, vehicle, "Vehicle created successfully", 201);
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
    const vehicles = await getAllVehicles();
    sendSuccess(res, vehicles, "Vehicles fetched successfully");
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
    const vehicle = await getVehicleById(id);
    sendSuccess(res, vehicle, "Vehicle fetched successfully");
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
    const data = validateRequest(updateVehicleSchema, req.body, res);
    if (!data) return;

    const vehicle = await updateVehicle(id, data);
    sendSuccess(res, vehicle, "Vehicle updated successfully");
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
    await deleteVehicle(id);
    sendSuccess(res, null, "Vehicle deleted successfully");
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
    const data = validateRequest(updateVehicleStatusSchema, req.body, res);
    if (!data) return;

    const vehicle = await updateVehicleStatus(id, data.status);
    sendSuccess(res, vehicle, "Vehicle status updated successfully");
  } catch (error) {
    next(error);
  }
};
