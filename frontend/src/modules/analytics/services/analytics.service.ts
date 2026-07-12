import { apiClient } from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { AnalyticsData } from "@/types/analytics";

export async function fetchAnalyticsData(): Promise<AnalyticsData> {
  const { data } = await apiClient.get<ApiResponse<AnalyticsData>>(
    "/analytics",
  );
  return data.data!;
}
