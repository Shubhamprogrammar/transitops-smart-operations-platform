import type { Driver } from "@/types/drivers";

interface DriversTableProps {
  drivers: Driver[];
  isLoading: boolean;
  error: Error | null;
}

export function DriversTable({ drivers, isLoading, error }: DriversTableProps) {
  return (
    <div className="rounded-md border border-[#262626] bg-[#111827]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0a0a0a] text-[#9ca3af]">
            <tr>
              <th className="px-4 py-2 font-medium">Driver</th>
              <th className="px-4 py-2 font-medium">License No</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Expiry</th>
              <th className="px-4 py-2 font-medium">Contact</th>
              <th className="px-4 py-2 font-medium">Trip Compl.</th>
              <th className="px-4 py-2 font-medium">Safety</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-[#9ca3af]">
                  Loading drivers…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-[#ef4444]">
                  Failed to load drivers.
                </td>
              </tr>
            ) : (
              drivers.map((d) => (
                <tr key={d.id} className="text-[#d1d5db]">
                  <td className="px-4 py-3 font-medium text-white">{d.name}</td>
                  <td className="px-4 py-3">{d.licenseNo}</td>
                  <td className="px-4 py-3">{d.category}</td>
                  <td className="px-4 py-3">{d.expiry}</td>
                  <td className="px-4 py-3">{d.contact}</td>
                  <td className="px-4 py-3">{d.tripCompliance}</td>
                  <td className="px-4 py-3">
                    <Badge color={d.safetyColor} label={d.safety} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge color={d.statusColor} label={d.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span
      className={`inline-block rounded-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${color}`}
    >
      {label}
    </span>
  );
}
