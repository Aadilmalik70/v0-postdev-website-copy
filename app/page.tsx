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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000]">
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
