"use server"

import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"

interface EarlyAccessData {
  email: string
  website?: string
}

interface Submission {
  email: string
  website: string | null
  timestamp: string
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

  // 1. Save data to a local JSON file (submissions.json)
  try {
    const DATA_DIR = path.join(process.cwd(), "data")
    const DATA_FILE = path.join(DATA_DIR, "submissions.json")

    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }

    let submissions: Submission[] = []
    if (fs.existsSync(DATA_FILE)) {
      try {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8")
        submissions = JSON.parse(fileContent)
      } catch (err) {
        console.error("Failed to parse submissions.json, starting fresh", err)
      }
    }

    submissions.push({
      email,
      website: website || null,
      timestamp: new Date().toISOString(),
    })

    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8")
    console.log(`[Early Access Saved] ${email} — ${website || "no site"}`)
  } catch (err) {
    console.error("Failed to save submission to file:", err)
    // We can continue to try sending the email even if saving to file failed
  }

  // 2. Send email notification via Gmail SMTP
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPass = process.env.GMAIL_APP_PASSWORD
  const receiverEmail = process.env.RECEIVER_EMAIL

  const isConfigured =
    gmailUser &&
    gmailUser !== "your-email@gmail.com" &&
    gmailAppPass &&
    gmailAppPass !== "your-app-password" &&
    receiverEmail &&
    receiverEmail !== "receiver-email@gmail.com"

  if (!isConfigured) {
    console.warn("[Early Access] Gmail SMTP credentials not fully configured in environment variables. Skipping email sending.")
    return { success: true, emailSent: false, warning: "Email credentials not configured." }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPass,
      },
    })

    const mailOptions = {
      from: `"SERP Strategists" <${gmailUser}>`,
      to: receiverEmail,
      subject: `[SERP Strategists] New Early Access Lead: ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #111827; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Early Access Request</h2>
          <p style="font-size: 16px; color: #374151;">A user has submitted interest in early access on the website.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 120px;">Email:</td>
              <td style="padding: 8px 0; color: #111827;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Website URL:</td>
              <td style="padding: 8px 0; color: #111827;">${
                website
                  ? `<a href="${website}" style="color: #00d084; text-decoration: none;">${website}</a>`
                  : "Not provided"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Submitted At:</td>
              <td style="padding: 8px 0; color: #111827;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin-top: 30px;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">This is an automated notification from the SERP Strategists website.</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`[Early Access Email Sent] Notification sent to ${receiverEmail}`)
    return { success: true, emailSent: true }
  } catch (err) {
    console.error("[Early Access Email Error] Failed to send notification email:", err)
    return { success: true, emailSent: false, error: "Failed to send email." }
  }
}
