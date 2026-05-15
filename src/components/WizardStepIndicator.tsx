import { cn } from "@/lib/utils";

interface WizardStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

type ApplicantMode = "single" | "joint";

export function WizardStepIndicator({ currentStep, totalSteps }: WizardStepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={i} className="flex items-center gap-2">
              {/* Previous steps */}
              {i > 0 && (
                <div
                  className={cn(
                    "h-1 w-8 transition-all duration-300",
                    isCompleted || isActive
                      ? "bg-[var(--ob-orange)]"
                      : "bg-[var(--ob-border-light)]"
                  )}
                />
              )}

              {/* Step dot */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-[var(--ob-orange)] text-white shadow-md scale-110"
                      : isCompleted
                      ? "bg-[var(--ob-orange)] text-white"
                      : "bg-[var(--ob-bg)] text-[var(--ob-slate-mid)] border-2 border-[var(--ob-border-light)]"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>

                {/* Step label below dot */}
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    isActive
                      ? "text-[var(--ob-orange)]"
                      : isCompleted
                      ? "text-[var(--ob-charcoal)]"
                      : "text-[var(--ob-slate-mid)]"
                  )}
                >
                  Step {stepNumber}
                </span>
              </div>

              {/* Next connections */}
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    "h-1 w-8 transition-all duration-300",
                    stepNumber < currentStep
                      ? "bg-[var(--ob-orange)]"
                      : "bg-[var(--ob-border-light)]"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step counter text */}
      <p className="text-sm font-medium" style={{ color: "var(--ob-slate-mid)" }}>
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
