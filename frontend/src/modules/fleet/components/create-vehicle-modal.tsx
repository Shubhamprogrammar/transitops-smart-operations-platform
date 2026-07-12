"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useCreateVehicle } from "../hooks/useFleet";

const VEHICLE_TYPES = ["Van", "Truck", "Mini", "Bus", "Trailer"];

interface CreateVehicleModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateVehicleModal({
  open,
  onClose,
}: CreateVehicleModalProps) {
  const { mutate, isPending, error } = useCreateVehicle();
  const [vehicleName, setVehicleName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Van");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        vehicleName,
        registrationNumber,
        vehicleType,
        capacity: Number(capacity),
      },
      {
        onSuccess: () => {
          setVehicleName("");
          setRegistrationNumber("");
          setVehicleType("Van");
          setCapacity("");
          onClose();
        },
      },
    );
  };

  const isFormValid =
    vehicleName.trim() &&
    registrationNumber.trim() &&
    vehicleType.trim() &&
    Number(capacity) > 0;

  return (
    <Modal open={open} onClose={onClose} title="Add Vehicle">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Vehicle Name / Model
          </label>
          <input
            type="text"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            placeholder="e.g. VAN-05"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Registration Number
          </label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder="e.g. GJ01AB1234"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Vehicle Type
          </label>
          <div className="relative">
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            >
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
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
            Capacity (kg)
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="e.g. 500"
            min="1"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
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
            {isPending ? "Saving…" : "Add Vehicle"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
