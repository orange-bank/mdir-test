import { cn } from "@/lib/utils";
import { Button } from "./Button";
import Link from "next/link";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: "white" | "warm" | "charcoal" | "orange";
  align?: "left" | "center";
  className?: string;
}

const bgMap = {
  white: "bg-white",
  warm: "bg-[var(--ob-bg-warm)]",
  charcoal: "bg-[var(--ob-charcoal)]",
  orange: "bg-[var(--ob-orange)]",
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  background = "warm",
  align = "left",
  className,
}: HeroProps) {
  const isDark = background === "charcoal" || background === "orange";

  return (
    <section
      className={cn("section-pad overflow-hidden relative", bgMap[background], className)}
    >
      {/* Background decorative blur */}
      <div
        className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: isDark ? "white" : "var(--ob-orange)",
          filter: "blur(80px)",
        }}
      />

      <div
        className={cn(
          "container-ob relative z-10",
          align === "center" && "text-center"
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          {eyebrow && (
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: isDark ? "rgba(255,255,255,0.7)" : "var(--ob-orange)" }}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className="font-extrabold leading-tight mb-5"
            style={{ color: isDark ? "white" : "var(--ob-charcoal)" }}
          >
            {title}
          </h1>

          {description && (
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: isDark ? "rgba(255,255,255,0.75)" : "var(--ob-slate)" }}
            >
              {description}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div
              className={cn("flex flex-wrap gap-3", align === "center" && "justify-center")}
            >
              {primaryCta && (
                <Link href={primaryCta.href}>
                  <Button
                    size="lg"
                    variant={isDark && background !== "orange" ? "outline" : "primary"}
                    style={
                      background === "charcoal"
                        ? { borderColor: "white", color: "white" }
                        : background === "orange"
                        ? { background: "white", color: "var(--ob-orange)" }
                        : undefined
                    }
                  >
                    {primaryCta.label}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <Button
                    size="lg"
                    variant="ghost"
                    style={isDark ? { color: "rgba(255,255,255,0.85)" } : undefined}
                  >
                    {secondaryCta.label}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
