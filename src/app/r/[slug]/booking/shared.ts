import { cn } from "@/lib/utils";
import type { EmployeeResponse, ServiceResponse } from "@/lib/types";

export const API = "/api/v1";
export const TOTAL_STEPS = 3;

export const STEP_TITLES = [
  "Çalışan ve hizmet",
  "Tarih ve saat",
  "İletişim bilgileri",
] as const;

/** Form alanları — okunaklı ama kompakt */
export const fieldClass =
  "h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm shadow-xs outline-none md:text-sm";

export const inputClass = cn(
  "h-10 min-h-10 px-3 text-sm md:text-sm",
  "placeholder:text-muted-foreground",
);

export function employeeLabel(e: EmployeeResponse): string {
  return `${e.firstName} ${e.lastName}`.trim();
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
  }).format(amount);
}

export async function readErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const j = JSON.parse(text) as { message?: string; error?: string };
    return j.message ?? j.error ?? text;
  } catch {
    return text || res.statusText;
  }
}

function extractListFromEnvelopeData(d: unknown): unknown[] | null {
  if (d == null) return null;
  if (Array.isArray(d)) return d;
  if (typeof d === "object") {
    const o = d as Record<string, unknown>;
    for (const key of ["items", "content", "results", "records", "elements"]) {
      const v = o[key];
      if (Array.isArray(v)) return v;
    }
  }
  return null;
}

export function unwrapApiList<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  if (json && typeof json === "object" && "data" in json) {
    const envelope = json as { success?: boolean; data?: unknown };
    if (envelope.success === false) return [];
    const list = extractListFromEnvelopeData(envelope.data);
    if (list) return list as T[];
  }
  return [];
}

export function normalizeEmployee(raw: unknown): EmployeeResponse | null {
  if (raw == null || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string") return null;

  const serviceIdsRaw =
    o.serviceIds ??
    o.service_ids ??
    o.serviceIDs ??
    o.assignedServiceIds ??
    o.assigned_service_ids;
  let serviceIds: string[] = [];
  if (Array.isArray(serviceIdsRaw)) {
    serviceIds = serviceIdsRaw.filter((x): x is string => typeof x === "string");
  }

  const active = o.active ?? o.is_active ?? o.isActive;
  const activeBool = typeof active === "boolean" ? active : active !== false;

  return {
    id: o.id,
    companyId: String(o.companyId ?? o.company_id ?? ""),
    firstName: String(o.firstName ?? o.first_name ?? ""),
    lastName: String(o.lastName ?? o.last_name ?? ""),
    email: typeof o.email === "string" ? o.email : null,
    phone:
      typeof o.phone === "string"
        ? o.phone
        : typeof o.phoneNumber === "string"
          ? o.phoneNumber
          : typeof o.phone_number === "string"
            ? o.phone_number
            : null,
    active: activeBool,
    serviceIds,
  };
}

export function normalizeService(raw: unknown): ServiceResponse | null {
  if (raw == null || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string") return null;

  const duration = o.durationMinutes ?? o.duration_minutes;
  const durNum =
    typeof duration === "number" ? duration : Number(duration) || 0;
  const priceRaw = o.price;
  const price =
    typeof priceRaw === "number" ? priceRaw : Number(priceRaw) || 0;

  const active = o.active ?? o.is_active ?? o.isActive;
  const activeBool = typeof active === "boolean" ? active : active !== false;

  return {
    id: o.id,
    companyId: String(o.companyId ?? o.company_id ?? ""),
    name: String(o.name ?? ""),
    description: typeof o.description === "string" ? o.description : null,
    durationMinutes: durNum,
    price,
    currency: String(o.currency ?? "TRY"),
    active: activeBool,
  };
}
