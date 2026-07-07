"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { submitEarlyAccess } from "@/app/actions"

interface EarlyAccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  submitText?: string
  leadSource?: string
  onSuccess?: () => void
}

export function EarlyAccessModal({
  isOpen,
  onClose,
  title = "Deploy your operator",
  description = "Your free growth audit runs on signup — every opportunity ranked by impact, with the first actions queued for your approval.",
  submitText = "Get Free Audit →",
  leadSource = "early_access_modal",
  onSuccess,
}: EarlyAccessModalProps) {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await submitEarlyAccess({ email, website })
      if (res && res.success) {
        setSubmitted(true)
        if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
          ;(window as any).gtag("event", "generate_lead", {
            lead_source: leadSource,
          })
        }
        if (onSuccess) {
          onSuccess()
        }
      }
    } catch {
      // silently fail for now
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-card border border-line rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="20" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6L5 10L13 1" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink mb-2">You&apos;re in.</h3>
            <p className="text-neutral-600">We&apos;ll reach out when your spot opens up.</p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-2">{title}</h3>
            <p className="text-neutral-600 text-sm mb-8">
              {description}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-xs text-neutral-600 font-mono uppercase tracking-wider mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-paper border border-line rounded-xl px-4 py-3 text-ink placeholder:text-neutral-400 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal/15 transition-all"
                />
              </div>

              <div>
                <label htmlFor="website" className="text-xs text-neutral-600 font-mono uppercase tracking-wider mb-2 block">
                  Website URL
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full bg-paper border border-line rounded-xl px-4 py-3 text-ink placeholder:text-neutral-400 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal/15 transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full btn-ink justify-center w-full h-12 text-sm mt-4"
              >
                {loading ? "Submitting..." : submitText}
              </Button>
            </form>

            <p className="text-neutral-400 text-xs text-center mt-6 font-mono">
              No spam. No credit card. Just your SEO report.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
