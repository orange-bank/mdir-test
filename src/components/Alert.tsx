import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const config: Record<AlertVariant, { bg: string; border: string; color: string; icon: string }> = {
  info: {
    bg: "var(--ob-info-light)",
    border: "var(--ob-info)",
    color: "var(--ob-info)",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  success: {
    bg: "var(--ob-success-light)",
    border: "var(--ob-success)",
    color: "var(--ob-success)",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  warning: {
    bg: "var(--ob-warning-light)",
    border: "var(--ob-warning)",
    color: "#92400E",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  error: {
    bg: "var(--ob-error-light)",
    border: "var(--ob-error)",
    color: "var(--ob-error)",
    icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

export function Alert({
  variant = "info",
  title,
  dismissible,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  const c = config[variant];
  return (
    <div
      className={cn("flex gap-3 rounded-lg p-4 border-l-4", className)}
      style={{ background: c.bg, borderLeftColor: c.border }}
      role="alert"
      {...props}
    >
      <svg
        className="w-5 h-5 flex-shrink-0 mt-0.5"
        style={{ color: c.color }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
      </svg>
      <div className="flex-1 text-sm">
        {title && (
          <p className="font-semibold mb-1" style={{ color: c.color }}>
            {title}
          </p>
        )}
        <div style={{ color: "var(--ob-charcoal)" }}>{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-auto -my-1 -mr-1 p-1 rounded opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
