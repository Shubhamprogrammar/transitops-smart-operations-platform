"use client";

import type { TripStatus } from "@/types/trips";
import { useUpdateTripStatus } from "../hooks/useTrips";

type TripStatusFlow = {
  status: TripStatus;
  color: string;
  transitions: { label: string; targetStatus: string; color: string }[];
};

const STATUS_FLOW: Record<string, TripStatusFlow> = {
  Draft: {
    status: "Draft",
    color: "bg-[#6b7280]",
    transitions: [
      { label: "Dispatch", targetStatus: "DISPATCHED", color: "bg-[#d97706]" },
      { label: "Cancel", targetStatus: "CANCELLED", color: "bg-[#ef4444]" },
    ],
  },
  Dispatched: {
    status: "Dispatched",
    color: "bg-[#d97706]",
    transitions: [
      { label: "Complete", targetStatus: "COMPLETED", color: "bg-[#22c55e]" },
      { label: "Cancel", targetStatus: "CANCELLED", color: "bg-[#ef4444]" },
    ],
  },
  Active: {
    status: "Active",
    color: "bg-[#3b82f6]",
    transitions: [
      { label: "Complete", targetStatus: "COMPLETED", color: "bg-[#22c55e]" },
      { label: "Cancel", targetStatus: "CANCELLED", color: "bg-[#ef4444]" },
    ],
  },
  Completed: {
    status: "Completed",
    color: "bg-[#22c55e]",
    transitions: [],
  },
  Cancelled: {
    status: "Cancelled",
    color: "bg-[#ef4444]",
    transitions: [],
  },
};

const ALL_STEPS: { label: TripStatus; color: string }[] = [
  { label: "Draft", color: "bg-[#22c55e]" },
  { label: "Dispatched", color: "bg-[#3b82f6]" },
  { label: "Active", color: "bg-[#3b82f6]" },
  { label: "Completed", color: "bg-[#22c55e]" },
  { label: "Cancelled", color: "bg-[#ef4444]" },
];

interface TripLifecycleProps {
  selectedTripId: string | null;
  currentStatus?: TripStatus;
  tripNumericId?: number;
}

export function TripLifecycle({
  selectedTripId,
  currentStatus,
  tripNumericId,
}: TripLifecycleProps) {
  const { mutate: updateStatus, isPending } = useUpdateTripStatus();

  const active = currentStatus ?? "Draft";
  const flow = STATUS_FLOW[active];

  const handleTransition = (targetStatus: string) => {
    if (!tripNumericId || isPending) return;
    updateStatus({ tripId: tripNumericId, status: targetStatus });
  };

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Trip Lifecycle
      </h3>

      {!selectedTripId ? (
        <p className="text-xs text-[#6b7280]">
          Select a trip from the Live Board to manage its status.
        </p>
      ) : (
        <>
          {/* Status steps visual */}
          <div className="flex items-center gap-2">
            {ALL_STEPS.map((step, index) => {
              const isActive = step.label === active;
              const isPast =
                ALL_STEPS.findIndex((s) => s.label === active) > index ||
                (active === "Cancelled" &&
                  index < ALL_STEPS.findIndex((s) => s.label === "Cancelled"));
              const isCancelledPath =
                active === "Cancelled" && step.label === "Cancelled";

              return (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`h-4 w-4 rounded-full ${
                        isActive || isPast
                          ? isCancelledPath
                            ? "bg-[#ef4444]"
                            : step.color
                          : "bg-[#374151]"
                      }`}
                    />
                    <span
                      className={`text-[10px] ${
                        isActive ? "text-white" : "text-[#9ca3af]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < ALL_STEPS.length - 1 && (
                    <div className="mb-4 h-px w-6 bg-[#374151]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Transition buttons */}
          {flow && flow.transitions.length > 0 && (
            <div className="mt-4 flex gap-2">
              {flow.transitions.map((t) => (
                <button
                  key={t.targetStatus}
                  onClick={() => handleTransition(t.targetStatus)}
                  disabled={isPending}
                  className={`rounded-md px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm transition hover:opacity-80 disabled:opacity-40 ${t.color}`}
                >
                  {isPending ? "Updating…" : t.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
