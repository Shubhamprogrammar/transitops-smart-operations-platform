"use client";

import { FilterSelect } from "@/components/ui/filter-select";
import {
  resetDashboardFilters,
  setDashboardFilter,
} from "@/store/slices/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function DashboardFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.dashboard.filters);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
        Filters
      </span>
      <FilterSelect
        label="Vehicle Type"
        value={filters.vehicleType}
        onChange={(value) =>
          dispatch(setDashboardFilter({ key: "vehicleType", value }))
        }
        options={["All", "Van", "Truck", "Mini"]}
      />
      <FilterSelect
        label="Status"
        value={filters.status}
        onChange={(value) =>
          dispatch(setDashboardFilter({ key: "status", value }))
        }
        options={["All", "Active", "Available", "In Maintenance"]}
      />
      <FilterSelect
        label="Region"
        value={filters.region}
        onChange={(value) =>
          dispatch(setDashboardFilter({ key: "region", value }))
        }
        options={["All", "North", "South", "East", "West"]}
      />
      <button
        onClick={() => dispatch(resetDashboardFilters())}
        className="text-xs text-[#9ca3af] underline-offset-2 hover:text-white hover:underline"
      >
        Reset
      </button>
    </div>
  );
}
