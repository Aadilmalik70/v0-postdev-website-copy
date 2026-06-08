"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { submitEarlyAccess } from "@/app/actions"

interface EarlyAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await submitEarlyAccess({ email, website })
      setSubmitted(true)
    } catch {
      // silently fail for now
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0a0a0a] border border-[#2a2a2a] rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#666666] hover:text-[#ececec] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="20" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6L5 10L13 1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-[#ececec] mb-2">You&apos;re in.</h3>
            <p className="text-[#888888]">We&apos;ll reach out when your spot opens up.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl md:text-3xl font-serif text-[#ececec] mb-2">Get Early Access</h3>
            <p className="text-[#888888] text-sm mb-8">
              Free site audit on signup. We&apos;ll show you every SEO issue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-xs text-[#888888] font-mono uppercase tracking-wider mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#22c55e]/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="website" className="text-xs text-[#888888] font-mono uppercase tracking-wider mb-2 block">
                  Website URL
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#22c55e]/50 transition-colors"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-[#000000] font-medium py-6 rounded-full text-base mt-4"
              >
                {loading ? "Submitting..." : "Get Free Audit →"}
              </Button>
            </form>

            <p className="text-[#555555] text-xs text-center mt-6 font-mono">
              No spam. No credit card. Just your SEO report.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
