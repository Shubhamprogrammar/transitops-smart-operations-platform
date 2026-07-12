import type { CreateTripPayload, Trip } from "@/types/trips";
import { TRIPS } from "../constants/data";

export async function fetchTrips(): Promise<Trip[]> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<Trip[]>>("/trips");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));
  return TRIPS;
}

export async function createTrip(payload: CreateTripPayload): Promise<Trip> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.post<ApiResponse<Trip>>("/trips", payload);
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));

  const newTrip: Trip = {
    id: `TR${String(TRIPS.length + 1).padStart(3, "0")}`,
    source: payload.source,
    destination: payload.destination,
    vehicle: payload.vehicle,
    driver: payload.driver,
    status: "Draft",
    statusColor: "bg-[#6b7280]",
    eta: "Awaiting driver",
    note: "",
  };

  TRIPS.push(newTrip);
  return newTrip;
}
