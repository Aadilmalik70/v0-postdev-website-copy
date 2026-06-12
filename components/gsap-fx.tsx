"use client"

import { useRef, type ReactNode, type ElementType } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const EASE = "power3.out"

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Scroll-triggered reveal. Animates the wrapper, or children matching `selector` with a stagger. */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  y = 26,
  delay = 0,
  stagger = 0.08,
  selector,
  start = "top 84%",
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  y?: number
  delay?: number
  stagger?: number
  selector?: string
  start?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const targets: gsap.TweenTarget = selector ? root.querySelectorAll(selector) : root
      if (reducedMotion()) {
        gsap.set(targets, { autoAlpha: 1, y: 0 })
        return
      }
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: EASE,
          delay,
          stagger,
          scrollTrigger: { trigger: root, start, once: true },
        },
      )
    },
    { scope: ref },
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  )
}

/** Count-up number that runs once when scrolled into view. */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`
      if (reducedMotion()) {
        el.textContent = format(to)
        return
      }
      const state = { v: 0 }
      el.textContent = format(0)
      gsap.to(state, {
        v: to,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = format(state.v)
        },
      })
    },
    { scope: ref },
  )

  return <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`} />
}

export { gsap, ScrollTrigger, useGSAP, EASE, reducedMotion }
