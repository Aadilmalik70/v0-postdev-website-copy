"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#000000]/95 backdrop-blur-md border-b border-[#1a1a1a]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo - using serif font to match Figma */}
          <a href="#" className="font-serif text-2xl tracking-tight text-[#ececec]">
            POST<span className="text-[#ff3b30]">DEV</span>
          </a>

          {/* Desktop Nav - cleaner styling */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm text-[#888888] hover:text-[#ececec] transition-colors duration-300"
            >
              Product
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-[#888888] hover:text-[#ececec] transition-colors duration-300"
            >
              How it Works
            </a>
            <a href="#pricing" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors duration-300">
              Early Access
            </a>
            <Button className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium px-6 py-2 rounded-full text-sm">
              Get Early Access
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-[#ececec]" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 flex flex-col gap-5 border-t border-[#1a1a1a] pt-6">
            <a href="#how-it-works" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              Product
            </a>
            <a href="#how-it-works" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors">
              Early Access
            </a>
            <Button className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium w-full rounded-full">
              Get Early Access
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
