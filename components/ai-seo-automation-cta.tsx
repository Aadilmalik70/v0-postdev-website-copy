"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { EarlyAccessModal } from "@/components/early-access-modal"

export function AiSeoAutomationCta({ placement }: { placement: "hero" | "final" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn-ink justify-center px-6 py-3 text-sm"
        >
          Run Free Growth Audit
          <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
        </button>
        <Link href="/demo" className="btn-quiet justify-center px-6 py-3 text-sm">
          See the simulated workflow
        </Link>
      </div>
      <EarlyAccessModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        leadSource="ai_seo_automation"
        ctaPlacement={`ai_seo_automation_${placement}`}
      />
    </>
  )
}
