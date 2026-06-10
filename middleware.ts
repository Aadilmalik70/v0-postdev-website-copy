import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { nextUrl, headers } = request
  const host = headers.get("host") ?? nextUrl.host

  if (host === "www.serpstrategists.com") {
    const redirectUrl = new URL(nextUrl.pathname + nextUrl.search, "https://serpstrategists.com")
    return NextResponse.redirect(redirectUrl, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}