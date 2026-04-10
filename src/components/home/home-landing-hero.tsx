import { Sparkles } from "lucide-react";

import { HOME_PAGE } from "@/constants/home-page";
import { cn } from "@/lib/utils";

export function HomeLandingHero() {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <h1 className="text-balance text-4xl font-black tracking-tight text-foreground md:text-5xl">
        {HOME_PAGE.titleLeading}{" "}
        <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
          {HOME_PAGE.titleAccent}
        </span>
      </h1>

      <p
        className={cn(
          "mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight text-white shadow-md shadow-indigo-500/25",
          "bg-linear-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500",
        )}
      >
        <Sparkles className="size-3.5 shrink-0 text-white/90" aria-hidden />
        {HOME_PAGE.badge}
      </p>
      <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
        {HOME_PAGE.description}
      </p>
    </div>
  );
}
