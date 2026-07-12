import type { FuelLog } from "@/types/fuel-expenses";

interface FuelLogTableProps {
  logs: FuelLog[];
  isLoading: boolean;
}

export function FuelLogTable({ logs, isLoading }: FuelLogTableProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
          Fuel Logs
        </h3>
        <button className="rounded-md bg-[#b45309] px-3 py-1 text-[10px] font-semibold text-white transition hover:bg-[#92400e]">
          + Log Fuel
        </button>
      </div>
      <div className="rounded-md border border-[#262626] bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0a0a] text-[#9ca3af]">
              <tr>
                <th className="px-4 py-2 font-medium">Vehicle</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Liters</th>
                <th className="px-4 py-2 font-medium">Fuel Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-[#9ca3af]">
                    Loading fuel logs…
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="text-[#d1d5db]">
                    <td className="px-4 py-3 font-medium text-white">
                      {log.vehicle}
                    </td>
                    <td className="px-4 py-3">{log.date}</td>
                    <td className="px-4 py-3">{log.liters}</td>
                    <td className="px-4 py-3">
                      ₹ {log.fuelCost.toLocaleString()}
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
