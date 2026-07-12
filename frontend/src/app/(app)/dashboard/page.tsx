"use client";

import { useState } from "react";

const STATS = [
  { label: "Active Vehicles", value: "53", color: "border-[#22c55e]" },
  { label: "Available Vehicles", value: "42", color: "border-[#22c55e]" },
  { label: "Vehicles in Maintenance", value: "05", color: "border-[#f97316]" },
  { label: "Active Trips", value: "18", color: "border-[#3b82f6]" },
  { label: "Pending Trips", value: "09", color: "border-[#3b82f6]" },
  { label: "Vehicles on Duty", value: "26", color: "border-[#3b82f6]" },
  { label: "Fleet Utilization", value: "81%", color: "border-[#22c55e]" },
];

const TRIPS = [
  { id: "TR001", vehicle: "VAN-05", driver: "Ajay", status: "On Trip", eta: "45 min", statusColor: "bg-[#22c55e]" },
  { id: "TR002", vehicle: "TRUCK-01", driver: "John", status: "Completed", eta: "—", statusColor: "bg-[#22c55e]" },
  { id: "TR003", vehicle: "MINI-03", driver: "Priya", status: "Scheduled", eta: "In 10m", statusColor: "bg-[#3b82f6]" },
  { id: "TR004", vehicle: "—", driver: "—", status: "In Garage", eta: "Awaiting vehicle", statusColor: "bg-[#6b7280]" },
];

const VEHICLE_STATUS = [
  { label: "Available", value: 42, color: "bg-[#22c55e]" },
  { label: "On Trip", value: 18, color: "bg-[#3b82f6]" },
  { label: "In Stop", value: 8, color: "bg-[#f97316]" },
  { label: "Replaced", value: 3, color: "bg-[#ef4444]" },
];

export default function DashboardPage() {
  const [vehicleType, setVehicleType] = useState("All");
  const [status, setStatus] = useState("All");
  const [region, setRegion] = useState("All");

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

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-md border-l-4 ${stat.color} bg-[#111827] p-4`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
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
                {TRIPS.map((trip) => (
                  <tr key={trip.id} className="text-[#d1d5db]">
                    <td className="px-4 py-3 font-medium text-white">{trip.id}</td>
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
                ))}
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
            {VEHICLE_STATUS.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[#d1d5db]">{item.label}</span>
                  <span className="font-medium text-white">{item.value}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#262626]">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${(item.value / 53) * 100}%` }}
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
