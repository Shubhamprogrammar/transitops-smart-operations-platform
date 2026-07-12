import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { createVehicle, fetchVehicles } from "../services/fleet.service";

export function useFleet() {
  return useQuery({
    queryKey: QUERY_KEYS.FLEET,
    queryFn: fetchVehicles,
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    {
      vehicleName: string;
      registrationNumber: string;
      vehicleType: string;
      capacity: number;
    }
  >({
    mutationFn: (payload) => createVehicle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FLEET });
    },
  });
}
