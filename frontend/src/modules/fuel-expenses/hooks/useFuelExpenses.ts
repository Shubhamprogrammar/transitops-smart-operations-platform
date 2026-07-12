import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import {
  createExpense,
  createFuelLog,
  fetchFuelLogs,
  fetchOtherExpenses,
} from "../services/fuel-expenses.service";

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

export function useCreateFuelLog() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    {
      vehicle: string;
      liters: number;
      cost: number;
      fuelStation?: string;
      filledAt: string;
    }
  >({
    mutationFn: (payload) => createFuelLog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FUEL_LOGS });
    },
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    {
      vehicle: string;
      expenseType: string;
      amount: number;
      description?: string;
      expenseDate: string;
    }
  >({
    mutationFn: (payload) => createExpense(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OTHER_EXPENSES });
    },
  });
}
