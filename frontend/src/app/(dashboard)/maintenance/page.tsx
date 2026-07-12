"use client";

import { ServiceRecordForm } from "@/modules/maintenance/components/service-record-form";
import { ServiceLogTable } from "@/modules/maintenance/components/service-log-table";
import { StatusFlow } from "@/modules/maintenance/components/status-flow";
import { useMaintenance } from "@/modules/maintenance/hooks/useMaintenance";

export default function MaintenancePage() {
  const { data: records = [], isLoading } = useMaintenance();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <ServiceRecordForm />
        <StatusFlow />
      </div>
      <ServiceLogTable records={records} isLoading={isLoading} />

      <p className="col-span-full text-[11px] text-[#f97316]">
        Note: In Shop vehicles are removed from the dispatch pool.
      </p>
    </div>
  );
}
