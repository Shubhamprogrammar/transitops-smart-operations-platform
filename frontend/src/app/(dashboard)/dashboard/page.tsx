"use client";

import { useDashboard } from "@/modules/dashboard/hooks/useDashboard";
import { useState } from "react";

const STATS_META: {
  key: keyof NonNullable<ReturnType<typeof useDashboard>["data"]>["stats"];
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
  const [vehicleType, setVehicleType] = useState("All");
  const [status, setStatus] = useState("All");
  const [region, setRegion] = useState("All");

  const stats = data?.stats;
  const recentTrips = data?.recentTrips ?? [];
  const vehicleStatus = data?.vehicleStatus ?? [];
  const totalVehicles = vehicleStatus.reduce((sum, v) => sum + v.value, 0);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
          Filters
        </span>
        <FilterSelect
          label="Vehicle Type"
          value={vehicleType}
          onChange={setVehicleType}
          options={["All", "Van", "Truck", "Mini"]}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={["All", "Active", "Available", "In Maintenance"]}
        />
        <FilterSelect
          label="Region"
          value={region}
          onChange={setRegion}
          options={["All", "North", "South", "East", "West"]}
        />
      </div>

      {error && (
        <p className="text-sm text-[#ef4444]">
          Failed to load dashboard data.
        </p>
      )}

      {/* Stats */}
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
                stat.key === "fleetUtilization" ? `${value}%` : String(value).padStart(2, "0");
              return (
                <div
                  key={stat.key}
                  className={`rounded-md border-l-4 ${stat.color} bg-[#111827] p-4`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {displayValue}
                  </p>
                </div>
              );
            })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Trips */}
        <div className="lg:col-span-2 rounded-md border border-[#262626] bg-[#111827]">
          <div className="border-b border-[#262626] px-4 py-3">
            <h2 className="text-sm font-semibold text-white">Recent Trips</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0a0a0a] text-[#9ca3af]">
                <tr>
                  <th className="px-4 py-2 font-medium">Trip</th>
                  <th className="px-4 py-2 font-medium">Vehicle</th>
                  <th className="px-4 py-2 font-medium">Driver</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-[#9ca3af]"
                    >
                      Loading trips…
                    </td>
                  </tr>
                ) : (
                  recentTrips.map((trip) => (
                    <tr key={trip.id} className="text-[#d1d5db]">
                      <td className="px-4 py-3 font-medium text-white">
                        {trip.id}
                      </td>
                      <td className="px-4 py-3">{trip.vehicle}</td>
                      <td className="px-4 py-3">{trip.driver}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${trip.statusColor}`}
                        >
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{trip.eta}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vehicle Status */}
        <div className="rounded-md border border-[#262626] bg-[#111827] p-4">
          <h2 className="mb-4 text-sm font-semibold text-white">
            Vehicle Status
          </h2>
          <div className="space-y-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div className="mb-1 flex justify-between">
                      <div className="h-3 w-20 animate-pulse rounded bg-[#374151]" />
                      <div className="h-3 w-6 animate-pulse rounded bg-[#374151]" />
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#262626]">
                      <div className="h-2 w-1/3 rounded-full bg-[#374151]" />
                    </div>
                  </div>
                ))
              : vehicleStatus.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-[#d1d5db]">{item.label}</span>
                      <span className="font-medium text-white">
                        {item.value}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#262626]">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{
                          width: totalVehicles
                            ? `${(item.value / totalVehicles) * 100}%`
                            : "0%",
                        }}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-[#374151] bg-[#111827] pl-3 pr-8 py-1.5 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {label}: {opt}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#9ca3af]">
        ▼
      </span>
    </div>
  );
}
