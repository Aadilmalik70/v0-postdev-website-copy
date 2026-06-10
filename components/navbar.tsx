"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FloatingNavbar } from "@/components/ui/floating-navbar"
import { EarlyAccessModal } from "./early-access-modal"

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <FloatingNavbar>
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-lg font-bold tracking-tight text-[#ececec]">
              SERP<span className="text-emerald-400">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              How it works
            </Link>
            <Link href="#pricing" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              FAQ
            </Link>
          </div>

          <Button
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-5 rounded-full text-xs"
          >
            Start Free Audit
          </Button>
        </div>
      </FloatingNavbar>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
