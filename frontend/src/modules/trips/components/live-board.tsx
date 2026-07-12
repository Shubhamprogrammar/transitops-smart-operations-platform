import type { Trip } from "@/types/trips";

interface LiveBoardProps {
  trips: Trip[];
  isLoading: boolean;
  selectedTripId?: string | null;
  onSelectTrip?: (id: string | null) => void;
}

export function LiveBoard({
  trips,
  isLoading,
  selectedTripId,
  onSelectTrip,
}: LiveBoardProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
          Live Board
        </h3>
        {selectedTripId && (
          <button
            onClick={() => onSelectTrip?.(null)}
            className="text-[10px] text-[#9ca3af] underline-offset-2 hover:text-white hover:underline"
          >
            Deselect
          </button>
        )}
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-[#9ca3af]">Loading trips…</p>
        ) : (
          trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onSelectTrip?.(trip.id)}
              className={`cursor-pointer rounded-md border bg-[#111827] p-4 transition hover:border-[#d97706]/50 ${
                selectedTripId === trip.id
                  ? "border-[#d97706] ring-1 ring-[#d97706]/30"
                  : "border-dashed border-[#374151]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-white">
                    {trip.id}
                  </p>
                  <p className="mt-1 text-sm text-[#d1d5db]">
                    {trip.source} → {trip.destination}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${trip.statusColor}`}
                  >
                    {trip.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#9ca3af]">
                    {trip.vehicle || "Unassigned"} / {trip.driver || "—"}
                  </p>
                  <p className="mt-1 text-xs text-[#9ca3af]">{trip.eta}</p>
                </div>
              </div>
              {trip.note && (
                <p className="mt-2 text-xs text-[#f97316]">{trip.note}</p>
              )}
            </div>
          ))
        )}
        {!isLoading && trips.length === 0 && (
          <p className="text-sm text-[#9ca3af]">
            No trips yet. Create one to get started.
          </p>
        )}
      </div>

      <p className="mt-4 text-[10px] text-[#9ca3af]">
        On Complete: odometer → fuel log → expenses → Vehicle & Driver
        Available
      </p>
    </div>
  );
}
