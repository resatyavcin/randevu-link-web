"use client";

import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppChrome() {
  const pathname = usePathname() ?? "";
  const isPublicBooking = pathname.startsWith("/r/");

  if (isPublicBooking) {
    return (
      <header className="sticky top-0 z-50 relative flex w-full shrink-0 items-center justify-center border-b border-border/50 bg-background/85 px-4 py-2 backdrop-blur-md supports-backdrop-filter:bg-background/70 sm:px-6 lg:px-10">
        <Logo />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-6 lg:right-10">
          <ThemeToggle />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 relative flex w-full items-center justify-center border-b border-border/30 bg-transparent px-4 py-3.5 backdrop-blur-md supports-backdrop-filter:bg-background/15 dark:border-border/25 dark:supports-backdrop-filter:bg-background/10">
      <Logo />
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ThemeToggle />
      </div>
    </header>
  );
}
