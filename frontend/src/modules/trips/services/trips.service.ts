import { apiClient } from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { CreateTripPayload, Trip } from "@/types/trips";

interface BackendVehicle {
  id: number;
  registrationNumber: string;
  vehicleName: string;
}

interface BackendDriver {
  id: number;
  name: string;
  licenseNumber: string;
}

interface BackendTrip {
  id: number;
  vehicleId: number;
  driverId: number;
  source: string;
  destination: string;
  cargoWeight: number;
  distance: number | null;
  status: string;
  startTime: string | null;
  endTime: string | null;
  createdAt: string;
  vehicle: BackendVehicle;
  driver: BackendDriver;
}

const TRIP_STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-[#6b7280]",
  DISPATCHED: "bg-[#d97706]",
  ACTIVE: "bg-[#3b82f6]",
  COMPLETED: "bg-[#22c55e]",
  CANCELLED: "bg-[#ef4444]",
};

const TRIP_STATUS_LABELS: Record<string, Trip["status"]> = {
  DRAFT: "Draft",
  DISPATCHED: "Dispatched",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export async function fetchTrips(): Promise<Trip[]> {
  const { data } = await apiClient.get<ApiResponse<BackendTrip[]>>("/trips");

  const trips = (data.data ?? []).map((t) => ({
    id: `TR${String(t.id).padStart(3, "0")}`,
    source: t.source,
    destination: t.destination,
    vehicle: t.vehicle.registrationNumber,
    driver: t.driver.name,
    status: TRIP_STATUS_LABELS[t.status] ?? "Draft",
    statusColor: TRIP_STATUS_COLORS[t.status] ?? "bg-[#6b7280]",
    eta: t.endTime
      ? new Date(t.endTime).toLocaleString("en-IN")
      : t.startTime
        ? new Date(t.startTime).toLocaleString("en-IN")
        : "Awaiting dispatch",
    note: `${t.cargoWeight} kg`,
  }));

  return trips;
}

export async function createTrip(payload: CreateTripPayload): Promise<Trip> {
  // Fetch vehicles and drivers to resolve string identifiers to numeric IDs
  const [vehiclesRes, driversRes] = await Promise.all([
    apiClient.get<ApiResponse<BackendVehicle[]>>("/vehicles"),
    apiClient.get<ApiResponse<BackendDriver[]>>("/drivers"),
  ]);

  const vehicles = vehiclesRes.data.data ?? [];
  const drivers = driversRes.data.data ?? [];

  // Match by registration number (case-insensitive)
  const matchedVehicle = vehicles.find(
    (v) => v.registrationNumber.toLowerCase() === payload.vehicle.toLowerCase(),
  );
  if (!matchedVehicle) {
    throw new Error(`Vehicle "${payload.vehicle}" not found`);
  }

  // Match by name (case-insensitive)
  const matchedDriver = drivers.find(
    (d) => d.name.toLowerCase() === payload.driver.toLowerCase(),
  );
  if (!matchedDriver) {
    throw new Error(`Driver "${payload.driver}" not found`);
  }

  const { data } = await apiClient.post<ApiResponse<BackendTrip>>("/trips", {
    vehicleId: matchedVehicle.id,
    driverId: matchedDriver.id,
    source: payload.source,
    destination: payload.destination,
    cargoWeight: payload.cargoWeight,
    distance: payload.plannedDistance,
  });

  const trip = data.data!;

  return {
    id: `TR${String(trip.id).padStart(3, "0")}`,
    source: trip.source,
    destination: trip.destination,
    vehicle: trip.vehicle.registrationNumber,
    driver: trip.driver.name,
    status: "Draft",
    statusColor: "bg-[#6b7280]",
    eta: "Awaiting dispatch",
    note: `${trip.cargoWeight} kg`,
  };
}

export async function updateTripStatus(tripId: number, status: string) {
  const { data } = await apiClient.patch<ApiResponse<BackendTrip>>(
    `/trips/${tripId}/status`,
    { status },
  );
  return data.data;
}
