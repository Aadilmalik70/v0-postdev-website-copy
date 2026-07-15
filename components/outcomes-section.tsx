"use client"

import { Reveal } from "./gsap-fx"

const evidenceCards = [
  {
    title: "Evidence before execution",
    text: "Each proposed action shows the issue, affected URL, reasoning, expected impact, confidence, and implementation plan.",
  },
  {
    title: "Approval where risk matters",
    text: "Low-risk work can follow policy. Sensitive content, redirects, and structural changes wait for human review.",
  },
  {
    title: "A complete action log",
    text: "Every approved, rejected, shipped, failed, or rolled-back action remains visible with its status and history.",
  },
  {
    title: "Outcome measurement",
    text: "Shipped actions are evaluated against rankings, clicks, impressions, crawl health, and AI citation coverage over time.",
  },
]

export function OutcomesSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-5">Proof model</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            Inspect the work, not a marketing promise.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            SERP Strategists is early access. Instead of publishing anonymous
            testimonials or outcome claims without attributable evidence, the
            product is designed to make every recommendation, approval, change, and
            measured result inspectable.
          </p>
        </Reveal>

        <Reveal
          selector="[data-principle]"
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        >
          <div data-principle className="rounded-2xl border border-line bg-card p-8">
            <p className="font-mono text-sm uppercase tracking-[0.12em] text-signal mb-3">
              Before
            </p>
            <p className="text-lg font-medium text-ink">Evidence and proposed diff</p>
            <p className="text-sm text-neutral-500 mt-2">See what would change and why.</p>
          </div>
          <div data-principle className="rounded-2xl border border-line bg-card p-8">
            <p className="font-mono text-sm uppercase tracking-[0.12em] text-signal mb-3">
              During
            </p>
            <p className="text-lg font-medium text-ink">Approval and execution log</p>
            <p className="text-sm text-neutral-500 mt-2">Keep control over sensitive work.</p>
          </div>
          <div data-principle className="rounded-2xl border border-line bg-card p-8">
            <p className="font-mono text-sm uppercase tracking-[0.12em] text-signal mb-3">
              After
            </p>
            <p className="text-lg font-medium text-ink">Measured outcome window</p>
            <p className="text-sm text-neutral-500 mt-2">Judge the action against real search data.</p>
          </div>
        </Reveal>

        <Reveal
          selector="[data-evidence]"
          stagger={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {evidenceCards.map((card) => (
            <article key={card.title} data-evidence className="card-lift rounded-2xl border border-line bg-card p-7">
              <h3 className="text-lg font-semibold text-ink mb-3">{card.title}</h3>
              <p className="text-[15px] text-neutral-600 leading-relaxed">{card.text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
