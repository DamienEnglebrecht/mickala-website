import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "./section-heading"

const items = [
  {
    name: "Fuel Trailers",
    image: "/product-fuel-trailer.png",
    description:
      "Self-bunded mobile diesel fuel trailers built to keep your fleet running. Compliant, robust and ready for the harshest sites.",
  },
  {
    name: "Custom Fabrication",
    image: "/product-custom-fabrication.webp",
    description:
      "In-house steel fabrication for bespoke industrial equipment. If you can spec it, our workshop can build it to last.",
  },
]

export function OtherProducts() {
  return (
    <section id="other-products" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Beyond Lighting"
          title="Other Industrial Products"
          description="The same engineering rigour we put into lighting towers extends across our wider product and fabrication capability."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-2xl border border-border"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
                  {item.description}
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-primary"
                >
                  Enquire now
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
