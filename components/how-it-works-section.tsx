"use client"

import { motion } from "motion/react"

const steps = [
  { number: "01", title: "Connect", description: "Add your domain and let the agent crawl the full site in minutes.", highlight: "2-minute setup" },
  { number: "02", title: "Audit", description: "Get every SEO and GEO issue ranked by traffic impact, not by busywork.", highlight: "40+ issue types" },
  { number: "03", title: "Fix", description: "Let the agent push approved fixes directly into your codebase or CMS.", highlight: "Approved workflows" },
  { number: "04", title: "Create", description: "Generate and publish content that targets the exact keyword gaps you are missing.", highlight: "4-12 posts/month" },
  { number: "05", title: "Monitor", description: "Track rankings, traffic, and AI citations daily, then adjust automatically when something moves.", highlight: "Daily updates" },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 md:py-36 px-6 relative">
      {/* Subtle side glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Five steps. Zero manual work.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-lg">
            Set it up once. The agent handles everything after that.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 group"
              >
                {/* Dot */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-[#222222] group-hover:border-emerald-500/50 flex items-center justify-center transition-colors duration-300 z-10">
                  <span className="text-xs font-mono text-[#666666] group-hover:text-emerald-400 transition-colors">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-xl font-semibold text-[#ececec]">{step.title}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {step.highlight}
                    </span>
                  </div>
                  <p className="text-[#888888] text-base leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
