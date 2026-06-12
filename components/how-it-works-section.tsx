"use client"

import { useRef } from "react"
import { Eye, Compass, GitBranch, Zap, Activity, RefreshCw } from "lucide-react"
import { gsap, ScrollTrigger, useGSAP, reducedMotion, Reveal } from "./gsap-fx"

const stages = [
  { icon: Eye, name: "Observe", description: "The operator monitors rankings, traffic, AI answers, citations, and competitor movement across every search surface.", detail: "Google · ChatGPT · Perplexity · Gemini" },
  { icon: Compass, name: "Prioritize", description: "Opportunities are scored by traffic impact, confidence, and effort — so the queue starts with what matters.", detail: "Impact-ranked queue" },
  { icon: GitBranch, name: "Plan", description: "Each opportunity becomes an execution plan: the change, the reasoning, and the expected outcome.", detail: "Transparent reasoning" },
  { icon: Zap, name: "Execute", description: "Approved fixes, schema, internal links, and content updates ship into your CMS or codebase.", detail: "Approval gates · Rollback" },
  { icon: Activity, name: "Measure", description: "Every shipped action is tracked against rankings, traffic, and citation coverage.", detail: "Outcome per action" },
  { icon: RefreshCw, name: "Improve", description: "Results feed back into prioritization, so the operator learns which work creates growth.", detail: "Compounding system" },
]

export function HowItWorksSection() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const line = root.querySelector<SVGLineElement>("[data-loop-line]")
      const rows = root.querySelectorAll("[data-stage]")
      const nodes = root.querySelectorAll("[data-node]")

      if (reducedMotion()) {
        gsap.set(rows, { autoAlpha: 1, y: 0 })
        gsap.set(nodes, { scale: 1 })
        return
      }

      if (line) {
        const len = 1000
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: root.querySelector("[data-rail]"), start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        })
      }

      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 84%", once: true } },
        )
        const node = nodes[i]
        if (node) {
          gsap.fromTo(
            node,
            { scale: 0 },
            { scale: 1, duration: 0.45, ease: "back.out(2.5)", scrollTrigger: { trigger: row, start: "top 84%", once: true } },
          )
        }
      })
    },
    { scope },
  )

  return (
    <section id="operator-loop" ref={scope} className="py-24 md:py-32 px-5 md:px-6 bg-surface/50 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5">The Operator Loop</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            Observe. Prioritize. Plan. Execute. Measure. Improve.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Search is not a campaign — it is a compounding system. The Operator Loop runs
            continuously, with your approvals where they matter.
          </p>
        </Reveal>

        <div data-rail className="relative">
          {/* Scroll-drawn spine */}
          <svg
            className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 h-full w-px overflow-visible"
            viewBox="0 0 2 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="1" y1="0" x2="1" y2="1000" stroke="var(--color-line-strong)" strokeWidth="2" />
            <line data-loop-line x1="1" y1="0" x2="1" y2="1000" stroke="var(--color-signal)" strokeWidth="2" pathLength={1000} />
          </svg>

          <div className="space-y-10 md:space-y-14">
            {stages.map((stage, index) => {
              const left = index % 2 === 0
              return (
                <div key={stage.name} className="relative grid md:grid-cols-2 gap-0 md:gap-16 items-start">
                  {/* Node on the spine */}
                  <span
                    data-node
                    className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 top-7 w-4 h-4 rounded-full bg-paper border-2 border-signal flex items-center justify-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                  </span>

                  <div data-stage className={`pl-12 md:pl-0 ${left ? "md:pr-4" : "md:col-start-2 md:pl-4"}`}>
                    <div className="card-lift rounded-2xl border border-line bg-card p-6 md:p-7">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center">
                          <stage.icon className="w-5 h-5 text-signal" strokeWidth={1.75} />
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">{String(index + 1).padStart(2, "0")} / 06</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-ink mb-2">{stage.name}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-3.5">{stage.description}</p>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-systeal">{stage.detail}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="font-mono text-[11px] text-neutral-400">↻ Improve feeds Observe. The loop never stops compounding.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
