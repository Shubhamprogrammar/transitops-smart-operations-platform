export function StatusFlow() {
  return (
    <div className="mt-6 space-y-3">
      <FlowRow
        from="Available"
        fromColor="text-[#22c55e]"
        arrowLabel="awaiting maintenance"
        to="In Shop"
        toColor="text-[#f97316]"
      />
      <FlowRow
        from="In Shop"
        fromColor="text-[#f97316]"
        arrowLabel="closing record marks available"
        to="Available"
        toColor="text-[#22c55e]"
      />
    </div>
  );
}

function FlowRow({
  from,
  fromColor,
  arrowLabel,
  to,
  toColor,
}: {
  from: string;
  fromColor: string;
  arrowLabel: string;
  to: string;
  toColor: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className={`font-semibold ${fromColor}`}>{from}</span>
      <div className="flex flex-1 flex-col items-center">
        <span className="text-[10px] text-[#6b7280]">{arrowLabel}</span>
        <div className="h-px w-full bg-[#374151]" />
      </div>
      <span className={`font-semibold ${toColor}`}>{to}</span>
    </div>
  );
}
