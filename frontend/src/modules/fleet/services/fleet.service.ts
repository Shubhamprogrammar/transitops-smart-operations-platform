import type { Vehicle } from "@/types/fleet";
import { VEHICLES } from "../constants/data";

export async function fetchVehicles(): Promise<Vehicle[]> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<Vehicle[]>>("/vehicles");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));
  return VEHICLES;
}
