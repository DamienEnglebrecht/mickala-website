import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

// ─── Data ─────────────────────────────────────────────────────────────────────

const techFeatures = [
  {
    title: 'Concealed LED Source',
    body: 'Powerful LEDs are hidden inside the deep parabolic reflector. Outside the full cut-off zone, the light source is completely invisible.',
  },
  {
    title: 'Patented Full Cut-Off',
    body: 'Adjustable from 57° to 70° — sharper than any standard floodlight. Zero upward light. Zero backward spill. Dark Sky compliant by design.',
  },
  {
    title: 'Up to 160 lm/W Efficiency',
    body: 'No wasted light means higher efficiency. Every lumen goes exactly where it\'s needed — not into the sky or your neighbour\'s window.',
  },
  {
    title: 'Unique Tilt Capability',
    body: 'The Dark Licht can tilt 15° above horizontal while maintaining full cut-off at 90°. No other fitting can do this.',
  },
]

const applications = [
  {
    icon: '◆',
    title: 'Roadworks & Infrastructure',
    body: 'No glare into passing drivers. Compliant for use on public roads and highways. Sharp cut-off keeps light on the work, not in eyes.',
  },
  {
    icon: '◆',
    title: 'Wind Farms',
    body: 'Illuminate maintenance areas without light pollution across the turbine field. Dark Sky compliant for rural and sensitive environments.',
  },
  {
    icon: '◆',
    title: 'Construction Near Residential',
    body: 'Work through the night without neighbour complaints. No spill light, no sky glow, no disruption beyond the fence line.',
  },
]

const models = [
  { name: 'DL1-320', wattage: '320W', image: '/darklicht-dl1.webp' },
  { name: 'DL1-400', wattage: '400W', image: '/darklicht-dl1-400.webp' },
  { name: 'DL1-600', wattage: '600W', image: '/darklicht-dl1-600.webp' },
  { name: 'DL2-800', wattage: '800W', image: '/darklicht-dl2.webp' },
  { name: 'DL2-1200', wattage: '1200W', image: '/darklicht-dl2-1200.webp' },
  { name: 'DL3-1800', wattage: '1800W', image: '/darklicht-dl3.webp' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GlareFreelighting() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <SiteHeader />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full viewport, windfarm background
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[680px] flex items-end">
        <Image
          src="/field-glare-free-windfarm.jpg"
          alt="Mickala Glare Free lighting tower illuminating a wind farm at night"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Rich dark gradient — heavy at bottom-left, fades top-right */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        {/* Content — bottom-left */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-24 sm:pb-32">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Industry First
          </p>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight leading-[0.9] mb-6 max-w-3xl">
            Glare Free<br />Lighting.
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
            The world&apos;s first portable lighting tower with full-cutoff, zero-spill illumination.
            Used in residential, public, and sensitive environments where conventional towers simply cannot operate.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-7 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] transition-all duration-300 text-sm font-bold rounded-full shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]"
            >
              Request a Quote
            </Link>
            <Link
              href="tel:1300642525"
              className="inline-flex items-center px-7 py-3.5 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 text-sm font-bold rounded-full text-white/80"
            >
              Call 1300 642 525
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHAT IS GLARE FREE — editorial two-column section
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

            {/* Left — editorial copy */}
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
                The Problem with Conventional Towers
              </p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-8">
                Every other tower lights up the sky. Ours doesn&apos;t.
              </h2>
              <div className="space-y-5 text-sm text-white/60 leading-relaxed">
                <p>
                  Standard portable lighting towers use open floodlights. They blast light in every
                  direction — at the work area, at the sky, at neighbouring properties, at the eyes
                  of workers and passing drivers. It&apos;s inefficient, it&apos;s dangerous, and
                  increasingly it&apos;s non-compliant.
                </p>
                <p>
                  Mickala&apos;s Glare Free towers are the world&apos;s first portable towers fitted
                  with Dark Licht full-cutoff optics. The LED source is hidden inside a deep
                  parabolic reflector. Outside the defined beam angle, there is zero visible light.
                  None.
                </p>
                <p>
                  The result: a sharp, precise beam that illuminates exactly your work area.
                  Nothing spills. Nothing glares. The sky stays dark.
                </p>
              </div>
            </div>

            {/* Right — comparison card */}
            <div className="bg-white/[0.04] border border-white/[0.06] p-8 rounded-sm">
              {/* Conventional */}
              <p className="text-sm font-bold text-white/80 mb-4">Conventional Tower</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Glare into workers\' eyes',
                  'Light spill to neighbours',
                  'Sky glow / light pollution',
                  'Non-compliant near residential',
                  'Complaints and delays',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/50">
                    <span className="mt-0.5 text-red-500 flex-shrink-0">❌</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/[0.08] my-6" />

              {/* Mickala */}
              <p className="text-sm font-bold text-white mb-4">Mickala Glare Free</p>
              <ul className="space-y-2.5">
                {[
                  'Zero glare — full cut-off optic',
                  'Zero spill to neighbours',
                  'Dark Sky compliant',
                  'Approved near residential and roads',
                  'Quieter communities, faster projects',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-0.5 text-emerald-400 flex-shrink-0">✅</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE TECHNOLOGY — Dark background feature grid
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
              Dark Licht Technology
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
              How the optic works.
            </h2>
          </div>

          {/* 2×2 feature grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {techFeatures.map((feat) => (
              <div
                key={feat.title}
                className="border border-white/[0.06] p-6 bg-white/[0.02]"
              >
                <p className="text-base font-bold mb-3">{feat.title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{feat.body}</p>
              </div>
            ))}
          </div>

          {/* Dark Licht product image */}
          <div className="max-w-sm mx-auto border border-white/[0.06] overflow-hidden bg-white/[0.02]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/darklicht-dl1.webp"
                alt="Dark Licht DL1 full-cutoff LED fitting"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="px-4 py-3 border-t border-white/[0.06] text-center">
              <p className="text-[11px] text-white/40 tracking-[0.1em] uppercase font-medium">
                Dark Licht DL1 — Patented Full Cut-Off Optic
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          APPLICATIONS — 3-column application cards
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
              Where It Works
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
              Built for sensitive environments.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div
                key={app.title}
                className="border border-white/[0.06] p-6 bg-white/[0.02]"
              >
                <span className="block text-[#DC2626] text-lg mb-4">{app.icon}</span>
                <p className="text-base font-bold mb-3">{app.title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{app.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IN THE FIELD — Real Mickala photography gallery
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
              Real Applications
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
              Seen in the field.
            </h2>
          </div>

          {/* Hero image — full width */}
          <div className="relative w-full aspect-[16/7] overflow-hidden mb-3">
            <Image
              src="/glare-free-garden-2.jpg"
              alt="Mickala Glare Free tower illuminating a manicured lawn on a private estate at night"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-0 left-0 p-4 text-white/70 text-xs">
              Private estate, Queensland. Zero light spill beyond the property boundary.
            </p>
          </div>

          {/* Two images side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/glare-free-garden-1.jpg"
                alt="Mickala Glare Free tower providing garden event lighting at night"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-0 left-0 p-4 text-white/70 text-xs">
                Garden event lighting. No glare into adjacent properties.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/glare-free-rural.jpg"
                alt="Mickala Glare Free tower on a rural construction site at night"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-0 left-0 p-4 text-white/70 text-xs">
                Rural construction site. Sharp beam edge, clean cut-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRODUCT RANGE — Dark Licht model cards
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
              Available Models
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
              Dark Licht range.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <div
                key={model.name}
                className="group relative overflow-hidden border border-white/[0.06] hover:border-[#DC2626]/40 transition-all duration-300 bg-white/[0.02]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={model.image}
                    alt={`Dark Licht ${model.name}`}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {/* Model label */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="text-base font-black tracking-tight">{model.name}</p>
                    <p className="text-[11px] text-white/50 font-medium tracking-[0.08em] uppercase">
                      {model.wattage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — Ready for glare free?
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
              Get Started
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.0] mb-6">
              Ready for glare free?
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-10 max-w-lg">
              Suitable for roadworks, wind farms, construction near residential areas, and anywhere
              conventional towers cause problems. Talk to the team today.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center px-7 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] transition-all duration-300 text-sm font-bold rounded-full shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]"
              >
                Request a Quote
              </Link>
              <Link
                href="tel:1300642525"
                className="inline-flex items-center px-7 py-3.5 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300 text-sm font-bold rounded-full text-white/80"
              >
                Call 1300 642 525
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
