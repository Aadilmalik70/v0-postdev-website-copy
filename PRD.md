# SERP Strategists — Product Requirements Document v2.1

**Date:** 2026-07-08
**Stage:** MVP → Early Access
**ICP:** Technical SaaS founders
**Model:** Self-serve SaaS
**Primary surface:** Web Operator Console

---

## 1. Product Definition

SERP Strategists is an **AI SEO Operator** that turns crawl data, GSC metrics, and GA4 analytics into a prioritized, evidence-backed action queue — where every item shows exactly what to change, why, how risky it is, who approved it, and what happened after.

**Core object:** `OperatorAction`
**Core interface:** Action Queue
**Core loop:**

```
Observe → Prioritize → Plan → Approve → Execute → Measure → Improve
```

---

## 2. The Free / Paid Boundary

This is the entire business model:

```
Free Audit (Audit tier — $0)
├── Input: URL (triggers crawl) OR CSV upload
├── System generates full action queue (40–60 actions)
├── Shows top 10 actions with full evidence
├── Shows AI visibility readiness score
├── Shows "+X more actions found" locked badge
└── CTA: "Unlock full queue + execution → $49/mo"

Growth tier ($49/mo)
├── Full action queue unlocked
├── GSC integration for prioritization
├── GA4 integration for conversion + session signals
├── Approval gates
├── GitHub PR execution
├── Execution logs + rollback metadata
└── 1 site

Scale tier ($99/mo)
├── Everything in Growth
├── AI citation tracking
├── Competitor source monitoring
├── 3 sites
└── Priority support
```

The top 10 free actions are the highest-priority ones — genuinely useful, not artificially degraded. That is what drives upgrade.

---

## 3. Data Ingestion: Two Paths, One Normalizer

Both paths feed the same `CrawlPage` normalizer.

### Path A: CSV Upload (ships first)

- Accept Screaming Frog, Ahrefs, or manual CSV export
- Parse columns: URL, title, meta description, H1, status code, canonical, word count, inbound links, page type
- Normalizes into `CrawlPage` records immediately

### Path B: Managed LibreCrawl (ships alongside or week 2)

- User inputs domain
- System calls LibreCrawl wrapper `start_chunked_audit`
- Polls `audit_status` — shows live progress in UI
- Imports `per-page.csv` artifact → same normalizer
- Also imports `sitemap-recon.csv`, `external-links.csv`, `content-audit.csv`

**Both paths feed the identical action generation pipeline.** No special-casing per ingestion method.

---

## 4. Six Action Types

### Action 1: Canonical Fix

| Field | Detail |
|-------|--------|
| **Trigger** | Canonical points to redirect, canonical missing, canonical conflict, self-referential loop broken |
| **Evidence** | Redirect chain diagram, HTTP status codes, target URL, affected pages count |
| **Output** | Exact canonical tag to replace, diff, validation plan |
| **Execution** | `github_pr` — modifies `<link rel="canonical">` in `<head>` |
| **Risk** | Medium |
| **Validation** | Re-crawl URL, canonical resolves to 200, no noindex |

### Action 2: Metadata Refresh

| Field | Detail |
|-------|--------|
| **Trigger** | Missing title, duplicate title across pages, title over 60 chars, low CTR page (GSC: >200 impressions, <1.5% CTR) |
| **Evidence** | Current title, GSC impressions + CTR + avg position, GA4 page views + bounce rate, 2 rewrite alternatives with character counts |
| **Output** | New title + meta description suggestions, expected CTR delta |
| **Execution** | `github_pr` — modifies `<title>` and `<meta name="description">` |
| **Risk** | Low |

### Action 3: Orphan Page Internal Link

| Field | Detail |
|-------|--------|
| **Trigger** | Sitemap URL has 0–1 inbound internal links |
| **Evidence** | Page URL, topic cluster assignment, 3 suggested source pages, proposed anchor text for each, GA4 entry page rate |
| **Output** | Link plan: source → target, anchor, placement context |
| **Execution** | `manual` instructions (links require content edit context) |
| **Risk** | Low |

### Action 4: Schema Add

| Field | Detail |
|-------|--------|
| **Trigger** | Missing `FAQPage`, `Organization`, `BreadcrumbList`, `SoftwareApplication`, `Article` schema detected by page type |
| **Evidence** | Page type, existing schema inventory, competitor schema presence |
| **Output** | Full JSON-LD draft, placement instructions, validator link |
| **Execution** | `github_pr` — injects `<script type="application/ld+json">` |
| **Risk** | Low |

### Action 5: AI Citation Gap

| Field | Detail |
|-------|--------|
| **Trigger** | Competitor brand mentioned/cited in AI prompt run, user brand absent |
| **Evidence** | Prompt text, AI platform (ChatGPT/Perplexity/Gemini), competitor mention, source URLs cited |
| **Output** | Content/source gap identified, recommended page type to create or strengthen |
| **Execution** | `manual` — content strategy recommendation |
| **Risk** | Low |

### Action 6: Content Refresh (IGO + Semantic)

| Field | Detail |
|-------|--------|
| **Trigger** | Page in GSC positions 5–20 with >500 impressions; word count below competitor avg; semantic entity gaps detected; GA4 high bounce rate on organic sessions |
| **Evidence (Phase 1)** | GSC position + impressions + CTR, word count vs competitor avg, GA4 organic session count + avg engagement time + bounce rate |
| **Evidence (Phase 2, week 9)** | Missing entities list, competitor entity coverage, information gain delta score, specific missing sections |
| **Output** | List of missing entities, recommended new sections, FAQ suggestions, expected position movement range |
| **Execution** | `manual` (content additions require human judgment) |
| **Risk** | Low–Medium |

---

## 5. Scoring Model

Every action gets five scores:

```
impactScore      — traffic/ranking uplift potential (1–10)
confidenceScore  — evidence certainty (1–10)
effortScore      — implementation work (1–10, lower = less effort)
riskScore        — risk of negative outcome (1–10, lower = safer)
urgencyScore     — time sensitivity (1–10)

priorityScore = (impact × confidence × urgency) / (effort + risk)
```

**GSC signals** weight `impactScore` by actual impression volume.
**GA4 signals** weight `urgencyScore` — a high-traffic page with rising bounce rate and falling conversion gets higher urgency than a low-traffic page with the same GSC gap.

---

## 6. GSC Integration

### Scope
- OAuth 2.0, `webmasters.readonly` scope
- Sync Search Analytics: clicks, impressions, CTR, avg position per page + per query
- Sync URL Inspection: index status per key page
- Sync Sitemaps: submitted vs indexed counts

### What it unlocks in the action queue

| GSC signal | Effect |
|------------|--------|
| >200 impressions + CTR <1.5% | Triggers Metadata Refresh action |
| Position 5–20 + high impressions | Boosts Content Refresh priority |
| Position 11–20 pages | Flagged as "quick win" cluster |
| URL not indexed in GSC | Triggers indexation investigation action |
| Impressions drop >30% over 28 days | Content decay signal added to Content Refresh |
| Impressions exist on page with 0 internal links | Boosts Orphan Page action priority |

### Sync cadence
- On demand: manual sync button
- Growth tier: daily background sync (pg_cron)

---

## 7. GA4 Integration

### Scope
- OAuth 2.0, `analytics.readonly` scope
- GA4 Data API v1beta
- Pull page-level metrics: sessions, users, engagement rate, bounce rate, avg engagement time, conversions (goal completions)
- Filter by `sessionDefaultChannelGroup == "Organic Search"` to isolate SEO-driven traffic

### What it unlocks in the action queue

| GA4 signal | Effect |
|------------|--------|
| High organic sessions + high bounce rate | Boosts Content Refresh urgency |
| High organic sessions + low conversion rate | Flags conversion optimization gap — adds to action evidence |
| Page with GSC impressions but near-zero GA4 sessions | Signals CTR problem — boosts Metadata Refresh priority |
| Page with rising sessions but falling engagement time | Content quality decay signal |
| Top organic landing pages | Prioritized in Orphan Page + Schema actions |
| Post-execution: sessions increase after action ships | Positive measurement outcome |

### What it adds to measurement

Every shipped action now compares:

```
Before:
  GSC clicks, impressions, CTR, avg position
  GA4 organic sessions, bounce rate, conversions

After (at window close):
  Same metrics — delta calculated
  Outcome: positive / neutral / negative / insufficient
```

GA4 conversion data is the strongest signal for proving ROI to founders.

### Sync cadence
- On demand: manual sync
- Growth tier: daily background sync

---

## 8. Approval System

```
Low risk (schema, internal links, meta):
  → Auto-prepared, user clicks Approve to queue for execution

Medium risk (title tags, content refresh, canonical):
  → Requires manual approval, shows diff first

High risk (robots.txt, noindex changes, redirects):
  → Requires explicit approval + rollback plan visible
  → Not in MVP scope
```

Every approval stores: `actor`, `timestamp`, `action version`, `risk level at time of approval`.

---

## 9. GitHub PR Execution (MVP executor)

Triggered after user approves a `github_pr` action:

```
1. GitHub OAuth connect (first time only)
2. User selects repo
3. System creates branch: serp/{action-type}-{slug}-{date}
4. Applies minimal diff (title tag, canonical, schema injection)
5. Creates PR with:
   - Evidence summary as PR description
   - Before/after diff
   - Validation checklist as PR comment
   - Link back to Action detail in SERP Strategists
6. Action status → "Shipped"
7. Measurement window starts (14 days default)
```

**MVP scope for GitHub executor:**
- `<title>` and `<meta name="description">` in HTML/JSX/TSX
- `<link rel="canonical">` in `<head>`
- `<script type="application/ld+json">` injection

Out of scope for MVP: WordPress, Shopify, Webflow, content body edits.

---

## 10. Measurement System

Every shipped action enters a measurement window:

```
Window: 14 days default (user can set 7, 30, 60, 90)

Metrics collected:
  GSC:
    - Clicks before vs after
    - Impressions before vs after
    - CTR before vs after
    - Average position before vs after

  GA4 (if connected):
    - Organic sessions before vs after
    - Bounce rate before vs after
    - Avg engagement time before vs after
    - Conversions before vs after

Outcome:
  positive      — clear improvement across ≥2 metrics
  neutral       — no significant change
  negative      — regression detected
  insufficient  — not enough data yet

Learning signal stored:
  - Action type
  - Page type + topic cluster
  - Which metrics moved
  - Used to adjust future confidence scores
```

---

## 11. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js + TypeScript + Tailwind + shadcn/ui | Already built |
| Auth | Clerk | Fastest Next.js integration, handles OAuth flows |
| Payments | Stripe Checkout + Webhooks | Simple subscription management |
| Database | Supabase (Postgres) | Postgres + storage + realtime in one hosted service |
| File storage | Supabase Storage | CSV artifact storage |
| Crawl | LibreCrawl wrapper (Railway deploy) | Managed, no local infra |
| GSC | Google Search Console API v1 | `webmasters.readonly` scope |
| GA4 | Google Analytics Data API v1beta | `analytics.readonly` scope |
| GitHub | GitHub OAuth + Octokit | PR creation, branch management |
| Background jobs | Supabase Edge Functions + pg_cron | Simple, no Redis/Temporal needed yet |
| Hosting | Vercel | Already deployed |
| Error tracking | Sentry | |
| Product analytics | PostHog | Funnel tracking |

**Deferred:** Temporal, Redis, pgvector, Neo4j, ClickHouse, Semantic graph — none until month 4+.

---

## 12. Data Model (MVP tables)

```sql
workspaces
  id, name, owner_id, created_at

users
  id, clerk_id, email, plan, created_at

sites
  id, workspace_id, domain, settings jsonb

crawl_runs
  id, site_id, source (csv|librecrawl), status, created_at

crawl_pages
  id, crawl_run_id, url, title, meta, canonical, status_code,
  word_count, inbound_links, schema_types[], raw_csv_row jsonb

crawl_findings
  id, crawl_run_id, page_id, finding_type, severity, data jsonb

-- Google Search Console
gsc_connections
  id, site_id, property_url, access_token, refresh_token, last_synced_at

gsc_page_metrics
  id, site_id, url, clicks, impressions, ctr, avg_position, date

gsc_query_metrics
  id, site_id, url, query, clicks, impressions, ctr, avg_position, date

gsc_url_inspection
  id, site_id, url, index_status, last_crawl_time, verdict, checked_at

-- Google Analytics 4
ga4_connections
  id, site_id, property_id, access_token, refresh_token, last_synced_at

ga4_page_metrics
  id, site_id, url, sessions, users, bounce_rate, avg_engagement_time,
  conversions, channel (organic_search | all), date

-- Operator Actions
operator_actions
  id, site_id, title, category, status, target_url,
  evidence jsonb, plan jsonb,
  impact_score, confidence_score, effort_score, risk_score, priority_score,
  execution_target, requires_approval, created_at

approval_requests
  id, action_id, approved_by, approved_at, version, risk_level

execution_runs
  id, action_id, target (github|manual), status,
  before_snapshot jsonb, pr_url, log jsonb, created_at

rollback_plans
  id, execution_run_id, method, before_snapshot_id, steps jsonb

measurement_runs
  id, action_id, window_days,
  before_gsc jsonb, after_gsc jsonb,
  before_ga4 jsonb, after_ga4 jsonb,
  outcome, created_at

audit_logs
  id, workspace_id, actor_id, event_type, payload jsonb, created_at
```

---

## 13. Core Screens

### Screen 1: Operator Overview

```
Operator status (last scan time, next scheduled)
Opportunities observed (count)
Actions awaiting approval (count + list)
Actions shipped this month
Visibility movement (GSC delta — clicks + avg position)
GA4 organic sessions trend (if connected)
AI visibility readiness score
Top 3 priority actions (cards with CTAs)
Recent execution timeline
```

### Screen 2: Action Queue

```
Tabs: Ready | Needs Review | Approved | Executing | Shipped | Measuring | Failed

Each action card shows:
  Priority score  |  Impact  |  Confidence  |  Effort  |  Risk
  Category badge  |  Target URL
  Evidence summary (one line)
  GSC badge (if backed by GSC data)
  GA4 badge (if backed by GA4 data)
  Expected outcome
  Status badge
  CTA: View Details / Approve / Ask Copilot

Free tier: top 10 visible, rest show locked cards with "+X more"
```

### Screen 3: Action Detail

```
Title + Status badge
Category  |  Target URL  |  Created by

Score panel:
  Priority  |  Impact  |  Confidence  |  Effort  |  Risk

Why this matters (plain English)

Evidence (expandable):
  - Crawl finding source
  - GSC metrics: impressions, CTR, avg position, query data
  - GA4 metrics: organic sessions, bounce rate, conversions
  - Raw supporting data

Proposed change:
  - Diff view (before / after)
  - Manual instructions if not auto-executable

Risk assessment:
  - Risk level label
  - What could go wrong
  - Rollback plan

Validation plan:
  - Steps to verify fix worked

Measurement plan:
  - Window  |  GSC metrics  |  GA4 metrics  |  Expected outcome

Execution logs (after shipping)

Copilot drawer (contextual — ask about this action)

Approve / Edit / Reject / Ask Copilot buttons
```

### Screen 4: Site Audit

```
Health score
Crawl run info (source, pages crawled, time)
Issues by severity (Critical / Warning / Info)
Technical issue table with filters
Page inventory
Crawl artifacts (downloadable)
```

### Screen 5: Integrations

```
Google Search Console
  Status | Last sync | Property | Connected account | Reconnect

Google Analytics 4
  Status | Last sync | Property ID | Connected account | Reconnect
  Note: shows organic channel metrics only

GitHub
  Status | Connected account | Repo list | Permissions | Reconnect

LibreCrawl
  Crawl status | Last run | Worker health
```

---

## 14. The Copilot (scoped, not primary)

Copilot is a contextual drawer on the Action Detail page. Not a chatbot, not a main surface.

**What it can do:**
- Explain why this action has a high priority score
- Simplify evidence for a non-technical reader
- Explain what the GSC or GA4 data means for this specific action
- Suggest alternative approaches
- Generate a plain-English explanation of the change
- Summarize the execution log

**What it cannot do:**
- Execute without approval
- Override the policy engine
- Access data outside the current action and site context
- Invent evidence

---

## 15. 12-Week Roadmap

### Milestone 1 — Data In (Weeks 1–3)

```
□ CSV upload parser (Screaming Frog, Ahrefs, manual)
□ CrawlPage normalizer
□ LibreCrawl wrapper integration (parallel)
□ Crawl status polling + live UI progress
□ CrawlFinding normalization (6 finding types)
□ Basic site dashboard skeleton
```

**Exit criteria:** User uploads CSV and sees raw page inventory.

---

### Milestone 2 — Action Generation (Weeks 4–6)

```
□ Action type 1: Canonical Fix
□ Action type 2: Metadata Refresh
□ Action type 3: Orphan Page Internal Link
□ Action type 4: Schema Add
□ Action type 5: AI Citation Gap (manual prompt scan first)
□ Action type 6: Content Refresh — Phase 1 (word count signal only)
□ Priority scoring model
□ Action Queue UI (tabs, cards, sorting, filtering)
□ Action Detail page (evidence, diff, risk, plan)
□ Free tier: top 10 visible, locked badge for rest
```

**Exit criteria:** User uploads CSV and sees a real prioritized action queue with 6 action types. Top 10 visible. Locked badge on rest.

---

### Milestone 3 — Auth + Stripe + Unlock (Weeks 7–8)

```
□ Clerk auth (email + Google OAuth)
□ Audit results persisted to user account
□ Stripe Checkout — Growth $49/mo, Scale $99/mo
□ Webhook handler: subscription activated → unlock full queue
□ Plan limits enforced in API
□ Upgrade CTA on locked action cards
□ Account settings (plan, billing, site management)
```

**Exit criteria:** User signs up, runs free audit, sees 10 actions, upgrades, sees full queue immediately.

---

### Milestone 4 — GSC + GA4 Integration (Weeks 9–10)

```
□ Google OAuth (shared flow for both GSC and GA4)
□ GSC: sync page-level metrics (clicks, impressions, CTR, avg position)
□ GSC: sync query-level metrics per page
□ GSC: URL inspection status for key pages
□ GSC: merge into priority scoring
       impactScore weighted by impression volume
       Metadata Refresh triggered by low CTR + high impressions
       Content Refresh upgraded with position 5–20 signal

□ GA4: property selector after OAuth
□ GA4: sync page-level organic metrics
       sessions, users, bounce rate, avg engagement time, conversions
□ GA4: filter to organic search channel only
□ GA4: merge into priority scoring
       high bounce rate boosts Content Refresh urgency
       high sessions + low conversion adds conversion gap to evidence
       high sessions + near-zero GSC impressions flags indexation issue

□ Action type 6 Phase 2: entity extraction (spaCy or LLM pass over competitor HTML)
□ GSC badge + GA4 badge on actions backed by analytics data
□ Integrations settings page
```

**Exit criteria:** After connecting GSC and GA4, action queue re-ranks in real time. Content Refresh actions show missing entities AND GA4 engagement signals. Metadata Refresh actions show both GSC CTR and GA4 session data.

---

### Milestone 5 — GitHub PR Executor (Weeks 11–12)

```
□ GitHub OAuth
□ Repo selector + branch preview
□ PR creation: title tag, meta description, canonical, schema JSON-LD
□ PR description auto-populated with evidence (GSC + GA4 data included)
□ Action status → Shipped after PR created
□ Execution log timeline on Action Detail
□ Rollback plan metadata stored
□ Before snapshot stored: GSC metrics + GA4 metrics at time of execution
□ Measurement window starts (14-day default)
□ At window close: pull GSC + GA4 before/after
□ Outcome calculation: delta across clicks, impressions, CTR, sessions, conversions
□ Outcome label: positive / neutral / negative / insufficient
```

**Exit criteria:** Approved canonical fix creates a real GitHub PR. After 14 days, GSC and GA4 outcome is recorded against the action.

---

### Milestone 6 — Early Access Launch (Post week 12)

```
□ Onboarding flow polish
□ Demo site pre-loaded for non-authenticated visitors
□ Free audit CTA on marketing site → working product
□ PostHog funnel: URL input → crawl → action queue → upgrade
□ Sentry error monitoring
□ Rate limiting on free crawls (3/day per IP)
□ First 50 beta users from waiting list
```

---

## 16. Success Metrics at Launch

| Metric | Target |
|--------|--------|
| URL → action queue (activation) | >60% of audits reach action queue |
| Free → paid conversion | >8% of users who see locked badge |
| GSC connect rate (Growth users) | >70% |
| GA4 connect rate (Growth users) | >50% |
| Time to first action queue | <3 minutes |
| Actions generated per audit | 20–60 |
| GitHub PR execution success rate | >90% |
| Weekly retention (active workspaces) | >40% at week 4 |

---

## 17. What Is Explicitly Out of Scope for v1

```
❌ WordPress executor (month 4)
❌ Shopify / Webflow / Sanity adapters (month 5+)
❌ Scheduled automated operator runs (month 4)
❌ Semantic graph visualization (month 5)
❌ pSEO Factory (month 6)
❌ Multi-site agency console (month 4, Scale tier)
❌ Slack / email alerts (month 4)
❌ Temporal workflows (month 4)
❌ Learning loop / skill success rates (month 5)
❌ Client reports (month 4)
❌ Role-based approval (month 4)
```

---

## 18. The Demo That Closes Founders

```
1. Paste their domain — crawl starts, 30 seconds
2. Action Queue: 47 actions generated
3. Top 10 visible — locked badge: "+37 more actions"
4. Open Action 1: "Canonical Fix — /pricing"
   → chain: /pricing → 301 → /pricing/ → exact fix shown
5. Open Action 2: "Metadata Refresh — /integrations"
   → GSC: 1,800 impressions, 0.8% CTR
   → GA4: 240 organic sessions, 71% bounce rate
   → 2 title alternatives shown
6. Open Action 6: "Content Refresh — /blog/saas-seo"
   → GSC position 14, 2,400 impressions
   → GA4: 94s avg engagement time (below cluster avg of 180s)
   → 11 missing semantic entities
7. "See all 37 more → upgrade"
8. Connect GSC + GA4 → queue re-ranks instantly, badges appear
9. Approve canonical fix → GitHub PR in 10 seconds
10. Action moves to Measuring
    → 14-day window set
    → Before snapshot: clicks 12, sessions 48, CTR 0.8%
```

No slides. No demo video. The product is the demo.
