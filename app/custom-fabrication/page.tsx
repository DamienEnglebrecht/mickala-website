import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const statItems = [
  { label: "Cutting", value: "Rotary Laser" },
  { label: "Capacity", value: "6m 3kW Laser" },
  { label: "Forming", value: "CNC Press" },
  { label: "Joining", value: "Robotic Welding" },
]

const capabilities = [
  "Rotary Laser Cutter — Precision cutting of complex geometries with minimal material waste",
  "6m x 3kW Laser Cutter — Full-length sheet and plate processing up to 6 metres",
  "CNC Press Brake — Programmable precision bending with repeatable accuracy",
  "4m CNC Bending Machine — Heavy-duty bending for long structural sections",
  "CNC Machining Centre — Multi-axis milling and turning for complex parts",
  "Robotic & Laser Welding — Automated welding for consistent, high-strength welds",
]

export default function CustomFabricationPage() {
  return (
    <div className="bg-black text-white">
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section id="overview" className="relative h-screen min-h-[600px]">
        <Image src="/custom-fabrication-hero.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-20 sm:pb-28">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            In-House Manufacturing
          </p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-4">
            Custom<br />Fabrication
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg">
            World-class design and manufacturing — in-house, under one roof.
          </p>
        </div>
      </section>

      {/* ===== STAT STRIP ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {statItems.map((stat) => (
              <div key={stat.label} className="py-8 sm:py-10 px-6 text-center">
                <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase whitespace-nowrap">{stat.label}</p>
                <p className="text-sm sm:text-base font-semibold whitespace-nowrap">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN TEXT ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
                Our Capability
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
                Engineered for<br />the toughest conditions.
              </h2>
            </div>
            <div>
              <p className="text-sm text-white/80 leading-relaxed">
                Mickala have the latest technology that can design and manufacture to world class standards. Our machines include rotary laser cutter, 6 metre 3kw laser, CNC press, 4m CNC bending machine, CNC machining, robotic welding, laser welding.
              </p>
              <p className="mt-6 text-sm text-white/50 leading-relaxed">
                From large structural fabrications to precision-machined components, every piece is designed, cut, formed and finished in our Mackay facility — giving us total control over quality, lead time and cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section id="capabilities" className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Equipment
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">
            Our manufacturing<br />capabilities.
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {capabilities.map((c) => (
              <div key={c} className="flex items-start gap-3 py-2">
                <span className="w-1 h-1 bg-[#DC2626] rounded-full mt-2.5 shrink-0" />
                <span className="text-sm text-white/80 leading-snug">{c}</span>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mt-12">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/custom-fabrication-2.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/custom-fabrication-3.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/custom-fabrication-hero.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Get in touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            Need something built?
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
            From one-off prototypes to production runs — if you can spec it, our workshop can build it.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href="tel:1300642525" className="text-sm text-white/70 hover:text-white transition-colors">
              1300 642 525
            </a>
            <span className="text-white/[0.06]">/</span>
            <Link href="/quote" className="text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold">
              Request a Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-[11px] text-white/30">Mickala Group · ABN 92 180 218 353</p>
            <p className="text-[11px] text-white/30">21 Caterpillar Drive, Paget QLD 4740</p>
            <p className="text-[11px] text-white/30">In-House Manufacturing</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
