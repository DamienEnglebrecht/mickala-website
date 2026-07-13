// Create ehs_register table in Supabase
// Run: node scripts/create-ehs-table.mjs

const fs = await import('fs')
const { resolve } = await import('path')

// Read .env file manually
const envRaw = fs.readFileSync(resolve('.env'), 'utf-8')
const env = {}
envRaw.split('\n').forEach(line => {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return
  const eq = trimmed.indexOf('=')
  if (eq === -1) return
  env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
})

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Service key length:', serviceKey?.length)

// Try to create the table using Supabase's SQL execution endpoint
// Supabase has /rest/v1/rpc/ for functions, but for raw SQL we use the pg fetch API

// First method: Use the supabase-js client
const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

// Check if table exists
const { data, error } = await supabase.from('ehs_register').select('id').limit(1)
console.log('Check existing table:', error ? error.code : 'Table exists')

if (error && error.code === 'PGRST205') {
  console.log('Creating ehs_register table...')
  
  // Try using the Supabase Management API to run SQL
  // We'll use the /rest/v1/ with the service_role key which has direct table access
  // Actually, let's try creating via the REST API by writing to a PG function
  
  // Best approach: try to create the table by making a direct INSERT (PostgREST will auto-create if it doesn't exist? No it won't)
  
  // Use raw HTTP to the Supabase SQL endpoint (management API)
  // Check if we have access to the supabase dashboard API
  const projectRef = 'fntqwckvrdbemjadcpcz'
  
  // SQL to create the table
  const createTableSQL = `
CREATE TABLE IF NOT EXISTS ehs_register (
  id BIGINT PRIMARY KEY,
  status TEXT DEFAULT 'New',
  supplier TEXT DEFAULT '',
  supplier_addr TEXT DEFAULT '',
  hirer TEXT DEFAULT '',
  hirer_contact TEXT DEFAULT '',
  hirer_phone TEXT DEFAULT '',
  hirer_email TEXT DEFAULT '',
  hire_type TEXT DEFAULT '',
  hire_type_other TEXT DEFAULT '',
  site_name TEXT DEFAULT '',
  site_address TEXT DEFAULT '',
  hire_start TEXT DEFAULT '',
  hire_end TEXT DEFAULT '',
  items JSONB DEFAULT '[]',
  special_conditions TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ehs_register ENABLE ROW LEVEL SECURITY;

GRANT ALL ON ehs_register TO anon, authenticated, service_role;
`

  // Try the Supabase SQL endpoint (using the service role key for direct PostgREST)
  try {
    // Method 1: Use the /sql endpoint (Enterprise feature)
    const sqlRes = await fetch(`https://${projectRef}.supabase.co/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ query: createTableSQL })
    })
    console.log('SQL endpoint status:', sqlRes.status)
    const sqlText = await sqlRes.text()
    console.log('SQL response:', sqlText.substring(0, 500))
    
    if (sqlRes.ok) {
      console.log('Table created successfully via /sql endpoint!')
      process.exit(0)
    }
  } catch (e) {
    console.log('/sql endpoint failed:', e.message)
  }

  // Method 2: Try the pg_dump/rest API using the /rest/v1/ RPC
  try {
    // First create a function to execute SQL
    const createFuncSQL = `
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE query;
END;
$$;
`
    // Try to call exec_sql if it exists
    const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ query: createTableSQL })
    })
    console.log('RPC exec_sql status:', rpcRes.status)
    const rpcText = await rpcRes.text()
    console.log('RPC response:', rpcText.substring(0, 500))
    
    if (rpcRes.ok) {
      console.log('Table created successfully via RPC!')
      process.exit(0)
    }
  } catch (e) {
    console.log('RPC method failed:', e.message)
  }
  
  console.log('\n*** Could not create table via API. ***')
  console.log('Please run this SQL in the Supabase SQL Editor:')
  console.log('\n' + createTableSQL)
  
} else if (data) {
  console.log('Table ehs_register already exists!')
} else if (error) {
  console.error('Unexpected error:', error)
}
