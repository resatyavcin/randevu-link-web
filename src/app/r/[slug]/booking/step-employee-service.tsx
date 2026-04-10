import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { EmployeeResponse, ServiceResponse } from "@/lib/types";

import {
  employeeLabel,
  fieldClass,
  formatPrice,
} from "@/app/r/[slug]/booking/shared";

type StepEmployeeServiceProps = {
  employees: EmployeeResponse[];
  servicesForEmployee: ServiceResponse[];
  employeeId: string;
  serviceId: string;
  onEmployeeIdChange: (id: string) => void;
  onServiceIdChange: (id: string) => void;
};

export function StepEmployeeService({
  employees,
  servicesForEmployee,
  employeeId,
  serviceId,
  onEmployeeIdChange,
  onServiceIdChange,
}: StepEmployeeServiceProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="employee" className="text-sm font-medium">
          Çalışan
        </Label>
        <select
          id="employee"
          className={cn(
            fieldClass,
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          value={employeeId}
          onChange={(ev) => onEmployeeIdChange(ev.target.value)}
          required
        >
          <option value="">Seçiniz</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {employeeLabel(emp)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="service" className="text-sm font-medium">
          Hizmet
        </Label>
        <select
          id="service"
          className={cn(
            fieldClass,
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          value={serviceId}
          onChange={(ev) => onServiceIdChange(ev.target.value)}
          disabled={!employeeId}
          required
        >
          <option value="">Seçiniz</option>
          {servicesForEmployee.map((svc) => (
            <option key={svc.id} value={svc.id}>
              {svc.name} — {formatPrice(svc.price, svc.currency)} (
              {svc.durationMinutes} dk)
            </option>
          ))}
        </select>
        {employeeId && servicesForEmployee.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Bu çalışana atanmış aktif hizmet yok.
          </p>
        ) : null}
      </div>
    </div>
  );
}
