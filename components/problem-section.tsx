"use client"

import { useRef } from "react"
import { Repeat, Clock, Layers, RefreshCw, Frown } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const painPoints = [
  {
    icon: Repeat,
    text: "You didn't become a developer to rebuild the same pixel-perfect layouts over and over again.",
  },
  {
    icon: Clock,
    text: "The sprint isn't blocked by backend — it's blocked by UI replication.",
  },
  {
    icon: Layers,
    text: "Designs get 'final update v4.2' and your code becomes instantly outdated.",
  },
  {
    icon: RefreshCw,
    text: "You spend more time aligning buttons than writing product logic.",
  },
  {
    icon: Frown,
    text: "Every redesign? A rerun of the same invisible work no one appreciates.",
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 80, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
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

    const cards = cardsRef.current?.querySelectorAll(".pain-card")
    if (cards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          scale: 0.8,
          rotateX: 15,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "back.out(1.2)",
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
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#000000]" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-16 md:mb-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-6 tracking-[-0.02em]">
            Pain Points
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-xl">
            If this hits a nerve… you're in the right place.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {painPoints.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="pain-card bg-[#141414] rounded-2xl p-8 md:p-10 min-h-[220px] flex flex-col justify-between group hover:bg-[#1a1a1a] transition-all duration-500 hover:scale-[1.02]"
            >
              <item.icon className="w-10 h-10 text-[#ececec] stroke-[1.5]" strokeWidth={1.5} />
              <p className="text-[#ececec] text-base md:text-lg font-light leading-relaxed mt-auto">{item.text}</p>
            </div>
          ))}

          {painPoints.slice(3, 5).map((item, index) => (
            <div
              key={index + 3}
              className={`pain-card bg-[#141414] rounded-2xl p-8 md:p-10 min-h-[220px] flex flex-col justify-between group hover:bg-[#1a1a1a] transition-all duration-500 hover:scale-[1.02] ${
                index === 0 ? "md:col-span-1" : "md:col-span-2"
              }`}
            >
              <item.icon className="w-10 h-10 text-[#ececec] stroke-[1.5]" strokeWidth={1.5} />
              <p className="text-[#ececec] text-base md:text-lg font-light leading-relaxed mt-auto">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#ff3b30] text-lg md:text-xl mt-12 font-light">
          It's not engineering. It's repetition.
        </p>
      </div>
    </section>
  )
}
