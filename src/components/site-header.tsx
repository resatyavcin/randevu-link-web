"use client";

import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const isPublicBooking = pathname.startsWith("/r/");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center justify-center border-b backdrop-blur-md",
        isPublicBooking
          ? "shrink-0 border-border/50 bg-background/85 px-4 py-2 supports-backdrop-filter:bg-background/70 sm:px-6 lg:px-10"
          : "border-border/25 bg-transparent px-4 py-3.5 supports-backdrop-filter:bg-white/20 dark:border-indigo-500/15 dark:supports-backdrop-filter:bg-indigo-950/25",
      )}
    >
      <Logo />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-6 lg:right-10">
        <ThemeToggle />
      </div>
    </header>
  );
}
