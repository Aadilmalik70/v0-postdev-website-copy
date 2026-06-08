"use client"

import { motion } from "motion/react"

export function ProductDemoSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#010a03] to-[#000000]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-3">See it in action</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Your SEO dashboard. Automated.
          </h2>
          <p className="text-[#8a8a8a] text-base md:text-lg max-w-lg mx-auto">
            Connect your site and watch the agent work. Issues found, fixed, and tracked — all in one view.
          </p>
        </motion.div>

        {/* Macbook-style frame */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative perspective-[1200px]"
        >
          {/* Browser chrome */}
          <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] shadow-2xl shadow-emerald-500/5 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a] bg-[#050505]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-[#111111] border border-[#1a1a1a] text-xs text-[#666666] font-mono">
                  app.serpstrategists.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Top stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Issues Found", value: "47", change: "+12 new", color: "text-red-400" },
                  { label: "Issues Fixed", value: "38", change: "auto-fixed", color: "text-emerald-400" },
                  { label: "Organic Traffic", value: "+23%", change: "vs last month", color: "text-emerald-400" },
                  { label: "Keywords Ranking", value: "156", change: "+34 new", color: "text-cyan-400" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#080808] border border-[#151515]">
                    <p className="text-[10px] uppercase tracking-wider text-[#555555] mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] text-[#444444] mt-0.5">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Issues list */}
              <div className="rounded-lg bg-[#080808] border border-[#151515] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#151515] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#888888]">Recent Agent Activity</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>
                </div>
                {[
                  { action: "Fixed", detail: "Missing meta description on /pricing", time: "2 min ago", status: "emerald" },
                  { action: "Fixed", detail: "Added FAQ schema to /blog/geo-guide", time: "8 min ago", status: "emerald" },
                  { action: "Created", detail: "Blog post: 'Internal Linking Strategy'", time: "1 hr ago", status: "cyan" },
                  { action: "Detected", detail: "Broken link on /about → /team (404)", time: "2 hr ago", status: "amber" },
                  { action: "Fixed", detail: "Canonical URL mismatch on 3 pages", time: "3 hr ago", status: "emerald" },
                ].map((item, i) => (
                  <div key={i} className="px-4 py-2.5 border-b border-[#0d0d0d] last:border-0 flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.status === "emerald" ? "bg-emerald-400" : item.status === "cyan" ? "bg-cyan-400" : "bg-amber-400"
                    }`} />
                    <span className={`text-[10px] font-mono uppercase w-16 ${
                      item.status === "emerald" ? "text-emerald-400" : item.status === "cyan" ? "text-cyan-400" : "text-amber-400"
                    }`}>{item.action}</span>
                    <span className="text-xs text-[#aaaaaa] flex-1">{item.detail}</span>
                    <span className="text-[10px] text-[#444444]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reflection glow */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-emerald-500/5 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}
