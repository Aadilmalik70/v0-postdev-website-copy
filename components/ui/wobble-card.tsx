"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function WobbleCard({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "mx-auto w-full rounded-2xl overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="relative h-full overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <div className={cn("h-full px-6 py-10 sm:px-10", className)}>
          <div
            className="pointer-events-none absolute -inset-0.5 rounded-2xl"
            style={{
              background: isHovering
                ? `radial-gradient(600px circle at ${mousePosition.x * 20 + 50}% ${mousePosition.y * 20 + 50}%, rgba(34,197,94,0.06), transparent 40%)`
                : undefined,
            }}
          />
          {children}
        </div>
      </div>
    </motion.section>
  )
}
