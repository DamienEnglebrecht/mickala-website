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
      CREATE TABLE IF NOT EXISTS credit_applications (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        entity_type TEXT DEFAULT '',
        trading_name TEXT DEFAULT '',
        abn TEXT DEFAULT '',
        acn TEXT DEFAULT '',
        registered_address TEXT DEFAULT '',
        postal_address TEXT DEFAULT '',
        phone TEXT DEFAULT '',
        email TEXT DEFAULT '',
        website TEXT DEFAULT '',
        business_type TEXT DEFAULT '',
        years_established TEXT DEFAULT '',
        directors JSONB DEFAULT '[]'::jsonb,
        partners JSONB DEFAULT '[]'::jsonb,
        trust_name TEXT DEFAULT '',
        trust_abn TEXT DEFAULT '',
        trust_acn TEXT DEFAULT '',
        trust_afsl TEXT DEFAULT '',
        bank_name TEXT DEFAULT '',
        bank_bsb TEXT DEFAULT '',
        bank_account TEXT DEFAULT '',
        bank_account_name TEXT DEFAULT '',
        credit_amount TEXT DEFAULT '',
        credit_terms TEXT DEFAULT '',
        trade_refs JSONB DEFAULT '[]'::jsonb,
        guarantors JSONB DEFAULT '[]'::jsonb,
        signatory_name TEXT DEFAULT '',
        signatory_title TEXT DEFAULT '',
        signatory_date TEXT DEFAULT '',
        agreed_to_terms BOOLEAN DEFAULT FALSE,
        id_type TEXT DEFAULT '',
        id_number TEXT DEFAULT '',
        id_expiry TEXT DEFAULT '',
        verified BOOLEAN DEFAULT FALSE,
        mickala_name TEXT DEFAULT '',
        mickala_title TEXT DEFAULT '',
        mickala_date TEXT DEFAULT '',
        mickala_notes TEXT DEFAULT '',
        status TEXT DEFAULT 'New'
      );
    `
  })

  if (error) {
    return Response.json({ error: error.message })
  }

  return Response.json({ ok: true, message: "credit_applications table created" })
}
