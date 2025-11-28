"use client"

import { useRef } from "react"
import { Eye, Code2, FlaskConical, RefreshCw } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const valueProps = [
  {
    icon: Eye,
    number: "01",
    title: "Understands your Figma like a senior dev",
    description: "Layout, spacing, hierarchy, tokens — understood. No manual annotation needed.",
  },
  {
    icon: Code2,
    number: "02",
    title: "Generates clean React + TypeScript + Tailwind",
    description: "Not AI hallucination — structure you can ship and scale.",
  },
  {
    icon: FlaskConical,
    number: "03",
    title: "Builds and tests in a sandbox",
    description: "Renders, inspects, validates against your design automatically.",
  },
  {
    icon: RefreshCw,
    number: "04",
    title: "Fixes itself — until it matches",
    description: "Pixel mismatch? Internal logic runs again. No babysitting. No manual cleanup.",
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
          <p className="text-[#6b38ff] text-sm md:text-base font-mono mb-4 uppercase tracking-widest">
            POSTDEV isn't an AI assistant.
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-6 tracking-[-0.02em]">
            What POSTDEV Does
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">It's an autonomous frontend engineer.</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="value-card bg-[#141414] rounded-2xl p-8 md:p-10 group hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#6b38ff]/10 text-[#6b38ff] text-sm font-mono font-medium mb-6">
                {prop.number}
              </div>

              {/* Icon */}
              <prop.icon className="w-10 h-10 text-[#ececec] stroke-[1.5] mb-8" strokeWidth={1.5} />

              {/* Title */}
              <h3 className="text-lg md:text-xl font-medium text-[#ececec] mb-4">{prop.title}</h3>

              {/* Description */}
              <p className="text-[#888888] text-sm font-light leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#666666] text-lg mt-12 font-light">
          No babysitting. No manual cleanup. No "close enough."
        </p>
      </div>
    </section>
  )
}
