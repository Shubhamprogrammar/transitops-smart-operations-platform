import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FleetState {
  filters: {
    type: string;
    status: string;
    search: string;
  };
  selectedVehicleRegNo: string | null;
}

const initialState: FleetState = {
  filters: {
    type: "All",
    status: "All",
    search: "",
  },
  selectedVehicleRegNo: null,
};

const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    setFleetFilter: (
      state,
      action: PayloadAction<{ key: keyof FleetState["filters"]; value: string }>
    ) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    resetFleetFilters: (state) => {
      state.filters = initialState.filters;
    },
    selectVehicle: (state, action: PayloadAction<string | null>) => {
      state.selectedVehicleRegNo = action.payload;
    },
  },
});

export const { setFleetFilter, resetFleetFilters, selectVehicle } = fleetSlice.actions;
export default fleetSlice.reducer;
