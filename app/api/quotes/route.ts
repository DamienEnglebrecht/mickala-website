import { NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const limit = url.searchParams.get("limit") || "50"
    const offset = url.searchParams.get("offset") || "0"
    const sortBy = url.searchParams.get("sort") || "created_at"
    const order = url.searchParams.get("order") || "desc"

    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    const authKey = serviceKey || anonKey
    if (!authKey) {
      return NextResponse.json({ error: "No Supabase key configured" }, { status: 500 })
    }

    // Also include status field in the response
      const res = await fetch(
      `${SUPABASE_URL}/rest/v1/quote_register?select=*&order=${sortBy}.${order}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          apikey: authKey,
          Authorization: `Bearer ${authKey}`,
        },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
