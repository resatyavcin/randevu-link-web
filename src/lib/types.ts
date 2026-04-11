export type CompanyResponse = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  timezone: string | null;
  logoUrl: string | null;
  headerImgUrl: string | null;
  active: boolean;
};

export type CompanyApiData = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phoneNumber?: string | null;
  phone?: string | null;
  email: string | null;
  address: string | null;
  timezone: string | null;
  logoUrl?: string | null;
  imageUrl?: string | null;
  headerImgUrl?: string | null;
  headerImg?: string | null;
  headerImageUrl?: string | null;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CompanyApiEnvelope = {
  success: boolean;
  message?: string;
  data?: CompanyApiData | null;
};

export function companyFromApiData(raw: CompanyApiData): CompanyResponse {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description,
    phone: raw.phoneNumber ?? raw.phone ?? null,
    email: raw.email,
    address: raw.address,
    timezone: raw.timezone,
    logoUrl: raw.logoUrl ?? raw.imageUrl ?? null,
    headerImgUrl:
      raw.headerImgUrl ??
      raw.headerImg ??
      raw.headerImageUrl ??
      null,
    active: raw.active,
  };
}

export type EmployeeResponse = {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  active: boolean;
  serviceIds: string[];
};

export type ServiceResponse = {
  id: string;
  companyId: string;
  name: string;
  description: string | null;
  durationMinutes: number;
  price: number;
  currency: string;
  active: boolean;
};

export type AvailableSlot = {
  startTime: string;
  endTime: string;
  selectable: boolean;
  reason: string;
};

export type AppointmentResponse = {
  id: string;
  companyId: string;
  customerName: string;
  customerPhoneNumber: string;
  startTime: string;
  endTime: string;
  status: string;
};
