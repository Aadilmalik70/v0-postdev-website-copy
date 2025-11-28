"use client"

import { useRef } from "react"
import { useGSAP, gsap } from "./gsap-provider"

const outcomes = [
  {
    metric: "10–20x",
    text: "Ship UI faster",
  },
  {
    metric: "↓",
    text: "Reduce frontend headcount pressure",
  },
  {
    metric: "Minutes",
    text: "Turn designs into code — not sprints",
  },
]

export function OutcomesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, x: -100, filter: "blur(10px)" },
      {
        opacity: 1,
        x: 0,
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

    const cards = cardsRef.current?.querySelectorAll(".outcome-card")
    if (cards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          rotateY: -45,
          x: -50,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
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
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#f5f5f5]" style={{ perspective: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[#ff3b30] text-sm md:text-base font-mono mb-4 uppercase tracking-widest">
          A silent shift already started.
        </p>
        <h2
          ref={headingRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#0a0a0a] mb-6 tracking-[-0.02em]"
        >
          The Shift
        </h2>
        <p className="text-[#666666] text-base md:text-lg mb-16 md:mb-20 max-w-xl">Teams using POSTDEV now:</p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ transformStyle: "preserve-3d" }}>
          {outcomes.map((item, index) => (
            <div key={index} className="outcome-card relative group">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ff3b30]/20 via-transparent to-[#6b38ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#ffffff] border border-[#e0e0e0] rounded-3xl p-10 md:p-12 min-h-[280px] flex flex-col justify-between group-hover:border-[#ff3b30]/30 transition-all duration-500">
                {/* Large metric */}
                <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#ff3b30] to-[#6b38ff] bg-clip-text text-transparent">
                  {item.metric}
                </span>

                {/* Description */}
                <p className="text-[#0a0a0a] text-xl md:text-2xl font-light leading-relaxed mt-auto">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-[#666666] text-lg md:text-xl font-light mb-4">
            Soon, manually coding UI will feel archaic — like slicing PSDs in 2009.
          </p>
          <p className="text-[#0a0a0a] text-xl md:text-2xl font-medium max-w-2xl mx-auto">
            The future doesn't need more developers typing HTML.
            <br />
            It needs developers shipping product.
          </p>
        </div>
      </div>
    </section>
  )
}
