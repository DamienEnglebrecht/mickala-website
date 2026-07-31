import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

// Ensure the site_assessments table exists (idempotent)
async function ensureTable(authKey: string): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: authKey,
        Authorization: "Bearer " + authKey,
      },
      body: JSON.stringify({
        query: `
          CREATE TABLE IF NOT EXISTS site_assessments (
            id BIGSERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT DEFAULT '',
            company TEXT DEFAULT '',
            business_type TEXT DEFAULT 'corporate',
            site_name TEXT DEFAULT '',
            dig_fleets NUMERIC DEFAULT 0,
            sump_trucks NUMERIC DEFAULT 0,
            dozers NUMERIC DEFAULT 0,
            dumps NUMERIC DEFAULT 0,
            other_towers NUMERIC DEFAULT 0,
            mickala_towers NUMERIC DEFAULT 0,
            competitor_towers NUMERIC DEFAULT 0,
            offset_towers NUMERIC DEFAULT 0,
            annual_savings NUMERIC DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW()
          );
        `,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

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

    // Ensure the table exists (best-effort)
    await ensureTable(authKey)

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: (phone || "").trim(),
      company: (company || "").trim(),
      business_type: (businessType || "corporate").trim(),
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
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_assessments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: authKey,
        Authorization: "Bearer " + authKey,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json({ error: errText }, { status: res.status })
    }

    const created = await res.json()
    const row = Array.isArray(created) ? created[0] : created

    console.log(`✅ Site assessment lead saved: ${row?.id ?? "?"} (${name.trim()}, ${email.trim()})`)

    return NextResponse.json({
      success: true,
      id: row?.id ?? null,
      message: "Thanks! One of our lighting specialists will be in touch to discuss options.",
    })
  } catch (err: any) {
    console.error("Error saving site assessment lead:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
