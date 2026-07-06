# Google SEO API Report: serpstrategists.com

Analyzed: 2026-07-05 (Asia/Calcutta)  
Target: https://serpstrategists.com/  
Credential tier: Tier 2 (PageSpeed, CrUX, Search Console, URL Inspection, Sitemaps, and GA4)

## Executive summary

The apex homepage is indexed, crawlable, canonically correct, and served successfully from Vercel. Search visibility expanded sharply in the latest comparable GSC period, but it is mostly low-ranking discovery traffic: 4,576 impressions produced only 2 clicks (0.04% CTR), with an impression-weighted average position of 65.8. The immediate objective is to convert the new visibility into page-one rankings and clicks rather than publish more broad, overlapping content.

Current infrastructure is materially healthier than the older monitor evidence: `www` now permanently redirects to the apex, and `robots.txt` allows crawling. Historical `www` URLs and a stale `www` sitemap still appear in GSC and should be consolidated operationally.

## Google Search Console

Data freshness: Search Analytics through 2026-07-02 (normal 2-3 day lag).

| Metric | 2026-06-07 to 2026-07-02 | 2026-05-10 to 2026-06-06 | Change |
|---|---:|---:|---:|
| Clicks | 2 | 0 | +2 |
| Impressions | 4,576 | 298 | +4,278 (+1,436%) |
| CTR | 0.04% | 0.00% | +0.04 pp |
| Weighted average position | 65.8 | 33.7 | 32.1 positions worse |

The impression increase is real, but it comes from many newly discovered queries ranking deep in the results. Query-level rows omit anonymized queries, so their aggregate (4,352 impressions and 0 clicks) is lower than the date-level total above.

### Highest-impression queries

| Query | Impressions | Position | Clicks |
|---|---:|---:|---:|
| serp analyzer | 277 | 68.7 | 0 |
| serp competitors | 235 | 79.2 | 0 |
| schema seo | 210 | 78.0 | 0 |
| tools voor serp | 149 | 65.0 | 0 |
| serps rankings seo software | 148 | 68.5 | 0 |
| geo optimization | 141 | 55.0 | 0 |
| serp competitors ranking | 120 | 83.7 | 0 |
| serp analysis tool | 117 | 77.1 | 0 |
| schema markup seo | 108 | 77.1 | 0 |
| what is geo | 95 | 59.6 | 0 |

### Highest-impression pages

| Page | Impressions | Position | Clicks |
|---|---:|---:|---:|
| `/blog/best-serp-analyzer-tools-2026` | 2,139 | 74.0 | 0 |
| `/blog/schema-markup-seo-guide` | 849 | 76.4 | 0 |
| `/blog/what-is-geo-optimization` | 442 | 54.4 | 0 |
| `/blog/generative-engine-optimization-geo-guide` | 328 | 41.3 | 0 |
| `/blog/top-seo-analysis-tools-2025-best-seo-ai-tool` | 309 | 41.9 | 0 |

The only page-level clicks in the period were attributed to the historical `www` version of the GEO guide (2 clicks from 214 impressions). The current redirect and canonical are correct, so this is a lagging consolidation signal rather than proof of a current redirect defect.

## Indexation and sitemap status

- Apex URL Inspection: PASS; "Submitted and indexed"; robots allowed; fetch successful; crawled as mobile on 2026-07-03; Google and user canonical both `https://serpstrategists.com/`.
- `www` URL Inspection: "Page with redirect"; Google canonical is the apex and matches the declared canonical.
- Live HTTP: apex returns 200; `www` returns 308 to the apex; sitemap returns 200 XML.
- Live `robots.txt`: allows `/`, disallows `/admin/` and `/blog?*`, and references the apex sitemap.
- GSC lists the apex sitemap submitted on 2026-07-05 with 36 submitted URLs, 0 warnings, and 0 errors.
- GSC also retains an older `www` sitemap with 28 submitted URLs.
- Both sitemap records report 0 indexed URLs. This is inconsistent with URL Inspection and live GSC impressions, so treat it as sitemap-report lag or a reporting inconsistency, not evidence that the site has zero indexed pages.

## GA4 organic traffic

Data freshness: 2026-06-07 through 2026-07-04.

- 24 organic sessions, 20 users, and 26 pageviews.
- Homepage: 10 sessions, 14 pageviews, 90% bounce rate, 10% engagement rate.
- GEO guide: 3 sessions, 3 pageviews, 100% bounce rate.
- Four sessions used landing page `(not set)`, indicating attribution or tagging cleanup is needed.
- The sample is small; bounce and engagement percentages should not drive major decisions yet.

## PageSpeed and Core Web Vitals

CrUX and CrUX History have insufficient eligible Chrome traffic, so no field LCP, INP, or CLS conclusion is available. The values below are Lighthouse lab measurements from 2026-07-05 and can vary between runs.

| Strategy | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile | 94 | 94 | 100 | 100 | 0.91s | 2.71s | 160ms | 0 |
| Desktop | 75 | 94 | 100 | 100 | 0.32s | 0.60s | 616ms | 0 |

Repeat lab runs showed material TBT variance (mobile 160-370ms; desktop 160-616ms), so use several runs or CI medians before accepting a performance regression. Stable actionable audits were:

- roughly 99 KiB of unused JavaScript;
- render-blocking requests (about 150ms estimated mobile savings);
- forced reflow and network dependency-chain findings;
- about 14 KiB of legacy JavaScript;
- insufficient color contrast;
- non-sequential heading order.

INP is not available from Lighthouse lab data, and CrUX lacks enough traffic to report it.

## Prioritized actions

1. Consolidate GSC configuration: keep the apex sitemap and remove the obsolete `www` sitemap after confirming redirects remain stable.
2. Recheck the apex sitemap in 7-14 days. Escalate only if its indexed count remains zero while URL Inspection continues to pass.
3. Refresh the three high-impression pages around one primary intent each: SERP analyzer tools, schema SEO, and GEO optimization. Improve title/snippet fit, internal links, and unique evidence; avoid creating overlapping new pages.
4. Investigate the 99 KiB unused-JavaScript payload and forced reflow. Measure at least three mobile and desktop runs after each change.
5. Fix homepage color contrast and heading order; these are deterministic accessibility failures.
6. Audit GA4 landing-page attribution causing `(not set)` and verify key conversion events before optimizing against engagement metrics.

## Tool limitations

- Search Analytics is delayed through 2026-07-02.
- CrUX has insufficient traffic for field data.
- The bundled PageSpeed parser raised `KeyError: audit_details`; PageSpeed was queried directly through the same Google API instead.
- Lighthouse is lab data and varied between repeated runs.
- No Indexing API submission or production mutation was performed.
