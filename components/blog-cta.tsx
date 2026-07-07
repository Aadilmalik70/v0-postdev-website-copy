"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"

interface BlogCtaProps {
  tags: string[]
  slug: string
  placement?: "middle" | "end"
}

export function BlogCta({ tags, slug, placement = "middle" }: BlogCtaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Normalize tags for matching
  const normalizedTags = tags.map((t) => t.toLowerCase())

  // Determine variant based on article tags
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

  // Define dynamic content based on variant
  const content = {
    geo: {
      badge: "AI Search Visibility",
      title: "Is your site optimized for the AI search era?",
      description: "Most sites are completely invisible to LLM crawlers. Get a free, comprehensive AI Search Visibility & GEO Assessment to see how ChatGPT, Claude, and Perplexity cite your brand, and receive a step-by-step roadmap to capture AI search share.",
      primaryText: "Request GEO Assessment",
      secondaryText: "See Product Demo",
      secondaryHref: "/demo",
      points: [
        "Live citation share report (ChatGPT, Claude, Perplexity)",
        "Content formatting audit for LLM extraction",
        "3 high-impact GEO actions you can run today",
      ],
    },
    technical: {
      badge: "Technical SEO & Schema",
      title: "Eliminate search indexation and schema bottlenecks",
      description: "Search engines can't rank what they can't crawl and parse. Request a Technical SEO & Schema Markup Audit—we will scan your site for structured data errors, indexation leaks, and crawl-budget waste, and deliver ready-to-deploy code fixes.",
      primaryText: "Request Technical Audit",
      secondaryText: "View Integrations",
      secondaryHref: "/integrations",
      points: [
        "Full JSON-LD schema validation scan",
        "Indexation barrier identification report",
        "Clean, ready-to-copy code snippets for site fixes",
      ],
    },
    strategy: {
      badge: "Organic Growth Strategy",
      title: "Deploy an autonomous operator to scale your search traffic",
      description: "Stop manually managing complex SEO tasks. Request a tailored Organic Growth & Competitor Assessment—we'll perform a deep keyword gap analysis against your top 3 competitors and show you how an AI operator can execute approved SEO fixes on autopilot.",
      primaryText: "Request SEO Assessment",
      secondaryText: "View Pricing & Plans",
      secondaryHref: "/pricing",
      points: [
        "Keyword gap audit vs. top 3 competitors",
        "Estimated traffic opportunity calculation",
        "30-day autopilot execution plan",
      ],
    },
  }[variant]

  // Tweak title for the end of the article to feel like a logical next step
  const displayTitle =
    placement === "end"
      ? `Done reading? ${content.title.charAt(0).toLowerCase()}${content.title.slice(1)}`
      : content.title

  const handlePrimaryClick = () => {
    setIsModalOpen(true)
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      ;(window as any).gtag("event", "cta_click", {
        cta_placement: placement,
        cta_variant: variant,
        cta_text: content.primaryText,
        article_slug: slug,
      })
    }
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
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 hover:text-warmwhite transition-colors"
          >
            {content.secondaryText}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
