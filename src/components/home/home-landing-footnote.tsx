import { HOME_PAGE } from "@/constants/home-page";

export function HomeLandingFootnote() {
  return (
    <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
      {HOME_PAGE.footnote}
    </p>
  );
}
