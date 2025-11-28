"use client"

import { useRef } from "react"
import { useGSAP, gsap } from "./gsap-provider"

const painPoints = [
  {
    text: "Designers create pixel-perfect screens → devs rebuild them from scratch.",
  },
  {
    text: "Sprint planning gets eaten by spacing, alignment, layout hell.",
  },
  {
    text: "Every redesign = the same repetitive work nobody wants to do.",
  },
  {
    text: "Your engineering budget burns on translation, not innovation.",
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 80, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      },
    )

    const cards = cardsRef.current?.querySelectorAll(".pain-card")
    if (cards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          scale: 0.8,
          rotateX: 15,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#000000]" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-16 md:mb-20">
          <p className="text-[#ff3b30] text-sm md:text-base font-mono mb-4 uppercase tracking-widest">
            If this makes your chest feel tight — good.
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-6 tracking-[-0.02em]">
            Pain Points
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">
            It means you're still building UI the slow way.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {painPoints.map((item, index) => (
            <div
              key={index}
              className="pain-card bg-[#141414] rounded-2xl p-8 md:p-10 min-h-[160px] flex items-start gap-4 group hover:bg-[#1a1a1a] transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2L16 16M16 2L2 16" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[#ececec] text-base md:text-lg font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#888888] text-lg md:text-xl font-light mb-2">This isn't engineering.</p>
          <p className="text-[#ff3b30] text-xl md:text-2xl font-medium">
            This is expensive copy-paste labor disguised as development.
          </p>
        </div>
      </div>
    </section>
  )
}
