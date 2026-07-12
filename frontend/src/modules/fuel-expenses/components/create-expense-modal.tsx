"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useCreateExpense } from "../hooks/useFuelExpenses";

const EXPENSE_TYPES = [
  { value: "TOLL", label: "Toll" },
  { value: "PARKING", label: "Parking" },
  { value: "REPAIR", label: "Repair" },
  { value: "OTHER", label: "Other" },
];

interface CreateExpenseModalProps {
  open: boolean;
  onClose: () => void;
  vehicles: string[]; // available vehicle registration numbers
}

export function CreateExpenseModal({
  open,
  onClose,
  vehicles,
}: CreateExpenseModalProps) {
  const { mutate, isPending, error } = useCreateExpense();
  const [vehicle, setVehicle] = useState(vehicles[0] ?? "");
  const [expenseType, setExpenseType] = useState("TOLL");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        vehicle,
        expenseType,
        amount: Number(amount),
        description: description.trim() || undefined,
        expenseDate,
      },
      {
        onSuccess: () => {
          setAmount("");
          setDescription("");
          setExpenseDate(new Date().toISOString().split("T")[0]);
          onClose();
        },
      },
    );
  };

  const isFormValid =
    vehicle.trim() && expenseType.trim() && Number(amount) > 0 && expenseDate.trim();

  return (
    <Modal open={open} onClose={onClose} title="Add Expense">
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
            Expense Type
          </label>
          <div className="relative">
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            >
              {EXPENSE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
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
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 120"
            min="1"
            step="0.01"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Ahmedabad-Vadodara Highway toll"
            className="w-full rounded-md border border-[#374151] bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            Date
          </label>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
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
            {isPending ? "Saving…" : "Add Expense"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
