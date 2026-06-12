# Content Team SOP: Brand-Led Keyword Research and SERP Analysis

Version: 1.0  
Last updated: June 11, 2026  
Owner: Content and Growth team  
Tools required: SerpAPI account, Google Search Console access, brand strategy document

---

## 1. Purpose

This SOP ensures every piece of content published by SERP Strategists reinforces the brand position as an AI Growth Operator. It prevents drift into generic SEO-tool territory by making brand strategy the first filter for all keyword and content decisions.

---

## 2. When to Use This SOP

Use this process before:

- Writing a new blog post or landing page.
- Refreshing an existing page.
- Adding a new page to the sitemap.
- Deciding whether to target a keyword a competitor ranks for.
- Evaluating content requests from stakeholders.

---

## 3. Decision Flow

```
Brand strategy check
        ↓
Does this keyword strengthen our category position?
        ↓ YES                        ↓ NO → Reject or deprioritize
Identify buyer pain or trigger
        ↓
Define page intent (commercial, comparison, educational, trust)
        ↓
Run SerpAPI SERP analysis
        ↓
Decide page action (create, refresh, consolidate, ignore)
        ↓
Assign to content queue with priority score
```

---

## 4. Step-by-Step Process

### Step 1: Category Gate

Before researching a keyword, answer this question:

> Does this term strengthen one of our five strategic territories?

1. AI Growth Operator
2. AI SEO agent / SEO automation
3. Autonomous search operations
4. AI visibility, GEO, citation-readiness education
5. Commercial-intent search workflows (SERP analysis, benchmarking, pricing, alternatives)

If the answer is no, stop. Do not research further.

### Step 2: Buyer Pain Mapping

Identify which persona and buying trigger this keyword serves:

| Persona | Example triggers |
|---|---|
| Founder | Paid CAC rising, no time for SEO, traffic flat |
| Startup growth lead | Small team, targets rising, agency contract under review |
| Agency | Margins shrinking, clients asking about AI visibility |
| Marketing lead | Pipeline gap, content not ranking, competitors in AI answers |
| Enterprise | Board AI initiative, brand misinformation in AI, compliance needs |

Write one sentence: "A [persona] searching this term is trying to [job]."

### Step 3: Define Page Intent

Choose one:

| Intent type | What the page does | Examples |
|---|---|---|
| Commercial | Sells the product directly | Homepage, pricing, feature pages |
| Comparison | Helps buyers evaluate options | vs pages, alternatives, pricing comparisons |
| Educational | Teaches a concept with product bridge | Guides, how-tos, explainers |
| Trust | Builds confidence and reduces objections | FAQ, about, case studies |
| Category education | Teaches the market a new frame | GEO explainer, AI Growth Operator definition |

One page = one intent. Do not mix.

### Step 4: Run SerpAPI Analysis

For the target keyword, pull and record:

1. **Organic results**: list top 10 URLs and their page types.
2. **Related searches**: capture all related queries shown.
3. **People Also Ask**: record every PAA question.
4. **Title patterns**: note repeating structures (numbers, years, modifiers).
5. **Meta descriptions**: note length and hooks used by top pages.
6. **Dominant angle**: what perspective do winning pages take?
7. **Page types in top 10**: listicle, guide, product page, comparison, glossary?
8. **Competitor frequency**: which domains appear more than once?
9. **AI Overview presence**: is there an AI-generated answer panel?
10. **Modifiers**: best, pricing, comparison, alternative, software, guide, tool, 2026?

### Step 5: Decide Page Action

Use this decision matrix:

| Situation | Action |
|---|---|
| We have an existing page with GSC impressions | Refresh and strengthen |
| No existing page, SERP matches our brand | Create new page |
| Multiple thin pages target same intent | Consolidate into one strong page |
| SERP is dominated by incumbents with 10x authority | Deprioritize or find a niche angle |
| Keyword is high volume but weak brand fit | Ignore |
| SERP favors product pages | Build product/feature landing page |
| SERP favors education | Build educational content |

### Step 6: Score and Queue

Rate the keyword on these dimensions (High / Medium / Low):

1. **Brand fit**: does it reinforce AI Growth Operator?
2. **Buyer intent**: is the searcher evaluating or buying?
3. **SERP fit**: can we realistically compete?
4. **Business value**: will traffic convert?
5. **Content leverage**: does this page strengthen the cluster?
6. **Existing traction**: does GSC show early signals?

Priority assignment:

- 5-6 "High" scores → build now
- 3-4 "High" scores → queue for next sprint
- 0-2 "High" scores → track only

---

## 5. Research Cadence

| Frequency | Activity | Owner |
|---|---|---|
| Weekly | Run SerpAPI checks on priority keywords, note position changes | Content lead |
| Weekly | Review GSC query report for pages already indexed | Content lead |
| Biweekly | Refresh the priority queue using brand fit + live SERP evidence | Content lead + strategy |
| Monthly | Decide page actions: create, refresh, consolidate, redirect | Content lead + founder |
| Quarterly | Review keyword map against brand strategy for drift | Strategy owner |

---

## 6. Content Brief Template

Before writing, fill this brief:

```
## Content Brief

Target keyword: [primary term]
Secondary terms: [2-4 related terms]
Page intent: [commercial / comparison / educational / trust / category education]
Persona: [founder / startup / agency / marketer / enterprise]
Buyer trigger: [what situation makes them search this]
Page type: [guide / listicle / comparison / landing page / glossary]
Existing page to refresh: [URL or "new"]
GSC traction: [impressions/clicks if any, or "none yet"]

## SERP Analysis Summary

Top 3 competing pages:
1. [URL] — [angle]
2. [URL] — [angle]
3. [URL] — [angle]

Dominant page type in SERP: [listicle / guide / product / comparison]
People Also Ask questions to cover:
- [question 1]
- [question 2]
- [question 3]

Related searches to weave in:
- [term 1]
- [term 2]
- [term 3]

## Our Angle

What makes our page different or more credible:
[1-2 sentences]

Product bridge CTA:
[What action do we want readers to take?]

Internal links to include:
- [page 1]
- [page 2]
```

---

## 7. Quality Gates

Before publishing, verify:

1. Title includes the primary keyword naturally.
2. H1 matches the page intent and does not duplicate another page's H1.
3. Meta description is 140-160 characters and includes primary keyword.
4. The page targets ONE dominant intent.
5. Internal links point to at least 2 related pages.
6. At least one internal link points back to the homepage with a natural anchor.
7. FAQ schema is added if People Also Ask questions are covered.
8. The page does not cannibalize an existing page's primary keyword.
9. The content uses brand voice: precise, calm, outcome-focused.
10. Product CTA is present but not forced.

---

## 8. Rejection Criteria

Do NOT create content for:

- Generic "what is SEO" topics with no product bridge.
- Broad marketing advice that does not connect to search operations.
- Keywords where the SERP is entirely enterprise incumbents and we have no angle.
- Duplicate intent that an existing page already covers well.
- Clickbait topics that weaken brand trust.
- Keywords that position us as "just another AI writer" or "content tool."

---

## 9. Tools Setup

### SerpAPI

- Endpoint: `https://serpapi.com/search`
- Required parameters: `q` (query), `engine` (google), `location` (United States), `gl` (us), `hl` (en)
- Key outputs: `organic_results`, `related_searches`, `people_also_ask`, `ai_overview`
- Auth: Bearer token via `SERPAPI_API_KEY`

### Google Search Console

- Property: `sc-domain:serpstrategists.com`
- Key reports: Performance → Queries, Performance → Pages
- Use for: confirming impressions, validating early traction, spotting cannibalization

### Brand Strategy Document

- Location: `SERP-Strategists-Brand-Strategy.md`
- Key sections: Strategic Filters, Keyword Cluster Structure, Page-Level Keyword Map, Decision Rules

---

## 10. Ownership

| Role | Responsibility |
|---|---|
| Content lead | Runs research, writes briefs, manages queue |
| Strategy owner | Reviews keyword map quarterly, guards brand fit |
| Writer | Follows brief, respects voice guidelines, submits for review |
| Founder | Approves monthly page decisions, reviews commercial content |
