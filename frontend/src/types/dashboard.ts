export interface DashboardStats {
  activeVehicles: number;
  availableVehicles: number;
  vehiclesInMaintenance: number;
  activeTrips: number;
  pendingTrips: number;
  vehiclesOnDuty: number;
  fleetUtilization: number;
}

export interface RecentTrip {
  id: string;
  vehicle: string;
  driver: string;
  status: string;
  statusColor: string;
  eta: string;
}

export interface VehicleStatus {
  label: string;
  value: number;
  color: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentTrips: RecentTrip[];
  vehicleStatus: VehicleStatus[];
}
