"use client";

import { Input, Button } from "@/components";

export interface StepApplicationTypeProps {
  mode: import("@/components").ApplicantMode;
  onChange: (mode: import("@/components").ApplicantMode) => void;
  propertyPrice: string;
  onPropertyPriceChange: (value: string) => void;
  propertyPriceError: string;
  depositAmount: string;
  onDepositAmountChange: (value: string) => void;
  depositAmountError: string;
  loanTerm: string;
  onLoanTermChange: (value: string) => void;
  loanTermError: string;
}

export function StepApplicationType({
  mode,
  onChange,
  propertyPrice,
  onPropertyPriceChange,
  propertyPriceError,
  depositAmount,
  onDepositAmountChange,
  depositAmountError,
  loanTerm,
  onLoanTermChange,
  loanTermError,
}: StepApplicationTypeProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Applicant Type</label>
        <div className="flex rounded-lg overflow-hidden border-2 border-[var(--ob-border)]">
          {(["single", "joint"] as const).map((m) => (
            <button
              key={m}
              onClick={() => onChange(m)}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${
                mode === m
                  ? "bg-[var(--ob-orange)] text-white"
                  : "text-slate-600 hover:bg-[var(--ob-orange-light)]"
              }`}
            >
              {m === "single" ? "Single Applicant" : "Joint Applicant"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Property Price (£)"
          type="number"
          placeholder="e.g. 250000"
          value={propertyPrice}
          onChange={(e) => onPropertyPriceChange(e.target.value)}
          error={propertyPriceError}
        />
        <Input
          label="Deposit Amount (£)"
          type="number"
          placeholder="e.g. 50000"
          value={depositAmount}
          onChange={(e) => onDepositAmountChange(e.target.value)}
          error={depositAmountError}
        />
        <Input
          label="Loan Term (years)"
          type="number"
          placeholder="e.g. 25"
          value={loanTerm}
          onChange={(e) => onLoanTermChange(e.target.value)}
          error={loanTermError}
        />
      </div>
    </div>
  );
}
