// Migration: Add missing columns to quote_register table
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from "next/server"

export async function GET() {
  const results: string[] = []
  
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fntqwckvrdbemjadcpcz.supabase.co"
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  
  if (!SERVICE_KEY) {
    return NextResponse.json({ error: "No service key" }, { status: 500 })
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY)
  
  // Try to add columns one at a time using raw SQL
  const statements = [
    `ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New'`,
    `ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS customer_contact TEXT DEFAULT ''`,
    `ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS delivery TEXT DEFAULT 'FOB Paget QLD Depot'`,
    `ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS hire_from TEXT DEFAULT ''`,
    `ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS hire_to TEXT DEFAULT ''`,
    `ALTER TABLE quote_register ADD COLUMN IF NOT EXISTS payment_terms TEXT DEFAULT 'Payment: 100% prior to delivery / 30 days from invoice (subject to approved credit terms).'`,
  ]

  for (const sql of statements) {
    try {
      const { error } = await sb.rpc('exec_sql', { query: sql })
      if (error) {
        results.push(`FAIL: ${sql.substring(0, 80)}... -> ${error.message}`)
      } else {
        results.push(`OK: ${sql.substring(0, 80)}...`)
      }
    } catch (e: any) {
      results.push(`ERROR: ${sql.substring(0, 80)}... -> ${e.message}`)
    }
  }

  return NextResponse.json({ results })
}
