"use client";

import { useState } from "react";
import Link from "next/link";
import { OrangeBankLogo } from "./OrangeBankLogo";

const navItems = [
  {
    label: "Personal",
    href: "/personal",
    children: [
      { label: "Current Accounts", href: "/personal/current-accounts" },
      { label: "Savings", href: "/personal/savings" },
      { label: "Mortgages", href: "/personal/mortgages" },
      { label: "Loans", href: "/personal/loans" },
      { label: "Credit Cards", href: "/personal/credit-cards" },
      { label: "Insurance", href: "/personal/insurance" },
    ],
  },
  {
    label: "Business",
    href: "/business",
    children: [
      { label: "Business Accounts", href: "/business/accounts" },
      { label: "Business Loans", href: "/business/loans" },
      { label: "Merchant Services", href: "/business/merchant-services" },
    ],
  },
  {
    label: "Mortgages",
    href: "/mortgages",
    children: [
      { label: "First-Time Buyers", href: "/mortgages/first-time-buyers" },
      { label: "Moving Home", href: "/mortgages/moving-home" },
      { label: "Switching", href: "/mortgages/switching" },
      { label: "Mortgage Calculator", href: "/mortgages/calculator" },
    ],
  },
  { label: "Help & Support", href: "/support", children: [] },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header
      className="bg-white sticky top-0 z-50"
      style={{ boxShadow: "var(--shadow-nav)" }}
    >
      {/* Utility bar */}
      <div
        style={{ background: "var(--ob-charcoal)", color: "var(--ob-white)" }}
        className="text-xs"
      >
        <div className="container-ob flex items-center justify-end gap-6 py-2">
          <Link href="/online-banking" className="text-white/70 hover:text-white transition-colors">
            Online Banking
          </Link>
          <Link href="/app" className="text-white/70 hover:text-white transition-colors">
            Mobile App
          </Link>
          <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-ob flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex-shrink-0">
          <OrangeBankLogo className="h-8 lg:h-10 w-auto" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children.length > 0 && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: activeDropdown === item.label ? "var(--ob-orange)" : "var(--ob-charcoal)",
                }}
              >
                {item.label}
                {item.children.length > 0 && (
                  <svg
                    className="w-3 h-3 transition-transform"
                    style={{ transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              {item.children.length > 0 && activeDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-1 min-w-52 bg-white rounded-xl py-2"
                  style={{ boxShadow: "var(--shadow-card-hover)" }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm transition-colors"
                      style={{ color: "var(--ob-slate)" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--ob-orange)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--ob-slate)")
                      }
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
            style={{ color: "var(--ob-orange)" }}
          >
            Log In
          </Link>
          <Link
            href="/open-account"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-all"
            style={{ background: "var(--ob-btn-primary)", color: "var(--ob-charcoal)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--ob-btn-primary-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--ob-btn-primary)")
            }
          >
            Open an Account
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t py-4"
          style={{ borderColor: "var(--ob-border)" }}
        >
          <div className="container-ob flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-3 text-sm font-medium rounded-lg"
                style={{ color: "var(--ob-charcoal)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t mt-2" style={{ borderColor: "var(--ob-border)" }}>
              <Link
                href="/login"
                className="px-3 py-3 text-sm font-semibold text-center rounded-lg border"
                style={{ color: "var(--ob-orange)", borderColor: "var(--ob-orange)" }}
              >
                Log In
              </Link>
              <Link
                href="/open-account"
                className="px-3 py-3 text-sm font-semibold text-center rounded-lg"
                style={{ background: "var(--ob-btn-primary)", color: "var(--ob-charcoal)" }}
              >
                Open an Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
