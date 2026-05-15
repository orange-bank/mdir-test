import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

export function Card({ hover = false, padding = "md", className, children, ...props }: CardProps) {
  const padMap = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };
  return (
    <div
      className={cn(
        "bg-white rounded-xl border",
        "border-[var(--ob-border)]",
        hover && "transition-all duration-200 hover:-translate-y-0.5 cursor-pointer",
        padMap[padding],
        className
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
      data-hover={hover ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-bold leading-snug", className)}
      style={{ color: "var(--ob-charcoal)" }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm mt-1 leading-relaxed", className)}
      style={{ color: "var(--ob-slate-mid)" }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-4 pt-4 border-t flex items-center gap-3", className)}
      style={{ borderColor: "var(--ob-border)" }}
      {...props}
    >
      {children}
    </div>
  );
}
