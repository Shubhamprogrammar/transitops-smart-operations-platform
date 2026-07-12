import type { Trip } from "@/types/trips";

export const TRIPS: Trip[] = [
  {
    id: "TR001",
    source: "Gandhinagar Depot",
    destination: "Ahmedabad Hub",
    vehicle: "VAN-05",
    driver: "Alex",
    status: "Dispatched",
    statusColor: "bg-[#3b82f6]",
    eta: "45 min",
    note: "",
  },
  {
    id: "TR004",
    source: "Vatva Industrial Area",
    destination: "Sanand Warehouse",
    vehicle: "TRUCK-01",
    driver: "Suresh",
    status: "Draft",
    statusColor: "bg-[#6b7280]",
    eta: "Awaiting driver",
    note: "",
  },
  {
    id: "TR006",
    source: "Manasa",
    destination: "Kalol Depot",
    vehicle: "",
    driver: "",
    status: "Cancelled",
    statusColor: "bg-[#f87171]",
    eta: "",
    note: "Vehicle went to shop",
  },
];
