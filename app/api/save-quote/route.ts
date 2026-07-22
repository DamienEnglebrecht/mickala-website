import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, customer, date, quote_type, prepared_by, items, total, status, customer_contact } = body

    if (!id) {
      return NextResponse.json({ error: "Missing quote id" }, { status: 400 })
    }

    // The frontend now sends items as { line_items: [...], _meta: { hire_from, hire_to, payment_terms, delivery } }
    // in the 'items' field. We pass it through as-is to the JSONB column.
    // We also support a flat array (old format) by wrapping it.
    let itemsPayload = items
    if (Array.isArray(items)) {
      // Old format: plain array of line items — wrap it
      itemsPayload = { line_items: items, _meta: { hire_from: "", hire_to: "", payment_terms: "", delivery: "" } }
    }

    const payload: Record<string, any> = {
      id,
      customer: customer || "",
      date: date || "",
      quote_type: quote_type || "",
      prepared_by: prepared_by || "",
      items: itemsPayload,
      total: total || 0,
      status: status || "New",
      customer_contact: customer_contact || "",
    }

    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    const authKey = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    if (!authKey) {
      return NextResponse.json({ error: "No Supabase key" }, { status: 500 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/quote_register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: authKey,
        Authorization: "Bearer " + authKey,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      // If 409 conflict, try UPSERT instead
      if (res.status === 409) {
        const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/quote_register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: authKey,
            Authorization: "Bearer " + authKey,
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify(payload),
        })
        if (!upsertRes.ok) {
          const upsertErr = await upsertRes.text()
          return NextResponse.json({ error: upsertErr }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: errText }, { status: res.status })
      }
    }

    return NextResponse.json({ success: true, id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
