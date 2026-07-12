"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useCreateDriver } from "../hooks/useDrivers";

interface CreateDriverModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateDriverModal({ open, onClose }: CreateDriverModalProps) {
  const { mutate, isPending, error } = useCreateDriver();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, phone, licenseNumber, licenseExpiry },
      {
        onSuccess: () => {
          setName("");
          setPhone("");
          setLicenseNumber("");
          setLicenseExpiry("");
          onClose();
        },
      },
    );
  };

  const isFormValid =
    name.trim() && phone.trim() && licenseNumber.trim() && licenseExpiry.trim();

  return (
    <Modal open={open} onClose={onClose} title="Add Driver">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Driver Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 9876543210"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            License Number
          </label>
          <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="e.g. DL-88215"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            License Expiry
          </label>
          <input
            type="date"
            value={licenseExpiry}
            onChange={(e) => setLicenseExpiry(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
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
            {isPending ? "Saving…" : "Add Driver"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
