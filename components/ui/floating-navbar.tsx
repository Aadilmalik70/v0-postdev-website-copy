"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
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
      const currentScrollY = window.scrollY
      setAtTop(currentScrollY < 50)

      if (currentScrollY < lastScrollY.current) {
        setVisible(true)
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setVisible(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-4 inset-x-0 mx-auto z-50 max-w-4xl px-6 py-3 rounded-full border",
        atTop
          ? "bg-transparent border-transparent"
          : "bg-[#0a0a0a]/80 border-[#1a1a1a] backdrop-blur-lg shadow-lg shadow-black/20",
        className
      )}
    >
      {children}
    </motion.nav>
  )
}
