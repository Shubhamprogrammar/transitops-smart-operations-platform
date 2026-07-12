"use client";

import { useState } from "react";
import { useCreateTrip } from "../hooks/useTrips";

const AVAILABLE_VEHICLES = [
  { value: "VAN-05", label: "VAN-05 — 500 kg capacity", capacity: 500 },
  { value: "TRUCK-01", label: "TRUCK-01 — 5 Ton capacity", capacity: 5000 },
  { value: "MINI-03", label: "MINI-03 — 1 Ton capacity", capacity: 1000 },
];

const AVAILABLE_DRIVERS = ["Alex", "Suresh"];

export function CreateTripForm() {
  const { mutate, isPending } = useCreateTrip();
  const [source, setSource] = useState("Gandhinagar Depot");
  const [destination, setDestination] = useState("Ahmedabad Hub");
  const [vehicle, setVehicle] = useState("VAN-05");
  const [driver, setDriver] = useState("Alex");
  const [cargoWeight, setCargoWeight] = useState(700);
  const [plannedDistance, setPlannedDistance] = useState(32);

  const selectedVehicle = AVAILABLE_VEHICLES.find((v) => v.value === vehicle);
  const capacityExceeded = selectedVehicle
    ? cargoWeight > selectedVehicle.capacity
    : false;
  const excess = selectedVehicle ? cargoWeight - selectedVehicle.capacity : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (capacityExceeded) return;

    mutate({
      source,
      destination,
      vehicle,
      driver,
      cargoWeight,
      plannedDistance,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Create Trip
      </h3>

      <Field label="Source" value={source} onChange={setSource} />
      <Field label="Destination" value={destination} onChange={setDestination} />

      <div>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
          Vehicle (Available only)
        </label>
        <select
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
        >
          {AVAILABLE_VEHICLES.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
          Driver (Available only)
        </label>
        <select
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
        >
          {AVAILABLE_DRIVERS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <NumberField
        label="Cargo Weight (kg)"
        value={cargoWeight}
        onChange={setCargoWeight}
      />
      <NumberField
        label="Planned Distance (km)"
        value={plannedDistance}
        onChange={setPlannedDistance}
      />

      {capacityExceeded && selectedVehicle && (
        <div className="rounded-md border border-[#ef4444] bg-[#1a0505] px-3 py-2 text-xs text-[#fca5a5]">
          <p>Vehicle Capacity: {selectedVehicle.capacity} kg</p>
          <p>Cargo Weight: {cargoWeight} kg</p>
          <p className="font-semibold">
            ✕ Capacity exceeded by {excess} kg — dispatch blocked
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending || capacityExceeded}
          className="flex-1 rounded-md bg-[#b45309] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#92400e] disabled:opacity-60"
        >
          {isPending ? "Dispatching…" : "Dispatch Vehicle"}
        </button>
        <button
          type="button"
          className="rounded-md border border-[#374151] bg-[#111827] px-4 py-2 text-xs font-semibold text-[#d1d5db] transition hover:bg-[#1f2937]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
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
