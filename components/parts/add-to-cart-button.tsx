"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type PartProps = {
  id: string
  slug: string
  name: string
  price: number
  unit: string
  stock_quantity: number
  min_order_qty: number
  [key: string]: unknown
}

export function AddToCartButton({ part }: { part: PartProps }) {
  const [quantity, setQuantity] = useState(part.min_order_qty)
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleAdd() {
    setLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userData }: any = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) {
      router.push(`/account/login?redirect=/parts/${part.slug}`)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: customer }: any = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (!customer) {
      setLoading(false)
      return
    }

    // Check if already in cart
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing }: any = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("customer_id", customer.id)
      .eq("part_id", part.id)
      .maybeSingle()

    if (existing) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("cart_items")
        .insert({ customer_id: customer.id, part_id: part.id, quantity })
    }

    setLoading(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground">Qty:</label>
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQuantity(Math.max(part.min_order_qty, quantity - 1))}
            className="px-3 py-2 text-sm transition-colors hover:bg-secondary"
            disabled={quantity <= part.min_order_qty}
          >
            -
          </button>
          <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(part.stock_quantity || 999, quantity + 1))}
            className="px-3 py-2 text-sm transition-colors hover:bg-secondary"
            disabled={quantity >= (part.stock_quantity || 999)}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={loading || part.stock_quantity === 0}
        className={`w-full rounded-xl px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-all ${
          added
            ? "bg-emerald-600 text-white"
            : part.stock_quantity === 0
              ? "bg-secondary text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
        }`}
      >
        {loading ? "Adding..." : added ? "✓ Added to cart" : "Add to cart"}
      </button>
    </div>
  )
}
