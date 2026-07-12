import { GeneralSettingsForm } from "@/modules/settings/components/general-settings-form";
import { RbacMatrix } from "@/modules/settings/components/rbac-matrix";

export default function SettingsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <GeneralSettingsForm />
      <RbacMatrix />
    </div>
  );
}
