"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type CartItem = {
  id: string
  part_id: string
  quantity: number
  parts: {
    id: string
    name: string
    slug: string
    sku: string
    price: number
    unit: string
    image_url: string | null
    stock_quantity: number
  }
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadCart()
  }, [])

  async function loadCart() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }
    setUserId(user.id)

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data }: any = await supabase
      .from("cart_items")
      .select("id, part_id, quantity, parts(*)")
      .eq("customer_id", customer.id)

    setItems(data || [])
    setLoading(false)
  }

  async function updateQty(itemId: string, newQty: number) {
    if (newQty < 1) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("cart_items").update({ quantity: newQty }).eq("id", itemId)
    setItems(items.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i)))
  }

  async function removeItem(itemId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("cart_items").delete().eq("id", itemId)
    setItems(items.filter((i) => i.id !== itemId))
  }

  const total = items.reduce((sum, item) => sum + item.parts.price * item.quantity, 0)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <h1 className="mt-4 font-heading text-2xl font-bold">Shopping Cart</h1>
        <p className="mt-2 text-muted-foreground">Sign in to view your cart.</p>
        <Link
          href="/account/login?redirect=/cart"
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
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Shopping Cart</h1>
          <span className="text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</span>
        </div>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-1 text-sm text-muted-foreground">Browse our parts catalog to add items.</p>
            <Link
              href="/parts"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse Parts
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={item.parts.image_url || "/placeholder.svg"}
                    alt={item.parts.name}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {item.parts.sku}
                  </p>
                  <Link href={`/parts/${item.parts.slug}`}>
                    <h3 className="truncate text-sm font-bold text-foreground hover:text-primary transition-colors">
                      {item.parts.name}
                    </h3>
                  </Link>
                  <p className="mt-0.5 text-sm font-bold text-foreground">
                    ${item.parts.price.toFixed(2)}
                    <span className="text-xs font-normal text-muted-foreground"> /{item.parts.unit}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-secondary"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-secondary"
                    disabled={item.quantity >= (item.parts.stock_quantity || 999)}
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    ${(item.parts.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-6 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Shipping calculated at checkout</p>
              <Link
                href="/checkout"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
