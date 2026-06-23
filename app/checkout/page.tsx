"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type CartItem = {
  id: string
  part_id: string
  quantity: number
  parts: {
    id: string
    name: string
    sku: string
    price: number
  }
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notes, setNotes] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postcode, setPostcode] = useState("")
  const [customerId, setCustomerId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadCheckout()
  }, [])

  async function loadCheckout() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userData }: any = await supabase.auth.getUser()
    if (!userData?.user) {
      router.push("/account/login?redirect=/checkout")
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: customer }: any = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", userData.user.id)
      .single()

    if (!customer) {
      setLoading(false)
      return
    }

    setCustomerId(customer.id)
    setCompany(customer.company_name || "")
    setPhone(customer.phone || "")
    setAddress(customer.address || "")
    setCity(customer.city || "")
    setState(customer.state || "")
    setPostcode(customer.postcode || "")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data }: any = await supabase
      .from("cart_items")
      .select("id, part_id, quantity, parts(*)")
      .eq("customer_id", customer.id)

    if (!data || data.length === 0) {
      router.push("/cart")
      return
    }

    setItems(data)
    setLoading(false)
  }

  async function placeOrder() {
    setSubmitting(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAny: any = supabase

    const shippingAddr = [address, city, state, postcode].filter(Boolean).join(", ")
    const total = items.reduce((sum, item) => sum + item.parts.price * item.quantity, 0)

    // Create order
    const { data: order } = await supabaseAny
      .from("orders")
      .insert({
        customer_id: customerId,
        status: "pending",
        total_amount: total,
        shipping_address: shippingAddr,
        notes,
      })
      .select()
      .single()

    if (!order) {
      setSubmitting(false)
      return
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      part_id: item.part_id,
      quantity: item.quantity,
      unit_price: item.parts.price,
      total_price: item.parts.price * item.quantity,
    }))

    await supabaseAny.from("order_items").insert(orderItems)

    // Clear cart
    await supabaseAny.from("cart_items").delete().eq("customer_id", customerId)

    setSubmitting(false)
    router.push(`/account/orders?success=true`)
  }

  const total = items.reduce((sum, item) => sum + item.parts.price * item.quantity, 0)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Shipping Details */}
          <div>
            <h2 className="font-heading text-lg font-bold uppercase tracking-tight">Shipping Details</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">State</label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Postcode</label>
                  <input
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="Postcode"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Order Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Any special instructions?"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="font-heading text-lg font-bold uppercase tracking-tight">Order Summary</h2>
            <div className="mt-4 rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{item.parts.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="ml-4 text-sm font-bold text-foreground">
                      ${(item.parts.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Total</span>
                  <span className="font-heading text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">GST included. Shipping will be confirmed via email.</p>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={submitting}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
