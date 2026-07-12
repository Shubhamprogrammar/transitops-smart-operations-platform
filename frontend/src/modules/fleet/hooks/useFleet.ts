import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { fetchVehicles } from "../services/fleet.service";

export function useFleet() {
  return useQuery({
    queryKey: QUERY_KEYS.FLEET,
    queryFn: fetchVehicles,
  });
}
