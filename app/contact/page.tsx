import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact — SERP Strategist",
  description:
    "Get in touch with the SERP Strategist team. We'd love to hear from you.",
};

const jsonLd = {"@context":"https://schema.org","@type":"ContactPage","name":"Contact SERP Strategist","url":"https://serpstrategists.com/contact","mainEntity":{"@type":"Organization","name":"SERP Strategist","email":"hello@serpstrategists.com"}};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="text-emerald-400 hover:text-emerald-300 text-sm mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold text-[#ececec] mb-6">Contact Us</h1>

        <p className="text-[#888888] leading-relaxed mb-8">
          Have a question, feedback, or partnership inquiry? We&apos;d love to
          hear from you. Our team typically responds within 24 hours.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#ececec] mb-4">Email</h2>
          <p className="text-[#888888] leading-relaxed mb-2">
            For general inquiries, support, or partnerships:
          </p>
          <a
            href="mailto:hello@serpstrategists.com"
            className="text-emerald-400 hover:text-emerald-300 text-lg font-medium"
          >
            hello@serpstrategists.com
          </a>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#ececec] mb-4">
            Connect With Us
          </h2>
          <p className="text-[#888888] leading-relaxed mb-4">
            Follow us for product updates, SEO insights, and announcements:
          </p>
          <ul className="space-y-3">
            <li>
              <a
                href="https://twitter.com/serpstrategist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Twitter / X →
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/serpstrategist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300"
              >
                LinkedIn →
              </a>
            </li>
            <li>
              <a
                href="https://github.com/serpstrategist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300"
              >
                GitHub →
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#ececec] mb-4">
            Support
          </h2>
          <p className="text-[#888888] leading-relaxed">
            If you&apos;re an existing customer and need technical help, email us
            at{" "}
            <a
              href="mailto:hello@serpstrategists.com"
              className="text-emerald-400 hover:text-emerald-300"
            >
              hello@serpstrategists.com
            </a>{" "}
            with your account email and a description of the issue. We&apos;ll
            get back to you as quickly as possible.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
