"use client"

import { useRef, useState } from "react"
import { useGSAP } from "./gsap-provider"
import { ChevronDown } from "lucide-react"

const features = [
  {
    title: "React + TypeScript output",
    description: "Production-ready code you can ship immediately. Not snippets — real components.",
    number: "01",
  },
  {
    title: "Tailwind utility classes",
    description: "Clean, semantic utility classes generated directly from your design tokens.",
    number: "02",
  },
  {
    title: "Reusable component structure",
    description: "Buttons, cards, forms, layouts — all extracted as composable components.",
    number: "03",
  },
  {
    title: "Sandbox build & live preview",
    description: "Code is built, rendered, and visually compared to original design automatically.",
    number: "04",
  },
  {
    title: "Visual similarity validation",
    description: "POSTDEV validates output against your design. Mismatch? It fixes itself.",
    number: "05",
  },
  {
    title: "CLI + IDE integrations",
    description: "CLI ready now. VSCode + Figma integrations coming soon.",
    number: "06",
  },
]

const checklist = [
  "React + TypeScript output",
  "Tailwind utility classes",
  "Reusable component structure",
  "Sandbox build & live preview",
  "Visual similarity validation",
  "CLI + IDE integrations",
]

export function FeatureGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(3)

  useGSAP((gsapInstance, ScrollTriggerPlugin) => {
    gsapInstance.fromTo(
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
          toggleActions: "play none none none",
        },
      },
    )

    const rows = listRef.current?.querySelectorAll(".feature-row")
    if (rows && rows.length > 0) {
      gsapInstance.set(rows, {
        opacity: 0,
        y: 80,
        scale: 0.9,
      })

      ScrollTriggerPlugin.create({
        trigger: listRef.current,
        start: "top 80%",
        onEnter: () => {
          gsapInstance.to(rows, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            stagger: 0.12,
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#000000] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[700px] bg-gradient-to-l from-[#0f766e]/20 via-[#0d9488]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute right-20 top-1/3 w-[300px] h-[400px] bg-gradient-to-bl from-[#5eead4]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div ref={headingRef} className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] tracking-[-0.02em]">
            Under the Hood
          </h2>
          <div className="flex flex-col justify-end">
            <p className="text-[#888888] text-base md:text-lg leading-relaxed">
              This isn't a demo. It's a deployable frontend.
            </p>
            <p className="text-[#666666] text-sm md:text-base mt-4">Remove objections. Tangible value.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-[#ececec] group">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5eead4]/10 flex items-center justify-center">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="#5eead4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-base md:text-lg font-light group-hover:text-[#5eead4] transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Accordion list */}
        <div ref={listRef} className="flex flex-col gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-row relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group ${
                activeIndex === index
                  ? "bg-[#111111] border border-[#2a2a2a]"
                  : "bg-[#0a0a0a]/50 border border-[#1a1a1a] hover:border-[#252525] hover:bg-[#0f0f0f]"
              }`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#5eead4] to-[#0d9488] transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="flex items-center justify-between p-6 md:p-8">
                <div className="flex items-center gap-6">
                  <span
                    className={`text-xs font-mono px-2.5 py-1 rounded-md transition-colors duration-300 ${
                      activeIndex === index ? "bg-[#5eead4]/10 text-[#5eead4]" : "bg-[#1a1a1a] text-[#555555]"
                    }`}
                  >
                    {feature.number}
                  </span>
                  <h3
                    className={`text-lg md:text-xl font-light transition-colors duration-300 ${
                      activeIndex === index ? "text-[#ececec]" : "text-[#999999] group-hover:text-[#cccccc]"
                    }`}
                  >
                    {feature.title}
                  </h3>
                </div>

                <ChevronDown
                  className={`w-5 h-5 transition-all duration-300 ${
                    activeIndex === index ? "text-[#5eead4] rotate-180" : "text-[#444444] group-hover:text-[#666666]"
                  }`}
                />
              </div>

              <div
                className={`grid transition-all duration-500 ease-out ${
                  activeIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 md:px-8 pb-6 md:pb-8 pl-[4.5rem] md:pl-[5.5rem] text-[#777777] text-sm md:text-base font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
