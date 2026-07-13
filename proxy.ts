import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Define 301 redirects for 404 pages
const redirects: Record<string, string> = {
  // 404 pages - redirect to relevant content
  '/blog/top-content-marketing-tools-seo-2025-guide': '/blog/top-seo-analysis-tools-2025-best-seo-ai-tool',
  '/blog/understanding-search-intent': '/blog/why-content-not-ranking',
  '/en-US': '/',
  '/en': '/',
  
  // Legacy blog posts that no longer exist (verified in content/blog directory)
  // These pages were identified in GSC as "Crawled - Currently Not Indexed"
  // Remove these redirects if these blog posts are re-created
  '/blog/ai-content-blueprint-tool-guide': '/blog',
  '/blog/sample-implementation': '/blog',
  '/blog/index-old': '/blog',
}

export function proxy(request: NextRequest) {
  const { nextUrl, headers } = request
  const forwardedHost = headers.get("x-forwarded-host")
  const rawHost = forwardedHost ?? headers.get("host") ?? nextUrl.host
  const host = rawHost.split(",")[0].trim().split(":")[0].toLowerCase()
  const pathname = nextUrl.pathname

  // WWW to non-WWW redirect. This is a 301 fallback in addition to the
  // framework-level permanent redirect in next.config.mjs.
  if (host === "www.serpstrategists.com") {
    const redirectUrl = new URL(`${nextUrl.pathname}${nextUrl.search}`, "https://serpstrategists.com")
    return NextResponse.redirect(redirectUrl, 301)
  }

  // Check if the path matches any redirect
  if (pathname in redirects) {
    const destination = redirects[pathname]
    return NextResponse.redirect(new URL(destination, request.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
