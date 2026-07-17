"use client"

import { useRef, useState } from "react"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"
import { gsap, useGSAP, reducedMotion, EASE } from "./gsap-fx"

const queue = [
  { tag: "Shipped", detail: "Fixed canonical on /pricing", meta: "Example policy: auto-approved | Logged | Rollback ready", dot: "bg-signal-bright", text: "text-signal-bright" },
  { tag: "Review", detail: "Refresh /integrations for AI answers", meta: "Example score: impact 8.4 | Confidence high | Effort low", dot: "bg-opportunity-bright", text: "text-opportunity-bright" },
  { tag: "Planned", detail: "Internal links for 14 orphan pages", meta: "Example score: impact 7.1 | Plan ready for approval", dot: "bg-opviolet-bright", text: "text-opviolet-bright" },
  { tag: "Observed", detail: "Competitor in 3 Perplexity prompts", meta: "Example signal: source gap found | Action queued", dot: "bg-coral-bright", text: "text-coral-bright" },
]

const operatorStages = [
  { value: "Observe", label: "collect evidence", color: "text-systeal-bright" },
  { value: "Approve", label: "apply policy", color: "text-signal-bright" },
  { value: "Measure", label: "track outcomes", color: "text-warmwhite" },
]

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = scope.current?.querySelectorAll("[data-hero]")
      const rows = scope.current?.querySelectorAll("[data-queue-row]")
      if (!items) return
      if (reducedMotion()) {
        gsap.set([items, rows ?? []], { autoAlpha: 1, y: 0, x: 0 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.fromTo(items, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 })
      if (rows?.length) {
        tl.fromTo(rows, { autoAlpha: 0, x: 16 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
      }
    },
    { scope },
  )

  return (
    <>
      <section ref={scope} className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        {/* Quiet dot grid, fading out downward */}
        <div className="absolute inset-x-0 top-0 h-[520px] dot-grid [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Editorial column */}
          <div className="lg:col-span-7">
            <p data-hero className="eyebrow mb-6">AI Growth Operator · Autonomous search operations</p>

            <h1
              data-hero
              className="font-display text-[40px] sm:text-5xl md:text-6xl xl:text-[64px] font-semibold text-ink leading-[1.05] mb-6 text-balance"
            >
              Deploy an AI <span className="mark-signal">Growth Operator</span> for organic search.
            </h1>

            <p data-hero className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl mb-9">
              It observes your search performance, finds the highest-impact opportunities, executes
              approved SEO and GEO actions, and improves visibility across Google, ChatGPT,
              Perplexity, Gemini, and beyond.
            </p>

            <div data-hero className="flex flex-wrap items-center gap-3 mb-7">
              <button onClick={() => setIsModalOpen(true)} className="btn-ink px-6 h-12 text-sm">
                Run Free Growth Audit
                <ArrowRight className="btn-arrow w-4 h-4" strokeWidth={2} />
              </button>
              <a href="#operator-loop" className="btn-quiet px-6 h-12 text-sm">
                See the Operator Loop
              </a>
            </div>

            <p data-hero className="inline-flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-trust" strokeWidth={1.75} />
              Governed autonomy. Full logs. Human approval where it matters.
            </p>
          </div>

          {/* Console card - illustrative product workflow */}
          <div data-hero className="lg:col-span-5">
            <div className="rounded-2xl bg-graphite-950 border border-graphite-line shadow-[0_30px_70px_-30px_rgba(13,17,16,0.5)] overflow-hidden">
              <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-graphite-line overflow-hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-300">Action queue</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full bg-signal-bright/10 text-signal-bright border border-signal-bright/20">
                  <span className="w-1 h-1 rounded-full bg-signal-bright" />
                  Example workflow
                </span>
                <span className="operator-scanline absolute bottom-0 left-0 h-px w-1/5 bg-signal-bright/50" />
              </div>

              <div>
                {queue.map((item) => (
                  <div key={item.tag} data-queue-row className="px-5 py-3 border-b border-graphite-800/60 last:border-0 flex items-start gap-3">
                    <span className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`font-mono text-[10px] uppercase tracking-wide font-medium ${item.text}`}>{item.tag}</span>
                        <span className="text-[13px] text-neutral-300 leading-snug">{item.detail}</span>
                      </div>
                      <p className="font-mono text-[10px] text-neutral-300 mt-0.5">{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 divide-x divide-graphite-line border-t border-graphite-line">
                {operatorStages.map((stage) => (
                  <div key={stage.value} className="px-4 py-3.5">
                    <p className={`font-mono text-sm font-medium ${stage.color}`}>{stage.value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-400">{stage.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-mono text-[10px] text-neutral-600 text-center mt-3">
              Illustrative product preview | Example data, not customer results
            </p>
          </div>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
