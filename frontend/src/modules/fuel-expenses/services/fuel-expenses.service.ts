import { apiClient } from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { FuelLog, OtherExpense } from "@/types/fuel-expenses";

interface BackendFuelLog {
  id: number;
  vehicleId: number;
  tripId: number | null;
  liters: number;
  cost: number;
  fuelStation: string | null;
  filledAt: string;
  createdAt: string;
  vehicle: {
    id: number;
    registrationNumber: string;
    vehicleName: string;
  };
}

interface BackendVehicle {
  id: number;
  registrationNumber: string;
  vehicleName: string;
}

interface BackendExpense {
  id: number;
  vehicleId: number;
  tripId: number | null;
  expenseType: string;
  amount: number;
  description: string | null;
  expenseDate: string;
  createdAt: string;
  vehicle: BackendVehicle;
}

const EXPENSE_STATUS_COLORS: Record<string, string> = {
  FUEL: "bg-[#3b82f6]",
  TOLL: "bg-[#d97706]",
  PARKING: "bg-[#6b7280]",
  REPAIR: "bg-[#f97316]",
  OTHER: "bg-[#a855f7]",
};

export async function fetchFuelLogs(): Promise<FuelLog[]> {
  const { data } = await apiClient.get<ApiResponse<BackendFuelLog[]>>(
    "/fuel-logs",
  );

  const fuelLogs = (data.data ?? []).map((f) => ({
    id: String(f.id),
    vehicle: f.vehicle.registrationNumber,
    date: new Date(f.filledAt).toISOString().split("T")[0],
    liters: `${f.liters.toFixed(1)} L`,
    fuelCost: f.cost,
  }));

  return fuelLogs;
}

export async function fetchOtherExpenses(): Promise<OtherExpense[]> {
  const { data } = await apiClient.get<ApiResponse<BackendExpense[]>>(
    "/expenses",
  );

  const expenses = (data.data ?? []).map((e) => ({
    id: String(e.id),
    trip: e.tripId ? `TRIP-${e.tripId}` : "—",
    vehicle: e.vehicle.registrationNumber,
    toll: e.expenseType === "TOLL" ? e.amount : 0,
    other: e.expenseType !== "TOLL" ? e.amount : 0,
    maintenanceLinked: e.expenseType === "REPAIR" ? e.amount : 0,
    total: e.amount,
    status: e.expenseType,
    statusColor: EXPENSE_STATUS_COLORS[e.expenseType] ?? "bg-[#6b7280]",
  }));

  return expenses;
}

// ---------- Create Fuel Log ----------

interface CreateFuelLogPayload {
  vehicle: string; // registration number, resolved to ID
  liters: number;
  cost: number;
  fuelStation?: string;
  filledAt: string;
}

export async function createFuelLog(
  payload: CreateFuelLogPayload,
): Promise<BackendFuelLog> {
  // Resolve vehicle registration number to numeric ID
  const vehiclesRes = await apiClient.get<ApiResponse<BackendVehicle[]>>(
    "/vehicles",
  );
  const vehicles = vehiclesRes.data.data ?? [];
  const matchedVehicle = vehicles.find(
    (v) =>
      v.registrationNumber.toLowerCase() === payload.vehicle.toLowerCase(),
  );
  if (!matchedVehicle) {
    throw new Error(`Vehicle "${payload.vehicle}" not found`);
  }

  const { data } = await apiClient.post<ApiResponse<BackendFuelLog>>(
    "/fuel-logs",
    {
      vehicleId: matchedVehicle.id,
      liters: payload.liters,
      cost: payload.cost,
      fuelStation: payload.fuelStation ?? null,
      filledAt: payload.filledAt,
    },
  );
  return data.data!;
}

// ---------- Create Expense ----------

interface CreateExpensePayload {
  vehicle: string; // registration number, resolved to ID
  expenseType: string;
  amount: number;
  description?: string;
  expenseDate: string;
}

export async function createExpense(
  payload: CreateExpensePayload,
): Promise<BackendExpense> {
  // Resolve vehicle registration number to numeric ID
  const vehiclesRes = await apiClient.get<ApiResponse<BackendVehicle[]>>(
    "/vehicles",
  );
  const vehicles = vehiclesRes.data.data ?? [];
  const matchedVehicle = vehicles.find(
    (v) =>
      v.registrationNumber.toLowerCase() === payload.vehicle.toLowerCase(),
  );
  if (!matchedVehicle) {
    throw new Error(`Vehicle "${payload.vehicle}" not found`);
  }

  const { data } = await apiClient.post<ApiResponse<BackendExpense>>(
    "/expenses",
    {
      vehicleId: matchedVehicle.id,
      expenseType: payload.expenseType,
      amount: payload.amount,
      description: payload.description ?? null,
      expenseDate: payload.expenseDate,
    },
  );
  return data.data!;
}
