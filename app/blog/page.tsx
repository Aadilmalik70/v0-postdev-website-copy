import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Blog — SERP Strategist | AI SEO & GEO Insights",
  description: "Learn about autonomous SEO, GEO optimization, AI search ranking strategies, and how to grow organic traffic with AI agents.",
  openGraph: {
    title: "Blog — SERP Strategist",
    description: "AI SEO & GEO insights to grow your organic traffic.",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-16">
          <Link href="/" className="text-[#22c55e] text-sm font-mono mb-4 inline-block hover:underline">
            ← Back to home
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-[#ececec] mb-4 tracking-[-0.02em]">
            Blog
          </h1>
          <p className="text-[#888888] text-lg">
            AI SEO strategies, GEO optimization guides, and growth insights.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 border border-[#222222] rounded-2xl bg-[#0a0a0a]">
            <p className="text-[#888888] text-lg">Posts coming soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="border border-[#1a1a1a] rounded-2xl p-8 bg-[#0a0a0a] hover:border-[#22c55e]/30 hover:bg-[#111111] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-xs font-mono text-[#666666]">
                      {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    <span className="text-[#333333]">·</span>
                    <span className="text-xs font-mono text-[#666666]">{post.readingTime}</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-medium text-[#ececec] group-hover:text-[#22c55e] transition-colors mb-3">
                    {post.title}
                  </h2>

                  <p className="text-[#888888] text-base leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 rounded-md bg-[#141414] text-[#888888] border border-[#222222]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
