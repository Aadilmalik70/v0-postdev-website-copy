import { getPostBySlug, getAllSlugs } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { MDXContent } from "./mdx-content"
import { Navbar } from "@/components/navbar"

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

  return {
    title: `${post.title} — SERP Strategist Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SERP Strategist",
      url: "https://serpstrategists.com",
    },
  }

  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6 py-32">
        <Link href="/blog" className="text-[#22c55e] text-sm font-mono mb-8 inline-block hover:underline">
          ← All posts
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm font-mono text-[#666666]">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="text-[#333333]">·</span>
            <span className="text-sm font-mono text-[#666666]">{post.readingTime}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#ececec] mb-4 tracking-[-0.02em] leading-tight">
            {post.title}
          </h1>

          <p className="text-[#888888] text-lg">{post.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-1 rounded-md bg-[#141414] text-[#888888] border border-[#222222]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#ececec] prose-p:text-[#bbbbbb] prose-a:text-[#22c55e] prose-strong:text-[#ececec] prose-code:text-[#22c55e] prose-code:bg-[#141414] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-[#222222] prose-li:text-[#bbbbbb] prose-blockquote:border-[#22c55e] prose-blockquote:text-[#888888]">
          <MDXContent source={post.content} />
        </div>
      </article>
    </main>
  )
}
