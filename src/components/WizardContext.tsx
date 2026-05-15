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

  // Property & loan state
  propertyPrice: string;
  setPropertyPrice: (value: string) => void;
  depositAmount: string;
  setDepositAmount: (value: string) => void;
  loanTerm: string;
  setLoanTerm: (value: string) => void;

  // Validation
  validateStep1: () => { valid: boolean; errors: Record<string, string> };

  // Reset / cancel
  resetForm: () => void;
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
  const [propertyPrice, setPropertyPrice] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const stepLabels = initialSteps.map((step) => step.label);
  const totalSteps = initialSteps.length;
  const isLastStep = currentStep >= totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setApplicantMode("single");
    setPropertyPrice("");
    setDepositAmount("");
    setLoanTerm("");
  }, []);

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

  const validateStep1 = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!propertyPrice || Number(propertyPrice) <= 0) {
      errors.propertyPrice = "Please enter a valid property price";
    } else if (Number(propertyPrice) < 10000) {
      errors.propertyPrice = "Property price must be at least £10,000";
    }

    if (!depositAmount || Number(depositAmount) <= 0) {
      errors.depositAmount = "Please enter a valid deposit amount";
    } else if (propertyPrice) {
      const minDeposit = Math.round(Number(propertyPrice) * 0.05);
      if (Number(depositAmount) < minDeposit) {
        errors.depositAmount = `Minimum deposit is £${minDeposit.toLocaleString()} (5% of property price)`;
      }
    }

    if (!loanTerm || Number(loanTerm) <= 0) {
      errors.loanTerm = "Please enter a loan term";
    } else if (Number(loanTerm) > 40) {
      errors.loanTerm = "Max 40 years";
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }, [propertyPrice, depositAmount, loanTerm]);

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
        propertyPrice,
        setPropertyPrice,
        depositAmount,
        setDepositAmount,
        loanTerm,
        setLoanTerm,
        validateStep1,
        resetForm,
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
