import type { Metadata } from "next"
import { buildMarketingMetadata } from "@/lib/site-seo"
import { FAQClientPage } from "./faq-client"

export const metadata: Metadata = buildMarketingMetadata({
  title: "AI Growth Operator FAQ | SERP Strategists",
  description:
    "Answers to common questions about SERP Strategists, autonomous SEO workflows, pricing, safety, governance, and GEO.",
  pathname: "/faq",
})

export default function FAQPage() {
  return <FAQClientPage />
}
