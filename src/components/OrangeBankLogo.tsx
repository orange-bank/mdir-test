import { cn } from "@/lib/utils";

interface OrangeBankLogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function OrangeBankLogo({ className, variant = "default" }: OrangeBankLogoProps) {
  const textColor = variant === "white" ? "#FFFFFF" : "#1C1C1C";
  const accentColor = "#FC4C02";

  return (
    <svg
      className={cn("h-10 w-auto", className)}
      viewBox="0 0 190 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Orange Bank"
      role="img"
    >
      {/* Orange circle accent */}
      <circle cx="7" cy="20" r="6" fill={accentColor} />
      {/* "orange" bold */}
      <text
        x="18"
        y="27"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="20"
        fill={accentColor}
        letterSpacing="-0.5"
      >
        orange
      </text>
      {/* "bank" regular weight */}
      <text
        x="114"
        y="27"
        fontFamily="system-ui, sans-serif"
        fontWeight="400"
        fontSize="20"
        fill={textColor}
        letterSpacing="-0.5"
      >
        bank
      </text>
    </svg>
  );
}
