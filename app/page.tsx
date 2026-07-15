import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const products = [
  { name: "Single Axle", href: "/lighting-towers/single-axle", image: "/product-single-axle.webp", desc: "Compact, towable. Fast deployment for smaller sites." },
  { name: "Dual Axle", href: "/lighting-towers/dual-axle", image: "/product-dual-axle.webp", desc: "Heavy-duty stability. Maximum coverage." },
  { name: "Sled Mount", href: "/lighting-towers/sled-mount", image: "/product-sled-mount.webp", desc: "Skid-mounted. Crane and forklift deployable." },
  { name: "Long Range", href: "/lighting-towers/long-range", image: "/product-long-range.webp", desc: "Extended mast. Long-throw optics." },
]

const otherProducts = [
  { name: "Fuel Trailers", href: "/fuel-trailers", image: "/product-fuel-trailer.png", desc: "Self-bunded. 1100 to 2000 L capacity." },
  { name: "Fuel Tanks", href: "/fuel-tanks", image: "/fuel-tank-1.jpg", desc: "Compliant storage for site refuelling." },
  { name: "Custom Fabrication", href: "/custom-fabrication", image: "/product-custom-fabrication.webp", desc: "In-house design and manufacture." },
]

const clients = ["/anglo-american.png", "/bhp.png", "/glencore.png", "/whitehaven.png", "/yancoal.png", "/golding.png", "/bloomfield.png", "/terracom.png"]

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px]">
        <Image src="/hero-towers.webp" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-20 sm:pb-28">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Australian-Owned OEM Since 2007</p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-4">LED Lighting Towers</h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg mb-8">Extra-low-voltage lighting towers designed and manufactured in Australia. Trusted by 200+ mine sites.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/products" className="inline-flex items-center px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full">Explore Products</Link>
            <Link href="/tower-selector" className="inline-flex items-center px-6 py-3 border border-[#DC2626]/50 hover:border-[#DC2626] transition-colors text-sm font-semibold rounded-full text-[#DC2626]">AI Tower Selector →</Link>
            <a href="tel:1300642525" className="inline-flex items-center px-6 py-3 border border-white/20 hover:border-white/40 transition-colors text-sm font-semibold rounded-full">Call 1300 642 525</a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR - Client Logos (above fold) ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <p className="text-[11px] text-white/30 font-medium tracking-[0.15em] uppercase text-center mb-6">Trusted by Australia&apos;s largest mining operations</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {clients.map((logo) => (
              <div key={logo} className="relative h-8 w-24 opacity-50 hover:opacity-100 transition-opacity">
                <Image src={logo} alt="" fill className="object-contain brightness-0 invert" />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-white/20 text-center mt-6">21 Caterpillar Drive, Paget QLD 4740 · ABN 92 180 218 353 · ISO 9001 Certified</p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { label: "Established", value: "2007" },
              { label: "Towers Manufactured", value: "2000+" },
              { label: "Mine Sites Served", value: "200+" },
              { label: "In-House Design", value: "100%" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 sm:py-10 px-6 text-center">
                <p className="text-2xl sm:text-3xl font-bold mb-1 whitespace-nowrap">{stat.value}</p>
                <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIGHTING TOWERS ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Products</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">A tower for every site.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((p) => (
              <Link key={p.name} href={p.href} className="group relative aspect-[4/5] overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-colors">
                <Image src={p.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <p className="text-sm font-semibold mb-1">{p.name}</p>
                  <p className="text-xs text-white/50">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/lighting-towers/single-axle" className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors">View all specifications →</Link>
          </div>
        </div>
      </section>

      {/* ===== AI TOOLS PROMO ===== */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4 text-center">Tools</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4 text-center">Find the right tower in seconds.</h2>
          <p className="text-sm text-white/50 text-center max-w-lg mx-auto mb-10">Tell us your site requirements and our AI recommends the exact tower, coverage plan and estimated cost.</p>
          <div className="grid sm:grid-cols-2 max-w-2xl mx-auto gap-3">
            <Link href="/tower-selector" className="group p-6 border border-white/[0.06] hover:border-[#DC2626]/50 transition-colors text-center">
              <p className="text-sm font-semibold mb-1">AI Tower Selector</p>
              <p className="text-xs text-white/50">Lighting requirements → tower recommendation</p>
            </Link>
            <Link href="/tco-calculator" className="group p-6 border border-white/[0.06] hover:border-[#DC2626]/50 transition-colors text-center">
              <p className="text-sm font-semibold mb-1">TCO / ROI Calculator</p>
              <p className="text-xs text-white/50">Compare ELV 24VDC vs competitors</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LED LIGHTING ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-square">
              <Image src="/led-light-hero.jpg" alt="" fill className="object-cover rounded-lg" />
            </div>
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">LED Lighting</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">For the world&apos;s toughest conditions.</h2>
              <p className="text-sm text-white/50 leading-relaxed mb-6">DCB95 (Orca), DCB48/66 (Barracuda), DCB24 (Snapper), DCB9 (Piranha), and Dark Licht — a full range of industrial LED lighting engineered for mining, construction, and infrastructure.</p>
              <Link href="/production-quality" className="inline-flex items-center text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold">Explore the range →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Case Studies</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">Proven in the field.</h2>
          <p className="text-sm text-white/50 leading-relaxed mb-10 max-w-lg">2000+ towers deployed across 200+ mine sites. Here&apos;s what that looks like in practice.</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { title: "BMA Peak Downs", desc: "95 towers on a single site. ELV 24VDC reliability in one of Australia's largest open-cut coal mines.", stat: "95 towers · 0 downtime incidents" },
              { title: "Glencore Hail Creek", desc: "42 towers covering 30+ hectares of active mining operations. TCO reduced 35% vs 240V alternatives.", stat: "42 towers · 35% TCO reduction" },
              { title: "MacKellar Carmichael", desc: "30 towers deployed for a greenfield mine build. Logistics, staging, and site-wide coverage managed end-to-end.", stat: "30 towers · Greenfield deployment" },
            ].map((cs) => (
              <div key={cs.title} className="p-6 border border-white/[0.06] hover:border-white/[0.15] transition-colors">
                <p className="text-sm font-semibold mb-2">{cs.title}</p>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{cs.desc}</p>
                <p className="text-[11px] text-[#DC2626] tracking-wide">{cs.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OTHER PRODUCTS ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Beyond Lighting</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">Same engineering. Wider capability.</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {otherProducts.map((p) => (
              <Link key={p.name} href={p.href} className="group relative aspect-[4/3] overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-colors">
                <Image src={p.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm font-semibold mb-1">{p.name}</p>
                  <p className="text-xs text-white/50">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">About</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">Innovation through continuous improvement.</h2>
            </div>
            <div className="space-y-4 text-sm text-white/50 leading-relaxed">
              <p>Founded in 2007, Mickala is an Australian-owned OEM manufacturer of extra-low-voltage LED lighting towers. We design and manufacture 100% of our assets in-house — giving us total control over quality, IP, and reliability.</p>
              <p>Today, our towers are deployed across 200+ mine sites in Australia and beyond, supported 24/7 by factory-trained technicians.</p>
              <Link href="/our-story" className="inline-flex items-center text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold mt-2">Read our story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Get in touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">Need lighting for your site?</h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">Talk to our team about lighting towers, LED lighting, fuel trailers, or custom fabrication.</p>
          <div className="flex items-center justify-center gap-6">
            <a href="tel:1300642525" className="text-sm text-white/70 hover:text-white transition-colors">1300 642 525</a>
            <span className="text-white/[0.06]">/</span>
            <Link href="/quote" className="text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold">Request a Quote →</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
