import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { OutcomesSection } from "@/components/outcomes-section"
import { ValuePropSection } from "@/components/value-prop-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { WhoItsForSection } from "@/components/who-its-for-section"
import { FeatureGridSection } from "@/components/feature-grid-section"
import { PricingSection } from "@/components/pricing-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <OutcomesSection />
      <ValuePropSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <FeatureGridSection />
      <PricingSection />
      <FinalCtaSection />
      <Footer />
    </main>
  )
}
