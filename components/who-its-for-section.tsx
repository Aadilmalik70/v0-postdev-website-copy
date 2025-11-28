"use client"

import { useRef } from "react"
import { Rocket, Code, Building2 } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const personas = [
  {
    icon: Rocket,
    title: "Founder / Product Leader",
    quote: "If we ship twice as fast, we win.",
  },
  {
    icon: Code,
    title: "Engineer",
    quote: "Finally — I can focus on architecture, not CSS arguments.",
  },
  {
    icon: Building2,
    title: "Agency / Studio",
    quote: "More delivery. Less payroll. Higher margins.",
  },
]

export function WhoItsForSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const personasRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        },
      },
    )

    const personaItems = personasRef.current?.querySelectorAll(".persona-item")
    if (personaItems) {
      gsap.fromTo(
        personaItems,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: personasRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#000000]">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-16 md:mb-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-6 tracking-[-0.02em]">
            Who It's For
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">
            If this feels like the future — that's because it is.
          </p>
        </div>

        <div ref={personasRef} className="grid md:grid-cols-3 gap-3">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="persona-item bg-[#141414] rounded-2xl p-8 md:p-10 group hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              {/* Icon */}
              <persona.icon className="w-10 h-10 text-[#ececec] stroke-[1.5] mb-12" strokeWidth={1.5} />

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-medium text-[#ececec] mb-6">{persona.title}</h3>

              <p className="text-[#ff3b30] text-lg font-light leading-relaxed italic">"{persona.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
