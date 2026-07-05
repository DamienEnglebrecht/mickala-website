import Image from "next/image"
import { ArrowRight, Shield, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-neutral-950">
      <Image
        src="/hero-fleet.webp"
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
            Australian-Owned OEM Since 2007
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
            Innovation Through
            <br />
            <span className="text-primary">Continuous</span>
            <br />
            Improvement
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg text-pretty">
            Australian-designed extra-low-voltage LED lighting towers built for
            the harsh conditions of mining, construction and industrial sites.
            Trusted by 200+ mine sites across Australia and beyond.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              MDG15 Compliant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              ELV Safety Rated
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              Australian Made
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Our Range
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk To Our Team
            </a>
          </div>

          <div className="mt-10 flex flex-col items-start gap-2 text-sm text-white/60">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Mackay, QLD</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Muswellbrook, NSW</span>
          </div>
        </div>
      </div>
    </section>
  )
}
