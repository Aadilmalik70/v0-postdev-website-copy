import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { LogoCloudSection } from "@/components/logo-cloud-section"
import { AiGrowthOperatorDefinitionSection } from "@/components/ai-growth-operator-definition-section"
import { ProblemSection } from "@/components/problem-section"
import { ProductDemoSection } from "@/components/product-demo-section"
import { OutcomesSection } from "@/components/outcomes-section"
import { ComparisonSection } from "@/components/comparison-section"
import { BentoGridSection } from "@/components/bento-grid-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { WhoItsForSection } from "@/components/who-its-for-section"
import { FeatureGridSection } from "@/components/feature-grid-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { HomepagePricingTeaser } from "@/components/homepage-pricing-teaser"
import { HomepageFaqTeaser } from "@/components/homepage-faq-teaser"
import { HomepageSupportLinksSection } from "@/components/homepage-support-links-section"
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

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${buildCanonicalUrl("/")}#software`,
  name: "SERP Strategists",
  alternateName: "SERP Strategists AI Growth Operator",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "SEO and organic search operations",
  operatingSystem: "Web",
  url: buildCanonicalUrl("/"),
  description:
    "A governed AI Growth Operator that turns search data into prioritized, approved, shipped, and measured SEO and GEO actions.",
  featureList: [
    "Technical SEO audits",
    "Google Search Console opportunity analysis",
    "AI citation and visibility monitoring",
    "Impact-ranked action queues",
    "Approval gates and execution logs",
    "CMS and repository execution workflows",
    "Validation, rollback, and outcome measurement",
  ],
  offers: {
    "@type": "Offer",
    name: "Free Growth Audit",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: buildCanonicalUrl("/pricing"),
  },
  publisher: {
    "@id": `${buildCanonicalUrl("/")}#organization`,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      <HeroSection />
      <LogoCloudSection />
      <AiGrowthOperatorDefinitionSection />
      <ProblemSection />
      <ProductDemoSection />
      <OutcomesSection />
      <ComparisonSection />
      <BentoGridSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <FeatureGridSection />
      <HomepagePricingTeaser />
      <HomepageFaqTeaser />
      <HomepageSupportLinksSection />
      <FinalCtaSection />
      <Footer />
      <UrgencyBanner />
    </main>
  )
}
