interface CostSummaryProps {
  total: number;
}

export function CostSummary({ total }: CostSummaryProps) {
  return (
    <div className="flex items-center justify-between border-t border-[#262626] pt-3 text-xs">
      <span className="font-semibold uppercase tracking-wide text-[#9ca3af]">
        Total Operational Cost (Auto) = Fuel + Maint
      </span>
      <span className="font-bold text-[#d97706]">
        ₹ {total.toLocaleString()}
      </span>
    </div>
  );
}
