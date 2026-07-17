import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection, type FaqItem } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata, buildCanonicalUrl } from "@/lib/site-seo"
import { combineSchemas, getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export const metadata: Metadata = buildMarketingMetadata({
  title: "SERP Strategists Early-Access Pricing",
  description:
    "Run a free SEO and GEO audit, then review early-access target pricing for governed execution. Paid scope, limits, activation, and billing are confirmed before launch.",
  pathname: "/pricing",
})

const pricingFaqs: FaqItem[] = [
  {
    q: "What is available now?",
    a: "The free Growth Audit is available now for one submitted website. It provides a technical SEO and GEO readiness review with an impact-ranked opportunity queue. It does not start a paid subscription or execute automated fixes.",
  },
  {
    q: "Are the Growth and Scale prices active subscriptions?",
    a: "They are current early-access target prices for approved accounts. Joining early access does not charge a card. Final scope, activation date, included limits, and billing start are confirmed before a paid account is activated.",
  },
  {
    q: "Is there a paid-plan free trial?",
    a: "No paid-plan trial is currently published. The free audit is separate from the paid early-access plans and does not automatically convert into a subscription.",
  },
  {
    q: "Do you offer annual billing or automatic overages?",
    a: "No annual discount or automatic overage pricing is currently published. Additional sites, actions, or monitoring capacity are reviewed during onboarding before any billing change.",
  },
  {
    q: "What is included in the early-access target price?",
    a: "Growth is scoped for one connected site with approval-gated execution and up to four content actions per month. Scale is scoped for up to three connected sites, AI citation monitoring, and up to twelve content actions per month. Final limits are confirmed before activation.",
  },
]

const jsonLd = combineSchemas(
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SERP Strategists",
    description: "AI Growth Operator for governed organic-search execution",
    url: buildCanonicalUrl("/pricing"),
    offers: {
      "@type": "Offer",
      name: "Free Growth Audit",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: buildCanonicalUrl("/pricing"),
    },
  },
  getBreadcrumbSchema([
    { name: "Home", url: buildCanonicalUrl("/") },
    { name: "Pricing", url: buildCanonicalUrl("/pricing") },
  ]),
  getFAQSchema(
    pricingFaqs.map((faq) => ({
      question: faq.q,
      answer: faq.a,
    })),
  ),
)

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-20">
        <section className="px-6 pt-16 pb-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Early-access pricing</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-ink mb-4">
              AI Growth Operator pricing with availability shown clearly.
            </h1>
            <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto">
              Start with a free audit. Paid prices are current early-access targets, and no subscription begins until scope, access, limits, and billing are confirmed with you.
            </p>
            <p className="text-sm text-neutral-500 mt-4">
              Need the trust model first? Read our <Link href="/governance" className="text-ink underline underline-offset-4">governance page</Link>. Evaluating other options? See our review of the <Link href="/blog/top-seo-analysis-tools-2025-best-seo-ai-tool" className="text-ink underline underline-offset-4">Best AI SEO Tools for 2026</Link>.
            </p>
          </div>
        </section>
        <PricingSection />
        <FaqSection faqs={pricingFaqs} />
      </div>
      <Footer />
    </main>
  )
}
