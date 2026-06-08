"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { FlipWords } from "@/components/ui/flip-words"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { ArrowRight } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[#000000] bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-[#000000] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#222222] bg-[#0a0a0a]/80 mb-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-xs text-[#888888] tracking-wide">
              Autonomous AI Agent — Always On
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#f0f0f0] mb-6 leading-[1.1]"
          >
            Rank higher on{" "}
            <br className="hidden sm:block" />
            <FlipWords
              words={["Google", "ChatGPT", "Perplexity", "Gemini"]}
              className="text-emerald-400"
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <TextGenerateEffect
              words="An AI agent that finds SEO issues, fixes them, creates content, and monitors your rankings — autonomously, 24/7."
              className="text-lg md:text-xl text-[#888888] leading-relaxed"
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 text-base rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              Start free audit
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-[#888888] hover:text-[#ececec] hover:bg-white/5 px-8 py-6 text-base rounded-full"
              asChild
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </motion.div>

          {/* Social proof line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-xs text-[#555555] mt-8 tracking-wide"
          >
            Free forever on audit tier · No credit card · Setup in 2 minutes
          </motion.p>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
