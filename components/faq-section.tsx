"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What exactly does the agent do?",
    a: "It crawls your site, identifies SEO and GEO issues, fixes them automatically (meta tags, schema, internal links), creates optimized blog content, and monitors your rankings daily. Think of it as an SEO team that works 24/7.",
  },
  {
    q: "How is this different from SEMrush or Ahrefs?",
    a: "Those tools show you problems. Our agent fixes them. SEMrush tells you that you're missing a meta description — our agent writes it and publishes the fix. That's the difference between a report and an employee.",
  },
  {
    q: "Will it break my website?",
    a: "No. All fixes go through your existing workflow (GitHub PR, WordPress update, or CMS API). You can review before anything goes live, or enable auto-approve for low-risk fixes like meta descriptions.",
  },
  {
    q: "How long until I see results?",
    a: "Technical fixes (meta, schema, links) take effect within days of Google recrawling. Content-driven growth typically shows within 6-8 weeks. Most users see measurable traffic improvement within 60-90 days.",
  },
  {
    q: "What's GEO? Do I need it?",
    a: "GEO (Generative Engine Optimization) optimizes your content for AI search engines like ChatGPT, Perplexity, and Google AI Overviews. If your audience uses AI to find answers, you need GEO to be cited as a source.",
  },
  {
    q: "What platforms does it work with?",
    a: "Any site with a GitHub repo (Next.js, React, etc.) or a CMS API (WordPress, Shopify, Webflow, Ghost, Sanity, Wix). If we can push content to it, we support it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no lock-in. Cancel from your dashboard in one click. Your site keeps all the improvements already made — we don't undo anything.",
  },
  {
    q: "Is the free audit actually free?",
    a: "Yes. No credit card, no trial that auto-charges. The free tier gives you a full site audit with every issue prioritized. You only pay if you want the agent to fix things and create content.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-28 md:py-36 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Questions? Answered.
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#0f0f0f] transition-colors"
              >
                <span className="text-sm font-medium text-[#ececec] pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#666666] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-[#888888] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
