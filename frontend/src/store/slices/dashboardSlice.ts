import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  filters: {
    vehicleType: string;
    status: string;
    region: string;
  };
}

const initialState: DashboardState = {
  filters: {
    vehicleType: "All",
    status: "All",
    region: "All",
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardFilter: (
      state,
      action: PayloadAction<{ key: keyof DashboardState["filters"]; value: string }>
    ) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    resetDashboardFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setDashboardFilter, resetDashboardFilters } = dashboardSlice.actions;
export default dashboardSlice.reducer;
