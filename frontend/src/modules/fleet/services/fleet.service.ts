import type { Vehicle } from "@/types/fleet";

export async function fetchVehicles(): Promise<Vehicle[]> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.get<ApiResponse<Vehicle[]>>("/vehicles");
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    {
      regNo: "GJ01AB1234",
      makeModel: "VAN-05",
      type: "Van",
      capacity: "500 kg",
      odometer: "94,000",
      avgCost: "₹ 20,000",
      status: "Available",
      statusColor: "bg-[#22c55e]",
    },
    {
      regNo: "GJ01AB9992",
      makeModel: "TRUCK-01",
      type: "Truck",
      capacity: "5 Ton",
      odometer: "1,92,000",
      avgCost: "₹ 4,50,000",
      status: "On Trip",
      statusColor: "bg-[#3b82f6]",
    },
    {
      regNo: "GJ01AB8210",
      makeModel: "MINI-03",
      type: "Mini",
      capacity: "1 Ton",
      odometer: "66,000",
      avgCost: "₹ 40,000",
      status: "In Stop",
      statusColor: "bg-[#f97316]",
    },
    {
      regNo: "GJ01AB0012",
      makeModel: "VAN-09",
      type: "Van",
      capacity: "750 kg",
      odometer: "2,41,900",
      avgCost: "₹ 5,90,000",
      status: "Retired",
      statusColor: "bg-[#f87171]",
    },
  ];
}
