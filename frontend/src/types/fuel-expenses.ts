export interface FuelLog {
  id: string;
  vehicle: string;
  date: string;
  liters: string;
  fuelCost: number;
}

export interface OtherExpense {
  id: string;
  trip: string;
  vehicle: string;
  toll: number;
  other: number;
  maintenanceLinked: number;
  total: number;
  status: string;
  statusColor: string;
}
