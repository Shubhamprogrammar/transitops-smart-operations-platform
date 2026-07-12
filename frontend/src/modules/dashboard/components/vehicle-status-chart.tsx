import type { VehicleStatus } from "@/types/dashboard";

interface VehicleStatusChartProps {
  data: VehicleStatus[];
  isLoading: boolean;
}

export function VehicleStatusChart({
  data,
  isLoading,
}: VehicleStatusChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-md border border-[#262626] bg-[#111827] p-4">
      <h2 className="mb-4 text-sm font-semibold text-white">Vehicle Status</h2>
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
          : data.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[#d1d5db]">{item.label}</span>
                  <span className="font-medium text-white">{item.value}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#262626]">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{
                      width: total ? `${(item.value / total) * 100}%` : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
