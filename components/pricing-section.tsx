"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "See what's broken.",
    features: ["Complete SEO audit", "Issue prioritization", "GEO readiness score", "1 site"],
    cta: "Start free audit",
    featured: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    description: "Full automation.",
    features: ["Everything in Free", "Autonomous fixes", "4 blog posts/month", "Ranking monitoring", "1 site", "Email reports"],
    cta: "Get early access",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    description: "Maximum growth.",
    features: ["Everything in Growth", "GEO optimization", "12 blog posts/month", "Competitor tracking", "3 sites", "Priority support"],
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
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
              Less than your coffee habit.
            </h2>
            <p className="text-[#8a8a8a] text-base md:text-lg max-w-lg mx-auto">
              SEO agencies charge $2-10K/month. Same execution, 95% less cost.
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
                    ? "bg-[#0a0a0a] border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                    : "bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a]"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#ececec] mb-1">{tier.name}</h3>
                  <p className="text-sm text-[#666666]">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#ececec]">{tier.price}</span>
                  <span className="text-sm text-[#666666]">{tier.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-[#8a8a8a]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full rounded-full py-5 text-sm font-medium ${
                    tier.featured
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                      : "bg-[#141414] hover:bg-[#1a1a1a] text-[#ececec] border border-[#222222]"
                  }`}
                >
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-[#555555] mt-8 tracking-wide">
            14-day free trial on all paid plans · Cancel anytime · No contracts
          </p>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
