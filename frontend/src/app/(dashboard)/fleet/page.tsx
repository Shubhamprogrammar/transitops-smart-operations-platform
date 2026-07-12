"use client";

import { FleetFilters } from "@/modules/fleet/components/fleet-filters";
import { VehicleTable } from "@/modules/fleet/components/vehicle-table";
import { useFleet } from "@/modules/fleet/hooks/useFleet";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

export default function FleetPage() {
  const { data: vehicles = [], isLoading, error } = useFleet();
  const filters = useAppSelector((state) => state.fleet.filters);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesType = filters.type === "All" || v.type === filters.type;
      const matchesStatus =
        filters.status === "All" || v.status === filters.status;
      const matchesSearch =
        filters.search === "" ||
        v.regNo.toLowerCase().includes(filters.search.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [vehicles, filters]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FleetFilters />
        <button className="rounded-md bg-[#b45309] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#92400e]">
          + Add Vehicle
        </button>
      </div>

      <VehicleTable
        vehicles={filtered}
        isLoading={isLoading}
        error={error}
      />

      <p className="text-[11px] text-[#f97316]">
        Note: Registration No. must be unique. Retired/On Stop vehicles are
        hidden from Trip Dispatch.
      </p>
    </div>
  );
}
