import { prisma } from "../config/prisma";
import { CreateTripInput } from "../validators/trip.validator";

export const createTrip = async (data: CreateTripInput) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  const driver = await prisma.driver.findUnique({
    where: { id: data.driverId },
  });

  if (!driver) {
    throw new Error("Driver not found");
  }

  if (vehicle.status !== "AVAILABLE") {
    throw new Error("Vehicle not available");
  }

  if (driver.status !== "AVAILABLE") {
    throw new Error("Driver not available");
  }

  if (driver.expiryDate < new Date()) {
    throw new Error("Driver license expired");
  }

  if (data.cargoWeight > vehicle.capacity) {
    throw new Error("Cargo exceeds vehicle capacity");
  }

  const trip = await prisma.trip.create({
    data: {
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      cargoWeight: data.cargoWeight,
      distance: data.distance,
      status: "DRAFT",
    },
  });

  return trip;
};
