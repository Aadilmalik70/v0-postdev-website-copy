"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export function FloatingNavbar({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setAtTop(y < 24)
      if (y < lastScrollY.current || y < 80) {
        setVisible(true)
      } else if (y > lastScrollY.current) {
        setVisible(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        visible ? "translate-y-0" : "-translate-y-full",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-5 md:px-6 transition-all duration-500",
          atTop ? "pt-4" : "pt-2.5",
        )}
      >
        <nav
          className={cn(
            "flex items-center h-14 px-5 rounded-2xl border transition-all duration-500",
            atTop
              ? "bg-transparent border-transparent"
              : "bg-paper/85 backdrop-blur-md border-line shadow-[0_8px_30px_-18px_rgba(13,17,16,0.25)]",
          )}
        >
          {children}
        </nav>
      </div>
    </header>
  )
}
