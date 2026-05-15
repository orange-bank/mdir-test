import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "orange" | "success" | "error" | "warning" | "info" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string; border?: string }> = {
  default:   { bg: "var(--ob-bg)", color: "var(--ob-slate)" },
  orange:    { bg: "var(--ob-orange-light)", color: "var(--ob-orange-dark)" },
  success:   { bg: "var(--ob-success-light)", color: "var(--ob-success)" },
  error:     { bg: "var(--ob-error-light)", color: "var(--ob-error)" },
  warning:   { bg: "var(--ob-warning-light)", color: "#92400E" },
  info:      { bg: "var(--ob-info-light)", color: "var(--ob-info)" },
  outline:   { bg: "transparent", color: "var(--ob-slate)", border: "var(--ob-border)" },
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  const styles = variantStyles[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        className
      )}
      style={{
        background: styles.bg,
        color: styles.color,
        border: styles.border ? `1px solid ${styles.border}` : undefined,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
