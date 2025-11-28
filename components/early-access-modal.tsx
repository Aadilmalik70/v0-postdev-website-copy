"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Loader2, CheckCircle } from "lucide-react"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-[#0a0a0a] border border-[#222222] rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
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
            <h3 className="font-serif text-3xl text-[#ececec] mb-4">You're on the list</h3>
            <p className="text-[#888888] mb-8">We'll reach out soon with next steps. Keep an eye on your inbox.</p>
            <Button onClick={onClose} className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] rounded-full px-8">
              Got it
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="font-serif text-3xl text-[#ececec] mb-2">Request Early Access</h3>
              <p className="text-[#888888] text-sm">Join the waitlist for teams who ship faster.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors"
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
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors"
                  placeholder="you@company.com"
                />
              </div>

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
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors"
                  placeholder="Your company"
                />
              </div>

              {/* Role */}
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
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3 text-[#ececec] focus:outline-none focus:border-[#ff3b30] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="text-[#555555]">
                    Select your role
                  </option>
                  <option value="founder">Founder / CEO</option>
                  <option value="engineering-lead">Engineering Lead / CTO</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="other">Other</option>
                </select>
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
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3 text-[#ececec] focus:outline-none focus:border-[#ff3b30] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select team size</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-20">6-20 people</option>
                  <option value="21-50">21-50 people</option>
                  <option value="51-200">51-200 people</option>
                  <option value="200+">200+ people</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm text-[#888888] mb-2 font-mono">
                  What excites you about POSTDEV?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-[#222222] rounded-lg px-4 py-3 text-[#ececec] placeholder:text-[#555555] focus:outline-none focus:border-[#ff3b30] transition-colors resize-none"
                  placeholder="Tell us about your workflow..."
                />
              </div>

              {error && <p className="text-[#ff3b30] text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-[#ececec] font-medium py-6 text-base rounded-full transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Access"
                )}
              </Button>

              <p className="text-xs text-[#555555] text-center">We respect your privacy. No spam, ever.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
