import type { AnalyticsStats } from "@/types/analytics";

interface StatCardsProps {
  stats: AnalyticsStats | undefined;
  isLoading: boolean;
}

const ITEMS: {
  key: keyof AnalyticsStats;
  label: string;
  color: string;
}[] = [
  { key: "fuelEfficiency", label: "Fuel Efficiency", color: "border-[#3b82f6]" },
  { key: "fleetUtilization", label: "Fleet Utilization", color: "border-[#22c55e]" },
  { key: "operationalCost", label: "Operational Cost", color: "border-[#f97316]" },
  { key: "vehicleRoi", label: "Vehicle ROI", color: "border-[#22c55e]" },
];

export function StatCards({ stats, isLoading }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md border-l-4 border-[#374151] bg-[#111827] p-4"
            >
              <div className="h-3 w-20 animate-pulse rounded bg-[#374151]" />
              <div className="mt-2 h-7 w-14 animate-pulse rounded bg-[#374151]" />
            </div>
          ))
        : ITEMS.map((item) => (
            <div
              key={item.key}
              className={`rounded-md border-l-4 ${item.color} bg-[#111827] p-4`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                {item.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {stats?.[item.key] ?? "—"}
              </p>
            </div>
          ))}
    </div>
  );
}
