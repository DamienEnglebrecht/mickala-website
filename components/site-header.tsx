     1|"use client"
     2|
     3|import { useEffect, useState } from "react"
     4|import Link from "next/link"
     5|import { Menu, Phone, X, ShoppingCart, User } from "lucide-react"
     6|import { cn } from "@/lib/utils"
     7|import { Logo } from "./logo"
     8|     9|
    10|const navLinks = [
    11|  { label: "Parts & Spares", href: "/parts" },
    12|  { label: "Lighting Towers", href: "#products" },
    13|  { label: "Other Products", href: "#other-products" },
    14|  { label: "About", href: "#about" },
    15|  { label: "Support", href: "#support" },
    16|  { label: "Contact", href: "#contact" },
    17|]
    18|
    19|export function SiteHeader() {
    20|  const [scrolled, setScrolled] = useState(false)
    21|  const [open, setOpen] = useState(false)
    22|  const [cartCount, setCartCount] = useState(0)
    23|  const [user, setUser] = useState<any>(null)
    24|  const supabase = createClient()
    25|
    26|  useEffect(() => {
    27|    const onScroll = () => setScrolled(window.scrollY > 24)
    28|    onScroll()
    29|    window.addEventListener("scroll", onScroll, { passive: true })
    30|
    31|    // Load auth state and cart count
    32|    loadUserAndCart()
    33|
    34|    // Subscribe to auth changes
    35|    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
    36|      loadUserAndCart()
    37|    })
    38|
    39|    return () => {
    40|      window.removeEventListener("scroll", onScroll)
    41|      subscription.unsubscribe()
    42|    }
    43|  }, [])
    44|
    45|  async function loadUserAndCart() {
    46|    const { data: { user: authUser } } = await supabase.auth.getUser()
    47|    setUser(authUser)
    48|
    49|    if (authUser) {
    50|      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    51|      const { data: customer }: any = await supabase
    52|        .from("customers")
    53|        .select("id")
    54|        .eq("user_id", authUser.id)
    55|        .single()
    56|
    57|      if (customer) {
    58|        const { count } = await supabase
    59|          .from("cart_items")
    60|          .select("*", { count: "exact", head: true })
    61|          .eq("customer_id", customer.id)
    62|
    63|        setCartCount(count || 0)
    64|      }
    65|    }
    66|  }
    67|
    68|  return (
    69|    <header
    70|      className={cn(
    71|        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
    72|        scrolled || open
    73|          ? "bg-background/90 backdrop-blur-md border-b border-border"
    74|          : "bg-transparent",
    75|      )}
    76|    >
    77|      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 lg:h-20">
    78|        <Link href="/" className="flex items-center" aria-label="Mickala Group home">
    79|          <Logo
    80|            className={cn(
    81|              "transition-colors",
    82|              scrolled || open ? "text-foreground" : "text-white",
    83|            )}
    84|          />
    85|        </Link>
    86|
    87|        <nav className="hidden items-center gap-6 lg:flex">
    88|          {navLinks.map((link) => (
    89|            <Link
    90|              key={link.href}
    91|              href={link.href}
    92|              className={cn(
    93|                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
    94|                scrolled ? "text-foreground" : "text-white/90",
    95|              )}
    96|            >
    97|              {link.label}
    98|            </Link>
    99|          ))}
   100|        </nav>
   101|
   102|        <div className="flex items-center gap-2">
   103|          {/* Cart */}
   104|          <Link
   105|            href="/cart"
   106|            className={cn(
   107|              "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
   108|              scrolled || open ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/10",
   109|            )}
   110|          >
   111|            <ShoppingCart className="h-5 w-5" />
   112|            {cartCount > 0 && (
   113|              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
   114|                {cartCount}
   115|              </span>
   116|            )}
   117|          </Link>
   118|
   119|          {/* Account */}
   120|          <Link
   121|            href={user ? "/account/orders" : "/account/login"}
   122|            className={cn(
   123|              "hidden h-10 w-10 items-center justify-center rounded-lg transition-colors sm:flex",
   124|              scrolled || open ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/10",
   125|            )}
   126|          >
   127|            <User className="h-5 w-5" />
   128|          </Link>
   129|
   130|          <a
   131|            href="tel:1300642525"
   132|            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
   133|          >
   134|            <Phone className="h-4 w-4" />
   135|            1300 642 525
   136|          </a>
   137|          <button
   138|            type="button"
   139|            onClick={() => setOpen((v) => !v)}
   140|            className={cn(
   141|              "inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden",
   142|              scrolled || open ? "text-foreground" : "text-white",
   143|            )}
   144|            aria-label={open ? "Close menu" : "Open menu"}
   145|          >
   146|            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
   147|          </button>
   148|        </div>
   149|      </div>
   150|
   151|      {open && (
   152|        <nav className="border-t border-border bg-background lg:hidden">
   153|          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
   154|            {navLinks.map((link) => (
   155|              <Link
   156|                key={link.href}
   157|                href={link.href}
   158|                onClick={() => setOpen(false)}
   159|                className="border-b border-border/60 py-3 text-base font-medium text-foreground last:border-0"
   160|              >
   161|                {link.label}
   162|              </Link>
   163|            ))}
   164|            <Link
   165|              href={user ? "/account/orders" : "/account/login"}
   166|              onClick={() => setOpen(false)}
   167|              className="border-b border-border/60 py-3 text-base font-medium text-foreground"
   168|            >
   169|              {user ? "My Account" : "Sign In"}
   170|            </Link>
   171|            <a
   172|              href="tel:1300642525"
   173|              className="mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
   174|            >
   175|              <Phone className="h-4 w-4" />
   176|              Call 1300 642 525
   177|            </a>
   178|          </div>
   179|        </nav>
   180|      )}
   181|    </header>
   182|  )
   183|}
   184|