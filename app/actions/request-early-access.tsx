"use server"

import nodemailer from "nodemailer"

interface EarlyAccessData {
  name: string
  email: string
  company: string
  role: string
  teamSize: string
  message: string
}

export async function requestEarlyAccess(data: EarlyAccessData) {
  const { name, email, company, role, teamSize, message } = data

  // Validate required fields
  if (!name || !email || !role) {
    return { success: false, error: "Please fill in all required fields." }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  try {
    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Format the email content
    const htmlContent = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ff3b30; font-size: 24px; margin-bottom: 20px;">New Early Access Request</h1>
        
        <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin: 0 0 15px 0;">Contact Details</h2>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Company:</strong> ${company || "Not provided"}</p>
          <p style="margin: 8px 0;"><strong>Role:</strong> ${role}</p>
          <p style="margin: 8px 0;"><strong>Team Size:</strong> ${teamSize || "Not provided"}</p>
        </div>

        ${
          message
            ? `
        <div style="background: #f5f5f5; border-radius: 8px; padding: 20px;">
          <h2 style="color: #333; font-size: 18px; margin: 0 0 15px 0;">Message</h2>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        `
            : ""
        }

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="color: #888; font-size: 12px;">
          Sent from POSTDEV Early Access Form<br>
          ${new Date().toLocaleString()}
        </p>
      </div>
    `

    const textContent = `
New Early Access Request for POSTDEV

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Role: ${role}
Team Size: ${teamSize || "Not provided"}

${message ? `Message:\n${message}` : ""}

---
Sent: ${new Date().toLocaleString()}
    `

    // Send email
    await transporter.sendMail({
      from: `"POSTDEV" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: email, // Reply goes to the requester
      subject: `🚀 New Early Access Request: ${name} (${company || "Individual"})`,
      text: textContent,
      html: htmlContent,
    })

    return { success: true }
  } catch (error) {
    console.error("Email error:", error)
    return { success: false, error: "Failed to submit request. Please try again." }
  }
}
