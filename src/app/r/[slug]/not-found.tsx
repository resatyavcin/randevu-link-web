import Link from "next/link";
import { CalendarX2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-8 text-center">

        <div className="flex size-20 items-center justify-center rounded-2xl bg-muted">
          <CalendarX2 className="size-9 text-muted-foreground" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold tracking-tight">
            İşletme bulunamadı
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            Bu bağlantıya ait bir işletme yok veya randevu almaya kapalı.
          </p>
        </div>

        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "h-11 w-full px-4")}
        >
          Ana sayfaya dön
        </Link>

      </div>
    </div>
  );
}
