import Image from "next/image"
import Link from "next/link"

const brands = [
  {
    name: "DCbright",
    description: "High-performance industrial LED lighting — floodlights and area lights engineered for the world's toughest mine sites and infrastructure projects.",
    image: "/dcbright-hero.webp",
    products: [
      {
        name: "Orca",
        subtitle: "High-Power LED Floodlight",
        image: "/orca-light.webp",
        specs: [
          "Power: 300W | 450W | 600W | 800W",
          "Luminous flux: 46200 – 111300 lm",
          "Efficacy: 139 lm/W",
          "Colour temp: 3000K / 4000K / 5700K",
          "Ingress: IP67, IK10 rated",
          "Voltage: 24V DC or 100-277V AC / 347-480V AC",
          "Housing: Die-cast aluminium, tempered glass",
          "Warranty: 5 years",
          "Applications: Mining, heavy industrial, ports, infrastructure",
          "Mounting: Pole, wall, ground, trunnion bracket",
        ],
      },
      {
        name: "Barracuda",
        subtitle: "Medium-Power LED Floodlight",
        image: "/barracuda-light.webp",
        specs: [
          "Power: 120W | 200W | 320W",
          "Luminous flux: 19650 – 42000 lm",
          "Efficacy: 131 lm/W",
          "Colour temp: 3000K / 4000K / 5700K",
          "Ingress: IP67, IK10 rated",
          "Voltage: 24V DC or 100-277V AC / 347-480V AC",
          "Housing: Die-cast aluminium, tempered glass",
          "Warranty: 5 years",
          "Applications: Construction, mining, general industrial",
          "DCB48 / DCB66 compatible",
        ],
      },
      {
        name: "Snapper",
        subtitle: "Modular Multi-Head LED Light",
        image: "/snapper-light.webp",
        specs: [
          "Power: 170W – 1200W (multi-head config)",
          "Luminous flux: 19500 – 168000 lm",
          "Efficacy: up to 140 lm/W",
          "Colour temp: 3000K / 4000K / 5700K",
          "Ingress: IP66, IK07 rated",
          "Voltage: 24V DC or 100-277V AC",
          "Housing: Aluminium with separate driver box",
          "Warranty: 5 years",
          "Applications: Stadiums, large areas, high-bay, mining",
          "Modular design — up to 12 heads per fixture",
        ],
      },
      {
        name: "Piranha",
        subtitle: "Compact High-Output LED Light",
        image: "/piranha-light.webp",
        specs: [
          "Power: 55W | 70W",
          "Luminous flux: 6100 – 8400 lm",
          "Efficacy: up to 120 lm/W",
          "Colour temp: 3000K / 4000K / 5700K",
          "Ingress: IP69K, IK10 rated",
          "Voltage: 9-60V DC (wide input)",
          "Housing: Marine-grade aluminium, stainless steel hardware",
          "Warranty: 5 years",
          "Applications: Off-road, mining vehicles, heavy equipment",
          "Compact design — ideal for tight spaces",
        ],
      },
    ],
  },
  {
    name: "Dark Licht",
    description: "Premium architectural and industrial LED lighting — German-engineered, built for Australian conditions.",
    image: "/darklicht-hero.webp",
    products: [
      {
        name: "DL2-800",
        subtitle: "800W Architectural / Industrial",
        image: "/darklicht-dl2.webp",
        specs: [
          "Power: 800W",
          "Luminous flux: Contact for details",
          "Driver option: Multiple programmable drivers",
          "Service life: LM80 | 192000 hrs",
          "Colour temp: Multiple CCT options",
          "Applications: Architecture, industrial, high-bay",
          "Finish: Powder-coated aluminium",
          "Designed in Germany / Built for Australian conditions",
        ],
      },
      {
        name: "DL2-1200",
        subtitle: "1200W Architectural / Industrial",
        image: "/darklicht-dl2-1200.webp",
        specs: [
          "Power: 1200W",
          "Luminous flux: Contact for details",
          "Driver option: Multiple programmable drivers",
          "Service life: LM80 | 192000 hrs",
          "Colour temp: Multiple CCT options",
          "Applications: Architecture, industrial, high-bay",
          "Finish: Powder-coated aluminium",
          "Designed in Germany / Built for Australian conditions",
        ],
      },
      {
        name: "DL3-1800",
        subtitle: "1800W Architectural / Industrial",
        image: "/darklicht-dl3.webp",
        specs: [
          "Power: 1800W",
          "Luminous flux: Contact for details",
          "Driver option: Multiple programmable drivers",
          "Service life: LM80 | 192000 hrs",
          "Colour temp: Multiple CCT options",
          "Applications: Architecture, industrial, high-bay",
          "Finish: Powder-coated aluminium",
          "Designed in Germany / Built for Australian conditions",
        ],
      },
      {
        name: "DL1-320",
        subtitle: "320W Architectural / Industrial",
        image: "/darklicht-dl1.webp",
        specs: [
          "Power: 320W",
          "Luminous flux: Contact for details",
          "Driver option: Multiple programmable drivers",
          "Service life: LM80 | 82200 hrs",
          "Colour temp: Multiple CCT options",
          "Applications: Architecture, industrial, high-bay",
          "Finish: Powder-coated aluminium",
          "Designed in Germany / Built for Australian conditions",
        ],
      },
      {
        name: "DL1-400",
        subtitle: "400W Architectural / Industrial",
        image: "/darklicht-dl1-400.webp",
        specs: [
          "Power: 400W",
          "Luminous flux: Contact for details",
          "Driver option: Multiple programmable drivers",
          "Service life: LM80 | 192000 hrs",
          "Colour temp: Multiple CCT options",
          "Applications: Architecture, industrial, high-bay",
          "Finish: Powder-coated aluminium",
          "Designed in Germany / Built for Australian conditions",
        ],
      },
      {
        name: "DL1-600",
        subtitle: "600W Architectural / Industrial",
        image: "/darklicht-dl1-600.webp",
        specs: [
          "Power: 600W",
          "Luminous flux: Contact for details",
          "Driver option: Multiple programmable drivers",
          "Service life: LM80 | 192000 hrs",
          "Colour temp: Multiple CCT options",
          "Applications: Architecture, industrial, high-bay",
          "Finish: Powder-coated aluminium",
          "Designed in Germany / Built for Australian conditions",
        ],
      },
    ],
  },
]

export default function LightingProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a1a1a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Industrial &amp; Architectural
            <span className="text-primary"> LED Lighting</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Premium lighting solutions from DCbright and Dark Licht — engineered for mining, heavy industrial, infrastructure, and architectural applications.
          </p>
        </div>
      </section>

      {/* Brand Sections */}
      {brands.map((brand) => (
        <section key={brand.name} className="py-16 lg:py-20 border-b border-border/50 last:border-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Brand Header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">{brand.name}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">{brand.description}</p>

            {/* Product Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {brand.products.map((product) => (
                <div key={product.name} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center p-6">
                    <div className="w-full h-full bg-gradient-to-br from-muted to-background rounded-xl flex items-center justify-center text-muted-foreground/40">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.subtitle}</p>
                    <ul className="space-y-1.5 mb-4">
                      {product.specs.slice(0, 5).map((spec, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/lighting/${brand.name.toLowerCase().replace(/\s+/g, '-')}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Full Specifications
                      <span className="text-base leading-none">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
            Need Lighting Advice?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Talk to our team about the right LED lighting solution for your project — DCbright, Dark Licht, or Mickala lighting towers.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-8 py-3 font-semibold hover:bg-white/90 transition-colors">
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  )
}
