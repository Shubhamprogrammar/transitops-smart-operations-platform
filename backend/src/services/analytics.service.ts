import { prisma } from "../config/prisma";

export const getAnalyticsData = async () => {
  const [
    totalVehicles,
    vehiclesOnTrip,
    totalDrivers,
    fuelAggregation,
    expenseAggregation,
    totalTrips,
    completedTrips,
    vehicles,
    fuelLogs,
    maintenanceAggregation,
  ] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { status: "ON_TRIP" } }),
    prisma.driver.count(),
    prisma.fuelLog.aggregate({ _sum: { liters: true, cost: true } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.trip.count(),
    prisma.trip.count({ where: { status: "COMPLETED" } }),
    prisma.vehicle.findMany({
      include: { fuelLogs: true, expenses: true, maintenances: true },
    }),
    prisma.fuelLog.findMany({ include: { vehicle: true } }),
    prisma.maintenance.aggregate({ _sum: { cost: true } }),
  ]);

  // Fuel Efficiency: total km / total liters across all trips
  const totalLiters = fuelAggregation._sum.liters ?? 0;
  const totalFuelCost = fuelAggregation._sum.cost ?? 0;
  const totalExpenses = expenseAggregation._sum.amount ?? 0;
  const totalMaintenanceCost = maintenanceAggregation._sum.cost ?? 0;
  const fleetUtilization =
    totalVehicles > 0
      ? Math.round((vehiclesOnTrip / totalVehicles) * 100)
      : 0;

  // Estimate km from fuel (rough: 4 km/l average for trucks)
  const estimatedKm = totalLiters * 4;
  const fuelEfficiency =
    totalLiters > 0
      ? `${(estimatedKm / totalLiters).toFixed(1)} km/l`
      : "—";

  const operationalCost = totalFuelCost + totalExpenses + totalMaintenanceCost;
  const vehicleRoi =
    operationalCost > 0
      ? `${(((totalTrips * 2000 - operationalCost) / operationalCost) * 100).toFixed(1)}%`
      : "—";

  // Monthly revenue from trips (estimating ₹2000/revenue per completed trip)
  const monthlyRevenue = await getMonthlyRevenue();

  // Top costliest vehicles (by total expenses + fuel + maintenance)
  const costliestVehicles = vehicles
    .map((v) => {
      const vehicleFuelCost = v.fuelLogs.reduce((s, f) => s + f.cost, 0);
      const vehicleExpenseCost = v.expenses.reduce((s, e) => s + e.amount, 0);
      const vehicleMaintenanceCost = v.maintenances.reduce(
        (s, m) => s + m.cost,
        0,
      );
      return {
        vehicle: v.registrationNumber,
        cost: vehicleFuelCost + vehicleExpenseCost + vehicleMaintenanceCost,
      };
    })
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5)
    .map((v, i) => ({
      ...v,
      color: getCostColor(i),
    }));

  return {
    stats: {
      fuelEfficiency,
      fleetUtilization: `${fleetUtilization}%`,
      operationalCost: operationalCost.toLocaleString(),
      vehicleRoi,
    },
    roiFormula:
      "ROI = (Revenue − Maintenance − Fuel) / Acquisition Cost",
    monthlyRevenue,
    topCostliestVehicles: costliestVehicles,
  };
};

async function getMonthlyRevenue() {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const results = [];

  for (let i = 6; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const yearOffset = currentMonth - i < 0 ? -1 : 0;
    const year = currentYear + yearOffset;

    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 1);

    const completedCount = await prisma.trip.count({
      where: {
        status: "COMPLETED",
        endTime: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    // Estimate revenue per completed trip (₹2000 baseline per trip)
    const amount = completedCount * 2000;

    results.push({
      month: months[monthIndex],
      amount,
    });
  }

  return results;
}

function getCostColor(index: number): string {
  const colors = [
    "bg-[#f87171]",
    "bg-[#d97706]",
    "bg-[#3b82f6]",
    "bg-[#22c55e]",
    "bg-[#a855f7]",
  ];
  return colors[index] ?? "bg-[#6b7280]";
}
