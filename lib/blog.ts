import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
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
  const stats = readingTime(content)

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    author: data.author || "SERP Strategists",
    tags: data.tags || [],
    readingTime: stats.text,
    content,
    image: data.image || null,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getRelatedPosts(currentSlug: string, currentTags: string[], limit = 3): BlogPost[] {
  // getAllPosts() returns posts sorted by date descending; filter maintains that order
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug)
  
  // Score posts by number of matching tags
  const scoredPosts = allPosts.map((post) => {
    const matchingTags = post.tags.filter((tag) => currentTags.includes(tag)).length
    return { post, score: matchingTags }
  })
  
  // Filter out posts with no matching tags to ensure relevance
  const relevantPosts = scoredPosts.filter((item) => item.score > 0)
  
  // Sort by score (descending), then by date (descending)
  relevantPosts.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
  })
  
  // If we have relevant posts, return them; otherwise return recent posts
  if (relevantPosts.length > 0) {
    return relevantPosts.slice(0, limit).map((item) => item.post)
  }
  
  // Fallback to most recent posts if no tag matches (getAllPosts() already returns date-sorted posts)
  return allPosts.slice(0, limit)
}
