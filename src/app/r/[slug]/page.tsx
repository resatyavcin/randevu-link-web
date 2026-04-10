import { notFound } from "next/navigation";

import { BookingForm } from "@/app/r/[slug]/booking-form";
import {
  type CompanyApiEnvelope,
  companyFromApiData,
  type CompanyResponse,
} from "@/lib/types";

const API_BASE = process.env.API_BASE_URL ?? "http://127.0.0.1:8080";

async function fetchCompanyBySlug(slug: string): Promise<CompanyResponse | null> {
  const url = `${API_BASE}/api/v1/companies/slug/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = (await res.json()) as CompanyApiEnvelope;
    if (!json.success || json.data == null) return null;
    const company = companyFromApiData(json.data);
    return company.active ? company : null;
  } catch {
    return null;
  }
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await fetchCompanyBySlug(slug);

  if (!company) notFound();

  return (
    <div className="w-full px-4 pb-10 pt-4 sm:px-6 lg:px-10">
      <BookingForm company={company} />
    </div>
  );
}
