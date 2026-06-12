"use client"

import { useState } from "react"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"
import { Reveal } from "./gsap-fx"

export function FinalCtaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="py-24 md:py-32 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl bg-graphite-950 border border-graphite-line px-6 py-16 md:px-14 md:py-24 text-center overflow-hidden">
              <span className="operator-scanline absolute top-0 left-0 h-px w-1/5 bg-signal-bright/40" />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-bright mb-6">
                Early access open
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-[52px] font-semibold text-warmwhite leading-[1.08] mb-5 text-balance">
                Deploy your growth operator.
              </h2>
              <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Connect your site and let the operator run its first audit. You will see every
                opportunity ranked by impact — and exactly what it would ship first, pending your
                approval.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-ink !bg-signal-bright !text-graphite-950 hover:!bg-[#00e591] px-8 h-13 text-base font-semibold mx-auto"
                style={{ height: "3.25rem" }}
              >
                Run Free Growth Audit
                <ArrowRight className="btn-arrow w-4.5 h-4.5" strokeWidth={2} />
              </button>
              <p className="inline-flex items-center gap-2 text-xs text-neutral-600 mt-7 w-full justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-trust-bright" strokeWidth={1.75} />
                Free on the Audit tier · No credit card · Every action logged and reversible
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
