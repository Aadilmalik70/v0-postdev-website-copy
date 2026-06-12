import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { buildMarketingMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildMarketingMetadata({
  title: "Disclaimer | SERP Strategists",
  description:
    "Important disclaimers about rankings, third-party tools, AI-generated recommendations, and use of SERP Strategists services.",
  pathname: "/disclaimer",
});

const jsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Disclaimer","url":"https://serpstrategists.com/disclaimer"};

export default function DisclaimerPage() {
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

        <h1 className="text-4xl font-semibold text-ink mb-2">Disclaimer</h1>
        <p className="text-neutral-600 text-sm mb-10">
          Last updated: June 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              No Guarantee of Results
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              SERP Strategists provides AI-powered SEO analysis and automated
              optimizations. However, search engine rankings are influenced by
              hundreds of factors beyond our control, including algorithm updates,
              competitor actions, and domain authority.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              We do not guarantee specific ranking positions, traffic increases,
              or revenue outcomes. Past performance and case studies do not
              guarantee future results. SEO is inherently unpredictable, and any
              tool or agency that guarantees specific rankings should be treated
              with skepticism.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Third-Party Tools & Services
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              SERP Strategists integrates with third-party services including
              Google Search Console, Google Analytics, WordPress, GitHub, and
              various AI providers. We are not responsible for:
            </p>
            <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-2 ml-2">
              <li>
                Outages, data loss, or changes to third-party services
              </li>
              <li>
                Changes to search engine algorithms or policies
              </li>
              <li>
                Actions taken by third-party platforms on your account
              </li>
              <li>
                Accuracy of data provided by third-party APIs
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              AI-Generated Recommendations
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Our platform uses artificial intelligence to generate SEO
              recommendations and content suggestions. While we strive for
              accuracy, AI-generated outputs may occasionally be incorrect,
              outdated, or not suitable for your specific context. Always review
              agent-proposed changes before approving them, particularly for
              content modifications and structural changes to your site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Not Professional Advice
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              The information and services provided by SERP Strategists do not
              constitute legal, financial, or professional advice. Our platform
              provides technical SEO optimization services only. For legal
              matters related to your website content, consult a qualified
              attorney. For business decisions, consult appropriate professional
              advisors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              User Responsibility
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              You are responsible for reviewing and approving all changes made to
              your website through our platform. By approving a fix or
              optimization, you accept responsibility for the modification. We
              provide rollback capabilities for all changes, but it is your
              responsibility to monitor your site&apos;s performance after
              implementing changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Limitation of Liability
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              To the maximum extent permitted by law, SERP Strategists shall not
              be liable for any indirect, incidental, consequential, or punitive
              damages arising from your use of our service, including but not
              limited to loss of revenue, traffic, rankings, or data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Questions
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              If you have questions about this disclaimer, contact us at{" "}
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
