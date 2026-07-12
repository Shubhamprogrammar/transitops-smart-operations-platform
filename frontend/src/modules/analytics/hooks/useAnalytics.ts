import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { fetchAnalyticsData } from "../services/analytics.service";

export function useAnalytics() {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS,
    queryFn: fetchAnalyticsData,
  });
}
