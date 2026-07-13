import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://fntqwckvrdbemjadcpcz.supabase.co"

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json()
    
    // Simple secret check
    if (secret !== "create-ehs-table-2024") {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    if (!serviceKey) {
      return NextResponse.json({ error: "No service key" }, { status: 500 })
    }

    // First check if table exists
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/ehs_register?select=id&limit=1`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    })

    if (checkRes.ok) {
      return NextResponse.json({ message: "Table ehs_register already exists" })
    }

    // Table doesn't exist - we can't create it via REST API directly
    // Instead, we'll try setting up a migration
    // The simplest approach is to try inserting a dummy row with Prefer: resolution=merge-duplicates
    // which might trigger an auto-create (doesn't work for DDL)

    // Since we can't create the table via REST API, we need to use the Supabase management API
    // with a personal access token. We'll provide guidance instead.

    return NextResponse.json({
      error: "Table does not exist and cannot be created via REST API.",
      instructions: "Please run the following SQL in the Supabase SQL Editor:\n\n" +
        "CREATE TABLE IF NOT EXISTS public.ehs_register (\n" +
        "  id BIGINT PRIMARY KEY,\n" +
        "  status TEXT DEFAULT 'New',\n" +
        "  supplier TEXT DEFAULT '',\n" +
        "  supplier_addr TEXT DEFAULT '',\n" +
        "  hirer TEXT DEFAULT '',\n" +
        "  hirer_contact TEXT DEFAULT '',\n" +
        "  hirer_phone TEXT DEFAULT '',\n" +
        "  hirer_email TEXT DEFAULT '',\n" +
        "  hire_type TEXT DEFAULT '',\n" +
        "  hire_type_other TEXT DEFAULT '',\n" +
        "  site_name TEXT DEFAULT '',\n" +
        "  site_address TEXT DEFAULT '',\n" +
        "  hire_start TEXT DEFAULT '',\n" +
        "  hire_end TEXT DEFAULT '',\n" +
        "  items JSONB DEFAULT '[]',\n" +
        "  special_conditions TEXT DEFAULT '',\n" +
        "  created_at TIMESTAMPTZ DEFAULT NOW()\n" +
        ");\n\n" +
        "ALTER TABLE public.ehs_register ENABLE ROW LEVEL SECURITY;\n" +
        "GRANT ALL ON public.ehs_register TO anon, authenticated, service_role;"
    }, { status: 404 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
