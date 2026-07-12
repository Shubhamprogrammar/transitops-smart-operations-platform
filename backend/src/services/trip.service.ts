import { prisma } from "../config/prisma";
import { CreateTripInput } from "../validators/trip.validator";

// ─── Create Trip ────────────────────────────────────────────────────────

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

  if (new Date(driver.licenseExpiry) < new Date()) {
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

// ─── Dispatch Trip ──────────────────────────────────────────────────────

export const dispatchTrip = async (tripId: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { vehicle: true, driver: true },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  if (trip.status !== "DRAFT") {
    throw new Error("Only draft trips can be dispatched");
  }

  if (trip.vehicle.status !== "AVAILABLE") {
    throw new Error("Vehicle not available");
  }

  if (trip.driver.status !== "AVAILABLE") {
    throw new Error("Driver not available");
  }

  if (new Date(trip.driver.licenseExpiry) < new Date()) {
    throw new Error("Driver license expired");
  }

  const [updatedTrip] = await prisma.$transaction([
    prisma.trip.update({
      where: { id: tripId },
      data: { status: "DISPATCHED", startTime: new Date() },
      include: { vehicle: true, driver: true },
    }),
    prisma.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: "ON_TRIP" },
    }),
    prisma.driver.update({
      where: { id: trip.driverId },
      data: { status: "ON_TRIP" },
    }),
  ]);

  return updatedTrip;
};

// ─── Complete Trip ──────────────────────────────────────────────────────

export const completeTrip = async (tripId: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { vehicle: true, driver: true },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  if (trip.status !== "DISPATCHED" && trip.status !== "ACTIVE") {
    throw new Error("Only dispatched or active trips can be completed");
  }

  const [updatedTrip] = await prisma.$transaction([
    prisma.trip.update({
      where: { id: tripId },
      data: { status: "COMPLETED", endTime: new Date() },
      include: { vehicle: true, driver: true },
    }),
    prisma.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: "AVAILABLE" },
    }),
    prisma.driver.update({
      where: { id: trip.driverId },
      data: { status: "AVAILABLE" },
    }),
  ]);

  return updatedTrip;
};

// ─── Cancel Trip ────────────────────────────────────────────────────────

export const cancelTrip = async (tripId: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { vehicle: true, driver: true },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  if (trip.status === "COMPLETED") {
    throw new Error("Completed trips cannot be cancelled");
  }

  const wasDispatchedOrActive =
    trip.status === "DISPATCHED" || trip.status === "ACTIVE";

  const updateTrip = prisma.trip.update({
    where: { id: tripId },
    data: { status: "CANCELLED" },
    include: { vehicle: true, driver: true },
  });

  if (wasDispatchedOrActive) {
    const [updatedTrip] = await prisma.$transaction([
      updateTrip,
      prisma.vehicle.update({
        where: { id: trip.vehicleId },
        data: { status: "AVAILABLE" },
      }),
      prisma.driver.update({
        where: { id: trip.driverId },
        data: { status: "AVAILABLE" },
      }),
    ]);
    return updatedTrip;
  }

  return updateTrip;
};

// ─── Get All Trips ──────────────────────────────────────────────────────

export const getAllTrips = async () => {
  const trips = await prisma.trip.findMany({
    include: { vehicle: true, driver: true },
    orderBy: { createdAt: "desc" },
  });

  return trips;
};

// ─── Get Single Trip ────────────────────────────────────────────────────

export const getTripById = async (tripId: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { vehicle: true, driver: true },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  return trip;
};
