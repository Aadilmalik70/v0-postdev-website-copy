"use client"

import { motion } from "motion/react"
import { Zap } from "lucide-react"

export function UrgencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#0a0a0a]/90 border border-emerald-500/20 backdrop-blur-md shadow-lg shadow-emerald-500/5 flex items-center gap-3"
    >
      <div className="flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" />
        <span className="text-xs font-medium text-[#ececec]">Early access pricing</span>
      </div>
      <span className="text-[10px] text-[#666666]">·</span>
      <span className="text-xs text-[#888888]">Lock in $49/mo before launch</span>
      <a
        href="#pricing"
        className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors ml-1"
      >
        →
      </a>
    </motion.div>
  )
}
