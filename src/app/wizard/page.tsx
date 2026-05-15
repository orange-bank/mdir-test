"use client";

import { useState, useCallback } from "react";
import {
  WizardProvider,
  useWizard,
  WizardContainer,
  WizardNavigation,
  ApplicantMode,
  WizardStep,
} from "@/components";
import { StepApplicationType } from "@/components/wizard/steps/StepApplicationType";
import { StepPersonalDetails } from "@/components/wizard/steps/StepPersonalDetails";
import { StepFinancialInfo } from "@/components/wizard/steps/StepFinancialInfo";

const stepLabels = ["Application Type", "Personal Details", "Financial Information"];

function WizardContent() {
  const { currentStep, totalSteps, applicantMode, setApplicantMode, nextStep, isLastStep, isFirstStep } =
    useWizard();

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <StepApplicationType
            mode={applicantMode}
            onChange={(mode) => setApplicantMode(mode)}
          />
        );
      case 2:
        return <StepPersonalDetails mode={applicantMode} />;
      case 3:
        return <StepFinancialInfo mode={applicantMode} />;
      default:
        return null;
    }
  }, [currentStep, applicantMode, nextStep, isLastStep, isFirstStep, setApplicantMode]);

  return (
    <WizardContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      applicantMode={applicantMode}
      title={stepLabels[currentStep - 1]}
    >
      {renderStep()}

      <WizardNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onBack={() => window.alert("Back not implemented yet")}
        onCancel={() => window.alert("Cancelled")}
        nextLabel="Next"
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
      />
    </WizardContainer>
  );
}

const initialSteps: WizardStep[] = stepLabels.map((label, idx) => ({
  id: `step-${label.toLowerCase().replace(/ /g, "-")}`,
  label,
  component: () => {
    const { applicantMode } = useWizard();
    if (idx === 0) return <StepApplicationType mode={applicantMode} onChange={() => {}} />;
    if (idx === 1) return <StepPersonalDetails mode={applicantMode} />;
    return <StepFinancialInfo mode={applicantMode} />;
  },
}));

export default function WizardPage() {
  return (
    <main className="min-h-screen py-12" style={{ background: "var(--ob-bg)" }}>
      <WizardProvider initialSteps={initialSteps}>
        <WizardContent />
      </WizardProvider>
    </main>
  );
}
