"use client"

import { useEffect, useState } from "react"

/**
 * Thin signal-green progress bar pinned to the top of the viewport.
 * Progress is measured across the article element (not the whole document),
 * so it reaches 100% when the reader finishes the post rather than the footer.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    let frame = 0

    const measure = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const viewport = window.innerHeight
      // Distance scrolled past the top of the article.
      const scrolled = -rect.top
      // Total distance the article can travel before its end clears the fold.
      const travel = rect.height - viewport

      if (travel <= 0) {
        setProgress(rect.top <= 0 ? 100 : 0)
        return
      }

      const ratio = (scrolled / travel) * 100
      setProgress(Math.min(100, Math.max(0, ratio)))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [targetId])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-signal origin-left"
        style={{
          width: `${progress}%`,
          transition: "width 120ms linear",
        }}
      />
    </div>
  )
}
