import type { Metadata } from "next"

export const SITE_NAME = "SERP Strategists"
export const SITE_URL = "https://serpstrategists.com"
const SEO_TITLE_MAX = 60
const SEO_DESCRIPTION_MAX = 150

function normalizeSeoText(value: string): string {
  return value
    .replace(/\.\.\./g, "…")
    .replace(/'/g, "’")
    .replace(/\s+/g, " ")
    .trim()
}

function truncateAtWordBoundary(value: string, maxLength: number): string {
  const normalized = normalizeSeoText(value)
  if (normalized.length <= maxLength) {
    return normalized
  }

  const slice = normalized.slice(0, maxLength - 1)
  const lastSpace = slice.lastIndexOf(" ")
  const safeSlice = lastSpace > Math.floor(maxLength * 0.6) ? slice.slice(0, lastSpace) : slice

  return `${safeSlice.trim()}…`
}

export function buildSeoTitle(title: string, suffix = SITE_NAME): string {
  const normalizedTitle = normalizeSeoText(title)
  const normalizedSuffix = normalizeSeoText(suffix)

  if (!normalizedSuffix) {
    return truncateAtWordBoundary(normalizedTitle, SEO_TITLE_MAX)
  }

   if (normalizedTitle.toLowerCase().includes(normalizedSuffix.toLowerCase())) {
    return truncateAtWordBoundary(normalizedTitle, SEO_TITLE_MAX)
  }

  const suffixText = ` | ${normalizedSuffix}`
  const fullTitle = `${normalizedTitle}${suffixText}`

  if (fullTitle.length <= SEO_TITLE_MAX) {
    return fullTitle
  }

  const availableTitleLength = Math.max(SEO_TITLE_MAX - suffixText.length, 24)
  return `${truncateAtWordBoundary(normalizedTitle, availableTitleLength)}${suffixText}`
}

export function buildSeoDescription(description: string): string {
  return truncateAtWordBoundary(description, SEO_DESCRIPTION_MAX)
}

export function buildCanonicalUrl(pathname: string): string {
  const trimmed = pathname.trim()
  const normalizedPath = trimmed === "/" ? "" : `/${trimmed.replace(/^\/+|\/+$/g, "")}`
  return `${SITE_URL}${normalizedPath}`
}

export function getHomepageSeoCopy() {
  return {
    title: "AI Growth Operator for Organic Search | SERP Strategists",
    description:
      "SERP Strategists observes your search performance, executes approved SEO and GEO actions, and improves visibility across Google and AI search.",
    h1: "Deploy an AI Growth Operator for organic search.",
    subtitle:
      "SERP Strategists observes your search performance, finds the highest-impact opportunities, executes approved SEO and GEO actions, and improves visibility across Google, ChatGPT, Perplexity, Gemini, and beyond.",
    openGraphTitle: "Deploy an AI Growth Operator for Organic Search",
    openGraphDescription: "From opportunity to executed action: SEO, GEO, and AI visibility run as one governed operating loop.",
    twitterTitle: "Deploy an AI Growth Operator for Organic Search",
    twitterDescription: "Governed autonomy. Full logs. Human approval where it matters.",
  }
}

export function buildMarketingMetadata({
  title,
  description,
  pathname,
  type = "website",
  publishedTime,
  authors,
  tags,
}: {
  title: string
  description: string
  pathname: string
  type?: "website" | "article"
  publishedTime?: string
  authors?: string[]
  tags?: string[]
}): Metadata {
  const url = buildCanonicalUrl(pathname)
  const seoTitle = buildSeoTitle(title)
  const seoDescription = buildSeoDescription(description)

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url,
      type,
      publishedTime,
      authors,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  }
}