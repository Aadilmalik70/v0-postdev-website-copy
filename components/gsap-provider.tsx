"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGSAP(
  callback: (
    gsap: typeof import("gsap").gsap,
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
  ) => void,
  deps: any[] = [],
) {
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ctx.current = gsap.context(() => {
        callback(gsap, ScrollTrigger)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      ctx.current?.revert()
    }
  }, deps)
}

export { gsap, ScrollTrigger }
