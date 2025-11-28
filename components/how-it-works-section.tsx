"use client"

import { useRef } from "react"
import { useGSAP, gsap } from "./gsap-provider"

const techFeatures = [
  "React + TypeScript output",
  "TailwindCSS utility classes",
  "Reusable components",
  "Sandbox build + live preview",
  "Visual similarity validation",
  "CLI + IDE workflows",
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

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

    const items = listRef.current?.querySelectorAll(".tech-item")
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        },
      )
    }

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
            Under the Hood
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">All without opening a code editor first.</p>
        </div>

        <div ref={listRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {techFeatures.map((feature, index) => (
            <div
              key={index}
              className="tech-item flex items-center gap-4 p-6 bg-[#141414] rounded-xl group hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              <span className="text-[#ff3b30] font-mono text-sm">✓</span>
              <span className="text-[#ececec] text-base md:text-lg font-light">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer message */}
        <div ref={footerRef} className="text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-[#ececec] font-light">
            Not another "AI code assistant" —<br />
            <span className="text-[#888888]">an autonomous agent that builds, tests, and ships UI.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
