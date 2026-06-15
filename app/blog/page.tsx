import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { groupPostsByCluster } from "@/lib/blog-taxonomy"
import { buildMarketingMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI SEO Agent Blog | SERP Strategists",
  description: "Browse clustered guides on GEO, technical SEO systems, and content strategy for compounding organic growth.",
  pathname: "/blog",
})

const POSTS_PER_CLUSTER = 2

export default function BlogPage() {
  const posts = getAllPosts()
  const clusters = groupPostsByCluster(posts)

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-16">
          <Link href="/" className="text-[#00d084] text-sm font-mono mb-4 inline-block hover:underline">
            ← Back to home
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-ink mb-4 tracking-[-0.02em]">
            Blog
          </h1>
          <div className="text-neutral-600 text-lg space-y-4 max-w-3xl">
            <p>
              Deep dives into AI search optimization, technical SEO systems, and content strategy for compounding organic growth. 
              Every article is written from hands-on experience building and scaling search visibility across Google, ChatGPT, Perplexity, and emerging AI search engines.
            </p>
            <p>
              Posts are organized into strategic clusters covering GEO (Generative Engine Optimization), technical SEO implementation, 
              AI search visibility measurement, competitive analysis methodologies, and the evolving landscape of zero-click searches. 
              Whether you're a founder building your first SEO system or a practitioner optimizing for AI citations, you'll find actionable 
              frameworks backed by real data.
            </p>
            <p className="text-base">
              Browse the latest posts from each cluster below, or jump to a specific topic using the cluster navigation.
            </p>
          </div>
        </div>

        <section className="mb-12 border border-line rounded-2xl p-8 bg-card">
          <p className="text-[#00d084] text-xs font-mono uppercase tracking-[0.2em] mb-3">Featured cluster</p>
          <h2 className="text-2xl md:text-3xl font-medium text-ink mb-3">AI SEO tools and competitive benchmarking</h2>
          <p className="text-neutral-600 text-base leading-relaxed mb-5 max-w-3xl">
            Start with the broad tools comparison, then move into the narrower SERP analyzer, pricing, and methodology guides if you are building a commercial SEO software stack.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/top-seo-analysis-tools-2025-best-seo-ai-tool" className="text-sm font-mono px-4 py-2 rounded-full border border-[#00d084]/30 text-ink hover:bg-surface">
              Top AI SEO analysis tools
            </Link>
            <Link href="/blog/best-serp-analyzer-tools-2026" className="text-sm font-mono px-4 py-2 rounded-full border border-line text-neutral-600 hover:border-[#00d084]/30 hover:text-ink">
              Best SERP analyzer tools
            </Link>
            <Link href="/blog/ai-seo-tools-pricing-comparison-2026" className="text-sm font-mono px-4 py-2 rounded-full border border-line text-neutral-600 hover:border-[#00d084]/30 hover:text-ink">
              Pricing comparison
            </Link>
            <Link href="/blog/how-to-do-seo-competitive-benchmarking-2026" className="text-sm font-mono px-4 py-2 rounded-full border border-line text-neutral-600 hover:border-[#00d084]/30 hover:text-ink">
              Benchmarking method
            </Link>
          </div>
        </section>

        {posts.length === 0 ? (
          <div className="text-center py-20 border border-line rounded-2xl bg-card">
            <p className="text-neutral-600 text-lg">Posts coming soon.</p>
          </div>
        ) : (
          <div className="space-y-14">
            <div className="flex flex-wrap gap-3">
              {clusters.map((cluster) => (
                <Link
                  key={cluster.id}
                  href={`#${cluster.id}`}
                  className="text-xs font-mono px-3 py-2 rounded-full border border-line bg-card text-neutral-600 hover:border-[#00d084]/30 hover:text-ink"
                >
                  {cluster.title}
                </Link>
              ))}
            </div>

            {clusters.map((cluster) => (
              <section key={cluster.id} id={cluster.id} className="scroll-mt-28">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-medium text-ink mb-2">{cluster.title}</h2>
                    <p className="text-neutral-600 text-base">{cluster.description}</p>
                  </div>
                  {cluster.posts.length > POSTS_PER_CLUSTER ? (
                    <p className="text-xs font-mono text-neutral-600">
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
                      <article className="border border-line rounded-2xl p-8 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <time className="text-xs font-mono text-neutral-600">
                            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </time>
                          <span className="text-neutral-600">·</span>
                          <span className="text-xs font-mono text-neutral-600">{post.readingTime}</span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-medium text-ink group-hover:text-[#00d084] transition-colors mb-3">
                          {post.title}
                        </h3>

                        <p className="text-neutral-600 text-base leading-relaxed mb-4">
                          {post.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-2 py-1 rounded-md bg-surface text-neutral-600 border border-line"
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
