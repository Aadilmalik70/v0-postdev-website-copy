"use client"

import { Reveal } from "./gsap-fx"

const queueItems = [
  { action: "Shipped", detail: "Canonical mismatch fixed on /pricing", meta: "Auto-approved | Logged | Rollback available", dot: "bg-signal-bright", text: "text-signal-bright" },
  { action: "Awaiting review", detail: "Refresh /integrations page for AI answer coverage", meta: "Impact 8.4 | Confidence high | Effort low", dot: "bg-opportunity-bright", text: "text-opportunity-bright" },
  { action: "Planned", detail: "Build internal link cluster across 14 orphan pages", meta: "Impact 7.1 | Plan ready for approval", dot: "bg-opviolet-bright", text: "text-opviolet-bright" },
  { action: "Observed", detail: "Competitor cited above you in 3 Perplexity prompts", meta: "Source gap identified | Action queued", dot: "bg-coral-bright", text: "text-coral-bright" },
]

const proofStages = [
  {
    value: "Evidence",
    label: "Before execution",
    detail: "Issue, affected URL, reasoning, expected impact, and proposed change",
    color: "text-systeal-bright",
  },
  {
    value: "Approval",
    label: "Control point",
    detail: "Policy-based automation with human review where risk matters",
    color: "text-signal-bright",
  },
  {
    value: "Measure",
    label: "After execution",
    detail: "Outcome window connected to the exact action that shipped",
    color: "text-warmwhite",
  },
]

export function ProductDemoSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Dark console panel inset on the warm page */}
        <Reveal>
          <div className="rounded-3xl bg-graphite-950 border border-graphite-line px-6 py-12 md:px-14 md:py-16 overflow-hidden relative">
            <div className="max-w-2xl mb-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-bright mb-5">The Operator Console</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-warmwhite leading-[1.12] mb-5">
                See what changed, why, and what happened next.
              </h2>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                Not another dashboard - an action queue. Every action is scored, approved, logged,
                reviewable, and measurable.
              </p>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 mb-5">
              Illustrative product workflow | Sample actions and statuses, not customer performance data
            </p>

            <Reveal selector="[data-stat]" stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              {proofStages.map((stage) => (
                <div key={stage.value} data-stat className="p-5 rounded-xl bg-graphite-900 border border-graphite-line">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-300 mb-2">{stage.label}</p>
                  <p className={`font-mono text-xl font-medium ${stage.color}`}>{stage.value}</p>
                  <p className="text-[10px] text-neutral-400 mt-1.5 leading-relaxed">{stage.detail}</p>
                </div>
              ))}
            </Reveal>

            <div className="rounded-xl bg-graphite-900 border border-graphite-line overflow-hidden">
              <div className="relative px-5 py-3.5 border-b border-graphite-line flex items-center justify-between overflow-hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-300">Action queue</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full bg-signal-bright/10 text-signal-bright border border-signal-bright/20">
                  <span className="w-1 h-1 rounded-full bg-signal-bright" />
                  Example workflow
                </span>
                <span className="operator-scanline absolute bottom-0 left-0 h-px w-1/5 bg-signal-bright/40" />
              </div>
              <Reveal selector="[data-row]" stagger={0.12} y={0}>
                {queueItems.map((item) => (
                  <div key={item.action} data-row className="px-5 py-4 border-b border-graphite-800 last:border-0 flex items-start gap-3 hover:bg-graphite-800/40 transition-colors">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className={`font-mono text-[10px] uppercase tracking-wide ${item.text}`}>{item.action}</span>
                        <span className="text-[13px] text-neutral-200">{item.detail}</span>
                      </div>
                      <p className="font-mono text-[10px] text-neutral-400 mt-1">{item.meta}</p>
                    </div>
                    <span className="text-[10px] text-neutral-400 whitespace-nowrap">Example</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
