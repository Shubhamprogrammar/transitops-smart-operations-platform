import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_DEPOT_CONFIG } from "@/modules/settings/constants/data";
import type { DepotConfig } from "@/types/settings";

interface SettingsState {
  depotConfig: DepotConfig;
}

const initialState: SettingsState = {
  depotConfig: DEFAULT_DEPOT_CONFIG,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateDepotConfig: (state, action: PayloadAction<Partial<DepotConfig>>) => {
      state.depotConfig = { ...state.depotConfig, ...action.payload };
    },
  },
});

export const { updateDepotConfig } = settingsSlice.actions;
export default settingsSlice.reducer;
