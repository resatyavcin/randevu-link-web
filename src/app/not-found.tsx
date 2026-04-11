import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { APP_NOT_FOUND } from "@/constants/app-not-found";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] w-full flex-1 flex-col items-center justify-center bg-background px-4 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-muted">
          <FileQuestion className="size-9 text-muted-foreground" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {APP_NOT_FOUND.title}
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            {APP_NOT_FOUND.description}
          </p>
        </div>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-11 w-full max-w-xs px-4",
          )}
        >
          {APP_NOT_FOUND.homeCta}
        </Link>
      </div>
    </div>
  );
}
