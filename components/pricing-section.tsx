"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { User, Users, Building, Star, Calculator } from "lucide-react"
import { useGSAP, gsap } from "./gsap-provider"
import { EarlyAccessModal } from "./early-access-modal"

const tiers = [
  {
    icon: User,
    name: "Starter",
    identity: "Individual builder entry point",
    price: "$49",
    period: "/mo",
    tagline: "For builders who want to stop wasting time.",
    status: null,
    featured: false,
  },
  {
    icon: Users,
    name: "Team",
    identity: "Serious builders, speed matters",
    price: "$199",
    period: "/mo",
    tagline: "The most cost-effective way to replace UI coding.",
    status: "POPULAR",
    featured: true,
  },
  {
    icon: Building,
    name: "Agency / Scale",
    identity: "Power user / elite advantage",
    price: "$499",
    period: "/mo",
    tagline: "Bill 10× more output without hiring.",
    status: null,
    featured: false,
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tiersRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const enterpriseRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(50)

  const monthlySavings = hoursPerWeek * hourlyRate * 4
  const costOfNotUsing = monthlySavings - 199

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

    const tierItems = tiersRef.current?.querySelectorAll(".tier-item")
    if (tierItems) {
      gsap.fromTo(
        tierItems,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

    gsap.fromTo(
      calculatorRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: calculatorRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    )

    gsap.fromTo(
      enterpriseRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: enterpriseRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <>
      <section ref={sectionRef} id="pricing" className="py-32 md:py-40 px-6 bg-[#000000]">
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef} className="mb-16 md:mb-20 text-center">
            <p className="text-[#6b38ff] text-sm md:text-base font-mono mb-4 uppercase tracking-widest">
              Simple, transparent pricing
            </p>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-[#ececec] mb-6 tracking-[-0.02em]">
              Choose Your Plan
            </h2>
            <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto">
              Start small, scale as you grow. All plans include core POSTDEV features.
            </p>
          </div>

          {/* Pricing tiers */}
          <div ref={tiersRef} className="grid md:grid-cols-3 gap-6 mb-16">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`tier-item relative rounded-3xl p-8 md:p-10 transition-all duration-500 ${
                  tier.featured
                    ? "bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#ff3b30]/50 scale-[1.02]"
                    : "bg-[#141414] border border-[#222222] hover:border-[#333333]"
                }`}
              >
                {tier.status && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#ff3b30] text-white text-xs font-mono rounded-full flex items-center gap-2">
                    <Star className="w-3 h-3 fill-current" />
                    {tier.status}
                  </span>
                )}

                <tier.icon className="w-12 h-12 text-[#ececec] stroke-[1.5] mb-6" strokeWidth={1.5} />

                <h3 className="text-2xl md:text-3xl font-medium text-[#ececec] mb-2">{tier.name}</h3>
                <p className="text-[#666666] text-sm mb-8">{tier.identity}</p>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-[#ececec]">{tier.price}</span>
                  <span className="text-[#666666] text-lg">{tier.period}</span>
                </div>

                <p className="text-[#888888] text-sm mb-8 min-h-[40px]">{tier.tagline}</p>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-6 rounded-xl font-medium transition-all duration-300 ${
                    tier.featured
                      ? "bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-white"
                      : "bg-[#222222] hover:bg-[#333333] text-[#ececec]"
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          {/* Calculator */}
          <div ref={calculatorRef} className="bg-[#0a0a0a] border border-[#222222] rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-6 h-6 text-[#6b38ff]" />
              <h3 className="text-xl md:text-2xl font-medium text-[#ececec]">Calculate Your Savings</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-[#888888] text-sm mb-3">Hours spent coding UI per week</label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#6b38ff]"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[#666666] text-xs">5 hrs</span>
                  <span className="text-[#ececec] text-lg font-medium">{hoursPerWeek} hrs/week</span>
                  <span className="text-[#666666] text-xs">60 hrs</span>
                </div>
              </div>

              <div>
                <label className="block text-[#888888] text-sm mb-3">Average hourly rate ($)</label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#6b38ff]"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[#666666] text-xs">$25</span>
                  <span className="text-[#ececec] text-lg font-medium">${hourlyRate}/hr</span>
                  <span className="text-[#666666] text-xs">$200</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#141414] rounded-2xl p-6 text-center">
                <p className="text-[#888888] text-sm mb-2">POSTDEV saves you</p>
                <p className="text-4xl md:text-5xl font-bold text-[#5eead4]">
                  ${monthlySavings.toLocaleString()}
                  <span className="text-lg text-[#666666]">/month</span>
                </p>
              </div>
              <div className="bg-[#141414] rounded-2xl p-6 text-center">
                <p className="text-[#888888] text-sm mb-2">Cost of NOT using POSTDEV</p>
                <p className="text-4xl md:text-5xl font-bold text-[#ff3b30]">
                  ${costOfNotUsing.toLocaleString()}
                  <span className="text-lg text-[#666666]">/month</span>
                </p>
              </div>
            </div>
          </div>

          {/* Enterprise tier - forbidden/invite only */}
          <div
            ref={enterpriseRef}
            className="relative bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#0a0a0a] border border-[#222222] rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6b38ff]/5 rounded-full blur-[100px]" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-6 h-6 text-[#6b38ff]" />
                  <span className="text-[#6b38ff] text-xs font-mono uppercase tracking-widest">
                    Enterprise / Internal Systems
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-[#ececec] mb-3">Need more?</h3>
                <p className="text-[#888888] text-base max-w-xl">
                  Private model hosting, SOC2, design system mapping, sandbox deployment.
                </p>
              </div>

              <div className="flex-shrink-0">
                <span className="inline-block px-6 py-3 bg-[#1a1a1a] border border-[#333333] rounded-full text-[#888888] text-sm font-mono">
                  Available by invitation only
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
