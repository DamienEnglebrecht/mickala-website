// API route to create the quote_register table
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  
  const { error } = await sb.rpc('exec_sql', {
    query: `
      CREATE TABLE IF NOT EXISTS quote_register (
        id BIGINT PRIMARY KEY,
        customer TEXT,
        date TEXT,
        quote_type TEXT,
        prepared_by TEXT DEFAULT '',
        items JSONB DEFAULT '[]'::jsonb,
        total NUMERIC DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  })
  
  if (error) {
    // Try direct SQL instead
    const { error: sqlError } = await sb.from('_sql').insert({ query: `
      CREATE TABLE IF NOT EXISTS quote_register (
        id BIGINT PRIMARY KEY,
        customer TEXT,
        date TEXT,
        quote_type TEXT,
        prepared_by TEXT DEFAULT '',
        items JSONB DEFAULT '[]'::jsonb,
        total NUMERIC DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    ` }).select()
    
    return Response.json({ error: sqlError || 'done' })
  }
  
  return Response.json({ ok: true })
}
