import Image from "next/image"
import Link from "next/link"

const stats = [
  { label: "Founded", value: "2007" },
  { label: "Towers Manufactured", value: "2,000+" },
  { label: "Mine Sites Served", value: "200+" },
  { label: "In-House Design", value: "100%" },
]

const values = [
  "Innovation through continuous improvement — supply tomorrow's technology today",
  "Australian-owned and operated, engineered for the harshest Australian conditions",
  "100% in-house design and manufacture — total control over quality and IP",
  "ISO 9001 Certified quality management systems across all operations",
  "24/7/365 support from factory-trained technicians, nationwide",
  "Long-term partnerships built on honesty, integrity, and trust",
  "Reduce operational costs and carbon footprint through smarter design",
  "Commitment to safety, quality, and environmental responsibility",
]

export default function OurStoryPage() {
  return (
    <div className="bg-black text-white">
      {/* ===== STICKY NAV ===== */}
      <div className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 h-10 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Mickala
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/spec-sheets"
              className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase"
            >
              Lighting Towers
            </Link>
            <Link
              href="/production-quality"
              className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase"
            >
              LED Lighting
            </Link>
            <Link
              href="/fuel-trailers"
              className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase"
            >
              Fuel Trailers
            </Link>
            <Link
              href="/our-story"
              className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase"
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase"
            >
              Gallery
            </Link>
          </nav>
          <a
            href="tel:1300642525"
            className="text-[11px] text-white/70 hover:text-white transition-colors tracking-wide uppercase shrink-0"
          >
            1300 642 525
          </a>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px]">
        <Image
          src="/our-story-hero.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-20 sm:pb-28">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Since 2007
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-4">
            Our Story
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg mb-8">
            From a dairy farm to Australia&apos;s leading privately owned OEM manufacturer of
            LED lighting towers — built from nothing, driven by innovation.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="tel:1300642525"
              className="inline-flex items-center px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full"
            >
              Call 1300 642 525
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center px-6 py-3 border border-white/20 hover:border-white/40 transition-colors text-sm font-semibold rounded-full"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STAT STRIP ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 sm:py-10 px-6 text-center">
                <p className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="space-y-4 text-sm text-white/50 leading-relaxed">
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-6">
                How it began
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white mb-6">
                Founded in 2007 by Damien Englebrecht.
              </h2>
              <p>
                Mickala started with nothing — on a dairy farm, with a simple idea
                and a relentless work ethic. What began as a small operation grew
                into something far bigger than anyone imagined.
              </p>
              <p>
                Today, Mickala is an Australian-owned OEM manufacturer of
                extra-low-voltage LED lighting towers. We design and manufacture
                100% of our assets in-house — giving us total control over quality,
                intellectual property, and reliability from end to end.
              </p>
              <p>
                Every tower is thoroughly inspected by our factory-trained
                technicians, ensuring seamless integration and zero disruption to
                site productivity upon mobilisation.
              </p>
              <p>
                With over 2,000 towers manufactured and deployed across 200+ mine
                sites, Mickala has become a trusted partner to major mining
                operations across Australia.
              </p>
              <p className="text-white/70 font-semibold pt-4">
                &ldquo;Innovation through continuous improvement&rdquo; — our philosophy drives
                everything we do.
              </p>
            </div>
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[550px] overflow-hidden border border-white/[0.06]">
              <Image
                src="/our-story-photo.webp"
                alt="Mickala Sled Mounted Lighting Tower"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section className="py-16 sm:py-20 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase text-center mb-8">
            Our Locations
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="text-center border border-white/[0.06] py-8 px-6">
              <p className="text-sm font-semibold mb-1">Mackay — Head Office</p>
              <p className="text-[11px] text-white/40">
                21 Caterpillar Drive, Paget QLD 4740
              </p>
            </div>
            <div className="text-center border border-white/[0.06] py-8 px-6">
              <p className="text-sm font-semibold mb-1">Muswellbrook — NSW</p>
              <p className="text-[11px] text-white/40">
                37 Thomas Mitchell Dr, Muswellbrook NSW 2333
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4 text-center">
              Our Philosophy
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-10 text-center">
              Innovation through continuous improvement.
            </h2>
            <div className="space-y-4">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 shrink-0" />
                  <p className="text-sm text-white/60 leading-relaxed">{value}</p>
                </div>
              ))}
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
            Want to learn more?
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
            Talk to our team about our story, our towers, and how we can support
            your next project.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="tel:1300642525"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              1300 642 525
            </a>
            <span className="text-white/[0.06]">/</span>
            <Link
              href="/quote"
              className="text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold"
            >
              Request a Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-sm font-semibold tracking-tight">Mickala Group</p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/spec-sheets"
                className="text-[11px] text-white/30 hover:text-white transition-colors"
              >
                Lighting Towers
              </Link>
              <Link
                href="/production-quality"
                className="text-[11px] text-white/30 hover:text-white transition-colors"
              >
                LED Lighting
              </Link>
              <Link
                href="/fuel-trailers"
                className="text-[11px] text-white/30 hover:text-white transition-colors"
              >
                Fuel Trailers
              </Link>
              <Link
                href="/custom-fabrication"
                className="text-[11px] text-white/30 hover:text-white transition-colors"
              >
                Custom Fabrication
              </Link>
              <Link
                href="/our-story"
                className="text-[11px] text-white/30 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="text-[11px] text-white/30 hover:text-white transition-colors"
              >
                Gallery
              </Link>
            </nav>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-6 border-t border-white/[0.06]">
            <p className="text-[11px] text-white/20">ABN 92 180 218 353</p>
            <p className="text-[11px] text-white/20">
              ISO 9001 Certified
            </p>
            <p className="text-[11px] text-white/20">
              21 Caterpillar Drive, Paget QLD 4740
            </p>
            <p className="text-[11px] text-white/20">1300 642 525</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
