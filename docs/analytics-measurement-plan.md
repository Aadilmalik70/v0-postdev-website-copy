# Conversion analytics measurement plan

Last updated: July 17, 2026

## Objective

Measure the path from content or homepage discovery to a completed free audit and a full-workspace registration click.

```text
Page visit
→ Product or pricing interest
→ Audit modal opened
→ Free audit started
→ Free audit completed or failed
→ Full audit unlock clicked
```

The implementation uses custom GA4 events because the funnel includes product-specific interactions that are not fully represented by automatically collected events.

## Event contract

| Event | Trigger | Important parameters | GA4 recommendation |
|---|---|---|---|
| `audit_modal_open` | A closed audit modal becomes visible | `lead_source`, `cta_placement`, `article_slug`, `plan_name`, `page_path` | Diagnostic event |
| `free_audit_started` | The free-audit request is accepted | `lead_source`, `cta_placement`, `article_slug`, `plan_name`, `page_path` | Secondary key-event candidate |
| `free_audit_complete` | The audit reaches completed status | previous context plus `score` | Primary key event |
| `free_audit_failed` | Submission, polling, or processing fails | previous context plus `failure_stage` | Reliability diagnostic |
| `full_audit_unlock_click` | User clicks from the free result to workspace registration | previous context plus `score` | Qualified-lead key-event candidate |
| `pricing_interest` | User opens pricing or selects a pricing tier | `cta_placement`, `plan_name`, `page_path` | Funnel diagnostic |
| `template_download` | User clicks one of the AI-visibility CSV templates | `template_name`, `cta_placement`, `article_slug`, `page_path` | Engagement diagnostic |
| `blog_product_cta_click` | User uses a blog CTA to open the audit, demo, integrations, pricing, or operator section | `article_slug`, `cta_placement`, `cta_variant`, `destination_type`, `page_path` | Content-assist diagnostic |
| `external_pricing_source_click` | User exits the pricing-comparison article to an official vendor source | `article_slug`, `cta_placement`, `source_host`, `page_path` | Commercial-research diagnostic |

Every event receives `page_path` automatically. Preview or explicitly enabled debug sessions also receive `debug_mode`.

## Privacy and PII rules

Never send these values to GA4:

- email address
- submitted website or customer domain
- audit token
- full destination URL
- raw query string
- raw API or validation error
- free-form user input

`lib/analytics.ts` drops parameter names associated with these values, rejects email-like and URL-like strings, truncates long strings, and only accepts strings, finite numbers, and booleans.

The `source_host` parameter is limited to the public vendor hostname clicked from the published pricing-comparison article. It is not a submitted lead domain.

## GA4 setup after deployment

### Mark key events

Recommended starting configuration:

1. Mark `free_audit_complete` as the primary key event.
2. Mark `full_audit_unlock_click` as a second key event when it represents a qualified handoff to workspace registration.
3. Keep `free_audit_started` as a normal event initially. Promote it only if audit completion is frequently delayed or unavailable.
4. Do not mark modal opens, pricing clicks, template downloads, or vendor exits as key events.

Official reference: https://support.google.com/analytics/answer/13128484

### Create event-scoped custom dimensions

Create event-scoped dimensions for the categorical parameters used in funnel analysis:

- `lead_source`
- `cta_placement`
- `article_slug`
- `plan_name`
- `failure_stage`
- `template_name`
- `cta_variant`
- `destination_type`
- `source_host`

`page_path` already maps to a standard GA4 page dimension and does not require a custom definition.

Official reference: https://support.google.com/analytics/answer/14239696

Avoid creating a custom dimension for `score` unless score segmentation becomes necessary. It can remain an event parameter first, or later become a custom metric.

## Debug verification

### Vercel preview

GA4 delivery remains disabled on `*.vercel.app`, but analytics debug logging is enabled automatically.

1. Open DevTools → Console.
2. Enable **Preserve log**.
3. Filter for `[analytics]`.
4. Perform the interaction.
5. Confirm one structured log appears with the event name and safe parameters.
6. Confirm no email, submitted website, audit token, or raw error appears.

You can also inspect all emitted browser events:

```js
window.addEventListener("serpstrategists:analytics", (event) => {
  console.log("analytics debug event", event.detail)
})
```

### Production or a non-Vercel staging domain

Append this query parameter:

```text
?analytics_debug=1
```

It persists debug mode in local storage and configures GA4 with `debug_mode: true`. Use:

```text
?analytics_debug=0
```

to clear the persisted flag. Vercel previews continue to log locally because preview debug logging is automatic.

Then open GA4 → Admin → Data display → DebugView and reproduce the interaction.

Official references:

- https://support.google.com/analytics/answer/7201382
- https://support.google.com/analytics/answer/9333790

## Expected manual sequences

### Homepage hero

```text
Run Free Growth Audit
→ audit_modal_open { lead_source: homepage_hero }
→ free_audit_started
→ free_audit_complete or free_audit_failed
→ full_audit_unlock_click
```

### Blog CTA

```text
Primary blog CTA
→ blog_product_cta_click { destination_type: audit_modal }
→ audit_modal_open { article_slug, blog placement }
→ free_audit_started
→ free_audit_complete or free_audit_failed
```

The secondary blog CTA emits `blog_product_cta_click` with its actual destination type and is marked as already handled so the delegated listener does not duplicate it.

### Pricing page

```text
Plan button
→ pricing_interest { plan_name }
→ audit_modal_open { plan_name }
→ free_audit_started
```

### Template download

```text
CSV link
→ template_download { template_name, article_slug }
```

GA4 enhanced measurement may also emit the standard `file_download` event. Keep the custom `template_download` event because it identifies the specific lead-magnet asset and content source.

## Funnel exploration

Build a GA4 funnel exploration with these ordered steps:

1. `blog_product_cta_click` or `pricing_interest`
2. `audit_modal_open`
3. `free_audit_started`
4. `free_audit_complete`
5. `full_audit_unlock_click`

Break down by:

- `lead_source`
- `cta_placement`
- `article_slug`
- `plan_name`
- session source / medium
- landing page

Use an open funnel first so users who enter at later stages are still visible. Add a closed-funnel version later for campaign-specific analysis.

## Interpretation rules

| Pattern | Likely problem | First action |
|---|---|---|
| High CTA clicks, low modal opens | Click handler or modal rendering issue | Test affected CTA and browser console |
| High modal opens, low starts | Form friction or unclear value | Review fields, copy, mobile keyboard, validation |
| High starts, low completions | Audit API reliability or timeout | Segment `failure_stage` and inspect backend logs |
| High completions, low unlock clicks | Weak result-to-workspace value proposition | Improve result CTA and explain full audit value |
| Strong blog assists, weak homepage assists | Content intent is stronger than homepage positioning | Route more internal links toward proven articles |
| High pricing interest, low starts | Pricing curiosity without trust or fit | Review plan scope and early-access expectations |

## Release guardrails

- Do not publish conversion-rate claims until at least four complete weekly periods have been collected.
- Do not compare CTA placements with very small samples.
- Keep preview traffic out of GA4; use local debug logs there.
- Review event names and parameters before adding new ones to prevent fragmentation.
- Treat a completed audit as the primary lead outcome, not a modal open or button click.
