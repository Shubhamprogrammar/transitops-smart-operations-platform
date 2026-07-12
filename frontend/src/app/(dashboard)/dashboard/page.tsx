"use client";

import { DashboardFilters } from "@/modules/dashboard/components/dashboard-filters";
import { RecentTripsTable } from "@/modules/dashboard/components/recent-trips-table";
import { StatCard } from "@/modules/dashboard/components/stat-card";
import { VehicleStatusChart } from "@/modules/dashboard/components/vehicle-status-chart";
import { useDashboard } from "@/modules/dashboard/hooks/useDashboard";
import { useAppSelector } from "@/store/hooks";

const STATS_META: {
  key: "activeVehicles" | "availableVehicles" | "vehiclesInMaintenance" | "activeTrips" | "pendingTrips" | "vehiclesOnDuty" | "fleetUtilization";
  label: string;
  color: string;
}[] = [
  { key: "activeVehicles", label: "Active Vehicles", color: "border-[#22c55e]" },
  { key: "availableVehicles", label: "Available Vehicles", color: "border-[#22c55e]" },
  { key: "vehiclesInMaintenance", label: "Vehicles in Maintenance", color: "border-[#f97316]" },
  { key: "activeTrips", label: "Active Trips", color: "border-[#3b82f6]" },
  { key: "pendingTrips", label: "Pending Trips", color: "border-[#3b82f6]" },
  { key: "vehiclesOnDuty", label: "Vehicles on Duty", color: "border-[#3b82f6]" },
  { key: "fleetUtilization", label: "Fleet Utilization", color: "border-[#22c55e]" },
];

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  const filters = useAppSelector((state) => state.dashboard.filters);

  const stats = data?.stats;
  const recentTrips = data?.recentTrips ?? [];
  const vehicleStatus = data?.vehicleStatus ?? [];

  // NOTE: filters are stored in Redux; here they can be used to call a
  // filtered endpoint once the backend supports it.
  void filters;

  return (
    <div className="space-y-6">
      <DashboardFilters />

      {error && (
        <p className="text-sm text-[#ef4444]">
          Failed to load dashboard data.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {isLoading
          ? Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="rounded-md border-l-4 border-[#374151] bg-[#111827] p-4"
              >
                <div className="h-3 w-16 animate-pulse rounded bg-[#374151]" />
                <div className="mt-2 h-7 w-10 animate-pulse rounded bg-[#374151]" />
              </div>
            ))
          : stats &&
            STATS_META.map((stat) => {
              const value = stats[stat.key];
              const displayValue =
                stat.key === "fleetUtilization"
                  ? `${value}%`
                  : String(value).padStart(2, "0");
              return (
                <StatCard
                  key={stat.key}
                  label={stat.label}
                  value={displayValue}
                  color={stat.color}
                />
              );
            })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentTripsTable trips={recentTrips} isLoading={isLoading} />
        <VehicleStatusChart data={vehicleStatus} isLoading={isLoading} />
      </div>
    </div>
  );
}
