import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Pricing — SERP Strategist | AI SEO Agent Plans",
  description:
    "Simple, transparent pricing for autonomous SEO. Free site audit, Growth plan at $49/mo, Pro plan at $99/mo. Cancel anytime.",
  openGraph: {
    title: "Pricing — SERP Strategist",
    description: "AI SEO agent pricing. Free audit, $49/mo Growth, $99/mo Pro. Cancel anytime.",
  },
}

const jsonLd = {"@context":"https://schema.org","@type":"Product","name":"SERP Strategist","description":"Autonomous AI SEO agent","offers":[{"@type":"Offer","name":"Free","price":"0","priceCurrency":"USD"},{"@type":"Offer","name":"Growth","price":"49","priceCurrency":"USD","billingIncrement":"P1M"},{"@type":"Offer","name":"Pro","price":"99","priceCurrency":"USD","billingIncrement":"P1M"}]};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-20">
        <PricingSection />
        <FaqSection />
      </div>
      <Footer />
    </main>
  )
}
