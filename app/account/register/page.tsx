"use client"

import { Suspense } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Lazy-load supabase only when user submits (avoids build-time env check)
    const { createClient } = await import("@/lib/supabase/client")
    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { company_name: company } },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("customers").insert({
        user_id: data.user.id,
        company_name: company,
        phone,
      })
    }

    setLoading(false)
    router.push("/account/login?registered=true")
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email *</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="you@company.com" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password *</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="Minimum 6 characters" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="Your company name" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="Mobile or office number" />
      </div>
      <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  )
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-tight">Register</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create a Mickala account to order parts and track shipments.</p>
        </div>
        <div className="mt-8">
          <Suspense fallback={<div className="flex justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
