import type { ServiceRecord } from "@/types/maintenance";

interface ServiceLogTableProps {
  records: ServiceRecord[];
  isLoading: boolean;
}

export function ServiceLogTable({ records, isLoading }: ServiceLogTableProps) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Service Log
      </h3>
      <div className="rounded-md border border-[#262626] bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0a0a] text-[#9ca3af]">
              <tr>
                <th className="px-4 py-2 font-medium">Vehicle</th>
                <th className="px-4 py-2 font-medium">Service</th>
                <th className="px-4 py-2 font-medium">Cost</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-[#9ca3af]">
                    Loading service log…
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="text-[#d1d5db]">
                    <td className="px-4 py-3 font-medium text-white">
                      {r.vehicle}
                    </td>
                    <td className="px-4 py-3">{r.serviceType}</td>
                    <td className="px-4 py-3">₹ {r.cost.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${r.statusColor}`}
                      >
                        {r.status}
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
