import type { BlogPost } from "./blog"

export interface BlogCluster {
  id: string
  title: string
  description: string
  featured: boolean
  pillarSlug?: string
  supportingSlugs: string[]
  posts: BlogPost[]
}

type BlogClusterDefinition = Omit<BlogCluster, "posts">

const CLUSTERS: BlogClusterDefinition[] = [
  {
    id: "ai-seo-tools",
    title: "AI SEO Tools",
    description:
      "Choose an AI SEO stack by operating constraint, total cost, evidence quality, governance, and measurable value.",
    featured: true,
    pillarSlug: "top-seo-analysis-tools-2025-best-seo-ai-tool",
    supportingSlugs: [
      "are-ai-seo-tools-worth-it",
      "ai-seo-tools-pricing-comparison-2026",
      "seo-ranking-tool-guide-what-actually-matters",
      "ai-seo-agent-vs-agency",
      "ai-seo-tools-vs-serp-analyzers",
    ],
  },
  {
    id: "serp-intelligence",
    title: "SERP Intelligence",
    description:
      "Inspect a result page, understand intent and SERP features, diagnose competitor gaps, and measure the action over time.",
    featured: true,
    pillarSlug: "serp-competitor-analysis-guide",
    supportingSlugs: [
      "serp-analysis-template",
      "best-serp-analyzer-tools-2026",
      "search-intent-analysis-guide",
      "serp-feature-analysis-guide",
      "competitor-content-gap-analysis",
      "how-to-do-seo-competitive-benchmarking-2026",
    ],
  },
  {
    id: "geo-and-ai-search",
    title: "GEO and AI Search",
    description: "Guides for measuring and improving visibility across generative search surfaces.",
    featured: false,
    supportingSlugs: [],
  },
  {
    id: "technical-seo-systems",
    title: "Technical SEO Systems",
    description: "Technical fixes, schema, site health, internal linking, and infrastructure patterns that improve crawlability and rankings.",
    featured: false,
    supportingSlugs: [],
  },
  {
    id: "content-and-growth-strategy",
    title: "Content and Growth Strategy",
    description: "Content planning, authority building, and growth playbooks for compounding organic traffic.",
    featured: false,
    supportingSlugs: [],
  },
]

const CLUSTER_BY_SLUG = new Map(
  CLUSTERS.flatMap((cluster) => {
    const slugs = cluster.pillarSlug
      ? [cluster.pillarSlug, ...cluster.supportingSlugs]
      : cluster.supportingSlugs

    return slugs.map((slug) => [slug, cluster.id] as const)
  }),
)

function normalize(values: string[]): string {
  return values.join(" ").toLowerCase()
}

function getClusterId(post: BlogPost): BlogClusterDefinition["id"] {
  const explicitCluster = CLUSTER_BY_SLUG.get(post.slug)
  if (explicitCluster) return explicitCluster

  const haystack = normalize([post.title, ...post.tags])

  if (/(ai seo tool|ai seo software|seo ranking tool|ai seo agent)/.test(haystack)) {
    return "ai-seo-tools"
  }

  if (/(serp analyzer|serp analysis|serp competitor|serp feature|search intent|competitive benchmarking|competitor content gap)/.test(haystack)) {
    return "serp-intelligence"
  }

  if (/(geo|ai search|perplexity|ai overview|generative engine optimization|chatgpt|gemini)/.test(haystack)) {
    return "geo-and-ai-search"
  }

  if (/(technical seo|schema|core web vitals|cannibalization|internal linking|site health|crawl)/.test(haystack)) {
    return "technical-seo-systems"
  }

  return "content-and-growth-strategy"
}

function orderClusterPosts(cluster: BlogClusterDefinition, posts: BlogPost[]): BlogPost[] {
  const configuredOrder = [cluster.pillarSlug, ...cluster.supportingSlugs]
    .filter((slug): slug is string => Boolean(slug))
  const orderBySlug = new Map(configuredOrder.map((slug, index) => [slug, index]))

  return [...posts].sort((a, b) => {
    const aOrder = orderBySlug.get(a.slug)
    const bOrder = orderBySlug.get(b.slug)

    if (aOrder !== undefined || bOrder !== undefined) {
      return (aOrder ?? Number.MAX_SAFE_INTEGER) - (bOrder ?? Number.MAX_SAFE_INTEGER)
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function groupPostsByCluster(posts: BlogPost[]): BlogCluster[] {
  return CLUSTERS.map((cluster) => ({
    ...cluster,
    posts: orderClusterPosts(
      cluster,
      posts.filter((post) => getClusterId(post) === cluster.id),
    ),
  })).filter((cluster) => cluster.posts.length > 0)
}

export function isFeaturedBlogCluster(cluster: BlogCluster): boolean {
  return cluster.featured
}
