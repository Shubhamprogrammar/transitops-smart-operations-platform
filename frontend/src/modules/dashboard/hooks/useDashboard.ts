import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { fetchDashboardData } from "../services/dashboard.service";

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: fetchDashboardData,
  });
}
