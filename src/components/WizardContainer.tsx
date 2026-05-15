import { cn } from "@/lib/utils";
import { WizardStepIndicator } from "./WizardStepIndicator";
import type { ApplicantMode } from "./WizardContext";

interface WizardContainerProps {
  currentStep: number;
  totalSteps: number;
  applicantMode: ApplicantMode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function WizardContainer({
  currentStep,
  totalSteps,
  applicantMode,
  children,
  title,
  description,
  className,
}: WizardContainerProps) {
  const modeLabel = applicantMode === "joint" ? "Joint Applicant" : "Single Applicant";

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-4", className)}>
      {/* Mode badge */}
      <div className="flex justify-center mb-6">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: "var(--ob-orange-light)",
            color: "var(--ob-orange-dark)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ob-orange)" }} />
          {modeLabel} Mode
        </span>
      </div>

      {/* Step indicators */}
      <WizardStepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Step header */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-2"
              style={{ color: "var(--ob-charcoal)" }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="text-base" style={{ color: "var(--ob-slate)" }}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Step content area */}
      <div className="bg-white rounded-2xl border p-6 md:p-8" style={{ borderColor: "var(--ob-border)" }}>
        {children}
      </div>
    </div>
  );
}
