import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
  nextLabel?: string;
  backLabel?: string;
  cancelLabel?: string;
  isLastStep?: boolean;
  isFirstStep?: boolean;
  isSubmitting?: boolean;
  onBackDisabled?: boolean;
  onNextDisabled?: boolean;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onCancel,
  nextLabel = "Next",
  backLabel = "Back",
  cancelLabel = "Cancel",
  isLastStep = false,
  isSubmitting = false,
  onBackDisabled = false,
  onNextDisabled = false,
}: WizardNavigationProps) {
  const isStepOne = currentStep === 1;
  const isLast = currentStep >= totalSteps;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t" style={{ borderColor: "var(--ob-border-light)" }}>
      {/* Left side — Back + Cancel */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {!isStepOne && (
          <Button variant="outline" onClick={onBack} disabled={onBackDisabled} size="md">
            {backLabel}
          </Button>
        )}
        <Button variant="ghost" onClick={onCancel} size="md">
          {cancelLabel}
        </Button>
      </div>

      {/* Right side — Next / Submit */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {isSubmitting && (
          <span className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
            Submitting...
          </span>
        )}
        <Button
          variant="primary"
          onClick={onNext}
          disabled={onNextDisabled || isSubmitting}
          loading={isSubmitting}
          size="md"
        >
          {isLast ? "Submit" : nextLabel}
          {!isSubmitting && !isLast && (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}
