"use client"

import Link from "next/link"
import { motion } from "motion/react"

const tiers = [
  {
    name: "Free",
    description: "See what is broken.",
    features: ["Complete SEO audit", "Issue prioritization", "GEO readiness score", "1 site"],
    cta: "Start free audit",
  },
  {
    name: "Growth",
    description: "Let the agent fix and publish.",
    features: ["Everything in Free", "Autonomous fixes", "4 blog posts per month", "Ranking monitoring"],
    cta: "Get early access",
    featured: true,
  },
  {
    name: "Pro",
    description: "Scale the system across more pages and more sites.",
    features: ["Everything in Growth", "GEO optimization", "12 blog posts per month", "Competitor tracking"],
    cta: "Compare plans",
  },
]

export function HomepagePricingTeaser() {
  return (
    <section id="pricing" className="py-28 md:py-36 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Simple pricing that stays below agency overhead.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-2xl mx-auto">
            Start with the free audit, then move into autonomous fixes and publishing when you are ready. Keep the full comparison on the dedicated pricing page.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`rounded-2xl border p-6 bg-[#0a0a0a] ${tier.featured ? "border-emerald-500/30" : "border-[#1a1a1a]"}`}
            >
              <h3 className="text-lg font-semibold text-[#ececec] mb-2">{tier.name}</h3>
              <p className="text-sm text-[#888888] mb-4">{tier.description}</p>
              <ul className="space-y-2 mb-5">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-sm text-[#cccccc]">{feature}</li>
                ))}
              </ul>
              <p className="text-xs font-mono text-emerald-400">{tier.cta}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 space-y-3">
          <p className="text-xs text-[#555555]">14-day free trial on all paid plans | Cancel anytime | No contracts</p>
          <Link href="/pricing" className="text-sm text-emerald-400 hover:text-emerald-300">
            See full plan details on the pricing page →
          </Link>
        </div>
      </div>
    </section>
  )
}