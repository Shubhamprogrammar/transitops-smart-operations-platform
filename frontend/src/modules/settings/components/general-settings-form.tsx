"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateDepotConfig } from "@/store/slices/settingsSlice";

export function GeneralSettingsForm() {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.settings.depotConfig);

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        General
      </h3>

      <TextField
        label="Depot Name"
        value={config.depotName}
        onChange={(value) => dispatch(updateDepotConfig({ depotName: value }))}
      />
      <TextField
        label="Currency"
        value={config.currency}
        onChange={(value) => dispatch(updateDepotConfig({ currency: value }))}
      />
      <TextField
        label="Distance Unit"
        value={config.distanceUnit}
        onChange={(value) =>
          dispatch(updateDepotConfig({ distanceUnit: value }))
        }
      />

      <button className="mt-2 w-full rounded-md bg-[#3b82f6] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2563eb]">
        Save Changes
      </button>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2 text-xs text-white outline-none ring-[#3b82f6] transition focus:border-[#3b82f6] focus:ring-1"
      />
    </div>
  );
}
