"use client";

import type { MonthlyRevenue } from "@/types/analytics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueChartProps {
  data: MonthlyRevenue[];
  isLoading: boolean;
}

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
  return (
    <div className="rounded-md border border-[#262626] bg-[#111827] p-4">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">
        Monthly Revenue
      </h3>
      <div className="h-64 w-full">
        {isLoading ? (
          <div className="flex h-full items-end gap-2 px-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 animate-pulse rounded-sm bg-[#374151]"
                style={{ height: `${((i % 5) + 2) * 16}%` }}
              />
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#374151" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#374151" }}
                tickLine={false}
                tickFormatter={(value: number) => `₹${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  borderColor: "#374151",
                  borderRadius: "0.375rem",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) =>
                  typeof value === "number"
                    ? [`₹ ${value.toLocaleString()}`, "Revenue"]
                    : [String(value), "Revenue"]
                }
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
