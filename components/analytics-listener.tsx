"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

function getArticleSlug(pathname: string) {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/)
  return match?.[1]
}

function getPlacement(anchor: HTMLAnchorElement, articleSlug?: string) {
  return (
    anchor.dataset.analyticsPlacement ||
    (anchor.closest("nav") ? "navigation" : articleSlug ? "article_link" : "site_link")
  )
}

export function AnalyticsListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>("a[href]")
      if (!anchor || anchor.dataset.analyticsHandled === "true") return

      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return
      }

      let destination: URL
      try {
        destination = new URL(href, window.location.href)
      } catch {
        return
      }

      const articleSlug = getArticleSlug(window.location.pathname)
      const placement = getPlacement(anchor, articleSlug)
      const sameOrigin = destination.origin === window.location.origin

      if (sameOrigin && destination.pathname.startsWith("/templates/") && destination.pathname.endsWith(".csv")) {
        const templateName = destination.pathname.split("/").pop()?.replace(/\.csv$/, "")
        if (!templateName) return

        trackEvent("template_download", {
          template_name: templateName,
          cta_placement: placement,
          article_slug: articleSlug,
        })
        return
      }

      const opensPricing =
        sameOrigin &&
        (destination.pathname === "/pricing" ||
          (destination.hash === "#pricing" && ["/", window.location.pathname].includes(destination.pathname)))

      if (opensPricing) {
        trackEvent("pricing_interest", {
          cta_placement: placement,
          plan_name: anchor.dataset.analyticsPlanName,
        })
        return
      }

      if (
        articleSlug &&
        sameOrigin &&
        destination.pathname === "/" &&
        destination.hash === "#ai-growth-operator"
      ) {
        trackEvent("blog_product_cta_click", {
          article_slug: articleSlug,
          cta_placement: placement,
          destination_type: "operator",
        })
        return
      }

      if (
        articleSlug === "ai-seo-tools-pricing-comparison-2026" &&
        !sameOrigin &&
        ["http:", "https:"].includes(destination.protocol)
      ) {
        trackEvent("external_pricing_source_click", {
          article_slug: articleSlug,
          cta_placement: placement,
          source_host: destination.hostname,
        })
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null
}
