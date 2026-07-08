import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const categories = [
  {
    name: "Lighting Towers",
    description: "Extra-low-voltage LED lighting towers for mining and industrial sites.",
    href: "/lighting-towers/single-axle",
    image: "/hero-towers.webp",
    sub: [
      { label: "Single Axle", href: "/lighting-towers/single-axle" },
      { label: "Dual Axle", href: "/lighting-towers/dual-axle" },
      { label: "Sled Mount", href: "/lighting-towers/sled-mount" },
      { label: "Long Range", href: "/lighting-towers/long-range" },
    ],
  },
  {
    name: "LED Lighting",
    description: "High-performance LED luminaires for every worksite application.",
    href: "/production-quality",
    image: "/led-light-hero.jpg",
    sub: [
      { label: "Orca Series", href: "/led-lighting/orca" },
      { label: "Barracuda Series", href: "/led-lighting/barracuda" },
      { label: "Snapper Series", href: "/led-lighting/snapper" },
      { label: "Piranha Series", href: "/led-lighting/piranha" },
      { label: "Dark Licht", href: "/led-lighting/dark-licht" },
    ],
  },
  {
    name: "Fuel Storage",
    description: "Self-bunded fuel trailers and compliant storage for site refuelling.",
    href: "/fuel-trailers",
    image: "/product-fuel-trailer.png",
    sub: [
      { label: "Fuel Trailers", href: "/fuel-trailers" },
      { label: "Fuel Tanks", href: "/fuel-tanks" },
    ],
  },
  {
    name: "Custom Fabrication",
    description: "In-house design and manufacture for your specific requirements.",
    href: "/custom-fabrication",
    image: "/custom-fabrication-hero.jpg",
    sub: [],
  },
]

export default function ProductsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image src="/hero-towers.webp" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-16">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Products</p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">Explore Our Range</h1>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div key={cat.name} className="border border-white/[0.06] hover:border-white/[0.15] transition-colors overflow-hidden">
                <Link href={cat.href} className="block">
                  <div className="relative aspect-[16/9]">
                    <Image src={cat.image} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <h2 className="text-2xl sm:text-3xl font-bold mb-1">{cat.name}</h2>
                      <p className="text-sm text-white/60">{cat.description}</p>
                    </div>
                  </div>
                </Link>
                {cat.sub.length > 0 && (
                  <div className="px-6 py-4 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-3">
                      {cat.sub.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase border border-white/[0.06] px-3 py-1.5 hover:border-white/[0.15]"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Need help choosing?</h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">Talk to our team about which solution fits your site.</p>
          <div className="flex items-center justify-center gap-6">
            <a href="tel:1300642525" className="text-sm text-white/70 hover:text-white">1300 642 525</a>
            <span className="text-white/[0.06]">/</span>
            <Link href="/quote" className="text-sm text-[#DC2626] hover:text-[#B91C1C] font-semibold">Request a Quote →</Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <p className="text-[11px] text-white/30 text-center">Mickala Group · ABN 92 180 218 353 · 21 Caterpillar Drive, Paget QLD 4740</p>
        </div>
      </footer>
    </div>
  )
}
