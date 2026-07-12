"use client";

import { useState } from "react";
import { DriverStatusToggles } from "@/modules/drivers/components/driver-status-toggles";
import { DriversTable } from "@/modules/drivers/components/drivers-table";
import { CreateDriverModal } from "@/modules/drivers/components/create-driver-modal";
import { useDrivers } from "@/modules/drivers/hooks/useDrivers";

export default function DriversPage() {
  const { data: drivers = [], isLoading, error } = useDrivers();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredDrivers = statusFilter
    ? drivers.filter(
        (d) => d.status.toLowerCase() === statusFilter.toLowerCase(),
      )
    : drivers;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <DriverStatusToggles
          selectedStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-md bg-[#b45309] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#92400e]"
        >
          + Add Driver
        </button>
      </div>

      <DriversTable
        drivers={filteredDrivers}
        isLoading={isLoading}
        error={error}
      />

      <p className="text-[11px] text-[#f97316]">
        Rule: Expired license or Suspended status → blocked from trip
        assignment.
      </p>

      <CreateDriverModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
