import type { DashboardData } from "@/types/dashboard";
import { DASHBOARD_DATA } from "../constants/data";

export async function fetchDashboardData(): Promise<DashboardData> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<DashboardData>>("/dashboard");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));
  return DASHBOARD_DATA;
}
