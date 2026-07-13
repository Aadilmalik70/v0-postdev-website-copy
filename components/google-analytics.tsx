"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const [shouldTrack, setShouldTrack] = useState(false)
  const [checked, setChecked] = useState(false)

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

      const disableTracking = isLocalhost || isVercelPreview

      if (disableTracking) {
        Reflect.set(window, `ga-disable-${gaId}`, true)
        console.log(`[GA4] Tracking disabled for host: ${hostname}`)
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
          window.gtag('config', '${gaId}');
        `,
        }}
      />
    </>
  )
}
