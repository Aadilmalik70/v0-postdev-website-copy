# SERP Strategists Organic Growth Plan

Prepared: 2026-07-07  
Planning horizon: 90 days  
Primary data: Google Search Console through 2026-07-04 and GA4 through 2026-07-06

## What is happening

The site is indexed correctly. Google URL Inspection confirms that the five pages producing most search impressions are indexed, crawlable, mobile-crawled, and using the correct apex canonical.

The current problem is the funnel after indexing:

1. Google shows the pages, but mainly around positions 41-79.
2. Those impressions produce almost no clicks: 4,693 impressions generated 2 clicks.
3. Visitors who arrive do not have a consistent next action on blog pages.
4. GA4 has no key events, so leads and sign-ups cannot be measured.

Do not respond by publishing many more broad articles. Improve the pages Google is already testing, build authority to them, and make every useful visit measurable.

## Baseline

| Metric | Current baseline |
|---|---:|
| GSC impressions | 4,693 |
| GSC clicks | 2 |
| GSC CTR | 0.043% |
| Weighted query position | 67.0 |
| Latest seven-day impression change | -43.7% |
| GA4 organic sessions | 29 |
| GA4 organic users | 22 |
| Organic bounce rate | 86.2% |
| GA4 key events | 0 |
| Non-production GA4 sessions | 20 |

## Days 1-7: fix measurement and conversion

### 1. Measure one real business outcome

Choose one primary acquisition goal. Recommended: a qualified demo or consultation request.

Implement and mark these GA4 events:

- `generate_lead` when a demo/contact form succeeds;
- `sign_up` if a product account can be created;
- `cta_click` for the primary blog CTA, retained as a diagnostic event rather than the main conversion.

The form success event is the business KPI. A button click alone is not a lead.

### 2. Clean GA4

- Exclude internal traffic.
- Create a production-hostname report for `serpstrategists.com` and `www.serpstrategists.com`.
- Exclude `localhost`, `127.0.0.1`, and Vercel preview hosts from decision-making.
- Investigate the six organic sessions with landing page `(not set)`.
- Reconcile 22 `google / organic` sessions against only 2 GSC clicks by checking duplicate tags, consent behavior, referral handling, and attribution by date.

Implementation starts in `components/google-analytics.tsx`, which currently loads only the base GA tag and sends no business events.

### 3. Add a consistent blog conversion path

Add one reusable CTA component to the blog template:

- primary CTA: request a demo or SEO/GEO assessment;
- secondary CTA: view the product or pricing;
- placement: after the first useful section and at the end of the article;
- message: connect the article's problem to the next practical action.

Do not use a generic “contact us” block. The CTA should explain what the visitor receives.

### 4. Clean Search Console configuration

- Keep `https://serpstrategists.com/sitemap.xml`.
- Remove the obsolete `https://www.serpstrategists.com/sitemap.xml` submission in GSC.
- Keep all `www` redirects and apex canonicals stable.
- Do not use the Indexing API for these blog posts; Google restricts that API to specific supported content types.

## Days 8-30: improve pages Google already knows

Update pages in this order. After each material update, inspect the URL in GSC and request indexing through the Search Console UI.

### Priority 1: AI SEO tools comparison

Page: `/blog/top-seo-analysis-tools-2025-best-seo-ai-tool`

Why first:

- impressions grew 144% in the latest week;
- `ai seo tools competitive benchmarking 2025` is around position 26.6;
- `ai seo tools 2025` is around position 30.

Actions:

- Keep the existing URL; changing it would discard accumulated signals.
- Align the title and body: the title promises 12 tools, but the main numbered list contains five categories.
- Update all visible FAQ references from 2025 to 2026.
- Add a transparent testing methodology, last-tested date, screenshots, pricing, limitations, and a decision matrix.
- Add a strong CTA for teams that want execution after comparison.
- Link to this page from relevant product, pricing, benchmarking, and agent-vs-agency pages.

### Priority 2: complete GEO guide

Page: `/blog/generative-engine-optimization-geo-guide`

Why second:

- `generative engine optimization` has 81 impressions around position 34.8;
- the page received 3 organic sessions, but all were unengaged;
- Google crawled it recently and its canonical is correct.

Actions:

- Replace unsupported percentages and timelines with cited evidence or remove them.
- Add original examples, before/after content blocks, and a practical implementation checklist.
- Add named author/reviewer expertise and an explicit review date.
- Give readers a useful next step near the top, not only at the end.
- Use this as the main strategy page; supporting GEO pages should link to it.

### Priority 3: SERP analyzer tools

Page: `/blog/best-serp-analyzer-tools-2026`

Why third:

- it generates 2,193 impressions, the largest page total;
- impressions fell 41.7% in the latest week;
- the main query `serp analyzer` ranks around position 68.1.

Actions:

- Fix the title/body mismatch: the title says seven tools, while the numbered sections list five.
- Add hands-on evidence: screenshots, tested workflows, data freshness, strengths, weaknesses, and pricing.
- Separate “SERP analyzer” intent from broad “SEO platform” intent.
- Add a downloadable SERP-analysis checklist or template that can earn links and email sign-ups.
- Strengthen internal links from the competitor-analysis, benchmarking, and ranking-tool guides.

### Priority 4: schema markup guide

Page: `/blog/schema-markup-seo-guide`

Why fourth:

- it generated 849 impressions but disappeared from the latest complete week;
- it ranks around position 76 for its main query group;
- Google confirms it remains indexed, so this is a quality/authority problem rather than deindexing.

Actions:

- Fix the title/body mismatch: the title promises seven schema types while the main section lists six.
- Remove or source claims such as adoption percentages and CTR increases.
- Verify examples against current Google-supported structured-data guidance.
- Add validated JSON-LD examples, test dates, screenshots from validation, and common failure modes.
- Update FAQ copy that currently contains unsupported performance claims.

### Priority 5: GEO definition page

Page: `/blog/what-is-geo-optimization`

Why fifth:

- it overlaps with the complete GEO guide;
- impressions declined sharply after Google's initial testing period;
- it targets the definition query while the long guide should target the strategy query.

Actions:

- Make this the concise definition page for `what is GEO` and `what is GEO optimization`.
- Put a clear 40-60 word definition immediately below the introduction.
- Remove duplicated FAQ questions and reduce strategy sections that compete with the complete guide.
- Link prominently to the complete GEO guide for implementation details.
- Keep one page focused on definition and the other focused on execution.

## Days 31-60: build authority, not content volume

The site is new and the five main articles were published in early June. Their initial exposure followed by declining impressions is consistent with Google testing new pages without enough supporting authority.

Actions:

- Earn 4-8 relevant referring domains to the priority pages, focusing on quality rather than directory volume.
- Contact tools included in comparison articles with a factual review request; corrections, mentions, and shares can create legitimate links.
- Publish one original asset worth citing: a SERP analysis template, benchmark dataset, or small free diagnostic tool.
- Contribute expert commentary or case studies to SEO/GEO newsletters, podcasts, and industry sites.
- Add contextual internal links from existing relevant articles and commercial pages. Use descriptive anchors, not repeated exact-match spam.
- Do not purchase bulk links or publish generic guest posts on unrelated sites.

## Days 61-90: scale only what Google validates

- Compare each priority page's latest 28 days with the preceding 28 days.
- Continue investing in pages that gain impressions and move into positions 11-30.
- Merge or sharply differentiate pages that repeatedly compete for the same query.
- Publish at most one evidence-led supporting article every two weeks.
- Prefer case studies, original data, templates, and implementation tutorials over another broad listicle.
- Improve CTAs using production-only engaged-session and lead data.

## Weekly operating routine

Run this once per week, using complete GSC data rather than daily fluctuations:

1. Record GSC clicks, impressions, CTR, and position by priority page.
2. Record the number of non-brand queries in positions 1-10, 11-20, and 21-30.
3. Record the share of impressions attributed to `www` URLs.
4. Record production-only organic sessions, engaged sessions, leads, and lead conversion rate in GA4.
5. Log the page updates, internal links, and earned links shipped that week.
6. Choose one next action from evidence; do not change every page simultaneously.

## 30/60/90-day targets

These are directional operating targets, not guarantees.

### By day 30

- Production analytics is clean enough to trust.
- At least one meaningful key event is recording.
- All five priority pages have corrected intent, evidence, and title/body consistency.
- Every priority article has a contextual acquisition CTA.
- The obsolete `www` sitemap is removed from GSC.

### By day 60

- At least three non-brand queries reach positions 11-30.
- The AI SEO tools page moves toward the top 20 for its benchmarking query group.
- The GEO guide moves toward the top 25-30 for `generative engine optimization`.
- Four or more relevant referring domains point to priority assets.

### By day 90

- Target 25-50 GSC clicks per 28 days from the current baseline of 2.
- Target 75-120 clean organic sessions per 28 days from the current baseline of 29.
- Establish a measurable organic lead baseline and improve it from there.
- Reduce historical `www` impressions to less than 5% of page-level impressions.

## What not to do

- Do not publish ten more broad SEO articles this month.
- Do not change URLs that already have Google signals.
- Do not treat sitemap `indexed: 0` as proof that no pages are indexed; URL Inspection confirms the priority pages are indexed.
- Do not optimize against contaminated GA4 traffic.
- Do not judge results within a few days. Review 28-day periods and allow for GSC's normal 2-3 day delay.
- Do not expect on-page changes alone to move highly competitive terms from position 70 to page one; relevant authority and original evidence are required.

## Immediate execution order

1. Implement GA4 lead events and traffic cleanup.
2. Add the reusable blog CTA.
3. Upgrade the AI SEO tools comparison.
4. Upgrade the complete GEO guide.
5. Upgrade the SERP analyzer comparison.
6. Repair the schema guide and separate the two GEO intents.
7. Begin authority outreach and create one link-worthy asset.
8. Re-measure weekly and adjust only from GSC/GA4 evidence.
