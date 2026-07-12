"use client";

interface DriverStatusTogglesProps {
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

const STATUSES = [
  { label: "Available", color: "bg-[#22c55e]", value: "Available" },
  { label: "On Trip", color: "bg-[#3b82f6]", value: "On Trip" },
  { label: "Suspended", color: "bg-[#f97316]", value: "Suspended" },
];

export function DriverStatusToggles({
  selectedStatus,
  onStatusChange,
}: DriverStatusTogglesProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Filter by Status
      </span>
      <button
        onClick={() => onStatusChange(null)}
        className={`rounded-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:opacity-80 ${
          selectedStatus === null
            ? "bg-[#374151] ring-1 ring-[#d97706]"
            : "bg-[#374151]/60"
        }`}
      >
        All
      </button>
      {STATUSES.map((s) => (
        <button
          key={s.label}
          onClick={() =>
            onStatusChange(selectedStatus === s.value ? null : s.value)
          }
          className={`rounded-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:opacity-80 ${
            s.color
          } ${selectedStatus === s.value ? "ring-1 ring-white" : "opacity-70"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
