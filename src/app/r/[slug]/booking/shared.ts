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

/**
 * Yükseklik/padding; yazı boyutu Input’taki `text-base md:text-sm` kalsın — aksi halde
 * burada `text-sm` verilince iOS Safari odakta otomatik zoom tetiklenir.
 */
export const inputClass = cn(
  "h-10 min-h-10 px-3",
  "placeholder:text-muted-foreground",
);

/** Randevu formu: sabit ülke kodu; ulusal kısım 10 hane (cep: 5 ile başlar). */
export const TR_PHONE_PREFIX = "+90" as const;

/** Sadece rakamlar; baştaki 0 kaldırılır; en fazla 10 hane. */
export function normalizeTrPhoneNationalInput(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0")) d = d.slice(1);
  if (d.startsWith("90")) d = d.slice(2);
  return d.slice(0, 10);
}

export function buildTrCustomerPhone(nationalDigits: string): string {
  return `${TR_PHONE_PREFIX}${normalizeTrPhoneNationalInput(nationalDigits)}`;
}

/** E.164 benzeri: +90 ve ardından 10 haneli cep (5XXXXXXXXX). */
export function isValidTrMobileE164(full: string): boolean {
  return /^\+905\d{9}$/.test(full);
}

export function employeeLabel(e: EmployeeResponse): string {
  return `${e.firstName} ${e.lastName}`.trim();
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
  }).format(amount);
}

type ApiErrorJson = {
  message?: string;
  error?:
    | string
    | {
        errors?: Record<string, string> | null;
        status?: number;
      };
};

/** API (randevu-link-api) `ApiErrorResponse` + `ErrorResponse.errors` alan hatalarını okur. */
export async function readErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const j = JSON.parse(text) as ApiErrorJson;
    const base =
      j.message ?? (typeof j.error === "string" ? j.error : undefined) ?? text;
    const nested = j.error;
    if (nested && typeof nested === "object" && nested.errors) {
      const entries = Object.entries(nested.errors).filter(
        ([, v]) => typeof v === "string" && v.length > 0,
      );
      if (entries.length > 0) {
        const detail = entries.map(([k, v]) => `${k}: ${v}`).join(" · ");
        return `${base} (${detail})`;
      }
    }
    return base || res.statusText;
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
    serviceIds = serviceIdsRaw.filter(
      (x): x is string => typeof x === "string",
    );
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
  const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw) || 0;

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
