"use client"

import { motion } from "motion/react"
import { Search, Wrench, FileText, BarChart3 } from "lucide-react"
import { WobbleCard } from "@/components/ui/wobble-card"

const features = [
  {
    icon: Search,
    title: "Crawl & Audit",
    description: "Deep-crawls every page. Finds broken links, missing meta, schema gaps, thin content, and 40+ other issues automatically.",
    color: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    icon: Wrench,
    title: "Fix Autonomously",
    description: "Pushes code fixes directly — meta tags, schema markup, internal links, canonical URLs. No tickets, no waiting.",
    color: "from-cyan-500/10 to-cyan-500/5",
  },
  {
    icon: FileText,
    title: "Create Content",
    description: "Writes and publishes SEO-optimized blog posts targeting keyword gaps. Structured for both Google and AI search engines.",
    color: "from-violet-500/10 to-violet-500/5",
  },
  {
    icon: BarChart3,
    title: "Monitor & Adapt",
    description: "Tracks keyword rankings, organic traffic, Core Web Vitals, and AI citations daily. Adjusts strategy based on data.",
    color: "from-amber-500/10 to-amber-500/5",
  },
]

export function ValuePropSection() {
  return (
    <section id="features" className="py-28 md:py-36 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">What it does</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            The full SEO loop. Automated.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-xl mx-auto">
            Other tools show you problems. This agent fixes them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WobbleCard containerClassName={`border border-[#1a1a1a] bg-gradient-to-br ${feature.color} bg-[#0a0a0a] min-h-[200px]`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#ececec] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#888888] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </WobbleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
