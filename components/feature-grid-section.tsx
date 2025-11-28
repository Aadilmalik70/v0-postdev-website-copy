"use client"

import { useRef, useState } from "react"
import { useGSAP } from "./gsap-provider"
import { ChevronDown } from "lucide-react"

const features = [
  {
    title: "React + TypeScript Output",
    description:
      "Production-ready React components with full TypeScript support. Not AI hallucination — structure you can ship and scale.",
    number: "01",
  },
  {
    title: "TailwindCSS Utility Classes",
    description: "Clean, semantic utility classes generated directly from your design tokens and spacing.",
    number: "02",
  },
  {
    title: "Reusable Components",
    description:
      "Buttons, cards, forms, layout blocks — all extracted as reusable, composable components that slot into your design system.",
    number: "03",
  },
  {
    title: "Sandbox Build & Preview",
    description:
      "Code is built, rendered, and visually compared to the original design automatically. No babysitting required.",
    number: "04",
  },
  {
    title: "Visual Similarity Validation",
    description:
      "POSTDEV validates output against your design. Pixel mismatch? Internal logic runs again. Repeats until pixel-perfect.",
    number: "05",
  },
  {
    title: "CLI + IDE Integrations",
    description:
      "CLI ready now. VSCode + Figma integrations coming soon for seamless workflow — all without opening a code editor first.",
    number: "06",
  },
]

export function FeatureGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(3)

  useGSAP((gsapInstance, ScrollTriggerPlugin) => {
    // Header animation
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
        {/* Header with two columns like Figma */}
        <div ref={headingRef} className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] tracking-[-0.02em]">
            What's included
          </h2>
          <div className="flex flex-col justify-end">
            <p className="text-[#888888] text-base md:text-lg leading-relaxed">
              POSTDEV is the layer between design and deployment — an autonomous frontend engineer that reads your
              design, generates code, tests it, and fixes itself.
            </p>
            <p className="text-[#666666] text-sm md:text-base mt-4">
              Not "AI that writes snippets" — an agent that builds and checks the UI for you.
            </p>
          </div>
        </div>

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
              {/* Active indicator line */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#5eead4] to-[#0d9488] transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="flex items-center justify-between p-6 md:p-8">
                <div className="flex items-center gap-6">
                  {/* Number badge */}
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

                {/* Chevron indicator */}
                <ChevronDown
                  className={`w-5 h-5 transition-all duration-300 ${
                    activeIndex === index ? "text-[#5eead4] rotate-180" : "text-[#444444] group-hover:text-[#666666]"
                  }`}
                />
              </div>

              {/* Expandable description */}
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
