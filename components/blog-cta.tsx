"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"
import { trackEvent } from "@/lib/analytics"

interface BlogCtaProps {
  tags: string[]
  slug: string
  placement?: "middle" | "end"
}

export function BlogCta({ tags, slug, placement = "middle" }: BlogCtaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const normalizedTags = tags.map((tag) => tag.toLowerCase())

  let variant: "geo" | "technical" | "strategy" = "strategy"

  if (
    normalizedTags.includes("geo") ||
    normalizedTags.includes("perplexity") ||
    normalizedTags.includes("ai search") ||
    normalizedTags.includes("llm visibility")
  ) {
    variant = "geo"
  } else if (
    normalizedTags.includes("schema") ||
    normalizedTags.includes("technical seo") ||
    normalizedTags.includes("indexation") ||
    normalizedTags.includes("core web vitals")
  ) {
    variant = "technical"
  }

  const content = {
    geo: {
      badge: "AI Search Readiness",
      title: "Check the technical foundation before chasing AI citations",
      description: "Run a free homepage Growth Audit to review crawl access, metadata, canonical, structured data, robots.txt, and sitemap signals. The public audit is a snapshot—not a live citation-share report or full-site crawl.",
      primaryText: "Run Free Growth Audit",
      secondaryText: "Read the GEO Guide",
      secondaryHref: "/blog/generative-engine-optimization-geo-guide",
      secondaryDestination: "operator" as const,
      points: [
        "Homepage crawl and indexing signals",
        "Visible metadata and structured-data checks",
        "Prioritized findings with honest scope",
      ],
    },
    technical: {
      badge: "Technical SEO Snapshot",
      title: "Find the first crawl and indexability blockers",
      description: "The free Growth Audit checks the submitted homepage, robots.txt, and sitemap for a bounded set of technical signals. Full authenticated crawling and governed actions belong to the operator product.",
      primaryText: "Run Free Growth Audit",
      secondaryText: "View Integrations",
      secondaryHref: "/integrations",
      secondaryDestination: "integrations" as const,
      points: [
        "Homepage status, title, canonical, and directives",
        "robots.txt and sitemap availability",
        "Severity summary and prioritized findings",
      ],
    },
    strategy: {
      badge: "Governed SEO Automation",
      title: "Turn the first audit into a controlled next action",
      description: "Start with a transparent homepage snapshot, then review how evidence, scoring, approval, simulation, validation, and measurement fit together. The audit does not modify your site or activate paid execution.",
      primaryText: "Run Free Growth Audit",
      secondaryText: "Explore AI SEO Automation",
      secondaryHref: "/ai-seo-automation",
      secondaryDestination: "operator" as const,
      points: [
        "Bounded homepage and technical snapshot",
        "Prioritized findings with visible evidence",
        "No automatic external changes",
      ],
    },
  }[variant]

  const displayTitle =
    placement === "end"
      ? `Done reading? ${content.title.charAt(0).toLowerCase()}${content.title.slice(1)}`
      : content.title

  function handlePrimaryClick() {
    trackEvent("blog_product_cta_click", {
      article_slug: slug,
      cta_placement: placement,
      cta_variant: variant,
      destination_type: "audit_modal",
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="my-10 rounded-2xl bg-graphite-950 border border-graphite-line p-6 md:p-8 text-left relative overflow-hidden shadow-xl not-prose">
        <span className="operator-scanline absolute top-0 left-0 h-px w-1/4 bg-signal-bright/40" />

        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-signal-bright mb-4 inline-block px-2.5 py-1 rounded border border-signal-bright/20 bg-signal-bright/5">
          {content.badge}
        </span>

        <h3 className="font-display text-xl sm:text-2xl font-semibold text-warmwhite mb-3">
          {displayTitle}
        </h3>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
          {content.description}
        </p>

        <ul className="grid gap-3 sm:grid-cols-3 mb-6 border-t border-graphite-line/50 pt-5">
          {content.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-xs text-neutral-400">
              <CheckCircle className="w-4 h-4 text-signal-bright shrink-0 mt-0.5" strokeWidth={2.5} />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handlePrimaryClick}
            className="btn-ink !bg-signal-bright !text-graphite-950 hover:!bg-[#00e591] px-5 py-2.5 text-sm font-semibold cursor-pointer rounded-full flex items-center gap-2 transition-all duration-200"
          >
            {content.primaryText}
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href={content.secondaryHref}
            data-analytics-handled="true"
            onClick={() =>
              trackEvent("blog_product_cta_click", {
                article_slug: slug,
                cta_placement: placement,
                cta_variant: variant,
                destination_type: content.secondaryDestination,
              })
            }
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 hover:text-warmwhite transition-colors"
          >
            {content.secondaryText}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadSource={`blog_${variant}`}
        ctaPlacement={`blog_${placement}`}
        articleSlug={slug}
      />
    </>
  )
}
