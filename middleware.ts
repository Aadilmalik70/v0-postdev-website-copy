import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define 301 redirects for 404 pages
const redirects: Record<string, string> = {
  // 404 pages - redirect to relevant content
  '/blog/top-content-marketing-tools-seo-2025-guide': '/blog/top-seo-analysis-tools-2025-best-seo-ai-tool',
  '/blog/understanding-search-intent': '/blog/why-content-not-ranking',
  '/en-US': '/',
  '/en': '/',
  
  // Remove these if pages exist - these are placeholders
  '/blog/ai-content-blueprint-tool-guide': '/blog',
  '/blog/sample-implementation': '/blog',
  '/blog/index-old': '/blog',
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the path matches any redirect
  if (pathname in redirects) {
    const destination = redirects[pathname]
    return NextResponse.redirect(new URL(destination, request.url), 301)
  }
  
  // Block admin pages from being indexed (should show 404 or redirect to login)
  if (pathname.startsWith('/admin/')) {
    // You can either return 404 or redirect to a login page
    // For now, we'll just let Next.js handle it naturally (404)
    // The robots.txt will prevent indexing
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|sitemap\\.xml|robots\\.txt).*)',
  ],
}
