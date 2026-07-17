"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"
import { pricingStatus, pricingTiers } from "@/lib/pricing"
import { trackEvent } from "@/lib/analytics"

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>()

  function openPlan(planName: string) {
    setSelectedPlan(planName)
    trackEvent("pricing_interest", {
      cta_placement: "pricing_page_card",
      plan_name: planName,
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <section id="pricing" className="py-28 md:py-36 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">{pricingStatus.label}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mb-4">
              Start with evidence. Activate execution after scope review.
            </h2>
            <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto">
              The free audit is available now. Paid prices are early-access targets for approved accounts,
              with final access, limits, and billing confirmed before activation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                  tier.featured
                    ? "bg-card border-2 border-signal/30 shadow-lg shadow-signal/5"
                    : "bg-card border border-line hover:border-line"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-signal text-black text-[10px] font-semibold uppercase tracking-wider rounded-full">
                    Early-access default
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-ink mb-1">{tier.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-signal mb-2">
                    {tier.availability}
                  </p>
                  <p className="text-sm text-neutral-600">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-semibold text-ink">{tier.price}</span>
                  <span className="text-sm text-neutral-600">{tier.period}</span>
                </div>
                {tier.name !== "Audit" && (
                  <p className="text-[11px] text-neutral-500 mb-6">Target monthly price; billing does not start from this form.</p>
                )}

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-600">
                      <Check className="w-3.5 h-3.5 text-signal flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => openPlan(tier.name)}
                  className={`w-full rounded-full py-5 text-sm font-medium ${
                    tier.featured
                      ? "bg-signal hover:bg-signal text-black"
                      : "bg-surface hover:bg-[#202622] text-ink border border-line"
                  }`}
                >
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-surface px-5 py-4 text-center">
            <p className="text-xs leading-5 text-neutral-600">{pricingStatus.summary}</p>
            <p className="text-xs leading-5 text-neutral-500 mt-1">{pricingStatus.billing}</p>
          </div>
        </div>
      </section>

      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadSource="pricing_page"
        ctaPlacement="pricing_page_card"
        planName={selectedPlan}
      />
    </>
  )
}
