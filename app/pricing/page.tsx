import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata } from "@/lib/site-seo"
import { combineSchemas, getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI Growth Operator Pricing | SERP Strategists",
  description:
    "Compare AI Growth Operator plans: free growth audits, governed execution, GEO, and AI citation tracking - priced far below agency overhead.",
  pathname: "/pricing",
})

const pricingFaqs = [
  {
    question: "What is included in the free Audit plan?",
    answer:
      "The Audit plan gives you a full site review, an impact-ranked opportunity queue, and an AI visibility readiness score with no payment required.",
  },
  {
    question: "What happens on the Growth plan?",
    answer:
      "Growth adds governed execution, approved fixes, content workflows, monitoring, and recurring reporting for one site.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no contracts, and you can cancel your plan whenever you want.",
  },
  {
    question: "Do you support multiple websites?",
    answer:
      "Yes. The Scale plan is designed for up to three sites, while the lower plans are scoped to a single site.",
  },
]

const jsonLd = combineSchemas(
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SERP Strategists",
    description: "AI Growth Operator for organic search",
    offers: [
      { "@type": "Offer", name: "Audit", price: "0", priceCurrency: "USD" },
      { "@type": "Offer", name: "Growth", price: "49", priceCurrency: "USD", billingIncrement: "P1M" },
      { "@type": "Offer", name: "Scale", price: "99", priceCurrency: "USD", billingIncrement: "P1M" },
    ],
  },
  getBreadcrumbSchema([
    { name: "Home", url: "https://serpstrategists.com" },
    { name: "Pricing", url: "https://serpstrategists.com/pricing" },
  ]),
  getFAQSchema(pricingFaqs)
)

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-20">
        <section className="px-6 pt-16 pb-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Pricing</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-ink mb-4">
              AI Growth Operator pricing for teams that want execution, not retainers.
            </h1>
            <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto">
              Start with a free growth audit, then turn on governed execution, content workflows, and AI citation tracking as the loop matures.
            </p>
            <p className="text-sm text-neutral-500 mt-4">
              Need the trust model first? Read our <Link href="/governance" className="text-ink underline underline-offset-4">governance page</Link>.
            </p>
          </div>
        </section>
        <PricingSection />
        <FaqSection />
      </div>
      <Footer />
    </main>
  )
}
