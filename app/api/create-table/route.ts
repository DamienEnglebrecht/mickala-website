import { createClient } from '@supabase/supabase-js'
import { NextResponse } from "next/server"

export async function POST() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fntqwckvrdbemjadcpcz.supabase.co"
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""

  if (!SERVICE_KEY) return NextResponse.json({ error: "No key" }, { status: 500 })

  const sb = createClient(SUPABASE_URL, SERVICE_KEY)

  // Try to insert a test record to force PostgREST to create the schema
  // PostgREST can create tables if the schema is dynamic
  const { error: insertError } = await sb
    .from('credit_applications')
    .insert({ entity_type: '__test__', trading_name: '__test__' })
    .select()

  if (insertError) {
    // Table probably doesn't exist - try creating via schema endpoint
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_KEY,
        "Authorization": `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({
        table: "credit_applications",
        schema: [
          { name: "id", type: "bigint", primaryKey: true },
          { name: "created_at", type: "timestamptz" },
          { name: "entity_type", type: "text" },
          { name: "trading_name", type: "text" },
          { name: "email", type: "text" },
          { name: "signatory_name", type: "text" },
          { name: "status", type: "text" },
        ]
      })
    })
    const text = await res.text()
    return NextResponse.json({ method: "schema_api", status: res.status, body: text.substring(0, 500) })
  }

  return NextResponse.json({ ok: true, message: "Table exists" })
}
