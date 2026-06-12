"use client"

import { Reveal, Counter } from "./gsap-fx"

const painPoints = [
  { value: 47, suffix: "", label: "Issues found, ranked, reported", subtext: "Then left waiting in a backlog no one owns" },
  { value: 15, suffix: "hrs", label: "Weekly manual search operations", subtext: "Research, briefs, fixes, reporting cycles" },
  { value: 60, suffix: "%", label: "Searches end without a click", subtext: "AI answers decide who gets seen" },
  { value: 5, prefix: "$", suffix: "K+", label: "Monthly agency retainer", subtext: "Mostly spent producing more reports" },
]

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-5">The problem</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            Visibility work that stops at a dashboard.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Reports do not grow traffic. Rankings do not improve themselves. AI citations are not won
            by watching graphs. Most teams have enough search data — what they are missing is the
            capacity to turn it into shipped work.
          </p>
        </Reveal>

        <Reveal selector="[data-card]" stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {painPoints.map((point) => (
            <div key={point.label} data-card className="card-lift rounded-2xl border border-line bg-card p-6">
              <span className="font-mono text-4xl font-medium text-ink block mb-3">
                <Counter to={point.value} prefix={point.prefix} suffix={point.suffix} />
              </span>
              <p className="text-sm font-medium text-ink mb-1">{point.label}</p>
              <p className="text-xs text-neutral-400 leading-relaxed">{point.subtext}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
