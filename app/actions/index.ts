"use server"

const OPERATOR_API_URL = (
  process.env.OPERATOR_API_URL || "https://serpstrategistagent-production.up.railway.app"
).replace(/\/$/, "")

export type FreeAuditFinding = {
  code: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  evidence: string | null
}

export type FreeAudit = {
  token: string
  status: "queued" | "running" | "completed" | "failed"
  website: string
  domain: string
  score: number | null
  summary: Record<string, unknown>
  findings: FreeAuditFinding[]
  error_code: string | null
  created_at: string
  started_at: string | null
  completed_at: string | null
  retry_after_seconds: number | null
}

type FreeAuditInput = {
  email: string
  website: string
}

type ActionResult =
  | { success: true; audit: FreeAudit }
  | { success: false; error: string }

function apiErrorMessage(payload: unknown, fallback: string) {
  if (
    payload &&
    typeof payload === "object" &&
    "detail" in payload &&
    typeof (payload as { detail?: unknown }).detail === "string"
  ) {
    return (payload as { detail: string }).detail
  }
  return fallback
}

export async function submitFreeAudit(data: FreeAuditInput): Promise<ActionResult> {
  const email = data.email.trim().toLowerCase()
  const website = data.website.trim()

  if (!email || !website) {
    return { success: false, error: "Enter your work email and website URL." }
  }

  try {
    const response = await fetch(`${OPERATOR_API_URL}/public/audits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, website }),
      cache: "no-store",
    })
    const payload = await response.json().catch(() => null)
    if (!response.ok) {
      return {
        success: false,
        error: apiErrorMessage(payload, "The audit could not be started. Please try again."),
      }
    }
    return { success: true, audit: payload as FreeAudit }
  } catch {
    return {
      success: false,
      error: "The audit service is temporarily unavailable. Please try again shortly.",
    }
  }
}

export async function getFreeAudit(token: string): Promise<ActionResult> {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) {
    return { success: false, error: "Audit reference is invalid." }
  }

  try {
    const response = await fetch(`${OPERATOR_API_URL}/public/audits/${token}`, {
      method: "GET",
      cache: "no-store",
    })
    const payload = await response.json().catch(() => null)
    if (!response.ok) {
      return {
        success: false,
        error: apiErrorMessage(payload, "The audit status could not be loaded."),
      }
    }
    return { success: true, audit: payload as FreeAudit }
  } catch {
    return {
      success: false,
      error: "The audit service is temporarily unavailable.",
    }
  }
}

// Backward-compatible alias for older components while all CTAs move to the audit flow.
export async function submitEarlyAccess(data: FreeAuditInput): Promise<ActionResult> {
  return submitFreeAudit(data)
}
