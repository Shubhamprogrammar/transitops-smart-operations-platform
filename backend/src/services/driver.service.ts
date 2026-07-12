import { prisma } from "../config/prisma";
import { AppError } from "../helpers/errors";
import { CreateDriverInput, UpdateDriverInput } from "../validators/driver.validator";
import type { DriverStatus } from "@prisma/client";

const DRIVER_INCLUDE = {
  trips: true,
} as const;

export const createDriver = async (data: CreateDriverInput) => {
  const existing = await prisma.driver.findUnique({
    where: { licenseNumber: data.licenseNumber },
  });

  if (existing) {
    throw new AppError("Driver with this license number already exists", 409);
  }

  const driver = await prisma.driver.create({
    data: {
      ...data,
      licenseExpiry: new Date(data.licenseExpiry),
    },
  });

  return driver;
};

export const getAllDrivers = async () => {
  const drivers = await prisma.driver.findMany({
    orderBy: { createdAt: "desc" },
    include: DRIVER_INCLUDE,
  });
  return drivers;
};

export const getDriverById = async (id: number) => {
  const driver = await prisma.driver.findUnique({
    where: { id },
    include: DRIVER_INCLUDE,
  });

  if (!driver) {
    throw new AppError("Driver not found", 404);
  }

  return driver;
};

export const updateDriver = async (id: number, data: UpdateDriverInput) => {
  const driver = await prisma.driver.findUnique({ where: { id } });

  if (!driver) {
    throw new AppError("Driver not found", 404);
  }

  if (data.licenseNumber && data.licenseNumber !== driver.licenseNumber) {
    const existing = await prisma.driver.findUnique({
      where: { licenseNumber: data.licenseNumber },
    });

    if (existing) {
      throw new AppError("Driver with this license number already exists", 409);
    }
  }

  const updateData: Record<string, unknown> = { ...data };
  if (data.licenseExpiry) {
    updateData.licenseExpiry = new Date(data.licenseExpiry);
  }

  const updated = await prisma.driver.update({
    where: { id },
    data: updateData,
    include: DRIVER_INCLUDE,
  });

  return updated;
};

export const deleteDriver = async (id: number) => {
  const driver = await prisma.driver.findUnique({
    where: { id },
    include: {
      trips: {
        where: { status: "ACTIVE" },
      },
    },
  });

  if (!driver) {
    throw new AppError("Driver not found", 404);
  }

  if (driver.trips.length > 0) {
    throw new AppError("Cannot delete driver assigned to an active trip", 400);
  }

  await prisma.driver.delete({ where: { id } });
};

export const updateDriverStatus = async (id: number, status: DriverStatus) => {
  const driver = await prisma.driver.findUnique({ where: { id } });

  if (!driver) {
    throw new AppError("Driver not found", 404);
  }

  const updated = await prisma.driver.update({
    where: { id },
    data: { status },
    include: DRIVER_INCLUDE,
  });

  return updated;
};
