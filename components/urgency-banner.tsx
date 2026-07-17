"use client"

import { useEffect, useState } from "react"

export function UrgencyBanner() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-paper/90 border border-line backdrop-blur-md shadow-[0_12px_32px_-16px_rgba(13,17,16,0.3)]">
        <span className="flex items-center gap-2">
          <span className="status-pulse w-1.5 h-1.5 rounded-full bg-signal-bright" />
          <span className="text-xs font-medium text-ink">Early access open</span>
        </span>
        <span className="text-neutral-200">·</span>
        <span className="text-xs text-neutral-600">Early-access targets from $49/mo</span>
        <a
          href="#pricing"
          data-analytics-placement="sticky_pricing_banner"
          data-analytics-plan-name="all_plans"
          className="text-xs font-medium text-signal-deep hover:text-ink transition-colors"
          aria-label="See early-access pricing"
        >
          →
        </a>
        <button onClick={() => setDismissed(true)} className="text-neutral-400 hover:text-ink transition-colors text-xs ml-1" aria-label="Dismiss">
          ✕
        </button>
      </div>
    </div>
  )
}
