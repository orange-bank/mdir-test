import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ApplicantMode = "single" | "joint";

export type WizardStep = {
  id: string;
  label: string;
  component: React.ComponentType<{ mode: ApplicantMode } & Record<string, unknown>>;
};

interface DebtItem {
  id: string;
  creditor: string;
  monthlyPayment: string;
}

export interface StepPersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  partnerFirstName: string;
  partnerLastName: string;
  partnerDateOfBirth: string;
  partnerEmail: string;
}

export interface StepFinancialInfoDebtEntry {
  description: string;
  amount: string;
  monthlyRepayment: string;
}

export interface StepFinancialInfo {
  annualIncome: string;
  employmentStatus: string;
  monthlyRentMortgage: string;
  bankStatements: string;
  debts: StepFinancialInfoDebtEntry[];
}

export interface WizardState {
  // Step 1: Application Type
  mortgageType: string;
  buyerType: string;
  customerType: string;
  taxStatus: string;
  propertyPrice: string;
  depositAmount: string;
  loanTerm: string;

  // Step 2: Income & Expenses (Personal Details)
  grossAnnualIncome: string;
  debts: DebtItem[];
  monthlyCommitments: string;

  // Step 3: Household Info (Financial Information)
  numberOfDependents: string;
  livingStatus: string;
}

const createEmptyDebts = (): DebtItem[] => [{ id: `debt-${Date.now()}`, creditor: "", monthlyPayment: "" }];

const emptyState: WizardState = {
  mortgageType: "",
  buyerType: "",
  customerType: "",
  taxStatus: "",
  propertyPrice: "",
  depositAmount: "",
  loanTerm: "",
  grossAnnualIncome: "",
  debts: createEmptyDebts(),
  monthlyCommitments: "",
  numberOfDependents: "",
  livingStatus: "",
};

interface WizardContextValue extends WizardState {
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

  // Step 1 setters
  setMortgageType: (value: string) => void;
  setBuyerType: (value: string) => void;
  setCustomerType: (value: string) => void;
  setTaxStatus: (value: string) => void;
  setPropertyPrice: (value: string) => void;
  setDepositAmount: (value: string) => void;
  setLoanTerm: (value: string) => void;

  // Step 2 setters
  setGrossAnnualIncome: (value: string) => void;
  updateDebt: (index: number, field: keyof DebtItem, value: string) => void;
  addDebt: () => void;
  removeDebt: (index: number) => void;
  setMonthlyCommitments: (value: string) => void;

  // Step 3 setters
  setNumberOfDependents: (value: string) => void;
  setLivingStatus: (value: string) => void;

  // Grouped state
  personalDetails: StepPersonalDetails;
  financialInfo: StepFinancialInfo;

  // Grouped onChange handlers
  updatePersonalDetails: (updates: Partial<StepPersonalDetails>) => void;
  updateFinancialInfo: (updates: Partial<StepFinancialInfo>) => void;

  // Validation
  validateStep1: () => { valid: boolean; errors: Record<string, string> };
  validateStep2: () => { valid: boolean; errors: Record<string, string> };
  validateStep3: () => { valid: boolean; errors: Record<string, string> };

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

  // Step 1
  const [mortgageType, setMortgageType] = useState("");
  const [buyerType, setBuyerType] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [taxStatus, setTaxStatus] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  // Step 2
  const [grossAnnualIncome, setGrossAnnualIncome] = useState("");
  const [debts, setDebts] = useState<DebtItem[]>(createEmptyDebts);
  const [monthlyCommitments, setMonthlyCommitments] = useState("");

  // Step 3
  const [numberOfDependents, setNumberOfDependents] = useState("");
  const [livingStatus, setLivingStatus] = useState("");

  // Step 2 grouped state (Personal Details)
  const [personalDetails, setPersonalDetails] = useState<StepPersonalDetails>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    partnerFirstName: "",
    partnerLastName: "",
    partnerDateOfBirth: "",
    partnerEmail: "",
  });

  const updatePersonalDetails = useCallback((updates: Partial<StepPersonalDetails>) => {
    setPersonalDetails((prev) => ({ ...prev, ...updates }));
  }, []);

  // Step 3 grouped state (Financial Info)
  const [financialInfo, setFinancialInfo] = useState<StepFinancialInfo>({
    annualIncome: "",
    employmentStatus: "",
    monthlyRentMortgage: "",
    bankStatements: "",
    debts: [{ description: "", amount: "", monthlyRepayment: "" }],
  });

  const updateFinancialInfo = useCallback((updates: Partial<StepFinancialInfo>) => {
    setFinancialInfo((prev) => ({ ...prev, ...updates }));
  }, []);

  const stepLabels = initialSteps.map((step) => step.label);
  const totalSteps = initialSteps.length;
  const isLastStep = currentStep >= totalSteps - 1;
  const isFirstStep = currentStep === 0;

  // --- Step 2 setters ---
  const updateDebt = useCallback((index: number, field: keyof DebtItem, value: string) => {
    setDebts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const addDebt = useCallback(() => {
    setDebts((prev) => [...prev, { id: `debt-${Date.now()}`, creditor: "", monthlyPayment: "" }]);
  }, []);

  const removeDebt = useCallback((index: number) => {
    setDebts((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // --- Validation Step 1 ---
  const validateStep1 = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!mortgageType) errors.mortgageType = "Please select a mortgage type";
    if (!buyerType) errors.buyerType = "Please select a buyer type";
    if (!customerType) errors.customerType = "Please select a customer type";
    if (!taxStatus) errors.taxStatus = "Please select a tax status";

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
  }, [mortgageType, buyerType, customerType, taxStatus, propertyPrice, depositAmount, loanTerm]);

  // --- Validation Step 2 (Personal Details) ---
  const validateStep2 = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!personalDetails.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!personalDetails.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!personalDetails.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }
    if (!personalDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!personalDetails.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!personalDetails.streetAddress.trim()) {
      errors.streetAddress = "Street address is required";
    }
    if (!personalDetails.city.trim()) {
      errors.city = "City is required";
    }
    if (!personalDetails.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    }

    // Joint applicant validation
    if (applicantMode === "joint") {
      if (!personalDetails.partnerFirstName.trim()) {
        errors.partnerFirstName = "Partner first name is required";
      }
      if (!personalDetails.partnerLastName.trim()) {
        errors.partnerLastName = "Partner last name is required";
      }
      if (!personalDetails.partnerDateOfBirth) {
        errors.partnerDateOfBirth = "Partner date of birth is required";
      }
      if (!personalDetails.partnerEmail.trim()) {
        errors.partnerEmail = "Partner email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.partnerEmail)) {
        errors.partnerEmail = "Please enter a valid email";
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }, [personalDetails, applicantMode]);

  // --- Validation Step 3 (Financial Info) ---
  const validateStep3 = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!financialInfo.annualIncome || Number(financialInfo.annualIncome) <= 0) {
      errors.annualIncome = "Please enter a valid annual income";
    }
    if (!financialInfo.employmentStatus) {
      errors.employmentStatus = "Please select your employment status";
    }
    if (!financialInfo.monthlyRentMortgage) {
      errors.monthlyRentMortgage = "Monthly rent/mortgage is required";
    }
    if (!financialInfo.bankStatements || Number(financialInfo.bankStatements) < 1) {
      errors.bankStatements = "At least 1 month of bank statements is required";
    }

    financialInfo.debts.forEach((debt, index) => {
      if (!debt.description.trim()) {
        errors[`debt_${index}_description`] = "Description is required";
      }
      if (!debt.amount || Number(debt.amount) <= 0) {
        errors[`debt_${index}_amount`] = "Valid amount is required";
      }
      if (!debt.monthlyRepayment || Number(debt.monthlyRepayment) < 0) {
        errors[`debt_${index}_monthlyRepayment`] = "Valid repayment is required";
      }
    });

    return { valid: Object.keys(errors).length === 0, errors };
  }, [financialInfo]);

  // --- Reset ---
  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setApplicantMode("single");
    setMortgageType("");
    setBuyerType("");
    setCustomerType("");
    setTaxStatus("");
    setPropertyPrice("");
    setDepositAmount("");
    setLoanTerm("");
    setGrossAnnualIncome("");
    setDebts(createEmptyDebts);
    setMonthlyCommitments("");
    setNumberOfDependents("");
    setLivingStatus("");
  }, []);

  // --- Navigation ---
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
        currentStep: currentStep + 1,
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

        // Step 1 state
        mortgageType,
        setMortgageType,
        buyerType,
        setBuyerType,
        customerType,
        setCustomerType,
        taxStatus,
        setTaxStatus,
        propertyPrice,
        setPropertyPrice,
        depositAmount,
        setDepositAmount,
        loanTerm,
        setLoanTerm,

        // Step 2 state
        grossAnnualIncome,
        setGrossAnnualIncome,
        debts,
        updateDebt,
        addDebt,
        removeDebt,
        monthlyCommitments,
        setMonthlyCommitments,

        // Step 3 state
        numberOfDependents,
        setNumberOfDependents,
        livingStatus,
        setLivingStatus,

        // Validation
        validateStep1,
        validateStep2,
        validateStep3,

        // Reset
        resetForm,

        // Grouped state
        personalDetails,
        financialInfo,

        // Grouped onChange handlers
        updatePersonalDetails,
        updateFinancialInfo,
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
