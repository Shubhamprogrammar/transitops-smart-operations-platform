import type { CostlyVehicle } from "@/types/analytics";

interface CostliestVehiclesChartProps {
  vehicles: CostlyVehicle[];
  isLoading: boolean;
}

export function CostliestVehiclesChart({
  vehicles,
  isLoading,
}: CostliestVehiclesChartProps) {
  const max = Math.max(...vehicles.map((v) => v.cost), 1);

  return (
    <div className="rounded-md border border-[#262626] bg-[#111827] p-4">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">
        Top Costliest Vehicles
      </h3>
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between">
                  <div className="h-3 w-16 animate-pulse rounded bg-[#374151]" />
                  <div className="h-3 w-10 animate-pulse rounded bg-[#374151]" />
                </div>
                <div className="h-2 w-full rounded-full bg-[#262626]">
                  <div className="h-2 w-1/3 rounded-full bg-[#374151]" />
                </div>
              </div>
            ))
          : vehicles.map((v) => (
              <div key={v.vehicle}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[#d1d5db]">{v.vehicle}</span>
                  <span className="font-medium text-white">
                    ₹ {v.cost.toLocaleString()}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#262626]">
                  <div
                    className={`h-2.5 rounded-full ${v.color}`}
                    style={{ width: `${(v.cost / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
