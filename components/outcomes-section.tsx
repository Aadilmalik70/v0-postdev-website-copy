"use client"

import { Reveal, Counter } from "./gsap-fx"

const testimonials = [
  { quote: "Our organic traffic tripled in 2 months. The operator surfaced issues we'd missed for years — and shipped the fixes.", name: "Sarah K.", title: "Founder, SaaS Startup" },
  { quote: "We replaced our $4K/month agency. Now I approve a queue once a week instead of chasing reports.", name: "Mike T.", title: "E-commerce Owner" },
  { quote: "The citation work got us referenced in Perplexity within weeks. We can see exactly which actions did it.", name: "Alex R.", title: "Content Lead" },
  { quote: "Setup took minutes. The first approved fixes shipped within the hour — every one logged.", name: "James L.", title: "Indie Hacker" },
]

export function OutcomesSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-5">Outcomes</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            Work shipped, not rankings watched.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Every shipped fix makes the next one easier. Every measured outcome sharpens the next
            decision. The system compounds week after week instead of drifting in place.
          </p>
        </Reveal>

        <Reveal selector="[data-metric]" stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div data-metric className="rounded-2xl border border-line bg-card p-8">
            <p className="font-mono text-5xl font-medium text-ink mb-3">
              <Counter to={3} />–<Counter to={5} />x
            </p>
            <p className="text-sm font-medium text-ink">Organic traffic growth</p>
            <p className="text-xs text-neutral-400 mt-1">early customer cohort, within 90 days</p>
          </div>
          <div data-metric className="rounded-2xl border border-line bg-card p-8">
            <p className="font-mono text-5xl font-medium text-ink mb-3">
              <Counter to={38} />
              <span className="text-2xl text-neutral-400">/wk</span>
            </p>
            <p className="text-sm font-medium text-ink">Actions shipped per site</p>
            <p className="text-xs text-neutral-400 mt-1">logged, reviewable, reversible</p>
          </div>
          <div data-metric className="rounded-2xl border border-line bg-card p-8">
            <p className="font-mono text-5xl font-medium text-ink mb-3">
              &lt;$<Counter to={2} />
              <span className="text-2xl text-neutral-400">/day</span>
            </p>
            <p className="text-sm font-medium text-ink">Operating cost</p>
            <p className="text-xs text-neutral-400 mt-1">vs $200/day for an agency retainer</p>
          </div>
        </Reveal>

        <Reveal selector="[data-quote]" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <figure key={t.name} data-quote className="card-lift rounded-2xl border border-line bg-card p-7">
              <blockquote className="text-[15px] text-ink leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center text-xs font-medium text-neutral-600">
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">{t.name}</span>
                  <span className="block text-xs text-neutral-400">{t.title}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
