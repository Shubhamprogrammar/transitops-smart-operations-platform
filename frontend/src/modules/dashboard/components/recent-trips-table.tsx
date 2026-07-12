import type { RecentTrip } from "@/types/dashboard";

interface RecentTripsTableProps {
  trips: RecentTrip[];
  isLoading: boolean;
}

export function RecentTripsTable({ trips, isLoading }: RecentTripsTableProps) {
  return (
    <div className="lg:col-span-2 rounded-md border border-[#262626] bg-[#111827]">
      <div className="border-b border-[#262626] px-4 py-3">
        <h2 className="text-sm font-semibold text-white">Recent Trips</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0a0a0a] text-[#9ca3af]">
            <tr>
              <th className="px-4 py-2 font-medium">Trip</th>
              <th className="px-4 py-2 font-medium">Vehicle</th>
              <th className="px-4 py-2 font-medium">Driver</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-[#9ca3af]">
                  Loading trips…
                </td>
              </tr>
            ) : (
              trips.map((trip) => (
                <tr key={trip.id} className="text-[#d1d5db]">
                  <td className="px-4 py-3 font-medium text-white">{trip.id}</td>
                  <td className="px-4 py-3">{trip.vehicle}</td>
                  <td className="px-4 py-3">{trip.driver}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${trip.statusColor}`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{trip.eta}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
