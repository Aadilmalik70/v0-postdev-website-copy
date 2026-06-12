"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"

const tiers = [
  {
    name: "Audit",
    price: "$0",
    period: "",
    description: "See what the operator would do first.",
    features: ["Full site and GEO audit", "Impact-ranked opportunity queue", "AI visibility readiness score", "1 site"],
    cta: "Run Free Growth Audit",
    featured: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    description: "Governed execution, on.",
    features: ["Everything in Audit", "Governed fixes with approval gates", "4 content actions/month", "Daily monitoring and action logs", "1 site", "Email reports"],
    cta: "Get early access",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Scale",
    price: "$99",
    period: "/mo",
    description: "Run the loop at scale.",
    features: ["Everything in Growth", "AI citation and prompt tracking", "12 content actions/month", "Competitor source-graph monitoring", "3 sites", "Priority support"],
    cta: "Get early access",
    featured: false,
  },
]

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mb-4">
              Operator pricing, far below agency overhead.
            </h2>
            <p className="text-neutral-600 text-base md:text-lg max-w-lg mx-auto">
              Agencies charge $2–10K per month, mostly for reports. The operator ships the work for a fraction of that.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
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
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-signal text-black text-[10px] font-semibold uppercase tracking-wider rounded-full">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-ink mb-1">{tier.name}</h3>
                  <p className="text-sm text-neutral-600">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-semibold text-ink">{tier.price}</span>
                  <span className="text-sm text-neutral-600">{tier.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-neutral-600">
                      <Check className="w-3.5 h-3.5 text-signal flex-shrink-0" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setIsModalOpen(true)}
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

          <p className="text-center text-xs text-neutral-600 mt-8 tracking-wide">
            14-day free trial on all paid plans · Cancel anytime · No contracts
          </p>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
