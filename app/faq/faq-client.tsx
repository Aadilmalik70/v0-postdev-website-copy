"use client";

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChevronDownIcon } from "lucide-react";
import Script from "next/script";

const faqs = [
  {
    question: "What is SERP Strategist?",
    answer:
      "SERP Strategist is an AI-powered SEO agent that autonomously monitors, audits, and optimizes your website for search engines. It crawls your site, detects technical and content issues, generates fix plans, and — with your approval — executes changes automatically.",
  },
  {
    question: "How does it work?",
    answer:
      "Once you connect your site, our agent runs a continuous loop: it crawls your pages, analyzes technical health, content quality, and E-E-A-T signals, identifies issues ranked by impact, and proposes fixes. You approve the changes you want, and the agent implements them directly via your CMS or GitHub integration.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "We offer simple, transparent plans based on the number of pages monitored. All plans include unlimited crawls, AI analysis, and fix execution. No long-term contracts — pay monthly and cancel anytime. Check our pricing page for current rates.",
  },
  {
    question: "Is it safe? Will it break my site?",
    answer:
      "Safety is our top priority. Every change goes through a governance layer: you set risk thresholds, approve changes before they go live, and can instantly roll back any modification. The agent never makes changes without your explicit approval unless you configure auto-approve for low-risk fixes.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Technical fixes (broken links, meta tags, schema markup) can show improvements within days. Content and authority improvements typically take 4-12 weeks to reflect in rankings, which is standard for SEO. Our dashboard tracks progress so you can see incremental gains over time.",
  },
  {
    question: "What types of sites does it work with?",
    answer:
      "SERP Strategist works with any website — WordPress, Shopify, Next.js, static sites, custom CMSs, and more. We integrate via GitHub for code-based sites and via API/plugins for platforms like WordPress. If your site is on the public web, we can crawl and analyze it.",
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer:
      "GEO is the practice of optimizing your content to appear in AI-generated answers — like Google AI Overviews, ChatGPT, and Perplexity. SERP Strategist analyzes how AI models interpret your content and suggests structural improvements to increase your visibility in these new search surfaces.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings. Your data remains accessible for 30 days after cancellation.",
  },
  {
    question: "Do I need technical knowledge to use it?",
    answer:
      "Not at all. SERP Strategist is designed for non-technical users. The agent explains issues in plain language, and you simply approve or reject suggested fixes. If you are technical, you'll appreciate the detailed logs and direct code-level access.",
  },
  {
    question: "How is this different from tools like Ahrefs or SEMrush?",
    answer:
      "Traditional SEO tools show you data and reports — you still have to figure out what to do and implement changes yourself. SERP Strategist is an agent: it doesn't just identify problems, it fixes them. Think of it as the difference between a diagnostic tool and an autonomous mechanic.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQClientPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="text-emerald-400 hover:text-emerald-300 text-sm mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold text-[#ececec] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-[#888888] leading-relaxed mb-10">
          Everything you need to know about SERP Strategist. Can&apos;t find what
          you&apos;re looking for?{" "}
          <Link
            href="/contact"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Reach out to us
          </Link>
          .
        </p>

        <Accordion.Root type="multiple" className="space-y-3">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border border-[#222222] rounded-lg overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-4 text-left text-[#ececec] font-medium hover:bg-[#111111] transition-colors group">
                  <span>{faq.question}</span>
                  <ChevronDownIcon className="w-5 h-5 text-[#888888] transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-4 text-[#888888] leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
      <Footer />
    </main>
  );
}