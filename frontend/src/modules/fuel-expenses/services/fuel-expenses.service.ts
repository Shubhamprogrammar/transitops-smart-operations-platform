import type { FuelLog, OtherExpense } from "@/types/fuel-expenses";

export async function fetchFuelLogs(): Promise<FuelLog[]> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    {
      id: "F001",
      vehicle: "VAN-05",
      date: "05 Jul 2026",
      liters: "42 L",
      fuelCost: 3150,
    },
    {
      id: "F002",
      vehicle: "TRUCK-01",
      date: "06 Jul 2026",
      liters: "110 L",
      fuelCost: 8400,
    },
    {
      id: "F003",
      vehicle: "MINI-03",
      date: "06 Jul 2026",
      liters: "28 L",
      fuelCost: 2050,
    },
  ];
}

export async function fetchOtherExpenses(): Promise<OtherExpense[]> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    {
      id: "E001",
      trip: "TR001",
      vehicle: "VAN-05",
      toll: 120,
      other: 0,
      maintenanceLinked: 0,
      total: 120,
      status: "Available",
      statusColor: "bg-[#22c55e]",
    },
    {
      id: "E002",
      trip: "TR002",
      vehicle: "TRK-02",
      toll: 340,
      other: 150,
      maintenanceLinked: 15000,
      total: 15490,
      status: "Completed",
      statusColor: "bg-[#22c55e]",
    },
  ];
}
