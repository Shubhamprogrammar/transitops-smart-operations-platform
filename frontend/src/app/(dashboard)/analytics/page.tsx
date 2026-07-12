"use client";

import { CostliestVehiclesChart } from "@/modules/analytics/components/costliest-vehicles-chart";
import { RevenueChart } from "@/modules/analytics/components/revenue-chart";
import { StatCards } from "@/modules/analytics/components/stat-cards";
import { useAnalytics } from "@/modules/analytics/hooks/useAnalytics";

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalytics();

  return (
    <div className="space-y-6">
      <StatCards stats={data?.stats} isLoading={isLoading} />

      {!isLoading && data && (
        <p className="text-xs text-[#9ca3af]">{data.roiFormula}</p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={data?.monthlyRevenue ?? []} isLoading={isLoading} />
        <CostliestVehiclesChart
          vehicles={data?.topCostliestVehicles ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
