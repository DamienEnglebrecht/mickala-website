import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.SUPABASE_SERVICE_KEY || ''

  try {
    const res = await fetch(
      'https://fntqwckvrdbemjadcpcz.supabase.co/rest/v1/doc_tracking?select=*&order=timestamp.desc',
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    )
    const data = await res.json()
    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch {
    return NextResponse.json([])
  }
}
