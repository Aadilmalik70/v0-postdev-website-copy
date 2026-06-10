import type { Metadata } from "next";
import { buildMarketingMetadata } from "@/lib/site-seo";
import { FAQClientPage } from "./faq-client";

export const metadata: Metadata = buildMarketingMetadata({
  title: "SEO Agent FAQ | SERP Strategist",
  description: "Answers to common questions about SERP Strategist, autonomous SEO workflows, pricing, safety, and GEO.",
  pathname: "/faq",
});

export default function FAQPage() {
  return <FAQClientPage />;
}
