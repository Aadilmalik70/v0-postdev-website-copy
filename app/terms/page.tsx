import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { buildMarketingMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildMarketingMetadata({
  title: "",
  description:
    "Review the terms and conditions governing your use of the SERP Strategists AI SEO agent platform.",
  pathname: "/terms",
});

const jsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Terms and Conditions","url":"https://serpstrategists.com/terms"};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="text-signal hover:text-signal text-sm mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-4xl font-semibold text-ink mb-2">
          Terms & Conditions
        </h1>
        <p className="text-neutral-600 text-sm mb-10">
          Last updated: June 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              1. Service Description
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              SERP Strategists (&ldquo;the Service&rdquo;) is an AI-powered SEO
              platform operated by SERP Strategists (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;). The Service provides
              automated website crawling, SEO analysis, issue detection, fix
              planning, and — with user approval — automated implementation of
              optimizations. By creating an account, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              2. Account Registration
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              To use the Service, you must create an account with accurate and
              complete information. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-2 ml-2">
              <li>Maintaining the security of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              3. User Obligations
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              By using the Service, you agree to:
            </p>
            <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-2 ml-2">
              <li>
                Only connect websites that you own or have explicit authorization
                to manage
              </li>
              <li>
                Review and approve changes before they are applied to your site
              </li>
              <li>
                Not use the Service for any illegal purpose or to violate
                third-party rights
              </li>
              <li>
                Not attempt to reverse-engineer, exploit, or abuse the platform
              </li>
              <li>
                Not use the Service to generate spam, manipulate search results
                through deceptive practices, or violate search engine guidelines
              </li>
              <li>
                Maintain valid integrations and access credentials for connected
                services
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              4. Payment Terms
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              Paid plans are billed on a monthly or annual basis depending on your
              selected plan. By subscribing, you agree that:
            </p>
            <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-2 ml-2">
              <li>
                Charges are recurring and will auto-renew unless cancelled
              </li>
              <li>
                You authorize us to charge your payment method on file
              </li>
              <li>
                Prices may change with 30 days&apos; notice before your next
                billing cycle
              </li>
              <li>
                Refunds are available within 14 days of initial purchase if you
                are unsatisfied with the service
              </li>
              <li>
                Failed payments may result in service suspension after a 7-day
                grace period
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              The Service, including its software, design, documentation, and
              branding, is owned by SERP Strategists and protected by intellectual
              property laws. You retain full ownership of your website content and
              data. We claim no ownership over content on your sites or data you
              provide to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              To the fullest extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-2 ml-2">
              <li>
                The Service is provided &ldquo;as is&rdquo; without warranties of
                any kind, express or implied
              </li>
              <li>
                We do not guarantee specific SEO results, rankings, or traffic
                outcomes
              </li>
              <li>
                Our total liability shall not exceed the amount you paid us in the
                12 months preceding the claim
              </li>
              <li>
                We are not liable for indirect, consequential, incidental, or
                punitive damages
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              7. Service Availability
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              We strive for high availability but do not guarantee uninterrupted
              service. We may perform maintenance, updates, or experience outages.
              We will make reasonable efforts to notify users of planned downtime
              in advance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              8. Termination
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              Either party may terminate this agreement:
            </p>
            <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-2 ml-2">
              <li>
                <strong className="text-ink">You</strong> may cancel your
                subscription at any time from your account settings. Access
                continues until the end of your current billing period.
              </li>
              <li>
                <strong className="text-ink">We</strong> may suspend or
                terminate your account for violation of these terms, non-payment,
                or abuse of the platform, with notice where practical.
              </li>
            </ul>
            <p className="text-neutral-600 leading-relaxed mt-3">
              Upon termination, your data will be retained for 30 days and then
              permanently deleted unless required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              9. Changes to Terms
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              We may modify these terms at any time. Material changes will be
              communicated via email or in-app notification at least 30 days
              before taking effect. Continued use after changes constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              10. Governing Law
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              These terms are governed by and construed in accordance with
              applicable laws. Any disputes arising from these terms or the
              Service shall be resolved through good-faith negotiation first, and
              if unresolved, through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              11. Contact
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              For questions about these terms, contact us at{" "}
              <a
                href="mailto:hello@serpstrategists.com"
                className="text-signal hover:text-signal"
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
