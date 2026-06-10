import type { Metadata } from "next"

export const SITE_NAME = "SERP Strategist"
export const SITE_URL = "https://serpstrategists.com"

export function buildCanonicalUrl(pathname: string): string {
  const trimmed = pathname.trim()
  const normalizedPath = trimmed === "/" ? "" : `/${trimmed.replace(/^\/+|\/+$/g, "")}`
  return `${SITE_URL}${normalizedPath}`
}

export function getHomepageSeoCopy() {
  return {
    title: "AI SEO Agent Software for Audits, Fixes, and Content | SERP Strategist",
    description:
      "AI SEO agent software that audits your site, fixes technical issues, publishes content, and tracks organic growth without manual busywork.",
    h1: "AI SEO Agent Software for Audits, Fixes, and Growth",
    subtitle:
      "One AI SEO agent software workflow to audit your site, fix issues, publish content, and monitor rankings without agency overhead.",
    openGraphTitle: "AI SEO Agent Software for Audits, Fixes, and Growth",
    openGraphDescription: "Stop juggling audits, fixes, and content calendars. Let one AI SEO agent software workflow drive organic growth 24/7.",
    twitterTitle: "AI SEO Agent Software for Audits, Fixes, and Growth",
    twitterDescription: "Audit, fix, publish, and monitor SEO from one autonomous AI SEO agent.",
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

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      publishedTime,
      authors,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}