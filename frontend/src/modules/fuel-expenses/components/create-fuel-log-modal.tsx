"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useCreateFuelLog } from "../hooks/useFuelExpenses";

interface CreateFuelLogModalProps {
  open: boolean;
  onClose: () => void;
  vehicles: string[]; // available vehicle registration numbers
}

export function CreateFuelLogModal({
  open,
  onClose,
  vehicles,
}: CreateFuelLogModalProps) {
  const { mutate, isPending, error } = useCreateFuelLog();
  const [vehicle, setVehicle] = useState(vehicles[0] ?? "");
  const [liters, setLiters] = useState("");
  const [cost, setCost] = useState("");
  const [fuelStation, setFuelStation] = useState("");
  const [filledAt, setFilledAt] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        vehicle,
        liters: Number(liters),
        cost: Number(cost),
        fuelStation: fuelStation.trim() || undefined,
        filledAt,
      },
      {
        onSuccess: () => {
          setLiters("");
          setCost("");
          setFuelStation("");
          setFilledAt(new Date().toISOString().split("T")[0]);
          onClose();
        },
      },
    );
  };

  const isFormValid =
    vehicle.trim() && Number(liters) > 0 && Number(cost) > 0 && filledAt.trim();

  return (
    <Modal open={open} onClose={onClose} title="Log Fuel">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Vehicle
          </label>
          <div className="relative">
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
              required
            >
              {vehicles.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9ca3af]">
              ▼
            </span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Liters
          </label>
          <input
            type="number"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            placeholder="e.g. 42"
            min="0.1"
            step="0.1"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Cost (₹)
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="e.g. 3150"
            min="1"
            step="0.01"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Fuel Station
          </label>
          <input
            type="text"
            value={fuelStation}
            onChange={(e) => setFuelStation(e.target.value)}
            placeholder="e.g. Indian Oil - Gandhinagar"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Date
          </label>
          <input
            type="date"
            value={filledAt}
            onChange={(e) => setFilledAt(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        {error && (
          <div className="rounded-md border border-[#ef4444]/40 bg-[#1a0505] px-3 py-2 text-xs text-[#fca5a5]">
            {error.message}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-[#374151] bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-[#d1d5db] transition hover:bg-[#1f2937]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || !isFormValid}
            className="flex-1 rounded-md bg-[#b45309] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#92400e] disabled:opacity-60"
          >
            {isPending ? "Saving…" : "Log Fuel"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
