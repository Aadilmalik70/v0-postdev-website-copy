# Google Search Console and GA4 Analysis: serpstrategists.com

Analyzed: 2026-07-07 17:51 IST  
Credential tier: Tier 2 (GSC and GA4 available)  
GSC period: 2026-06-07 to 2026-07-04  
GA4 period: 2026-06-09 to 2026-07-06

## Executive summary

Google is discovering substantially more of the site, but the visibility is not yet translating into traffic. GSC recorded 4,693 impressions and 2 clicks (0.043% CTR) in the latest 28 days. Impressions increased 1,475% against the preceding 28 days, while the weighted query position moved from 33.7 to 67.0 because the new visibility is concentrated deep in the results.

The latest trend is negative: impressions fell 43.7% week over week, from 1,498 to 843. The decline is not a CTR problem alone; most important pages rank between positions 41 and 76 and therefore receive almost no click opportunity.

GA4 recorded 116 sessions across all channels, but 20 sessions were on localhost, 127.0.0.1, or Vercel preview hosts. Organic Search contributed 29 sessions and 41 pageviews, with an 86.2% bounce rate and no configured key events. Conversion performance cannot be assessed until production-only filtering and meaningful key events are configured.

## Search Console performance

| Metric | Latest 28 days | Previous 28 days | Change |
|---|---:|---:|---:|
| Clicks | 2 | 0 | +2 |
| Impressions | 4,693 | 298 | +4,395 (+1,474.8%) |
| CTR | 0.043% | 0.000% | +0.043 pp |
| Weighted query position | 67.0 | 33.7 | 33.3 positions worse |

The position decline reflects broader low-ranking discovery, not a simple loss of existing rankings. Query-level rows cover 4,463 of the 4,693 impressions; the remaining impressions are anonymized by GSC.

### Recent trajectory

| Window | Impressions | Clicks | Weighted position |
|---|---:|---:|---:|
| 2026-06-14 to 2026-06-20 | 1,754 | 0 | 67.8 |
| 2026-06-21 to 2026-06-27 | 1,498 | 0 | 70.0 |
| 2026-06-28 to 2026-07-04 | 843 | 0 | 64.2 |

The latest week ranked slightly better but appeared in search 43.7% less often. This indicates shrinking query coverage or reprocessing, not a ranking improvement large enough to drive traffic.

### Highest-impression queries

| Query | Impressions | Position | Clicks |
|---|---:|---:|---:|
| serp analyzer | 290 | 68.1 | 0 |
| serp competitors | 235 | 79.2 | 0 |
| schema seo | 210 | 78.0 | 0 |
| tools voor serp | 161 | 65.3 | 0 |
| serps rankings seo software | 148 | 68.5 | 0 |
| geo optimization | 143 | 54.8 | 0 |
| serp competitors ranking | 120 | 83.7 | 0 |
| serp analysis tool | 117 | 77.1 | 0 |
| schema markup seo | 108 | 77.1 | 0 |
| generative engine optimization | 81 | 34.8 | 0 |

There are no meaningful query-level quick wins yet. The position 4-15 rows have very low volume and are dominated by branded or long search-operator queries. Fifteen automated-looking query rows account for only 61 impressions (1.4%), so they are noise but do not explain the overall visibility increase.

### Highest-impression pages

| Page | Impressions | Position | Clicks |
|---|---:|---:|---:|
| `/blog/best-serp-analyzer-tools-2026` | 2,193 | 73.8 | 0 |
| `/blog/schema-markup-seo-guide` | 849 | 76.4 | 0 |
| `/blog/what-is-geo-optimization` | 442 | 54.4 | 0 |
| `/blog/top-seo-analysis-tools-2025-best-seo-ai-tool` | 350 | 44.1 | 0 |
| `/blog/generative-engine-optimization-geo-guide` | 344 | 41.4 | 0 |

These five apex pages generate 86.1% of page-level impressions. They are the correct optimization targets; publishing more overlapping SERP, schema, or GEO articles would dilute relevance.

Historical `www` URLs still account for 490 impressions and both GSC clicks, while apex URLs account for 4,363 impressions and no clicks. The redirect/canonical migration is progressing, but GSC has not fully consolidated historical `www` signals.

### Device and geography

- Desktop: 3,720 impressions, 2 clicks, position 64.7.
- Mobile: 909 impressions, 0 clicks, position 70.0.
- United States: 2,966 impressions (63.2% of total) and 1 click.
- United Kingdom: 496 impressions and 1 click.
- Netherlands: 254 impressions and no clicks, partly consistent with Dutch-language query discovery.

## GA4 analytics

### All traffic

| Metric | Value |
|---|---:|
| Sessions | 116 |
| Users | 84 |
| Pageviews | 235 |
| Engagement rate | 27.6% |
| Bounce rate | 72.4% |
| Average session duration | 155 seconds |
| Key events | 0 |

Channel mix:

| Channel | Sessions | Users | Pageviews | Engagement rate |
|---|---:|---:|---:|---:|
| Direct | 75 | 60 | 162 | 29.3% |
| Organic Search | 29 | 22 | 41 | 13.8% |
| Referral | 9 | 2 | 32 | 66.7% |
| Unassigned | 3 | 3 | 0 | 0.0% |

Traffic quality is not clean enough for business decisions:

- 13 sessions came from `localhost`, 2 from `127.0.0.1`, and 5 from Vercel preview hosts.
- `vercel.com / referral` contributed 9 sessions from only 2 users, consistent with internal or preview activity.
- `search.google.com / referral` contributed 7 sessions and should not be treated as organic acquisition.
- No event is marked as a key event. GA4 only records basic events such as page views, scrolls, and user engagement.

### Organic traffic

- 29 sessions, 22 unique users, and 41 pageviews.
- 26 sessions landed on the apex hostname and 3 on `www`.
- All organic sessions were classified as desktop, which is unusual and warrants validation against consent/tag behavior.
- Organic bounce rate was 86.2%; engagement rate was 13.8%.
- Homepage: 11 sessions and 27 pageviews, with 18.2% engagement.
- GEO guide: 3 sessions, 3 pageviews, and 0% engagement.
- `(not set)`: 6 sessions and 0 pageviews, indicating attribution or session instrumentation problems.

GA4 reports 22 `google / organic` sessions, while GSC reports only 2 clicks across the closely aligned period. Sessions can exceed clicks, and the date ranges differ by two days, but an 11x gap is too large to accept without validating tagging, attribution, consent mode, and internal traffic. Do not use GA4 organic sessions as the authoritative search-performance KPI until reconciled with GSC.

## Prioritized actions

1. Configure GA4 production data hygiene: exclude internal traffic, create a production-hostname comparison/filter, and keep localhost and preview deployments out of reporting.
2. Mark business outcomes as key events, such as qualified contact submissions, demo requests, pricing CTA completions, or product sign-ups. No conversion analysis is possible today.
3. Reconcile the GA4/GSC mismatch by validating the GA tag once per page, checking referral exclusions and consent behavior, and comparing `google / organic` sessions by date and landing page with GSC clicks.
4. Consolidate historical `www` signals. Keep the apex redirect and canonicals stable, retain only the apex sitemap in GSC, and monitor the `www` impression share weekly.
5. Refresh the five pages responsible for 86.1% of impressions. Tighten each page around one intent, improve titles/snippets, add original evidence, and strengthen internal links from relevant authority pages.
6. Track the latest-seven-day GSC decline. Escalate if impressions continue falling after another complete GSC week; Search Analytics has a normal 2-3 day lag.

## Limitations

- GSC data ends on 2026-07-04 because Search Analytics is delayed.
- GA4 has no recorded data before 2026-06-09, so a clean preceding-period comparison is unavailable.
- Low traffic makes landing-page engagement rates volatile.
- No production mutation, indexing request, or analytics configuration change was made.
