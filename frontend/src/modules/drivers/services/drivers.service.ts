import type { Driver } from "@/types/drivers";
import { DRIVERS } from "../constants/data";

export async function fetchDrivers(): Promise<Driver[]> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<Driver[]>>("/drivers");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));
  return DRIVERS;
}
