// Initialize Supabase table for EHS
// Run: npx tsx scripts/init-ehs-table.ts
// OR: node scripts/init-ehs-table.mjs

const fs = await import('fs')
const { createClient } = await import('@supabase/supabase-js')

const envRaw = fs.readFileSync('.env', 'utf-8')
const env = {}
envRaw.split('\n').forEach(line => {
  const t = line.trim()
  if (!t || t.startsWith('#')) return
  const eq = t.indexOf('=')
  if (eq === -1) return
  env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim()
})

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

// Step 1: Try to create the exec_sql function (we'll try inserting it as a regular function)
// This requires a SQL function to exist already - chicken and egg

// Step 2: Alternative - use the supabase-js client to create via the management API
// We need a Supabase access token (PAT) from the dashboard, not the service role key

// Step 3: Create table by using a trick - create a table via supabase migrations
// Let's check if there's a supabase CLI or migrations setup

// Check for supabase directory
try {
  const supabaseDir = fs.readdirSync('./supabase')
  console.log('Supabase dir exists:', supabaseDir)
} catch {
  console.log('No supabase directory, will try creating migration files')
}

// Actually, the simplest approach: create the table using the postgres protocol
// Since we can't do that from here, let's try inserting into the table via the 
// service key with Prefer: resolution=merge-duplicates to create a row
// ** This won't work for DDL either **

// Let's try the most direct approach: use the supabase client to execute a function
// that we know exists. Let's check if there's any function that can create tables

console.log('Checking available extensions and functions...')

// Check if pg_catalog extension exposes functions
try {
  const { data, error } = await supabase.rpc('extensions', {})
  console.log('Extensions:', data, error)
} catch(e) {
  console.log('No extensions RPC:', e.message)
}

// Final approach: use a secure approach by executing SQL via a known function
// Some supabase projects have an exec_sql function already
// Let's try creating one using the REST API's INSERT method to the schema_migrations table
// That won't work either

console.log('\nAlternative approach: creating the table via a direct HTTPS call to the Supabase Management API')
console.log('This requires a personal access token. Trying the database/query endpoint...')

// Try using the Supabase Management API with the anon key (this probably won't work)
try {
  const res = await fetch(`https://api.supabase.com/v1/projects/fntqwckvrdbemjadcpcz/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({
      query: `CREATE TABLE IF NOT EXISTS public.ehs_register (
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
      
      ALTER TABLE public.ehs_register ENABLE ROW LEVEL SECURITY;
      GRANT ALL ON public.ehs_register TO anon, authenticated, service_role;`
    })
  })
  console.log('Status:', res.status)
  const text = await res.text()
  console.log('Response:', text.substring(0, 1000))
  
  if (res.ok) {
    console.log('\n✅ Table created successfully!')
    process.exit(0)
  }
} catch(e) {
  console.log('Management API failed:', e.message)
}

console.log('\n❌ Could not create table automatically.')
console.log('Please run the following SQL in the Supabase SQL Editor (https://supabase.com/dashboard/project/fntqwckvrdbemjadcpcz/sql/new):\n')
console.log(`CREATE TABLE IF NOT EXISTS public.ehs_register (
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

ALTER TABLE public.ehs_register ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.ehs_register TO anon, authenticated, service_role;`)
