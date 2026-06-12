"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  className,
}: {
  items: { quote: string; name: string; title: string }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  className?: string
}) {
  const duration = speed === "fast" ? 20 : speed === "normal" ? 40 : 60

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: direction === "left" ? [0, -50 * items.length * 4] : [-50 * items.length * 4, 0] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 w-[300px] md:w-[350px] rounded-2xl border border-line bg-card p-6"
          >
            <p className="text-sm text-neutral-600/90 leading-relaxed mb-4">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-signal to-systeal" />
              <div>
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="text-xs text-neutral-600">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
