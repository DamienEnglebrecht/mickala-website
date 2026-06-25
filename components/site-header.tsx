"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Phone, X, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { createClient } from "@/lib/supabase/client"

const navLinks = [
  { label: "Parts & Spares", href: "/parts" },
  { label: "Lighting Towers", href: "#products" },
  { label: "Spec Sheets", href: "/spec-sheets" },
  { label: "Other Products", href: "#other-products" },
  { label: "About", href: "#about" },
  { label: "Support", href: "#support" },
  { label: "Contact", href: "#contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    // Load auth state and cart count
    loadUserAndCart()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUserAndCart()
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
      subscription.unsubscribe()
    }
  }, [])

  async function loadUserAndCart() {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    setUser(authUser)

    if (authUser) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: customer }: any = await supabase
        .from("customers")
        .select("id")
        .eq("user_id", authUser.id)
        .single()

      if (customer) {
        const { count } = await supabase
          .from("cart_items")
          .select("*", { count: "exact", head: true })
          .eq("customer_id", customer.id)

        setCartCount(count || 0)
      }
    }
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 lg:h-20">
        <Link href="/" className="flex items-center" aria-label="Mickala Group home">
          <Logo
            className={cn(
              "transition-colors",
              scrolled || open ? "text-foreground" : "text-white",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                scrolled ? "text-foreground" : "text-white/90",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link
            href="/cart"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              scrolled || open ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/10",
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            href={user ? "/account/orders" : "/account/login"}
            className={cn(
              "hidden h-10 w-10 items-center justify-center rounded-lg transition-colors sm:flex",
              scrolled || open ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/10",
            )}
          >
            <User className="h-5 w-5" />
          </Link>

          <a
            href="tel:1300642525"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            1300 642 525
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden",
              scrolled || open ? "text-foreground" : "text-white",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-base font-medium text-foreground last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user ? "/account/orders" : "/account/login"}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-base font-medium text-foreground"
            >
              {user ? "My Account" : "Sign In"}
            </Link>
            <a
              href="tel:1300642525"
              className="mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Call 1300 642 525
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
