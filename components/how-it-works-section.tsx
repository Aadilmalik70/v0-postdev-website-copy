"use client"

import { useRef } from "react"
import { Eye, Brain, Code2, CheckCircle } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const steps = [
  {
    icon: Eye,
    label: "Extract",
    description: "Pulls structure, hierarchy, and design tokens directly from Figma.",
  },
  {
    icon: Brain,
    label: "Model",
    description: "Builds an internal layout representation — understands your UI like a senior dev would.",
  },
  {
    icon: Code2,
    label: "Generate",
    description: "Outputs clean React + Tailwind, wired to a runnable project scaffold.",
  },
  {
    icon: CheckCircle,
    label: "Validate",
    description: "Renders, compares, corrects. Loops until the output matches the original design.",
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Heading
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

    // Steps stagger from bottom
    const stepItems = stepsRef.current?.querySelectorAll(".step-item")
    if (stepItems) {
      gsap.fromTo(
        stepItems,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 1,
          },
        },
      )
    }

    // Footer
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-32 md:py-40 px-6 bg-[#000000]">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-16 md:mb-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-6 tracking-[-0.02em]">
            Under the hood
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">
            How POSTDEV transforms your designs into production code.
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item bg-[#141414] rounded-2xl p-8 md:p-10 group hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              {/* Step Number */}
              <div className="text-xs text-[#888888] font-mono mb-8 tracking-widest">0{index + 1}</div>

              {/* Icon */}
              <step.icon className="w-10 h-10 text-[#ececec] stroke-[1.5] mb-8" strokeWidth={1.5} />

              {/* Label */}
              <h3 className="text-xl font-medium text-[#ececec] mb-4">{step.label}</h3>

              {/* Description */}
              <p className="text-[#888888] text-sm font-light leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Footer message */}
        <div ref={footerRef} className="text-center max-w-3xl mx-auto">
          <p className="text-[#888888] text-base mb-4">Not another "AI code assistant" —</p>
          <p className="text-xl md:text-2xl text-[#ececec] font-light">
            an autonomous agent that builds, tests, and ships UI.
          </p>
        </div>
      </div>
    </section>
  )
}
