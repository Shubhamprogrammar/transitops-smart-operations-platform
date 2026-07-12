import type { AnalyticsData } from "@/types/analytics";
import { ANALYTICS_DATA } from "../constants/data";

export async function fetchAnalyticsData(): Promise<AnalyticsData> {
  // TODO: Replace with real API call once backend is ready.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return ANALYTICS_DATA;
}
