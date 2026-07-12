import type { CreateTripPayload, Trip } from "@/types/trips";

export async function fetchTrips(): Promise<Trip[]> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
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
}

export async function createTrip(payload: CreateTripPayload): Promise<Trip> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    id: `TR${Math.floor(Math.random() * 1000)}`,
    source: payload.source,
    destination: payload.destination,
    vehicle: payload.vehicle,
    driver: payload.driver,
    status: "Draft",
    statusColor: "bg-[#6b7280]",
    eta: "Awaiting driver",
    note: "",
  };
}
