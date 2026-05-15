import { Input } from "@/components/Input";
import { Textarea } from "@/components/Input";
import type { ApplicantMode } from "@/components/WizardContext";

interface StepFinancialInfoProps {
  mode: ApplicantMode;
}

export function StepFinancialInfo({ mode }: StepFinancialInfoProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ob-charcoal)" }}>
          Financial Information
        </h3>
        <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
          {mode === "joint"
            ? "Please provide financial details for both applicants"
            : "Please provide your financial information"}
        </p>
      </div>

      <div className={`grid grid-cols-1 ${mode === "joint" ? "md:grid-cols-2" : "md:grid-cols-2"} gap-4`}>
        <Input label="Annual Income" placeholder="Enter annual income" />
        {mode === "joint" && (
          <Input label="Co-applicant Income" placeholder="Enter co-applicant income" />
        )}
      </div>

      <div className={`grid grid-cols-1 ${mode === "joint" ? "md:grid-cols-2" : "md:grid-cols-2"} gap-4`}>
        <Input label="Employment Status" placeholder="e.g. Employed, Self-employed" />
        {mode === "joint" && (
          <Input label="Co-applicant Employment" placeholder="e.g. Employed, Self-employed" />
        )}
      </div>

      <div className={`grid grid-cols-1 ${mode === "joint" ? "md:grid-cols-2" : "md:grid-cols-2"} gap-4`}>
        <Input label="Monthly Rent / Mortgage" placeholder="Enter monthly amount" />
        {mode === "joint" && (
          <Input label="Co-applicant Monthly Payments" placeholder="Enter monthly amount" />
        )}
      </div>

      <div className="space-y-2">
        <Textarea label="Additional Financial Notes" placeholder="Any additional financial details you would like to share..." />
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "var(--ob-slate-light)" }}>
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "var(--ob-slate-mid)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
        <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
          Your financial information is encrypted and will only be used to assess your application eligibility.
        </p>
      </div>
    </div>
  );
}
