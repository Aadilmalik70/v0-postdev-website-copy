import Link from "next/link"
import { ArrowRight, Bot, Gauge, ShieldCheck } from "lucide-react"

const differences = [
  {
    icon: Gauge,
    title: "Not another SEO dashboard",
    body: "Dashboards report what changed. An AI Growth Operator turns crawl, GSC, content, and AI-visibility signals into a ranked action queue with a clear next step.",
  },
  {
    icon: Bot,
    title: "Not a generic AI chatbot",
    body: "The operator works through defined workflows, evidence requirements, permissions, and validation instead of producing untracked recommendations in a chat window.",
  },
  {
    icon: ShieldCheck,
    title: "Not uncontrolled automation",
    body: "Sensitive changes wait for approval. Every shipped action includes logs, validation, a before snapshot, and a rollback path.",
  },
]

const loop = [
  "Observe search performance, crawl health, content gaps, and AI citations",
  "Prioritize opportunities by impact, confidence, effort, and risk",
  "Plan the exact change and expected outcome",
  "Route sensitive work through human approval",
  "Execute through the connected CMS or repository",
  "Measure clicks, rankings, indexation, and citation movement",
]

export function AiGrowthOperatorDefinitionSection() {
  return (
    <section id="ai-growth-operator" className="border-y border-line bg-surface py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:items-start">
          <div>
            <p className="eyebrow mb-5">Category definition</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.04] text-ink text-balance">
              What is an AI Growth Operator?
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              An AI Growth Operator is a governed software system that turns search data into prioritized,
              approved, shipped, and measured SEO and GEO actions. It closes the gap between finding an
              opportunity and getting the work live.
            </p>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              SERP Strategists applies that operating model to organic search across Google, ChatGPT,
              Perplexity, Gemini, and other answer engines.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo" className="btn-ink h-11 px-5 text-sm">
                See the action queue
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href="/governance" className="btn-quiet h-11 px-5 text-sm">
                Review governance
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {differences.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-2xl border border-line bg-card p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-signal">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 leading-7 text-neutral-600">{item.body}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="mt-14 rounded-[28px] border border-line bg-card p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">The operating loop</p>
              <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
                From search signal to shipped outcome.
              </h3>
            </div>
            <Link href="/#operator-loop" className="text-sm font-medium text-signal hover:underline underline-offset-4">
              Explore the complete Operator Loop
            </Link>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loop.map((step, index) => (
              <li key={step} className="rounded-2xl border border-line bg-surface p-5">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 leading-7 text-neutral-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
