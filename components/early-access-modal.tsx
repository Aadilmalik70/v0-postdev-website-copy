"use client"

import { useEffect, useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  getFreeAudit,
  submitFreeAudit,
  type FreeAudit,
  type FreeAuditFinding,
} from "@/app/actions"

interface EarlyAccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  submitText?: string
  leadSource?: string
  onSuccess?: () => void
}

const operatorUrl = (
  process.env.NEXT_PUBLIC_OPERATOR_URL || "https://web-production-53a7a.up.railway.app"
).replace(/\/$/, "")

const severityStyle: Record<string, string> = {
  critical: "bg-red-500/10 text-red-700 border-red-200",
  high: "bg-orange-500/10 text-orange-700 border-orange-200",
  medium: "bg-amber-500/10 text-amber-800 border-amber-200",
  low: "bg-neutral-100 text-neutral-600 border-neutral-200",
}

function track(event: string, params: Record<string, string | number>) {
  if (typeof window === "undefined") return
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.("event", event, params)
}

function issueCount(audit: FreeAudit, severity: string) {
  const issues = audit.summary.issues
  if (!issues || typeof issues !== "object") return 0
  const value = (issues as Record<string, unknown>)[severity]
  return typeof value === "number" ? value : 0
}

function FindingRow({ finding }: { finding: FreeAuditFinding }) {
  return (
    <div className="rounded-xl border border-line bg-paper/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">{finding.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600">{finding.description}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-1 font-mono text-[9px] uppercase tracking-wider ${
            severityStyle[finding.severity] || severityStyle.low
          }`}
        >
          {finding.severity}
        </span>
      </div>
      {finding.evidence && (
        <p className="mt-2 truncate font-mono text-[10px] text-neutral-400">{finding.evidence}</p>
      )}
    </div>
  )
}

export function EarlyAccessModal({
  isOpen,
  onClose,
  title = "Run your free growth audit",
  description = "We’ll inspect your homepage, indexability, metadata, discovery files, and technical signals—then rank the highest-impact issues.",
  submitText = "Start Free Audit →",
  leadSource = "free_audit_modal",
  onSuccess,
}: EarlyAccessModalProps) {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [audit, setAudit] = useState<FreeAudit | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isProcessing = audit?.status === "queued" || audit?.status === "running"
  const topFindings = useMemo(() => audit?.findings.slice(0, 5) ?? [], [audit?.findings])

  useEffect(() => {
    if (!audit || !isProcessing) return
    let active = true
    const delay = Math.max(1, audit.retry_after_seconds || 2) * 1000
    const timer = window.setTimeout(async () => {
      const result = await getFreeAudit(audit.token)
      if (!active) return
      if (result.success) {
        setAudit(result.audit)
        if (result.audit.status === "completed") {
          track("free_audit_complete", {
            lead_source: leadSource,
            score: result.audit.score ?? 0,
          })
          onSuccess?.()
        }
      } else {
        setError(result.error)
      }
    }, delay)
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [audit, isProcessing, leadSource, onSuccess])

  if (!isOpen) return null

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError("")
    const result = await submitFreeAudit({ email, website })
    if (result.success) {
      setAudit(result.audit)
      track("free_audit_started", { lead_source: leadSource })
      if (result.audit.status === "completed") onSuccess?.()
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  function reset() {
    setAudit(null)
    setError("")
  }

  function close() {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={close} />

      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-card shadow-2xl">
        <button
          onClick={close}
          aria-label="Close audit"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-paper text-neutral-400 transition-colors hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        {!audit && (
          <div className="p-7 md:p-10">
            <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">{title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">{description}</p>

            <div className="mt-6 grid grid-cols-2 gap-2 text-xs text-neutral-600 sm:grid-cols-4">
              {["Indexability", "Metadata", "Sitemap", "Structured data"].map((item) => (
                <div key={item} className="rounded-xl border border-line bg-paper px-3 py-2 text-center">
                  {item}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="audit-website" className="mb-2 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                  Website URL
                </label>
                <input
                  id="audit-website"
                  type="text"
                  inputMode="url"
                  required
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  placeholder="yoursite.com"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-neutral-400 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/15"
                />
              </div>

              <div>
                <label htmlFor="audit-email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                  Work email
                </label>
                <input
                  id="audit-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-neutral-400 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/15"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" disabled={loading} className="btn-ink h-12 w-full justify-center text-sm">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Starting audit…
                  </>
                ) : (
                  submitText
                )}
              </Button>
            </form>

            <p className="mt-5 text-center font-mono text-[10px] text-neutral-400">
              No credit card. Public pages only. Results usually arrive in under 30 seconds.
            </p>
          </div>
        )}

        {audit && isProcessing && (
          <div className="p-8 text-center md:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-signal/10 text-signal">
              <Loader2 className="h-7 w-7 animate-spin" />
            </div>
            <p className="eyebrow mt-6">Audit operating</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
              Inspecting {audit.domain}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
              Checking crawl access, indexability, metadata, headings, canonicals, structured data, robots.txt, and sitemap discovery.
            </p>
            <div className="mx-auto mt-7 max-w-md space-y-2 text-left">
              {["Validate public URL", "Fetch and inspect homepage", "Check discovery files", "Prioritize findings"].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm text-neutral-600">
                  {index === 0 && audit.status === "queued" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-signal" />
                  ) : index <= 1 && audit.status === "running" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-signal" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-neutral-300" />
                  )}
                  {step}
                </div>
              ))}
            </div>
            {error && <p className="mt-5 text-sm text-red-700">{error}</p>}
          </div>
        )}

        {audit?.status === "failed" && (
          <div className="p-8 text-center md:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">We couldn&apos;t audit this URL</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-600">
              The site may block automated requests, resolve to a restricted network, or have timed out. Check the URL and try again.
            </p>
            <Button onClick={reset} className="btn-ink mt-6 h-11 px-6">Try another URL</Button>
          </div>
        )}

        {audit?.status === "completed" && (
          <div>
            <div className="border-b border-line bg-paper p-7 md:p-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-trust">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Audit complete
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">{audit.domain}</h3>
                  <p className="mt-1 text-sm text-neutral-600">Homepage technical growth snapshot</p>
                </div>
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-8 border-signal/20 bg-card">
                  <div className="text-center">
                    <p className="font-mono text-3xl font-semibold text-ink">{audit.score}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">score</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2">
                {[
                  ["Critical", issueCount(audit, "critical")],
                  ["High", issueCount(audit, "high")],
                  ["Medium", issueCount(audit, "medium")],
                  ["Low", issueCount(audit, "low")],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-xl border border-line bg-card px-2 py-3 text-center">
                    <p className="font-mono text-lg font-semibold text-ink">{value}</p>
                    <p className="font-mono text-[8px] uppercase tracking-wider text-neutral-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-7 md:p-9">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Priority queue</p>
                  <h4 className="mt-1 font-display text-xl font-semibold text-ink">Highest-impact findings</h4>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">Top {topFindings.length}</span>
              </div>

              <div className="mt-5 space-y-3">
                {topFindings.length ? (
                  topFindings.map((finding) => <FindingRow key={finding.code} finding={finding} />)
                ) : (
                  <div className="rounded-xl border border-signal/20 bg-signal/5 p-4 text-sm text-trust">
                    No material homepage issues were detected in this snapshot.
                  </div>
                )}
              </div>

              <a
                href={`${operatorUrl}/register?audit=${encodeURIComponent(audit.token)}&site=${encodeURIComponent(audit.domain)}`}
                className="btn-ink mt-7 flex h-12 w-full items-center justify-center gap-2 text-sm"
              >
                Unlock the full site audit
                <ArrowRight className="h-4 w-4" />
              </a>
              <button onClick={reset} className="mt-3 w-full py-2 text-sm font-medium text-neutral-500 hover:text-ink">
                Audit another website
              </button>
              <p className="mt-3 text-center font-mono text-[9px] leading-relaxed text-neutral-400">
                This free snapshot checks the homepage and discovery endpoints. Full workspace audits add site-wide crawling, internal links, duplicate detection, GSC, GA4, and action planning.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
