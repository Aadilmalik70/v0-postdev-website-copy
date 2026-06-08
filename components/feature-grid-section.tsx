"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"

const capabilities = [
  "Google SEO + AI Search (GEO)",
  "Autonomous issue detection & fixing",
  "Content creation & publishing",
  "Internal linking optimization",
  "Schema markup (JSON-LD)",
  "Keyword gap analysis",
  "Core Web Vitals monitoring",
  "Competitor tracking",
  "Perplexity / ChatGPT citation tracking",
  "Daily ranking reports",
]

export function FeatureGridSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#020205] to-[#000000]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-start"
        >
          <div>
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">Full stack</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#ececec] tracking-tight mb-4">
              Everything an SEO agency does.
            </h2>
            <p className="text-[#888888] text-lg leading-relaxed mb-2">
              Automated by AI. For the price of a coffee per day.
            </p>
            <p className="text-[#666666] text-base">
              Both traditional Google SEO and next-gen AI search optimization (GEO) — in one agent.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 group"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                </div>
                <span className="text-sm text-[#cccccc] group-hover:text-[#ececec] transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
