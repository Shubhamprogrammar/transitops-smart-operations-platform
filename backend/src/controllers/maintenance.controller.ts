import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import { validateRequest } from "../helpers/validation";
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
} from "../validators/maintenance.validator";
import {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
  completeMaintenance,
} from "../services/maintenance.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = validateRequest(createMaintenanceSchema, req.body, res);
    if (!data) return;

    const record = await createMaintenance(data);
    sendSuccess(res, record, "Maintenance record created successfully", 201);
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
    const records = await getAllMaintenance();
    sendSuccess(res, records, "Maintenance records fetched successfully");
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
    const record = await getMaintenanceById(id);
    sendSuccess(res, record, "Maintenance record fetched successfully");
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
    const data = validateRequest(updateMaintenanceSchema, req.body, res);
    if (!data) return;

    const record = await updateMaintenance(id, data);
    sendSuccess(res, record, "Maintenance record updated successfully");
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
    await deleteMaintenance(id);
    sendSuccess(res, null, "Maintenance record deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const complete = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const record = await completeMaintenance(id);
    sendSuccess(res, record, "Maintenance marked as completed successfully");
  } catch (error) {
    next(error);
  }
};
