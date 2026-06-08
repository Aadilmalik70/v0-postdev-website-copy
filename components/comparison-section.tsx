"use client"

import { motion } from "motion/react"
import { X, Check } from "lucide-react"

const beforeItems = [
  "Spending 15+ hours/week on SEO manually",
  "Paying $5K/month for an agency that sends reports",
  "Issues pile up silently — you don't even know",
  "Blog hasn't been updated in 3 months",
  "No idea how AI search engines see your content",
  "Rankings slowly declining and you're not sure why",
]

const afterItems = [
  "Agent works 24/7 — zero manual hours needed",
  "Same execution for $49/month instead of $5K",
  "Every issue detected and fixed within hours",
  "4-12 fresh posts published monthly, automatically",
  "Optimized for ChatGPT, Perplexity, and Gemini citations",
  "Rankings tracked daily with automatic adjustments",
]

export function ComparisonSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">The difference</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Before vs. After
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg">
            What changes when an AI agent handles your SEO.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-red-400" strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Without SERP Strategist</h3>
            </div>
            <ul className="space-y-3.5">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#8a8a8a]">
                  <X className="w-4 h-4 text-red-400/60 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">With SERP Strategist</h3>
            </div>
            <ul className="space-y-3.5">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#c8c8c8]">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
