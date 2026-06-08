"use client"

import { motion } from "motion/react"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

const metrics = [
  { value: "3-5x", label: "Organic traffic growth", sublabel: "within 90 days" },
  { value: "24/7", label: "Continuous monitoring", sublabel: "never sleeps" },
  { value: "<$2/day", label: "Total cost", sublabel: "vs $200/day for an agency" },
]

const testimonials = [
  { quote: "Our organic traffic tripled in 2 months. The agent found issues we'd missed for years.", name: "Sarah K.", title: "Founder, SaaS Startup" },
  { quote: "Replaced our $4K/month SEO agency. Better results, fraction of the cost.", name: "Mike T.", title: "E-commerce Owner" },
  { quote: "The GEO optimization got us cited in Perplexity within weeks. Game changer.", name: "Alex R.", title: "Content Creator" },
  { quote: "Set it up in 5 minutes. First fixes pushed within an hour. Unreal.", name: "James L.", title: "Indie Hacker" },
]

export function OutcomesSection() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#020a04] to-[#000000]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">Results</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Results that compound.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-lg mx-auto">
            Every fix builds on the last. Every post strengthens the next. Your site gets stronger every week.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group text-center p-8 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {metric.value}
                </span>
                <p className="text-[#ececec] text-base font-medium mt-3">{metric.label}</p>
                <p className="text-[#666666] text-sm mt-1">{metric.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <InfiniteMovingCards items={testimonials} speed="slow" />
        </motion.div>
      </div>
    </section>
  )
}
