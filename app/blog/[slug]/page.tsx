import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { MDXContent } from "./mdx-content"
import { Navbar } from "@/components/navbar"
import { buildMarketingMetadata, buildCanonicalUrl } from "@/lib/site-seo"
import { getArticleSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema"
import { getFAQSchemaForPost, hasFAQSchema } from "@/lib/faq-schemas"

interface Props {
  params: Promise<{ slug: string }>
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

  // Article Schema
  const articleSchema = getArticleSchema({
    headline: post.title,
    description: post.description,
    url: postUrl,
    datePublished: post.date,
    dateModified: post.date, // TODO: Add dateModified to frontmatter
    author: post.author,
    image: post.image ? buildCanonicalUrl(post.image) : undefined,
    tags: post.tags,
  })

  // Breadcrumb Schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: buildCanonicalUrl("/") },
    { name: "Blog", url: buildCanonicalUrl("/blog") },
    { name: post.title, url: postUrl },
  ])

  // FAQ Schema (if available for this post)
  const faqSchema = getFAQSchemaForPost(slug)

  // Combine all schemas
  const schemas = [articleSchema, breadcrumbSchema]
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

      <article className="max-w-3xl mx-auto px-6 py-32">
        <Link href="/blog" className="text-[#00d084] text-sm font-mono mb-8 inline-block hover:underline">
          ← All posts
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm font-mono text-neutral-600">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="text-neutral-600">·</span>
            <span className="text-sm font-mono text-neutral-600">{post.readingTime}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-normal text-ink mb-4 tracking-[-0.02em] leading-tight">
            {post.title}
          </h1>

          <p className="text-neutral-600 text-lg">{post.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-1 rounded-md bg-surface text-neutral-600 border border-line"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-[#bbbbbb] prose-a:text-[#00d084] prose-strong:text-ink prose-code:text-[#00d084] prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-line prose-li:text-[#bbbbbb] prose-blockquote:border-[#00d084] prose-blockquote:text-neutral-600">
          <MDXContent source={post.content} />
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-line">
            <h2 className="font-serif text-3xl font-normal text-ink mb-8">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-1">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block group"
                >
                  <article className="border border-line rounded-2xl p-6 bg-card hover:border-[#00d084]/30 hover:bg-surface transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <time className="text-xs font-mono text-neutral-600">
                        {new Date(relatedPost.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </time>
                      <span className="text-neutral-600">·</span>
                      <span className="text-xs font-mono text-neutral-600">{relatedPost.readingTime}</span>
                    </div>

                    <h3 className="text-xl font-medium text-ink group-hover:text-[#00d084] transition-colors mb-2">
                      {relatedPost.title}
                    </h3>

                    <p className="text-neutral-600 text-base leading-relaxed mb-3">
                      {relatedPost.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {relatedPost.tags.map((tag) => (
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
        )}
      </article>
    </main>
  )
}
