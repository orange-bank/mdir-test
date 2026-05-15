import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ApplicantMode = "single" | "joint";

export type WizardStep = {
  id: string;
  label: string;
  component: React.ComponentType<{ mode: ApplicantMode } & Record<string, unknown>>;
};

interface WizardContextValue {
  currentStep: number;
  totalSteps: number;
  steps: WizardStep[];
  stepLabels: string[];
  applicantMode: ApplicantMode;
  setApplicantMode: (mode: ApplicantMode) => void;
  goToStep: (stepIndex: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const WizardContext = createContext<WizardContextValue | null>(null);

interface WizardProviderProps {
  children: ReactNode;
  initialSteps: WizardStep[];
  initialMode?: ApplicantMode;
}

export function WizardProvider({
  children,
  initialSteps,
  initialMode = "single",
}: WizardProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicantMode, setApplicantMode] = useState<ApplicantMode>(initialMode);

  const stepLabels = initialSteps.map((step) => step.label);
  const totalSteps = initialSteps.length;
  const isLastStep = currentStep >= totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const goToStep = useCallback((stepIndex: number) => {
    const clamped = Math.max(0, Math.min(stepIndex, totalSteps - 1));
    setCurrentStep(clamped);
  }, [totalSteps]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <WizardContext.Provider
      value={{
        currentStep: currentStep + 1, // 1-based for UI
        totalSteps,
        steps: initialSteps,
        stepLabels,
        applicantMode,
        setApplicantMode,
        goToStep,
        nextStep,
        prevStep,
        isLastStep,
        isFirstStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard(): WizardContextValue {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
