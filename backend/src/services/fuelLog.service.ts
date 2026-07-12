import { prisma } from "../config/prisma";
import { AppError } from "../helpers/errors";
import {
  CreateFuelLogInput,
  UpdateFuelLogInput,
} from "../validators/fuelLog.validator";

const FUEL_LOG_INCLUDE = {
  vehicle: true,
  trip: true,
} as const;

export const createFuelLog = async (data: CreateFuelLogInput) => {
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

  const fuelLog = await prisma.fuelLog.create({
    data: {
      vehicleId: data.vehicleId,
      tripId: data.tripId ?? null,
      liters: data.liters,
      cost: data.cost,
      fuelStation: data.fuelStation,
      filledAt: new Date(data.filledAt),
    },
    include: FUEL_LOG_INCLUDE,
  });

  return fuelLog;
};

export const getAllFuelLogs = async () => {
  const fuelLogs = await prisma.fuelLog.findMany({
    orderBy: { createdAt: "desc" },
    include: FUEL_LOG_INCLUDE,
  });
  return fuelLogs;
};

export const getFuelLogById = async (id: number) => {
  const fuelLog = await prisma.fuelLog.findUnique({
    where: { id },
    include: FUEL_LOG_INCLUDE,
  });

  if (!fuelLog) {
    throw new AppError("Fuel log not found", 404);
  }

  return fuelLog;
};

export const updateFuelLog = async (id: number, data: UpdateFuelLogInput) => {
  const fuelLog = await prisma.fuelLog.findUnique({ where: { id } });

  if (!fuelLog) {
    throw new AppError("Fuel log not found", 404);
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
  if (data.filledAt) {
    updateData.filledAt = new Date(data.filledAt);
  }

  const updated = await prisma.fuelLog.update({
    where: { id },
    data: updateData,
    include: FUEL_LOG_INCLUDE,
  });

  return updated;
};

export const deleteFuelLog = async (id: number) => {
  const fuelLog = await prisma.fuelLog.findUnique({ where: { id } });

  if (!fuelLog) {
    throw new AppError("Fuel log not found", 404);
  }

  await prisma.fuelLog.delete({ where: { id } });
};
