"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Reveal } from "./gsap-fx"
import { pricingStatus, pricingTiers } from "@/lib/pricing"

export function HomepagePricingTeaser() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-5 justify-center">{pricingStatus.label}</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            Start free, then scope governed execution.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg">
            The audit is available now. Paid prices are early-access targets and do not begin billing when you join the waitlist.
          </p>
        </Reveal>

        <Reveal selector="[data-tier]" stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              data-tier
              className={`card-lift relative rounded-2xl bg-card p-7 flex flex-col ${
                tier.featured ? "border-2 border-ink" : "border border-line"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 font-mono text-[10px] uppercase tracking-[0.14em] bg-ink text-warmwhite rounded-full px-3 py-1">
                  Early-access default
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-ink">{tier.name}</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-signal mt-2">
                {tier.availability}
              </p>
              <p className="mt-3 mb-1">
                <span className="font-mono text-4xl font-medium text-ink">{tier.price}</span>
                {tier.period && <span className="text-sm text-neutral-600">{tier.period}</span>}
              </p>
              {tier.name !== "Audit" && (
                <p className="text-[11px] text-neutral-500 mb-2">Target monthly price</p>
              )}
              <p className="text-sm text-neutral-600 mb-6">{tier.description}</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {tier.teaserFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-signal mt-0.5 shrink-0" strokeWidth={2.25} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                data-analytics-placement="homepage_pricing_card"
                data-analytics-plan-name={tier.name}
                className={tier.featured ? "btn-ink justify-center h-11 text-sm" : "btn-quiet justify-center h-11 text-sm"}
              >
                {tier.name === "Audit" ? "Run free audit" : "View early-access details"}
              </Link>
            </div>
          ))}
        </Reveal>

        <Reveal className="text-center mt-10 space-y-3">
          <p className="text-xs text-neutral-600">No paid-plan trial, annual discount, or automatic overage pricing is currently published.</p>
          <Link
            href="/pricing"
            data-analytics-placement="homepage_pricing_footer"
            data-analytics-plan-name="all_plans"
            className="link-underline text-sm text-ink font-medium"
          >
            See availability, limits, and billing notes &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
