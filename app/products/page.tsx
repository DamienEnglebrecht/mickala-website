import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const products = [
  // Lighting Towers
  { name: "Single Axle", category: "Lighting Towers", href: "/lighting-towers/single-axle", image: "/product-single-axle.webp", desc: "Compact, towable. Fast deployment for smaller sites." },
  { name: "Dual Axle", category: "Lighting Towers", href: "/lighting-towers/dual-axle", image: "/product-dual-axle.webp", desc: "Heavy-duty stability. Maximum coverage." },
  { name: "Sled Mount", category: "Lighting Towers", href: "/lighting-towers/sled-mount", image: "/product-sled-mount.webp", desc: "Skid-mounted. Crane and forklift deployable." },
  { name: "Long Range", category: "Lighting Towers", href: "/lighting-towers/long-range", image: "/product-long-range.webp", desc: "Extended mast. Long-throw optics." },

  // LED Lighting
  { name: "Orca Series", category: "LED Lighting", href: "/led-lighting/orca", image: "/orca-light.jpg", desc: "High-performance floodlighting. 300W – 800W." },
  { name: "Barracuda Series", category: "LED Lighting", href: "/led-lighting/barracuda", image: "/barracuda-light.jpg", desc: "Industrial linear lighting. 120W – 320W." },
  { name: "Snapper Series", category: "LED Lighting", href: "/led-lighting/snapper", image: "/snapper-light.jpg", desc: "Versatile area lighting. 170W – 1,200W." },
  { name: "Piranha Series", category: "LED Lighting", href: "/led-lighting/piranha", image: "/piranha-light.jpg", desc: "Compact hazardous area. 55W – 70W." },
  { name: "Dark Licht", category: "LED Lighting", href: "/led-lighting/dark-licht", image: "/dark-licht.jpg", desc: "German-engineered. 320W – 1,800W." },

  // Fuel Storage
  { name: "Fuel Trailers", category: "Fuel Storage", href: "/fuel-trailers", image: "/product-fuel-trailer.png", desc: "Self-bunded. 1,100 to 2,000 L capacity." },
  { name: "Fuel Tanks", category: "Fuel Storage", href: "/fuel-tanks", image: "/fuel-tank-1.jpg", desc: "Compliant storage for site refuelling." },

  // Custom Fabrication
  { name: "Custom Fabrication", category: "Custom Fabrication", href: "/custom-fabrication", image: "/custom-fabrication-hero.jpg", desc: "In-house design and manufacture." },
]

const categories = ["Lighting Towers", "LED Lighting", "Fuel Storage", "Custom Fabrication"]

export default function ProductsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image src="/products-hero.jpg" alt="" fill className="object-scale-down" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-16">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Products</p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">All Products</h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg mt-4">Browse our full range of mining and industrial equipment.</p>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      {categories.map((cat) => {
        const catProducts = products.filter(p => p.category === cat)
        return (
          <section key={cat} className="py-16 sm:py-20 border-b border-white/[0.06] last:border-b-0">
            <div className="max-w-[1200px] mx-auto px-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">{cat}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {catProducts.map((p) => (
                  <Link key={p.name} href={p.href} className="group relative aspect-[4/5] overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-colors">
                    <Image src={p.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <p className="text-sm font-semibold mb-1">{p.name}</p>
                      <p className="text-xs text-white/50">{p.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ===== CTA ===== */}
      <section className="py-20">
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
          <p className="text-[11px] text-white/30 text-center">Mickala Group · ABN 92 180 218 353</p>
        </div>
      </footer>
    </div>
  )
}
