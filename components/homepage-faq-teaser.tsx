import Link from "next/link"

const faqs = [
  {
    question: "What exactly does the agent do?",
    answer: "It crawls your site, identifies SEO and GEO issues, fixes safe items automatically, creates optimized content, and tracks rankings daily.",
  },
  {
    question: "How is this different from SEMrush or Ahrefs?",
    answer: "Those tools show you data. This product turns the data into action and execution.",
  },
  {
    question: "Will it break my website?",
    answer: "No, not if the workflow separates safe automation from changes that need review and approval.",
  },
  {
    question: "How long until I see results?",
    answer: "Expect quick fixes in days, content gains in weeks, and larger organic gains over 60 to 90 days.",
  },
]

export function HomepageFaqTeaser() {
  return (
    <section className="py-28 md:py-36 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Buying questions, answered fast.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-2xl mx-auto">
            Keep the homepage focused, then use the dedicated FAQ page for the full set of detailed answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
              <h3 className="text-lg font-medium text-[#ececec] mb-2">{faq.question}</h3>
              <p className="text-sm text-[#888888] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm text-emerald-400 hover:text-emerald-300">
            Read the full FAQ →
          </Link>
        </div>
      </div>
    </section>
  )
}