"use client"

import { useRef } from "react"
import { useGSAP, gsap } from "./gsap-provider"

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          end: "top 80%",
          scrub: 1,
        },
      },
    )
  }, [])

  return (
    <footer ref={footerRef} className="py-12 px-6 border-t border-[#1a1a1a] bg-[#000000]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-serif text-xl tracking-tight text-[#ececec]">
            POST<span className="text-[#ff3b30]">DEV</span>
          </span>
          <span className="text-[#555555] text-sm font-mono">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors duration-300">
            Privacy
          </a>
          <a href="#" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors duration-300">
            Terms
          </a>
          <a href="#" className="text-sm text-[#888888] hover:text-[#ececec] transition-colors duration-300">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}
