"use client"

import { useRef } from "react"
import { Eye, Brain, Code2, CheckCircle } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const valueProps = [
  {
    icon: Eye,
    title: "Reads your design like a senior engineer",
    points: [
      "Layout, spacing, hierarchy, tokens — understood.",
      "Pulls structure directly from Figma.",
      "No manual annotation needed.",
    ],
  },
  {
    icon: Code2,
    title: "Generates real production code",
    points: [
      "React + TypeScript + Tailwind output.",
      "Not AI hallucination — structure you can ship and scale.",
      "Wired to a runnable project scaffold.",
    ],
  },
  {
    icon: Brain,
    title: "Tests itself in a sandbox",
    points: [
      "Builds, renders, inspects automatically.",
      "Visual similarity validation against your design.",
      "No babysitting. No debugging AI output.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Fixes its own mistakes",
    points: [
      "Pixel mismatch? Internal logic runs again.",
      "Repeats until indistinguishable from your Figma.",
      "Auto-corrects until pixel-perfect.",
    ],
  },
]

export function ValuePropSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
            What POSTDEV Does
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">
            This isn't an "AI Helper." It's your autonomous frontend engineer.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="value-card bg-[#141414] rounded-2xl p-8 md:p-10 group hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              {/* Step number */}
              <div className="text-xs text-[#888888] font-mono mb-6 tracking-widest">0{index + 1}</div>

              {/* Icon */}
              <prop.icon className="w-10 h-10 text-[#ececec] stroke-[1.5] mb-8" strokeWidth={1.5} />

              {/* Title */}
              <h3 className="text-lg md:text-xl font-medium text-[#ececec] mb-6">{prop.title}</h3>

              {/* Points */}
              <ul className="space-y-3">
                {prop.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-[#888888] text-sm font-light leading-relaxed">
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
