"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { label: "Lighting Towers", href: "/lighting-towers/single-axle", sub: [
    { label: "All Products", href: "/products" },
    { label: "Single Axle", href: "/lighting-towers/single-axle" },
    { label: "Dual Axle", href: "/lighting-towers/dual-axle" },
    { label: "Sled Mount", href: "/lighting-towers/sled-mount" },
    { label: "Long Range", href: "/lighting-towers/long-range" },
  ] },
  { label: "LED Lighting", href: "/production-quality",
    sub: [
      { label: "DCB95 (Orca)", href: "/led-lighting/orca" },
      { label: "DCB48/66 (Barracuda)", href: "/led-lighting/barracuda" },
      { label: "DCB24 (Snapper)", href: "/led-lighting/snapper" },
      { label: "DCB9 (Piranha)", href: "/led-lighting/piranha" },
      { label: "Dark Licht Series", href: "/led-lighting/dark-licht" },
    ] },
  { label: "Fuel Storage", href: "/fuel-trailers", sub: [
    { label: "Fuel Trailers", href: "/fuel-trailers" },
    { label: "Fuel Tanks", href: "/fuel-tanks" },
  ] },
  { label: "Custom Fab", href: "/custom-fabrication" },
  { label: "Parts", href: "/parts", sub: [
    { label: "Parts & Spares", href: "/parts" },
    { label: "Parts Manuals", href: "/parts-manuals" },
    { label: "Operation & Maintenance", href: "/parts-manuals/operation-maintenance" },
  ] },
  { label: "About", href: "/our-story" },
  { label: "Contact", href: "/contact-us" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSub, setOpenSub] = useState<string | null>(null)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-mickala.png"
            alt="Mickala Group"
            width={80}
            height={66}
            className="h-[50px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.sub ? (
                <>
                  <button
                    onClick={() => setOpenSub(openSub === link.label ? null : link.label)}
                    className="flex items-center gap-1 text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase"
                  >
                    {link.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-white/[0.06] rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
                    {link.sub.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        className="block px-4 py-2 text-[11px] text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors tracking-wide uppercase"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <a href="tel:1300642525" className="hidden sm:block text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">
          1300 642 525
        </a>

        {/* Mobile menu toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/50 hover:text-white">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.sub ? (
                  <>
                    <button
                      onClick={() => setOpenSub(openSub === link.label ? null : link.label)}
                      className="flex items-center justify-between w-full text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase py-2"
                    >
                      {link.label}
                      <ChevronDown className={`h-3 w-3 transition-transform ${openSub === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {openSub === link.label && (
                      <div className="pl-4 space-y-2 mt-1">
                        {link.sub.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-[11px] text-white/40 hover:text-white transition-colors tracking-wide uppercase py-1"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase py-2"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <a href="tel:1300642525" className="block text-[11px] text-white/40 hover:text-white transition-colors tracking-wide uppercase pt-2 border-t border-white/[0.06]">
              1300 642 525
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
