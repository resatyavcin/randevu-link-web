import { HomeHeroBackdrop } from "@/components/home/home-hero-backdrop";
import { HomeLandingFootnote } from "@/components/home/home-landing-footnote";
import { HomeLandingHero } from "@/components/home/home-landing-hero";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <HomeHeroBackdrop />
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="mx-auto w-full max-w-xl md:max-w-2xl">
          <HomeLandingHero />
          <HomeLandingFootnote />
        </div>
      </div>
    </main>
  );
}
