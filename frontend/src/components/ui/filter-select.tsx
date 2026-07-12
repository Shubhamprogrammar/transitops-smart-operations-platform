"use client";

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
}: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-[#374151] bg-[#111827] py-1.5 pl-3 pr-8 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {label}: {opt}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#9ca3af]">
        ▼
      </span>
    </div>
  );
}
