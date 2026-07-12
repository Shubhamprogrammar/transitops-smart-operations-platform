import { apiClient } from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { Driver } from "@/types/drivers";

interface BackendDriver {
  id: number;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: string;
  createdAt: string;
  trips: unknown[];
}

interface CreateDriverPayload {
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
}

const DRIVER_STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-[#22c55e]",
  ON_TRIP: "bg-[#3b82f6]",
  SUSPENDED: "bg-[#f97316]",
};

const DRIVER_STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Available",
  ON_TRIP: "On Trip",
  SUSPENDED: "Suspended",
};

export async function fetchDrivers(): Promise<Driver[]> {
  const { data } = await apiClient.get<ApiResponse<BackendDriver[]>>("/drivers");

  const drivers = (data.data ?? []).map((d) => {
    const expiryDate = new Date(d.licenseExpiry);
    const now = new Date();
    const diff = expiryDate.getTime() - now.getTime();
    const daysToExpiry = Math.ceil(diff / (1000 * 60 * 60 * 24));

    let safety = "Good";
    let safetyColor = "bg-[#22c55e]";
    if (daysToExpiry < 30) {
      safety = "Expiring";
      safetyColor = "bg-[#f97316]";
    }
    if (daysToExpiry < 0) {
      safety = "Expired";
      safetyColor = "bg-[#ef4444]";
    }

    const statusColor = DRIVER_STATUS_COLORS[d.status] ?? "bg-[#6b7280]";
    const statusLabel = DRIVER_STATUS_LABELS[d.status] ?? d.status;

    return {
      id: String(d.id),
      name: d.name,
      licenseNo: d.licenseNumber,
      category: d.licenseNumber.substring(0, 2).toUpperCase(),
      expiry: expiryDate.toLocaleDateString("en-IN"),
      contact: d.phone,
      tripCompliance: `${d.trips?.length ?? 0} trips`,
      safety,
      safetyColor,
      status: statusLabel,
      statusColor,
    };
  });

  return drivers;
}

export async function createDriver(
  payload: CreateDriverPayload,
): Promise<BackendDriver> {
  const { data } = await apiClient.post<ApiResponse<BackendDriver>>(
    "/drivers",
    payload,
  );
  return data.data!;
}
