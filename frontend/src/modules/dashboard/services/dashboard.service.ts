import { apiClient } from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { DashboardData, DashboardStats, RecentTrip, VehicleStatus } from "@/types/dashboard";
import { DASHBOARD_DATA } from "../constants/data";

interface BackendSummary {
  totalVehicles: number;
  totalDrivers: number;
  activeTrips: number;
  availableVehicles: number;
  vehiclesInShop: number;
  totalFuelCost: number;
  totalExpenses: number;
}

interface BackendVehicleStatus {
  status: string;
  count: number;
}

interface BackendTrip {
  id: number;
  source: string;
  destination: string;
  status: string;
  startTime: string | null;
  endTime: string | null;
  vehicle: { registrationNumber: string };
  driver: { name: string };
}

const VEHICLE_STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "#22c55e",
  ON_TRIP: "#3b82f6",
  IN_SHOP: "#f97316",
  RETIRED: "#6b7280",
};

const TRIP_STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#3b82f6",
  COMPLETED: "#22c55e",
  CANCELLED: "#ef4444",
  DRAFT: "#6b7280",
  DISPATCHED: "#d97706",
};

const TRIP_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  DRAFT: "Draft",
  DISPATCHED: "Dispatched",
};

export async function fetchDashboardData(): Promise<DashboardData> {
  // Fetch all dashboard endpoints in parallel
  const [summaryRes, vehicleStatusRes, tripsRes] = await Promise.all([
    apiClient.get<ApiResponse<BackendSummary>>("/dashboard/summary"),
    apiClient.get<ApiResponse<BackendVehicleStatus[]>>("/dashboard/vehicle-status"),
    apiClient.get<ApiResponse<BackendTrip[]>>("/trips").catch(() => null),
  ]);

  const summary = summaryRes.data.data ?? {
    totalVehicles: 0,
    totalDrivers: 0,
    activeTrips: 0,
    availableVehicles: 0,
    vehiclesInShop: 0,
    totalFuelCost: 0,
    totalExpenses: 0,
  };
  const vehicleStatusData = vehicleStatusRes.data.data ?? [];
  const trips = tripsRes?.data?.data ?? [];

  // Transform to frontend DashboardData format
  const stats: DashboardStats = {
    activeVehicles: summary.activeTrips,
    availableVehicles: summary.availableVehicles,
    vehiclesInMaintenance: summary.vehiclesInShop,
    activeTrips: summary.activeTrips,
    pendingTrips: trips.filter((t) => t.status === "DRAFT").length,
    vehiclesOnDuty: vehicleStatusData.find((v) => v.status === "ON_TRIP")?.count ?? 0,
    fleetUtilization:
      summary.totalVehicles > 0
        ? Math.round(
            ((vehicleStatusData.find((v) => v.status === "ON_TRIP")?.count ?? 0) /
              summary.totalVehicles) *
              100,
          )
        : 0,
  };

  const vehicleStatus: VehicleStatus[] = vehicleStatusData.map((vs) => ({
    label: vs.status.replace("_", " "),
    value: vs.count,
    color: VEHICLE_STATUS_COLORS[vs.status] ?? "#6b7280",
  }));

  // Recent trips from actual trip data (fallback to mock data if no trips)
  const recentTrips: RecentTrip[] =
    trips.length > 0
      ? trips.slice(0, 5).map((t) => ({
          id: `TR${String(t.id).padStart(3, "0")}`,
          vehicle: t.vehicle.registrationNumber,
          driver: t.driver.name,
          status: TRIP_STATUS_LABELS[t.status] ?? t.status,
          statusColor: TRIP_STATUS_COLORS[t.status] ?? "#6b7280",
          eta: t.endTime
            ? new Date(t.endTime).toLocaleString("en-IN")
            : t.startTime
              ? new Date(t.startTime).toLocaleString("en-IN")
              : "—",
        }))
      : DASHBOARD_DATA.recentTrips;

  return {
    stats,
    recentTrips,
    vehicleStatus,
  };
}
