import type { ServiceRecord } from "@/types/maintenance";

export const SERVICE_RECORDS: ServiceRecord[] = [
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
