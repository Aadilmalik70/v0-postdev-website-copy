"use client"

import { useState } from "react"
import Link from "next/link"
import { FloatingNavbar } from "@/components/ui/floating-navbar"
import { EarlyAccessModal } from "./early-access-modal"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Operator Loop", href: "/#operator-loop" },
  { label: "Modules", href: "/#modules" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Integrations", href: "/integrations" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
]

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <FloatingNavbar>
        <div className="flex items-center justify-between w-full gap-4">
          {/* Signal Dot wordmark */}
          <Link href="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-[15px] font-semibold text-ink">SERP Strategists</span>
            <span className="relative flex h-1.5 w-1.5 -translate-y-px">
              <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-signal-bright" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal-bright" />
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="link-underline text-[13px] text-neutral-600 hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-ink px-4 h-9 text-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-signal-bright" />
              Run Free Growth Audit
            </button>
            <button
              className="md:hidden p-2 text-ink"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </FloatingNavbar>

      {/* Mobile sheet */}
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] z-40 px-5 transition-all duration-300 ${
          mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-line bg-paper/95 backdrop-blur-md shadow-[0_18px_40px_-20px_rgba(13,17,16,0.3)] p-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm text-neutral-600 hover:text-ink hover:bg-surface transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
