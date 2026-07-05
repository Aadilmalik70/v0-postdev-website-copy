import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildMarketingMetadata({
  title: "Trust and Governance | SERP Strategists",
  description:
    "Learn how SERP Strategists keeps autonomous SEO work governed with approval gates, logs, rollback, and clear data boundaries.",
  pathname: "/governance",
})

const principles = [
  {
    title: "Approval gates",
    body: "Low-risk updates can move quickly, but sensitive changes route through human review before they ship.",
  },
  {
    title: "Action logs",
    body: "Every recommended or shipped change should be reviewable so your team can see what changed and why.",
  },
  {
    title: "Rollback readiness",
    body: "If a fix is not the right fit after review, the change can be reversed instead of leaving the site stuck with it.",
  },
  {
    title: "Data boundaries",
    body: "The operator should work from site and performance data only, with clear limits on what it can see and execute.",
  },
]

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-32">
        <Link href="/" className="text-signal hover:text-signal text-sm mb-8 inline-block">
          ← Back to home
        </Link>

        <header className="mb-12">
          <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Trust and governance</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-ink mb-4">
            Governed autonomy for SEO and GEO execution.
          </h1>
          <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
            SERP Strategists is designed to reduce manual SEO busywork without turning your site into a black box.
            The operator should be able to observe, recommend, and execute work only within the controls your team approves.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 mb-12">
          {principles.map((item) => (
            <article key={item.title} className="border border-line rounded-2xl bg-card p-6">
              <h2 className="text-xl font-medium text-ink mb-2">{item.title}</h2>
              <p className="text-neutral-600 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 border border-line rounded-2xl bg-card p-8">
          <h2 className="text-2xl font-semibold text-ink mb-4">What governed execution looks like</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-[0.14em] text-neutral-400 mb-2">Safe by default</h3>
              <ul className="space-y-2 text-neutral-600 leading-relaxed">
                <li>• Fixes should be ranked by impact, confidence, and effort.</li>
                <li>• High-risk changes should wait for approval.</li>
                <li>• Reversible changes should be reversible in practice, not just in theory.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-mono uppercase tracking-[0.14em] text-neutral-400 mb-2">Transparent by default</h3>
              <ul className="space-y-2 text-neutral-600 leading-relaxed">
                <li>• Logs should explain what changed and why.</li>
                <li>• The team should know which page or template was affected.</li>
                <li>• Outcomes should be measured after the action ships.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link href="/pricing" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">See pricing</h2>
            <p className="text-neutral-600 leading-relaxed">
              Compare the audit, growth, and scale plans that include governed execution and AI citation tracking.
            </p>
          </Link>
          <Link href="/faq" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Read the FAQ</h2>
            <p className="text-neutral-600 leading-relaxed">
              Get straight answers about autonomy, safety, GEO, and how the operator loop works.
            </p>
          </Link>
          <Link href="/blog/ai-seo-agent-vs-agency" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Compare with agencies</h2>
            <p className="text-neutral-600 leading-relaxed">
              See where AI execution wins on speed, coverage, and cost, and where human judgment still matters.
            </p>
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  )
}
