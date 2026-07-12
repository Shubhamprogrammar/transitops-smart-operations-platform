"use client";

import { useState } from "react";
import type { ServiceRecord } from "@/types/maintenance";
import {
  useCompleteServiceRecord,
  useDeleteServiceRecord,
} from "../hooks/useMaintenance";

interface ServiceLogTableProps {
  records: ServiceRecord[];
  isLoading: boolean;
}

export function ServiceLogTable({ records, isLoading }: ServiceLogTableProps) {
  const { mutate: completeRecord, isPending: isCompleting } =
    useCompleteServiceRecord();
  const { mutate: deleteRecord, isPending: isDeleting } =
    useDeleteServiceRecord();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleComplete = (id: string) => {
    const numericId = Number(id.replace(/^S/, ""));
    completeRecord(numericId);
  };

  const handleDelete = (id: string) => {
    const numericId = Number(id.replace(/^S/, ""));
    deleteRecord(numericId);
    setConfirmDelete(null);
  };

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Service Log
      </h3>
      <div className="rounded-md border border-[#262626] bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0a0a] text-[#9ca3af]">
              <tr>
                <th className="px-4 py-2 font-medium">Vehicle</th>
                <th className="px-4 py-2 font-medium">Service</th>
                <th className="px-4 py-2 font-medium">Cost</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-[#9ca3af]">
                    Loading service log…
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="text-[#d1d5db]">
                    <td className="px-4 py-3 font-medium text-white">
                      {r.vehicle}
                    </td>
                    <td className="px-4 py-3">{r.serviceType}</td>
                    <td className="px-4 py-3">₹ {r.cost.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${r.statusColor}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {r.status !== "Completed" && (
                          <button
                            onClick={() => handleComplete(r.id)}
                            disabled={isCompleting}
                            className="rounded bg-[#22c55e]/20 px-2 py-1 text-[10px] font-semibold text-[#22c55e] transition hover:bg-[#22c55e]/30 disabled:opacity-40"
                          >
                            Complete
                          </button>
                        )}
                        {confirmDelete === r.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDelete(r.id)}
                              disabled={isDeleting}
                              className="rounded bg-[#ef4444]/20 px-2 py-1 text-[10px] font-semibold text-[#ef4444] transition hover:bg-[#ef4444]/30"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="rounded bg-[#374151] px-2 py-1 text-[10px] text-[#9ca3af] transition hover:bg-[#4b5563]"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(r.id)}
                            className="rounded bg-[#ef4444]/10 px-2 py-1 text-[10px] font-semibold text-[#ef4444] transition hover:bg-[#ef4444]/20"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
