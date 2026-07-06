import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { buildMarketingMetadata } from "@/lib/site-seo";
import { combineSchemas, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMarketingMetadata({
  title: "About SERP Strategists | AI Growth Operator",
  description:
    "Learn how SERP Strategists is building an AI Growth Operator that replaces manual audits, fixes, and SEO busywork with governed autonomous execution.",
  pathname: "/about",
});

const jsonLd = combineSchemas(
  {"@context":"https://schema.org","@type":"AboutPage","name":"About SERP Strategists","description":"Learn about our mission to make autonomous SEO accessible to everyone.","url":"https://serpstrategists.com/about","mainEntity":{"@type":"Organization","name":"SERP Strategists","url":"https://serpstrategists.com"}},
  getBreadcrumbSchema([
    { name: "Home", url: "https://serpstrategists.com" },
    { name: "About", url: "https://serpstrategists.com/about" },
  ])
);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="text-signal hover:text-signal text-sm mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-4xl font-semibold text-ink mb-6">
          About SERP Strategists
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-ink mb-4">
            Our Mission
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We believe every business deserves access to expert-level SEO — without
            the agency price tag. SERP Strategists is an autonomous AI agent that
            continuously monitors, analyzes, and optimizes your site&apos;s search
            performance so you can focus on what you do best: building your product.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Our mission is simple: make autonomous SEO accessible to everyone — from
            solo founders to growing teams — by replacing manual audits and
            guesswork with intelligent, always-on optimization.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-ink mb-4">
            Our Story
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            SERP Strategists was born out of frustration. As developers and founders,
            we spent years watching businesses overpay for SEO agencies that
            delivered spreadsheets of recommendations but never actually fixed
            anything. The reports were expensive, the timelines were slow, and the
            results were inconsistent.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We asked ourselves: what if an AI agent could do the entire loop —
            crawl, detect issues, plan fixes, execute changes, and measure
            results — automatically, around the clock, at a fraction of the cost?
          </p>
          <p className="text-neutral-600 leading-relaxed">
            That question became SERP Strategists. We built the tool we wished
            existed: one that doesn&apos;t just tell you what&apos;s wrong, but
            actually fixes it — with your approval, on your terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-ink mb-4">
            What We Believe In
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-ink mb-2">
                Automation Over Busywork
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                SEO shouldn&apos;t require a team of consultants clicking through
                dashboards. If a machine can do it better and faster, it should.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-ink mb-2">
                Transparency Always
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Every action our agent takes is logged, explained, and reversible.
                You see exactly what changed, why it changed, and what impact it
                had. No black boxes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-ink mb-2">
                Results-Driven
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                We measure success by your organic traffic growth — not by the
                number of reports generated. If rankings aren&apos;t improving,
                we&apos;re not doing our job.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
