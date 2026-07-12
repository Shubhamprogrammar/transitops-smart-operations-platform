export interface DepotConfig {
  depotName: string;
  currency: string;
  distanceUnit: string;
}

export interface RbacPermission {
  fleet: string;
  drivers: string;
  trips: string;
  fuelExpenses: string;
  analytics: string;
}

export interface RbacRole {
  role: string;
  permissions: RbacPermission;
}
