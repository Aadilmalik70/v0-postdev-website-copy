"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { isAnalyticsDebugEnabled } from "@/lib/analytics"

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const [shouldTrack, setShouldTrack] = useState(false)
  const [checked, setChecked] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname
      const isLocalhost =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "[::1]" ||
        hostname === "::1" ||
        hostname === "0.0.0.0" ||
        hostname.endsWith(".local")
      const isVercelPreview = hostname.endsWith(".vercel.app")
      const analyticsDebug = isAnalyticsDebugEnabled()

      setDebugMode(analyticsDebug)

      const disableTracking = isLocalhost || isVercelPreview

      if (disableTracking) {
        Reflect.set(window, `ga-disable-${gaId}`, true)
        if (analyticsDebug) console.info(`[analytics] GA4 delivery disabled for host: ${hostname}`)
      } else {
        setShouldTrack(true)
      }
      setChecked(true)
    }
  }, [gaId])

  if (!gaId) return null

  if (!checked || !shouldTrack) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window['ga-disable-${gaId}'] = true;`,
        }}
      />
    )
  }

  const debugConfig = debugMode ? ", { debug_mode: true }" : ""

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${gaId}'${debugConfig});
        `,
        }}
      />
    </>
  )
}
