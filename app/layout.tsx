import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@/components/google-analytics"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const metadata: Metadata = {
  title: "SERP Strategist — AI SEO & GEO Agent That Ranks Your Site Autonomously",
  description:
    "Autonomous AI agent that continuously improves your website's SEO and GEO performance. Finds issues, fixes them, creates content, and monitors rankings — 24/7.",
  keywords: ["AI SEO tool", "autonomous SEO", "GEO optimization", "AI search ranking", "automated SEO agent"],
  openGraph: {
    title: "SERP Strategist — AI Agent That Ranks Your Site",
    description: "Stop doing SEO manually. Let an AI agent grow your organic traffic 24/7.",
    type: "website",
    url: "https://serpstrategists.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "SERP Strategist — AI SEO & GEO Agent",
    description: "Autonomous AI agent for SEO and GEO growth.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
