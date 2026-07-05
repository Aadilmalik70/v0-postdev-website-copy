import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { MDXContent } from "./mdx-content"
import { Navbar } from "@/components/navbar"
import { buildMarketingMetadata, buildCanonicalUrl } from "@/lib/site-seo"
import { getArticleSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema"
import { getFAQSchemaForPost } from "@/lib/faq-schemas"

interface Props {
  params: Promise<{ slug: string }>
}

function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value))
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return buildMarketingMetadata({
    title: post.title,
    description: post.description,
    pathname: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.dateModified,
    authors: [post.author],
    tags: post.tags,
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug, post.tags, 3)
  const postUrl = buildCanonicalUrl(`/blog/${slug}`)

  const articleSchema = getArticleSchema({
    headline: post.title,
    description: post.description,
    url: postUrl,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: post.author,
    image: post.image ? buildCanonicalUrl(post.image) : undefined,
    tags: post.tags,
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: buildCanonicalUrl("/") },
    { name: "Blog", url: buildCanonicalUrl("/blog") },
    { name: post.title, url: postUrl },
  ])

  const faqSchema = getFAQSchemaForPost(slug)

  const schemas: object[] = [articleSchema, breadcrumbSchema]
  if (faqSchema) {
    schemas.push(faqSchema)
  }
  const combinedSchema = combineSchemas(...schemas)

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <article className="relative max-w-5xl mx-auto px-5 md:px-6 py-24 md:py-28">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 hover:text-ink transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to blog</span>
          </Link>
        </div>

        <header className="mb-12 max-w-4xl">
          <p className="eyebrow mb-4">Blog / {post.tags[0] ?? "Guide"}</p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-semibold tracking-tight leading-[0.98] text-ink text-balance">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg md:text-xl leading-8 text-neutral-600">
            {post.description}
          </p>

          <div className="mt-8 grid gap-5 rounded-3xl border border-line bg-card p-5 md:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-600">
                Published {formatBlogDate(post.date)}
              </span>
              {post.dateModified && post.dateModified !== post.date ? (
                <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                  Updated {formatBlogDate(post.dateModified)}
                </span>
              ) : null}
              <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-600">
                {post.readingTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1.5 rounded-full bg-paper text-neutral-600 border border-line"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="rounded-[28px] border border-line bg-card px-5 py-8 md:px-10 md:py-12 shadow-[0_24px_80px_-48px_rgba(13,17,16,0.28)]">
          <div className="prose prose-neutral max-w-none prose-lg prose-headings:font-display prose-headings:text-ink prose-headings:tracking-tight prose-headings:leading-tight prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:text-neutral-700 prose-p:leading-8 prose-li:text-neutral-700 prose-li:marker:text-neutral-400 prose-a:text-signal prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-code:text-ink prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-graphite-950 prose-pre:text-warmwhite prose-pre:border prose-pre:border-graphite-line prose-pre:shadow-[0_18px_50px_-30px_rgba(13,17,16,0.55)] prose-blockquote:border-l-signal prose-blockquote:bg-surface prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-2xl prose-blockquote:text-neutral-700 prose-hr:border-line">
            <MDXContent source={post.content} />
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-line">
            <div className="mb-8">
              <p className="eyebrow mb-3">Related reading</p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                Continue the cluster
              </h2>
            </div>
            <div className="grid gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block group rounded-2xl border border-line bg-card p-6 md:p-7 hover:border-signal/30 hover:bg-surface transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <time className="text-xs font-mono text-neutral-500">
                      {new Date(relatedPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-xs font-mono text-neutral-500">{relatedPost.readingTime}</span>
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-semibold text-ink group-hover:text-signal transition-colors mb-2">
                    {relatedPost.title}
                  </h3>

                  <p className="text-neutral-600 text-base leading-relaxed mb-4">
                    {relatedPost.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {relatedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-surface text-neutral-600 border border-line"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}
