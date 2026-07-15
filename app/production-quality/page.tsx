'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ===== DATA =====

const statItems = [
  { value: 'Liquid Soldering', label: 'Aerospace-grade bonding' },
  { value: 'Thermal Camera Testing', label: 'Every unit individually verified' },
  { value: '390 W/mK', label: 'PCB heat conductance' },
  { value: '1 MHz', label: 'Flicker-free frequency' },
]

const qualityItems = [
  {
    title: 'Soldering',
    desc: 'Components are soldered using a specialised liquid method instead of a conventional fan oven. This ensures stronger bonding to the PCB with considerably lower porosity of the solder tin, reducing the risk of cracking. This method originates from the aerospace industry.',
  },
  {
    title: 'Heat Transfer',
    desc: 'A heat-exchanging sheet is placed between the PCB and the housing — superior to commonly used cooling paste. There is no risk of the paste drying out or leaking onto components. The sheet prevents short-circuiting and overheating, giving a longer life span.',
  },
  {
    title: 'Cable Management',
    desc: 'Moisture entering LED lamps via cabling is a common cause of failure. A unique connection between cable and lamp eliminates this risk entirely.',
  },
  {
    title: 'Individual Testing',
    desc: 'Every lamp is tested individually after production. Each unit is monitored with a thermal camera to verify all specifications are met before leaving the factory.',
  },
  {
    title: 'Moisture-Free Housing',
    desc: 'Assembly takes place in a controlled low-humidity environment. This results in low pressure and low humidity inside the housing, minimising the risk of oxidation and condensation.',
  },
  {
    title: 'Screws & Fasteners',
    desc: 'All screws are made of stainless steel 316 and sealed in the housing to prevent loosening from vibration and to resist corrosion.',
  },
  {
    title: 'Materials',
    desc: 'All housings and fixtures are made of high-quality aluminium. Every batch is tested with X-Ray scanning to verify it meets our quality requirements.',
  },
  {
    title: 'Paint & Finish',
    desc: 'The aluminium housing receives a chrome conversion coating for corrosion resistance, followed by a dual layer of powder paint. Titanium is infused into the paint to improve heat transfer.',
  },
  {
    title: 'PC Sheets',
    desc: 'All polycarbonate sheets used are UV-coated, ensuring long-term durability and preventing discoloration in harsh outdoor conditions.',
  },
]

const protectionItems = [
  { title: 'Reversed Polarity Protection', desc: 'Protects against accidental reversal of positive and negative connections, preventing damage to the PCB.' },
  { title: 'Active Polarity Protection', desc: 'An active system with no efficiency loss — unlike diode-based protection which has a voltage drop and ~1% efficiency loss.' },
  { title: 'Over Voltage Protection', desc: 'Interrupts power supply when voltage exceeds a preset margin. The lamp automatically switches back on when voltage returns to the safe range.' },
  { title: 'Transil Protection', desc: 'Protects against static voltage discharges on the connection wires.' },
  { title: 'Thermal Management', desc: 'A temperature sensor prevents the maximum permissible temperature from being exceeded. Power is adjusted to maintain a constant, stable temperature — no PWM is used, eliminating stroboscopic effects.' },
  { title: 'Dump Load Transient', desc: 'Absorbs power when voltage exceeds a preset point. Meets IEC 61000-4-2 exceeds level 4, 30 kV air/contact discharge, ISO 10605, ISO 7637-2, ISO 16750-2.' },
  { title: 'Active Dump Load Protection', desc: 'Absorbs power in line with the LED light, stepping in when the standard dump load reaches its limit. Can switch off power to protect against out-of-control surges.' },
  { title: 'Surge Protection', desc: 'Protects against voltage spikes. Remains stable up to 75 volts, withdrawing up to 3000–6000 amps in a maximum of 8/20 µs with a reaction speed of 1000 V/µs.' },
  { title: 'Inrush Current Limiter', desc: 'Limits the inrush current during start-up to prevent gradual damage to components and avoid tripping fuses or circuit breakers.' },
  { title: 'Heat Transfer PCB', desc: 'Circuit boards with heat conductance of up to 390 W/mK — compared to the industry standard of 0.23–3 W/mK. Cooler LEDs mean more light output and longer life.' },
  { title: 'Short Circuit Protection', desc: 'Switches off the voltage supply if a short-circuit occurs inside the lamp, protecting both the light and the installation.' },
  { title: 'Flicker-Free Lighting', desc: 'Applied at 1 MHz frequency with smoothing capacitors, eliminating the stroboscopic effects linked to migraines, eye strain, and light-sensitive epilepsy.' },
  { title: 'Anti-Vibration', desc: 'Heavier components are both soldered and glued to the PCB. Glue\'s high absorbency with respect to vibrations results in a considerably longer service life.' },
  { title: 'EMC / EMI Suppression', desc: 'An integrated component suppresses electromagnetic interference, reducing the chance of nearby electronics malfunctioning.' },
  { title: 'Low Glare', desc: 'Low-glare variants are available across most product ranges to prevent light pollution and ensure light stays within the desired distribution angle.' },
]

const galleryImages = [
  '/hero-innovation.webp',
  '/hero-innovation.webp',
  '/hero-innovation.webp',
]

const sectionLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Production Quality', href: '#production-quality' },
  { label: 'Circuit Protection', href: '#circuit-protection' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

// ===== COMPONENTS =====

function StickyNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-10 bg-black/80 backdrop-blur-lg border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1200px] px-6 h-full flex items-center justify-between">
        <Link href="/" className="text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white/80 transition-colors">
          Mickala
        </Link>
        <div className="flex items-center gap-6">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-white/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function RedDot() {
  return (
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0 mt-[6px]" />
  )
}

export default function ProductionQualityPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <StickyNav />

      {/* ===== HERO ===== */}
      <section id="overview" className="relative w-full h-screen overflow-hidden">
        <Image
          src="/hero-innovation.webp"
          alt="Production Quality"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay — bottom only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-20 sm:pb-28">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="max-w-[900px]">
              <h1 className="text-[80px] sm:text-[100px] lg:text-[120px] font-bold leading-[0.9] tracking-[-0.04em] font-heading">
                Production<br />Quality
              </h1>
              <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
                Every Mickala LED lighting product is manufactured to uncompromising standards — engineered for the harshest mining and industrial environments on earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STAT STRIP ===== */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06] border-b border-white/[0.06]">
            {statItems.map((item) => (
              <div key={item.value} className="py-14 sm:py-16 px-6 first:pl-0 last:pr-0">
                <p className="text-[13px] sm:text-sm font-medium text-white/90 leading-tight">{item.value}</p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-white/40">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTION QUALITY ===== */}
      <section id="production-quality" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-[600px] mb-16 sm:mb-20">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#DC2626] font-semibold mb-4">
              Standard Production Quality
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] font-heading">
              Engineered to Last
            </h2>
          </div>

          <div className="space-y-0">
            {qualityItems.map((item, i) => (
              <div
                key={item.title}
                className="grid sm:grid-cols-[300px_1fr] gap-4 sm:gap-12 py-6 sm:py-8 border-t border-white/[0.06] first:border-t-0"
              >
                <div className="flex items-start gap-3">
                  <RedDot />
                  <h3 className="text-sm sm:text-base font-medium text-white/90">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CIRCUIT PROTECTION ===== */}
      <section id="circuit-protection" className="py-20 sm:py-28 bg-white/[0.015] border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-[600px] mb-16 sm:mb-20">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#DC2626] font-semibold mb-4">
              Circuit Protection &amp; Electronics
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] font-heading">
              Multiple Layers of Protection
            </h2>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-lg">
              Multiple layers of electronic protection ensure reliable operation in the toughest mining and industrial environments.
            </p>
          </div>

          <div className="space-y-0">
            {protectionItems.map((item, i) => (
              <div
                key={item.title}
                className="grid sm:grid-cols-[300px_1fr] gap-4 sm:gap-12 py-5 sm:py-6 border-t border-white/[0.06] first:border-t-0"
              >
                <div className="flex items-start gap-3">
                  <RedDot />
                  <h3 className="text-sm sm:text-base font-medium text-white/90">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-20 sm:py-28 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-[600px] mb-16 sm:mb-20">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#DC2626] font-semibold mb-4">
              Gallery
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] font-heading">
              Precision in Every Detail
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={src}
                  alt={`Production quality detail ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" className="py-20 sm:py-28 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#DC2626] font-semibold mb-4">
            Get in Touch
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] font-heading mb-6">
            Need More Information?
          </h2>
          <p className="text-sm text-white/50 mb-10 max-w-md mx-auto">
            Talk to our team about our LED lighting range and production quality standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:1300642525"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Call 1300 642 525
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/[0.15] text-white/80 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
