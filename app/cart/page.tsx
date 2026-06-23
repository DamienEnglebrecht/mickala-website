     1|"use client"
     2|
     3|export const dynamic = "force-dynamic"
     4|
     5|import { useEffect, useState } from "react"
     6|import Image from "next/image"
     7|import Link from "next/link"
     8|import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
     9|    10|
    11|type CartItem = {
    12|  id: string
    13|  part_id: string
    14|  quantity: number
    15|  parts: {
    16|    id: string
    17|    name: string
    18|    slug: string
    19|    sku: string
    20|    price: number
    21|    unit: string
    22|    image_url: string | null
    23|    stock_quantity: number
    24|  }
    25|}
    26|
    27|export default function CartPage() {
    28|  const [items, setItems] = useState<CartItem[]>([])
    29|  const [loading, setLoading] = useState(true)
    30|  const [userId, setUserId] = useState<string | null>(null)
    31|  const supabase = createClient()
    32|
    33|  useEffect(() => {
    34|    loadCart()
    35|  }, [])
    36|
    37|  async function loadCart() {
    38|    const { data: { user } } = await supabase.auth.getUser()
    39|    if (!user) {
    40|      setLoading(false)
    41|      return
    42|    }
    43|    setUserId(user.id)
    44|
    45|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    46|    const { data: customer }: any = await supabase
    47|      .from("customers")
    48|      .select("id")
    49|      .eq("user_id", user.id)
    50|      .single()
    51|
    52|    if (!customer) {
    53|      setLoading(false)
    54|      return
    55|    }
    56|
    57|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    58|    const { data }: any = await supabase
    59|      .from("cart_items")
    60|      .select("id, part_id, quantity, parts(*)")
    61|      .eq("customer_id", customer.id)
    62|
    63|    setItems(data || [])
    64|    setLoading(false)
    65|  }
    66|
    67|  async function updateQty(itemId: string, newQty: number) {
    68|    if (newQty < 1) return
    69|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    70|    await (supabase as any).from("cart_items").update({ quantity: newQty }).eq("id", itemId)
    71|    setItems(items.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i)))
    72|  }
    73|
    74|  async function removeItem(itemId: string) {
    75|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    76|    await (supabase as any).from("cart_items").delete().eq("id", itemId)
    77|    setItems(items.filter((i) => i.id !== itemId))
    78|  }
    79|
    80|  const total = items.reduce((sum, item) => sum + item.parts.price * item.quantity, 0)
    81|
    82|  if (loading) {
    83|    return (
    84|      <div className="flex min-h-screen items-center justify-center bg-background">
    85|        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    86|      </div>
    87|    )
    88|  }
    89|
    90|  if (!userId) {
    91|    return (
    92|      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
    93|        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
    94|        <h1 className="mt-4 font-heading text-2xl font-bold">Shopping Cart</h1>
    95|        <p className="mt-2 text-muted-foreground">Sign in to view your cart.</p>
    96|        <Link
    97|          href="/account/login?redirect=/cart"
    98|          className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground uppercase tracking-wider transition-colors hover:bg-primary/90"
    99|        >
   100|          Sign In
   101|        </Link>
   102|      </div>
   103|    )
   104|  }
   105|
   106|  return (
   107|    <div className="min-h-screen bg-background">
   108|      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
   109|        <div className="flex items-center justify-between">
   110|          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Shopping Cart</h1>
   111|          <span className="text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</span>
   112|        </div>
   113|
   114|        {items.length === 0 ? (
   115|          <div className="mt-16 flex flex-col items-center justify-center text-center">
   116|            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
   117|            <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
   118|            <p className="mt-1 text-sm text-muted-foreground">Browse our parts catalog to add items.</p>
   119|            <Link
   120|              href="/parts"
   121|              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
   122|            >
   123|              <ArrowLeft className="h-4 w-4" />
   124|              Browse Parts
   125|            </Link>
   126|          </div>
   127|        ) : (
   128|          <div className="mt-8 space-y-4">
   129|            {items.map((item) => (
   130|              <div
   131|                key={item.id}
   132|                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors"
   133|              >
   134|                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
   135|                  <Image
   136|                    src={item.parts.image_url || "/placeholder.svg"}
   137|                    alt={item.parts.name}
   138|                    fill
   139|                    className="object-contain p-2"
   140|                    sizes="80px"
   141|                  />
   142|                </div>
   143|                <div className="flex-1 min-w-0">
   144|                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
   145|                    {item.parts.sku}
   146|                  </p>
   147|                  <Link href={`/parts/${item.parts.slug}`}>
   148|                    <h3 className="truncate text-sm font-bold text-foreground hover:text-primary transition-colors">
   149|                      {item.parts.name}
   150|                    </h3>
   151|                  </Link>
   152|                  <p className="mt-0.5 text-sm font-bold text-foreground">
   153|                    ${item.parts.price.toFixed(2)}
   154|                    <span className="text-xs font-normal text-muted-foreground"> /{item.parts.unit}</span>
   155|                  </p>
   156|                </div>
   157|                <div className="flex items-center gap-2">
   158|                  <button
   159|                    onClick={() => updateQty(item.id, item.quantity - 1)}
   160|                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-secondary"
   161|                  >
   162|                    -
   163|                  </button>
   164|                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
   165|                  <button
   166|                    onClick={() => updateQty(item.id, item.quantity + 1)}
   167|                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-secondary"
   168|                    disabled={item.quantity >= (item.parts.stock_quantity || 999)}
   169|                  >
   170|                    +
   171|                  </button>
   172|                </div>
   173|                <div className="text-right">
   174|                  <p className="text-sm font-bold text-foreground">
   175|                    ${(item.parts.price * item.quantity).toFixed(2)}
   176|                  </p>
   177|                </div>
   178|                <button
   179|                  onClick={() => removeItem(item.id)}
   180|                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
   181|                >
   182|                  <Trash2 className="h-4 w-4" />
   183|                </button>
   184|              </div>
   185|            ))}
   186|
   187|            {/* Summary */}
   188|            <div className="mt-6 rounded-xl border border-border bg-card p-6">
   189|              <div className="flex items-center justify-between">
   190|                <span className="text-sm text-muted-foreground">Subtotal</span>
   191|                <span className="font-heading text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
   192|              </div>
   193|              <p className="mt-1 text-xs text-muted-foreground">Shipping calculated at checkout</p>
   194|              <Link
   195|                href="/checkout"
   196|                className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
   197|              >
   198|                Proceed to Checkout
   199|              </Link>
   200|            </div>
   201|          </div>
   202|        )}
   203|      </div>
   204|    </div>
   205|  )
   206|}
   207|