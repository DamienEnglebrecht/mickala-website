import Image from "next/image"
import Link from "next/link"

const products = [
  {
    name: "Orca Series",
    tagline: "High-performance flood lighting for demanding environments",
    image: "/orca-light.jpg",
    specs: [
      ["Wattage", "300W — 800W"],
      ["Lumens", "46,200 — 111,300 lm"],
      ["Colour Temp", "4,000K / 5,700K"],
      ["IP Rating", "IP67"],
      ["Impact", "IK10"],
      ["Voltage", "24VDC / 100-277VAC"],
      ["Warranty", "5 years"],
      ["Applications", "Mining, industrial, sports, security"],
    ],
    features: [
      "Extra Low Voltage (ELV) options available for mining compliance",
      "Beam angle options: 30°, 60°, 90°",
      "Tool-less maintenance access",
      "Die-cast aluminium housing with corrosion-resistant coating",
      "Surge protection: 10kV",
    ],
  },
  {
    name: "Barracuda Series",
    tagline: "Versatile LED floodlighting for general and heavy industrial use",
    image: "/barracuda-light.jpg",
    specs: [
      ["Wattage", "120W — 320W"],
      ["Lumens", "19,650 — 42,000 lm"],
      ["Colour Temp", "4,000K / 5,700K"],
      ["IP Rating", "IP67"],
      ["Impact", "IK10"],
      ["Voltage", "24VDC / 100-277VAC"],
      ["Warranty", "5 years"],
      ["Applications", "Construction, mining, general area lighting"],
    ],
    features: [
      "DCB48-320 and DCB66-320 compatible",
      "Adjustable mounting bracket for precise aiming",
      "High-efficiency optical system",
      "Rated for continuous operation in harsh environments",
      "ZM (Zone 2) rated options for hazardous areas",
    ],
  },
  {
    name: "Snapper Series",
    tagline: "Multi-head LED lighting arrays for maximum coverage",
    image: "/snapper-light.jpg",
    specs: [
      ["Wattage", "170W — 1,200W (multi-head)"],
      ["Lumens", "19,500 — 168,000 lm"],
      ["Colour Temp", "4,000K / 5,700K"],
      ["IP Rating", "IP66"],
      ["Impact", "IK07"],
      ["Voltage", "100-277VAC"],
      ["Warranty", "5 years"],
      ["Applications", "Large area illumination, sports fields, mining"],
    ],
    features: [
      "Multiple head configurations for tailored coverage",
      "Independent head aiming",
      "Reduced glare design for safety",
      "Heavy-duty galvanised mounting frame",
      "Ideal for lighting towers and high-mast applications",
    ],
  },
  {
    name: "Piranha Series",
    tagline: "Ultra-compact LED work lights for confined spaces and off-road use",
    image: "/piranha-light.jpg",
    specs: [
      ["Wattage", "55W — 70W"],
      ["Lumens", "6,100 — 8,400 lm"],
      ["Colour Temp", "4,000K / 5,700K"],
      ["IP Rating", "IP69K"],
      ["Impact", "IK10"],
      ["Voltage", "24VDC"],
      ["Warranty", "5 years"],
      ["Applications", "Off-road, mining vehicles, confined spaces"],
    ],
    features: [
      "IP69K rated — withstands high-pressure washdown",
      "Ultra-compact design for tight installations",
      "Suitable for vehicle-mounted and mobile applications",
      "Reverse polarity protection",
      "Vibration resistant — ideal for heavy machinery",
    ],
  },
  {
    name: "Dark Licht Series",
    tagline: "Architectural and industrial-grade area lighting solutions",
    image: "/dark-licht.jpg",
    specs: [
      ["Wattage", "320W — 1,800W"],
      ["Lumens", "44,800 — 252,000 lm"],
      ["Colour Temp", "3,000K / 4,000K / 5,700K"],
      ["IP Rating", "IP66"],
      ["Impact", "IK08"],
      ["Voltage", "100-277VAC"],
      ["Warranty", "5 years"],
      ["Applications", "Large area, architectural, mining, ports"],
    ],
    features: [
      "DL1, DL2 and DL3 series — scalable to project requirements",
      "Architectural-grade design with multiple colour temperature options",
      "High-efficiency optics with precision beam control",
      "Available with pole, wall, and ground mounting options",
      "Smart control compatible (DALI / 0-10V dimming options)",
    ],
  },
]

export default function LEDLightingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">LED Lighting Range</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          High-performance LED lighting solutions for mining, industrial and architectural applications.
          Engineered for Australian conditions with full warranty and technical support.
        </p>

        <div className="space-y-16">
          {products.map((product) => (
            <section key={product.name} id={product.name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
              <div className="grid gap-8 md:grid-cols-2 items-start">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-card">
                  <Image
                    src={product.image}
                    alt={`${product.name} LED light`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-1">{product.name}</h2>
                  <p className="text-primary font-medium text-sm mb-4">{product.tagline}</p>

                  <table className="w-full text-sm mb-4">
                    <tbody>
                      {product.specs.map(([label, value]) => (
                        <tr key={label} className="border-b border-border/50">
                          <td className="py-1.5 pr-4 font-medium text-muted-foreground w-36">{label}</td>
                          <td className="py-1.5">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <ul className="space-y-1 mb-6">
                    {product.features.map((f) => (
                      <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5 h-1 w-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    Enquire about {product.name}
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
