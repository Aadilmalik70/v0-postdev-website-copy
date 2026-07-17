export const ANALYTICS_DEBUG_EVENT = "serpstrategists:analytics"

export type AnalyticsPrimitive = string | number | boolean

type AuditContext = {
  lead_source: string
  cta_placement: string
  article_slug?: string
  plan_name?: string
}

export interface AnalyticsEventPayloads {
  audit_modal_open: AuditContext
  free_audit_started: AuditContext
  free_audit_complete: AuditContext & { score?: number }
  free_audit_failed: AuditContext & {
    failure_stage: "submission" | "polling" | "processing"
  }
  full_audit_unlock_click: AuditContext & { score?: number }
  pricing_interest: {
    cta_placement: string
    plan_name?: string
  }
  template_download: {
    template_name: string
    cta_placement: string
    article_slug?: string
  }
  blog_product_cta_click: {
    article_slug: string
    cta_placement: string
    cta_variant?: string
    destination_type: "audit_modal" | "demo" | "integrations" | "pricing" | "operator"
  }
  external_pricing_source_click: {
    article_slug: string
    cta_placement: string
    source_host: string
  }
}

export type AnalyticsEventName = keyof AnalyticsEventPayloads

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

const DEBUG_STORAGE_KEY = "serp_analytics_debug"
const FORBIDDEN_PARAMETER_NAME = /(email|website|domain|audit_token|token|page_location|full_url|search_term)/i
const EMAIL_LIKE_VALUE = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/i
const URL_LIKE_VALUE = /https?:\/\//i

function cleanValue(value: unknown): AnalyticsPrimitive | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined
  }

  if (typeof value === "boolean") return value
  if (typeof value !== "string") return undefined

  const cleaned = value.trim().slice(0, 100)
  if (!cleaned || EMAIL_LIKE_VALUE.test(cleaned) || URL_LIKE_VALUE.test(cleaned)) return undefined
  return cleaned
}

function sanitizeParams(params: Record<string, unknown>) {
  const safe: Record<string, AnalyticsPrimitive> = {}

  for (const [key, value] of Object.entries(params)) {
    if (FORBIDDEN_PARAMETER_NAME.test(key)) continue
    const cleaned = cleanValue(value)
    if (cleaned !== undefined) safe[key] = cleaned
  }

  return safe
}

export function isAnalyticsDebugEnabled() {
  if (typeof window === "undefined") return false

  const queryValue = new URLSearchParams(window.location.search).get("analytics_debug")
  if (queryValue === "1") window.localStorage.setItem(DEBUG_STORAGE_KEY, "1")
  if (queryValue === "0") window.localStorage.removeItem(DEBUG_STORAGE_KEY)

  return (
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true" ||
    window.location.hostname.endsWith(".vercel.app") ||
    window.localStorage.getItem(DEBUG_STORAGE_KEY) === "1"
  )
}

export function trackEvent<EventName extends AnalyticsEventName>(
  eventName: EventName,
  params: AnalyticsEventPayloads[EventName],
) {
  if (typeof window === "undefined") return

  const debugMode = isAnalyticsDebugEnabled()
  const payload = sanitizeParams({
    ...params,
    page_path: window.location.pathname,
    debug_mode: debugMode,
  })

  const analyticsWindow = window as AnalyticsWindow
  analyticsWindow.gtag?.("event", eventName, payload)

  window.dispatchEvent(
    new CustomEvent(ANALYTICS_DEBUG_EVENT, {
      detail: { event_name: eventName, params: payload },
    }),
  )

  if (debugMode) {
    console.info(`[analytics] ${eventName}`, payload)
  }
}
