"use client"

import { useRef } from "react"
import { FileCode2, RefreshCw, Blocks } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const valueProps = [
  {
    icon: FileCode2,
    title: "Figma in. React out.",
    points: [
      "Paste a link. That's it.",
      "POSTDEV reads layout, tokens, hierarchy.",
      "You get clean React + TypeScript + Tailwind.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Self-healing code",
    points: [
      "Runs in a sandbox. Catches its own errors.",
      "Auto-corrects until pixel-perfect.",
      "No babysitting. No debugging AI output.",
    ],
  },
  {
    icon: Blocks,
    title: "Production-grade. Not a demo.",
    points: [
      "Real components. Real architecture.",
      "Slots into your design system.",
      "Ready for your API, your logic, your stack.",
    ],
  },
]

export function ValuePropSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Heading animation
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

    // Cards stagger from bottom
    const cards = cardsRef.current?.querySelectorAll(".value-card")
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 35%",
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
            The Solution
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">
            Static design to live UI — in minutes, not sprints.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-3">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="value-card bg-[#141414] rounded-2xl p-8 md:p-10 group hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              {/* Icon */}
              <prop.icon className="w-10 h-10 text-[#ececec] stroke-[1.5] mb-12" strokeWidth={1.5} />

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-medium text-[#ececec] mb-6">{prop.title}</h3>

              {/* Points */}
              <ul className="space-y-3">
                {prop.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-[#888888] text-sm md:text-base font-light leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
