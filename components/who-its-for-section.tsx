"use client"

import { Rocket, TrendingUp, Briefcase, Building2 } from "lucide-react"
import { Reveal } from "./gsap-fx"

const personas = [
  { icon: Rocket, title: "Founders", trait: "who need a dependable organic channel without hiring an SEO specialist" },
  { icon: TrendingUp, title: "Startup growth teams", trait: "who want compounding search leverage without adding headcount" },
  { icon: Briefcase, title: "Agencies", trait: "who want to ship more client work per operator, with logs to prove it" },
  { icon: Building2, title: "Marketing leads", trait: "who need AI search visibility before competitors own the answers" },
]

export function WhoItsForSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-5">Who it&apos;s for</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12]">
            Built for teams without enough specialist capacity.
          </h2>
        </Reveal>

        <Reveal selector="[data-persona]" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personas.map((persona) => (
            <div key={persona.title} data-persona className="card-lift group flex items-start gap-4 p-6 rounded-2xl border border-line bg-card">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center transition-colors duration-300 group-hover:bg-signal/8">
                <persona.icon className="w-5 h-5 text-neutral-600 group-hover:text-signal transition-colors duration-300" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink mb-1">{persona.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{persona.trait}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <figure className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-neutral-400 mb-3">If your team has ever said:</p>
            <blockquote className="font-display text-2xl md:text-[28px] font-semibold text-ink leading-snug">
              &ldquo;We know what&apos;s wrong — the work just <span className="mark-signal">never ships</span>.&rdquo;
            </blockquote>
            <figcaption className="text-sm text-neutral-600 mt-4">This is the operating layer for that gap.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
