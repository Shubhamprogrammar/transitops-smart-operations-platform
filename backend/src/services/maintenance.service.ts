import { prisma } from "../config/prisma";
import { AppError } from "../helpers/errors";
import {
  CreateMaintenanceInput,
  UpdateMaintenanceInput,
} from "../validators/maintenance.validator";
import type { MaintenanceStatus } from "@prisma/client";

const MAINTENANCE_INCLUDE = {
  vehicle: true,
} as const;

export const createMaintenance = async (data: CreateMaintenanceInput) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  });

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  if (vehicle.status === "RETIRED") {
    throw new AppError(
      "Cannot create maintenance for a retired vehicle",
      400,
    );
  }

  const existingOpen = await prisma.maintenance.findFirst({
    where: {
      vehicleId: data.vehicleId,
      status: "OPEN",
    },
  });

  if (existingOpen) {
    throw new AppError(
      "Vehicle already has an open maintenance record. Complete it first.",
      409,
    );
  }

  const maintenance = await prisma.maintenance.create({
    data: {
      vehicleId: data.vehicleId,
      maintenanceType: data.maintenanceType,
      description: data.description,
      cost: data.cost,
      status: "OPEN" as MaintenanceStatus,
      scheduledDate: new Date(data.scheduledDate),
      completedDate: data.completedDate ? new Date(data.completedDate) : null,
    },
    include: MAINTENANCE_INCLUDE,
  });

  // Transition vehicle status: AVAILABLE → IN_SHOP
  await prisma.vehicle.update({
    where: { id: data.vehicleId },
    data: { status: "IN_SHOP" },
  });

  return maintenance;
};

export const getAllMaintenance = async () => {
  const records = await prisma.maintenance.findMany({
    orderBy: { createdAt: "desc" },
    include: MAINTENANCE_INCLUDE,
  });
  return records;
};

export const getMaintenanceById = async (id: number) => {
  const record = await prisma.maintenance.findUnique({
    where: { id },
    include: MAINTENANCE_INCLUDE,
  });

  if (!record) {
    throw new AppError("Maintenance record not found", 404);
  }

  return record;
};

export const updateMaintenance = async (id: number, data: UpdateMaintenanceInput) => {
  const record = await prisma.maintenance.findUnique({ where: { id } });

  if (!record) {
    throw new AppError("Maintenance record not found", 404);
  }

  const updateData: Record<string, unknown> = { ...data };
  if (data.scheduledDate) {
    updateData.scheduledDate = new Date(data.scheduledDate);
  }
  if (data.completedDate !== undefined) {
    updateData.completedDate = data.completedDate ? new Date(data.completedDate) : null;
  }

  const updated = await prisma.maintenance.update({
    where: { id },
    data: updateData,
    include: MAINTENANCE_INCLUDE,
  });

  return updated;
};

export const deleteMaintenance = async (id: number) => {
  const record = await prisma.maintenance.findUnique({ where: { id } });

  if (!record) {
    throw new AppError("Maintenance record not found", 404);
  }

  if (record.status === "OPEN") {
    await prisma.vehicle.update({
      where: { id: record.vehicleId },
      data: { status: "AVAILABLE" },
    });
  }

  await prisma.maintenance.delete({ where: { id } });
};

export const completeMaintenance = async (id: number) => {
  const record = await prisma.maintenance.findUnique({
    where: { id },
    include: { vehicle: true },
  });

  if (!record) {
    throw new AppError("Maintenance record not found", 404);
  }

  if (record.status === "COMPLETED") {
    throw new AppError("Maintenance record is already completed", 400);
  }

  if (record.vehicle.status !== "IN_SHOP") {
    throw new AppError(
      "Cannot complete maintenance: vehicle is not in shop",
      400,
    );
  }

  const updated = await prisma.maintenance.update({
    where: { id },
    data: {
      status: "COMPLETED" as MaintenanceStatus,
      completedDate: new Date(),
    },
    include: MAINTENANCE_INCLUDE,
  });

  // Transition vehicle status: IN_SHOP → AVAILABLE
  await prisma.vehicle.update({
    where: { id: record.vehicleId },
    data: { status: "AVAILABLE" },
  });

  return updated;
};
