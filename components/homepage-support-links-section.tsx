"use client"

import Link from "next/link"
import { ArrowRight, BookOpenText, ShieldCheck, Workflow, PlayCircle } from "lucide-react"
import { Reveal } from "./gsap-fx"

const supportLinks = [
  {
    href: "/integrations",
    icon: Workflow,
    title: "Setup and integrations",
    body: "See where the operator fits into your CMS, repository, analytics, and review workflow.",
  },
  {
    href: "/demo",
    icon: PlayCircle,
    title: "Execution demo",
    body: "Walk through a sample queue, the approval step, and the before and after execution loop.",
  },
  {
    href: "/governance",
    icon: ShieldCheck,
    title: "Trust and governance",
    body: "Review approvals, logs, rollback, and data boundaries that keep the operator controlled.",
  },
  {
    href: "/blog/top-seo-analysis-tools-2025-best-seo-ai-tool",
    icon: BookOpenText,
    title: "AI SEO tools comparison",
    body: "Compare Ahrefs, Semrush, Surfer SEO, and autonomous agents to choose the best SEO stack for 2026.",
  },
]

export function HomepageSupportLinksSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-5">Before you decide</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            See how the operator works before you commit.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Review setup, execution, and controls so you can judge fit quickly and understand what
            happens after the first audit.
          </p>
        </Reveal>

        <Reveal selector="[data-support]" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              data-support
              className="card-lift group rounded-2xl border border-line bg-card p-6 md:p-7 transition-colors hover:border-signal/30 hover:bg-surface"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center transition-colors duration-300 group-hover:bg-signal/8">
                  <item.icon className="w-5 h-5 text-neutral-600 group-hover:text-signal transition-colors duration-300" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{item.body}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-ink">
                    Open page
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
