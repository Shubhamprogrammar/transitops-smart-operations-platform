"use client";

import { CostSummary } from "@/modules/fuel-expenses/components/cost-summary";
import { FuelLogTable } from "@/modules/fuel-expenses/components/fuel-log-table";
import { OtherExpensesTable } from "@/modules/fuel-expenses/components/other-expenses-table";
import { useFuelExpenses } from "@/modules/fuel-expenses/hooks/useFuelExpenses";

export default function FuelExpensesPage() {
  const { fuelLogs, otherExpenses, totalOperationalCost } = useFuelExpenses();

  return (
    <div className="space-y-6">
      <FuelLogTable logs={fuelLogs.data ?? []} isLoading={fuelLogs.isLoading} />
      <OtherExpensesTable
        expenses={otherExpenses.data ?? []}
        isLoading={otherExpenses.isLoading}
      />
      <CostSummary total={totalOperationalCost} />
    </div>
  );
}
