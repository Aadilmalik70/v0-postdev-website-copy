import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { groupPostsByCluster, isFeaturedBlogCluster } from "@/lib/blog-taxonomy"
import { buildMarketingMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI SEO & GEO Guides for Search Growth",
  description:
    "Practical AI SEO, GEO, technical SEO, content, and AI visibility guides for founders and growth teams building compounding organic search systems.",
  pathname: "/blog",
})

const POSTS_PER_CLUSTER = 2

function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allClusters = groupPostsByCluster(posts)
  const featuredClusters = allClusters.filter(isFeaturedBlogCluster)
  const clusters = allClusters.filter((cluster) => !isFeaturedBlogCluster(cluster))

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-16">
          <Link href="/" className="text-[#00d084] text-sm font-mono mb-4 inline-block hover:underline">
            &larr; Back to home
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-ink mb-4 tracking-[-0.02em]">
            AI SEO and GEO Blog
          </h1>
          <div className="text-neutral-600 text-lg space-y-4 max-w-3xl">
            <p>
              Evidence-led guides to AI SEO tools, SERP intelligence, technical SEO systems, and search visibility.
              Each article separates verified observations, official documentation, practical frameworks, and product limitations.
            </p>
            <p>
              Start with one of the three priority knowledge paths below. AI SEO Tools helps you choose software.
              SERP Intelligence helps you inspect and interpret the result page. AI SEO Automation helps you govern the workflow from evidence to measurement.
            </p>
            <p className="text-lg">
              Browse the latest posts from each cluster below, or jump to a specific topic using the cluster navigation.
            </p>
          </div>
        </div>

        <section className="mb-16" aria-labelledby="priority-clusters">
          <div className="mb-6">
            <p className="text-[#00d084] text-xs font-mono uppercase tracking-[0.2em] mb-3">Priority knowledge paths</p>
            <h2 id="priority-clusters" className="text-2xl md:text-3xl font-medium text-ink mb-2">
              Begin with the pillar, then answer the next decision
            </h2>
            <p className="text-neutral-600 text-base max-w-3xl">
              Each supporting guide has one distinct intent and links back to its pillar. Cross-cluster links appear only where the workflow genuinely hands off.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredClusters.map((cluster) => {
              const pillar = cluster.posts.find((post) => post.slug === cluster.pillarSlug)
              const pillarHref = pillar ? `/blog/${pillar.slug}` : cluster.pillarHref
              const pillarTitle = pillar?.title ?? cluster.pillarTitle
              const supportingPosts = cluster.posts.filter((post) => post.slug !== cluster.pillarSlug)

              if (!pillarHref || !pillarTitle) return null

              return (
                <article key={cluster.id} className="border border-line rounded-2xl p-8 bg-card">
                  <p className="text-[#00d084] text-xs font-mono uppercase tracking-[0.2em] mb-3">
                    {cluster.title} pillar
                  </p>
                  <h3 className="text-2xl font-medium text-ink mb-3">
                    <Link href={pillarHref} className="hover:text-[#00d084] transition-colors">
                      {pillarTitle}
                    </Link>
                  </h3>
                  <p className="text-neutral-600 text-base leading-relaxed mb-5">{cluster.description}</p>
                  <Link
                    href={pillarHref}
                    className="inline-flex text-sm font-mono px-4 py-2 rounded-full border border-[#00d084]/30 bg-surface text-ink hover:bg-paper"
                  >
                    Read the pillar
                  </Link>

                  <div className="mt-7 pt-6 border-t border-line">
                    <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-600 mb-3">
                      {supportingPosts.length} supporting guides
                    </p>
                    <ul className="space-y-3">
                      {supportingPosts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm text-ink hover:text-[#00d084] transition-colors"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
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
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <time className="text-xs font-mono text-neutral-600">
                            Published {formatBlogDate(post.date)}
                          </time>
                          {post.dateModified && post.dateModified !== post.date ? (
                            <time className="text-xs font-mono text-neutral-600">
                              Updated {formatBlogDate(post.dateModified)}
                            </time>
                          ) : null}
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
      <Footer />
    </main>
  )
}
