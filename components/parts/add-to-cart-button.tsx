     1|"use client"
     2|
     3|import { useState } from "react"
     4|import { useRouter } from "next/navigation"
     5|     6|
     7|type PartProps = {
     8|  id: string
     9|  slug: string
    10|  name: string
    11|  price: number
    12|  unit: string
    13|  stock_quantity: number
    14|  min_order_qty: number
    15|  [key: string]: unknown
    16|}
    17|
    18|export function AddToCartButton({ part }: { part: PartProps }) {
    19|  const [quantity, setQuantity] = useState(part.min_order_qty)
    20|  const [added, setAdded] = useState(false)
    21|  const [loading, setLoading] = useState(false)
    22|  const router = useRouter()
    23|  const supabase = createClient()
    24|
    25|  async function handleAdd() {
    26|    setLoading(true)
    27|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    28|    const { data: userData }: any = await supabase.auth.getUser()
    29|    const user = userData?.user
    30|    if (!user) {
    31|      router.push(`/account/login?redirect=/parts/${part.slug}`)
    32|      return
    33|    }
    34|
    35|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    36|    const { data: customer }: any = await supabase
    37|      .from("customers")
    38|      .select("id")
    39|      .eq("user_id", user.id)
    40|      .single()
    41|
    42|    if (!customer) {
    43|      setLoading(false)
    44|      return
    45|    }
    46|
    47|    // Check if already in cart
    48|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    49|    const { data: existing }: any = await supabase
    50|      .from("cart_items")
    51|      .select("id, quantity")
    52|      .eq("customer_id", customer.id)
    53|      .eq("part_id", part.id)
    54|      .maybeSingle()
    55|
    56|    if (existing) {
    57|      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    58|      await (supabase as any)
    59|        .from("cart_items")
    60|        .update({ quantity: existing.quantity + quantity })
    61|        .eq("id", existing.id)
    62|    } else {
    63|      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    64|      await (supabase as any)
    65|        .from("cart_items")
    66|        .insert({ customer_id: customer.id, part_id: part.id, quantity })
    67|    }
    68|
    69|    setLoading(false)
    70|    setAdded(true)
    71|    setTimeout(() => setAdded(false), 3000)
    72|  }
    73|
    74|  return (
    75|    <div className="mt-6 space-y-3">
    76|      <div className="flex items-center gap-3">
    77|        <label className="text-sm font-medium text-muted-foreground">Qty:</label>
    78|        <div className="flex items-center rounded-lg border border-border">
    79|          <button
    80|            onClick={() => setQuantity(Math.max(part.min_order_qty, quantity - 1))}
    81|            className="px-3 py-2 text-sm transition-colors hover:bg-secondary"
    82|            disabled={quantity <= part.min_order_qty}
    83|          >
    84|            -
    85|          </button>
    86|          <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
    87|          <button
    88|            onClick={() => setQuantity(Math.min(part.stock_quantity || 999, quantity + 1))}
    89|            className="px-3 py-2 text-sm transition-colors hover:bg-secondary"
    90|            disabled={quantity >= (part.stock_quantity || 999)}
    91|          >
    92|            +
    93|          </button>
    94|        </div>
    95|      </div>
    96|
    97|      <button
    98|        onClick={handleAdd}
    99|        disabled={loading || part.stock_quantity === 0}
   100|        className={`w-full rounded-xl px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-all ${
   101|          added
   102|            ? "bg-emerald-600 text-white"
   103|            : part.stock_quantity === 0
   104|              ? "bg-secondary text-muted-foreground cursor-not-allowed"
   105|              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
   106|        }`}
   107|      >
   108|        {loading ? "Adding..." : added ? "✓ Added to cart" : "Add to cart"}
   109|      </button>
   110|    </div>
   111|  )
   112|}
   113|