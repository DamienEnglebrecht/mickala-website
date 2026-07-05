import { NextResponse } from 'next/server'

const supabaseUrl = 'https://fntqwckvrdbemjadcpcz.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''

export async function POST(req: Request) {
  try {
    const { page, visitor, email } = await req.json()
    if (!page) return NextResponse.json({ error: 'no page' }, { status: 400 })

    // Get IP from request headers
    const forwarded = req.headers.get('x-forwarded-for') || ''
    const ip = forwarded.split(',')[0]?.trim() || req.headers.get('x-real-ip') || ''

    const res = await fetch(`${supabaseUrl}/rest/v1/doc_tracking`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        page,
        visitor: visitor || 'Guest',
        email: email || '',
        ip: ip || '',
        timestamp: new Date().toISOString()
      })
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
