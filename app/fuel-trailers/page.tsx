import Image from "next/image"
import Link from "next/link"
import { BuildYourOwn } from "@/components/build-your-own"

const models = ["MFT1100", "MFT2000"]

const techSpecs = [
  { label: "Capacity", MFT1100: "1100 L", MFT2000: "2000 L" },
  { label: "Containment", MFT1100: "110 % tank in tank", MFT2000: "110 % tank in tank" },
  { label: "Pump", MFT1100: "12 V electric", MFT2000: "12 V electric" },
  { label: "Hose", MFT1100: "15 m retractable", MFT2000: "15 m retractable" },
  { label: "Flow Meter", MFT1100: "Digital", MFT2000: "Digital" },
  { label: "Axle", MFT1100: "3 T electric brake", MFT2000: "3 T electric brake" },
  { label: "Tyres", MFT1100: "235 × 85 × 16 AT", MFT2000: "235 × 85 × 16 AT" },
  { label: "Warranty", MFT1100: "12 months", MFT2000: "12 months" },
]

const standardFeatures = [
  "Tank in tank design — 110 % containment",
  "12 V electric pump with inline filter",
  "Digital flow meter",
  "15 m retractable hose reel, auto shutoff nozzle",
  "2 × N150 batteries, charger and solar panel",
  "3 T axles, electric brakes, breakaway system",
  "Sealed and lockable storage compartment",
  "Battery isolator, emergency stop",
  "Wheel chocks and nut indicators",
  "Fire extinguisher and LED lighting",
  "235 × 85 × 16 AT tyres, spare wheel",
  "12 months manufacturer warranty",
]

export default function FuelTrailersPage() {
  return (
    <div className="bg-black text-white">
      {/* ===== STICKY NAV ===== */}
      <div className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
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
          <nav className="hidden sm:flex items-center gap-6">
            {["Overview", "Specs", "Features", "Build", "Gallery"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">
                {item}
              </a>
            ))}
          </nav>
          <a href="tel:1300642525" className="text-[11px] text-white/70 hover:text-white transition-colors tracking-wide uppercase">
            1300 642 525
          </a>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section id="overview" className="relative h-screen min-h-[600px]">
        <Image src="/fuel-trailer-site-2.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-20 sm:pb-28">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Self-Bunded Fuel Trailers
          </p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-4">
            MFT1100<br />MFT2000
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg">
            Designed and engineered for the harshest environments. Tank in tank with 110 % containment.
          </p>
        </div>
      </section>

      {/* ===== OVERVIEW STRIP ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { label: "Models", value: "MFT1100, MFT2000" },
              { label: "Capacity Range", value: "1100 – 2000 L" },
              { label: "Containment", value: "110 % tank in tank" },
              { label: "Warranty", value: "12 months" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 sm:py-10 px-6 text-center">
                <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase whitespace-nowrap">{stat.label}</p>
                <p className="text-sm sm:text-base font-semibold whitespace-nowrap">{stat.value}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section id="specs" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
                Technical Specifications
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
                Built for the<br />toughest sites.
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                Every Mickala fuel trailer is designed and manufactured in Australia.
                Tank in tank containment, integrated pump systems, and heavy-duty
                running gear — ready for mine site conditions.
              </p>
            </div>

            <div>
              {/* Model headers */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {models.map((m) => (
                  <div key={m}>
                    <p className="text-xs text-white/40 font-medium tracking-[0.08em] uppercase mb-1">Model</p>
                    <p className="text-2xl font-bold">{m}</p>
                  </div>
                ))}
              </div>

              {/* Spec table */}
              <div className="border-t border-white/[0.06]">
                {techSpecs.map((spec, i) => (
                  <div key={spec.label} className={`grid grid-cols-[140px_1fr_1fr] gap-4 py-3 ${i < techSpecs.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                    <span className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase self-center">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold">{spec.MFT1100}</span>
                    <span className="text-sm font-semibold">{spec.MFT2000}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Standard Equipment
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {standardFeatures.map((f) => (
              <div key={f} className="flex items-start gap-3 py-2">
                <span className="w-1 h-1 bg-[#DC2626] rounded-full mt-2.5 shrink-0" />
                <span className="text-sm text-white/80 leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUILD YOUR OWN ===== */}
      <section id="build" className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <BuildYourOwn />
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Gallery
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">
            See it in action.
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/fuel-trailer-site-1.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/fuel-trailer-site-2.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/fuel-trailer-site-3.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
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
            Need a fuel trailer?
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
            Talk to our team about hire, purchase, or custom configurations.
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
            <p className="text-[11px] text-white/30">Document SS-FT-001</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
