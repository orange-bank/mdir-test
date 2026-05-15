import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--ob-orange)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="heading-accent font-extrabold" style={{ color: "var(--ob-charcoal)" }}>
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--ob-slate)" }}>
          {description}
        </p>
      )}
    </div>
  );
}
