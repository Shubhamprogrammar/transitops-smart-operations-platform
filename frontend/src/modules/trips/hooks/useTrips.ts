import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import type { CreateTripPayload, Trip } from "@/types/trips";
import {
  createTrip,
  fetchTrips,
  updateTripStatus,
} from "../services/trips.service";

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

export function useUpdateTripStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { tripId: number; status: string }
  >({
    mutationFn: ({ tripId, status }) => updateTripStatus(tripId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRIPS });
    },
  });
}
