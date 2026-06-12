"use client"

import { Search, Compass, Zap, FileText, Network, ShieldCheck } from "lucide-react"
import { Reveal } from "./gsap-fx"

const modules = [
  { icon: Search, title: "SERP Intelligence", description: "Performance, rankings, AI visibility, and competitor signals across Google, ChatGPT, Perplexity, and Gemini — one source graph.", className: "md:col-span-2", accent: "text-systeal", chip: "bg-systeal/8" },
  { icon: ShieldCheck, title: "SERP Control", description: "Governed autonomy: permissions, approval gates, audit logs, and rollback. Safe fixes ship automatically, sensitive changes route to you.", className: "md:row-span-2", accent: "text-trust", chip: "bg-trust/8" },
  { icon: Compass, title: "SERP Planner", description: "Every opportunity scored by impact, confidence, and effort — so the queue starts with what moves traffic.", className: "", accent: "text-opviolet", chip: "bg-opviolet/8" },
  { icon: Zap, title: "SERP Executor", description: "Ships technical fixes, schema, canonicals, metadata, and internal links into your CMS or codebase.", className: "", accent: "text-signal", chip: "bg-signal/8" },
  { icon: FileText, title: "SERP Content", description: "Briefs, refreshes, and publishing workflows governed by your brand voice — built for usefulness, not volume.", className: "", accent: "text-opportunity", chip: "bg-opportunity/8" },
  { icon: Network, title: "SERP Citations", description: "Tracks how AI systems cite your brand, finds source gaps, and recommends the work that wins answer coverage.", className: "md:col-span-2", accent: "text-coral", chip: "bg-coral/8" },
]

export function BentoGridSection() {
  return (
    <section id="modules" className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-5">Modules</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            One operator. Six modules. One loop.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Each module handles one job in the loop — together they replace the stitched-up stack of
            tools, spreadsheets, and reporting cycles.
          </p>
        </Reveal>

        <Reveal selector="[data-mod]" stagger={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-fr">
          {modules.map((mod) => (
            <div key={mod.title} data-mod className={`card-lift group rounded-2xl border border-line bg-card p-7 ${mod.className}`}>
              <div className={`w-11 h-11 rounded-xl ${mod.chip} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105`}>
                <mod.icon className={`w-5 h-5 ${mod.accent}`} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink mb-2">{mod.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{mod.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
