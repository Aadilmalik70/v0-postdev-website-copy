"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"
import { EarlyAccessModal } from "./early-access-modal"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.4")
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
  }, [])

  return (
    <>
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 bg-[#000000]">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#333333] bg-[#141414] mb-12"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3b30] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff3b30]"></span>
            </span>
            <span className="text-xs font-mono text-[#888888] uppercase tracking-widest">
              Only 0.7% of teams will build like this
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="font-serif text-7xl md:text-[10rem] lg:text-[12rem] font-normal tracking-[-0.03em] text-[#ececec] mb-8 leading-[0.9]"
          >
            POST<span className="text-[#ff3b30]">DEV</span>
          </h1>

          <p ref={subtitleRef} className="text-2xl md:text-4xl font-light text-[#ececec] mb-6 tracking-tight">
            Your First AI Frontend Engineer.
          </p>

          <div ref={descRef} className="max-w-2xl mx-auto mb-14">
            <p className="text-xl md:text-2xl text-[#888888] mb-4">
              Design is already finished.
              <br />
              Now your code writes itself.
            </p>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed">
              Paste a Figma link → Get production-ready React + Tailwind.
              <br />
              Not snippets. Not mock code.
              <br />
              <span className="text-[#ececec]">A real working frontend — tested, corrected, and ready.</span>
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium px-10 py-6 text-base rounded-full transition-all duration-300 animate-pulse hover:animate-none"
            >
              Apply — seats closing soon
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-[#888888] hover:text-[#ececec] hover:bg-transparent px-8 py-6 text-base group"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch the 47-second demo
            </Button>
          </div>

          <p className="text-sm text-[#555555] font-mono">The rest will get left behind.</p>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
