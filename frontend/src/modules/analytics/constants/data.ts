import type { AnalyticsData } from "@/types/analytics";

export const ANALYTICS_DATA: AnalyticsData = {
  stats: {
    fuelEfficiency: "8.4 km/l",
    fleetUtilization: "81%",
    operationalCost: "34,070",
    vehicleRoi: "14.2%",
  },
  roiFormula:
    "ROI = (Revenue − Maintenance − Fuel) / Acquisition Cost",
  monthlyRevenue: [
    { month: "Jan", amount: 42000 },
    { month: "Feb", amount: 58000 },
    { month: "Mar", amount: 49000 },
    { month: "Apr", amount: 72000 },
    { month: "May", amount: 61000 },
    { month: "Jun", amount: 85000 },
    { month: "Jul", amount: 78000 },
  ],
  topCostliestVehicles: [
    { vehicle: "TRUCK-01", cost: 18500, color: "bg-[#f87171]" },
    { vehicle: "MINI-03", cost: 8200, color: "bg-[#d97706]" },
    { vehicle: "VAN-05", cost: 3150, color: "bg-[#3b82f6]" },
  ],
};
