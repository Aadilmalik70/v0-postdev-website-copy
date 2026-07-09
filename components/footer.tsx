import Link from "next/link"

const footerLinks = {
  Product: [
    { label: "Modules", href: "/#modules" },
    { label: "Operator Loop", href: "/#operator-loop" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "Execution demo", href: "/demo" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Governance", href: "/governance" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4" aria-label="SERP Strategists home">
              <img
                src="/serp-strategists-logo-mark.svg"
                alt=""
                aria-hidden="true"
                className="h-7 w-7 rounded-lg"
              />
              <span className="font-display text-[15px] font-semibold text-ink">SERP Strategists</span>
            </Link>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-[230px]">
              The AI Growth Operator for organic search. From opportunity to executed action.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600 mb-5">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-underline text-sm text-neutral-600 hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-line mt-14 pt-7 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">&copy; {new Date().getFullYear()} SERP Strategists. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
            Governed autonomy | Full logs | Human approval where it matters
          </p>
        </div>
      </div>
    </footer>
  )
}
