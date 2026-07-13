-- EHS Register Table Setup
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/fntqwckvrdbemjadcpcz/sql/new

CREATE TABLE IF NOT EXISTS public.ehs_register (
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
GRANT ALL ON public.ehs_register TO anon, authenticated, service_role;

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_ehs_register_status ON public.ehs_register(status);
CREATE INDEX IF NOT EXISTS idx_ehs_register_created_at ON public.ehs_register(created_at DESC);
