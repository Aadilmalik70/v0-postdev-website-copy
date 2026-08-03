import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleDashed,
  ClipboardCheck,
  Database,
  Gauge,
  History,
  Search,
  ShieldCheck,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AiSeoAutomationCta } from "@/components/ai-seo-automation-cta"
import { buildCanonicalUrl, buildMarketingMetadata } from "@/lib/site-seo"
import { combineSchemas, getBreadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI SEO Automation: Tasks & Workflows",
  description:
    "Learn which SEO tasks to automate, where approval belongs, how to control risk, and how a governed AI SEO workflow moves from evidence to measurement.",
  pathname: "/ai-seo-automation",
})

const supportGuides = [
  {
    href: "/blog/what-seo-tasks-can-be-automated",
    title: "What SEO tasks can be automated?",
    body: "Separate safe data work and drafts from changes that need explicit review.",
  },
  {
    href: "/blog/ai-seo-agent-vs-seo-tools",
    title: "AI SEO agents vs SEO tools",
    body: "Compare a point tool with a stateful, multi-step operating workflow.",
  },
  {
    href: "/blog/seo-automation-cost",
    title: "How much does SEO automation cost?",
    body: "Calculate subscriptions, setup, review, implementation, and failure cost.",
  },
  {
    href: "/blog/seo-approval-workflow",
    title: "Build an SEO approval workflow",
    body: "Define evidence, policy, approvers, validation, rollback, and measurement.",
  },
  {
    href: "/blog/seo-automation-risks",
    title: "SEO automation risks and controls",
    body: "Prevent noisy findings, unsafe changes, scaled-content abuse, and silent failures.",
  },
  {
    href: "/blog/agentic-web-seo",
    title: "What is agentic SEO?",
    body: "Understand the maturity ladder from one-off automation to governed agents.",
  },
  {
    href: "/blog/operationalizing-seo-saas-autonomous-growth",
    title: "SEO automation for SaaS",
    body: "Turn recurring search evidence into an operating cadence for a lean SaaS team.",
  },
]

const taskGroups = [
  {
    label: "Automate first",
    tone: "text-signal",
    items: [
      "Scheduled data collection and crawl monitoring",
      "Normalization, grouping, deduplication, and change detection",
      "Draft reports, briefs, metadata, and internal-link candidates",
      "Validation checks against explicit acceptance criteria",
    ],
  },
  {
    label: "Automate with approval",
    tone: "text-opviolet",
    items: [
      "Title, section, schema, and anchor-text changes",
      "Content refreshes and new-page briefs",
      "Actions that affect a commercial page or public claim",
      "Any external write through a CMS or repository adapter",
    ],
  },
  {
    label: "Keep human-owned",
    tone: "text-coral",
    items: [
      "Positioning, legal claims, pricing, and brand promises",
      "Redirects, canonicals, robots, noindex, and page deletion",
      "Relationship-led outreach and editorial accountability",
      "Decisions where evidence is incomplete or intent is ambiguous",
    ],
  },
]

const operatorLoop = [
  { name: "Observe", body: "Collect crawl, page, query, analytics, and change evidence.", icon: Search },
  { name: "Normalize", body: "Remove noise, canonical variants, duplicates, and incompatible definitions.", icon: Database },
  { name: "Prioritize", body: "Score impact, confidence, effort, business value, and risk separately.", icon: Gauge },
  { name: "Plan", body: "Name the target, proposed change, evidence, owner, validation, and rollback.", icon: ClipboardCheck },
  { name: "Approve", body: "Apply a policy and send sensitive or uncertain work to the right person.", icon: ShieldCheck },
  { name: "Execute", body: "Simulate, draft, or write only through an enabled and permissioned adapter.", icon: Bot },
  { name: "Validate", body: "Confirm the intended state exists and important behavior did not regress.", icon: CheckCircle2 },
  { name: "Measure", body: "Compare a declared baseline and outcome window without claiming false causality.", icon: History },
]

const currentState = [
  ["Free Growth Audit", "Available", "Homepage snapshot plus robots.txt and sitemap checks"],
  ["First-party crawler", "Draft implementation", "Verified in the supplied open product PR; live deployment verification still required"],
  ["OperatorAction lifecycle", "Implemented", "Evidence, scoring, policy states, approvals, events, and measurement"],
  ["Durable execution jobs", "Implemented", "Leases, retries, cancellation, snapshots, validation, and rollback lifecycle"],
  ["Simulation adapter", "Enabled", "Proves the governed lifecycle without changing an external system"],
  ["GitHub and WordPress writes", "Disabled", "Not presented as live execution until the adapters are verified"],
]

const automationSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${buildCanonicalUrl("/ai-seo-automation")}#webpage`,
  url: buildCanonicalUrl("/ai-seo-automation"),
  name: "AI SEO Automation: Tasks, Workflows, Governance, and Risk",
  description:
    "A practical guide to governed AI SEO automation, from evidence collection and prioritization to approval, validation, and measurement.",
  isPartOf: { "@id": `${buildCanonicalUrl("/")}#website` },
  about: ["AI SEO automation", "SEO workflow automation", "SEO governance"],
  inLanguage: "en-US",
}

export default function AiSeoAutomationPage() {
  const schemas = combineSchemas(
    automationSchema,
    getBreadcrumbSchema([
      { name: "Home", url: buildCanonicalUrl("/") },
      { name: "AI SEO Automation", url: buildCanonicalUrl("/ai-seo-automation") },
    ]),
  )

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <section className="px-5 pb-20 pt-28 md:px-6 md:pb-28 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="mb-8 inline-flex text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 hover:text-ink">
            <span aria-hidden="true">&larr;</span>&nbsp; Back to home
          </Link>
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <header>
              <p className="eyebrow mb-5">AI SEO Automation</p>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl">
                Automate the SEO workflow, not the judgment.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600 md:text-xl">
                AI SEO automation connects recurring search evidence to a controlled next action. A useful system does more than generate copy: it collects evidence, removes noise, prioritizes work, asks for approval, validates the result, and records what happened.
              </p>
              <div className="mt-8">
                <AiSeoAutomationCta placement="hero" />
              </div>
            </header>

            <aside className="relative overflow-hidden rounded-3xl border border-graphite-line bg-graphite-950 p-6 text-warmwhite shadow-[0_24px_70px_-38px_rgba(13,17,16,0.8)] md:p-8">
              <span className="operator-scanline absolute left-0 top-0 h-px w-1/3 bg-signal-bright/50" />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal-bright">Operating principle</p>
              <p className="mt-4 font-display text-2xl font-semibold leading-tight">Automation earns permission one verified step at a time.</p>
              <div className="mt-6 space-y-3 text-sm text-neutral-400">
                <p><span className="text-warmwhite">Evidence before score.</span> A finding without traceable inputs stays a review candidate.</p>
                <p><span className="text-warmwhite">Policy before write.</span> Risk, role, protected paths, and approval state control execution.</p>
                <p><span className="text-warmwhite">Validation before success.</span> A completed job is not a successful SEO outcome.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface/60 px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">Definition</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">What AI SEO automation actually means</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              AI SEO automation is a repeatable system that uses software and models to complete bounded SEO work under declared data, policy, permission, and measurement rules. It can be a simple scheduled report, a human-reviewed content workflow, or a multi-step agent. The label matters less than the controls and observable output.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {taskGroups.map((group) => (
              <article key={group.label} className="rounded-2xl border border-line bg-card p-6">
                <h3 className={`font-mono text-xs uppercase tracking-[0.16em] ${group.tone}`}>{group.label}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-600">
                  {group.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true">—</span><span>{item}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-4xl text-sm leading-6 text-neutral-600">
            Google does not treat all automation as spam. The problem is automation used primarily to manipulate rankings or create large amounts of low-value, unoriginal content. The output still needs to satisfy people-first and spam-policy standards. See Google’s <a className="font-medium text-signal underline decoration-signal/30 underline-offset-4" href="https://developers.google.com/search/docs/fundamentals/using-gen-ai-content">generative AI guidance</a> and <a className="font-medium text-signal underline decoration-signal/30 underline-offset-4" href="https://developers.google.com/search/docs/essentials/spam-policies">scaled-content policy</a>.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">The governed loop</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">Eight stages between a signal and a safe change</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">Skipping normalization, policy, or validation is how a useful automation becomes a noisy action queue or an unsafe publishing bot.</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {operatorLoop.map((step, index) => (
              <li key={step.name} className="rounded-2xl border border-line bg-card p-6">
                <div className="flex items-center justify-between">
                  <step.icon className="h-5 w-5 text-signal" strokeWidth={1.8} />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{step.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-graphite-950 px-5 py-20 text-warmwhite md:px-6 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal-bright">First-hand product lesson</p>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-5xl">A detector is not an action engine.</h2>
            <p className="mt-5 text-base leading-7 text-neutral-400">
              In an internal SERP Strategists review covering May 2–July 30, a detector returned 13 multi-URL query candidates. The first action view promoted repeated query variants and unrelated demand too aggressively. The numbers were real; the promotion logic was not ready.
            </p>
          </div>
          <div className="rounded-3xl border border-graphite-line bg-graphite-900 p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-3">
              <div><p className="font-display text-4xl font-semibold text-warmwhite">13</p><p className="mt-1 text-xs text-neutral-400">raw multi-URL candidates</p></div>
              <div><p className="font-display text-4xl font-semibold text-coral-bright">0</p><p className="mt-1 text-xs text-neutral-400">safe executable actions</p></div>
              <div><p className="font-display text-4xl font-semibold text-opportunity-bright">2–3</p><p className="mt-1 text-xs text-neutral-400">grouped intent reviews</p></div>
            </div>
            <div className="mt-8 border-t border-graphite-line pt-6 text-sm leading-6 text-neutral-400">
              The correction was architectural: cluster query variants, expose every competing URL, verify temporal overlap, filter irrelevant or machine-shaped queries, route canonical variants to technical review, apply page cooldowns, and keep uncertain comparisons out of the executable queue.
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">Current early-access boundary</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">What exists now—and what does not</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">This status table prevents a roadmap from being presented as a live capability. It reflects the supplied implementation record as of August 3, 2026.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-surface text-ink"><tr><th className="px-5 py-4 font-medium">Capability</th><th className="px-5 py-4 font-medium">State</th><th className="px-5 py-4 font-medium">Meaning</th></tr></thead>
                <tbody>
                  {currentState.map(([capability, state, meaning]) => (
                    <tr key={capability} className="border-t border-line">
                      <td className="px-5 py-4 font-medium text-ink">{capability}</td>
                      <td className="px-5 py-4"><span className={`inline-flex rounded-full border border-line bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${state === "Disabled" ? "text-coral" : state.includes("Implemented") || state.includes("implementation") ? "text-trust" : "text-signal"}`}>{state}</span></td>
                      <td className="px-5 py-4 leading-6 text-neutral-600">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-6 text-neutral-600">SERP Strategists should be evaluated today on the audit, evidence, prioritization, policy, review, and simulation workflow. Live repository or CMS execution should be evaluated only after those adapters are enabled and verified in production. Review the <Link className="font-medium text-signal underline decoration-signal/30 underline-offset-4" href="/governance">governance model</Link> and current <Link className="font-medium text-signal underline decoration-signal/30 underline-offset-4" href="/integrations">integration boundaries</Link> before granting any future write access.</p>
        </div>
      </section>

      <section className="border-y border-line bg-surface/60 px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">Topic map</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">Continue with one specific decision</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">Each supporting guide owns a narrow question. The pillar explains the whole operating system; the support pages do not compete for the same head term.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supportGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="card-lift group rounded-2xl border border-line bg-card p-6">
                <CircleDashed className="h-5 w-5 text-signal" strokeWidth={1.8} />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink group-hover:text-signal">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{guide.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-ink">Open guide <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-4">Buyer checklist</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">Require proof at every boundary</h2>
          </div>
          <ul className="grid gap-3 text-sm leading-6 text-neutral-600 sm:grid-cols-2">
            {[
              "Can each action show its source evidence and date window?",
              "Are impact, confidence, effort, and risk separate fields?",
              "Does the system distinguish a review candidate from an executable action?",
              "Which integrations are read-only, simulated, draft-only, or live?",
              "Who approves titles, anchors, redirects, canonicals, and commercial claims?",
              "What validates production after a write?",
              "What snapshot or instruction supports rollback?",
              "Which search and business outcome will be measured, and when?",
            ].map((item) => <li key={item} className="rounded-2xl border border-line bg-card p-5"><span className="mr-2 text-signal">✓</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-6 md:pb-32">
        <div className="mx-auto max-w-6xl rounded-3xl border border-graphite-line bg-graphite-950 p-8 text-warmwhite md:p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal-bright">Start with evidence</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-5xl">See the first findings before you automate a change.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">The free Growth Audit is a homepage snapshot. It checks the submitted page plus robots.txt and sitemap signals, then shows prioritized findings. It does not activate paid execution or modify your site.</p>
          <div className="mt-8 [&_.btn-quiet]:border-neutral-600 [&_.btn-quiet]:text-warmwhite [&_.btn-quiet:hover]:bg-white/5">
            <AiSeoAutomationCta placement="final" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
