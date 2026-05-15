import { Input } from "@/components/Input";
import type { ApplicantMode } from "@/components/WizardContext";

interface StepPersonalDetailsProps {
  mode: ApplicantMode;
}

export function StepPersonalDetails({ mode }: StepPersonalDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ob-charcoal)" }}>
          Personal Details
        </h3>
        <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
          {mode === "joint"
            ? "Please provide details for both applicants"
            : "Please provide your personal details"}
        </p>
      </div>

      <div className={`grid grid-cols-1 ${mode === "joint" ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
        <Input label="First Name" placeholder="Enter first name" />
        <Input label="Last Name" placeholder="Enter last name" />
        {mode === "joint" && (
          <div className="text-sm font-semibold pt-5" style={{ color: "var(--ob-orange)" }}>
            Co-applicant
          </div>
        )}
        {mode === "joint" && (
          <>
            <Input label="First Name" placeholder="Enter co-applicant first name" />
            <Input label="Last Name" placeholder="Enter co-applicant last name" />
          </>
        )}
      </div>

      <div className={`grid grid-cols-1 ${mode === "joint" ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
        <Input label="Date of Birth" placeholder="YYYY-MM-DD" />
        <Input label="Email Address" type="email" placeholder="Enter email" />
        {mode === "joint" && (
          <Input label="Co-applicant Email" type="email" placeholder="Enter co-applicant email" />
        )}
      </div>

      <div className={`grid grid-cols-1 ${mode === "joint" ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
        <Input label="Phone Number" placeholder="Enter phone number" />
        {mode === "joint" && (
          <Input label="Co-applicant Phone" placeholder="Enter co-applicant phone" />
        )}
      </div>

      <div className="space-y-2">
        <Input label="Street Address" placeholder="Enter street address" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Input label="City" placeholder="City" />
          <Input label="State / Province" placeholder="State" />
          <Input label="Postal Code" placeholder="Postal code" />
        </div>
      </div>
    </div>
  );
}
