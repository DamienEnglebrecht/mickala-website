import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"
const ALLOWED_DOMAIN = "mickala.com.au"

// Allowed staff emails (whitelist)
const ALLOWED_EMAILS = [
  "damien@mickala.com.au",
  "debbie@mickala.com.au",
  "letisha@mickala.com.au",
  "vicki@mickala.com.au",
]

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

    const normalised = email.trim().toLowerCase()

    // Enforce domain
    if (!normalised.endsWith("@" + ALLOWED_DOMAIN)) {
      return NextResponse.json({ error: "Access restricted to @mickala.com.au addresses" }, { status: 403 })
    }

    // Enforce whitelist
    if (!ALLOWED_EMAILS.includes(normalised)) {
      return NextResponse.json({ error: "This email address is not authorised. Contact Damien to request access." }, { status: 403 })
    }

    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    const resendKey = process.env.RESEND_API_KEY || ""

    if (!serviceKey) return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    if (!resendKey) return NextResponse.json({ error: "Email service not configured" }, { status: 500 })

    // Step 1: Generate magic link via Supabase admin API (doesn't send email — just returns the link)
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/generate_link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        type: "magiclink",
        email: normalised,
        options: {
          redirect_to: "https://mickala-website.vercel.app/auth/callback",
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("Supabase generate_link error:", err)
      return NextResponse.json({ error: "Failed to generate login link" }, { status: 500 })
    }

    const data = await res.json()
    const actionLink = data.action_link || ""

    if (!actionLink) {
      return NextResponse.json({ error: "No link generated" }, { status: 500 })
    }

    // Step 2: Send the email via Resend HTTP API directly
    const firstName = normalised.split("@")[0].charAt(0).toUpperCase() + normalised.split("@")[0].slice(1)

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Mickala Group <noreply@resend.dev>",
        to: [normalised],
        subject: "Your Mickala sign-in link",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <img src="https://mickala-website.vercel.app/mickala-logo.png" alt="Mickala Group" style="height: 50px; margin-bottom: 30px;" />
            <h2 style="color: #1a1a1a; margin-bottom: 16px;">Sign in to Mickala Staff Portal</h2>
            <p style="color: #444; font-size: 15px; line-height: 1.6;">Hi ${firstName},</p>
            <p style="color: #444; font-size: 15px; line-height: 1.6;">Click the button below to sign in. This link expires in 1 hour and can only be used once.</p>
            <a href="${actionLink}" style="display: inline-block; background: #E31E24; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 15px; margin: 24px 0;">Sign in to Staff Portal</a>
            <p style="color: #888; font-size: 13px; margin-top: 32px;">If you didn't request this email, you can safely ignore it.</p>
            <p style="color: #888; font-size: 13px;">— Mickala Group</p>
          </div>
        `,
      }),
    })

    if (!emailRes.ok) {
      const emailErr = await emailRes.text()
      console.error("Resend send error:", emailErr)
      return NextResponse.json({ error: "Failed to send login email" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
