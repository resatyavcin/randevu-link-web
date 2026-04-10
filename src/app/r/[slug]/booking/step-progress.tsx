import { STEP_TITLES, TOTAL_STEPS } from "@/app/r/[slug]/booking/shared";

type StepProgressProps = {
  step: number;
};

export function StepProgress({ step }: StepProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground text-sm font-medium">
          Adım {step} / {TOTAL_STEPS}
        </p>
        <p className="text-foreground text-sm font-medium">
          {STEP_TITLES[step - 1]}
        </p>
      </div>
      <div
        className="flex h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-label="İlerleme"
      >
        <div
          className="bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );
}
