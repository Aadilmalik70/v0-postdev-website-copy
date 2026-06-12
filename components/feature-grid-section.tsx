"use client"

import { Check } from "lucide-react"
import { Reveal } from "./gsap-fx"

const capabilities = [
  ["Audit Site", "every page, 40+ issue types"],
  ["Score Opportunity", "impact × confidence ÷ effort"],
  ["Approve Fix", "gates for sensitive changes"],
  ["Ship Schema", "entities, FAQ, JSON-LD"],
  ["Refresh Page", "content updates that hold rankings"],
  ["Build Cluster", "internal links and orphan rescue"],
  ["Track Citation", "ChatGPT, Perplexity, Gemini coverage"],
  ["Monitor Prompt", "how AI answers describe your category"],
  ["Compare Competitors", "movement, content, source graphs"],
  ["Roll Back Action", "every change is reversible"],
]

export function FeatureGridSection() {
  return (
    <section id="features" className="py-24 md:py-32 px-5 md:px-6 bg-surface/50 border-y border-line">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <Reveal className="md:sticky md:top-28">
          <p className="eyebrow mb-5">What it operates</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            The full search workflow, run as one loop.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-3">
            Classic Google SEO and AI-era visibility in one operator — every capability named for the
            job it does, every action logged and reversible.
          </p>
          <p className="text-neutral-400 text-sm">
            Connect your site once. Approve the work that matters. Watch the loop compound.
          </p>
        </Reveal>

        <Reveal selector="[data-cap]" stagger={0.05} y={14} className="divide-y divide-line border-y border-line">
          {capabilities.map(([verb, detail]) => (
            <div key={verb} className="group flex items-center gap-4 py-4" data-cap>
              <span className="w-6 h-6 rounded-full bg-signal/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Check className="w-3.5 h-3.5 text-signal" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-medium text-ink whitespace-nowrap">{verb}</span>
              <span className="hidden sm:block flex-1 border-t border-dashed border-line" />
              <span className="font-mono text-[11px] text-neutral-400 text-right">{detail}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
