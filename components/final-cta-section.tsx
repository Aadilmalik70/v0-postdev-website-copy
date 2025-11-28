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
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-10 tracking-[-0.02em] leading-[1.05]">
            The Question
          </h2>

          <p className="text-xl md:text-2xl text-[#888888] mb-6 max-w-3xl mx-auto leading-relaxed font-light">
            Are you still okay writing UI from scratch —<br />
            or do you want your first <span className="text-[#ececec]">autonomous frontend engineer?</span>
          </p>

          <p className="text-lg md:text-xl text-[#666666] mb-14 max-w-2xl mx-auto leading-relaxed font-light">
            Because soon, this won't be optional — it will be expected.
          </p>

          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium px-12 py-7 text-lg rounded-full transition-all duration-300 group"
          >
            Apply for Early Access
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <p className="mt-10 text-sm text-[#555555] font-mono max-w-md mx-auto">
            Spots are disappearing — the ones who move first get the edge.
          </p>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
