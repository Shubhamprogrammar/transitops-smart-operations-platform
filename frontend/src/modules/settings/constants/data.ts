import type { DepotConfig, RbacRole } from "@/types/settings";

export const DEFAULT_DEPOT_CONFIG: DepotConfig = {
  depotName: "Gandhinagar Depot 624",
  currency: "INR (₹)",
  distanceUnit: "Kilometers",
};

export const RBAC_ROLES: RbacRole[] = [
  {
    role: "Fleet Manager",
    permissions: {
      fleet: "✓",
      drivers: "✓",
      trips: "—",
      fuelExpenses: "—",
      analytics: "✓",
    },
  },
  {
    role: "Dispatcher",
    permissions: {
      fleet: "View",
      drivers: "—",
      trips: "✓",
      fuelExpenses: "✓",
      analytics: "—",
    },
  },
  {
    role: "Safety Officer",
    permissions: {
      fleet: "—",
      drivers: "✓",
      trips: "View",
      fuelExpenses: "—",
      analytics: "—",
    },
  },
  {
    role: "Financial Analyst",
    permissions: {
      fleet: "View",
      drivers: "—",
      trips: "—",
      fuelExpenses: "✓",
      analytics: "✓",
    },
  },
];
