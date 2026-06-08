"use client"

import { motion } from "motion/react"
import { Rocket, Code, Store, Globe } from "lucide-react"

const personas = [
  { icon: Rocket, title: "Founders", trait: "who want organic growth without hiring an SEO team" },
  { icon: Code, title: "Developers", trait: "who built a great product but get zero search traffic" },
  { icon: Store, title: "Small businesses", trait: "competing against brands with 100x their budget" },
  { icon: Globe, title: "Content creators", trait: "who want to be found on Google AND AI search" },
]

export function WhoItsForSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">Who it&apos;s for</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight">
            Built for builders.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex items-start gap-4 p-6 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50 hover:border-[#2a2a2a] hover:bg-[#0a0a0a] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
                <persona.icon className="w-5 h-5 text-[#888888] group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#ececec] mb-1">{persona.title}</h3>
                <p className="text-sm text-[#888888] leading-relaxed">{persona.trait}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center p-8 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]/50"
        >
          <p className="text-[#888888] text-base mb-2">If you ever thought:</p>
          <p className="text-xl md:text-2xl font-medium text-emerald-400 italic">&quot;I wish SEO just handled itself.&quot;</p>
          <p className="text-[#ececec] text-base mt-2">Now it does.</p>
        </motion.div>
      </div>
    </section>
  )
}
