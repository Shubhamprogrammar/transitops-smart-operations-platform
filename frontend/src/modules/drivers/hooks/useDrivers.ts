import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { createDriver, fetchDrivers } from "../services/drivers.service";

export function useDrivers() {
  return useQuery({
    queryKey: QUERY_KEYS.DRIVERS,
    queryFn: fetchDrivers,
  });
}

export function useCreateDriver() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { name: string; phone: string; licenseNumber: string; licenseExpiry: string }
  >({
    mutationFn: (payload) => createDriver(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DRIVERS });
    },
  });
}
