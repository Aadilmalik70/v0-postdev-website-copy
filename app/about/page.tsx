import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata } from "@/lib/site-seo"
import { combineSchemas, getBreadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildMarketingMetadata({
  title: "About SERP Strategists | AI Growth Operator",
  description:
    "Meet Aadil Khan and learn why SERP Strategists is building a governed AI Growth Operator that turns search insights into reviewable, measurable actions.",
  pathname: "/about",
})

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://serpstrategists.com/#aadil-khan",
  name: "Aadil Khan",
  url: "https://serpstrategists.com/about#aadil-khan",
  jobTitle: "Founder",
  sameAs: ["https://github.com/Aadilmalik70"],
  worksFor: {
    "@id": "https://serpstrategists.com#organization",
  },
  knowsAbout: [
    "AI agents",
    "Search engine optimization",
    "Generative engine optimization",
    "Frontend engineering",
    "Search automation",
  ],
}

const jsonLd = combineSchemas(
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SERP Strategists",
    description:
      "The mission, product principles, and founder behind the SERP Strategists AI Growth Operator.",
    url: "https://serpstrategists.com/about",
    mainEntity: {
      "@id": "https://serpstrategists.com#organization",
    },
  },
  founderSchema,
  getBreadcrumbSchema([
    { name: "Home", url: "https://serpstrategists.com" },
    { name: "About", url: "https://serpstrategists.com/about" },
  ])
)

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link href="/" className="text-signal text-sm mb-8 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-4xl font-semibold text-ink mb-6">
          About SERP Strategists
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed mb-14">
          SERP Strategists is building an AI Growth Operator for teams that have
          enough search data but not enough capacity to turn it into shipped work.
        </p>

        <section id="aadil-khan" className="mb-14 scroll-mt-28">
          <p className="text-signal text-sm font-medium tracking-wide uppercase mb-3">
            Founder and editorial reviewer
          </p>
          <h2 className="text-2xl font-semibold text-ink mb-4">Aadil Khan</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Aadil is a software and AI engineer focused on frontend systems,
            backend APIs, AI-agent workflows, search automation, and governed
            execution. He started SERP Strategists after repeatedly seeing SEO
            recommendations stop at reports instead of becoming measurable product
            and content changes.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-4">
            He is responsible for the product direction and editorial review of
            SERP Strategists content. Articles should distinguish verified facts
            from operator judgment, link material claims to sources, and state
            clearly when a result is an example rather than customer evidence.
          </p>
          <Link
            href="https://github.com/Aadilmalik70"
            className="text-ink underline underline-offset-4"
          >
            View Aadil&apos;s engineering work on GitHub
          </Link>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-ink mb-4">Our mission</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Make high-quality search operations accessible to lean teams by
            replacing disconnected audits, spreadsheets, and hand-offs with one
            governed loop: observe, prioritize, plan, approve, execute, and measure.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            SERP Strategists is designed to show the evidence behind each action,
            require human approval where risk is meaningful, and keep every shipped
            change reviewable and reversible.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-ink mb-4">How we publish</h2>
          <div className="space-y-5 text-neutral-600 leading-relaxed">
            <p>
              <strong className="text-ink">Source material claims.</strong>{" "}
              Statistics, platform behavior, and third-party findings should link
              to the original source whenever one is available.
            </p>
            <p>
              <strong className="text-ink">Separate evidence from opinion.</strong>{" "}
              Product experience and operator judgment are labelled as such instead
              of being presented as universal facts.
            </p>
            <p>
              <strong className="text-ink">Update material changes.</strong>{" "}
              Articles show their publication and modification dates, and important
              comparisons are reviewed when products or search behavior change.
            </p>
            <p>
              <strong className="text-ink">Do not manufacture proof.</strong>{" "}
              Examples are identified as examples. Customer outcomes and
              testimonials are only published when they are attributable and
              approved.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-ink mb-4">What we believe</h2>
          <ul className="space-y-4 text-neutral-600 leading-relaxed">
            <li><strong className="text-ink">Execution over reporting:</strong> insight has value only when it becomes safe, measurable work.</li>
            <li><strong className="text-ink">Transparency over black boxes:</strong> every proposed action should include evidence and reasoning.</li>
            <li><strong className="text-ink">Control over blind autonomy:</strong> sensitive changes need approval, logs, and rollback.</li>
          </ul>
        </section>
      </div>
      <Footer />
    </main>
  )
}
