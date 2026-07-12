"use client";

import type { CostlyVehicle } from "@/types/analytics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CostliestVehiclesChartProps {
  vehicles: CostlyVehicle[];
  isLoading: boolean;
}

export function CostliestVehiclesChart({
  vehicles,
  isLoading,
}: CostliestVehiclesChartProps) {
  return (
    <div className="rounded-md border border-[#262626] bg-[#111827] p-4">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">
        Top Costliest Vehicles
      </h3>
      <div className="h-64 w-full">
        {isLoading ? (
          <div className="space-y-4 px-4 pt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between">
                  <div className="h-3 w-16 animate-pulse rounded bg-[#374151]" />
                  <div className="h-3 w-10 animate-pulse rounded bg-[#374151]" />
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#262626]">
                  <div className="h-2.5 w-1/3 rounded-full bg-[#374151]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={vehicles}
              layout="vertical"
              margin={{ top: 8, right: 32, bottom: 8, left: 16 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#374151" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="vehicle"
                tick={{ fill: "#d1d5db", fontSize: 12 }}
                axisLine={{ stroke: "#374151" }}
                tickLine={false}
                width={70}
              />
              <Tooltip
                cursor={{ fill: "#1f2937" }}
                contentStyle={{
                  backgroundColor: "#111827",
                  borderColor: "#374151",
                  borderRadius: "0.375rem",
                  color: "#fff",
                }}
                formatter={(value) =>
                  typeof value === "number"
                    ? [`₹ ${value.toLocaleString()}`, "Cost"]
                    : [String(value), "Cost"]
                }
              />
              <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
                {vehicles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.color)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

function getColor(tailwindClass: string): string {
  if (tailwindClass.includes("f87171")) return "#f87171";
  if (tailwindClass.includes("d97706")) return "#d97706";
  if (tailwindClass.includes("3b82f6")) return "#3b82f6";
  return "#6b7280";
}
