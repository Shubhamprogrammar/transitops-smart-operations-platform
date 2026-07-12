import type { MonthlyRevenue } from "@/types/analytics";

interface RevenueChartProps {
  data: MonthlyRevenue[];
  isLoading: boolean;
}

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
  const max = Math.max(...data.map((d) => d.amount), 1);

  return (
    <div className="rounded-md border border-[#262626] bg-[#111827] p-4">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">
        Monthly Revenue
      </h3>
      {isLoading ? (
        <div className="flex h-40 items-end gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 animate-pulse rounded-sm bg-[#374151]"
              style={{ height: `${((i % 5) + 2) * 16}%` }}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-end gap-2">
          {data.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-[#3b82f6] transition-all hover:bg-[#60a5fa]"
                style={{ height: `${(d.amount / max) * 100}%` }}
                title={`${d.month}: ₹ ${d.amount.toLocaleString()}`}
              />
              <span className="text-[10px] text-[#9ca3af]">{d.month}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
