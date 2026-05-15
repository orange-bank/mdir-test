import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";

interface StepApplicationTypeProps {
  mode: "single" | "joint";
  onChange: (mode: "single" | "joint") => void;
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

function formatCurrency(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) return parts[0] + "." + parts.slice(1).join("");
  let integerPart = parts[0].replace(/^0+(?=.)/, "") || "0";
  return integerPart + (parts.length > 1 ? "." + parts[1] : "");
}

function isNumericString(str: string): boolean {
  return /^[0-9]+$/.test(str) && str !== "";
}

function parseNumeric(value: string): number | null {
  if (!isNumericString(value)) return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
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
  const handlePropertyPriceInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCurrency(e.target.value);
      const validationError =
        formatted !== e.target.value
          ? "Numbers only"
          : "";
      onPropertyPriceChange(formatted);
    },
    [onPropertyPriceChange],
  );

  const handleDepositAmountInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCurrency(e.target.value);
      onDepositAmountChange(formatted);
    },
    [onDepositAmountChange],
  );

  const handleLoanTermInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleaned = e.target.value.replace(/[^0-9]/g, "");
      onLoanTermChange(cleaned);
    },
    [onLoanTermChange],
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ob-charcoal)" }}>
          Property & Loan Details
        </h3>
        <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
          Tell us about the property and loan you&apos;re looking for
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--ob-charcoal)" }}
            >
              Applicant Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChange("single")}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  mode === "single"
                    ? "border-[var(--ob-orange)]"
                    : "border-[var(--ob-border)] hover:border-[var(--ob-border-mid)]",
                )}
              >
                {mode === "single" && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 rounded-full bg-[var(--ob-orange)] flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
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
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "var(--ob-orange-light)" }}
                  >
                    <svg
                      className="w-5 h-5"
                      style={{ color: "var(--ob-orange)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <span
                    className="block font-semibold text-sm"
                    style={{ color: "var(--ob-charcoal)" }}
                  >
                    Single
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onChange("joint")}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  mode === "joint"
                    ? "border-[var(--ob-orange)]"
                    : "border-[var(--ob-border)] hover:border-[var(--ob-border-mid)]",
                )}
              >
                {mode === "joint" && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 rounded-full bg-[var(--ob-orange)] flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
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
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "var(--ob-orange-light)" }}
                  >
                    <svg
                      className="w-5 h-5"
                      style={{ color: "var(--ob-orange)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>
                  <span
                    className="block font-semibold text-sm"
                    style={{ color: "var(--ob-charcoal)" }}
                  >
                    Joint
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--ob-charcoal)" }}
            >
              Loan Term (years)
            </label>
            <Input
              type="text"
              placeholder="e.g. 25"
              value={loanTerm}
              onChange={handleLoanTermInput}
              error={loanTermError}
              disabled={loanTermError === "Max 40 years"}
            />
          </div>
        </div>

        <Input
          label="Property Price"
          type="text"
          placeholder="Enter the property price"
          value={propertyPrice}
          onChange={handlePropertyPriceInput}
          error={propertyPriceError}
          iconLeft={
            <span style={{ color: "var(--ob-slate-mid)", fontWeight: 600 }}>£</span>
          }
        />

        <Input
          label="Deposit Amount"
          type="text"
          placeholder="Enter your deposit amount"
          value={depositAmount}
          onChange={handleDepositAmountInput}
          error={depositAmountError}
          iconLeft={
            <span style={{ color: "var(--ob-slate-mid)", fontWeight: 600 }}>£</span>
          }
        />

        {propertyPrice && depositAmount && !propertyPriceError && !depositAmountError && (
          (() => {
            const price = parseNumeric(propertyPrice);
            const deposit = parseNumeric(depositAmount);
            if (price != null && deposit != null && price !== 0 && price !== null) {
              const minDeposit = Math.round(price * 0.05);
              const meetsMinimum = deposit >= minDeposit;
              return (
                <div
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg",
                    meetsMinimum
                      ? "bg-green-50/50 border border-green-200"
                      : "bg-yellow-50/50 border border-yellow-200",
                  )}
                >
                  <svg
                    className={cn(
                      "w-5 h-5 mt-0.5 flex-shrink-0",
                      meetsMinimum
                        ? "text-green-600"
                        : "text-yellow-600",
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {meetsMinimum ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    )}
                  </svg>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: meetsMinimum
                          ? "var(--ob-green)"
                          : "var(--ob-warning)",
                      }}
                    >
                      {meetsMinimum
                        ? "Deposit meets the minimum 5% requirement"
                        : `Minimum deposit required: £${minDeposit.toLocaleString()} (5% of property price)`}
                    </p>
                    {!meetsMinimum && deposit > 0 && (
                      <p className="text-xs mt-1" style={{ color: "var(--ob-slate-mid)" }}>
                        You&apos;re
                        {" £"}
                        {(minDeposit - deposit).toLocaleString()}{" "}
                        below the minimum.
                      </p>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })()
        )}
      </div>

      {mode === "joint" && (
        <div
          className="space-y-4 p-5 rounded-xl border"
          style={{
            borderColor: "var(--ob-border-light)",
            background: "var(--ob-orange-lightest)",
          }}
        >
          <Badge variant="default">Joint mode</Badge>
          <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
            Second applicant details will be collected in the Personal Details step.
          </p>
        </div>
      )}

      <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "var(--ob-slate-light)" }}>
        <svg
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          style={{ color: "var(--ob-slate-mid)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
          All fields are required to continue. Your deposit should be at least 5% of the property price.
        </p>
      </div>
    </div>
  );
}
