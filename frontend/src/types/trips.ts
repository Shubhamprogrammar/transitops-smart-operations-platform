export type TripStatus = "Draft" | "Dispatched" | "Active" | "Completed" | "Cancelled";

export interface Trip {
  id: string;
  source: string;
  destination: string;
  vehicle: string;
  driver: string;
  status: TripStatus;
  statusColor: string;
  eta: string;
  note: string;
}

export interface CreateTripPayload {
  source: string;
  destination: string;
  vehicle: string;
  driver: string;
  cargoWeight: number;
  plannedDistance: number;
}
