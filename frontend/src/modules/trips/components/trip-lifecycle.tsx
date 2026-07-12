"use client";

import type { TripStatus } from "@/types/trips";

const STEPS: { label: TripStatus; color: string }[] = [
  { label: "Draft", color: "bg-[#22c55e]" },
  { label: "Dispatched", color: "bg-[#3b82f6]" },
  { label: "Completed", color: "bg-[#6b7280]" },
  { label: "Cancelled", color: "bg-[#6b7280]" },
];

export function TripLifecycle({ active = "Draft" }: { active?: TripStatus }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Trip Lifecycle
      </h3>
      <div className="flex items-center gap-2">
        {STEPS.map((step, index) => {
          const isActive = step.label === active;
          const isPast =
            STEPS.findIndex((s) => s.label === active) > index;
          return (
            <div key={step.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`h-4 w-4 rounded-full ${
                    isActive || isPast ? step.color : "bg-[#374151]"
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
              {index < STEPS.length - 1 && (
                <div className="mb-4 h-px w-8 bg-[#374151]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
