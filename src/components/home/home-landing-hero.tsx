import { CalendarClock, Sparkles } from "lucide-react";

import { HOME_PAGE } from "@/constants/home-page";
import { cn } from "@/lib/utils";

export function HomeLandingHero() {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <span
        className={cn(
          "mb-5 inline-flex size-16 items-center justify-center rounded-2xl",
          "bg-linear-to-br from-primary/15 to-indigo-500/10 text-primary shadow-md ring-1 ring-primary/15",
          "dark:from-indigo-500/20 dark:to-violet-600/15 dark:text-indigo-200 dark:ring-indigo-400/20",
        )}
      >
        <CalendarClock className="size-8" strokeWidth={1.6} />
      </span>

      <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur-sm dark:bg-background/50">
        <Sparkles className="size-3.5 text-indigo-500 dark:text-indigo-400" />
        {HOME_PAGE.badge}
      </p>

      <h1 className="text-balance text-4xl font-black tracking-tight text-foreground md:text-5xl">
        {HOME_PAGE.titleLeading}{" "}
        <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
          {HOME_PAGE.titleAccent}
        </span>
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
        {HOME_PAGE.description}
      </p>
    </div>
  );
}
