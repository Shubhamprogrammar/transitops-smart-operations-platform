import type { CreateServiceRecordPayload, ServiceRecord } from "@/types/maintenance";

export async function fetchServiceRecords(): Promise<ServiceRecord[]> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    {
      id: "S001",
      vehicle: "VAN-05",
      serviceType: "Oil Change",
      cost: 2500,
      date: "2026-07-10",
      status: "In Shop",
      statusColor: "bg-[#f97316]",
    },
    {
      id: "S002",
      vehicle: "TRUCK-01",
      serviceType: "Engine Repair",
      cost: 15000,
      date: "2026-07-08",
      status: "Completed",
      statusColor: "bg-[#22c55e]",
    },
    {
      id: "S003",
      vehicle: "MINI-03",
      serviceType: "Tyre Replace",
      cost: 6200,
      date: "2026-07-06",
      status: "In Shop",
      statusColor: "bg-[#f97316]",
    },
  ];
}

export async function createServiceRecord(
  payload: CreateServiceRecordPayload
): Promise<ServiceRecord> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    id: `S${Math.floor(Math.random() * 1000)}`,
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
}
