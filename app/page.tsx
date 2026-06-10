import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { LogoCloudSection } from "@/components/logo-cloud-section"
import { ProblemSection } from "@/components/problem-section"
import { ProductDemoSection } from "@/components/product-demo-section"
import { OutcomesSection } from "@/components/outcomes-section"
import { ComparisonSection } from "@/components/comparison-section"
import { ValuePropSection } from "@/components/value-prop-section"
import { BentoGridSection } from "@/components/bento-grid-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { WhoItsForSection } from "@/components/who-its-for-section"
import { FeatureGridSection } from "@/components/feature-grid-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { buildCanonicalUrl, getHomepageSeoCopy } from "@/lib/site-seo"

const homepageSeoCopy = getHomepageSeoCopy()

export const metadata: Metadata = {
  title: homepageSeoCopy.title,
  description: homepageSeoCopy.description,
  alternates: {
    canonical: buildCanonicalUrl("/"),
  },
  openGraph: {
    title: homepageSeoCopy.openGraphTitle,
    description: homepageSeoCopy.openGraphDescription,
    type: "website",
    url: buildCanonicalUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: homepageSeoCopy.twitterTitle,
    description: homepageSeoCopy.twitterDescription,
  },
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SERP Strategist",
    url: "https://serpstrategists.com",
    description: homepageSeoCopy.description,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://serpstrategists.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <main className="min-h-screen bg-[#000000]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <HeroSection />
      <LogoCloudSection />
      <ProblemSection />
      <ProductDemoSection />
      <OutcomesSection />
      <ComparisonSection />
      <BentoGridSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <FeatureGridSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
      <UrgencyBanner />
    </main>
  )
}
