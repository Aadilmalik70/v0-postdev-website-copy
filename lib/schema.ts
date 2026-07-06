/**
 * Schema Markup Utilities for SERP Strategists
 * Implements structured data for better SEO and rich snippets
 */

import { SITE_NAME, SITE_URL } from "./site-seo"

export interface FAQItem {
  question: string
  answer: string
}

export interface HowToStep {
  name: string
  text: string
  url?: string
}

/**
 * Organization Schema - Use on homepage and as publisher reference
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      "SERP Strategists is the AI Growth Operator that observes your search performance, executes approved SEO and GEO actions, and improves visibility across Google and AI search engines.",
    sameAs: [
      "https://www.linkedin.com/company/serpstrategists",
      "https://twitter.com/serpstrategists",
      "https://www.producthunt.com/products/serp-strategists",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "contact@serpstrategists.com",
      availableLanguage: ["en"],
    },
    founder: {
      "@type": "Person",
      name: "SERP Strategists Team",
    },
  }
}

/**
 * WebSite Schema - Enables sitelinks search box
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "AI-powered SEO and GEO optimization platform for search visibility",
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Article Schema - Use for blog posts
 */
export function getArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
  tags,
}: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
  tags?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: image
      ? {
          "@type": "ImageObject",
          url: image,
        }
      : undefined,
    keywords: tags?.join(", "),
    inLanguage: "en-US",
  }
}

/**
 * FAQ Schema - Use for pages with Q&A content
 */
export function getFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * HowTo Schema - Use for tutorial/guide content
 */
export function getHowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  }
}

/**
 * DefinedTerm Schema - Use for glossary/definition pages
 */
export function getDefinedTermSchema({
  term,
  description,
  url,
}: {
  term: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": url,
    name: term,
    description,
    inDefinedTermSet: `${SITE_URL}/glossary`,
  }
}

/**
 * TechArticle Schema - Use for technical guides
 */
export function getTechArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  dependencies,
  proficiencyLevel,
}: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  dependencies?: string
  proficiencyLevel?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#techarticle`,
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    dependencies,
    proficiencyLevel,
  }
}

/**
 * BreadcrumbList Schema - Use for navigation breadcrumbs
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Helper to combine multiple schemas into one script
 */
export function combineSchemas(...schemas: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      const { "@context": _, ...rest } = schema as any
      return rest
    }),
  }
}
