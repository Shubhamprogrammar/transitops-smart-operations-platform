import type {
  CreateServiceRecordPayload,
  ServiceRecord,
} from "@/types/maintenance";
import { SERVICE_RECORDS } from "../constants/data";

export async function fetchServiceRecords(): Promise<ServiceRecord[]> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<ServiceRecord[]>>("/maintenance");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));
  return SERVICE_RECORDS;
}

export async function createServiceRecord(
  payload: CreateServiceRecordPayload
): Promise<ServiceRecord> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.post<ApiResponse<ServiceRecord>>("/maintenance", payload);
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));

  const newRecord: ServiceRecord = {
    id: `S${String(SERVICE_RECORDS.length + 1).padStart(3, "0")}`,
    vehicle: payload.vehicle,
    serviceType: payload.serviceType,
    cost: payload.cost,
    date: payload.date,
    status: payload.status,
    statusColor:
      payload.status === "Completed"
        ? "bg-[#22c55e]"
        : payload.status === "In Shop"
        ? "bg-[#f97316]"
        : "bg-[#6b7280]",
  };

  SERVICE_RECORDS.push(newRecord);
  return newRecord;
}
