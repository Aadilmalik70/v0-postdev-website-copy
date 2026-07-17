export interface BlogOverride {
  title?: string
  seoTitle?: string
  description?: string
  dateModified?: string
  relatedSlugs?: string[]
  contentPrefix?: string
  contentSuffix?: string
}

const aiToolsComparisonUrl = "/blog/top-seo-analysis-tools-2025-best-seo-ai-tool"

const aiToolsInternalLink = `

---

## Compare the best AI SEO tools for 2026

Choosing between SEO platforms, content optimizers, AI visibility trackers, and execution tools? Read [Best AI SEO Tools in 2026: 12 Tools Compared](${aiToolsComparisonUrl}) for a use-case comparison covering pricing models, strengths, limitations, and the best fit for SaaS teams.
`

const aiVisibilityScorecardInternalLink = `

---

## Measure AI visibility with a repeatable scorecard

Do not rely on isolated screenshots or an unexplained visibility percentage. Use the [AI Visibility Scorecard Template](/blog/ai-visibility-scorecard-template) to track a stable prompt panel, mentions, citations, answer accuracy, Google generative-AI impressions, referral outcomes, and the exact changes shipped between measurement periods. The guide includes three downloadable CSV templates.
`

const operatorCategoryInternalLink = `

---

## From search insight to shipped execution

SEO platforms and AI assistants can surface opportunities, but the work still needs prioritization, approval, execution, validation, and measurement. See how the [SERP Strategists AI Growth Operator](/#ai-growth-operator) turns search data into governed, reviewable actions instead of another reporting backlog.
`

export const BLOG_OVERRIDES: Record<string, BlogOverride> = {
  "top-seo-analysis-tools-2025-best-seo-ai-tool": {
    relatedSlugs: [
      "ai-seo-tools-pricing-comparison-2026",
      "best-serp-analyzer-tools-2026",
      "how-to-do-seo-competitive-benchmarking-2026",
    ],
    contentSuffix: operatorCategoryInternalLink,
  },
  "what-is-geo-optimization": {
    title: "What Is GEO Optimization? 2026 Guide",
    description:
      "Learn how generative engine optimization improves brand visibility and citations across AI answers, with practical content, entity, and source strategies.",
  },
  "schema-markup-seo-guide": {
    title: "Schema Markup SEO Guide with Examples",
    description:
      "Learn which schema markup types matter for SEO, how to add JSON-LD, validate structured data, and avoid common implementation mistakes.",
  },
  "ai-seo-agent-vs-agency": {
    title: "AI SEO Agent vs Agency: 2026 Guide",
    description:
      "Compare AI SEO agents and agencies across cost, speed, expertise, control, approvals, execution quality, measurement, and the best use cases for each.",
    contentSuffix: `${aiToolsInternalLink}${operatorCategoryInternalLink}`,
  },
  "agentic-web-seo": {
    title: "Agentic SEO: AI Agents for Search Growth",
    description:
      "See how agentic SEO systems observe search data, prioritize opportunities, execute approved actions, and measure organic and AI-search outcomes.",
    contentSuffix: `${aiToolsInternalLink}${operatorCategoryInternalLink}`,
  },
  "google-ai-overviews-guide": {
    title: "Google AI Overviews SEO Guide",
    description:
      "Learn how to improve eligibility and visibility in Google AI Overviews using crawlable pages, helpful content, internal links, entities, and trusted sources.",
    relatedSlugs: [
      "ai-visibility-scorecard-template",
      "generative-engine-optimization-geo-guide",
      "perplexity-ai-seo",
    ],
    contentSuffix: aiVisibilityScorecardInternalLink,
  },
  "best-serp-analyzer-tools-2026": {
    contentSuffix: `${aiToolsInternalLink}${operatorCategoryInternalLink}`,
  },
  "ai-seo-tools-pricing-comparison-2026": {
    contentSuffix: `${aiToolsInternalLink}${operatorCategoryInternalLink}`,
  },
  "operationalizing-seo-saas-autonomous-growth": {
    contentSuffix: `${aiToolsInternalLink}${operatorCategoryInternalLink}`,
  },
  "generative-engine-optimization-geo-guide": {
    relatedSlugs: [
      "ai-visibility-scorecard-template",
      "google-ai-overviews-guide",
      "perplexity-ai-seo",
    ],
    contentSuffix: `${aiVisibilityScorecardInternalLink}${operatorCategoryInternalLink}`,
  },
  "perplexity-ai-seo": {
    relatedSlugs: [
      "ai-visibility-scorecard-template",
      "generative-engine-optimization-geo-guide",
      "google-ai-overviews-guide",
    ],
    contentSuffix: `${aiVisibilityScorecardInternalLink}${operatorCategoryInternalLink}`,
  },
}

export function getBlogOverride(slug: string): BlogOverride | undefined {
  return BLOG_OVERRIDES[slug]
}
