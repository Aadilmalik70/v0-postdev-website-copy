"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export function GridBackground({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full bg-[#000000] bg-grid-white/[0.02]", className)}>
      <div className="absolute pointer-events-none inset-0 bg-[#000000] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  )
}

export function DotBackground({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full bg-[#000000] bg-dot-white/[0.15]", className)}>
      <div className="absolute pointer-events-none inset-0 bg-[#000000] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  )
}

export function GlowingBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
      <div className="relative">{children}</div>
    </div>
  )
}

export function MovingGradient({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        className
      )}
      style={{
        background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,197,94,0.06), transparent 40%)",
      }}
    />
  )
}
