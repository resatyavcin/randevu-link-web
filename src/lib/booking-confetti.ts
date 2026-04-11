import confetti from "canvas-confetti";

export function fireBookingConfetti(): void {
  const defaults = { origin: { y: 0.65 }, zIndex: 10_000 } as const;

  confetti({ ...defaults, particleCount: 110, spread: 72, ticks: 220 });
  window.setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 70,
      spread: 100,
      ticks: 180,
      scalar: 0.95,
    });
  }, 160);
}
