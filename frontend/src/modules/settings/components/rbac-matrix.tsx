import { RBAC_ROLES } from "../constants/data";

const COLUMNS = [
  { key: "fleet", label: "Fleet" },
  { key: "drivers", label: "Drivers" },
  { key: "trips", label: "Trips" },
  { key: "fuelExpenses", label: "Fuel/Exp." },
  { key: "analytics", label: "Analytics" },
] as const;

export function RbacMatrix() {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Role-Based Access (RBAC)
      </h3>
      <div className="rounded-md border border-[#262626] bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0a0a] text-[#9ca3af]">
              <tr>
                <th className="px-4 py-2 font-medium">Role</th>
                {COLUMNS.map((col) => (
                  <th key={col.key} className="px-4 py-2 font-medium">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {RBAC_ROLES.map((r) => (
                <tr key={r.role} className="text-[#d1d5db]">
                  <td className="px-4 py-3 font-medium text-white">{r.role}</td>
                  {COLUMNS.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {r.permissions[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
