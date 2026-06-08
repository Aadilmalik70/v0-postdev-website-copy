"use server"

interface EarlyAccessData {
  email: string
  website?: string
}

export async function submitEarlyAccess(data: EarlyAccessData) {
  const { email, website } = data

  if (!email) {
    return { success: false, error: "Email is required." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  // For now, log to console. Replace with your preferred storage:
  // - Supabase table
  // - Google Sheets API
  // - Resend/Mailchimp
  console.log(`[Early Access] ${email} — ${website || "no site"}`)

  return { success: true }
}
