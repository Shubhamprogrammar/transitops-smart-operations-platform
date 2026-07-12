"use client";

import type { VehicleStatus } from "@/types/dashboard";
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

interface VehicleStatusChartProps {
  data: VehicleStatus[];
  isLoading: boolean;
}

export function VehicleStatusChart({
  data,
  isLoading,
}: VehicleStatusChartProps) {
  return (
    <div className="rounded-md border border-[#262626] bg-[#111827] p-4">
      <h2 className="mb-4 text-sm font-semibold text-white">Vehicle Status</h2>
      <div className="h-56 w-full">
        {isLoading ? (
          <div className="space-y-4 px-4 pt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between">
                  <div className="h-3 w-20 animate-pulse rounded bg-[#374151]" />
                  <div className="h-3 w-6 animate-pulse rounded bg-[#374151]" />
                </div>
                <div className="h-2 w-full rounded-full bg-[#262626]">
                  <div className="h-2 w-1/3 rounded-full bg-[#374151]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
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
                dataKey="label"
                tick={{ fill: "#d1d5db", fontSize: 12 }}
                axisLine={{ stroke: "#374151" }}
                tickLine={false}
                width={80}
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
                  typeof value === "number" ? [value, "Vehicles"] : [String(value), "Vehicles"]
                }
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
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
  if (tailwindClass.includes("22c55e")) return "#22c55e";
  if (tailwindClass.includes("3b82f6")) return "#3b82f6";
  if (tailwindClass.includes("f97316")) return "#f97316";
  if (tailwindClass.includes("ef4444")) return "#ef4444";
  return "#6b7280";
}
