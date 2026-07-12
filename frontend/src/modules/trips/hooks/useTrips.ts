import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import type { CreateTripPayload, Trip } from "@/types/trips";
import { createTrip, fetchTrips } from "../services/trips.service";

export function useTrips() {
  return useQuery({
    queryKey: QUERY_KEYS.TRIPS,
    queryFn: fetchTrips,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation<Trip, Error, CreateTripPayload>({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRIPS });
    },
  });
}
