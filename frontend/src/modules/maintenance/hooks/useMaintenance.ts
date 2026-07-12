import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateServiceRecordPayload, ServiceRecord } from "@/types/maintenance";
import { QUERY_KEYS } from "@/utils/constants";
import {
  createServiceRecord,
  fetchServiceRecords,
} from "../services/maintenance.service";

export function useMaintenance() {
  return useQuery({
    queryKey: QUERY_KEYS.MAINTENANCE,
    queryFn: fetchServiceRecords,
  });
}

export function useCreateServiceRecord() {
  const queryClient = useQueryClient();

  return useMutation<ServiceRecord, Error, CreateServiceRecordPayload>({
    mutationFn: createServiceRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MAINTENANCE });
    },
  });
}
