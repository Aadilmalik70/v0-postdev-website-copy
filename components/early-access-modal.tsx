"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Loader2, CheckCircle, Zap } from "lucide-react"
import { requestEarlyAccess } from "@/app/actions/request-early-access"

interface EarlyAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await requestEarlyAccess(formData)
      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-[#222222] rounded-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#555555] hover:text-[#ececec] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#22c55e] mx-auto mb-6" />
            <h3 className="font-serif text-3xl md:text-4xl text-[#ececec] mb-4">You're on the list</h3>
            <p className="text-[#888888] mb-2">We're onboarding teams who ship fast and hate slow workflows.</p>
            <p className="text-[#888888] mb-8">Keep an eye on your inbox — we'll reach out soon.</p>
            <Button onClick={onClose} className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] rounded-full px-8">
              Got it
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#ff3b30]" />
                <span className="text-[#ff3b30] text-sm font-mono uppercase tracking-wider">Only a few seats left</span>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl text-[#ececec] mb-4">Apply for Early Access</h3>
              <p className="text-[#888888] text-lg">Because soon, this won't be optional — it will be expected.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-[#888888] mb-2 font-mono">
                    Name <span className="text-[#ff3b30]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3.5 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-[#888888] mb-2 font-mono">
                    Work Email <span className="text-[#ff3b30]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3.5 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm text-[#888888] mb-2 font-mono">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3.5 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm text-[#888888] mb-2 font-mono">
                    Role <span className="text-[#ff3b30]">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3.5 text-[#ececec] focus:outline-none focus:border-[#ff3b30] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="text-[#555555]">
                      Select your role
                    </option>
                    <option value="founder">Founder / Product Leader</option>
                    <option value="engineer">Engineer</option>
                    <option value="agency">Agency / Studio</option>
                    <option value="designer">Designer</option>
                    <option value="cto">CTO / Engineering Lead</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Team Size */}
              <div>
                <label htmlFor="teamSize" className="block text-sm text-[#888888] mb-2 font-mono">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3.5 text-[#ececec] focus:outline-none focus:border-[#ff3b30] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select team size</option>
                  <option value="solo">Solo / Freelancer</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-20">6-20 people</option>
                  <option value="21-50">21-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-[#888888] mb-2 font-mono">
                  Are you still okay writing UI from scratch?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3.5 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors resize-none"
                  placeholder="Tell us about your frontend workflow pain..."
                />
              </div>

              {error && <p className="text-[#ff3b30] text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium py-7 text-base rounded-full transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Apply for Early Access"
                )}
              </Button>

              <p className="text-xs text-[#555555] text-center">
                Spots are disappearing — the ones who move first get the edge.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
