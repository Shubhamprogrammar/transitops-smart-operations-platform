export interface AnalyticsStats {
  fuelEfficiency: string;
  fleetUtilization: string;
  operationalCost: string;
  vehicleRoi: string;
}

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

export interface CostlyVehicle {
  vehicle: string;
  cost: number;
  color: string;
}

export interface AnalyticsData {
  stats: AnalyticsStats;
  roiFormula: string;
  monthlyRevenue: MonthlyRevenue[];
  topCostliestVehicles: CostlyVehicle[];
}
