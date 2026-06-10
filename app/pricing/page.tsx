import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI SEO Agent Pricing | SERP Strategist",
  description:
    "Compare AI SEO agent pricing plans for audits, autonomous fixes, GEO optimization, and ongoing organic growth.",
  pathname: "/pricing",
})

const jsonLd = {"@context":"https://schema.org","@type":"Product","name":"SERP Strategist","description":"Autonomous AI SEO agent","offers":[{"@type":"Offer","name":"Free","price":"0","priceCurrency":"USD"},{"@type":"Offer","name":"Growth","price":"49","priceCurrency":"USD","billingIncrement":"P1M"},{"@type":"Offer","name":"Pro","price":"99","priceCurrency":"USD","billingIncrement":"P1M"}]};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-20">
        <section className="px-6 pt-16 pb-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">Pricing</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0f0f0] tracking-tight mb-4">
              AI SEO agent pricing for teams that want execution, not retainers.
            </h1>
            <p className="text-[#8a8a8a] text-base md:text-lg max-w-2xl mx-auto">
              Start with a free audit, then scale into autonomous fixes, content, and GEO optimization as your growth engine matures.
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
