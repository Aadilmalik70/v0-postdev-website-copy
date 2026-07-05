import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildMarketingMetadata({
  title: "Execution Demo | SERP Strategists",
  description:
    "Walk through a sample SERP Strategists queue to see how observe, prioritize, plan, execute, and measure works in practice.",
  pathname: "/demo",
})

const steps = [
  {
    name: "Observe",
    body: "The operator looks for page-level demand, ranking movement, competitor changes, and AI citation signals.",
  },
  {
    name: "Prioritize",
    body: "Issues are ranked by likely impact, confidence in the finding, and implementation effort.",
  },
  {
    name: "Plan",
    body: "Each action gets a reason, a target page, and an expected outcome before it is sent for approval.",
  },
  {
    name: "Execute",
    body: "Approved changes move into the CMS or codebase with logs and rollback in place.",
  },
  {
    name: "Measure",
    body: "The output is checked against rankings, clicks, and citation coverage so the loop can improve.",
  },
]

const sampleQueue = [
  {
    status: "Shipped",
    task: "Fix a canonical mismatch on the pricing page",
    note: "Low risk, logged, and reversible.",
  },
  {
    status: "Review",
    task: "Refresh the integrations page for AI answer coverage",
    note: "High impact, low effort, ready for approval.",
  },
  {
    status: "Planned",
    task: "Build an internal link cluster for orphan pages",
    note: "Queue ready for the next execution window.",
  },
]

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-32">
        <Link href="/" className="text-signal hover:text-signal text-sm mb-8 inline-block">
          Back to home
        </Link>

        <header className="mb-12 max-w-3xl">
          <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Execution demo</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-ink mb-4">
            See how the operator turns analysis into shipped work.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed">
            This is an illustrative demo, not a customer case study. It shows how a queue moves
            from observation to approval to shipped changes without turning the site into a manual
            spreadsheet exercise.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-2 mb-12">
          <article className="border border-line rounded-2xl bg-card p-7">
            <h2 className="text-2xl font-semibold text-ink mb-4">The loop</h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.name} className="flex gap-4">
                  <span className="font-mono text-xs text-signal mt-1">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-medium text-ink mb-1">{step.name}</h3>
                    <p className="text-neutral-600 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="border border-line rounded-2xl bg-card p-7">
            <h2 className="text-2xl font-semibold text-ink mb-4">Sample queue</h2>
            <div className="space-y-4">
              {sampleQueue.map((item) => (
                <div key={item.task} className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-signal">{item.status}</span>
                    <span className="text-xs text-neutral-500">Illustrative only</span>
                  </div>
                  <h3 className="text-base font-medium text-ink mb-1">{item.task}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link href="/integrations" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Integrations</h2>
            <p className="text-neutral-600 leading-relaxed">
              See the systems the operator is designed to work with.
            </p>
          </Link>
          <Link href="/governance" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Governance</h2>
            <p className="text-neutral-600 leading-relaxed">
              Review the approval, logging, and rollback model before you turn on execution.
            </p>
          </Link>
          <Link href="/pricing" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Pricing</h2>
            <p className="text-neutral-600 leading-relaxed">
              Compare the audit, growth, and scale plans that support execution.
            </p>
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  )
}
