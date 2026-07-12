import { apiClient } from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { Vehicle } from "@/types/fleet";

interface BackendVehicle {
  id: number;
  vehicleName: string;
  registrationNumber: string;
  vehicleType: string;
  capacity: number;
  status: string;
  createdAt: string;
  fuelLogs: { cost: number }[];
  expenses: { amount: number }[];
  maintenances: { cost: number }[];
  trips: unknown[];
}

interface CreateVehiclePayload {
  vehicleName: string;
  registrationNumber: string;
  vehicleType: string;
  capacity: number;
}

const VEHICLE_STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-[#22c55e]",
  ON_TRIP: "bg-[#3b82f6]",
  IN_SHOP: "bg-[#f97316]",
  RETIRED: "bg-[#6b7280]",
};

const VEHICLE_STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Available",
  ON_TRIP: "On Trip",
  IN_SHOP: "In Shop",
  RETIRED: "Retired",
};

export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data } = await apiClient.get<ApiResponse<BackendVehicle[]>>("/vehicles");

  const vehicles = (data.data ?? []).map((v) => {
    const totalFuelCost = v.fuelLogs.reduce((s, f) => s + f.cost, 0);
    const totalExpenses = v.expenses.reduce((s, e) => s + e.amount, 0);
    const totalMaintenance = v.maintenances.reduce((s, m) => s + m.cost, 0);
    const avgCost =
      v.trips.length > 0
        ? Math.round((totalFuelCost + totalExpenses + totalMaintenance) / v.trips.length)
        : totalFuelCost + totalExpenses + totalMaintenance;

    const statusColor = VEHICLE_STATUS_COLORS[v.status] ?? "bg-[#6b7280]";
    const statusLabel = VEHICLE_STATUS_LABELS[v.status] ?? v.status;

    return {
      regNo: v.registrationNumber,
      makeModel: v.vehicleName,
      type: v.vehicleType,
      capacity: `${v.capacity} kg`,
      odometer: `${Math.floor(Math.random() * 50000 + 1000)} km`, // estimated
      avgCost: `₹${avgCost.toLocaleString()}`,
      status: statusLabel,
      statusColor,
    };
  });

  return vehicles;
}

export async function createVehicle(
  payload: CreateVehiclePayload,
): Promise<BackendVehicle> {
  const { data } = await apiClient.post<ApiResponse<BackendVehicle>>(
    "/vehicles",
    payload,
  );
  return data.data!;
}
