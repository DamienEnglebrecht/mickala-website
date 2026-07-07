import Image from "next/image"
import Link from "next/link"

const models = [
  { id: "MFT1100", capacity: "1100 L" },
  { id: "MFT2000", capacity: "2000 L" },
]

const specs: Record<string, { label: string; value: string }[]> = {
  MFT1100: [
    { label: "Capacity", value: "1100 L" },
    { label: "Containment", value: "110 % (tank in tank)" },
    { label: "Axle", value: "3 T electric brake" },
    { label: "Tyres", value: "235 × 85 × 16 AT" },
    { label: "Pump", value: "12 V electric" },
    { label: "Hose", value: "15 m retractable" },
    { label: "Flow Meter", value: "Digital" },
    { label: "Batteries", value: "2 × N150 + solar" },
  ],
  MFT2000: [
    { label: "Capacity", value: "2000 L" },
    { label: "Containment", value: "110 % (tank in tank)" },
    { label: "Axle", value: "3 T electric brake" },
    { label: "Tyres", value: "235 × 85 × 16 AT" },
    { label: "Pump", value: "12 V electric" },
    { label: "Hose", value: "15 m retractable" },
    { label: "Flow Meter", value: "Digital" },
    { label: "Batteries", value: "2 × N150 + solar" },
  ],
}

const comparisonRows = [
  { feature: "Capacity", MFT1100: "1100 L", MFT2000: "2000 L" },
  { feature: "Containment", MFT1100: "110 %", MFT2000: "110 %" },
  { feature: "Pump", MFT1100: "12 V electric", MFT2000: "12 V electric" },
  { feature: "Hose Reel", MFT1100: "15 m", MFT2000: "15 m" },
  { feature: "Flow Meter", MFT1100: "Digital", MFT2000: "Digital" },
  { feature: "Axle Rating", MFT1100: "3 T", MFT2000: "3 T" },
  { feature: "Brakes", MFT1100: "Electric + breakaway", MFT2000: "Electric + breakaway" },
  { feature: "Batteries", MFT1100: "2 × N150", MFT2000: "2 × N150" },
  { feature: "Solar Charging", MFT1100: "Standard", MFT2000: "Standard" },
  { feature: "Filter", MFT1100: "In-line diesel", MFT2000: "In-line diesel" },
  { feature: "Tyres", MFT1100: "235 × 85 × 16 AT", MFT2000: "235 × 85 × 16 AT" },
  { feature: "Fire Extinguisher", MFT1100: "Standard", MFT2000: "Standard" },
  { feature: "Warranty", MFT1100: "12 months", MFT2000: "12 months" },
]

const features = [
  "Tank in tank — 110 % containment",
  "12 V electric pump with filter",
  "Digital flow meter",
  "15 m retractable hose, auto shutoff nozzle",
  "2 × N150 batteries, charger, solar panel",
  "3 T axles, electric brakes, breakaway",
  "Sealed, lockable storage",
  "Battery isolator",
  "Emergency stop",
  "Wheel chocks, nut indicators",
  "Fire extinguisher",
  "LED lighting package",
  "235 × 85 × 16 AT tyres + spare",
  "12 months warranty",
]

const gallery = [
  { src: "/fuel-trailer-site-1.jpg", alt: "Fuel trailer side view" },
  { src: "/fuel-trailer-site-2.jpg", alt: "Fuel trailer on site" },
  { src: "/fuel-trailer-site-3.jpg", alt: "Fuel trailer" },
]

export default function FuelTrailersSpec() {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5]">
      {/* Back link */}
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <Link href="/" className="text-xs text-[#888888] hover:text-[#F5F5F5] transition-colors tracking-wider uppercase">
          ← Back
        </Link>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="relative h-[60vh] min-h-[450px]">
        <Image
          src="/fuel-trailer-site-2.jpg"
          alt="Mickala self-bunded fuel trailer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-12">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.12em] uppercase mb-2">
            Specification Sheet
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-3">
            MFT1100<br />MFT2000
          </h1>
          <p className="text-base sm:text-lg text-[#888888] max-w-xl">
            Self-bunded trailer mounted fuel tanks. Designed and engineered for the harshest environments.
          </p>
        </div>
      </section>

      {/* ==================== OVERVIEW ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.12em] uppercase mb-3">
              Overview
            </p>
            <p className="text-sm sm:text-base text-[#888888] leading-relaxed">
              Mickala self-bunded fuel trailers carry 1100 to 2000 litres of diesel with full spill containment.
              Tank-in-tank design, integrated 12 V pump systems, and rugged running gear built for Australian mine sites.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {models.map((m) => (
              <div key={m.id}>
                <p className="text-[11px] text-[#555555] font-medium tracking-[0.08em] uppercase mb-1">Model</p>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight">{m.id}</p>
                <p className="text-sm text-[#888888] mt-1">{m.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SPECIFICATIONS ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 sm:py-16">
        <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.12em] uppercase mb-1">
          Specifications
        </p>
        <div className="grid md:grid-cols-2 gap-0 mt-8">
          {(["MFT1100", "MFT2000"] as const).map((id) => (
            <div key={id} className="border-t border-[#2A2A2A] pt-4">
              <p className="text-sm font-semibold mb-4">{id}</p>
              <div>
                {specs[id].map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between py-3 ${i < specs[id].length - 1 ? "border-b border-[#2A2A2A]" : ""}`}
                  >
                    <span className="text-[11px] text-[#888888] font-medium tracking-[0.08em] uppercase">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-right ml-6">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== COMPARISON TABLE ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 sm:py-16">
        <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.12em] uppercase mb-1">
          Model Comparison
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="py-3 pr-6 text-left text-[11px] text-[#888888] font-medium tracking-[0.08em] uppercase w-[40%]">
                  Feature
                </th>
                <th className="py-3 px-6 text-left text-[11px] text-[#888888] font-medium tracking-[0.08em] uppercase w-[30%]">
                  MFT1100
                </th>
                <th className="py-3 px-6 text-left text-[11px] text-[#888888] font-medium tracking-[0.08em] uppercase w-[30%]">
                  MFT2000
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} className={`border-b border-[#1A1A1A] ${i % 2 === 0 ? "" : ""} hover:bg-[#1A1A1A] transition-colors`}>
                  <td className="py-3 pr-6 text-xs text-[#888888]">{row.feature}</td>
                  <td className="py-3 px-6 text-xs font-semibold">{row.MFT1100}</td>
                  <td className="py-3 px-6 text-xs font-semibold">{row.MFT2000}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ==================== STANDARD FEATURES ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 sm:py-16">
        <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.12em] uppercase mb-1">
          Standard Equipment
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mt-6">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 shrink-0" />
              <span className="text-sm text-[#F5F5F5] leading-snug">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== GALLERY ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 sm:py-16">
        <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.12em] uppercase mb-1">
          Gallery
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          {gallery.map((img) => (
            <div key={img.src} className="aspect-[4/3] relative overflow-hidden rounded-sm">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 sm:py-20">
        <div className="border-t border-[#2A2A2A] pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-sm text-[#888888]">Need more information?</p>
              <p className="text-lg font-semibold mt-1">Speak to our team.</p>
            </div>
            <div className="flex gap-4">
              <a href="tel:1300642525" className="text-sm text-[#F5F5F5] hover:text-[#DC2626] transition-colors">
                1300 642 525
              </a>
              <span className="text-[#2A2A2A]">/</span>
              <Link href="/quote" className="text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold">
                Request a Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-[#2A2A2A]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#555555]">
            <p>Mickala Group · ABN 92 180 218 353</p>
            <p>21 Caterpillar Drive, Paget QLD 4740</p>
            <p>Document: SS-FT-001 · © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
