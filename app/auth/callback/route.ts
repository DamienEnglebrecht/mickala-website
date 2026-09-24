import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)

  const code = searchParams.get("code")
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/documents"

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  if (token_hash && type) {
    // Magic link / OTP flow
    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    })

    if (!error) {
      // Redirect to documents portal after successful auth
      return NextResponse.redirect(`${origin}/documents`)
    }
  }

  if (code) {
    // OAuth / PKCE flow
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/documents`)
    }
  }

  // Auth failed — redirect to login page with error
  console.error("Auth callback failed — no valid token_hash or code")
  return NextResponse.redirect(`${origin}/documents?error=auth_failed`)
}
