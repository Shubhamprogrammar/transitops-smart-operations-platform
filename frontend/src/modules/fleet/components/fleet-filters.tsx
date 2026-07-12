"use client";

import { FilterSelect } from "@/components/ui/filter-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetFleetFilters,
  setFleetFilter,
} from "@/store/slices/fleetSlice";

const TYPES = ["All", "Van", "Truck", "Mini"];
const STATUSES = ["All", "Available", "On Trip", "In Stop", "Retired"];

export function FleetFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.fleet.filters);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect
        label="Type"
        value={filters.type}
        onChange={(value) => dispatch(setFleetFilter({ key: "type", value }))}
        options={TYPES}
      />
      <FilterSelect
        label="Status"
        value={filters.status}
        onChange={(value) =>
          dispatch(setFleetFilter({ key: "status", value }))
        }
        options={STATUSES}
      />
      <input
        type="text"
        value={filters.search}
        onChange={(e) =>
          dispatch(setFleetFilter({ key: "search", value: e.target.value }))
        }
        placeholder="Search reg no..."
        className="rounded-md border border-[#374151] bg-[#111827] px-3 py-1.5 text-xs text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
      />
      <button
        onClick={() => dispatch(resetFleetFilters())}
        className="text-xs text-[#9ca3af] underline-offset-2 hover:text-white hover:underline"
      >
        Reset
      </button>
    </div>
  );
}
