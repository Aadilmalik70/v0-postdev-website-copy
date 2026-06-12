import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildMarketingMetadata({
  title: "SERP Operator Pricing | SERP Strategists",
  description:
    "Compare SERP Operator plans: free growth audits, governed execution, GEO and AI citation tracking — priced far below agency overhead.",
  pathname: "/pricing",
})

const jsonLd = {"@context":"https://schema.org","@type":"Product","name":"SERP Strategists","description":"AI Growth Operator for organic search","offers":[{"@type":"Offer","name":"Audit","price":"0","priceCurrency":"USD"},{"@type":"Offer","name":"Growth","price":"49","priceCurrency":"USD","billingIncrement":"P1M"},{"@type":"Offer","name":"Scale","price":"99","priceCurrency":"USD","billingIncrement":"P1M"}]};

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
              Operator pricing for teams that want execution, not retainers.
            </h1>
            <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto">
              Start with a free growth audit, then turn on governed execution, content workflows, and AI citation tracking as the loop matures.
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
