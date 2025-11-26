"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { User, Users, Building } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"

const tiers = [
  {
    icon: User,
    name: "Solo",
    description: "For individual builders",
  },
  {
    icon: Users,
    name: "Team",
    description: "For startups and agencies",
    featured: true,
  },
  {
    icon: Building,
    name: "Scale",
    description: "For product orgs with big design systems",
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tiersRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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

    // Tiers stagger from bottom
    const tierItems = tiersRef.current?.querySelectorAll(".tier-item")
    if (tierItems) {
      gsap.fromTo(
        tierItems,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tiersRef.current,
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          },
        },
      )
    }

    // CTA
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-32 md:py-40 px-6 bg-[#000000]">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-16 md:mb-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-6 tracking-[-0.02em]">
            Early access
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-2xl">
            In early access, we're working closely with a small group of teams. They get better output. We get better
            product. Everyone wins.
          </p>
        </div>

        <div ref={tiersRef} className="grid md:grid-cols-3 gap-3 mb-16">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`tier-item relative bg-[#141414] rounded-2xl p-8 md:p-10 group hover:bg-[#1a1a1a] transition-colors duration-300 ${
                tier.featured ? "ring-1 ring-[#ff3b30]/30" : ""
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 px-3 py-1 bg-[#ff3b30] text-[#ececec] text-xs font-mono rounded-full">
                  POPULAR
                </span>
              )}

              <tier.icon className="w-10 h-10 text-[#ececec] stroke-[1.5] mb-12" strokeWidth={1.5} />

              <h3 className="text-2xl font-medium text-[#ececec] mb-3">{tier.name}</h3>
              <p className="text-[#888888] font-light mb-8">{tier.description}</p>

              <p className="text-sm text-[#555555] font-mono">Pricing coming soon</p>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="text-center">
          <Button
            size="lg"
            className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium px-10 py-6 text-base rounded-full transition-all duration-300"
          >
            Apply for early access
          </Button>
        </div>
      </div>
    </section>
  )
}
