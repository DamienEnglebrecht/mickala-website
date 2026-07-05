import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
    }

    const validStatuses = ["New", "Sent", "Following Up", "Won", "Lost"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    const authKey = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    if (!authKey) {
      return NextResponse.json({ error: "No Supabase key" }, { status: 500 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/quote_register?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: authKey,
        Authorization: "Bearer " + authKey,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ status }),
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json({ error: errText }, { status: res.status })
    }

    return NextResponse.json({ success: true, id, status })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
