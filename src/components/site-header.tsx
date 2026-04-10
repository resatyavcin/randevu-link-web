import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full shrink-0 items-center justify-center border-b border-border/50 bg-background/85 px-4 py-3 backdrop-blur-md supports-backdrop-filter:bg-background/70 sm:px-6 lg:px-10">
      <Logo />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-6 lg:right-10">
        <ThemeToggle />
      </div>
    </header>
  );
}
