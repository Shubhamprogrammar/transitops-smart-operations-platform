"use client";

import { useFleet } from "@/modules/fleet/hooks/useFleet";
import { useMemo, useState } from "react";

const TYPES = ["All", "Van", "Truck", "Mini"];
const STATUSES = ["All", "Available", "On Trip", "In Stop", "Retired"];

export default function FleetPage() {
  const { data: vehicles = [], isLoading, error } = useFleet();
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesType = type === "All" || v.type === type;
      const matchesStatus = status === "All" || v.status === status;
      const matchesSearch =
        search === "" || v.regNo.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [vehicles, type, status, search]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="Type"
            value={type}
            onChange={setType}
            options={TYPES}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={STATUSES}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reg no..."
            className="rounded-md border border-[#374151] bg-[#111827] px-3 py-1.5 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
          />
        </div>
        <button className="rounded-md bg-[#b45309] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#92400e]">
          + Add Vehicle
        </button>
      </div>

      {/* Table */}
      <div className="rounded-md border border-[#262626] bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0a0a] text-[#9ca3af]">
              <tr>
                <th className="px-4 py-2 font-medium">Reg. No. (Unique)</th>
                <th className="px-4 py-2 font-medium">Make/Model</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Capacity</th>
                <th className="px-4 py-2 font-medium">Odometer</th>
                <th className="px-4 py-2 font-medium">Avg. Cost</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-[#9ca3af]"
                  >
                    Loading vehicles…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-[#ef4444]"
                  >
                    Failed to load vehicles.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v.regNo} className="text-[#d1d5db]">
                    <td className="px-4 py-3 font-medium text-white">
                      {v.regNo}
                    </td>
                    <td className="px-4 py-3">{v.makeModel}</td>
                    <td className="px-4 py-3">{v.type}</td>
                    <td className="px-4 py-3">{v.capacity}</td>
                    <td className="px-4 py-3">{v.odometer}</td>
                    <td className="px-4 py-3">{v.avgCost}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${v.statusColor}`}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
              {!isLoading && !error && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-[#9ca3af]"
                  >
                    No vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] text-[#f97316]">
        Note: Registration No. must be unique. Retired/On Stop vehicles are
        hidden from Trip Dispatch.
      </p>
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
