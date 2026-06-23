     1|"use client"
     2|
     3|import Image from "next/image"
     4|import Link from "next/link"
     5|import { ShoppingCart, Check } from "lucide-react"
     6|import { useState } from "react"
     7|     8|
     9|type Part = {
    10|  id: string
    11|  sku: string
    12|  name: string
    13|  slug: string
    14|  description: string | null
    15|  price: number
    16|  unit: string
    17|  stock_quantity: number
    18|  min_order_qty: number
    19|  image_url: string | null
    20|  specs: unknown
    21|  parts_categories?: { name: string; slug: string } | null
    22|}
    23|
    24|export function PartsGrid({ parts }: { parts: Part[] }) {
    25|  const [addedId, setAddedId] = useState<string | null>(null)
    26|  const supabase = createClient()
    27|
    28|  async function addToCart(part: Part) {
    29|    const { data: { user } } = await supabase.auth.getUser()
    30|    if (!user) {
    31|      window.location.href = `/account/login?redirect=/parts`
    32|      return
    33|    }
    34|
    35|    const { data: customer } = await supabase
    36|      .from("customers")
    37|      .select("id")
    38|      .eq("user_id", user.id)
    39|      .single()
    40|
    41|    if (!customer) return
    42|
    43|    const { error } = await supabase.from("cart_items").upsert(
    44|      { customer_id: customer.id, part_id: part.id, quantity: part.min_order_qty },
    45|      { onConflict: "customer_id, part_id" },
    46|    )
    47|
    48|    if (!error) {
    49|      setAddedId(part.id)
    50|      setTimeout(() => setAddedId(null), 2000)
    51|    }
    52|  }
    53|
    54|  return (
    55|    <>
    56|      {parts.length === 0 ? (
    57|        <div className="flex flex-col items-center justify-center py-20 text-center">
    58|          <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
    59|          <h3 className="mt-4 text-lg font-semibold">No parts found</h3>
    60|          <p className="mt-1 text-sm text-muted-foreground">
    61|            Try browsing a different category.
    62|          </p>
    63|        </div>
    64|      ) : (
    65|        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    66|          {parts.map((part) => (
    67|            <article
    68|              key={part.id}
    69|              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
    70|            >
    71|              <Link href={`/parts/${part.slug}`} className="relative aspect-[4/3] overflow-hidden bg-secondary">
    72|                <Image
    73|                  src={part.image_url || "/placeholder.svg"}
    74|                  alt={part.name}
    75|                  fill
    76|                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
    77|                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    78|                />
    79|                {part.stock_quantity <= 5 && part.stock_quantity > 0 && (
    80|                  <span className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
    81|                    Low stock
    82|                  </span>
    83|                )}
    84|                {part.stock_quantity === 0 && (
    85|                  <span className="absolute right-3 top-3 rounded-full bg-destructive/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
    86|                    Out of stock
    87|                  </span>
    88|                )}
    89|              </Link>
    90|              <div className="flex flex-1 flex-col p-4">
    91|                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
    92|                  {part.sku}
    93|                </p>
    94|                <Link href={`/parts/${part.slug}`}>
    95|                  <h3 className="mt-1 font-heading text-base font-bold leading-tight text-foreground transition-colors hover:text-primary">
    96|                    {part.name}
    97|                  </h3>
    98|                </Link>
    99|                <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
   100|                  {part.description}
   101|                </p>
   102|                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
   103|                  <span className="font-heading text-lg font-bold text-foreground">
   104|                    ${part.price.toFixed(2)}
   105|                    <span className="text-xs font-normal text-muted-foreground"> /{part.unit}</span>
   106|                  </span>
   107|                  <button
   108|                    onClick={() => addToCart(part)}
   109|                    disabled={part.stock_quantity === 0}
   110|                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
   111|                      addedId === part.id
   112|                        ? "bg-emerald-600 text-white"
   113|                        : part.stock_quantity === 0
   114|                          ? "bg-secondary text-muted-foreground cursor-not-allowed"
   115|                          : "bg-primary text-primary-foreground hover:bg-primary/90"
   116|                    }`}
   117|                  >
   118|                    {addedId === part.id ? (
   119|                      <>
   120|                        <Check className="h-3.5 w-3.5" />
   121|                        Added
   122|                      </>
   123|                    ) : (
   124|                      <>
   125|                        <ShoppingCart className="h-3.5 w-3.5" />
   126|                        {part.stock_quantity === 0 ? "Out of stock" : "Add to cart"}
   127|                      </>
   128|                    )}
   129|                  </button>
   130|                </div>
   131|              </div>
   132|            </article>
   133|          ))}
   134|        </div>
   135|      )}
   136|    </>
   137|  )
   138|}
   139|