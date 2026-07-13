import { createClient } from '@supabase/supabase-js'

export async function POST() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fntqwckvrdbemjadcpcz.supabase.co"
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""

  if (!SERVICE_KEY) {
    return Response.json({ error: "No service key available" })
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY)

  const { error } = await sb.rpc('exec_sql', {
    query: `
      CREATE TABLE IF NOT EXISTS ehs_register (
        id BIGINT PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        status TEXT DEFAULT 'New',
        supplier TEXT DEFAULT '',
        supplier_addr TEXT DEFAULT '',
        hirer TEXT DEFAULT '',
        hirer_contact TEXT DEFAULT '',
        hirer_phone TEXT DEFAULT '',
        hirer_email TEXT DEFAULT '',
        hirer_addr TEXT DEFAULT '',
        guarantor_name TEXT DEFAULT '',
        guarantor_addr TEXT DEFAULT '',
        hire_type TEXT DEFAULT '',
        hire_type_other TEXT DEFAULT '',
        site_name TEXT DEFAULT '',
        site_address TEXT DEFAULT '',
        invoicing TEXT DEFAULT '',
        payment_terms TEXT DEFAULT '',
        credit_limit TEXT DEFAULT '',
        hire_start TEXT DEFAULT '',
        hire_end TEXT DEFAULT '',
        items JSONB DEFAULT '[]'::jsonb,
        responsibilities JSONB DEFAULT '[]'::jsonb,
        special_conditions TEXT DEFAULT ''
      );
    `
  })

  if (error) {
    return Response.json({ error: error.message })
  }

  return Response.json({ ok: true, message: "ehs_register table created" })
}
