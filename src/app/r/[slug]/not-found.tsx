import Link from "next/link";
import { Building2 } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

/** Primary buton görünümü — client `buttonVariants` kullanılmıyor (SSR uyumu) */
const primaryLinkClass = cn(
  "inline-flex h-11 w-full min-w-0 items-center justify-center rounded-lg px-4 text-sm font-medium",
  "bg-primary text-primary-foreground transition-colors",
  "hover:bg-primary/90",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "outline-none select-none",
);

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <Empty className="max-w-md border-none bg-transparent">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Building2 className="size-5" />
          </EmptyMedia>
          <EmptyTitle className="text-lg font-semibold tracking-tight">
            İşletme bulunamadı
          </EmptyTitle>
          <EmptyDescription>
            Bu adrese ait bir kayıt yok veya işletme artık aktif değil.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="w-full max-w-sm">
          <Link href="/" className={primaryLinkClass}>
            Ana sayfa
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  );
}
