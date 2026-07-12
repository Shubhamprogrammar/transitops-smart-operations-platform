import type { OtherExpense } from "@/types/fuel-expenses";

interface OtherExpensesTableProps {
  expenses: OtherExpense[];
  isLoading: boolean;
}

export function OtherExpensesTable({
  expenses,
  isLoading,
}: OtherExpensesTableProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
          Other Expenses (Toll / Misc)
        </h3>
        <button className="rounded-md bg-[#b45309] px-3 py-1 text-[10px] font-semibold text-white transition hover:bg-[#92400e]">
          + Add Expense
        </button>
      </div>
      <div className="rounded-md border border-[#262626] bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0a0a] text-[#9ca3af]">
              <tr>
                <th className="px-4 py-2 font-medium">Trip</th>
                <th className="px-4 py-2 font-medium">Vehicle</th>
                <th className="px-4 py-2 font-medium">Toll</th>
                <th className="px-4 py-2 font-medium">Other</th>
                <th className="px-4 py-2 font-medium">Maint. Linked</th>
                <th className="px-4 py-2 font-medium">Total</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-[#9ca3af]">
                    Loading expenses…
                  </td>
                </tr>
              ) : (
                expenses.map((e) => (
                  <tr key={e.id} className="text-[#d1d5db]">
                    <td className="px-4 py-3 font-medium text-white">{e.trip}</td>
                    <td className="px-4 py-3">{e.vehicle}</td>
                    <td className="px-4 py-3">{e.toll}</td>
                    <td className="px-4 py-3">{e.other}</td>
                    <td className="px-4 py-3">
                      ₹ {e.maintenanceLinked.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      ₹ {e.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${e.statusColor}`}
                      >
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
