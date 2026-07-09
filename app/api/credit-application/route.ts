import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const payload: Record<string, any> = {
      entity_type: body.entityType || "",
      trading_name: body.tradingName || "",
      abn: body.abn || "",
      acn: body.acn || "",
      registered_address: body.registeredAddress || "",
      postal_address: body.postalAddress || "",
      phone: body.phone || "",
      email: body.email || "",
      website: body.website || "",
      business_type: body.businessType || "",
      years_established: body.yearsEstablished || "",
      directors: JSON.stringify(body.directors || []),
      partners: JSON.stringify(body.partners || []),
      trust_name: body.trustName || "",
      trust_abn: body.trustAbn || "",
      trust_acn: body.trustAcn || "",
      trust_afsl: body.trustAfsl || "",
      bank_name: body.bankName || "",
      bank_bsb: body.bankBsb || "",
      bank_account: body.bankAccount || "",
      bank_account_name: body.bankAccountName || "",
      credit_amount: body.creditAmount || "",
      credit_terms: body.creditTerms || "",
      trade_refs: JSON.stringify(body.tradeRefs || []),
      guarantors: JSON.stringify(body.guarantors || []),
      signatory_name: body.signatoryName || "",
      signatory_title: body.signatoryTitle || "",
      signatory_date: body.signatoryDate || "",
      agreed_to_terms: body.agreedToTerms || false,
      id_type: body.idType || "",
      id_number: body.idNumber || "",
      id_expiry: body.idExpiry || "",
      verified: body.verified || false,
      mickala_name: body.mickalaName || "",
      mickala_title: body.mickalaTitle || "",
      mickala_date: body.mickalaDate || "",
      mickala_notes: body.mickalaNotes || "",
      status: "New",
    }

    const authKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""

    if (!authKey) {
      return NextResponse.json({ error: "No Supabase key" }, { status: 500 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/credit_applications`, {
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
      return NextResponse.json({ error: errText }, { status: res.status })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
