import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, iconLeft, iconRight, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium"
            style={{ color: "var(--ob-charcoal)" }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--ob-slate-light)" }}
            >
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 px-4 text-sm rounded-lg border outline-none transition-all",
              "placeholder:text-[var(--ob-slate-light)]",
              "bg-white border-[var(--ob-border)]",
              "focus:border-[var(--ob-orange)] focus:ring-2 focus:ring-[var(--ob-orange)]/20",
              "disabled:bg-[var(--ob-bg)] disabled:cursor-not-allowed disabled:opacity-60",
              error &&
                "border-[var(--ob-error)] focus:border-[var(--ob-error)] focus:ring-[var(--ob-error)]/20",
              iconLeft && "pl-10",
              iconRight && "pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          {iconRight && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--ob-slate-light)" }}
            >
              {iconRight}
            </span>
          )}
        </div>
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs" style={{ color: "var(--ob-slate-mid)" }}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs" style={{ color: "var(--ob-error)" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium"
            style={{ color: "var(--ob-charcoal)" }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 text-sm rounded-lg border outline-none transition-all resize-y min-h-[100px]",
            "placeholder:text-[var(--ob-slate-light)]",
            "bg-white border-[var(--ob-border)]",
            "focus:border-[var(--ob-orange)] focus:ring-2 focus:ring-[var(--ob-orange)]/20",
            error &&
              "border-[var(--ob-error)] focus:border-[var(--ob-error)] focus:ring-[var(--ob-error)]/20",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs" style={{ color: "var(--ob-slate-mid)" }}>
            {hint}
          </p>
        )}
        {error && (
          <p className="text-xs" style={{ color: "var(--ob-error)" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
