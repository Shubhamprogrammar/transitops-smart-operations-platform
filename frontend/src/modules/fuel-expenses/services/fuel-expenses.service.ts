import type { FuelLog, OtherExpense } from "@/types/fuel-expenses";
import { FUEL_LOGS, OTHER_EXPENSES } from "../constants/data";

export async function fetchFuelLogs(): Promise<FuelLog[]> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<FuelLog[]>>("/fuel-logs");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));
  return FUEL_LOGS;
}

export async function fetchOtherExpenses(): Promise<OtherExpense[]> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<OtherExpense[]>>("/other-expenses");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));
  return OTHER_EXPENSES;
}
