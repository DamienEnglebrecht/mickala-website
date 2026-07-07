import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const products = [
  {
    slug: "orca",
    title: "Orca",
    subtitle: "High-Power LED Floodlight",
    description: "High-performance industrial LED floodlight engineered for the world's toughest mine sites and infrastructure projects.",
    heroImage: "/orca-light.jpg",
    statLine: "300W – 800W · 46,200 – 111,300 lm · IP67",
    models: [
      { name: "Orca 300", label: "300W", image: "/orca-light.jpg" },
      { name: "Orca 450", label: "450W", image: "/orca-light.jpg" },
      { name: "Orca 600", label: "600W", image: "/orca-light.jpg" },
      { name: "Orca 800", label: "800W", image: "/orca-light.jpg" },
    ],
    specs: [
      ["Power Range", "300W | 450W | 600W | 800W"],
      ["Luminous Flux", "46,200 – 111,300 lm"],
      ["Efficacy", "139 lm/W"],
      ["Colour Temp", "3,000K / 4,000K / 5,700K"],
      ["Ingress Protection", "IP67, IK10 rated"],
      ["Voltage", "24V DC / 100-277V AC / 347-480V AC"],
      ["Housing", "Die-cast aluminium, tempered glass"],
      ["Warranty", "5 years"],
    ],
    features: [
      "High-power LED floodlight for mining and heavy industrial",
      "Multiple beam angle options: 30°, 60°, 90°",
      "Surge protection: 10 kV",
      "Pole, wall, ground, and trunnion bracket mounting",
      "IP67 ingress protection — dust and watertight",
      "IK10 impact rating — vandal-resistant",
      "Applications: Mining, heavy industrial, ports, infrastructure",
    ],
  },
  {
    slug: "barracuda",
    title: "Barracuda",
    subtitle: "Medium-Power LED Floodlight",
    description: "Versatile medium-power LED floodlight for construction, mining, and general industrial area lighting.",
    heroImage: "/barracuda-light.jpg",
    statLine: "120W – 320W · 19,650 – 42,000 lm · IP67",
    models: [
      { name: "Barracuda 120", label: "120W", image: "/barracuda-light.jpg" },
      { name: "Barracuda 200", label: "200W", image: "/barracuda-light.jpg" },
      { name: "Barracuda 320", label: "320W", image: "/barracuda-light.jpg" },
    ],
    specs: [
      ["Power Range", "120W | 200W | 320W"],
      ["Luminous Flux", "19,650 – 42,000 lm"],
      ["Efficacy", "131 lm/W"],
      ["Colour Temp", "3,000K / 4,000K / 5,700K"],
      ["Ingress Protection", "IP67, IK10 rated"],
      ["Voltage", "24V DC / 100-277V AC / 347-480V AC"],
      ["Housing", "Die-cast aluminium, tempered glass"],
      ["Warranty", "5 years"],
    ],
    features: [
      "Medium-power LED floodlight for versatile applications",
      "DCB48 / DCB66 compatible",
      "Pole, wall, and ground mounting options",
      "IP67 ingress protection",
      "IK10 impact rating",
      "Applications: Construction, mining, general industrial",
    ],
  },
  {
    slug: "snapper",
    title: "Snapper",
    subtitle: "Modular Multi-Head LED Light",
    description: "Modular multi-head LED lighting system for large area illumination — up to 12 heads per fixture.",
    heroImage: "/snapper-light.jpg",
    statLine: "170W – 1,200W · 19,500 – 168,000 lm · IP66",
    models: [
      { name: "Snapper 2-head", label: "170W", image: "/snapper-light.jpg" },
      { name: "Snapper 4-head", label: "400W", image: "/snapper-light.jpg" },
      { name: "Snapper 8-head", label: "800W", image: "/snapper-light.jpg" },
      { name: "Snapper 12-head", label: "1,200W", image: "/snapper-light.jpg" },
    ],
    specs: [
      ["Power Range", "170W – 1,200W (multi-head config)"],
      ["Luminous Flux", "19,500 – 168,000 lm"],
      ["Efficacy", "Up to 140 lm/W"],
      ["Colour Temp", "3,000K / 4,000K / 5,700K"],
      ["Ingress Protection", "IP66, IK07 rated"],
      ["Voltage", "24V DC / 100-277V AC"],
      ["Housing", "Aluminium with separate driver box"],
      ["Warranty", "5 years"],
    ],
    features: [
      "Modular multi-head design — up to 12 heads per fixture",
      "Massive light output for large area illumination",
      "Separate driver box for easier installation and maintenance",
      "Multiple beam angle configurations",
      "Ideal for stadiums, large areas, high-bay, and mining",
    ],
  },
  {
    slug: "piranha",
    title: "Piranha",
    subtitle: "Compact High-Output LED Light",
    description: "Compact high-output LED light for off-road vehicles, mining equipment, and confined spaces.",
    heroImage: "/piranha-light.jpg",
    statLine: "55W – 70W · 6,100 – 8,400 lm · IP69K",
    models: [
      { name: "Piranha 55", label: "55W", image: "/piranha-light.jpg" },
      { name: "Piranha 70", label: "70W", image: "/piranha-light.jpg" },
    ],
    specs: [
      ["Power Range", "55W | 70W"],
      ["Luminous Flux", "6,100 – 8,400 lm"],
      ["Efficacy", "Up to 120 lm/W"],
      ["Colour Temp", "3,000K / 4,000K / 5,700K"],
      ["Ingress Protection", "IP69K, IK10 rated"],
      ["Voltage", "9-60V DC (wide input)"],
      ["Housing", "Marine-grade aluminium, stainless steel hardware"],
      ["Warranty", "5 years"],
    ],
    features: [
      "Ultra-compact design for tight spaces",
      "Wide input voltage range 9-60V DC",
      "IP69K — highest ingress protection, steam-cleanable",
      "IK10 impact rated",
      "Marine-grade aluminium with stainless steel hardware",
      "Applications: Off-road vehicles, mining equipment, confined spaces",
    ],
  },
  {
    slug: "dark-licht",
    title: "Dark Licht",
    subtitle: "Premium Architectural & Industrial LED",
    description: "German-engineered, premium architectural and industrial LED lighting — built for Australian conditions.",
    heroImage: "/dark-licht.jpg",
    statLine: "320W – 1,800W · Architectural + Industrial · German engineering",
    models: [
      { name: "DL1-320", label: "320W", image: "/dark-licht.jpg" },
      { name: "DL1-400", label: "400W", image: "/dark-licht.jpg" },
      { name: "DL1-600", label: "600W", image: "/dark-licht.jpg" },
      { name: "DL2-800", label: "800W", image: "/dark-licht.jpg" },
      { name: "DL2-1200", label: "1,200W", image: "/dark-licht.jpg" },
      { name: "DL3-1800", label: "1,800W", image: "/dark-licht.jpg" },
    ],
    specs: [
      ["Power Range", "320W – 1,800W"],
      ["Service Life", "LM80 | up to 192,000 hrs"],
      ["Colour Temp", "Multiple CCT options"],
      ["Driver", "Multiple programmable drivers"],
      ["Housing", "Powder-coated aluminium"],
      ["Design", "German-engineered"],
    ],
    features: [
      "Premium architectural and industrial LED lighting",
      "German-engineered, built for Australian conditions",
      "Multiple CCT and driver options for custom configurations",
      "Up to 192,000 hours service life (LM80)",
      "Powder-coated aluminium housing",
      "Applications: Architecture, industrial, high-bay lighting",
    ],
  },
]

const navItems = ["Overview", "Models", "Specs", "Features"]

export default async function LEDProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

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
        <Image src={product.heroImage} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-32 sm:pb-40">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">{product.title}</p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-4">{product.title}</h1>
          <p className="text-sm sm:text-base text-white/60 max-w-lg">{product.description}</p>
        </div>
      </section>

      {/* ===== STAT STRIP ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { label: "Models", value: String(product.models.length) },
              { label: "Power Range", value: product.models[0].label + " – " + product.models[product.models.length - 1].label },
              { label: "Warranty", value: "5 years" },
              { label: "Series", value: product.title },
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
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">{product.title} range.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.models.map((m) => (
              <div key={m.name} className="group relative aspect-[4/3] overflow-hidden bg-black border border-white/[0.06]">
                <Image src={m.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <p className="text-sm font-semibold mb-1">{m.name}</p>
                  <p className="text-xs text-white/50">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section id="specs" className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Technical Specifications</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-6">{product.subtitle}</h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">{product.description}</p>
            </div>
            <div>
              <div className="border-t border-white/[0.06]">
                {product.specs.map((spec, i) => (
                  <div key={spec[0]} className={`flex justify-between py-3 ${i < product.specs.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
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
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Features</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10">Key features.</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {product.features.map((f) => (
              <div key={f} className="flex items-start gap-3 py-2">
                <span className="w-1 h-1 bg-[#DC2626] rounded-full mt-2.5 shrink-0" />
                <span className="text-sm text-white/80 leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Get in touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">Need LED lighting?</h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">Talk to our team about the right LED lighting solution for your project.</p>
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
  return products.map((p) => ({ slug: p.slug }))
}
