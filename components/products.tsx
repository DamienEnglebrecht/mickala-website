import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "./section-heading"

const products = [
  {
    name: "Single Axle",
    type: "Lighting Tower",
    image: "/product-single-axle.webp",
    description:
      "Compact, towable and quick to deploy. Ideal for fast-moving worksites that need reliable area lighting without the footprint.",
    specs: ["Single axle trailer", "Telescopic LED mast", "Rapid deployment"],
  },
  {
    name: "Dual Axle",
    type: "Lighting Tower",
    image: "/product-dual-axle.webp",
    description:
      "Heavy-duty stability for large coverage areas. Built for the toughest mining and construction environments.",
    specs: ["Dual axle trailer", "Wide LED array", "Maximum coverage"],
  },
  {
    name: "Sled Mount",
    type: "Lighting Tower",
    image: "/product-sled-mount.webp",
    description:
      "Skid-mounted for crane and forklift relocation around fixed sites. No wheels, no fuss — just dependable illumination.",
    specs: ["Steel skid base", "Lift & shift", "Site-fixed lighting"],
  },
  {
    name: "Sled Mount Long Range",
    type: "Lighting Tower",
    image: "/product-long-range.webp",
    description:
      "Extended mast and long-throw optics for high-mast applications and expansive open-cut operations.",
    specs: ["Extra-tall mast", "Long-throw optics", "High-mast ready"],
  },
]

export function Products() {
  return (
    <section id="products" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Industrial Products"
          title="A Lighting Tower For Every Site"
          description="Every Mickala tower is designed and manufactured in-house, giving us total control over quality, IP and reliability — proven across more than 1,000 units in the field."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/5"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`Mickala ${product.name} ${product.type}`}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                  {product.type}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">
                  {product.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 text-xs font-medium text-foreground/70"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Request a quote
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <br />
                  <a
                    href="/spec-sheets"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Spec Sheet
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
