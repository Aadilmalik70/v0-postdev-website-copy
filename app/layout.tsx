import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "@fontsource/instrument-sans/500.css"
import "@fontsource/instrument-sans/600.css"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@/components/google-analytics"
import { AnalyticsListener } from "@/components/analytics-listener"
import { SITE_NAME, SITE_URL } from "@/lib/site-seo"
import { getOrganizationSchema, getWebSiteSchema, combineSchemas } from "@/lib/schema"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    "SERP Strategists is the AI Growth Operator that observes your search performance, executes approved SEO and GEO actions, and improves visibility across Google and AI search.",
  keywords: [
    "AI Growth Operator",
    "autonomous search operations",
    "AI SEO",
    "GEO optimization",
    "AI visibility",
    "AI citation tracking",
  ],
  icons: {
    icon: [{ url: "/serp-strategists-logo-mark.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Deploy an AI Growth Operator for organic search. Observes performance, executes approved SEO and GEO actions, and improves visibility across Google and AI search.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Deploy an AI Growth Operator for organic search. Governed autonomy, full logs, human approval where it matters.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              combineSchemas(getOrganizationSchema(), getWebSiteSchema())
            ),
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <GoogleAnalytics />
        <AnalyticsListener />
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
