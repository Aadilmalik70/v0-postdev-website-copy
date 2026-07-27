import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { PricingAuditCta } from "@/components/pricing-audit-cta"
import { FaqSection, type FaqItem } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata, buildCanonicalUrl } from "@/lib/site-seo"
import { combineSchemas, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI SEO Tools Pricing Compared (2026)",
  description:
    "Compare AI SEO software pricing, limits, automation, GEO visibility, and agency costs. See where SERP Strategists fits before you subscribe.",
  pathname: "/pricing",
  type: "article",
  modifiedTime: "2026-07-27",
  authors: ["SERP Strategists"],
  tags: ["AI SEO tools pricing", "SEO software pricing", "SEO automation"],
})

type ComparisonRow = {
  name: string
  category: string
  price: string
  trial: string
  capabilities: string
  automation: string
  geo: string
  bestFor: string
  limitation: string
  source: string
  href: string
  highlight?: boolean
}

const comparisonRows: ComparisonRow[] = [
  {
    name: "SERP Strategists",
    category: "AI growth operator",
    price: "$0 audit; $49 / $99 target",
    trial: "Free Growth Audit; no paid trial published",
    capabilities: "Audit, prioritization, approved SEO and content actions, outcome measurement",
    automation: "Governed execution with approval gates, logs, validation, and rollback design",
    geo: "AI citation and prompt monitoring on Scale target",
    bestFor: "Teams that need work to move from finding to shipping",
    limitation: "Early-access targets; final scope and activation are confirmed before billing",
    source: "SERP Strategists pricing",
    href: "https://serpstrategists.com/pricing",
    highlight: true,
  },
  {
    name: "Semrush",
    category: "SEO suite",
    price: "$139 monthly; $117.33 billed annually",
    trial: "7-day free trial",
    capabilities: "Keywords, competitors, rank tracking, site audit, reports, AI search visibility",
    automation: "Low to medium; data, reports, and recommendations remain the main model",
    geo: "AI performance, sentiment, visibility reports, and custom prompts",
    bestFor: "Broad SEO research and established marketing teams",
    limitation: "Seats, reports, and capacity can add to the base plan",
    source: "Semrush SEO + AI Search pricing",
    href: "https://www.semrush.com/pricing/seo-ai-search/",
  },
  {
    name: "Ahrefs",
    category: "SEO suite",
    price: "$29 Starter; $129 Lite",
    trial: "Ahrefs Free; no standard paid trial shown",
    capabilities: "Site Explorer, Keywords Explorer, audit, rank tracking, backlinks, content research",
    automation: "Low to medium; optional AI and Project Boost features do not equal a full operator",
    geo: "Brand Radar and custom prompt packages are separate visibility products",
    bestFor: "Backlink, competitor, and search-data depth",
    limitation: "The useful plan and add-ons can be materially above the $29 entry point",
    source: "Ahrefs plans and pricing",
    href: "https://ahrefs.com/pricing",
  },
  {
    name: "SE Ranking",
    category: "SEO + GEO suite",
    price: "$129 monthly; $103.20 billed annually",
    trial: "14-day trial; no card required",
    capabilities: "Rank tracking, audit, research, reports, API, content marketing, AI search",
    automation: "Medium; strong workflow coverage, but the buyer still operates the work",
    geo: "Prompt tracking, AI sources, and competitor research across five LLMs",
    bestFor: "Marketing teams and agencies needing SEO plus GEO limits",
    limitation: "Keywords, seats, articles, locations, and API capacity are metered",
    source: "SE Ranking subscription pricing",
    href: "https://seranking.com/subscription.html",
  },
  {
    name: "Frase",
    category: "Content operating system",
    price: "$49 monthly; $39 billed yearly",
    trial: "7-day trial; no card required",
    capabilities: "Research, briefs, writing, SEO/GEO scores, audits, CMS publishing, decay monitoring",
    automation: "High for content workflows; narrower for technical site execution",
    geo: "AI visibility for ChatGPT and Google AI; more platforms on higher tiers",
    bestFor: "Solo writers, content teams, and multi-site editorial workflows",
    limitation: "Articles, audit pages, seats, domains, and monitoring pages are capped",
    source: "Frase pricing",
    href: "https://www.frase.io/pricing",
  },
  {
    name: "SEO.AI",
    category: "AI content and SEO agent",
    price: "$149 single site; $299 multi-site",
    trial: "Free-start wording shown; exact trial terms should be confirmed",
    capabilities: "AI agent, content planning, writing, publishing, backlinks, ads, monitoring",
    automation: "High; the product positions the AI as an always-on SEO colleague",
    geo: "Google and ChatGPT visibility are named on the pricing page",
    bestFor: "Brands prioritizing automated content production",
    limitation: "Price excludes VAT and the unit of value is site or language scope",
    source: "SEO.AI pricing",
    href: "https://seo.ai/pricing",
  },
  {
    name: "SEObot",
    category: "Autonomous content tool",
    price: "From $49 for 9 articles per month",
    trial: "Not stated in the pricing article",
    capabilities: "Automated SEO content plans and article production",
    automation: "High for content output; not a broad SEO operations layer",
    geo: "Not stated in the official pricing source",
    bestFor: "Solo founders and startups buying article capacity",
    limitation: "Full plans are shown after onboarding and pricing is article-led",
    source: "SEObot Help Center pricing",
    href: "https://docs.seobotai.com/en/articles/10644453-what-s-seobot-pricing",
  },
  {
    name: "WordLift",
    category: "Knowledge graph and AI SEO",
    price: "$1,100 monthly; $879 billed yearly",
    trial: "No free plan or trial shown on pricing page",
    capabilities: "Agent, knowledge graph, content creation, audits, rank tracking, schema, support",
    automation: "High with strategic support and guided implementation",
    geo: "AI search and SEO research; prompt-tracking scope is not shown",
    bestFor: "Businesses needing structured data and managed strategic help",
    limitation: "Business+ is a high-touch, high-price plan with usage limits",
    source: "WordLift pricing",
    href: "https://wordlift.io/pricing/",
  },
  {
    name: "Adaptify",
    category: "Agency automation platform",
    price: "$499 one site; $999 agency plan for three sites",
    trial: "7-day free trial",
    capabilities: "Automated content, keywords, PR backlinks, monitoring, white-label workflows",
    automation: "High for agency delivery and publishing workflows",
    geo: "AI visibility is part of the product positioning; pricing limits are not fully shown",
    bestFor: "Agencies scaling content and link delivery",
    limitation: "The entry price is agency-oriented and not a simple single-user dashboard",
    source: "Adaptify SEO pricing",
    href: "https://adaptify.ai/pricing",
  },
]

const pricingFaqs: FaqItem[] = [
  {
    q: "What is the cheapest AI SEO tool?",
    a: "There is no universal winner. Google Search Console is free for verified properties, while commercial tools begin at different prices and meter different units. Compare the workflow you need, not only the lowest card.",
  },
  {
    q: "What does per month, billed annually mean?",
    a: "It is the monthly equivalent of an annual commitment. Check the checkout total, renewal terms, and cancellation policy before treating it as a month-to-month price.",
  },
  {
    q: "Are AI SEO tools the same as SEO software?",
    a: "No. SEO software usually provides data, auditing, research, tracking, or reporting. AI SEO tools may add drafting or recommendations. An AI operator adds workflow control and approved execution.",
  },
  {
    q: "Do Semrush and Ahrefs include AI visibility monitoring?",
    a: "Both now publish AI-search products or features, but the included prompts, domains, checks, and add-ons differ by plan. Compare the exact visibility limits rather than assuming AI coverage is included everywhere.",
  },
  {
    q: "Does a free trial include all features?",
    a: "Usually not. Trials can be limited by time, projects, prompts, documents, exports, or plan tier. Confirm what remains available after the trial and whether a card is required.",
  },
  {
    q: "Are SERP Strategists paid plans live subscriptions?",
    a: "No. The free Growth Audit is available now. Growth at $49/month and Scale at $99/month are early-access target prices; scope, activation, limits, and billing are confirmed before any paid account starts.",
  },
  {
    q: "What happens after the SERP Strategists free audit?",
    a: "You submit one website and receive a technical SEO and GEO readiness review with an impact-ranked opportunity queue. The audit does not start a subscription or execute automated fixes.",
  },
  {
    q: "Who should not choose SERP Strategists yet?",
    a: "Teams that need a mature self-serve dataset, public enterprise limits, or high-volume autonomous publishing should wait until those requirements are explicitly available. Early access is for teams willing to scope the workflow with us.",
  },
  {
    q: "Can an AI SEO operator replace an SEO agency?",
    a: "Not in every situation. An operator can reduce recurring analysis and implementation bottlenecks, but strategy, brand judgment, digital PR, and complex migrations may still need specialists.",
  },
  {
    q: "How often should pricing claims be rechecked?",
    a: "Before publishing and at least quarterly. Recheck plan names, billing cycles, limits, trial terms, add-ons, currencies, and whether a feature is beta or generally available.",
  },
]

const jsonLd = combineSchemas(
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SERP Strategists",
    description: "AI Growth Operator for governed organic-search operations",
    url: buildCanonicalUrl("/pricing"),
    offers: {
      "@type": "Offer",
      name: "Free Growth Audit",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: buildCanonicalUrl("/pricing"),
    },
  },
  getArticleSchema({
    headline: "AI SEO Tools Pricing Compared (2026)",
    description: "A source-linked comparison of AI SEO software, automation, GEO visibility, and operator pricing.",
    url: buildCanonicalUrl("/pricing"),
    datePublished: "2026-06-10",
    dateModified: "2026-07-27",
    author: "SERP Strategists",
    tags: ["AI SEO tools pricing", "SEO software pricing", "SEO automation"],
  }),
  getBreadcrumbSchema([
    { name: "Home", url: buildCanonicalUrl("/") },
    { name: "Pricing", url: buildCanonicalUrl("/pricing") },
  ]),
  getFAQSchema(
    pricingFaqs.map((faq) => ({
      question: faq.q,
      answer: faq.a,
    })),
  ),
)

function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="min-w-[1180px] w-full border-collapse text-left">
        <thead className="bg-surface">
          <tr className="border-b border-line">
            {["Platform", "Starting price", "Free plan or trial", "Main capabilities", "Automation", "GEO / AI visibility", "Best for", "Main limitation"].map((heading) => (
              <th key={heading} className="px-4 py-4 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500 align-top">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.name} className={row.highlight ? "border-b border-line bg-signal/5" : "border-b border-line last:border-0"}>
              <td className="px-4 py-5 align-top min-w-[150px]">
                <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel={row.href.startsWith("http") ? "noreferrer" : undefined} className="font-semibold text-ink hover:text-signal transition-colors">{row.name}</a>
                <p className="mt-1 text-[11px] text-signal">{row.category}</p>
                <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel={row.href.startsWith("http") ? "noreferrer" : undefined} className="mt-3 inline-block text-[10px] text-neutral-500 underline underline-offset-2">Official source</a>
              </td>
              <td className="px-4 py-5 align-top text-sm font-medium text-ink">{row.price}</td>
              <td className="px-4 py-5 align-top text-sm text-neutral-600">{row.trial}</td>
              <td className="px-4 py-5 align-top text-sm leading-6 text-neutral-600">{row.capabilities}</td>
              <td className="px-4 py-5 align-top text-sm leading-6 text-neutral-600">{row.automation}</td>
              <td className="px-4 py-5 align-top text-sm leading-6 text-neutral-600">{row.geo}</td>
              <td className="px-4 py-5 align-top text-sm leading-6 text-neutral-600">{row.bestFor}</td>
              <td className="px-4 py-5 align-top text-sm leading-6 text-neutral-600">{row.limitation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const detailedBreakdowns = [
  {
    name: "Semrush and Ahrefs",
    body: "These are broad SEO suites. You pay for proprietary search and backlink datasets, projects, tracked keywords, crawl credits, historical data, exports, and increasingly AI-search visibility. They are strong when your team needs to investigate markets and competitors. They are not priced as a complete replacement for the people who turn a finding into a content update, code change, or approved release.",
  },
  {
    name: "SE Ranking",
    body: "SE Ranking is closer to an all-in-one SEO and GEO workspace for teams that want visible operating limits. Its public Core plan shows projects, daily keywords and prompts, audit pages, API credits, and a 14-day trial. It is a useful comparison for buyers who want one dashboard with AI-search coverage but still expect a specialist or team to run the workflow.",
  },
  {
    name: "Frase and SEO.AI",
    body: "These products put more of the content loop inside the platform. Frase publishes article, audit-page, seat, site, and AI-visibility limits by tier. SEO.AI sells a single-site or multi-site AI colleague model and names Google and ChatGPT visibility. The right question is not simply whether the tool writes; it is whether the output fits your editorial review, brand, CMS, and technical SEO process.",
  },
  {
    name: "SEObot, WordLift, and Adaptify",
    body: "These products illustrate three different automation models. SEObot is article-capacity-led, WordLift combines agent capability with a knowledge graph and strategic support, and Adaptify is agency-oriented with content, keywords, backlinks, and white-label delivery. Their prices are not directly interchangeable because the unit of value is different: articles, URLs and credits, or sites and delivery capacity.",
  },
]

const costDrivers = [
  ["Keywords and rank tracking", "More tracked terms, devices, locations, and refresh frequency increase the cost of a classic SEO suite."],
  ["Content generation", "The relevant unit may be articles, documents, words, prompts, audit pages, brand voices, or publishing connections."],
  ["Technical SEO", "Audits are often metered by crawl credits, URLs, pages per project, recrawls, exports, or API access."],
  ["Automation", "Automation means different things: a suggestion, a draft, an auto-published article, or an approved code change with validation."],
  ["AI visibility and GEO", "Prompt checks, platforms, locations, domains, source citations, and update frequency are the real comparison units."],
  ["People and implementation", "Seats, editors, developers, agency time, onboarding, and the cost of acting on reports are part of total ownership."],
]

const audienceDecisions = [
  ["SaaS companies", "Choose a suite when research depth is the bottleneck. Consider an operator when you already know the issues but releases, content updates, and measurement keep slipping."],
  ["E-commerce brands", "Prioritize platform coverage, product-page scale, technical templates, internal links, and integrations. Content volume alone is not a complete e-commerce SEO workflow."],
  ["Agencies", "Compare client seats, projects, white-label reports, prompt capacity, publishing, backlinks, and the number of operators needed to deliver the service."],
  ["Startups", "Start with a free data source or audit, then buy the smallest plan that removes a real bottleneck. Avoid paying for enterprise limits before you have repeatable demand."],
  ["Solo founders", "A content-led tool may be enough if writing is the constraint. An operator becomes more relevant when prioritization and shipping—not ideas—are the constraint."],
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-20">
        <header className="px-6 pt-16 pb-10 md:pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl">
              <p className="text-signal text-sm font-medium tracking-wide uppercase mb-4">AI SEO tools pricing · verified July 27, 2026</p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-ink leading-[1.04] mb-6">
                AI SEO tools pricing: compare software, automation, and AI growth operators.
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-3xl">
                Pricing pages rarely measure the same thing. One platform sells keywords and backlinks, another sells articles, another sells prompt checks, and an operator is priced around getting approved work shipped. This comparison makes those differences explicit before you subscribe.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 mt-10">
              <div className="rounded-2xl border border-line bg-card p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-signal mb-2">Quick answer</p>
                <p className="text-sm leading-6 text-neutral-600">For research depth, compare Semrush, Ahrefs, or SE Ranking. For content production, compare Frase, SEO.AI, or SEObot. For governed execution, evaluate SERP Strategists as an early-access operator.</p>
              </div>
              <div className="rounded-2xl border border-line bg-card p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-signal mb-2">The real question</p>
                <p className="text-sm leading-6 text-neutral-600">Are you buying more data, more drafts, more AI-answer visibility, or less time between finding an opportunity and shipping the fix?</p>
              </div>
              <div className="rounded-2xl border border-line bg-card p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-signal mb-2">Source policy</p>
                <p className="text-sm leading-6 text-neutral-600">Every monetary claim below links to a vendor source and is labelled when it is annual-equivalent, usage-limited, custom, or an early-access target.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6">
              <div>
                <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">At a glance</p>
                <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink">Compare the unit you are buying.</h2>
              </div>
              <p className="text-sm text-neutral-500 max-w-sm">USD prices shown from official pages accessed July 27, 2026. Currency, VAT, promotions, and billing cycles can change.</p>
            </div>
            <ComparisonTable />
          </div>
        </section>

        <section className="px-6 py-16 bg-surface">
          <div className="max-w-6xl mx-auto">
            <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">How the market breaks down</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink max-w-3xl mb-6">The price is attached to a different job in each category.</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {detailedBreakdowns.map((item) => (
                <article key={item.name} className="rounded-2xl border border-line bg-card p-6 md:p-7">
                  <h3 className="text-xl font-semibold text-ink mb-3">{item.name}</h3>
                  <p className="text-sm leading-7 text-neutral-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-8">
              <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">What you are actually paying for</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-4">Six cost drivers matter more than the headline.</h2>
              <p className="text-neutral-600 text-lg leading-relaxed">A fair comparison uses the expected workflow, not the vendor with the smallest number in a pricing card. Add seats, usage, implementation, and the time required to turn recommendations into live changes.</p>
            </div>
            <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3 bg-line border border-line rounded-2xl overflow-hidden">
              {costDrivers.map(([title, body]) => (
                <article key={title} className="bg-card p-6">
                  <h3 className="text-base font-semibold text-ink mb-2">{title}</h3>
                  <p className="text-sm leading-6 text-neutral-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 bg-graphite-950 text-warmwhite">
          <div className="max-w-6xl mx-auto">
            <p className="text-signal-bright text-sm font-medium tracking-wide uppercase mb-3">Decision framework</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-5">Which AI SEO tool is best for you?</h2>
            <p className="text-neutral-300 max-w-3xl leading-7 mb-9">There is no single best plan. The right choice depends on whether your constraint is evidence, content capacity, AI visibility, or execution capacity.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {audienceDecisions.map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-graphite-line bg-graphite-900 p-6">
                  <h3 className="text-lg font-semibold text-warmwhite mb-2">{title}</h3>
                  <p className="text-sm leading-6 text-neutral-300">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">The category distinction</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink max-w-3xl mb-6">SEO software, an AI operator, and an agency are not the same purchase.</h2>
            <div className="overflow-x-auto rounded-2xl border border-line bg-card">
              <table className="min-w-[760px] w-full text-left">
                <thead className="bg-surface border-b border-line">
                  <tr>
                    <th className="px-5 py-4 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">Model</th>
                    <th className="px-5 py-4 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">You mainly buy</th>
                    <th className="px-5 py-4 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">Still required from you</th>
                    <th className="px-5 py-4 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">Best fit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line">
                    <td className="px-5 py-5 font-semibold text-ink">SEO software</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Data, research, audits, tracking, and reports</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Prioritization, implementation, review, and measurement</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Teams with specialist capacity</td>
                  </tr>
                  <tr className="border-b border-line bg-signal/5">
                    <td className="px-5 py-5 font-semibold text-ink">AI SEO operator</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">A governed loop from evidence to approved, measured action</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Access, policy decisions, brand judgment, and approval where risk matters</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Teams whose work stalls after the audit</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 font-semibold text-ink">SEO agency</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Human strategy, service capacity, communication, and execution</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Briefing, approvals, budget, access, and partnership management</td>
                    <td className="px-5 py-5 text-sm text-neutral-600">Businesses buying accountable specialist service</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-16 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-4">
              <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Our pricing</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-4">SERP Strategists is priced around the operating gap.</h2>
              <p className="text-neutral-600 text-lg leading-relaxed">I am building SERP Strategists as an AI Growth Operator for organic search. The current model begins with evidence, then scopes governed execution. The paid numbers are early-access targets—not promises that a self-serve subscription is already live.</p>
            </div>
            <PricingSection />
            <div className="grid gap-4 md:grid-cols-3 -mt-10 pb-10">
              <div className="rounded-2xl border border-line bg-card p-6"><h3 className="font-semibold text-ink mb-2">Included in the current model</h3><p className="text-sm leading-6 text-neutral-600">The free audit covers one submitted website, a technical SEO and GEO readiness review, and an impact-ranked opportunity queue. Growth and Scale targets add approval-gated workflows, monitoring, logs, and defined content-action capacity.</p></div>
              <div className="rounded-2xl border border-line bg-card p-6"><h3 className="font-semibold text-ink mb-2">Not included or published yet</h3><p className="text-sm leading-6 text-neutral-600">No paid-plan trial, annual discount, automatic overage pricing, or final self-serve billing terms are currently published. Additional sites, actions, and monitoring capacity are reviewed before any billing change.</p></div>
              <div className="rounded-2xl border border-line bg-card p-6"><h3 className="font-semibold text-ink mb-2">Who should wait</h3><p className="text-sm leading-6 text-neutral-600">If you need mature public enterprise limits, a large historical dataset, or high-volume autonomous publishing today, choose a more established platform until those requirements are available here.</p></div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div>
              <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Free growth audit</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-4">Find the first opportunities before choosing a plan.</h2>
              <p className="text-neutral-600 text-lg leading-relaxed">The audit is a low-risk way to see whether the operator model matches your site. It is not a disguised subscription and it does not promise rankings, traffic, or revenue.</p>
            </div>
            <div className="space-y-3">
              {[
                ["01", "Submit your website", "Start with one website and the information needed to return the audit."],
                ["02", "Review the evidence", "See technical SEO and GEO readiness signals organized into an impact-ranked queue."],
                ["03", "Decide what should ship", "Use the queue to decide whether governed execution removes a real bottleneck for your team."],
                ["04", "Scope access and limits", "If there is a fit, final access, activation, included limits, and billing are confirmed before paid activation."],
              ].map(([step, title, body]) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-line bg-card p-5">
                  <span className="font-mono text-xs text-signal pt-1">{step}</span>
                  <div><h3 className="font-semibold text-ink mb-1">{title}</h3><p className="text-sm leading-6 text-neutral-600">{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 bg-surface">
          <div className="max-w-6xl mx-auto">
            <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">Methodology</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink max-w-3xl mb-5">How this pricing comparison was made.</h2>
            <div className="max-w-3xl space-y-4 text-neutral-600 leading-7">
              <p>Prices and plan details were checked against official vendor pages on July 27, 2026. Monthly and annual-equivalent prices are shown separately where the source exposes both. We did not convert annual licences into fictional monthly subscriptions.</p>
              <p>Features are grouped by the job they perform: SEO data and dashboards, content generation, technical auditing, automation, GEO or AI visibility, and human service. “Automation level” is an editorial assessment of how much of the workflow the product claims to perform; it is not a vendor score.</p>
              <p>Where the official page was client-rendered, sales-led, or incomplete, the table says so. Verify the checkout currency, taxes, trial conditions, usage limits, add-ons, and current availability before purchasing.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              {comparisonRows.map((row) => <a key={row.name} href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel={row.href.startsWith("http") ? "noreferrer" : undefined} className="text-ink underline underline-offset-4 hover:text-signal">{row.source}</a>)}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl bg-graphite-950 p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="text-signal-bright text-sm font-medium tracking-wide uppercase mb-3">Next step</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-warmwhite mb-4">See which search opportunities deserve attention first.</h2>
              <p className="text-neutral-300 leading-7">Run the free Growth Audit to inspect your first opportunity queue. Use it to decide whether an AI Growth Operator belongs in your SEO workflow.</p>
            </div>
            <PricingAuditCta />
          </div>
        </section>

        <FaqSection faqs={pricingFaqs} />
      </div>
      <Footer />
    </main>
  )
}
