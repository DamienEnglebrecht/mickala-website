'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { useState, useEffect, useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const products = [
  {
    name: 'Single Axle',
    href: '/lighting-towers/single-axle',
    image: '/product-single-axle.webp',
    desc: 'Compact, towable. Fast deployment for smaller sites.',
    tag: 'Most Popular',
  },
  {
    name: 'Dual Axle',
    href: '/lighting-towers/dual-axle',
    image: '/product-dual-axle.webp',
    desc: 'Heavy-duty stability. Maximum coverage.',
    tag: 'Heavy Duty',
  },
  {
    name: 'Sled Mount',
    href: '/lighting-towers/sled-mount',
    image: '/product-sled-mount.webp',
    desc: 'Skid-mounted. Crane and forklift deployable.',
    tag: 'Versatile',
  },
  {
    name: 'Long Range',
    href: '/lighting-towers/long-range',
    image: '/product-long-range.webp',
    desc: 'Extended mast. Long-throw optics.',
    tag: 'Max Range',
  },
]

const otherProducts = [
  {
    name: 'Fuel Trailers',
    href: '/fuel-trailers',
    image: '/product-fuel-trailer.png',
    desc: 'Self-bunded. 1100 to 2000 L capacity.',
  },
  {
    name: 'Fuel Tanks',
    href: '/fuel-tanks',
    image: '/fuel-tank-1.jpg',
    desc: 'Compliant storage for site refuelling.',
  },
  {
    name: 'Custom Fabrication',
    href: '/custom-fabrication',
    image: '/product-custom-fabrication.webp',
    desc: 'In-house design and manufacture.',
  },
]

const clients = [
  { src: '/client-bhp.png', alt: 'BHP' },
  { src: '/client-glencore.png', alt: 'Glencore' },
  { src: '/client-anglo-american.png', alt: 'Anglo American' },
  { src: '/client-whitehaven.png', alt: 'Whitehaven Coal' },
  { src: '/client-yancoal.png', alt: 'Yancoal' },
  { src: '/client-golding.png', alt: 'Golding' },
  { src: '/client-bloomfield.png', alt: 'Bloomfield' },
  { src: '/client-terracom.png', alt: 'Terracom' },
]

const stats = [
  { label: 'Established', value: 2007, suffix: '', prefix: '' },
  { label: 'Towers Manufactured', value: 2000, suffix: '+', prefix: '' },
  { label: 'Mine Sites Served', value: 200, suffix: '+', prefix: '' },
  { label: 'In-House Design', value: 100, suffix: '%', prefix: '' },
]

const caseStudies = [
  {
    title: 'BMA Peak Downs',
    location: 'Central Queensland',
    desc: "ELV 24VDC reliability deployed across one of Australia's largest open-cut coal mines. Zero voltage hazard incidents on record.",
    stat: '35% lower TCO',
    badge: '0 downtime incidents',
  },
  {
    title: 'Glencore Hail Creek',
    location: 'Bowen Basin, QLD',
    desc: 'Comprehensive site-wide coverage for active mining operations. Replaced 240V infrastructure with ELV across the entire lighting fleet.',
    stat: 'Full site coverage',
    badge: 'TCO reduced 35%',
  },
  {
    title: 'MacKellar Carmichael',
    location: 'Galilee Basin, QLD',
    desc: 'Greenfield mine build with end-to-end logistics, staging, and site-wide coverage managed by the Mickala team from day one.',
    stat: 'Greenfield deploy',
    badge: 'End-to-end delivery',
  },
]

const aiTools = [
  {
    href: '/tower-selector',
    icon: '🎯',
    title: 'AI Tower Selector',
    desc: 'Answer 4 questions about your site. Get an instant tower recommendation with coverage map.',
    cta: 'Find my tower →',
    featured: true,
  },
  {
    href: '/tco-calculator',
    icon: '📊',
    title: 'TCO / ROI Calculator',
    desc: 'Compare ELV 24VDC vs 240V alternatives with real numbers. Build the business case in minutes.',
    cta: 'Calculate savings →',
    featured: true,
  },
  {
    href: '/spec-sheet-generator',
    icon: '📄',
    title: 'Spec Sheet Generator',
    desc: 'Select any model and configure to spec. Download a print-ready PDF on the spot.',
    cta: 'Build a spec sheet →',
    featured: false,
  },
  {
    href: '/troubleshooter',
    icon: '🔧',
    title: 'AI Troubleshooter',
    desc: 'Step-by-step guided diagnosis for tower issues. Faster than a manual, available 24/7.',
    cta: 'Start diagnosis →',
    featured: false,
  },
]

// ─── Count-up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 1500, trigger: boolean = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let start = 0
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * target)
      setCount(current)
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }

    requestAnimationFrame(step)
  }, [target, duration, trigger])

  return count
}

// ─── Stats Section (client component with count-up) ──────────────────────────

function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const count0 = useCountUp(stats[0].value, 1200, triggered)
  const count1 = useCountUp(stats[1].value, 1500, triggered)
  const count2 = useCountUp(stats[2].value, 1500, triggered)
  const count3 = useCountUp(stats[3].value, 1200, triggered)

  const counts = [count0, count1, count2, count3]

  return (
    <section ref={ref} className="border-b border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <div key={stat.label} className="py-12 sm:py-16 px-6 text-center">
              <p className="text-5xl sm:text-6xl font-bold tracking-tight mb-2 tabular-nums">
                {stat.prefix}{counts[i]}{stat.suffix}
              </p>
              <p className="text-[11px] text-white/40 font-medium tracking-[0.15em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <SiteHeader />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full viewport cinematic
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[680px] flex items-end">
        {/* Background image */}
        <Image
          src="/field-towers-lineup-dusk.jpg"
          alt="Row of Mickala LED lighting towers at dusk"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay — rich from bottom, subtle top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-24 sm:pb-32">
          <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-5">
            Australian-Owned OEM Since 2007
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-black tracking-tight leading-[0.93] mb-6 max-w-3xl">
            Lighting the World&apos;s{' '}
            <span className="text-[#DC2626]">Hardest</span>{' '}
            Worksites.
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
            Extra-low-voltage ELV 24VDC LED lighting towers — designed, manufactured and supported
            in Australia. Trusted by BHP, Glencore, Anglo American and 200+ mine sites worldwide.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/products"
              className="inline-flex items-center px-7 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] transition-all duration-300 text-sm font-bold rounded-full shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]"
            >
              Explore Products
            </Link>
            <Link
              href="/site-assessment"
              className="inline-flex items-center px-7 py-3.5 border border-[#DC2626]/60 hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300 text-sm font-bold rounded-full text-[#DC2626]"
            >
              AI Site Assessment →
            </Link>
            <Link
              href="/tco-calculator"
              className="inline-flex items-center px-7 py-3.5 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300 text-sm font-bold rounded-full text-white/80"
            >
              TCO Calculator
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/60">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST BAR — Animated marquee ticker
      ═══════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/[0.06] py-10 overflow-hidden">
        <p className="text-[11px] text-white/30 font-medium tracking-[0.2em] uppercase text-center mb-8">
          Trusted by Australia&apos;s Largest Mining Operations
        </p>

        {/* Marquee wrapper — two identical sets for seamless loop */}
        <div className="relative">
          <div className="flex items-center" style={{ animation: 'marquee 28s linear infinite' }}>
            {[...clients, ...clients].map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="flex-shrink-0 mx-10 relative h-10 w-28 opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS — Count-up animated numbers
      ═══════════════════════════════════════════════════════════ */}
      <StatsSection />

      {/* ═══════════════════════════════════════════════════════════
          PRODUCT GRID — A tower for every site
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">
                Lighting Towers
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0]">
                A tower for every site.
              </h2>
            </div>
            <Link
              href="/spec-sheets"
              className="text-sm text-white/40 hover:text-white transition-colors duration-300 whitespace-nowrap"
            >
              View all specifications →
            </Link>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group relative aspect-[3/4] overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-[#DC2626]/40 transition-all duration-300"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-2.5 py-1 bg-[#DC2626]/90 text-[10px] font-bold tracking-[0.1em] uppercase">
                    {p.tag}
                  </span>
                </div>
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-base font-bold mb-1.5 group-hover:text-[#DC2626] transition-colors duration-300">
                    {p.name}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-[#DC2626] text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    View specs <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* SS316 Feature Callout — a genuine differentiator */}
          <div className="mt-4 relative overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/5 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-8 sm:p-10">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DC2626]/15 flex items-center justify-center text-xl">
                  ⚙️
                </div>
                <div>
                  <p className="text-[10px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-2">
                    Industry First
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    316 Marine Grade Stainless Steel.{' '}
                    <span className="text-white/50">The only towers built this way.</span>
                  </h3>
                  <p className="text-sm text-white/40 mt-2 max-w-xl">
                    While competitors paint mild steel, every Mickala tower is fabricated from
                    full 316 marine-grade stainless. No rust. No flaking. No repainting.
                    Built to outlast the mine.
                  </p>
                </div>
              </div>
              <Link
                href="/products"
                className="flex-shrink-0 inline-flex items-center px-6 py-3 border border-[#DC2626]/50 hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300 text-sm font-bold text-[#DC2626] rounded-full"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          AI TOOLS — Premium showcase
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#0A0A0A] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="max-w-xl mb-16">
            <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">
              AI Tools
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0] mb-4">
              Find the right tower in seconds.
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Tell us your site requirements. Our AI recommends the exact tower, coverage plan,
              and total cost of ownership — no sales call needed.
            </p>
          </div>

          {/* Tools grid — featured top row, secondary bottom row */}
          <div className="space-y-3">
            {/* Featured tools */}
            <div className="grid sm:grid-cols-2 gap-3">
              {aiTools.filter((t) => t.featured).map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group relative p-8 border border-white/[0.08] hover:border-[#DC2626]/50 bg-white/[0.02] hover:bg-[#DC2626]/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#DC2626]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#DC2626]/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-5">{tool.icon}</div>
                    <p className="text-lg font-bold mb-2 group-hover:text-[#DC2626] transition-colors duration-300">
                      {tool.title}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">{tool.desc}</p>
                    <span className="text-sm text-[#DC2626] font-semibold group-hover:gap-2 transition-all duration-300">
                      {tool.cta}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Secondary tools */}
            <div className="grid sm:grid-cols-2 gap-3">
              {aiTools.filter((t) => !t.featured).map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group flex items-start gap-5 p-6 border border-white/[0.06] hover:border-white/[0.15] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="flex-shrink-0 text-2xl mt-0.5">{tool.icon}</div>
                  <div>
                    <p className="text-sm font-bold mb-1 group-hover:text-white/80 transition-colors">
                      {tool.title}
                    </p>
                    <p className="text-xs text-white/40 leading-relaxed mb-3">{tool.desc}</p>
                    <span className="text-xs text-[#DC2626] font-semibold">{tool.cta}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FIELD PHOTOGRAPHY — Brand storytelling
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-3">
            {/* Left panel — mine at night */}
            <div className="group relative aspect-[4/3] overflow-hidden">
              <Image
                src="/field-mine-night.jpg"
                alt="Active quarry lit by Mickala towers at night"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-[10px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-3">
                  Night Operations
                </p>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                  Deployed where<br />it matters most.
                </h3>
                <p className="text-sm text-white/55 mt-3 leading-relaxed max-w-sm">
                  Open-cut mines, underground portals, haul roads and processing plants. 
                  Mickala towers run continuously — 24 hours, every shift, in every condition.
                </p>
              </div>
            </div>

            {/* Right panel — open pit dusk + haul truck */}
            <div className="flex flex-col gap-3">
              <div className="group relative flex-1 min-h-[220px] overflow-hidden">
                <Image
                  src="/field-open-pit-dusk.jpg"
                  alt="Massive open pit mine at dusk"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-lg font-black">Scale that demands reliability.</p>
                  <p className="text-xs text-white/50 mt-1">
                    200+ mine sites across Australia and beyond.
                  </p>
                </div>
              </div>
              <div className="group relative flex-1 min-h-[220px] overflow-hidden">
                <Image
                  src="/field-haul-truck-dusk.jpg"
                  alt="Caterpillar haul truck at dusk, mine site"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-lg font-black">Built for the big machines.</p>
                  <p className="text-xs text-white/50 mt-1">
                    Engineered for environments where failure is not an option.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CASE STUDIES — Visual, stat-forward cards
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#0A0A0A] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">
                Case Studies
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0]">
                Proven in the field.
              </h2>
            </div>
            <p className="text-sm text-white/40 max-w-xs">
              2000+ towers deployed across 200+ mine sites. Here&apos;s what that looks like.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {caseStudies.map((cs, i) => (
              <div
                key={cs.title}
                className="group relative p-8 border border-white/[0.08] hover:border-[#DC2626]/40 bg-white/[0.01] transition-all duration-300 overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute top-4 right-6 text-[80px] font-black text-white/[0.04] leading-none select-none tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  {/* Stat badge */}
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-[#DC2626] text-[10px] font-bold tracking-[0.1em] uppercase">
                      {cs.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black tracking-tight mb-1 group-hover:text-[#DC2626] transition-colors duration-300">
                    {cs.title}
                  </h3>
                  <p className="text-[11px] text-white/30 font-medium tracking-[0.1em] uppercase mb-5">
                    {cs.location}
                  </p>
                  <p className="text-sm text-white/55 leading-relaxed mb-6">{cs.desc}</p>

                  <div className="pt-5 border-t border-white/[0.06]">
                    <p className="text-sm font-bold text-[#DC2626]">{cs.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SS316 CALLOUT — Full-bleed, commanding
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[580px] flex items-center py-28 sm:py-36">
        {/* Background */}
        <Image
          src="/new-release-ss316.jpg"
          alt="316 Marine Grade Stainless Steel lighting tower"
          fill
          className="object-cover object-center"
        />
        {/* Rich overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-6">
              New Release — Industry First
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0] mb-6">
              NOBODY ELSE BUILDS{' '}
              <span className="text-[#DC2626]">LIGHT TOWERS</span>{' '}
              LIKE THIS.{' '}
              <span className="text-white/50">LITERALLY NOBODY.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
              316 Marine Grade Stainless Steel across the entire Mickala range. While others
              paint mild steel and call it done, we build every tower to outlast the mine.
              Painted steel ended here.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-[#DC2626] hover:bg-[#B91C1C] transition-all duration-300 text-sm font-bold rounded-full shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)]"
              >
                Explore the Range →
              </Link>
              <Link
                href="/our-story"
                className="inline-flex items-center px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 text-sm font-bold rounded-full"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LED ARRAY — Dramatic photography break
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image — dramatic upward LED shot */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/field-led-array-upward.jpg"
                alt="Looking up at Mickala 12-LED array against night sky"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Copy */}
            <div>
              <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-5">
                LED Lighting Range
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0] mb-6">
                For the world&apos;s toughest conditions.
              </h2>
              <p className="text-sm text-white/55 leading-relaxed mb-6">
                DCB95 (Orca), DCB48/66 (Barracuda), DCB24 (Snapper), DCB9 (Piranha), and Dark
                Licht — a complete range of industrial LED lighting engineered for mining,
                construction, and critical infrastructure. Designed in-house. Manufactured
                in-house. Supported 24/7.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['ELV 24VDC — Voltage Safe', 'IP65 Rated — All Conditions', 'In-House Design — Total QC', '24/7 Factory Support'].map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-1 h-1 bg-[#DC2626] rounded-full mt-2" />
                    <p className="text-xs text-white/55 leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/production-quality"
                className="inline-flex items-center text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors duration-300 font-bold"
              >
                Explore the lighting range →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          OTHER PRODUCTS — Hover zoom image cards
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#0A0A0A] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">
                Beyond Lighting
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0]">
                Same engineering.<br />Wider capability.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {otherProducts.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group relative aspect-[4/3] overflow-hidden border border-white/[0.06] hover:border-white/[0.2] transition-all duration-300"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-base font-bold mb-1.5 group-hover:text-[#DC2626] transition-colors duration-300">
                    {p.name}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT TEASER — From dairy farm to 2000+ towers
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/our-story-photo.webp"
                alt="Mickala Group — our story"
                fill
                className="object-cover"
              />
              {/* Subtle red accent frame */}
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-[#DC2626]" />
            </div>

            {/* Text */}
            <div>
              <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-5">
                About Mickala Group
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0] mb-6">
                From a dairy farm to 2000+ towers.
              </h2>
              <div className="space-y-4 text-sm text-white/55 leading-relaxed">
                <p>
                  Mickala Group was founded in 2007 by Damien Englebrecht — a driven engineer
                  who started the business from the ground up, on a dairy farm in regional
                  Queensland, with a clear vision: build the world&apos;s safest, most reliable
                  lighting towers for the mining industry.
                </p>
                <p>
                  Today, Mickala employs 120 staff, designs and manufactures 100% of its
                  assets in-house, and has deployed towers across 200+ mine sites — trusted
                  by BHP, Glencore, Anglo American, and some of the most demanding operations
                  on earth.
                </p>
                <p>
                  Every tower leaves our Mackay facility with one goal: to outlast the mine.
                </p>
              </div>
              <Link
                href="/our-story"
                className="inline-flex items-center mt-8 text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors duration-300 font-bold"
              >
                Read our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — Dark, commanding close
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#0A0A0A] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-5">
            Get in Touch
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] mb-6">
            Need lighting<br className="hidden sm:block" /> for your site?
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-12 max-w-md mx-auto leading-relaxed">
            Talk to our team about lighting towers, LED lighting, fuel trailers, or custom
            fabrication. Fast quotes. Factory support.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a
              href="tel:1300642525"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300 text-sm font-bold rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1300 642 525
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-4 bg-[#DC2626] hover:bg-[#B91C1C] transition-all duration-300 text-sm font-bold rounded-full shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]"
            >
              Request a Quote →
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/25 font-medium tracking-[0.1em] uppercase border-t border-white/[0.06] pt-10">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#DC2626]" />
              ISO 9001 Certified
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#DC2626]" />
              ABN 92 180 218 353
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#DC2626]" />
              Australian-Owned &amp; Operated
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#DC2626]" />
              Registered Labour Hire Provider
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#DC2626]" />
              21 Caterpillar Drive, Mackay QLD
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
