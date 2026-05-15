import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

interface StepApplicationTypeProps {
  mode: "single" | "joint";
  onChange: (mode: "single" | "joint") => void;
}

export function StepApplicationType({ mode, onChange }: StepApplicationTypeProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ob-charcoal)" }}>
          Application Type
        </h3>
        <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
          Choose how you will be applying — individually or with a co-applicant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() => onChange("single")}
          className={cn(
            "relative p-6 rounded-xl border-2 transition-all duration-200 text-left",
            mode === "single"
              ? "border-[var(--ob-orange)]"
              : "border-[var(--ob-border)] hover:border-[var(--ob-border-mid)]"
          )}
        >
          {mode === "single" && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 rounded-full bg-[var(--ob-orange)] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "var(--ob-orange-light)" }}
            >
              <svg className="w-6 h-6" style={{ color: "var(--ob-orange)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-base" style={{ color: "var(--ob-charcoal)" }}>
                Single Applicant
              </span>
              <span className="block text-xs mt-1" style={{ color: "var(--ob-slate-mid)" }}>
                Applying on your own
              </span>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange("joint")}
          className={cn(
            "relative p-6 rounded-xl border-2 transition-all duration-200 text-left",
            mode === "joint"
              ? "border-[var(--ob-orange)]"
              : "border-[var(--ob-border)] hover:border-[var(--ob-border-mid)]"
          )}
        >
          {mode === "joint" && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 rounded-full bg-[var(--ob-orange)] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "var(--ob-orange-light)" }}
            >
              <svg className="w-6 h-6" style={{ color: "var(--ob-orange)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-base" style={{ color: "var(--ob-charcoal)" }}>
                Joint Applicant
              </span>
              <span className="block text-xs mt-1" style={{ color: "var(--ob-slate-mid)" }}>
                Applying with a partner
              </span>
            </div>
          </div>
        </button>
      </div>

      {mode === "joint" && (
        <div className="space-y-4 p-5 rounded-xl border" style={{ borderColor: "var(--ob-border-light)", background: "var(--ob-orange-lightest)" }}>
          <Badge variant="default">Joint mode</Badge>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Enter co-applicant first name" />
            <Input label="Last Name" placeholder="Enter co-applicant last name" />
          </div>
          <Input label="Email Address" type="email" placeholder="Enter co-applicant email" />
        </div>
      )}

      <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "var(--ob-slate-light)" }}>
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "var(--ob-slate-mid)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p className="text-sm" style={{ color: "var(--ob-slate-mid)" }}>
          You can add your co-applicant details on this step, or skip and add them later from your dashboard.
        </p>
      </div>
    </div>
  );
}
