import Link from "next/link";
import { OrangeBankLogo } from "./OrangeBankLogo";

const footerLinks = [
  {
    heading: "Personal",
    links: [
      { label: "Current Accounts", href: "/personal/current-accounts" },
      { label: "Savings Accounts", href: "/personal/savings" },
      { label: "Mortgages", href: "/personal/mortgages" },
      { label: "Personal Loans", href: "/personal/loans" },
      { label: "Credit Cards", href: "/personal/credit-cards" },
    ],
  },
  {
    heading: "Business",
    links: [
      { label: "Business Accounts", href: "/business/accounts" },
      { label: "Business Loans", href: "/business/loans" },
      { label: "Merchant Services", href: "/business/merchant-services" },
    ],
  },
  {
    heading: "Help & Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Branch Finder", href: "/branches" },
      { label: "ATM Finder", href: "/atms" },
      { label: "FAQs", href: "/faqs" },
      { label: "Security Centre", href: "/security" },
    ],
  },
  {
    heading: "About Orange Bank",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Investor Relations", href: "/investor-relations" },
      { label: "Media Centre", href: "/media" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--ob-charcoal)", color: "var(--ob-white)" }}>
      {/* Main footer */}
      <div className="container-ob py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <OrangeBankLogo variant="white" className="h-8 mb-4" />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Orange Bank Group Holdings plc. Regulated by the Central Bank of Ireland.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: "Twitter / X",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "Facebook",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="container-ob py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <p>© {new Date().getFullYear()} Orange Bank Group Holdings plc. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Cookie Policy", "Terms & Conditions", "Accessibility"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
