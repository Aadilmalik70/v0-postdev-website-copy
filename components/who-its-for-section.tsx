"use client"

import { useRef } from "react"
import { Rocket, Code, Building2, Brain } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const personas = [
  {
    icon: Rocket,
    title: "Founder",
    trait: "who wants speed > headcount",
  },
  {
    icon: Code,
    title: "Engineer",
    trait: "tired of pixel-nudging",
  },
  {
    icon: Building2,
    title: "Agency",
    trait: "bleeding hours in handoff chaos",
  },
  {
    icon: Brain,
    title: "Builder",
    trait: "who believes engineering time should build logic — not recreate UI",
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
            You belong here if:
          </h2>
        </div>

        <div ref={personasRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="persona-item bg-[#141414] rounded-2xl p-8 md:p-10 group hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-[#5eead4]/10 flex items-center justify-center mb-6">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 6L5 10L13 1"
                    stroke="#5eead4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Icon */}
              <persona.icon className="w-10 h-10 text-[#ececec] stroke-[1.5] mb-8" strokeWidth={1.5} />

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-medium text-[#ececec] mb-4">You're a {persona.title}</h3>

              <p className="text-[#888888] text-base font-light leading-relaxed">{persona.trait}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border border-[#222222] rounded-2xl p-8 md:p-12 bg-[#0a0a0a]">
          <p className="text-[#888888] text-lg md:text-xl font-light mb-4">If you read that and thought:</p>
          <p className="text-[#ff3b30] text-2xl md:text-3xl font-medium italic mb-4">"Finally."</p>
          <p className="text-[#ececec] text-lg md:text-xl">Then POSTDEV was built for you.</p>
        </div>
      </div>
    </section>
  )
}
