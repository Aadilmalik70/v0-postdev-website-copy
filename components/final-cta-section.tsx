"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"

export function FinalCtaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="py-28 md:py-36 px-6 relative overflow-hidden">
        {/* Lamp-like glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-6">
            Your competitors are not waiting.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Every day without SEO is traffic you are handing to someone else. Connect the site, let the agent find the gaps, and start fixing what is holding growth back.
            </p>

            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-10 py-7 text-lg rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              Get your free audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-[#555555] mt-6 tracking-wide">
              Free forever on audit tier · No credit card required
            </p>
          </motion.div>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
