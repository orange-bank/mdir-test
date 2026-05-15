import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  features?: string[];
}

export function ProductCard({
  icon,
  title,
  description,
  badge,
  ctaLabel = "Learn more",
  ctaHref = "#",
  features,
}: ProductCardProps) {
  return (
    <Card hover padding="lg" className="flex flex-col h-full">
      <CardHeader>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "var(--ob-orange-light)" }}
        >
          <span style={{ color: "var(--ob-orange)" }}>{icon}</span>
        </div>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{title}</CardTitle>
          {badge && <Badge variant="orange">{badge}</Badge>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {features && features.length > 0 && (
        <CardContent className="flex-1">
          <ul className="flex flex-col gap-2 mt-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--ob-slate)" }}>
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "var(--ob-orange)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      <CardFooter className="mt-auto">
        <Link href={ctaHref} className="w-full">
          <Button variant="outline" size="md" className="w-full">
            {ctaLabel}
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
