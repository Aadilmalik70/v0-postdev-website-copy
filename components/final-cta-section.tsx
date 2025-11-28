"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"
import { EarlyAccessModal } from "./early-access-modal"

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
      <section ref={sectionRef} className="py-40 md:py-56 px-6 bg-[#000000]">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <p className="text-[#ff3b30] text-sm md:text-base font-mono mb-6 uppercase tracking-widest">Ask yourself:</p>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-[#ececec] mb-10 tracking-[-0.02em] leading-[1.1]">
            Are you still okay writing UI by hand —
            <br />
            <span className="text-[#888888]">or do you want your first</span>
            <br />
            <span className="text-[#ff3b30]">autonomous frontend engineer?</span>
          </h2>

          <p className="text-lg md:text-xl text-[#666666] mb-14 max-w-2xl mx-auto leading-relaxed font-light">
            Because soon, this won't be optional.
            <br />
            It'll be expected.
          </p>

          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium px-12 py-7 text-lg rounded-full transition-all duration-300 group animate-pulse hover:animate-none"
          >
            Join Early Access — Before It's Gone
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
