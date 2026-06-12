import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { buildMarketingMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildMarketingMetadata({
  title: "Cookie Policy | SERP Strategists",
  description:
    "Understand how SERP Strategists uses cookies, analytics, and consent preferences across its website and platform.",
  pathname: "/cookies",
});

const jsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Cookie Policy","url":"https://serpstrategists.com/cookies"};

export default function CookiesPage() {
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
          Cookie Policy
        </h1>
        <p className="text-neutral-600 text-sm mb-10">
          Last updated: June 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              What Are Cookies
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Cookies are small text files stored on your device when you visit a
              website. They help the site remember your preferences, keep you
              logged in, and understand how you use the service. Cookies are
              standard across virtually all websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Cookies We Use
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-ink mb-2">
                  Essential Cookies
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-2">
                  These cookies are required for the platform to function. They
                  cannot be disabled.
                </p>
                <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-1 ml-2">
                  <li>
                    <strong className="text-ink">Session cookie</strong> —
                    keeps you authenticated while using the platform
                  </li>
                  <li>
                    <strong className="text-ink">CSRF token</strong> —
                    protects against cross-site request forgery attacks
                  </li>
                  <li>
                    <strong className="text-ink">
                      Cookie consent preference
                    </strong>{" "}
                    — remembers your cookie choices
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-ink mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-2">
                  These cookies help us understand how visitors use our site so we
                  can improve the experience.
                </p>
                <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-1 ml-2">
                  <li>
                    <strong className="text-ink">
                      Google Analytics 4 (_ga, _ga_*)
                    </strong>{" "}
                    — measures page views, session duration, and feature usage.
                    Data is anonymized and not used for advertising.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Third-Party Cookies
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              We do not use advertising or marketing cookies. We do not allow
              third-party ad networks to set cookies on our site. The only
              third-party cookies are those set by Google Analytics for usage
              measurement purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              How to Manage Cookies
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              You can control cookies through your browser settings. Here&apos;s
              how to manage them in common browsers:
            </p>
            <ul className="list-disc list-inside text-neutral-600 leading-relaxed space-y-2 ml-2">
              <li>
                <strong className="text-ink">Chrome:</strong> Settings →
                Privacy and Security → Cookies and other site data
              </li>
              <li>
                <strong className="text-ink">Firefox:</strong> Settings →
                Privacy & Security → Cookies and Site Data
              </li>
              <li>
                <strong className="text-ink">Safari:</strong> Preferences →
                Privacy → Manage Website Data
              </li>
              <li>
                <strong className="text-ink">Edge:</strong> Settings →
                Cookies and site permissions → Manage and delete cookies
              </li>
            </ul>
            <p className="text-neutral-600 leading-relaxed mt-3">
              Note: disabling essential cookies may prevent you from logging in or
              using certain features of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Contact
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              If you have questions about our use of cookies, contact us at{" "}
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
