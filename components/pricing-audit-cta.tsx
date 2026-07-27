"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { EarlyAccessModal } from "@/components/early-access-modal"

export function PricingAuditCta() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-signal-bright px-6 py-3 text-sm font-semibold text-black hover:bg-signal-bright/90 transition-colors"
      >
        Run Free Growth Audit
        <ArrowRight className="w-4 h-4" strokeWidth={2} />
      </button>
      <EarlyAccessModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        leadSource="pricing_page"
        ctaPlacement="pricing_page_final_cta"
      />
    </>
  )
}
