"use client";

import * as React from "react";
import Link from "next/link";
import { Building2, Loader2Icon } from "lucide-react";

import { BookingForm } from "@/app/r/[slug]/booking-form";
import { API } from "@/app/r/[slug]/booking/shared";
import {
  type CompanyApiEnvelope,
  companyFromApiData,
  type CompanyResponse,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const primaryLinkClass = cn(
  "inline-flex h-11 w-full min-w-0 items-center justify-center rounded-lg px-4 text-sm font-medium",
  "bg-primary text-primary-foreground transition-colors",
  "hover:bg-primary/90",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "outline-none select-none",
);

function BookingNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
        <Building2 className="size-10 text-muted-foreground" />
        <h2 className="text-lg font-semibold tracking-tight">
          İşletme bulunamadı
        </h2>
        <p className="text-balance text-sm text-muted-foreground">
          Bu adrese ait bir kayıt yok veya işletme artık aktif değil.
        </p>
        <Link href="/" className={cn(primaryLinkClass, "max-w-sm")}>
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}

async function fetchCompanyBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<CompanyResponse | null> {
  const url = `${API}/companies/slug/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, { signal });
    if (res.status === 404 || !res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[r/${slug}] API yanıtı beklenmeyen durum: ${res.status}`,
          url,
        );
      }
      return null;
    }
    const json = (await res.json()) as CompanyApiEnvelope;
    if (!json.success || json.data == null) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[r/${slug}] API success=false veya data yok`, json);
      }
      return null;
    }
    const company = companyFromApiData(json.data);
    if (!company.active) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[r/${slug}] İşletme pasif (active: false); kayıt yok sayılıyor.`,
        );
      }
      return null;
    }
    return company;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[r/${slug}] API isteği başarısız (ağ / SSL / timeout?)`,
        url,
        err,
      );
    }
    return null;
  }
}

export function BookingPageContent({ slug }: { slug: string }) {
  const [company, setCompany] = React.useState<CompanyResponse | null>(null);
  const [phase, setPhase] = React.useState<"loading" | "ready" | "missing">(
    "loading",
  );

  React.useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    setPhase("loading");
    setCompany(null);
    (async () => {
      try {
        const next = await fetchCompanyBySlug(slug, ac.signal);
        if (cancelled) return;
        if (!next) {
          setPhase("missing");
          return;
        }
        setCompany(next);
        setPhase("ready");
      } catch (e) {
        if (cancelled) return;
        if (e instanceof DOMException && e.name === "AbortError") return;
        setPhase("missing");
      }
    })();
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [slug]);

  if (phase === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground text-sm">
        <Loader2Icon className="size-5 animate-spin" />
        Yükleniyor…
      </div>
    );
  }

  if (phase === "missing" || !company) {
    return <BookingNotFound />;
  }

  return <BookingForm company={company} />;
}
