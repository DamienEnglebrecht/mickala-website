import { NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function GET() {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    
    if (!serviceKey) {
      return NextResponse.json({ error: "No service key configured" }, { status: 500 })
    }

    // Add status column via Supabase PATCH
    const res = await fetch(SUPABASE_URL + "/rest/v1/quote_register", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceKey,
        "Authorization": "Bearer " + serviceKey,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ status: "New" }),
    })

    if (res.ok) {
      return NextResponse.json({ ok: true, message: "Status column exists or was created" })
    }

    const errText = await res.text()
    
    if (errText.includes("Could not find the 'status' column")) {
      // Column doesn't exist - can't create it via REST API
      // Need manual SQL: ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New'
      return NextResponse.json({ 
        error: "Column does not exist",
        fix: "Run in Supabase SQL Editor: ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New';"
      }, { status: 400 })
    }

    return NextResponse.json({ error: errText }, { status: 500 })
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
