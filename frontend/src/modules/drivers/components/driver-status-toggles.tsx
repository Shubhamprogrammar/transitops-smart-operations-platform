"use client";

const STATUSES = [
  { label: "Available", color: "bg-[#22c55e]" },
  { label: "On Trip", color: "bg-[#3b82f6]" },
  { label: "Off Duty", color: "bg-[#6b7280]" },
  { label: "Suspended", color: "bg-[#f97316]" },
];

export function DriverStatusToggles() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Toggle Stat
      </span>
      {STATUSES.map((s) => (
        <button
          key={s.label}
          className={`rounded-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:opacity-80 ${s.color}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
