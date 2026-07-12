import type { Driver } from "@/types/drivers";

export async function fetchDrivers(): Promise<Driver[]> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    {
      id: "D001",
      name: "Alex",
      licenseNo: "DL-88215",
      category: "LMV",
      expiry: "12/2028",
      contact: "98765xxxxx",
      tripCompliance: "96%",
      safety: "Available",
      safetyColor: "bg-[#22c55e]",
      status: "Available",
      statusColor: "bg-[#22c55e]",
    },
    {
      id: "D002",
      name: "John",
      licenseNo: "DL-44120",
      category: "HMV",
      expiry: "03/2025 EXPIRE",
      contact: "98220xxxxx",
      tripCompliance: "87%",
      safety: "Suspended",
      safetyColor: "bg-[#f97316]",
      status: "Suspended",
      statusColor: "bg-[#f97316]",
    },
    {
      id: "D003",
      name: "Priya",
      licenseNo: "DL-77031",
      category: "LMV",
      expiry: "08/2027",
      contact: "99110xxxxx",
      tripCompliance: "99%",
      safety: "On Trip",
      safetyColor: "bg-[#3b82f6]",
      status: "On Trip",
      statusColor: "bg-[#3b82f6]",
    },
    {
      id: "D004",
      name: "Suresh",
      licenseNo: "DL-10045",
      category: "HMV",
      expiry: "01/2027",
      contact: "97440xxxxx",
      tripCompliance: "88%",
      safety: "Available",
      safetyColor: "bg-[#22c55e]",
      status: "Off Duty",
      statusColor: "bg-[#6b7280]",
    },
  ];
}
