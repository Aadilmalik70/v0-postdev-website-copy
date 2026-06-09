import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — SERP Strategist",
  description:
    "Learn how SERP Strategist collects, uses, and protects your personal data.",
};

const jsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Privacy Policy","url":"https://serpstrategists.com/privacy"};

export default function PrivacyPage() {
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

        <h1 className="text-4xl font-bold text-[#ececec] mb-2">
          Privacy Policy
        </h1>
        <p className="text-[#888888] text-sm mb-10">
          Last updated: June 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              1. Information We Collect
            </h2>
            <p className="text-[#888888] leading-relaxed mb-3">
              When you use SERP Strategist, we collect:
            </p>
            <ul className="list-disc list-inside text-[#888888] leading-relaxed space-y-2 ml-2">
              <li>
                <strong className="text-[#ececec]">Account information:</strong>{" "}
                your name, email address, and password when you register.
              </li>
              <li>
                <strong className="text-[#ececec]">Site data:</strong> URLs,
                crawl results, and analytics data for sites you connect to our
                platform.
              </li>
              <li>
                <strong className="text-[#ececec]">Usage data:</strong> how you
                interact with our platform, including pages visited, features
                used, and session duration.
              </li>
              <li>
                <strong className="text-[#ececec]">Payment information:</strong>{" "}
                billing details processed securely through our payment provider
                (Stripe). We do not store your full card number.
              </li>
              <li>
                <strong className="text-[#ececec]">Device information:</strong>{" "}
                browser type, IP address, and device identifiers for security and
                analytics purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              2. How We Use Your Data
            </h2>
            <p className="text-[#888888] leading-relaxed mb-3">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside text-[#888888] leading-relaxed space-y-2 ml-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related communications</li>
              <li>Analyze site data to generate SEO recommendations and fixes</li>
              <li>Send product updates, security alerts, and support messages</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              3. Cookies & Tracking
            </h2>
            <p className="text-[#888888] leading-relaxed">
              We use essential cookies to keep you logged in and analytics cookies
              (Google Analytics 4) to understand how our platform is used. You can
              manage your cookie preferences at any time. See our{" "}
              <Link
                href="/cookies"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Cookie Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              4. Third-Party Services
            </h2>
            <p className="text-[#888888] leading-relaxed mb-3">
              We share data with trusted third parties only as necessary to
              operate our service:
            </p>
            <ul className="list-disc list-inside text-[#888888] leading-relaxed space-y-2 ml-2">
              <li>
                <strong className="text-[#ececec]">Stripe</strong> — payment
                processing
              </li>
              <li>
                <strong className="text-[#ececec]">Google Analytics</strong> —
                usage analytics
              </li>
              <li>
                <strong className="text-[#ececec]">Vercel</strong> — hosting and
                infrastructure
              </li>
              <li>
                <strong className="text-[#ececec]">OpenAI / Anthropic</strong> —
                AI analysis (site data may be processed but is not used to train
                models)
              </li>
            </ul>
            <p className="text-[#888888] leading-relaxed mt-3">
              We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              5. Data Retention
            </h2>
            <p className="text-[#888888] leading-relaxed">
              We retain your account data for as long as your account is active.
              Crawl data and analytics are retained for up to 12 months. If you
              delete your account, we remove your personal data within 30 days,
              except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              6. Your Rights
            </h2>
            <p className="text-[#888888] leading-relaxed mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-[#888888] leading-relaxed space-y-2 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p className="text-[#888888] leading-relaxed mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:hello@serpstrategists.com"
                className="text-emerald-400 hover:text-emerald-300"
              >
                hello@serpstrategists.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              7. Security
            </h2>
            <p className="text-[#888888] leading-relaxed">
              We implement industry-standard security measures including
              encryption in transit (TLS), encryption at rest, and regular
              security audits. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              8. Changes to This Policy
            </h2>
            <p className="text-[#888888] leading-relaxed">
              We may update this privacy policy from time to time. We will notify
              you of significant changes via email or an in-app notification. Your
              continued use of the service after changes constitutes acceptance of
              the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#ececec] mb-3">
              9. Contact
            </h2>
            <p className="text-[#888888] leading-relaxed">
              If you have questions about this privacy policy or our data
              practices, contact us at{" "}
              <a
                href="mailto:hello@serpstrategists.com"
                className="text-emerald-400 hover:text-emerald-300"
              >
                hello@serpstrategists.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
