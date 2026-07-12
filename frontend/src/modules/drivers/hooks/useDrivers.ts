import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { fetchDrivers } from "../services/drivers.service";

export function useDrivers() {
  return useQuery({
    queryKey: QUERY_KEYS.DRIVERS,
    queryFn: fetchDrivers,
  });
}
