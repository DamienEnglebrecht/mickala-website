import Image from "next/image"
import Link from "next/link"

const featureList = [
  {
    title: "Heavy-Duty Construction",
    desc: "High-grade steel with robust welding and corrosion-resistant coating for long-term reliability in harsh mining environments.",
  },
  {
    title: "Compliant Fuel Storage",
    desc: "Designed to meet Australian standards for diesel storage and transport, with self-bunded containment and spill protection.",
  },
  {
    title: "Integrated Pump Systems",
    desc: "Available with 12V diesel drum pumps (50–85 L/min) with auto nozzle, flow meter, and filtration for safe refuelling.",
  },
  {
    title: "Complete Parts Support",
    desc: "Full range of genuine Mickala fuel tank parts — from breathers and caps to pumps, filters, and gauges. Parts manual available.",
  },
  {
    title: "Site-Ready Configuration",
    desc: "Solar panel ready, bunded for environmental compliance, lockable fill points, and optional GPS monitoring for fleet management.",
  },
  {
    title: "Low Maintenance Design",
    desc: "Simple, proven design with minimal moving parts and easy access to all service points for rapid field maintenance.",
  },
]

const statItems = [
  { label: "Construction", value: "Heavy-Duty" },
  { label: "Compliance", value: "Compliant" },
  { label: "Pump Ready", value: "Pump Systems" },
  { label: "Maintenance", value: "Low Maintenance" },
]

export default function FuelTanksPage() {
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
            {["Overview", "Intro", "Features", "Gallery"].map((item) => (
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
        <Image src="/fuel-tank-1.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-20 sm:pb-28">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Fuel Storage Solutions
          </p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-4">
            Fuel<br />Tanks
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg">
            Compliant, robust fuel storage for mining and industrial sites. Built to Australian standards.
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

      {/* ===== INTRO ===== */}
      <section id="intro" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
                Built for Site
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
                Reliable storage for<br />the toughest sites.
              </h2>
              <p className="text-sm text-white/50 leading-relaxed">
                Mickala fuel tanks are designed and manufactured to meet the demands of mining,
                construction and industrial operations. Built from high-grade materials with
                compliant bunding and integrated pump systems, they deliver safe, reliable diesel
                storage wherever you need it.
              </p>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                Whether you need a standalone tank for site refuelling or an integrated solution
                with pumps, filtration and monitoring, Mickala has you covered.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/fuel-tank-2.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">
            Engineered for<br />the field.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {featureList.map((f) => (
              <div key={f.title} className="flex items-start gap-3 py-2">
                <span className="w-1 h-1 bg-[#DC2626] rounded-full mt-2.5 shrink-0" />
                <div>
                  <span className="text-sm text-white font-semibold">{f.title}</span>
                  <p className="text-[13px] text-white/50 leading-relaxed mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Gallery
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">
            See the hardware.
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/fuel-tank-1.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image src="/fuel-tank-2.jpg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
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
            Need a fuel tank?
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
            Talk to our team about your fuel storage requirements — from standard tanks to custom solutions.
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
