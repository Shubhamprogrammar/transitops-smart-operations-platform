import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { fetchFuelLogs, fetchOtherExpenses } from "../services/fuel-expenses.service";

export function useFuelExpenses() {
  const fuelLogs = useQuery({
    queryKey: [...QUERY_KEYS.FUEL_LOGS],
    queryFn: fetchFuelLogs,
  });

  const otherExpenses = useQuery({
    queryKey: [...QUERY_KEYS.OTHER_EXPENSES],
    queryFn: fetchOtherExpenses,
  });

  const totalFuel = fuelLogs.data?.reduce((sum, log) => sum + log.fuelCost, 0) ?? 0;
  const totalMaintenance =
    otherExpenses.data?.reduce((sum, exp) => sum + exp.maintenanceLinked, 0) ?? 0;
  const totalOperationalCost = totalFuel + totalMaintenance;

  return {
    fuelLogs,
    otherExpenses,
    totalOperationalCost,
  };
}
