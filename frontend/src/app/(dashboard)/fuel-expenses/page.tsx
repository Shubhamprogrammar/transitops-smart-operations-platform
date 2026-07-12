"use client";

import { useState } from "react";
import { useFleet } from "@/modules/fleet/hooks/useFleet";
import { CostSummary } from "@/modules/fuel-expenses/components/cost-summary";
import { CreateExpenseModal } from "@/modules/fuel-expenses/components/create-expense-modal";
import { CreateFuelLogModal } from "@/modules/fuel-expenses/components/create-fuel-log-modal";
import { FuelLogTable } from "@/modules/fuel-expenses/components/fuel-log-table";
import { OtherExpensesTable } from "@/modules/fuel-expenses/components/other-expenses-table";
import { useFuelExpenses } from "@/modules/fuel-expenses/hooks/useFuelExpenses";

export default function FuelExpensesPage() {
  const { fuelLogs, otherExpenses, totalOperationalCost } = useFuelExpenses();
  const { data: vehicles = [] } = useFleet();
  const [showFuelModal, setShowFuelModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const vehicleRegNos = vehicles.map((v) => v.regNo);

  return (
    <div className="space-y-6">
      <FuelLogTable
        logs={fuelLogs.data ?? []}
        isLoading={fuelLogs.isLoading}
        onAddFuel={() => setShowFuelModal(true)}
      />
      <OtherExpensesTable
        expenses={otherExpenses.data ?? []}
        isLoading={otherExpenses.isLoading}
        onAddExpense={() => setShowExpenseModal(true)}
      />
      <CostSummary total={totalOperationalCost} />

      <CreateFuelLogModal
        open={showFuelModal}
        onClose={() => setShowFuelModal(false)}
        vehicles={vehicleRegNos}
      />
      <CreateExpenseModal
        open={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        vehicles={vehicleRegNos}
      />
    </div>
  );
}
