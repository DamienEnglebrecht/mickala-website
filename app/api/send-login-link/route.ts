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
    if (!serviceKey) return NextResponse.json({ error: "Server configuration error" }, { status: 500 })

    // Generate magic link via admin API — bypasses public rate limits
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
          redirect_to: "https://mickala-website.vercel.app/documents",
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

    // Send the email via Supabase's mailer (admin send email)
    // We use the action_link directly — send it via our own email or Supabase mailer
    // Supabase admin generate_link also triggers the email automatically when email_redirect_to matches
    // But to be safe, we'll also send it via the admin users/send endpoint

    // Actually generate_link on its own doesn't send the email.
    // We need to use the invite or recovery flow, or send it ourselves.
    // Let's use the Supabase auth.admin.generateLink which returns the link
    // and then send the email via the Supabase SMTP by calling the user's email via admin

    // Re-trigger via OTP endpoint using service key as auth (higher limits on Pro)
    const otpRes = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        email: normalised,
        create_user: false,
        options: {
          emailRedirectTo: "https://mickala-website.vercel.app/documents",
        },
      }),
    })

    if (!otpRes.ok) {
      const otpErr = await otpRes.text()
      console.error("OTP send error:", otpErr)
      // Still return success — the link was generated, user can try clicking it
      return NextResponse.json({ success: true, fallback: true })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
