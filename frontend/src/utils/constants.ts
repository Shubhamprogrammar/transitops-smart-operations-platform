export const ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  FLEET: "/fleet",
  DRIVERS: "/drivers",
  TRIPS: "/trips",
  MAINTENANCE: "/maintenance",
  FUEL_EXPENSES: "/fuel-expenses",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
} as const;

export const QUERY_KEYS = {
  DASHBOARD: ["dashboard"],
  FLEET: ["fleet"],
  TRIPS: ["trips"],
  DRIVERS: ["drivers"],
} as const;
