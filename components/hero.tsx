import Image from "next/image"
import { ArrowRight, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-neutral-950">
      <Image
        src="/hero-lighting-tower.png"
        alt="Mickala LED lighting tower deployed on an Australian mining site at dusk"
        fill
        priority
        className="object-cover object-center opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 to-transparent"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Australian-Owned OEM Manufacturer
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
            Industrial LED
            <br />
            <span className="text-primary">Lighting Towers</span>
            <br />
            Built To Last
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg text-pretty">
            We design, manufacture and maintain extra-low-voltage LED lighting
            towers for mining, construction and industrial operations across
            Australia and beyond — engineered in-house, proven on site.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Our Range
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk To Our Team
            </a>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4 text-primary" />
            Mackay, QLD &middot; Muswellbrook, NSW
          </div>
        </div>
      </div>
    </section>
  )
}
