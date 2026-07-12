interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

export function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div
      className={`rounded-md border-l-4 ${color} bg-[#111827] p-4`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
