"use client"

import { useRef, useState } from "react"
import { useGSAP } from "./gsap-provider"

const features = [
  {
    title: "React + TypeScript Output",
    description: "Production-ready React components with full TypeScript support, Vite-ready project structure.",
    number: "01",
  },
  {
    title: "TailwindCSS Utility Classes",
    description: "Clean, semantic utility classes generated directly from your design tokens and spacing.",
    number: "02",
  },
  {
    title: "Reusable Components",
    description: "Buttons, cards, forms, layout blocks — all extracted as reusable, composable components.",
    number: "03",
  },
  {
    title: "Sandbox Build & Preview",
    description: "Code is built, rendered, and visually compared to the original design automatically.",
    number: "04",
  },
  {
    title: "Visual Similarity Check",
    description: "POSTDEV validates output against your design. If it drifts, it corrects and retries.",
    number: "05",
  },
  {
    title: "CLI + IDE Integrations",
    description: "CLI ready now. VSCode + Figma integrations coming soon for seamless workflow.",
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
      // Set initial state
      gsapInstance.set(rows, {
        opacity: 0,
        y: 80,
        scale: 0.9,
      })

      // Create staggered animation
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

    console.log("[v0] FeatureGridSection GSAP initialized, rows found:", rows?.length)
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#000000] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-[#0f766e]/30 via-[#0d9488]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

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

        <div ref={listRef} className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-row border border-[#222222] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group ${
                activeIndex === index ? "bg-[#0a0a0a]" : "bg-transparent hover:bg-[#0a0a0a]/50"
              }`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between p-6 md:p-8">
                <h3
                  className={`text-lg md:text-xl font-light transition-colors duration-300 ${
                    activeIndex === index ? "text-[#5eead4]" : "text-[#ececec]"
                  }`}
                >
                  {feature.title}
                </h3>
                <span className="text-[#555555] text-sm md:text-base font-mono">{feature.number}</span>
              </div>

              {/* Expandable description */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  activeIndex === index ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 md:px-8 pb-6 md:pb-8 text-[#888888] text-sm md:text-base font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
