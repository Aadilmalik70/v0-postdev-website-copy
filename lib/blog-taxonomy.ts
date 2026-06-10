import type { BlogPost } from "./blog"

export interface BlogCluster {
  id: string
  title: string
  description: string
  posts: BlogPost[]
}

const CLUSTERS = [
  {
    id: "ai-seo-tools-and-serp-strategy",
    title: "AI SEO Tools and SERP Strategy",
    description: "Commercial-intent guides for AI SEO tools, competitive benchmarking, brand SERP optimization, and practical strategy.",
  },
  {
    id: "geo-and-ai-search",
    title: "GEO and AI Search",
    description: "Guides for ranking in AI Overviews, ChatGPT, Perplexity, and other generative search surfaces.",
  },
  {
    id: "technical-seo-systems",
    title: "Technical SEO Systems",
    description: "Technical fixes, schema, site health, internal linking, and infrastructure patterns that improve crawlability and rankings.",
  },
  {
    id: "content-and-growth-strategy",
    title: "Content and Growth Strategy",
    description: "Content planning, authority building, and growth playbooks for compounding organic traffic.",
  },
] as const

function normalize(values: string[]): string {
  return values.join(" ").toLowerCase()
}

function getClusterId(post: BlogPost): (typeof CLUSTERS)[number]["id"] {
  const haystack = normalize([post.title, ...post.tags])

  if (/(ai seo tool|competitive benchmarking|brand serp|serp strategy|seo strategist|tool stack|analysis tools)/.test(haystack)) {
    return "ai-seo-tools-and-serp-strategy"
  }

  if (/(geo|ai search|perplexity|ai overview|generative engine optimization|chatgpt|gemini)/.test(haystack)) {
    return "geo-and-ai-search"
  }

  if (/(technical seo|schema|core web vitals|cannibalization|internal linking|site health|crawl)/.test(haystack)) {
    return "technical-seo-systems"
  }

  return "content-and-growth-strategy"
}

export function groupPostsByCluster(posts: BlogPost[]): BlogCluster[] {
  return CLUSTERS.map((cluster) => ({
    ...cluster,
    posts: posts.filter((post) => getClusterId(post) === cluster.id),
  })).filter((cluster) => cluster.posts.length > 0)
}