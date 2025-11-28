"use client"

import { useRef } from "react"
import { Zap, Rocket, Clock, Target, Users, TrendingUp } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const outcomes = [
  {
    icon: Zap,
    text: "Design → POSTDEV → production. One step. No friction. No bottleneck.",
  },
  {
    icon: Rocket,
    text: "What used to require developers, deadlines, reviews, rebuilds — now requires a Figma URL.",
  },
  {
    icon: Clock,
    text: "Engineering time is too valuable to waste on layout recreation.",
  },
  {
    icon: Target,
    text: "An agent that builds, validates, and improves itself — without asking.",
  },
  {
    icon: Users,
    text: "Not an 'AI Helper.' A replacement for the repetitive part of frontend engineering.",
  },
  {
    icon: TrendingUp,
    text: "Teams waste weeks turning Figma files into usable frontend code. POSTDEV turns that into minutes.",
  },
]

export function OutcomesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, x: -100, filter: "blur(10px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      },
    )

    const cards = cardsRef.current?.querySelectorAll(".outcome-card")
    if (cards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          rotateY: -45,
          x: -50,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#f5f5f5]" style={{ perspective: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#0a0a0a] mb-6 tracking-[-0.02em]"
        >
          The Shift
        </h2>
        <p className="text-[#666666] text-base md:text-lg mb-16 md:mb-20 max-w-xl">
          Stop rewriting what's already been designed.
        </p>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e0e0e0] rounded-2xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {outcomes.map((item, index) => (
            <div
              key={index}
              className="outcome-card bg-[#ffffff] p-8 md:p-10 min-h-[200px] flex flex-col group hover:bg-[#fafafa] transition-all duration-500"
            >
              <item.icon className="w-10 h-10 text-[#0a0a0a] stroke-[1.5] mb-8" strokeWidth={1.5} />
              <p className="text-[#0a0a0a] text-base md:text-lg font-light leading-relaxed mt-auto">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
