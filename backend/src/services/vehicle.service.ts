import { prisma } from "../config/prisma";
import { AppError } from "../helpers/errors";
import { CreateVehicleInput, UpdateVehicleInput } from "../validators/vehicle.validator";
import type { VehicleStatus } from "@prisma/client";

const VEHICLE_INCLUDE = {
  trips: true,
  fuelLogs: true,
  expenses: true,
  maintenances: true,
} as const;

export const createVehicle = async (data: CreateVehicleInput) => {
  const existing = await prisma.vehicle.findUnique({
    where: { registrationNumber: data.registrationNumber },
  });

  if (existing) {
    throw new AppError("Vehicle with this registration number already exists", 409);
  }

  const vehicle = await prisma.vehicle.create({ data });
  return vehicle;
};

export const getAllVehicles = async () => {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    include: VEHICLE_INCLUDE,
  });
  return vehicles;
};

export const getVehicleById = async (id: number) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: VEHICLE_INCLUDE,
  });

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return vehicle;
};

export const updateVehicle = async (id: number, data: UpdateVehicleInput) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  if (data.registrationNumber && data.registrationNumber !== vehicle.registrationNumber) {
    const existing = await prisma.vehicle.findUnique({
      where: { registrationNumber: data.registrationNumber },
    });

    if (existing) {
      throw new AppError("Vehicle with this registration number already exists", 409);
    }
  }

  const updated = await prisma.vehicle.update({
    where: { id },
    data,
    include: VEHICLE_INCLUDE,
  });

  return updated;
};

export const deleteVehicle = async (id: number) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      trips: {
        where: { status: "ACTIVE" },
      },
    },
  });

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  if (vehicle.trips.length > 0) {
    throw new AppError("Cannot delete vehicle assigned to an active trip", 400);
  }

  await prisma.vehicle.delete({ where: { id } });
};

export const updateVehicleStatus = async (id: number, status: VehicleStatus) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  const updated = await prisma.vehicle.update({
    where: { id },
    data: { status },
    include: VEHICLE_INCLUDE,
  });

  return updated;
};
