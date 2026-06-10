"use client"

import { motion } from "motion/react"

const painPoints = [
  { stat: "$5K+", text: "Average monthly SEO agency cost", subtext: "For work an AI can do better" },
  { stat: "15hrs", text: "Weekly manual SEO work", subtext: "Keyword research, fixes, content, reporting" },
  { stat: "60%", text: "Searches end without a click", subtext: "AI answers steal your traffic" },
  { stat: "0", text: "Hours most founders have for SEO", subtext: "So it just... doesn't get done" },
]

export function ProblemSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">The problem</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            SEO is broken for small teams.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-2xl">
            Agencies are expensive, the manual workload never ends, and AI search is quietly stealing clicks before your pages get a chance. The result is simple: the work gets delayed, or it does not get done at all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 hover:border-[#2a2a2a] transition-colors duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="text-3xl md:text-4xl font-bold text-[#ececec] block mb-2">{point.stat}</span>
                <p className="text-sm font-medium text-[#cccccc] mb-1">{point.text}</p>
                <p className="text-xs text-[#666666]">{point.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
