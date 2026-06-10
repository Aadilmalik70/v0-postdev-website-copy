import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { groupPostsByCluster } from "@/lib/blog-taxonomy"
import { buildMarketingMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI SEO Agent Blog | SERP Strategist",
  description: "Browse clustered guides on GEO, technical SEO systems, and content strategy for compounding organic growth.",
  pathname: "/blog",
})

const POSTS_PER_CLUSTER = 2

export default function BlogPage() {
  const posts = getAllPosts()
  const clusters = groupPostsByCluster(posts)

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
            Browse the latest posts from each cluster without loading the full archive in one pass.
          </p>
        </div>

        <section className="mb-12 border border-[#1a1a1a] rounded-2xl p-8 bg-[#0a0a0a]">
          <p className="text-[#22c55e] text-xs font-mono uppercase tracking-[0.2em] mb-3">Featured cluster</p>
          <h2 className="text-2xl md:text-3xl font-medium text-[#ececec] mb-3">AI SEO tools and competitive benchmarking</h2>
          <p className="text-[#888888] text-base leading-relaxed mb-5 max-w-3xl">
            Start with the broad tools comparison, then move into the narrower SERP analyzer, pricing, and methodology guides if you are building a commercial SEO software stack.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/top-seo-analysis-tools-2025-best-seo-ai-tool" className="text-sm font-mono px-4 py-2 rounded-full border border-[#22c55e]/30 text-[#ececec] hover:bg-[#111111]">
              Top AI SEO analysis tools
            </Link>
            <Link href="/blog/best-serp-analyzer-tools-2026" className="text-sm font-mono px-4 py-2 rounded-full border border-[#222222] text-[#888888] hover:border-[#22c55e]/30 hover:text-[#ececec]">
              Best SERP analyzer tools
            </Link>
            <Link href="/blog/ai-seo-tools-pricing-comparison-2026" className="text-sm font-mono px-4 py-2 rounded-full border border-[#222222] text-[#888888] hover:border-[#22c55e]/30 hover:text-[#ececec]">
              Pricing comparison
            </Link>
            <Link href="/blog/how-to-do-seo-competitive-benchmarking-2026" className="text-sm font-mono px-4 py-2 rounded-full border border-[#222222] text-[#888888] hover:border-[#22c55e]/30 hover:text-[#ececec]">
              Benchmarking method
            </Link>
          </div>
        </section>

        {posts.length === 0 ? (
          <div className="text-center py-20 border border-[#222222] rounded-2xl bg-[#0a0a0a]">
            <p className="text-[#888888] text-lg">Posts coming soon.</p>
          </div>
        ) : (
          <div className="space-y-14">
            <div className="flex flex-wrap gap-3">
              {clusters.map((cluster) => (
                <Link
                  key={cluster.id}
                  href={`#${cluster.id}`}
                  className="text-xs font-mono px-3 py-2 rounded-full border border-[#222222] bg-[#0a0a0a] text-[#888888] hover:border-[#22c55e]/30 hover:text-[#ececec]"
                >
                  {cluster.title}
                </Link>
              ))}
            </div>

            {clusters.map((cluster) => (
              <section key={cluster.id} id={cluster.id} className="scroll-mt-28">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-medium text-[#ececec] mb-2">{cluster.title}</h2>
                    <p className="text-[#888888] text-base">{cluster.description}</p>
                  </div>
                  {cluster.posts.length > POSTS_PER_CLUSTER ? (
                    <p className="text-xs font-mono text-[#666666]">
                      Showing {POSTS_PER_CLUSTER} of {cluster.posts.length} posts in this cluster.
                    </p>
                  ) : null}
                </div>

                <div className="space-y-6">
                  {cluster.posts.slice(0, POSTS_PER_CLUSTER).map((post) => (
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

                        <h3 className="text-xl md:text-2xl font-medium text-[#ececec] group-hover:text-[#22c55e] transition-colors mb-3">
                          {post.title}
                        </h3>

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
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
