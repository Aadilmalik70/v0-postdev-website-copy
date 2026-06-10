import test from "node:test"
import assert from "node:assert/strict"

import { buildCanonicalUrl, getHomepageSeoCopy } from "../lib/site-seo.ts"
import { groupPostsByCluster } from "../lib/blog-taxonomy.ts"

test("buildCanonicalUrl normalizes root and nested paths", () => {
  assert.equal(buildCanonicalUrl("/"), "https://serpstrategists.com")
  assert.equal(buildCanonicalUrl("/blog/generative-engine-optimization-geo-guide"), "https://serpstrategists.com/blog/generative-engine-optimization-geo-guide")
})

test("homepage SEO copy leads with the primary commercial intent", () => {
  const copy = getHomepageSeoCopy()

  assert.match(copy.title, /^AI SEO Agent/i)
  assert.match(copy.h1, /^AI SEO Agent/i)
  assert.match(copy.description, /AI SEO agent software/i)
})

test("groupPostsByCluster groups related SEO content under explicit clusters", () => {
  const grouped = groupPostsByCluster([
    {
      slug: "what-is-geo-optimization",
      title: "What is GEO? Generative Engine Optimization Explained",
      description: "",
      date: "2026-06-08",
      author: "SERP Strategist",
      tags: ["GEO", "AI Search", "SEO Strategy"],
      readingTime: "6 min read",
      content: "",
    },
    {
      slug: "top-seo-analysis-tools-2025-best-seo-ai-tool",
      title: "Top AI SEO Analysis Tools for Competitive Benchmarking in 2025",
      description: "",
      date: "2026-06-10",
      author: "SERP Strategist",
      tags: ["AI SEO Tools", "Competitive Benchmarking", "SERP Strategy"],
      readingTime: "8 min read",
      content: "",
    },
    {
      slug: "keyword-cannibalization-fix",
      title: "Keyword Cannibalization Fix",
      description: "",
      date: "2026-05-22",
      author: "SERP Strategist",
      tags: ["Technical SEO"],
      readingTime: "5 min read",
      content: "",
    },
  ])

  assert.equal(grouped.length, 3)
  assert.equal(grouped[0]?.id, "ai-seo-tools-and-serp-strategy")
  assert.equal(grouped[0]?.posts.length, 1)
  assert.equal(grouped[1]?.id, "geo-and-ai-search")
  assert.equal(grouped[0]?.posts.length, 1)
  assert.equal(grouped[2]?.id, "technical-seo-systems")
})