import { prisma } from "../config/prisma";
import { AppError } from "../helpers/errors";
import {
  CreateTripInput,
  UpdateTripStatusInput,
} from "../validators/trip.validator";
import type { TripStatus } from "@prisma/client";

const TRIP_INCLUDE = {
  vehicle: true,
  driver: true,
  fuelLogs: true,
  expenses: true,
} as const;

export const createTrip = async (data: CreateTripInput) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  });

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  const driver = await prisma.driver.findUnique({
    where: { id: data.driverId },
  });

  if (!driver) {
    throw new AppError("Driver not found", 404);
  }

  if (vehicle.status !== "AVAILABLE") {
    throw new AppError("Vehicle not available", 400);
  }

  if (driver.status !== "AVAILABLE") {
    throw new AppError("Driver not available", 400);
  }

  const expiryDate = new Date(driver.licenseExpiry);
  if (expiryDate < new Date()) {
    throw new AppError("Driver license expired", 400);
  }

  if (data.cargoWeight > vehicle.capacity) {
    throw new AppError("Cargo exceeds vehicle capacity", 400);
  }

  const trip = await prisma.trip.create({
    data: {
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      source: data.source,
      destination: data.destination,
      cargoWeight: data.cargoWeight,
      distance: data.distance ?? undefined,
      status: "DRAFT",
    },
    include: TRIP_INCLUDE,
  });

  // Update vehicle and driver status to ON_TRIP
  await prisma.vehicle.update({
    where: { id: data.vehicleId },
    data: { status: "ON_TRIP" },
  });

  await prisma.driver.update({
    where: { id: data.driverId },
    data: { status: "ON_TRIP" },
  });

  return trip;
};

export const getAllTrips = async () => {
  const trips = await prisma.trip.findMany({
    orderBy: { createdAt: "desc" },
    include: TRIP_INCLUDE,
  });
  return trips;
};

export const getTripById = async (id: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: TRIP_INCLUDE,
  });

  if (!trip) {
    throw new AppError("Trip not found", 404);
  }

  return trip;
};

export const updateTripStatus = async (
  id: number,
  statusInput: UpdateTripStatusInput,
) => {
  const trip = await prisma.trip.findUnique({ where: { id } });

  if (!trip) {
    throw new AppError("Trip not found", 404);
  }

  const newStatus = statusInput.status as TripStatus;

  // If trip is being completed, update vehicle/driver status back to available
  if (newStatus === "COMPLETED" || newStatus === "CANCELLED") {
    await prisma.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: "AVAILABLE" },
    });
    await prisma.driver.update({
      where: { id: trip.driverId },
      data: { status: "AVAILABLE" },
    });
  }

  const updated = await prisma.trip.update({
    where: { id },
    data: {
      status: newStatus,
      ...(newStatus === "ACTIVE" ? { startTime: new Date() } : {}),
      ...(newStatus === "COMPLETED" ? { endTime: new Date() } : {}),
    },
    include: TRIP_INCLUDE,
  });

  return updated;
};
