'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

// ─── Animated count-up hook ──────────────────────────────────────────────────
function useCountUp(target: string, duration = 1800) {
  const [display, setDisplay] = useState('0')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Extract numeric portion and suffix (e.g. "2000+" → { num: 2000, suffix: '+' })
  const numeric = parseInt(target.replace(/\D/g, ''), 10)
  const suffix = target.replace(/[0-9]/g, '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.4 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (isNaN(numeric)) { setDisplay(target); return }
    const steps = 60
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numeric)
      setDisplay(current.toLocaleString() + suffix)
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [started, numeric, suffix, duration, target])

  return { display, ref }
}

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({ stat }: { stat: { label: string; value: string } }) {
  const { display, ref } = useCountUp(stat.value)
  return (
    <div ref={ref} className="py-8 sm:py-10 px-6 text-center">
      <p className="text-2xl sm:text-3xl font-bold tabular-nums whitespace-nowrap">{display}</p>
      <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase mt-1 whitespace-nowrap">
        {stat.label}
      </p>
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Founded', value: '2007' },
  { label: 'Towers Deployed', value: '2000+' },
  { label: 'Mine Sites Served', value: '200+' },
  { label: 'In-House Design', value: '100%' },
]

const principles = [
  {
    num: '01',
    title: 'Innovation First',
    body: "We don't wait for the industry to catch up. ELV 24VDC, SS316 stainless, in-house IP — we build tomorrow's technology today.",
  },
  {
    num: '02',
    title: 'Total Control',
    body: '100% in-house design and manufacture. If something goes wrong, we own the fix. No pointing at suppliers.',
  },
  {
    num: '03',
    title: '24/7 Commitment',
    body: "Mining doesn\u2019t stop. Neither do we. Factory-trained technicians, nationwide, around the clock.",
  },
  {
    num: '04',
    title: 'Long Game',
    body: "Every partnership is built for decades, not transactions. Our clients' success is our business model.",
  },
]

const clients = [
  { src: '/client-bhp.png', alt: 'BHP' },
  { src: '/client-glencore.png', alt: 'Glencore' },
  { src: '/client-anglo-american.png', alt: 'Anglo American' },
  { src: '/client-whitehaven.png', alt: 'Whitehaven Coal' },
  { src: '/client-yancoal.png', alt: 'Yancoal' },
]

// ─── Page ────────────────────────────────────────────────────────────────────
export default function OurStoryPage() {
  return (
    <div className="bg-black text-white">
      <SiteHeader />

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — full viewport, dramatic
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[640px]">
        <Image
          src="/our-story-hero.webp"
          alt="Mickala lighting tower at a remote Australian mine site"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Layered gradient: subtle mid-tone, then strong bottom pull */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        <div className="absolute bottom-0 inset-x-0">
          <div className="max-w-[1200px] mx-auto px-6 pb-20 sm:pb-28">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-5">
              Since 2007
            </p>
            <h1 className="text-6xl sm:text-8xl lg:text-[110px] font-bold tracking-tight leading-[0.92] mb-6">
              Built from
              <br />
              Nothing.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
              From a dairy farm in rural Australia to 120 staff and 2,000+ lighting towers
              deployed across the world&apos;s toughest mine sites.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:1300642525"
                className="inline-flex items-center px-7 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full"
              >
                Call 1300 642 525
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center px-7 py-3.5 border border-white/25 hover:border-white/50 transition-colors text-sm font-semibold rounded-full"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. STATS STRIP — animated count-up
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. ORIGIN STORY — editorial 60/40 split
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-0 items-stretch">

            {/* Left: 60% */}
            <div className="lg:col-span-3 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-8">
                The Origin
              </p>

              {/* Pull quote */}
              <p className="text-2xl sm:text-3xl font-light italic text-white/80 leading-snug mb-10">
                &ldquo;He was told it wouldn&apos;t work.
                <br />
                He built it anyway.&rdquo;
              </p>

              <div className="space-y-5 text-sm text-white/55 leading-relaxed max-w-[540px]">
                <p>
                  Damien Englebrecht grew up on a dairy farm. When he left, he had one
                  idea and a relentless drive to make it work. The lighting tower industry
                  in Australia was dominated by foreign-made equipment that didn&apos;t
                  understand Australian mining conditions.
                </p>
                <p>
                  Starting from a back shed in 2007, he designed the first Mickala tower
                  himself. The engineering was different — extra-low voltage, built for
                  the heat, dust, and distance of Australian mine sites. No compromises.
                </p>
                <p>
                  What started as one man and one idea became Australia&apos;s only
                  privately owned OEM manufacturer of LED lighting towers.{' '}
                  <span className="text-white font-semibold">120 staff. 2,000+ towers. 200+ mine sites.</span>{' '}
                  Built from nothing.
                </p>
              </div>
            </div>

            {/* Right: 40% — tall editorial photo */}
            <div className="lg:col-span-2 relative aspect-[3/4] lg:aspect-auto lg:min-h-[560px] overflow-hidden border border-white/[0.06]">
              <Image
                src="/our-story-photo.webp"
                alt="Mickala towers in the field"
                fill
                className="object-cover object-center"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. FIELD IMAGERY BREAK — full-bleed diptych
      ═══════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 sm:grid-cols-2">

        {/* Left image */}
        <div className="relative aspect-[4/3] overflow-hidden group">
          <Image
            src="/field-open-pit-dusk.jpg"
            alt="Open pit mine at dusk — Mickala towers at scale"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-2">
              The Environment
            </p>
            <p className="text-xl sm:text-2xl font-bold leading-snug text-white max-w-xs">
              Where our towers work.
            </p>
          </div>
        </div>

        {/* Right image */}
        <div className="relative aspect-[4/3] overflow-hidden group">
          <Image
            src="/field-towers-lineup-dusk.jpg"
            alt="Row of Mickala lighting towers lit up at twilight"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-2">
              The Product
            </p>
            <p className="text-xl sm:text-2xl font-bold leading-snug text-white max-w-xs">
              What 17 years of refinement looks like.
            </p>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. PHILOSOPHY — dark, numbered principles
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="mb-16 sm:mb-20">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
              Our Philosophy
            </p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[0.95] mb-4">
              How we think.
            </h2>
            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              These aren&apos;t values on a wall. They&apos;re decisions made every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-white/[0.06]">
            {principles.map((p) => (
              <div key={p.num} className="bg-black p-10 sm:p-12">
                <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] tabular-nums mb-6">
                  {p.num}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{p.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. LOCATIONS — clean two-card layout
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase text-center mb-12">
            Our Locations
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

            <div className="border border-white/[0.06] py-10 px-8 text-center hover:border-white/20 transition-colors">
              <p className="text-[11px] text-white/40 font-medium tracking-[0.12em] uppercase mb-3">
                Head Office
              </p>
              <p className="text-base font-semibold mb-2">Mackay QLD</p>
              <p className="text-sm text-white/40 leading-relaxed">
                21 Caterpillar Drive
                <br />
                Paget QLD 4740
              </p>
            </div>

            <div className="border border-white/[0.06] py-10 px-8 text-center hover:border-white/20 transition-colors">
              <p className="text-[11px] text-white/40 font-medium tracking-[0.12em] uppercase mb-3">
                NSW Office
              </p>
              <p className="text-base font-semibold mb-2">Muswellbrook NSW</p>
              <p className="text-sm text-white/40 leading-relaxed">
                37 Thomas Mitchell Drive
                <br />
                Muswellbrook NSW 2333
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. CLIENT LOGOS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-white/30 font-medium tracking-[0.15em] uppercase text-center mb-12">
            Partners across Australia&apos;s mining sector
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {clients.map((c) => (
              <div key={c.alt} className="relative h-8 w-28 opacity-40 hover:opacity-70 transition-opacity">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          8. CTA — bold close
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-5">
            Get in Touch
          </p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[0.95] mb-5">
            Ready to talk?
          </h2>
          <p className="text-sm text-white/50 mb-10 max-w-sm mx-auto leading-relaxed">
            Tell us about your site. We&apos;ll tell you exactly what will work — and why.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:1300642525"
              className="inline-flex items-center px-8 py-4 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full"
            >
              Call 1300 642 525
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-4 border border-white/25 hover:border-white/50 transition-colors text-sm font-semibold rounded-full"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
