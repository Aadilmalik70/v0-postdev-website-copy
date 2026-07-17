import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { getBlogOverride } from "@/lib/blog-overrides"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  seoTitle?: string
  description: string
  date: string
  dateModified?: string
  author: string
  tags: string[]
  relatedSlugs?: string[]
  readingTime: string
  content: string
  image?: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    return getPostBySlug(slug)
  }).filter(Boolean) as BlogPost[]

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)
  const override = getBlogOverride(slug)
  const resolvedContent = [override?.contentPrefix, content, override?.contentSuffix]
    .filter((part): part is string => Boolean(part?.trim()))
    .join("\n\n")
  const stats = readingTime(resolvedContent)
  const fileModified = fs.statSync(filePath).mtime.toISOString()

  return {
    slug,
    title: override?.title || data.title || slug,
    seoTitle: override?.seoTitle || data.seoTitle || undefined,
    description: override?.description || data.description || "",
    date: data.date || new Date().toISOString(),
    dateModified: override?.dateModified || data.dateModified || fileModified,
    author: data.author || "SERP Strategists",
    tags: data.tags || [],
    relatedSlugs: override?.relatedSlugs || (Array.isArray(data.relatedSlugs)
      ? data.relatedSlugs.filter((value): value is string => typeof value === "string")
      : undefined),
    readingTime: stats.text,
    content: resolvedContent,
    image: data.image || undefined,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

/**
 * Get related blog posts. Explicit frontmatter or override relationships are
 * returned first, then tag-based matches fill any remaining slots.
 */
export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  limit = 3,
  relatedSlugs: string[] = [],
): BlogPost[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug)
  const postsBySlug = new Map(allPosts.map((post) => [post.slug, post]))
  const configuredSlugs = relatedSlugs.length > 0
    ? relatedSlugs
    : getPostBySlug(currentSlug)?.relatedSlugs ?? []

  const explicitPosts = configuredSlugs
    .map((slug) => postsBySlug.get(slug))
    .filter((post): post is BlogPost => Boolean(post))
    .slice(0, limit)

  if (explicitPosts.length >= limit) return explicitPosts

  const explicitSlugSet = new Set(explicitPosts.map((post) => post.slug))
  const scoredPosts = allPosts
    .filter((post) => !explicitSlugSet.has(post.slug))
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => currentTags.includes(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })

  const tagMatches = scoredPosts
    .slice(0, limit - explicitPosts.length)
    .map((item) => item.post)

  const combined = [...explicitPosts, ...tagMatches]
  if (combined.length >= limit) return combined

  const selectedSlugs = new Set(combined.map((post) => post.slug))
  const recentFallback = allPosts
    .filter((post) => !selectedSlugs.has(post.slug))
    .slice(0, limit - combined.length)

  return [...combined, ...recentFallback]
}
