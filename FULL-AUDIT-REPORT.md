# SERP Strategists SEO Audit

Audit target: `https://serpstrategists.com/`
Audit date: `2026-07-05`

## Executive Summary

Overall SEO health score: **86/100**

The site is in good shape technically and the homepage is now clearly serving the intended Next.js experience. Indexability is solid, the canonical/redirect story is clean, robots.txt references the sitemap, and the blog content has real depth.

The main issues are not blocking, but they are real:

- `llms.txt` is present but does not satisfy Lighthouse agentic-browsing guidance because the resource list is plain URLs instead of markdown links.
- Several small homepage labels fail contrast checks.
- Heading order is not fully sequential.
- Schema is basic and could be stronger.
- The homepage DOM is large and Google Tag Manager adds measurable main-thread cost.

## What I Verified

- `http://serpstrategists.com/` redirects to HTTPS.
- `https://www.serpstrategists.com/` redirects to the apex.
- `robots.txt` allows crawling and references `https://serpstrategists.com/sitemap.xml`.
- `llms.txt` exists.
- Sitemap contains 36 URLs and returns 200s for sampled entries.
- Homepage, pricing, about, integrations, governance, demo, contact, FAQ, and sampled blog posts all return 200.
- Mobile and desktop renders look coherent, with no obvious horizontal overflow.

## Technical SEO

Strengths:

- Canonical URLs are self-referential on sampled pages.
- Redirect behavior is consistent.
- The sitemap is discoverable from robots.txt.
- The sitemap URLs are indexable and mostly clean.

Issues:

- The sitemap uses deprecated `changefreq` and `priority` tags.
- The sitemap helper in the SEO bundle over-flagged some pages as noindex when it scanned page body text; manual HTML checks showed `meta robots="index, follow"` on sampled blog posts. Treat that helper result as a false positive.

## Content Quality

Strengths:

- Homepage content depth is strong.
- Sampled blog posts are substantial:
  - Core Web Vitals article: 923 words
  - Technical SEO checklist: 1211 words
  - Google core update recovery: 1094 words
- The about, governance, and integrations pages give the brand a clearer product story.

Gaps:

- Utility pages like contact and FAQ are comparatively thin, though still acceptable for their purpose.
- The site would benefit from stronger author/reviewer and organization-level credibility markup.

## On-Page SEO

Strengths:

- Title tags and meta descriptions are present and well-written on the sampled pages.
- H1s are unique and aligned to page intent.
- Internal linking is coherent across the homepage and core pages.

Issues:

- Heading order is not fully sequential.
- Some homepage microcopy is too subtle for accessibility and readability.

## Schema / Structured Data

Detected schema on sampled pages:

- Homepage: `WebSite`
- Pricing: `Product`
- About: `AboutPage`
- Contact: `ContactPage`

Missing or weak:

- `Organization`
- `BreadcrumbList`
- `Article` / `BlogPosting` on blog posts

## Performance

Trace results from DevTools:

- LCP: 636 ms
- CLS: 0.00
- TTFB: 56 ms
- Render delay: 580 ms
- DOM elements: 921
- Largest layout update: 294 ms
- Google Tag Manager main-thread time: 232 ms

Takeaway:

- Core timing is decent, but the DOM is heavy and third-party execution is visible in the trace.

## AI Search Readiness

Strengths:

- `robots.txt` explicitly allows major AI crawlers.
- `llms.txt` exists.

Issue:

- Lighthouse agentic-browsing audit failed `llms.txt` because the resource list is plain text URLs rather than markdown links.

## Images

Homepage image audit:

- 20 images checked
- 0 missing alt attributes
- 0 empty alt attributes

## Visual Notes

- The homepage is polished and branded.
- The mobile render appears intact.
- The page is visually long with a lot of breathing room below the fold, so the content density feels lower than the copy volume suggests.

## Priority Fixes

1. Rewrite `llms.txt` using markdown links.
2. Fix the low-contrast homepage labels.
3. Normalize heading hierarchy.
4. Add `Organization` and `BreadcrumbList` schema, then add `Article` schema to posts.
5. Reduce DOM weight and defer or trim third-party impact where possible.

