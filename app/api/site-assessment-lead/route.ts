import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, businessType, assessment } = body

    if (!name || !email || !assessment) {
      return NextResponse.json(
        { error: "Name, email, and assessment are required" },
        { status: 400 }
      )
    }

    const serviceKey =
      process.env.SUPABASE_SERVICE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      ""
    const authKey = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    if (!authKey) {
      return NextResponse.json({ error: "No Supabase key configured" }, { status: 500 })
    }

    // Store the site assessment lead in the existing quote_register table.
    const id = Date.now()
    const payload = {
      id,
      customer: name.trim(),
      date: new Date().toISOString(),
      quote_type: "Site Assessment",
      prepared_by: "AI Site Assessment",
      customer_contact: `${email.trim()}${phone ? " / " + phone.trim() : ""}`,
      total: assessment.annualSavings ?? 0,
      status: "New",
      items: {
        line_items: [],
        _meta: {
          site_name: (assessment.siteName || "").trim(),
          dig_fleets: assessment.digFleets ?? 0,
          sump_trucks: assessment.sumpTrucks ?? 0,
          dozers: assessment.dozers ?? 0,
          dumps: assessment.dumps ?? 0,
          other_towers: assessment.other ?? 0,
          mickala_towers: assessment.mickalaTowers ?? 0,
          competitor_towers: assessment.competitorTowers ?? 0,
          offset_towers: assessment.offsetTowers ?? 0,
          annual_savings: assessment.annualSavings ?? 0,
          company: (company || "").trim(),
          business_type: (businessType || "corporate").trim(),
        },
      },
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
      // If 409 conflict (id taken), retry with a fresh id
      if (res.status === 409) {
        payload.id = Date.now() + Math.floor(Math.random() * 1000)
        const retry = await fetch(`${SUPABASE_URL}/rest/v1/quote_register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: authKey,
            Authorization: "Bearer " + authKey,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        })
        if (!retry.ok) {
          const retryErr = await retry.text()
          return NextResponse.json({ error: retryErr }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: errText }, { status: res.status })
      }
    }

    console.log(`✅ Site assessment lead saved (${name.trim()}, ${email.trim()})`)

    return NextResponse.json({
      success: true,
      message: "Thanks! One of our lighting specialists will be in touch to discuss options.",
    })
  } catch (err: any) {
    console.error("Error saving site assessment lead:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
