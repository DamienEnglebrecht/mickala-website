     1|"use client"
     2|
     3|export const dynamic = "force-dynamic"
     4|
     5|import { useEffect, useState } from "react"
     6|import { useRouter } from "next/navigation"
     7|     8|
     9|type CartItem = {
    10|  id: string
    11|  part_id: string
    12|  quantity: number
    13|  parts: {
    14|    id: string
    15|    name: string
    16|    sku: string
    17|    price: number
    18|  }
    19|}
    20|
    21|export default function CheckoutPage() {
    22|  const [items, setItems] = useState<CartItem[]>([])
    23|  const [loading, setLoading] = useState(true)
    24|  const [submitting, setSubmitting] = useState(false)
    25|  const [notes, setNotes] = useState("")
    26|  const [company, setCompany] = useState("")
    27|  const [phone, setPhone] = useState("")
    28|  const [address, setAddress] = useState("")
    29|  const [city, setCity] = useState("")
    30|  const [state, setState] = useState("")
    31|  const [postcode, setPostcode] = useState("")
    32|  const [customerId, setCustomerId] = useState<string | null>(null)
    33|  const router = useRouter()
    34|  const supabase = createClient()
    35|
    36|  useEffect(() => {
    37|    loadCheckout()
    38|  }, [])
    39|
    40|  async function loadCheckout() {
    41|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    42|    const { data: userData }: any = await supabase.auth.getUser()
    43|    if (!userData?.user) {
    44|      router.push("/account/login?redirect=/checkout")
    45|      return
    46|    }
    47|
    48|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    49|    const { data: customer }: any = await supabase
    50|      .from("customers")
    51|      .select("*")
    52|      .eq("user_id", userData.user.id)
    53|      .single()
    54|
    55|    if (!customer) {
    56|      setLoading(false)
    57|      return
    58|    }
    59|
    60|    setCustomerId(customer.id)
    61|    setCompany(customer.company_name || "")
    62|    setPhone(customer.phone || "")
    63|    setAddress(customer.address || "")
    64|    setCity(customer.city || "")
    65|    setState(customer.state || "")
    66|    setPostcode(customer.postcode || "")
    67|
    68|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    69|    const { data }: any = await supabase
    70|      .from("cart_items")
    71|      .select("id, part_id, quantity, parts(*)")
    72|      .eq("customer_id", customer.id)
    73|
    74|    if (!data || data.length === 0) {
    75|      router.push("/cart")
    76|      return
    77|    }
    78|
    79|    setItems(data)
    80|    setLoading(false)
    81|  }
    82|
    83|  async function placeOrder() {
    84|    setSubmitting(true)
    85|    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    86|    const supabaseAny: any = supabase
    87|
    88|    const shippingAddr = [address, city, state, postcode].filter(Boolean).join(", ")
    89|    const total = items.reduce((sum, item) => sum + item.parts.price * item.quantity, 0)
    90|
    91|    // Create order
    92|    const { data: order } = await supabaseAny
    93|      .from("orders")
    94|      .insert({
    95|        customer_id: customerId,
    96|        status: "pending",
    97|        total_amount: total,
    98|        shipping_address: shippingAddr,
    99|        notes,
   100|      })
   101|      .select()
   102|      .single()
   103|
   104|    if (!order) {
   105|      setSubmitting(false)
   106|      return
   107|    }
   108|
   109|    // Create order items
   110|    const orderItems = items.map((item) => ({
   111|      order_id: order.id,
   112|      part_id: item.part_id,
   113|      quantity: item.quantity,
   114|      unit_price: item.parts.price,
   115|      total_price: item.parts.price * item.quantity,
   116|    }))
   117|
   118|    await supabaseAny.from("order_items").insert(orderItems)
   119|
   120|    // Clear cart
   121|    await supabaseAny.from("cart_items").delete().eq("customer_id", customerId)
   122|
   123|    setSubmitting(false)
   124|    router.push(`/account/orders?success=true`)
   125|  }
   126|
   127|  const total = items.reduce((sum, item) => sum + item.parts.price * item.quantity, 0)
   128|
   129|  if (loading) {
   130|    return (
   131|      <div className="flex min-h-screen items-center justify-center bg-background">
   132|        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
   133|      </div>
   134|    )
   135|  }
   136|
   137|  return (
   138|    <div className="min-h-screen bg-background">
   139|      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
   140|        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Checkout</h1>
   141|
   142|        <div className="mt-8 grid gap-8 lg:grid-cols-2">
   143|          {/* Shipping Details */}
   144|          <div>
   145|            <h2 className="font-heading text-lg font-bold uppercase tracking-tight">Shipping Details</h2>
   146|            <div className="mt-4 space-y-4">
   147|              <div>
   148|                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</label>
   149|                <input
   150|                  value={company}
   151|                  onChange={(e) => setCompany(e.target.value)}
   152|                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
   153|                  placeholder="Company name"
   154|                />
   155|              </div>
   156|              <div>
   157|                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
   158|                <input
   159|                  value={phone}
   160|                  onChange={(e) => setPhone(e.target.value)}
   161|                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
   162|                  placeholder="Phone number"
   163|                />
   164|              </div>
   165|              <div>
   166|                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</label>
   167|                <input
   168|                  value={address}
   169|                  onChange={(e) => setAddress(e.target.value)}
   170|                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
   171|                  placeholder="Street address"
   172|                />
   173|              </div>
   174|              <div className="grid grid-cols-3 gap-3">
   175|                <div>
   176|                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">City</label>
   177|                  <input
   178|                    value={city}
   179|                    onChange={(e) => setCity(e.target.value)}
   180|                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
   181|                    placeholder="City"
   182|                  />
   183|                </div>
   184|                <div>
   185|                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">State</label>
   186|                  <input
   187|                    value={state}
   188|                    onChange={(e) => setState(e.target.value)}
   189|                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
   190|                    placeholder="State"
   191|                  />
   192|                </div>
   193|                <div>
   194|                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Postcode</label>
   195|                  <input
   196|                    value={postcode}
   197|                    onChange={(e) => setPostcode(e.target.value)}
   198|                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
   199|                    placeholder="Postcode"
   200|                  />
   201|                </div>
   202|              </div>
   203|              <div>
   204|                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Order Notes</label>
   205|                <textarea
   206|                  value={notes}
   207|                  onChange={(e) => setNotes(e.target.value)}
   208|                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
   209|                  placeholder="Any special instructions?"
   210|                  rows={3}
   211|                />
   212|              </div>
   213|            </div>
   214|          </div>
   215|
   216|          {/* Order Summary */}
   217|          <div>
   218|            <h2 className="font-heading text-lg font-bold uppercase tracking-tight">Order Summary</h2>
   219|            <div className="mt-4 rounded-xl border border-border bg-card">
   220|              <div className="divide-y divide-border">
   221|                {items.map((item) => (
   222|                  <div key={item.id} className="flex items-center justify-between px-4 py-3">
   223|                    <div className="min-w-0 flex-1">
   224|                      <p className="text-sm font-medium text-foreground truncate">{item.parts.name}</p>
   225|                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
   226|                    </div>
   227|                    <span className="ml-4 text-sm font-bold text-foreground">
   228|                      ${(item.parts.price * item.quantity).toFixed(2)}
   229|                    </span>
   230|                  </div>
   231|                ))}
   232|              </div>
   233|              <div className="border-t border-border px-4 py-4">
   234|                <div className="flex items-center justify-between">
   235|                  <span className="text-sm font-semibold text-foreground">Total</span>
   236|                  <span className="font-heading text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
   237|                </div>
   238|                <p className="mt-1 text-xs text-muted-foreground">GST included. Shipping will be confirmed via email.</p>
   239|              </div>
   240|            </div>
   241|
   242|            <button
   243|              onClick={placeOrder}
   244|              disabled={submitting}
   245|              className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
   246|            >
   247|              {submitting ? "Placing Order..." : "Place Order"}
   248|            </button>
   249|          </div>
   250|        </div>
   251|      </div>
   252|    </div>
   253|  )
   254|}
   255|