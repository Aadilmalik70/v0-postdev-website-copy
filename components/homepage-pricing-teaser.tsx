"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Reveal } from "./gsap-fx"

const tiers = [
  {
    name: "Audit",
    price: "$0",
    period: "",
    description: "See what the operator would do first.",
    features: ["Full site and GEO audit", "Impact-ranked opportunity queue", "AI visibility readiness score", "1 site"],
    cta: "Run Free Growth Audit",
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    description: "Let the operator execute approved work.",
    features: ["Everything in Audit", "Governed fixes with approval gates", "Content briefs and publishing", "Daily monitoring and action logs"],
    cta: "Get early access",
    featured: true,
  },
  {
    name: "Scale",
    price: "$99",
    period: "/mo",
    description: "Run the loop across more pages and sites.",
    features: ["Everything in Growth", "AI citation and prompt tracking", "Competitor source-graph monitoring", "Multi-site operations"],
    cta: "Compare plans",
  },
]

export function HomepagePricingTeaser() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-5 justify-center">Pricing</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            Operator pricing, far below agency overhead.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg">
            Start with a free audit, then turn on governed execution when you have seen the queue.
          </p>
        </Reveal>

        <Reveal selector="[data-tier]" stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              data-tier
              className={`card-lift relative rounded-2xl bg-card p-7 flex flex-col ${
                tier.featured ? "border-2 border-ink" : "border border-line"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 font-mono text-[10px] uppercase tracking-[0.14em] bg-ink text-warmwhite rounded-full px-3 py-1">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-ink">{tier.name}</h3>
              <p className="mt-3 mb-1">
                <span className="font-mono text-4xl font-medium text-ink">{tier.price}</span>
                {tier.period && <span className="text-sm text-neutral-600">{tier.period}</span>}
              </p>
              <p className="text-sm text-neutral-600 mb-6">{tier.description}</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-signal mt-0.5 shrink-0" strokeWidth={2.25} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className={tier.featured ? "btn-ink justify-center h-11 text-sm" : "btn-quiet justify-center h-11 text-sm"}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </Reveal>

        <Reveal className="text-center mt-10 space-y-3">
          <p className="text-xs text-neutral-600">14-day free trial on paid plans | Cancel anytime | No contracts</p>
          <Link href="/pricing" className="link-underline text-sm text-ink font-medium">
            See full plan details on the pricing page &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
