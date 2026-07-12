import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectVehicle } from "@/store/slices/fleetSlice";
import type { Vehicle } from "@/types/fleet";

interface VehicleTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: Error | null;
}

export function VehicleTable({ vehicles, isLoading, error }: VehicleTableProps) {
  const dispatch = useAppDispatch();
  const selectedRegNo = useAppSelector(
    (state) => state.fleet.selectedVehicleRegNo
  );

  return (
    <div className="rounded-md border border-[#262626] bg-[#111827]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0a0a0a] text-[#9ca3af]">
            <tr>
              <th className="px-4 py-2 font-medium">Reg. No. (Unique)</th>
              <th className="px-4 py-2 font-medium">Make/Model</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Capacity</th>
              <th className="px-4 py-2 font-medium">Odometer</th>
              <th className="px-4 py-2 font-medium">Avg. Cost</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-[#9ca3af]">
                  Loading vehicles…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-[#ef4444]">
                  Failed to load vehicles.
                </td>
              </tr>
            ) : (
              vehicles.map((v) => (
                <tr
                  key={v.regNo}
                  onClick={() => dispatch(selectVehicle(v.regNo))}
                  className={`cursor-pointer text-[#d1d5db] transition ${
                    selectedRegNo === v.regNo
                      ? "bg-[#1f2937]"
                      : "hover:bg-[#1f2937]/50"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-white">{v.regNo}</td>
                  <td className="px-4 py-3">{v.makeModel}</td>
                  <td className="px-4 py-3">{v.type}</td>
                  <td className="px-4 py-3">{v.capacity}</td>
                  <td className="px-4 py-3">{v.odometer}</td>
                  <td className="px-4 py-3">{v.avgCost}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${v.statusColor}`}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
            {!isLoading && !error && vehicles.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-[#9ca3af]">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
