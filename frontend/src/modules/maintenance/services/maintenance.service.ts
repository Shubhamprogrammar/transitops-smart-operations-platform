import { apiClient } from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type {
  CreateServiceRecordPayload,
  ServiceRecord,
} from "@/types/maintenance";

interface BackendVehicle {
  id: number;
  registrationNumber: string;
  vehicleName: string;
}

interface BackendMaintenance {
  id: number;
  vehicleId: number;
  maintenanceType: string;
  description: string | null;
  cost: number;
  status: string;
  scheduledDate: string;
  completedDate: string | null;
  createdAt: string;
  vehicle: BackendVehicle;
}

const MAINTENANCE_STATUS_COLORS: Record<string, string> = {
  OPEN: "bg-[#6b7280]",
  IN_PROGRESS: "bg-[#f97316]",
  COMPLETED: "bg-[#22c55e]",
};

const MAINTENANCE_STATUS_LABELS: Record<string, string> = {
  OPEN: "Active",
  IN_PROGRESS: "In Shop",
  COMPLETED: "Completed",
};

export async function fetchServiceRecords(): Promise<ServiceRecord[]> {
  const { data } = await apiClient.get<ApiResponse<BackendMaintenance[]>>(
    "/maintenance",
  );

  const records = (data.data ?? []).map((m) => ({
    id: `S${String(m.id).padStart(3, "0")}`,
    vehicle: m.vehicle.registrationNumber,
    serviceType: m.maintenanceType,
    cost: m.cost,
    date: new Date(m.scheduledDate).toISOString().split("T")[0],
    status: MAINTENANCE_STATUS_LABELS[m.status] ?? m.status,
    statusColor: MAINTENANCE_STATUS_COLORS[m.status] ?? "bg-[#6b7280]",
  }));

  return records;
}

export async function createServiceRecord(
  payload: CreateServiceRecordPayload,
): Promise<ServiceRecord> {
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

  const { data } = await apiClient.post<ApiResponse<BackendMaintenance>>(
    "/maintenance",
    {
      vehicleId: matchedVehicle.id,
      maintenanceType: payload.serviceType,
      cost: payload.cost,
      scheduledDate: payload.date,
    },
  );

  const record = data.data!;

  return {
    id: `S${String(record.id).padStart(3, "0")}`,
    vehicle: record.vehicle.registrationNumber,
    serviceType: record.maintenanceType,
    cost: record.cost,
    date: new Date(record.scheduledDate).toISOString().split("T")[0],
    status: MAINTENANCE_STATUS_LABELS[record.status] ?? record.status,
    statusColor: MAINTENANCE_STATUS_COLORS[record.status] ?? "bg-[#6b7280]",
  };
}

export async function completeServiceRecord(id: number) {
  const { data } = await apiClient.patch<ApiResponse<BackendMaintenance>>(
    `/maintenance/${id}/complete`,
  );
  return data.data;
}

export async function deleteServiceRecord(id: number) {
  await apiClient.delete(`/maintenance/${id}`);
}
