"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Menu, Phone, X, ShoppingCart, User, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { createClient } from "@/lib/supabase/client"

const navLinks = [
  { label: "Parts & Spares", href: "/parts" },
  {
    label: "Lighting Towers",
    href: "/spec-sheets",
    sub: [
      { label: "Single Axle", href: "/spec-sheets?category=single-axle" },
      { label: "Dual Axle", href: "/spec-sheets?category=dual-axle" },
      { label: "Sled Mount", href: "/spec-sheets?category=sled-mount" },
      { label: "Long Range", href: "/spec-sheets?category=long-range" },
    ],
  },
  {
    label: "LED Lighting",
    href: "/led-lighting",
    sub: [
      { label: "Orca Series", href: "/led-lighting#orca-series" },
      { label: "Barracuda Series", href: "/led-lighting#barracuda-series" },
      { label: "Snapper Series", href: "/led-lighting#snapper-series" },
      { label: "Piranha Series", href: "/led-lighting#piranha-series" },
      { label: "Dark Licht Series", href: "/led-lighting#dark-licht-series" },
    ],
  },
  {
    label: "Other Products",
    href: "#other-products",
    sub: [
      { label: "Fuel Trailers", href: "/spec-sheets?category=fuel-trailers" },
      { label: "Generators", href: "/spec-sheets?category=generators" },
      { label: "Custom Fabrication", href: "#custom-fabrication" },
    ],
  },
  {
    label: "About",
    href: "#about",
    sub: [
      { label: "Our Story", href: "/our-story" },
    ],
  },
  { label: "Support", href: "#support" },
  { label: "Contact", href: "#contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const supabase = createClient()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    loadUserAndCart()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUserAndCart()
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
      subscription.unsubscribe()
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      for (const key of Object.keys(dropdownRefs.current)) {
        if (dropdownRefs.current[key]?.contains(target)) {
          return
        }
      }
      setActiveDropdown(null)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function loadUserAndCart() {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    setUser(authUser)

    if (authUser) {
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-0 px-4 sm:px-6 lg:px-8 lg:h-18">
        <Link href="/" className="flex items-center" aria-label="Mickala Group home">
          <Logo
            className={cn(
              "transition-colors",
              scrolled || open ? "text-foreground" : "text-white",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) =>
            "sub" in link && link.sub ? (
              <div key={link.label} ref={(el) => { dropdownRefs.current[link.label] = el }} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-primary",
                    scrolled ? "text-foreground" : "text-white/90",
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", activeDropdown === link.label && "rotate-180")} />
                </button>
                {activeDropdown === link.label && (
                  <div className="absolute left-0 top-full mt-2 w-52 rounded-lg border bg-background p-1.5 shadow-lg">
                    {link.sub.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
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
            )
          )}
        </nav>

        <div className="flex items-center gap-0">
          {/* Cart */}
          <Link
            href="/cart"
            className={cn(
              "relative flex h-6 w-6 items-center justify-center rounded transition-colors sm:h-7 sm:w-7",
              scrolled || open ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/10",
            )}
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-3 min-w-[12px] items-center justify-center rounded-full bg-primary px-0.5 text-[7px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            href={user ? "/account/orders" : "/account/login"}
            className={cn(
              "hidden h-6 w-6 items-center justify-center rounded transition-colors sm:flex sm:h-7 sm:w-7",
              scrolled || open ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/10",
            )}
          >
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>

          <a
            href="tel:1300642525"
            className="hidden items-center gap-0.5 rounded-full bg-primary px-1 py-0.5 text-[9px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex whitespace-nowrap"
          >
            <Phone className="h-2 w-2" />
            1300 642 525
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md lg:hidden",
              scrolled || open ? "text-foreground" : "text-white",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) =>
              "sub" in link && link.sub ? (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-3 text-base font-medium text-foreground"
                  >
                    {link.label}
                  </Link>
                  <div className="pl-4">
                    {link.sub.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-border/40 py-2.5 text-sm text-muted-foreground"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-base font-medium text-foreground last:border-0"
                >
                  {link.label}
                </Link>
              )
            )}
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
