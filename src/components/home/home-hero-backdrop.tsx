export function HomeHeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10"
      aria-hidden
    >
      <div className="absolute inset-0 bg-linear-to-b from-muted/40 via-background to-background dark:from-muted/15" />
      <div className="absolute -top-28 right-[-12%] size-88 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/12" />
      <div className="absolute top-1/3 left-[-18%] size-72 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/10" />
      <div className="absolute bottom-[-15%] right-[20%] size-72 rounded-full bg-indigo-300/10 blur-3xl dark:bg-cyan-500/8" />
    </div>
  );
}
