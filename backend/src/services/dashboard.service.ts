import { prisma } from "../config/prisma";

export const getDashboardSummary = async () => {
  const [
    totalVehicles,
    totalDrivers,
    activeTrips,
    availableVehicles,
    vehiclesInShop,
    fuelAggregation,
    expenseAggregation,
  ] = await Promise.all([
    prisma.vehicle.count(),
    prisma.driver.count(),
    prisma.trip.count({ where: { status: "ACTIVE" } }),
    prisma.vehicle.count({ where: { status: "AVAILABLE" } }),
    prisma.vehicle.count({ where: { status: "IN_SHOP" } }),
    prisma.fuelLog.aggregate({
      _sum: { cost: true },
    }),
    prisma.expense.aggregate({
      _sum: { amount: true },
    }),
  ]);

  return {
    totalVehicles,
    totalDrivers,
    activeTrips,
    availableVehicles,
    vehiclesInShop,
    totalFuelCost: fuelAggregation._sum.cost ?? 0,
    totalExpenses: expenseAggregation._sum.amount ?? 0,
  };
};

export const getVehicleStatusDistribution = async () => {
  const statuses = ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"] as const;

  const counts = await Promise.all(
    statuses.map(async (status) => {
      const count = await prisma.vehicle.count({ where: { status } });
      return { status, count };
    }),
  );

  return counts;
};

export const getTripStatusDistribution = async () => {
  const statuses = ["ACTIVE", "COMPLETED", "CANCELLED"] as const;

  const counts = await Promise.all(
    statuses.map(async (status) => {
      const count = await prisma.trip.count({ where: { status } });
      return { status, count };
    }),
  );

  return counts;
};

export const getExpensesByType = async () => {
  const expenseTypes = ["FUEL", "TOLL", "PARKING", "REPAIR", "OTHER"] as const;

  const data = await Promise.all(
    expenseTypes.map(async (expenseType) => {
      const result = await prisma.expense.aggregate({
        where: { expenseType },
        _sum: { amount: true },
      });
      return {
        expenseType,
        totalAmount: result._sum.amount ?? 0,
      };
    }),
  );

  return data;
};

export const getFuelSummary = async () => {
  const aggregation = await prisma.fuelLog.aggregate({
    _sum: {
      cost: true,
      liters: true,
    },
    _avg: {
      cost: true,
    },
  });

  return {
    totalFuelCost: aggregation._sum.cost ?? 0,
    averageFuelCost: aggregation._avg.cost ?? 0,
    totalLiters: aggregation._sum.liters ?? 0,
  };
};
