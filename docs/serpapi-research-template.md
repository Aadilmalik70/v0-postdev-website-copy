# SerpAPI Keyword Research Template

Version: 1.0  
Last updated: June 11, 2026  
Purpose: Standardized schema for recording SerpAPI keyword research and SERP analysis results.

---

## How to Use

1. Copy the Keyword Research Record template for each new keyword you research.
2. Fill it using SerpAPI output plus manual review.
3. Score using the prioritization model at the bottom.
4. Add the completed record to the research log below.

---

## SerpAPI Query Parameters

Use these defaults for every research query:

```json
{
  "engine": "google",
  "q": "[TARGET KEYWORD]",
  "location": "United States",
  "gl": "us",
  "hl": "en",
  "num": 10
}
```

Optional parameters for deeper analysis:

```json
{
  "tbm": "",
  "tbs": "qdr:m",
  "start": 0
}
```

- Use `tbs: qdr:m` to check freshness bias (results from last month only).
- Use `start: 10` to see page 2.

---

## Keyword Research Record Template

Copy this block for each keyword researched:

```
═══════════════════════════════════════════════════════════════
KEYWORD RESEARCH RECORD
═══════════════════════════════════════════════════════════════

Date researched: [YYYY-MM-DD]
Researcher: [name]

───────────────────────────────────────────────────────────────
1. KEYWORD DATA
───────────────────────────────────────────────────────────────

Primary keyword: [term]
Secondary keywords: [term 1, term 2, term 3]
Search intent: [commercial / comparison / educational / navigational]
Buyer persona: [founder / startup / agency / marketer / enterprise]

───────────────────────────────────────────────────────────────
2. BRAND FIT CHECK
───────────────────────────────────────────────────────────────

Strategic territory: [which of the 5 brand territories does this serve?]
  1. □ AI Growth Operator
  2. □ AI SEO agent / SEO automation
  3. □ Autonomous search operations
  4. □ AI visibility / GEO / citation education
  5. □ Commercial search workflows (benchmarking, pricing, alternatives)

Brand fit verdict: [PASS / FAIL / BORDERLINE]
Reason: [one sentence]

───────────────────────────────────────────────────────────────
3. SERP ANALYSIS (from SerpAPI)
───────────────────────────────────────────────────────────────

Total organic results: [number]
AI Overview present: [yes / no]
Featured snippet: [yes / no — type: paragraph / list / table]
People Also Ask questions:
  1. [question]
  2. [question]
  3. [question]
  4. [question]
  5. [question]

Related searches:
  1. [term]
  2. [term]
  3. [term]
  4. [term]
  5. [term]
  6. [term]
  7. [term]
  8. [term]

───────────────────────────────────────────────────────────────
4. TOP 10 ORGANIC RESULTS
───────────────────────────────────────────────────────────────

| # | Domain | Title | Page Type | Angle |
|---|--------|-------|-----------|-------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

Page type options: listicle, guide, product-page, comparison, glossary, tool, forum, video, news
Angle options: comprehensive-guide, tool-roundup, how-to, definition, case-study, vendor-page, comparison-table

───────────────────────────────────────────────────────────────
5. SERP PATTERNS
───────────────────────────────────────────────────────────────

Dominant page type: [which type appears most in top 10?]
Dominant content angle: [what perspective do winners take?]
Title patterns observed:
  - [pattern 1, e.g., "X Best [Tools] for [Job] in 2026"]
  - [pattern 2]
  - [pattern 3]

Common modifiers in titles: [best, top, free, pricing, vs, alternative, guide, how to]
Average title length: [approx character count]
Year in title: [yes / no — which year?]
Number in title: [yes / no — common numbers used]

Competitor domains appearing 2+ times across research:
  - [domain 1]
  - [domain 2]
  - [domain 3]

───────────────────────────────────────────────────────────────
6. CONTENT OPPORTUNITY ASSESSMENT
───────────────────────────────────────────────────────────────

Can we produce a more credible page? [yes / no / maybe]
Why: [one sentence]

Can we produce a more differentiated page? [yes / no / maybe]
Why: [one sentence]

Our angle: [what unique perspective or data can SERP Strategists bring?]

Recommended page type: [guide / listicle / comparison / landing page / glossary / tool page]

───────────────────────────────────────────────────────────────
7. GSC VALIDATION
───────────────────────────────────────────────────────────────

Existing page ranking for this term: [URL or "none"]
Current impressions (last 28 days): [number or "N/A"]
Current clicks (last 28 days): [number or "N/A"]
Current average position: [number or "N/A"]
Cannibalization risk: [yes — which pages? / no]

───────────────────────────────────────────────────────────────
8. PRIORITIZATION SCORE
───────────────────────────────────────────────────────────────

| Dimension | Score (H/M/L) | Notes |
|-----------|---------------|-------|
| Brand fit | | |
| Buyer intent | | |
| SERP fit (can we compete?) | | |
| Business value (will it convert?) | | |
| Content leverage (cluster value?) | | |
| Existing traction (GSC signals?) | | |

Overall priority: [HIGH — build now / MEDIUM — queue / LOW — track only]

───────────────────────────────────────────────────────────────
9. RECOMMENDED ACTION
───────────────────────────────────────────────────────────────

Action: [create / refresh / consolidate / redirect / ignore]
Target URL: [existing URL to refresh, or proposed new slug]
Assigned to: [name or "unassigned"]
Target publish date: [date or "TBD"]
Internal links to include:
  - [page 1]
  - [page 2]
  - [page 3]

═══════════════════════════════════════════════════════════════
```

---

## Batch Research Template

When researching multiple keywords in a session, use this condensed format:

```
═══════════════════════════════════════════════════════════════
BATCH RESEARCH LOG
Date: [YYYY-MM-DD]
Researcher: [name]
═══════════════════════════════════════════════════════════════

| # | Keyword | Intent | Brand Fit | SERP Type | AI Overview | Top Competitor | Our Page | Priority | Action |
|---|---------|--------|-----------|-----------|-------------|----------------|----------|----------|--------|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |
| 5 | | | | | | | | | |
| 6 | | | | | | | | | |
| 7 | | | | | | | | | |
| 8 | | | | | | | | | |
| 9 | | | | | | | | | |
| 10 | | | | | | | | | |

Notes:
-
```

---

## Cluster Tracker

Track keyword clusters over time:

```
═══════════════════════════════════════════════════════════════
CLUSTER: [cluster name, e.g., "AI SEO Agent"]
Strategic territory: [1-5]
Pillar page: [URL]
Last researched: [date]
═══════════════════════════════════════════════════════════════

| Keyword | Volume Signal | Our Position | Our Page | Status | Last Checked |
|---------|--------------|--------------|----------|--------|--------------|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

Status options: ranking, not-ranking, new, improving, declining, cannibalized
```

---

## SerpAPI Response Fields to Extract

When processing SerpAPI JSON responses, extract these fields:

### From `organic_results[]`:
- `position`
- `title`
- `link`
- `displayed_link`
- `snippet`

### From `related_searches[]`:
- `query`

### From `people_also_ask[]`:
- `question`
- `snippet`
- `link`

### From `ai_overview` (when present):
- `text`
- `sources[]` → `link`, `title`

### From `search_information`:
- `total_results`
- `query_displayed`

---

## Priority Decision Matrix

Quick reference for scoring:

| Score | Brand Fit | Buyer Intent | SERP Fit | Business Value | Content Leverage | Existing Traction |
|---|---|---|---|---|---|---|
| High | Directly reinforces category | Evaluating or purchasing | Top 10 has beatable pages | Traffic will convert to signups | Anchors a cluster | GSC shows impressions |
| Medium | Related to category | Problem-aware | Competitive but possible | Some conversion potential | Supports another page | No GSC data yet |
| Low | Tangential | Casual browsing | Dominated by 10x authority | Low conversion likelihood | Standalone, no cluster value | No signals |

---

## File Locations

- Brand strategy: `SERP-Strategists-Brand-Strategy.md`
- Content SOP: `docs/content-team-sop.md`
- SEO research (existing): `SEO-RESEARCH.md`
- Completed research records: `docs/keyword-research/[YYYY-MM-DD]-[keyword-slug].md`
- Batch logs: `docs/keyword-research/batch-[YYYY-MM-DD].md`
