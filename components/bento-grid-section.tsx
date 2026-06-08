"use client"

import { motion } from "motion/react"
import { Search, Wrench, FileText, BarChart3, Link2, Shield } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Deep Site Audit",
    description: "Crawls every page. Finds 40+ issue types including broken links, missing meta, thin content, and schema gaps.",
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    icon: Shield,
    title: "GEO Optimization",
    description: "Structures content for AI search citation. Schema, entities, FAQ markup — automatically.",
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-violet-500/10 to-violet-500/5",
  },
  {
    icon: Wrench,
    title: "Auto-Fix Engine",
    description: "Pushes code fixes directly. Meta tags, canonicals, internal links, schema — no human needed.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-cyan-500/10 to-cyan-500/5",
  },
  {
    icon: FileText,
    title: "Content Engine",
    description: "Writes & publishes blog posts targeting keyword gaps. SEO-optimized for both Google and AI search.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-amber-500/10 to-amber-500/5",
  },
  {
    icon: Link2,
    title: "Internal Linking",
    description: "Builds topic clusters automatically. Finds orphan pages and connects them.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-rose-500/10 to-rose-500/5",
  },
  {
    icon: BarChart3,
    title: "Rank Tracking",
    description: "Daily keyword monitoring. Traffic trends. AI citation tracking across ChatGPT, Perplexity, Gemini.",
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-emerald-500/10 to-cyan-500/5",
  },
]

export function BentoGridSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">Capabilities</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            One agent. Full-stack SEO.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-lg mx-auto">
            Everything an SEO team does — automated, 24/7, at a fraction of the cost.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`group relative rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 hover:border-[#2a2a2a] transition-all duration-300 ${feature.className}`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center mb-4 group-hover:border-emerald-500/30 transition-colors">
                  <feature.icon className="w-4.5 h-4.5 text-[#888888] group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-[#ececec] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#888888] leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
