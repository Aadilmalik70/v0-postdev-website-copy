import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata } from "@/lib/site-seo"
import { combineSchemas, getBreadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildMarketingMetadata({
  title: "Integrations and Developer Docs | SERP Strategists",
  description:
    "See how SERP Strategists fits into your CMS, repository, analytics, and review workflow without turning the site into a black box.",
  pathname: "/integrations",
})

const touchpoints = [
  {
    title: "CMS or repository",
    body: "Approved changes should ship into the place your team already owns, whether that is a CMS template, a content workflow, or a codebase.",
  },
  {
    title: "Search Console and analytics",
    body: "Query demand, impressions, and traffic data should inform prioritization and confirm whether the shipped work actually moved the page.",
  },
  {
    title: "Crawl and audit exports",
    body: "Technical evidence should stay easy to review so the team can trace why a page was flagged and what changed after the fix.",
  },
  {
    title: "Review and approval channels",
    body: "Slack, email, or a task queue can carry the approvals, questions, and handoffs that keep governed execution moving.",
  },
]

const principles = [
  "Read access first. The operator should understand the site before it changes anything.",
  "Approval gates for sensitive changes. High-risk updates wait for review.",
  "Logs for every action. The team should know what changed and why.",
  "Rollback available. Reversibility matters as much as execution speed.",
]

export default function IntegrationsPage() {
  const breadcrumbJsonLd = combineSchemas(
    getBreadcrumbSchema([
      { name: "Home", url: "https://serpstrategists.com" },
      { name: "Integrations", url: "https://serpstrategists.com/integrations" },
    ])
  )

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-6xl mx-auto px-6 py-32">
        <Link href="/" className="text-signal hover:text-signal text-sm mb-8 inline-block">
          Back to home
        </Link>

        <header className="mb-12 max-w-3xl">
          <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Integrations and developer docs</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-ink mb-4">
            Integrate the operator without changing your operating model.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed">
            SERP Strategists is designed to work with the systems you already use. The goal is not
            to replace your stack. It is to connect search visibility analysis to the place where
            work gets approved, shipped, and measured.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 mb-12">
          {touchpoints.map((item) => (
            <article key={item.title} className="border border-line rounded-2xl bg-card p-6">
              <h2 className="text-xl font-medium text-ink mb-2">{item.title}</h2>
              <p className="text-neutral-600 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] mb-12">
          <article className="border border-line rounded-2xl bg-card p-7">
            <h2 className="text-2xl font-semibold text-ink mb-4">Implementation principles</h2>
            <ul className="space-y-3 text-neutral-600 leading-relaxed">
              {principles.map((principle) => (
                <li key={principle}>- {principle}</li>
              ))}
            </ul>
          </article>

          <article className="border border-line rounded-2xl bg-card p-7">
            <h2 className="text-2xl font-semibold text-ink mb-4">What this page is for</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              This is the developer-facing layer of the site. It explains where the operator reads
              data from, where approvals happen, and how a change moves from analysis to a shipped
              fix.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              If you need to compare the trust model first, read the governance page. If you want to
              see the queue in motion, read the execution demo.
            </p>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link href="/governance" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Governance</h2>
            <p className="text-neutral-600 leading-relaxed">
              See approval gates, logs, rollback, and the data boundaries that keep execution safe.
            </p>
          </Link>
          <Link href="/demo" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Execution demo</h2>
            <p className="text-neutral-600 leading-relaxed">
              Walk through a sample queue to see how the operator handles prioritized work.
            </p>
          </Link>
          <Link href="/pricing" className="block border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-colors">
            <h2 className="text-lg font-medium text-ink mb-2">Pricing</h2>
            <p className="text-neutral-600 leading-relaxed">
              Compare the audit, growth, and scale plans that turn analysis into execution.
            </p>
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  )
}
