import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@/components/google-analytics"
import { SITE_NAME, SITE_URL } from "@/lib/site-seo"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    "AI SEO agent that audits your site, fixes technical issues, publishes content, and tracks organic growth without manual busywork.",
  keywords: ["AI SEO tool", "autonomous SEO", "GEO optimization", "AI search ranking", "automated SEO agent"],
  openGraph: {
    title: SITE_NAME,
    description: "AI SEO agent that audits your site, fixes technical issues, publishes content, and tracks organic growth without manual busywork.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "AI SEO agent that audits your site, fixes technical issues, publishes content, and tracks organic growth without manual busywork.",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SERP Strategist",
              url: "https://serpstrategists.com",
              description: "Autonomous AI agent for SEO and GEO growth. Finds issues, fixes them, creates content, and monitors rankings 24/7.",
              sameAs: [],
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "0",
                highPrice: "99",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
