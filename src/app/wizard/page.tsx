"use client";

import { useCallback } from "react";
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
import StepFinancialInfo from "@/components/wizard/steps/StepFinancialInfo";

const stepLabels: string[] = ["Application Type", "Personal Details", "Financial Information"];

const initialSteps: WizardStep[] = stepLabels.map((label) => ({
  id: `step-${label.toLowerCase().replace(/ /g, "-")}`,
  label,
  component: () => null,
}));

function WizardContent() {
  const {
    currentStep,
    totalSteps,
    applicantMode,
    setApplicantMode,
    nextStep,
    isLastStep,
    isFirstStep,
    propertyPrice,
    setPropertyPrice,
    depositAmount,
    setDepositAmount,
    loanTerm,
    setLoanTerm,
    validateStep1,
    validateStep2,
    validateStep3,
    personalDetails,
    financialInfo,
    updatePersonalDetails,
    updateFinancialInfo,
    prevStep,
    resetForm,
  } = useWizard();

  const step1Validation = currentStep === 1 ? validateStep1() : { valid: true, errors: {} };
  const isStep1Disabled = currentStep === 1 && !step1Validation.valid;

  const step2Validation = currentStep === 2 ? validateStep2() : { valid: true, errors: {} };
  const isStep2Disabled = currentStep === 2 && !step2Validation.valid;

  const step3Validation = currentStep === 3 ? validateStep3() : { valid: true, errors: {} };
  const isStep3Disabled = currentStep === 3 && !step3Validation.valid;

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <StepApplicationType
            mode={applicantMode}
            onChange={(mode) => setApplicantMode(mode)}
            propertyPrice={propertyPrice}
            onPropertyPriceChange={setPropertyPrice}
            propertyPriceError={step1Validation.errors.propertyPrice ?? ""}
            depositAmount={depositAmount}
            onDepositAmountChange={setDepositAmount}
            depositAmountError={step1Validation.errors.depositAmount ?? ""}
            loanTerm={loanTerm}
            onLoanTermChange={setLoanTerm}
            loanTermError={step1Validation.errors.loanTerm ?? ""}
          />
        );
      case 2:
        return (
          <StepPersonalDetails
            values={personalDetails}
            errors={step2Validation.errors}
            onChange={updatePersonalDetails}
            applicantMode={applicantMode}
          />
        );
      case 3:
        return (
          <StepFinancialInfo
            values={financialInfo}
            errors={step3Validation.errors}
            onChange={updateFinancialInfo}
          />
        );
      default:
        return null;
    }
  }, [currentStep, applicantMode, propertyPrice, depositAmount, loanTerm,
    setApplicantMode, setPropertyPrice, setDepositAmount, setLoanTerm,
    step1Validation]);

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
        onBack={prevStep}
        onCancel={resetForm}
        nextLabel="Next"
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
        onNextDisabled={isStep1Disabled || isLastStep}
        isSubmitting={isStep1Disabled}
      />
    </WizardContainer>
  );
}

export default function WizardPage() {
  return (
    <main className="min-h-screen py-12" style={{ background: "var(--ob-bg)" }}>
      <WizardProvider initialSteps={initialSteps}>
        <WizardContent />
      </WizardProvider>
    </main>
  );
}
