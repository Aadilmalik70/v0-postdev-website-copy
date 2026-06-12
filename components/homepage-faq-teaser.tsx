"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Reveal } from "./gsap-fx"

const faqs = [
  { question: "What does the operator actually do?", answer: "It runs the Operator Loop on your site: observes rankings, traffic, and AI citations; prioritizes opportunities by impact; plans the work; executes approved fixes and content; measures outcomes; and improves what it does next." },
  { question: "How is this different from Ahrefs or Semrush plus ChatGPT?", answer: "Those tools give you data and drafts — your team still operates the workflow. SERP Strategists is the operating layer: the data becomes a ranked action queue, and approved work ships into your CMS or codebase." },
  { question: "What happens if it makes the wrong change?", answer: "Governance is built in. Safe fixes can ship automatically, sensitive changes route through approval gates, every action is logged, and any change can be rolled back." },
  { question: "How fast will I see proof?", answer: "Technical fixes ship within days of approval, content effects show in weeks, and larger organic and citation gains typically compound over 60 to 90 days — with every shipped action measured against outcomes." },
]

export function HomepageFaqTeaser() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 md:py-32 px-5 md:px-6 bg-surface/50 border-y border-line">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-5 justify-center">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-semibold text-ink leading-[1.12] mb-5">
            The questions every buyer asks first.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg">
            Straight answers on autonomy, control, and proof.
          </p>
        </Reveal>

        <Reveal selector="[data-faq]" stagger={0.07} className="divide-y divide-line border-y border-line">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.question} data-faq>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-ink group-hover:text-signal-deep transition-colors">{faq.question}</span>
                  <Plus
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-neutral-600 leading-relaxed pb-5 pr-8">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>

        <Reveal className="text-center mt-10">
          <Link href="/faq" className="link-underline text-sm text-ink font-medium">
            Read the full FAQ →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
