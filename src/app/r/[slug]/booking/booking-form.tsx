"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ListX,
  Loader2Icon,
  MapPin,
  Phone,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fireBookingConfetti } from "@/lib/booking-confetti";
import { cn } from "@/lib/utils";
import type {
  AvailableSlot,
  CompanyResponse,
  EmployeeResponse,
  ServiceResponse,
} from "@/lib/types";

import {
  API,
  buildTrCustomerPhone,
  isValidTrMobileE164,
  normalizeEmployee,
  normalizeService,
  readErrorMessage,
  TOTAL_STEPS,
  unwrapApiList,
} from "@/app/r/[slug]/booking/shared";
import { StepContact } from "@/app/r/[slug]/booking/step-contact";
import { StepDateTime } from "@/app/r/[slug]/booking/step-datetime";
import { StepEmployeeService } from "@/app/r/[slug]/booking/step-employee-service";
import { StepProgress } from "@/app/r/[slug]/booking/step-progress";

/** Aynı görsel URL’si kalsa bile tarayıcı önbelleğini kırar. Sorgulu URL’lere ekleme yapmıyoruz (imzalı adresler bozulmasın). */
function withImageCacheBust(url: string, version: string | null): string {
  const v = version?.trim();
  if (!v) return url;
  const u = url.trim();
  if (!u || u.startsWith("data:") || u.startsWith("blob:")) return u;
  if (u.includes("?")) return u;
  return `${u}?v=${encodeURIComponent(v)}`;
}

function CompanyCardHeaderBanner({
  headerImgUrl,
  companyName,
  imageVersion,
}: {
  headerImgUrl: string | null;
  companyName: string;
  imageVersion: string | null;
}) {
  const [broken, setBroken] = React.useState(false);
  const src = headerImgUrl?.trim() ?? "";
  const showImg = src.length > 0 && !broken;

  return (
    <div className="relative isolate h-32 w-full shrink-0 overflow-hidden">
      {showImg ? (
        <img
          src={withImageCacheBust(src, imageVersion)}
          alt={`${companyName} kapak görseli`}
          className="size-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 bg-linear-to-br from-[#5b4fd9] via-[#8b5cf6] to-[#c084fc] dark:from-[#4338ca] dark:via-[#6366f1] dark:to-[#06b6d4]"
            aria-hidden
          />
          <div
            className="absolute -top-10 left-[8%] size-44 rounded-full bg-[#fde68a]/45 blur-3xl dark:bg-[#a5b4fc]/30"
            aria-hidden
          />
          <div
            className="absolute top-6 -right-8 size-48 rounded-full bg-[#f9a8d4]/50 blur-3xl dark:bg-[#22d3ee]/25"
            aria-hidden
          />
          <div
            className="absolute bottom-[-20%] left-[35%] size-40 rounded-full bg-white/35 blur-2xl dark:bg-[#818cf8]/20"
            aria-hidden
          />
        </>
      )}
      <div
        className="absolute inset-0 bg-linear-to-t from-card/90 via-card/20 to-transparent dark:from-card/95"
        aria-hidden
      />
    </div>
  );
}

function CompanyBookingLogo({
  logoUrl,
  companyName,
  imageVersion,
  className,
}: {
  logoUrl: string | null;
  companyName: string;
  imageVersion: string | null;
  className?: string;
}) {
  const [broken, setBroken] = React.useState(false);
  const src = logoUrl?.trim() ?? "";
  const showImg = src.length > 0 && !broken;

  return (
    <div
      className={cn(
        "flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-muted/50",
        showImg ? "shadow-xs" : "",
        className,
      )}
    >
      {showImg ? (
        <img
          src={withImageCacheBust(src, imageVersion)}
          alt={`${companyName} logosu`}
          className="size-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <Building2
          className="size-9 text-muted-foreground"
          strokeWidth={1.25}
          aria-hidden
        />
      )}
    </div>
  );
}

type BookingSuccessSummary = {
  serviceName: string;
  employeeName: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerPhoneNumber: string;
  customerEmail: string | null;
  notes: string | null;
};

function formatSlotSummary(startIso: string, endIso: string): string {
  const start = parseISO(startIso);
  const end = parseISO(endIso);
  return `${format(start, "d MMMM yyyy", { locale: tr })} · ${format(start, "HH:mm")}–${format(end, "HH:mm")}`;
}

function summaryRow(
  label: string,
  value: string,
  options?: { breakAll?: boolean; preLine?: boolean },
) {
  return (
    <div className="flex flex-col gap-0.5 border-border/50 border-b py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-2.5">
      <dt className="text-muted-foreground text-xs font-medium tracking-wide">
        {label}
      </dt>
      <dd
        className={cn(
          "text-right font-medium text-sm sm:text-end",
          options?.breakAll && "break-all",
          options?.preLine && "whitespace-pre-line",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function BookingSuccessPanel({
  company,
  summary,
  onNewBooking,
}: {
  company: CompanyResponse;
  summary: BookingSuccessSummary;
  onNewBooking: () => void;
}) {
  const desc = (company.description ?? "").trim();
  const phone = (company.phone ?? "").trim();
  const address = (company.address ?? "").trim();

  return (
    <div
      className="mx-auto flex w-full max-w-md flex-col gap-8 py-2"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Randevu kaydı başarılı.</span>
      <div className="flex justify-center">
        <CircleCheck
          className="size-16 shrink-0 text-emerald-600 dark:text-emerald-400"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>

      <div className="space-y-8">
        <section className="text-left">
          <h3 className="mb-3 font-semibold text-foreground text-sm">
            Randevu bilgileri
          </h3>
          <dl>
            {summaryRow(
              "Tarih ve saat",
              formatSlotSummary(summary.startTime, summary.endTime),
            )}
            {summaryRow("Hizmet", summary.serviceName)}
            {summaryRow("Uzman", summary.employeeName)}
            {summaryRow("Ad soyad", summary.customerName)}
            {summaryRow("Telefon", summary.customerPhoneNumber)}
            {summary.customerEmail
              ? summaryRow("E-posta", summary.customerEmail, {
                  breakAll: true,
                })
              : null}
            {summary.notes
              ? summaryRow("Not", summary.notes, { breakAll: true })
              : null}
          </dl>
        </section>

        <section className="text-left">
          <h3 className="mb-3 font-semibold text-foreground text-sm">
            İşletme bilgileri
          </h3>
          <dl>
            {summaryRow("Ad", company.name)}
            {desc.length > 0
              ? summaryRow("Açıklama", desc, { breakAll: true })
              : null}
            {phone.length > 0 ? summaryRow("Tel", phone) : null}
            {address.length > 0
              ? summaryRow("Adres", address, {
                  breakAll: true,
                  preLine: true,
                })
              : null}
          </dl>
        </section>
      </div>

      <Button
        type="button"
        variant="default"
        size="default"
        className="h-10 w-full text-sm font-semibold"
        onClick={onNewBooking}
      >
        Yeni randevu
      </Button>
    </div>
  );
}

export function BookingForm({ company }: { company: CompanyResponse }) {
  const [step, setStep] = React.useState(1);

  const [employees, setEmployees] = React.useState<EmployeeResponse[]>([]);
  const [services, setServices] = React.useState<ServiceResponse[]>([]);
  const [loadingCatalog, setLoadingCatalog] = React.useState(true);

  const [employeeId, setEmployeeId] = React.useState<string>("");
  const [serviceId, setServiceId] = React.useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(() => new Date());
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const [slots, setSlots] = React.useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState<AvailableSlot | null>(
    null,
  );

  const [customerName, setCustomerName] = React.useState("");
  const [customerPhoneNational, setCustomerPhoneNational] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [submitting, setSubmitting] = React.useState(false);
  const [validatingSelection, setValidatingSelection] = React.useState(false);
  const [successSummary, setSuccessSummary] =
    React.useState<BookingSuccessSummary | null>(null);

  React.useEffect(() => {
    if (successSummary == null) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [successSummary]);

  React.useEffect(() => {
    if (!company.active) {
      setEmployees([]);
      setServices([]);
      setLoadingCatalog(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoadingCatalog(true);
      try {
        const [empRes, svcRes] = await Promise.all([
          fetch(`${API}/companies/${company.id}/employees`),
          fetch(`${API}/companies/${company.id}/services`),
        ]);
        if (!empRes.ok) throw new Error(await readErrorMessage(empRes));
        if (!svcRes.ok) throw new Error(await readErrorMessage(svcRes));
        const empJson = unwrapApiList<unknown>(await empRes.json())
          .map(normalizeEmployee)
          .filter((e): e is EmployeeResponse => e != null);
        const svcJson = unwrapApiList<unknown>(await svcRes.json())
          .map(normalizeService)
          .filter((s): s is ServiceResponse => s != null && s.active);
        if (!cancelled) {
          setEmployees(empJson);
          setServices(svcJson);
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Veriler yüklenemedi");
      } finally {
        if (!cancelled) setLoadingCatalog(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [company.active, company.id]);

  const selectedEmployee = employees.find((e) => e.id === employeeId);
  const selectedService = services.find((s) => s.id === serviceId);

  const servicesForEmployee = React.useMemo(() => {
    if (!selectedEmployee) return [];
    const activeSvcs = services.filter((s) => s.active);
    const ids = selectedEmployee.serviceIds;
    if (ids?.length) {
      const set = new Set(ids);
      return activeSvcs.filter((s) => set.has(s.id));
    }
    return activeSvcs;
  }, [selectedEmployee, services]);

  React.useEffect(() => {
    setServiceId("");
    setSelectedSlot(null);
    setSlots([]);
  }, [employeeId]);

  React.useEffect(() => {
    setSelectedSlot(null);
  }, [serviceId, date]);

  React.useEffect(() => {
    if (!employeeId || !serviceId || !date || !selectedService) {
      setSlots([]);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoadingSlots(true);
      try {
        const dateStr = format(date, "yyyy-MM-dd");
        const url = `${API}/companies/${company.id}/employees/${employeeId}/available-slots?date=${encodeURIComponent(dateStr)}&durationMinutes=${selectedService.durationMinutes}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(await readErrorMessage(res));
        const list = unwrapApiList<AvailableSlot>(await res.json());
        if (!cancelled) setSlots(list);
      } catch (e) {
        if (!cancelled) {
          setSlots([]);
          toast.error(
            e instanceof Error ? e.message : "Müsait saatler alınamadı",
          );
        }
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [company.id, employeeId, serviceId, date, selectedService]);

  async function validateSelectionWithFreshData(): Promise<{
    employee: EmployeeResponse;
    service: ServiceResponse;
  } | null> {
    try {
      const [empRes, svcRes] = await Promise.all([
        fetch(`${API}/companies/${company.id}/employees`, {
          cache: "no-store",
        }),
        fetch(`${API}/companies/${company.id}/services`, {
          cache: "no-store",
        }),
      ]);
      if (!empRes.ok) throw new Error(await readErrorMessage(empRes));
      if (!svcRes.ok) throw new Error(await readErrorMessage(svcRes));

      const latestEmployees = unwrapApiList<unknown>(await empRes.json())
        .map(normalizeEmployee)
        .filter((e): e is EmployeeResponse => e != null);
      const latestServices = unwrapApiList<unknown>(await svcRes.json())
        .map(normalizeService)
        .filter((s): s is ServiceResponse => s != null && s.active);

      setEmployees(latestEmployees);
      setServices(latestServices);

      const latestEmployee = latestEmployees.find((e) => e.id === employeeId);
      if (!latestEmployee) {
        toast.error("Seçtiğiniz çalışan artık listede yok.");
        setEmployeeId("");
        setServiceId("");
        setStep(1);
        return null;
      }
      if (!latestEmployee.active) {
        toast.error("Seçtiğiniz çalışan şu anda müsait değil.");
        setEmployeeId("");
        setServiceId("");
        setStep(1);
        return null;
      }

      const latestService = latestServices.find((s) => s.id === serviceId);
      if (!latestService) {
        toast.error("Seçtiğiniz hizmet artık aktif değil.");
        setServiceId("");
        setStep(1);
        return null;
      }

      const assignedIds = latestEmployee.serviceIds;
      if (assignedIds.length > 0 && !assignedIds.includes(latestService.id)) {
        toast.error("Bu hizmet artık seçtiğiniz çalışana atanmış değil.");
        setServiceId("");
        setStep(1);
        return null;
      }

      return { employee: latestEmployee, service: latestService };
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Seçimler doğrulanırken hata oluştu.",
      );
      return null;
    }
  }

  async function goNext() {
    if (step === 1) {
      if (!employeeId || !serviceId) {
        toast.error("Çalışan ve hizmet seçin.");
        return;
      }
      if (servicesForEmployee.length === 0) {
        toast.error("Bu çalışana atanmış hizmet yok.");
        return;
      }
      setValidatingSelection(true);
      const validSelection = await validateSelectionWithFreshData();
      setValidatingSelection(false);
      if (!validSelection) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!date) {
        toast.error("Tarih seçin.");
        return;
      }
      if (!selectedSlot) {
        toast.error("Bir saat seçin.");
        return;
      }
      setStep(3);
    }
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService || !employeeId || !serviceId || !selectedSlot) {
      toast.error("Çalışan, hizmet, tarih ve saat seçin.");
      return;
    }
    const name = customerName.trim();
    const phone = buildTrCustomerPhone(customerPhoneNational);
    if (!name || !customerPhoneNational.trim()) {
      toast.error("Ad soyad ve telefon zorunludur.");
      return;
    }
    if (!isValidTrMobileE164(phone)) {
      toast.error(
        "Geçerli bir Türkiye cep telefonu girin (+90 ile 10 hane, örn. 5XX XXX XX XX).",
      );
      return;
    }

    setSubmitting(true);
    try {
      const validSelection = await validateSelectionWithFreshData();
      if (!validSelection) {
        setSubmitting(false);
        return;
      }

      const emailTrim = customerEmail.trim();
      const body = {
        companyId: company.id,
        employeeId,
        serviceId,
        customerName: name,
        customerPhoneNumber: phone,
        customerEmail: emailTrim.length > 0 ? emailTrim : null,
        startTime: selectedSlot.startTime,
        notes: notes.trim() || null,
      };

      const res = await fetch(`${API}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(await readErrorMessage(res));

      const summary: BookingSuccessSummary = {
        serviceName: validSelection.service.name,
        employeeName:
          `${validSelection.employee.firstName} ${validSelection.employee.lastName}`.trim(),
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        customerName: name,
        customerPhoneNumber: phone,
        customerEmail: emailTrim.length > 0 ? emailTrim : null,
        notes: notes.trim() || null,
      };

      fireBookingConfetti();
      setSuccessSummary(summary);
      setStep(1);
      setCustomerName("");
      setCustomerPhoneNational("");
      setCustomerEmail("");
      setNotes("");
      setSelectedSlot(null);
      setEmployeeId("");
      setServiceId("");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Randevu oluşturulamadı",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const selectableSlots = slots.filter((s) => s.selectable);

  function clearSuccessAndReset() {
    setSuccessSummary(null);
  }

  const showSuccess = successSummary != null;
  const isCompanyInactive = !company.active;

  return (
    <Card className="gap-0 overflow-hidden p-0">
      {!showSuccess ? (
        <>
          <div className="relative flex w-full flex-col">
            <CompanyCardHeaderBanner
              headerImgUrl={company.headerImgUrl}
              companyName={company.name}
              imageVersion={company.updatedAt}
            />
            <div className="relative z-10 -mt-9 flex w-full justify-start px-4">
              <CompanyBookingLogo
                logoUrl={company.logoUrl}
                companyName={company.name}
                imageVersion={company.updatedAt}
                className="ring-4 ring-card shadow-md"
              />
            </div>
          </div>
          <CardHeader className="items-stretch border-0 px-4 pt-3 pb-0 text-left">
            <div className="w-full">
              <CardTitle className="text-xl leading-tight">
                {company.name}
              </CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground/70">
                @{company.slug}
              </p>
              {company.description ? (
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  {company.description}
                </CardDescription>
              ) : null}
              {(company.phone ?? company.address) ? (
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  {company.phone ? (
                    <a
                      href={`tel:${company.phone}`}
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <Phone className="size-3 shrink-0" aria-hidden />
                      {company.phone}
                    </a>
                  ) : null}
                  {company.address ? (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3 shrink-0" aria-hidden />
                      {company.address}
                    </span>
                  ) : null}
                </div>
              ) : null}
              <div className="mt-4" />
            </div>
          </CardHeader>
        </>
      ) : null}
      <CardContent
        className={cn("px-4 pb-6", showSuccess ? "pt-8 sm:pt-10" : "pt-2")}
      >
        {isCompanyInactive ? (
          <Alert variant="warning" role="status" aria-live="polite">
            <AlertTitle className="text-center">😔 Çalışma saatleri dışında</AlertTitle>
            <AlertDescription className="text-center">
              Şu anda çalışma saatleri dışında olduğu için randevu alınamıyor.
            </AlertDescription>
          </Alert>
        ) : loadingCatalog ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2Icon className="size-4 animate-spin" />
            Yükleniyor…
          </div>
        ) : showSuccess && successSummary ? (
          <BookingSuccessPanel
            company={company}
            summary={successSummary}
            onNewBooking={clearSuccessAndReset}
          />
        ) : (
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <StepProgress step={step} />

            {!loadingCatalog && employees.length === 0 ? (
              <Alert variant="warning" role="status" aria-live="polite">
                <UsersRound />
                <AlertTitle>Randevu için uygun çalışan yok</AlertTitle>
                <AlertDescription>
                  Bu işletmede şu an listelenen çalışan bulunmuyor. Daha sonra
                  tekrar deneyin veya işletmeyle doğrudan iletişime geçin.
                </AlertDescription>
              </Alert>
            ) : null}

            {!loadingCatalog &&
            employees.length > 0 &&
            services.length === 0 ? (
              <Alert variant="warning" role="status" aria-live="polite">
                <ListX />
                <AlertTitle>Aktif hizmet tanımı yok</AlertTitle>
                <AlertDescription>
                  Randevu alabilmek için işletmede en az bir aktif hizmet
                  gerekiyor. İşletmeyle iletişime geçebilirsiniz.
                </AlertDescription>
              </Alert>
            ) : null}

            {step === 1 && employees.length > 0 ? (
              <StepEmployeeService
                employees={employees}
                servicesForEmployee={servicesForEmployee}
                employeeId={employeeId}
                serviceId={serviceId}
                onEmployeeIdChange={setEmployeeId}
                onServiceIdChange={setServiceId}
              />
            ) : null}

            {step === 2 && (
              <StepDateTime
                employeeId={employeeId}
                serviceId={serviceId}
                date={date}
                onDateChange={setDate}
                calendarOpen={calendarOpen}
                onCalendarOpenChange={setCalendarOpen}
                loadingSlots={loadingSlots}
                selectableSlots={selectableSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />
            )}

            {step === 3 && (
              <StepContact
                customerName={customerName}
                customerPhoneNational={customerPhoneNational}
                customerEmail={customerEmail}
                notes={notes}
                onCustomerNameChange={setCustomerName}
                onCustomerPhoneNationalChange={setCustomerPhoneNational}
                onCustomerEmailChange={setCustomerEmail}
                onNotesChange={setNotes}
              />
            )}

            <div
              className={cn(
                "flex gap-3",
                step > 1
                  ? "flex-col-reverse sm:flex-row sm:items-stretch"
                  : "flex-col",
              )}
            >
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  className="h-10 w-full gap-1.5 text-sm sm:w-auto sm:min-w-32 sm:shrink-0"
                  onClick={goBack}
                  disabled={submitting}
                >
                  <ChevronLeft className="size-4" />
                  Geri
                </Button>
              ) : null}

              {step < TOTAL_STEPS ? (
                <Button
                  type="button"
                  size="default"
                  className={cn(
                    "h-10 w-full gap-1.5 text-sm font-semibold",
                    step > 1 && "sm:min-h-10 sm:flex-1",
                  )}
                  onClick={goNext}
                  disabled={
                    validatingSelection ||
                    (step === 1 &&
                      (employees.length === 0 || services.length === 0))
                  }
                >
                  {validatingSelection ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin" />
                      Kontrol ediliyor…
                    </>
                  ) : (
                    <>
                      İleri
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="default"
                  className={cn(
                    "h-10 w-full gap-1.5 text-sm font-semibold",
                    step > 1 && "sm:min-h-10 sm:flex-1",
                  )}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin" />
                      Gönderiliyor…
                    </>
                  ) : (
                    "Randevu oluştur"
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
