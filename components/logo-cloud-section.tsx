"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

const rows = [
  [
    { name: "WordPress", logo: "/logos/wordpress.svg" },
    { name: "Shopify", logo: "/logos/shopify.svg" },
    { name: "Next.js", logo: "/logos/nextdotjs.svg" },
    { name: "Webflow", logo: "/logos/webflow.svg" },
  ],
  [
    { name: "Ghost", logo: "/logos/ghost.svg" },
    { name: "Wix", logo: "/logos/wix.svg" },
    { name: "Sanity", logo: "/logos/sanity.svg" },
    { name: "Vercel", logo: "/logos/vercel.svg" },
  ],
  [
    { name: "Netlify", logo: "/logos/netlify.svg" },
    { name: "GitHub", logo: "/logos/github.svg" },
    { name: "WordPress", logo: "/logos/wordpress.svg" },
    { name: "Shopify", logo: "/logos/shopify.svg" },
  ],
]

export function LogoCloudSection() {
  const [activeRow, setActiveRow] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % rows.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 md:py-28 px-6 bg-[#020202]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl md:text-3xl font-medium text-[#666666] mb-3"
        >
          Works with your existing stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-sm text-[#444444] mb-14"
        >
          Connects to any site with a GitHub repo or CMS API
        </motion.p>

        {/* Animated logo row */}
        <div className="relative h-16 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRow}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center gap-12 md:gap-16"
            >
              {rows[activeRow].map((item) => (
                <div
                  key={item.name + activeRow}
                  className="flex items-center gap-3"
                >
                  <Image src={item.logo} alt={item.name} width={28} height={28} />
                  <span className="text-base font-medium text-[#aaaaaa]">{item.name}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
