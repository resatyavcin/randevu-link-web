import { Link2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HOME_PAGE } from "@/constants/home-page";

export function HomeUrlExplainerCard() {
  return (
    <Card className="w-full border-border/50 bg-card/85 text-left shadow-lg shadow-black/4 ring-1 ring-border/40 backdrop-blur-md dark:bg-card/70 dark:shadow-black/25">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
          <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 dark:bg-indigo-400/15">
            <Link2 className="size-4 shrink-0" aria-hidden />
          </span>
          <CardTitle className="text-lg font-semibold leading-snug md:text-xl">
            {HOME_PAGE.urlExplainerTitle}
          </CardTitle>
        </div>
        <CardDescription className="text-base leading-relaxed md:text-[0.95rem]">
          {HOME_PAGE.urlExplainerBeforeSlug}{" "}
          <strong className="font-semibold text-foreground">
            {HOME_PAGE.slugWord}
          </strong>{" "}
          {HOME_PAGE.urlExplainerAfterSlug}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="rounded-xl border border-border/70 bg-muted/35 px-4 py-3.5 font-mono text-sm text-foreground shadow-inner dark:border-border/50 dark:bg-muted/25">
          <span className="text-muted-foreground">
            {HOME_PAGE.examplePathPrefix}
          </span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {HOME_PAGE.exampleSlug}
          </span>
        </div>
        <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
          {HOME_PAGE.steps.map((text, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500/20 to-violet-500/15 text-xs font-bold text-indigo-700 ring-1 ring-indigo-500/20 dark:text-indigo-300 dark:ring-indigo-400/25">
                {i + 1}
              </span>
              <span className="pt-0.5">{text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
