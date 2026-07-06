"use client"

import { X, Check } from "lucide-react"
import { Reveal } from "./gsap-fx"

const oldWorld = [
  "Buy tools, then stitch them together",
  "Pull reports and build spreadsheets",
  "Write briefs and assign the work",
  "Wait on developers and writers",
  "Check rankings weeks later",
  "Repeat the cycle every quarter",
]

const newWorld = [
  "Deploy the operator and connect your site",
  "Opportunities arrive ranked by impact",
  "Approve high-impact actions in one queue",
  "Fixes and content ship into your CMS or repo",
  "Every action is measured against outcomes",
  "The loop learns and improves each week",
]

export function ComparisonSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6 bg-surface/50 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-5 justify-center">The shift</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            Stop operating tools. Deploy an operator.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg">
            The old model sold tools to specialists. The operator model ships outcomes for teams.
          </p>
        </Reveal>

        <Reveal selector="[data-panel]" stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div data-panel className="rounded-2xl border border-line bg-card p-7 md:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-600 mb-7">The manual operating model</p>
            <ul className="space-y-4">
              {oldWorld.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                  <X className="w-4 h-4 text-coral/60 mt-0.5 shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-panel className="rounded-2xl border-2 border-ink bg-card p-7 md:p-9 relative">
            <span className="absolute -top-3 left-7 font-mono text-[10px] uppercase tracking-[0.14em] bg-ink text-warmwhite rounded-full px-3 py-1">
              With SERP Operator
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal mb-7 mt-1">The operating layer</p>
            <ul className="space-y-4">
              {newWorld.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink">
                  <Check className="w-4 h-4 text-signal mt-0.5 shrink-0" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
