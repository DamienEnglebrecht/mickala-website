"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Package, ArrowRight, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type Order = {
  id: string
  status: string
  total_amount: number
  shipping_address: string | null
  notes: string | null
  created_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [user, setUser] = useState<any>(null)
  const searchParams = useSearchParams()
  const justPlaced = searchParams.get("success") === "true"
  const supabase = createClient()

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userData }: any = await supabase.auth.getUser()
    if (!userData?.user) {
      setLoading(false)
      return
    }
    setUser(userData.user)
    setEmail(userData.user.email || "")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: customer }: any = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", userData.user.id)
      .single()

    if (!customer) {
      setLoading(false)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data }: any = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false })

    setOrders(data || [])
    setLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-600",
    confirmed: "bg-blue-500/10 text-blue-600",
    processing: "bg-purple-500/10 text-purple-600",
    shipped: "bg-emerald-500/10 text-emerald-600",
    delivered: "bg-emerald-500/10 text-emerald-600",
    cancelled: "bg-red-500/10 text-red-600",
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <Package className="h-16 w-16 text-muted-foreground/30" />
        <h1 className="mt-4 font-heading text-2xl font-bold">My Orders</h1>
        <p className="mt-2 text-muted-foreground">Sign in to view your order history.</p>
        <Link
          href="/account/login?redirect=/account/orders"
          className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground uppercase tracking-wider transition-colors hover:bg-primary/90"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {justPlaced && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-600">
              Order placed successfully! We&apos;ll confirm shipping details via email.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">My Orders</h1>
            <p className="mt-1 text-sm text-muted-foreground">{email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Sign Out
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <Package className="h-16 w-16 text-muted-foreground/30" />
            <h2 className="mt-4 text-xl font-semibold">No orders yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Browse our parts catalog to place your first order.</p>
            <Link
              href="/parts"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground uppercase tracking-wider transition-colors hover:bg-primary/90"
            >
              Browse Parts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusColors[order.status] || "bg-secondary text-muted-foreground"}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-foreground">${order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
