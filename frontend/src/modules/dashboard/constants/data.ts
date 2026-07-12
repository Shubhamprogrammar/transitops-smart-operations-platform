import type { DashboardData } from "@/types/dashboard";

export const DASHBOARD_DATA: DashboardData = {
  stats: {
    activeVehicles: 53,
    availableVehicles: 42,
    vehiclesInMaintenance: 5,
    activeTrips: 18,
    pendingTrips: 9,
    vehiclesOnDuty: 26,
    fleetUtilization: 81,
  },
  recentTrips: [
    {
      id: "TR001",
      vehicle: "VAN-05",
      driver: "Ajay",
      status: "On Trip",
      statusColor: "bg-[#22c55e]",
      eta: "45 min",
    },
    {
      id: "TR002",
      vehicle: "TRUCK-01",
      driver: "John",
      status: "Completed",
      statusColor: "bg-[#22c55e]",
      eta: "—",
    },
    {
      id: "TR003",
      vehicle: "MINI-03",
      driver: "Priya",
      status: "Scheduled",
      statusColor: "bg-[#3b82f6]",
      eta: "In 10m",
    },
    {
      id: "TR004",
      vehicle: "—",
      driver: "—",
      status: "In Garage",
      statusColor: "bg-[#6b7280]",
      eta: "Awaiting vehicle",
    },
  ],
  vehicleStatus: [
    { label: "Available", value: 42, color: "bg-[#22c55e]" },
    { label: "On Trip", value: 18, color: "bg-[#3b82f6]" },
    { label: "In Stop", value: 8, color: "bg-[#f97316]" },
    { label: "Replaced", value: 3, color: "bg-[#ef4444]" },
  ],
};
