"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-40 md:py-56 px-6 bg-[#000000]">
      <div ref={contentRef} className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-10 tracking-[-0.02em] leading-[1.05]">
          Still coding UI by hand?
        </h2>

        <p className="text-lg md:text-xl text-[#888888] mb-14 max-w-2xl mx-auto leading-relaxed font-light">
          The shift is already happening. Teams using <span className="text-[#ececec]">POSTDEV</span> ship faster,
          stress less, and spend time on what actually matters — building product, not rebuilding pixels.
        </p>

        <Button
          size="lg"
          className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium px-12 py-7 text-lg rounded-full transition-all duration-300 group"
        >
          Claim your spot
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>

        <p className="mt-10 text-sm text-[#555555] font-mono max-w-md mx-auto">
          Early access is intentionally limited. We're building with a few teams, not for everyone.
        </p>
      </div>
    </section>
  )
}
