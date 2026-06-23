"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Check } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

type Part = {
  id: string
  sku: string
  name: string
  slug: string
  description: string | null
  price: number
  unit: string
  stock_quantity: number
  min_order_qty: number
  image_url: string | null
  specs: unknown
  parts_categories?: { name: string; slug: string } | null
}

export function PartsGrid({ parts }: { parts: Part[] }) {
  const [addedId, setAddedId] = useState<string | null>(null)
  const supabase = createClient()

  async function addToCart(part: Part) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = `/account/login?redirect=/parts`
      return
    }

    const { data: customer } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (!customer) return

    const { error } = await supabase.from("cart_items").upsert(
      { customer_id: customer.id, part_id: part.id, quantity: part.min_order_qty },
      { onConflict: "customer_id, part_id" },
    )

    if (!error) {
      setAddedId(part.id)
      setTimeout(() => setAddedId(null), 2000)
    }
  }

  return (
    <>
      {parts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold">No parts found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try browsing a different category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((part) => (
            <article
              key={part.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <Link href={`/parts/${part.slug}`} className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={part.image_url || "/placeholder.svg"}
                  alt={part.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {part.stock_quantity <= 5 && part.stock_quantity > 0 && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Low stock
                  </span>
                )}
                {part.stock_quantity === 0 && (
                  <span className="absolute right-3 top-3 rounded-full bg-destructive/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Out of stock
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {part.sku}
                </p>
                <Link href={`/parts/${part.slug}`}>
                  <h3 className="mt-1 font-heading text-base font-bold leading-tight text-foreground transition-colors hover:text-primary">
                    {part.name}
                  </h3>
                </Link>
                <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {part.description}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-heading text-lg font-bold text-foreground">
                    ${part.price.toFixed(2)}
                    <span className="text-xs font-normal text-muted-foreground"> /{part.unit}</span>
                  </span>
                  <button
                    onClick={() => addToCart(part)}
                    disabled={part.stock_quantity === 0}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                      addedId === part.id
                        ? "bg-emerald-600 text-white"
                        : part.stock_quantity === 0
                          ? "bg-secondary text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {addedId === part.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-3.5 w-3.5" />
                        {part.stock_quantity === 0 ? "Out of stock" : "Add to cart"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
