import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, supplier, supplier_addr, hirer, hirer_contact, hirer_phone, hirer_email, hire_type, hire_type_other, site_name, site_address, hire_start, hire_end, items, special_conditions } = body

    if (!id) {
      return NextResponse.json({ error: "Missing EHS id" }, { status: 400 })
    }

    const payload: Record<string, any> = {
      id,
      status: status || "New",
      supplier: supplier || "",
      supplier_addr: supplier_addr || "",
      hirer: hirer || "",
      hirer_contact: hirer_contact || "",
      hirer_phone: hirer_phone || "",
      hirer_email: hirer_email || "",
      hire_type: hire_type || "",
      hire_type_other: hire_type_other || "",
      site_name: site_name || "",
      site_address: site_address || "",
      hire_start: hire_start || "",
      hire_end: hire_end || "",
      items: items || [],
      special_conditions: special_conditions || "",
    }

    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    const authKey = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    if (!authKey) {
      return NextResponse.json({ error: "No Supabase key" }, { status: 500 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/ehs_register`, {
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
      if (res.status === 409) {
        const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/ehs_register`, {
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
