import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Download } from "lucide-react"
import { ModelCards } from "@/components/model-cards"

type ModelData = {
  name: string
  led: string
  desc: string
  image: string
  slug: string
  specSheet?: string
  lightSim?: string
}

type CategoryData = {
  title: string
  description: string
  heroImage: string
  statLine: string
  models: ModelData[]
  specs: string[][]
  features: string[]
}

const categorySlug = (name: string) => name.toLowerCase().replace(/[\s-]+/g, "-")

const categories: Record<string, CategoryData> = {
  "single-axle": {
    title: "Single Axle",
    description: "Compact, towable and quick to deploy. Ideal for fast-moving worksites that need reliable area lighting without the footprint.",
    heroImage: "/single-axle-hero.jpg",
    statLine: "4 models · 1200W – 2560W · Rapid deployment",
    models: [
      { name: "MLT 1280-4LED", led: "1200W", desc: "Entry-level single axle. Compact and lightweight for fast-moving worksites.", image: "/product-images/doc_f9ffe13e2ce8_mlt-1280-4led-single-axle-tower.png", slug: "single-axle-1280-4led", specSheet: "/spec-sheets/single-axle-1280-4led.pdf", lightSim: "/spec-sheets/single-axle-1280-4led-lightsim.pdf" },
      { name: "MLT 1280-6LED", led: "1200W", desc: "Higher output with 6-LED array for medium-sized work areas.", image: "/product-images/doc_675019b64b3f_mlt-1280-6led-single-axle-tower.png", slug: "single-axle-1280-6led", specSheet: "/spec-sheets/single-axle-1280-6led.pdf", lightSim: "/spec-sheets/single-axle-1280-6led-lightsim.pdf" },
      { name: "MLT 1920-LED", led: "1920W", desc: "Maximum illumination for large-scale operations on a single axle.", image: "/product-images/doc_9db394285565_mlt-1920-led-single-axle-tower.png", slug: "single-axle-1920-led", specSheet: "/spec-sheets/single-axle-1920-led.pdf", lightSim: "/spec-sheets/single-axle-1920-led-lightsim.pdf" },
      { name: "MLT 2560-LED", led: "2560W", desc: "Extreme output for the largest work sites. Single axle, maximum coverage.", image: "/product-images/doc_ca1d46669f30_mlt-2560-led-single-axle-tower.png", slug: "single-axle-2560-led", specSheet: "/spec-sheets/single-axle-2560-led.pdf", lightSim: "/spec-sheets/single-axle-2560-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "1200W – 2560W"],
      ["Mast Type", "Telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Jump start receptacle — no battery explosion risk",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Air pre-cleaner — longer filter life in dusty conditions",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
  "dual-axle": {
    title: "Dual Axle",
    description: "Heavy-duty stability for large coverage areas. Built for the toughest mining and construction environments.",
    heroImage: "/product-dual-axle.png",
    statLine: "3 models · 2560W – 3840W · Heavy-duty stability",
    models: [
      { name: "MLT 2560-LED", led: "2560W", desc: "Dual axle stability with high-output LED array for demanding conditions.", image: "/product-images/doc_caaa568cee08_mlt-2560-led-dual-axle-tower.png", slug: "dual-axle-2560-led", specSheet: "/spec-sheets/dual-axle-2560-led.pdf", lightSim: "/spec-sheets/dual-axle-2560-led-lightsim.pdf" },
      { name: "MLT 3200-LED", led: "3200W", desc: "High-output lighting for large industrial sites.", image: "/product-images/doc_0db128540ed1_mlt-3200-led-dual-axle-tower.png", slug: "dual-axle-3200-led", specSheet: "/spec-sheets/dual-axle-3200-led.pdf", lightSim: "/spec-sheets/dual-axle-3200-led-lightsim.pdf" },
      { name: "MLT 3840-LED", led: "3840W", desc: "Maximum coverage and illumination — the flagship dual axle model.", image: "/product-images/doc_830a8f6c08db_mlt-3840-led-dual-axle-tower.png", slug: "dual-axle-3840-led", specSheet: "/spec-sheets/dual-axle-3840-led.pdf", lightSim: "/spec-sheets/dual-axle-3840-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "2560W – 3840W"],
      ["Mast Type", "Telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Jump start receptacle — no battery explosion risk",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Air pre-cleaner — longer filter life in dusty conditions",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
  "sled-mount": {
    title: "Sled Mount",
    description: "Skid-mounted for crane and forklift relocation around fixed sites. No wheels, no fuss — just dependable illumination.",
    heroImage: "/product-sled-mount.png",
    statLine: "3 models · 2560W – 3840W · Skid-mounted",
    models: [
      { name: "MLS 2560-LED", led: "2560W", desc: "Entry-level sled mount. Compact skid design for crane and forklift deployment.", image: "/product-images/doc_9ba284db2a30_mls-2560-led-sled-mounted-tower.png", slug: "sled-mount-2560-led", specSheet: "/spec-sheets/sled-mount-2560-led.pdf", lightSim: "/spec-sheets/sled-mount-2560-led-lightsim.pdf" },
      { name: "MLS 3200-LED", led: "3200W", desc: "High-output sled mount for remote sites requiring maximum uptime.", image: "/product-images/doc_fdeca1e9b4f9_mls-3200-led-sled-mounted-tower.png", slug: "sled-mount-3200-led", specSheet: "/spec-sheets/sled-mount-3200-led.pdf", lightSim: "/spec-sheets/sled-mount-3200-led-lightsim.pdf" },
      { name: "MLS 3840-LED", led: "3840W", desc: "Maximum illumination for remote operations. The ultimate sled mount tower.", image: "/product-images/doc_abd280e3fc3c_mls-3840-led-sled-mounted-tower.png", slug: "sled-mount-3840-led", specSheet: "/spec-sheets/sled-mount-3840-led.pdf", lightSim: "/spec-sheets/sled-mount-3840-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "2560W – 3840W"],
      ["Mast Type", "Telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Jump start receptacle — no battery explosion risk",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Air pre-cleaner — longer filter life in dusty conditions",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
  "long-range": {
    title: "Long Range",
    description: "Extended mast and long-throw optics for high-mast applications and expansive open-cut operations.",
    heroImage: "/product-long-range.png",
    statLine: "2 models · 4800W – 7200W · High-mast ready",
    models: [
      { name: "MLR 4800-LED", led: "4800W", desc: "Extended runtime and coverage for large-scale operations.", image: "/product-images/doc_8391d0d6a389_mlr-4800-led-sled-mounted-tower.png", slug: "long-range-4800-led", specSheet: "/spec-sheets/long-range-4800-led.pdf", lightSim: "/spec-sheets/long-range-4800-led-lightsim.pdf" },
      { name: "MLR 7200-LED", led: "7200W", desc: "Maximum coverage for the largest mining and industrial sites.", image: "/product-images/doc_b1045367b1fd_mlr-7200-led-sled-mounted-tower.png", slug: "long-range-7200-led", specSheet: "/spec-sheets/long-range-7200-led.pdf", lightSim: "/spec-sheets/long-range-7200-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "4800W – 7200W"],
      ["Mast Type", "Extended telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Long-range optics for high-mast applications",
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
}

export default async function LightingTowerPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const cat = categories[slug]
  if (!cat) notFound()

  const navItems = ["Overview", "Models", "Specs", "Features", "Downloads"]

  return (
    <div className="bg-black text-white">
      {/* ===== STICKY NAV ===== */}
      <div className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-white tracking-tight">Mickala</Link>
          <nav className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">{item}</a>
            ))}
          </nav>
          <a href="tel:1300642525" className="text-[11px] text-white/70 hover:text-white transition-colors tracking-wide uppercase">1300 642 525</a>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section id="overview" className="relative h-screen min-h-[600px]">
        <Image src={cat.heroImage} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-32 sm:pb-40">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">{cat.title} Lighting Towers</p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-4">{cat.title}</h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg">{cat.description}</p>
        </div>
      </section>

      {/* ===== STAT STRIP ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { label: "Models", value: String(cat.models.length) },
              { label: "Wattage", value: cat.models[0].led + " – " + cat.models[cat.models.length - 1].led.split(" – ").pop() },
              { label: "Voltage", value: "ELV 24VDC" },
              { label: "Warranty", value: "12 months" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 sm:py-10 px-6 text-center">
                <p className="text-2xl sm:text-3xl font-bold mb-1 whitespace-nowrap">{stat.value}</p>
                <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODELS ===== */}
      <section id="models" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Models</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">Choose your configuration.</h2>
          <ModelCards models={cat.models} />
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section id="specs" className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Technical Specifications</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-6">Built for the toughest sites.</h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">Every Mickala lighting tower meets the highest mining safety and quality standards.</p>
            </div>
            <div>
              <div className="border-t border-white/[0.06]">
                {cat.specs.map((spec, i) => (
                  <div key={spec[0]} className={`flex justify-between py-3 ${i < cat.specs.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                    <span className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase">{spec[0]}</span>
                    <span className="text-sm font-semibold text-right ml-6">{spec[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Standard Features</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">Everything you need.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {cat.features.map((f) => (
              <div key={f} className="flex items-start gap-3 py-2">
                <span className="w-1 h-1 bg-[#DC2626] rounded-full mt-2.5 shrink-0" />
                <span className="text-sm text-white/80 leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOWNLOADS ===== */}
      <section id="downloads" className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Downloads</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">Spec sheets &amp; light simulations.</h2>
          <div className="space-y-3">
            {cat.models.map((m) => (
              <div key={m.name} className="flex items-center justify-between py-4 border-b border-white/[0.06]">
                <div>
                  <p className="text-sm font-semibold">{m.name}</p>
                  <p className="text-[11px] text-white/40">{m.led}</p>
                </div>
                <div className="flex items-center gap-3">
                  {m.specSheet && (
                    <a href={m.specSheet} download className="inline-flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">
                      <Download className="h-3 w-3" /> Spec Sheet
                    </a>
                  )}
                  {m.lightSim && (
                    <a href={m.lightSim} download className="inline-flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">
                      <Download className="h-3 w-3" /> Light Sim
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {cat.models.some((m) => m.specSheet) && (
            <div className="mt-8 text-center">
              <a
                href={`/spec-sheets?category=${slug}`}
                className="inline-flex items-center text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold"
              >
                View all on spec sheets page →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Get in touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">Need a lighting tower?</h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">Talk to our team about purchase, hire, or custom configurations.</p>
          <div className="flex items-center justify-center gap-6">
            <a href="tel:1300642525" className="text-sm text-white/70 hover:text-white transition-colors">1300 642 525</a>
            <span className="text-white/[0.06]">/</span>
            <Link href="/quote" className="text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold">Request a Quote →</Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-[11px] text-white/30">Mickala Group · ABN 92 180 218 353</p>
            <p className="text-[11px] text-white/30">21 Caterpillar Drive, Paget QLD 4740</p>
            <p className="text-[11px] text-white/30">1300 642 525</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }))
}
