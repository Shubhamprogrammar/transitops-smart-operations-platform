"use client";

import { useState } from "react";
import { useCreateServiceRecord } from "../hooks/useMaintenance";

const VEHICLES = ["VAN-05", "TRUCK-01", "MINI-03"];
const STATUSES = ["Active", "In Shop", "Completed"];

export function ServiceRecordForm() {
  const { mutate, isPending } = useCreateServiceRecord();
  const [vehicle, setVehicle] = useState("VAN-05");
  const [serviceType, setServiceType] = useState("Oil Change");
  const [cost, setCost] = useState(2500);
  const [date, setDate] = useState("2026-07-12");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ vehicle, serviceType, cost, date, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Log Service Record
      </h3>

      <div>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
          Vehicle
        </label>
        <select
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
        >
          {VEHICLES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <TextField label="Service Type" value={serviceType} onChange={setServiceType} />
      <NumberField label="Cost" value={cost} onChange={setCost} />
      <TextField label="Date" value={date} onChange={setDate} type="date" />

      <div>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-md bg-[#b45309] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#92400e] disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
      />
    </div>
  );
}
