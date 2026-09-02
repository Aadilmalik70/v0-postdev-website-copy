import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import GithubSlugger from "github-slugger"
import { MDXContent } from "./mdx-content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { buildMarketingMetadata, buildCanonicalUrl } from "@/lib/site-seo"
import { getArticleSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema"
import { getFAQSchemaForPost } from "@/lib/faq-schemas"
import { getFAQSchemaFromMarkdown } from "@/lib/faq-from-markdown"
import { BlogCta } from "@/components/blog-cta"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { ArticleToc, ArticleTocMobile, type TocItem } from "@/components/blog/article-toc"
import { ShareRow } from "@/components/blog/share-row"

interface AuthorProfile {
  name: string
  role: string
  avatarUrl: string | null
  bio: string
}

const DEFAULT_AUTHOR: AuthorProfile = {
  name: "Aadil Khan",
  role: "Founder & Organic growth operator",
  avatarUrl: "/blog/authors/aadil-khan.png",
  bio: "Aadil Khan is the founder of SERP Strategists. As an organic growth operator, he works with B2B SaaS and startup teams to scale search visibility using semantic engineering and data-driven GEO. Follow his experiments on LinkedIn or read our about page to see how we build.",
}

const AUTHOR_PROFILES: Record<string, AuthorProfile> = {
  "Aadil Khan": DEFAULT_AUTHOR,
  "SERP Strategists": DEFAULT_AUTHOR,
  "SERP Strategists Editorial Team": DEFAULT_AUTHOR,
}

/**
 * Split the article so the product CTA lands at a natural mid-article break.
 * We choose the `##` heading nearest the halfway point of the content rather
 * than the second heading, which on a 3,000-word guide fired far too early.
 */
function splitContentAtMidpoint(content: string): { firstPart: string; secondPart: string | null } {
  const normalized = content.replace(/\r\n/g, "\n")
  const headings = [...normalized.matchAll(/\n##\s+/g)]
    .map((match) => match.index)
    .filter((index): index is number => index !== undefined)

  // Fewer than three headings leaves no interior break worth using.
  if (headings.length <= 2) {
    return { firstPart: content, secondPart: null }
  }

  const midpoint = normalized.length / 2
  const interior = headings.slice(1, -1)
  const breakIndex = interior.reduce((best, index) =>
    Math.abs(index - midpoint) < Math.abs(best - midpoint) ? index : best,
  )

  return {
    firstPart: normalized.slice(0, breakIndex),
    secondPart: normalized.slice(breakIndex),
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value))
}

/** Strip inline markdown so the text matches the heading's rendered textContent. */
function headingTextFromMarkdown(raw: string): string {
  return raw
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim()
}

/**
 * Build the TOC with the same slugger rehype-slug uses, so every anchor
 * resolves. Two details matter:
 *  - the article renders as two MDX passes (content is split for the
 *    mid-article CTA) and rehype-slug starts a fresh slugger per pass, so
 *    each part gets its own instance;
 *  - every heading level advances the slugger's duplicate counter, so we
 *    slug them all and only emit the `##` ones.
 */
function getTableOfContents(parts: string[]): TocItem[] {
  const items: TocItem[] = []

  for (const part of parts) {
    const slugger = new GithubSlugger()
    let inFence = false

    for (const line of part.split(/\r?\n/)) {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence
        continue
      }
      if (inFence) continue

      const match = line.match(/^(#{1,6})\s+(.+)$/)
      if (!match) continue

      const title = headingTextFromMarkdown(match[2])
      if (!title) continue

      const slug = slugger.slug(title)
      if (match[1].length === 2) {
        items.push({ title, href: `#${slug}` })
      }
    }
  }

  return items
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

  const { firstPart, secondPart } = splitContentAtMidpoint(post.content)
  const relatedPosts = getRelatedPosts(slug, post.tags, 3)
  // Mirror the render: one slugger pass per MDX block.
  const tableOfContents = getTableOfContents(
    secondPart ? [firstPart, secondPart] : [firstPart],
  )
  const postUrl = buildCanonicalUrl(`/blog/${slug}`)
  const category = post.tags[0] ?? "Guide"

  const authorProfile: AuthorProfile = AUTHOR_PROFILES[post.author] ?? {
    name: post.author,
    role: "Editorial Team",
    avatarUrl: null,
    bio: `Editorial coverage from the ${post.author} team.`,
  }
  const authorInitials = authorProfile.name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const isUpdated = Boolean(post.dateModified && post.dateModified !== post.date)

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

  const faqSchema = getFAQSchemaFromMarkdown(post.content) ?? getFAQSchemaForPost(slug)

  const schemas: object[] = [articleSchema, breadcrumbSchema]
  if (faqSchema) {
    schemas.push(faqSchema)
  }
  const combinedSchema = combineSchemas(...schemas)

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <ReadingProgress targetId="article-body" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* ————— Hero ————— */}
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-70" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_-15%,rgba(0,208,132,0.13),transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper"
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-14 md:px-6 md:pt-36 md:pb-16 xl:max-w-[78rem]">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-400">/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-ink">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-400">/</li>
              <li className="text-signal">{category}</li>
            </ol>
          </nav>

          <h1 className="max-w-4xl font-display text-[clamp(2.125rem,1.15rem+3.3vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.022em] text-ink text-balance">
            {post.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-[1.65] text-neutral-600 text-pretty md:text-xl">
            {post.description}
          </p>

          {/* Flat meta rail — no card, no nesting */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              {authorProfile.avatarUrl ? (
                <Image
                  src={authorProfile.avatarUrl}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-line"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[11px] font-semibold tracking-[0.12em] text-warmwhite">
                  {authorInitials || "SS"}
                </div>
              )}
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">{authorProfile.name}</p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.13em] text-neutral-500">
                  {authorProfile.role}
                </p>
              </div>
            </div>

            <span aria-hidden="true" className="hidden h-9 w-px bg-line sm:block" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.13em] text-neutral-500">
              <span>
                Published{" "}
                <time dateTime={post.date} className="text-neutral-700">
                  {formatBlogDate(post.date)}
                </time>
              </span>
              {isUpdated && post.dateModified ? (
                <>
                  <span aria-hidden="true" className="text-neutral-300">&bull;</span>
                  <span className="text-signal">
                    Updated{" "}
                    <time dateTime={post.dateModified}>{formatBlogDate(post.dateModified)}</time>
                  </span>
                </>
              ) : null}
              <span aria-hidden="true" className="text-neutral-300">&bull;</span>
              <span className="text-neutral-700">{post.readingTime}</span>
            </div>
          </div>

          {post.tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-card/70 px-3 py-1 font-mono text-[11px] text-neutral-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      {post.image ? (
        <div className="mx-auto max-w-6xl px-5 md:px-6 xl:max-w-[78rem]">
          <div className="-mt-2 overflow-hidden rounded-[20px] border border-line md:rounded-[28px]">
            <Image
              src={post.image}
              alt={post.title}
              width={1600}
              height={840}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      ) : null}

      {/* ————— Body ————— */}
      <div className="mx-auto max-w-6xl px-5 md:px-6 xl:max-w-[78rem]">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 xl:gap-20">
          <article id="article-body" className="article-body min-w-0 py-14 md:py-16">
            <ArticleTocMobile items={tableOfContents} />

            {/* max-w-none: the readable measure is applied per text block in CSS
                so wide tables and media can use the full column. */}
            <div className="article-prose prose prose-neutral prose-lg max-w-none">
              <MDXContent source={firstPart} />
            </div>

            <div className="max-w-[45rem]">
              <BlogCta tags={post.tags} slug={post.slug} placement="middle" />
            </div>

            {secondPart ? (
              <>
                <div className="article-prose prose prose-neutral prose-lg max-w-none">
                  <MDXContent source={secondPart} />
                </div>
                <div className="max-w-[45rem]">
                  <BlogCta tags={post.tags} slug={post.slug} placement="end" />
                </div>
              </>
            ) : null}

            {/* Author bio — at the end, where it belongs editorially */}
            <section className="mt-14 max-w-[45rem] rounded-[24px] border border-line bg-card p-6 md:p-8">
              <p className="eyebrow mb-5">Written by</p>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                {authorProfile.avatarUrl ? (
                  <Image
                    src={authorProfile.avatarUrl}
                    alt={authorProfile.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-line"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-semibold tracking-[0.12em] text-warmwhite">
                    {authorInitials || "SS"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-ink">{authorProfile.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.13em] text-neutral-500">
                    {authorProfile.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{authorProfile.bio}</p>
                  <Link
                    href="/about"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal transition-colors hover:text-signal-deep"
                  >
                    How we build
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </section>
          </article>

          {/* ————— Sticky rail ————— */}
          <aside className="hidden py-16 lg:block">
            {/* Long posts produce a rail taller than the viewport; make it
                scroll internally so Share and the back link stay reachable. */}
            <div
              data-toc-scroll
              className="toc-scroll sticky top-28 max-h-[calc(100vh-9rem)] space-y-9 overflow-y-auto overscroll-contain pr-1"
            >
              <ArticleToc items={tableOfContents} />
              <div className="border-t border-line pt-7">
                <ShareRow url={postUrl} title={post.title} />
              </div>
              <div className="border-t border-line pt-7">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-ink"
                >
                  <span aria-hidden="true">&larr;</span>
                  All articles
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ————— Related ————— */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20 xl:max-w-[78rem]">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3">Related reading</p>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  Continue the cluster
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-ink"
              >
                All articles
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="card-lift group flex flex-col rounded-[20px] border border-line bg-card p-6"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-signal">
                    {relatedPost.tags[0] ?? "Guide"}
                  </p>

                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-signal">
                    {relatedPost.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                    {relatedPost.description}
                  </p>

                  <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 font-mono text-[11px] text-neutral-500">
                    <time dateTime={relatedPost.date}>{formatBlogDate(relatedPost.date)}</time>
                    <span aria-hidden="true" className="text-neutral-300">&bull;</span>
                    <span>{relatedPost.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
