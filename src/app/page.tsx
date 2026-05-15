import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Alert } from "@/components/Alert";

function AccountIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function MortgageIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function SavingsIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function LoanIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold" style={{ color: "var(--ob-orange)" }}>
        {value}
      </p>
      <p className="text-sm mt-1" style={{ color: "var(--ob-slate-mid)" }}>
        {label}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="Simple. Smart. Digital."
        title="Banking that works for you"
        description="From current accounts to mortgages, we're here to help you make the most of your money at every stage of life."
        primaryCta={{ label: "Open an Account", href: "/open-account" }}
        secondaryCta={{ label: "Explore Products", href: "/personal" }}
        background="warm"
      />

      {/* Alert banner */}
      <div className="container-ob py-6">
        <Alert variant="info" title="Scheduled Maintenance">
          Online banking will be unavailable from 2am–4am on Sunday 29 April for scheduled maintenance.
        </Alert>
      </div>

      {/* Products */}
      <section className="section-pad" style={{ background: "var(--ob-bg)" }}>
        <div className="container-ob">
          <SectionHeader
            eyebrow="Our products"
            title="Everything you need to bank better"
            description="Straightforward products designed around your needs, not ours."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              icon={<AccountIcon />}
              title="Current Accounts"
              description="Day-to-day banking with no hidden fees and a full suite of digital tools."
              badge="Most Popular"
              ctaLabel="Open Today"
              ctaHref="/personal/current-accounts"
              features={["No monthly fees", "Contactless & Apple Pay", "24/7 mobile banking"]}
            />
            <ProductCard
              icon={<MortgageIcon />}
              title="Mortgages"
              description="Competitive rates for first-time buyers, movers, and switchers."
              ctaLabel="Get a Quote"
              ctaHref="/mortgages"
              features={["Fixed & variable rates", "Free valuation", "Online application"]}
            />
            <ProductCard
              icon={<SavingsIcon />}
              title="Savings"
              description="Grow your money with flexible savings accounts and competitive interest rates."
              badge="High Interest"
              ctaLabel="Start Saving"
              ctaHref="/personal/savings"
              features={["Up to 3.5% AER", "Instant access option", "FSCS protected"]}
            />
            <ProductCard
              icon={<LoanIcon />}
              title="Personal Loans"
              description="Borrow from €1,000 to €75,000 with fixed monthly repayments."
              ctaLabel="Apply Now"
              ctaHref="/personal/loans"
              features={["Instant decision online", "No arrangement fees", "Flexible terms"]}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14" style={{ background: "var(--ob-charcoal)" }}>
        <div className="container-ob">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="50K+" label="Happy customers" />
            <StatCard value="99.9%" label="Uptime reliability" />
            <StatCard value="2 min" label="Account opening time" />
            <StatCard value="4.8★" label="App Store rating" />
          </div>
        </div>
      </section>

      {/* Mortgage calculator CTA */}
      <section className="section-pad">
        <div className="container-ob">
          <div
            className="rounded-2xl overflow-hidden grid md:grid-cols-2"
            style={{
              background: "var(--ob-orange-subtle)",
              border: "1px solid var(--ob-orange-light)",
            }}
          >
            <div className="p-8 lg:p-12">
              <Badge variant="orange" className="mb-4">
                Mortgages
              </Badge>
              <h2
                className="text-2xl font-extrabold mb-3"
                style={{ color: "var(--ob-charcoal)" }}
              >
                See how much you could borrow
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--ob-slate)" }}
              >
                Use our mortgage calculator to get an instant estimate based on your income and
                deposit. No credit check required.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/mortgages/calculator">
                  <Button size="lg">Try the Calculator</Button>
                </Link>
                <Link href="/mortgages">
                  <Button size="lg" variant="ghost">
                    All Mortgage Options
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="hidden md:flex items-center justify-center p-8"
              style={{ background: "var(--ob-orange-light)" }}
            >
              <svg
                className="w-40 h-40 opacity-30"
                style={{ color: "var(--ob-orange)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section-pad" style={{ background: "var(--ob-bg)" }}>
        <div className="container-ob">
          <SectionHeader
            eyebrow="News & insights"
            title="Stay informed"
            description="The latest from Orange Bank — financial tips, product updates, and market news."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "Mortgages",
                date: "22 Apr 2026",
                title: "How to get mortgage-ready in 6 months",
                excerpt:
                  "From credit scores to deposits, here's everything first-time buyers need to know before applying.",
              },
              {
                tag: "Savings",
                date: "15 Apr 2026",
                title: "Our new 3.5% AER savings rate is live",
                excerpt:
                  "Orange Bank has increased its regular saver rate to 3.5% AER — one of the highest on the Irish market.",
              },
              {
                tag: "Digital Banking",
                date: "8 Apr 2026",
                title: "The new Orange Bank app update is here",
                excerpt:
                  "Our latest app release brings instant notifications, spending insights, and improved security.",
              },
            ].map((post) => (
              <Card
                key={post.title}
                hover
                padding="none"
                className="flex flex-col overflow-hidden"
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: "var(--ob-orange-light)" }}
                >
                  <svg
                    className="w-16 h-16 opacity-30"
                    style={{ color: "var(--ob-orange)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="orange">{post.tag}</Badge>
                    <span className="text-xs" style={{ color: "var(--ob-slate-light)" }}>
                      {post.date}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ color: "var(--ob-charcoal)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "var(--ob-slate-mid)" }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href="#"
                    className="mt-4 text-sm font-semibold inline-flex items-center gap-1"
                    style={{ color: "var(--ob-orange)" }}
                  >
                    Read more
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad" style={{ background: "var(--ob-orange)" }}>
        <div className="container-ob text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to switch to Orange Bank?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Open a current account online in under 10 minutes. No branch visit required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/open-account">
              <Button
                size="lg"
                style={{ background: "white", color: "var(--ob-orange)" }}
              >
                Open an Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                style={{ borderColor: "white", color: "white" }}
              >
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
