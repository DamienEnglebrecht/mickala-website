"use client"

import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Download, CheckCircle, Shield, Zap, AlertTriangle, Wifi, Fuel, Wind, Wrench } from "lucide-react"
import { useState } from "react"
import type { CategoryData } from "./page"

// ---------------------------------------------------------------------------
// Feature icon — picks icon based on keyword in feature text
// ---------------------------------------------------------------------------

function featureIcon(text: string) {
  const t = text.toLowerCase()
  if (t.includes("emergency") || t.includes("stop")) return <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
  if (t.includes("voltage") || t.includes("elv") || t.includes("electrician") || t.includes("jump")) return <Zap className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
  if (t.includes("compliant") || t.includes("mdg") || t.includes("tier") || t.includes("iso")) return <Shield className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
  if (t.includes("gps") || t.includes("monitor") || t.includes("remote") || t.includes("beacon")) return <Wifi className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
  if (t.includes("fuel") || t.includes("bunded") || t.includes("contaminant")) return <Fuel className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
  if (t.includes("air") || t.includes("filter") || t.includes("dust") || t.includes("optic")) return <Wind className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
  if (t.includes("paint") || t.includes("coated") || t.includes("fire") || t.includes("lockable")) return <Wrench className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
  return <CheckCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
}

// ---------------------------------------------------------------------------
// Client component
// ---------------------------------------------------------------------------

export function LightingTowerClient({ slug, cat }: { slug: string; cat: CategoryData }) {
  const [activeModel, setActiveModel] = useState(0)
  const selected = cat.models[activeModel]

  const navItems = ["Overview", "Models", "Specs", "Features", "Downloads"]

  // Build wattage range for quick-stats
  const wattageValues = cat.models.map((m) => parseInt(m.led.replace(/\D/g, "")))
  const minW = Math.min(...wattageValues)
  const maxW = Math.max(...wattageValues)
  const wattageRange = minW === maxW ? `${minW}W` : `${minW}W – ${maxW}W`

  const quickStats = [
    { value: String(cat.models.length), label: "Models" },
    { value: wattageRange, label: "Wattage" },
    { value: "ELV 24VDC", label: "Voltage" },
    { value: "12 months", label: "Warranty" },
  ]

  const complianceBadges = ["MDG15", "MDG41", "ELV 24VDC", "ISO 9001"]

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ================================================================
          SITE HEADER
      ================================================================ */}
      <SiteHeader />

      {/* ================================================================
          STICKY SUB-NAV  — sits flush below the 80px site header
      ================================================================ */}
      <div className="sticky top-20 inset-x-0 z-40 h-10 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] text-white/50 hover:text-white transition-colors tracking-[0.12em] uppercase"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="tel:1300642525"
            className="hidden sm:block text-[11px] text-white/60 hover:text-white transition-colors tracking-[0.12em] uppercase"
          >
            1300 642 525
          </a>
        </div>
      </div>

      {/* ================================================================
          HERO — full viewport, tower-specific image
      ================================================================ */}
      <section id="overview" className="relative h-screen min-h-[640px]">
        <Image
          src={cat.heroImage}
          alt={`${cat.title} lighting tower`}
          fill
          className="object-cover"
          priority
          onError={() => {/* fallback handled by Next.js */}}
        />
        {/* Multi-stop gradient — heavy at bottom, lighter fade top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        {/* Subtle left-edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Hero content — bottom-left */}
        <div className="absolute bottom-0 inset-x-0">
          <div className="max-w-[1200px] mx-auto px-6 pb-28 sm:pb-36">
            {/* Red eyebrow label */}
            <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-5">
              LIGHTING TOWERS — {cat.title.toUpperCase()}
            </p>

            {/* Tower name — big */}
            <h1 className="text-6xl sm:text-8xl lg:text-[96px] font-bold tracking-tight leading-[0.88] mb-6">
              {cat.title}
            </h1>

            {/* One-liner description */}
            <p className="text-base sm:text-lg text-white/60 max-w-md mb-10 leading-relaxed">
              {cat.description}
            </p>

            {/* Quick-stats — inline pipe-separated */}
            <div className="flex flex-wrap items-center gap-0">
              {quickStats.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div className="pr-5 sm:pr-8">
                    <span className="block text-xl sm:text-2xl font-bold leading-tight">{s.value}</span>
                    <span className="block text-[10px] text-white/40 tracking-[0.12em] uppercase mt-0.5">{s.label}</span>
                  </div>
                  {i < quickStats.length - 1 && (
                    <span className="text-white/20 text-xl mr-5 sm:mr-8 -mt-2">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MODELS SECTION
      ================================================================ */}
      <section id="models" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section label + heading */}
          <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">Models</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-12">
            Choose your configuration.
          </h2>

          {/* Model cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {cat.models.map((m, i) => {
              const isActive = i === activeModel
              return (
                <button
                  key={m.slug}
                  onClick={() => setActiveModel(i)}
                  className={[
                    "text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer",
                    "hover:-translate-y-1",
                    isActive
                      ? "bg-white/[0.07] border-[#DC2626]/70 shadow-[0_0_24px_rgba(220,38,38,0.15)]"
                      : "bg-white/[0.04] border-white/[0.06] hover:border-[#DC2626]/60 hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  {/* Model name */}
                  <p className="text-sm font-bold text-white mb-1 tracking-wide">{m.name}</p>
                  {/* Spec highlights */}
                  <div className="space-y-1 mt-3 pt-3 border-t border-white/[0.06]">
                    <p className="text-[11px] text-white/40 leading-snug">{m.led} LED output</p>
                    <p className="text-[11px] text-white/40 leading-snug">ELV 24VDC</p>
                    <p className="text-[11px] text-white/40 leading-snug">MDG15 · MDG41</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected model detail panel */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 sm:p-12">
            {/* Product image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.03]">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-contain p-6"
              />
            </div>

            {/* Model info */}
            <div>
              <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-3">Selected Model</p>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{selected.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-sm">{selected.desc}</p>

              {/* Key specs for selected */}
              <div className="space-y-0 mb-8">
                {(
                  [
                    ["LED Output", selected.led],
                    ["Voltage", "ELV 24VDC"],
                    ["Compliance", "MDG15, MDG41"],
                    ["Warranty", "12 months / 1500 hrs"],
                  ] as [string, string][]
                ).map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-[11px] text-white/40 uppercase tracking-[0.08em]">{label}</span>
                    <span className="text-sm font-semibold">{val}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {selected.specSheet && (
                  <a
                    href={selected.specSheet}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-white/40 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-white/[0.06]"
                  >
                    <Download className="w-3 h-3" /> Spec Sheet
                  </a>
                )}
                {selected.lightSim && (
                  <a
                    href={selected.lightSim}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-white/40 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-white/[0.06]"
                  >
                    <Download className="w-3 h-3" /> Light Sim
                  </a>
                )}
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
                >
                  Get a Quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SPECS SECTION
      ================================================================ */}
      <section id="specs" className="py-20 sm:py-28 bg-white/[0.02] border-t border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">Technical Specifications</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-12">
            Built for the toughest sites.
          </h2>

          {/* Two-column: spec table | image */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* LEFT — compliance badges + spec rows */}
            <div>
              {/* Compliance badge pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {complianceBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-block px-3 py-1 rounded-full border border-[#DC2626]/50 text-[#DC2626] text-[10px] font-semibold tracking-[0.12em] uppercase"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Spec rows */}
              <div className="border-t border-white/[0.06]">
                {cat.specs.map((spec, i) => (
                  <div
                    key={spec[0]}
                    className={[
                      "flex items-center justify-between py-4",
                      i < cat.specs.length - 1 ? "border-b border-white/[0.06]" : "",
                    ].join(" ")}
                  >
                    <span className="text-[11px] text-white/40 font-medium tracking-[0.1em] uppercase">{spec[0]}</span>
                    <span className="text-sm font-medium text-white text-right ml-6">{spec[1]}</span>
                  </div>
                ))}
              </div>

              {/* Supporting copy */}
              <p className="text-xs text-white/30 leading-relaxed mt-8 max-w-sm">
                Every Mickala lighting tower is designed and manufactured to meet the strictest Australian mining safety and environmental standards.
              </p>
            </div>

            {/* RIGHT — full-bleed components image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/lighting-tower-components.jpg"
                alt="Lighting tower components"
                fill
                className="object-cover"
              />
              {/* Subtle gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FIELD PHOTOGRAPHY INTERLUDE — cinematic visual break
      ================================================================ */}
      <div className="relative w-full" style={{ height: "50vh", minHeight: 300 }}>
        <Image
          src="/field-mine-night.jpg"
          alt="Lighting towers deployed at mine site"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight max-w-2xl leading-snug">
            Deployed and operational across{" "}
            <span className="text-[#DC2626]">200+ mine sites.</span>
          </p>
        </div>
      </div>

      {/* ================================================================
          FEATURES SECTION
      ================================================================ */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">Standard Features</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-12">
            Everything you need.
          </h2>

          {/* 2-column feature card grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {cat.features.map((f) => (
              <div
                key={f}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-200"
              >
                {featureIcon(f)}
                <span className="text-sm text-white/75 leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          DOWNLOADS SECTION
      ================================================================ */}
      <section id="downloads" className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">Downloads</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-12">
            Spec sheets &amp; light simulations.
          </h2>

          {/* Download rows */}
          <div className="border-t border-white/[0.06]">
            {cat.models.map((m) => (
              <div
                key={m.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-b border-white/[0.06]"
              >
                {/* Model info */}
                <div>
                  <p className="text-sm font-bold text-white">{m.name}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">{m.led}</p>
                </div>

                {/* Download pills */}
                <div className="flex items-center gap-3">
                  {m.specSheet ? (
                    <a
                      href={m.specSheet}
                      download
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 text-[11px] font-semibold text-white/60 hover:text-white hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-200 tracking-wide uppercase"
                    >
                      <Download className="w-3 h-3" /> Spec Sheet
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.06] text-[11px] text-white/20 tracking-wide uppercase cursor-not-allowed">
                      <Download className="w-3 h-3" /> Spec Sheet
                    </span>
                  )}
                  {m.lightSim ? (
                    <a
                      href={m.lightSim}
                      download
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 text-[11px] font-semibold text-white/60 hover:text-white hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-200 tracking-wide uppercase"
                    >
                      <Download className="w-3 h-3" /> Light Sim
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.06] text-[11px] text-white/20 tracking-wide uppercase cursor-not-allowed">
                      <Download className="w-3 h-3" /> Light Sim
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View all link */}
          {cat.models.some((m) => m.specSheet) && (
            <div className="mt-8">
              <a
                href={`/spec-sheets?category=${slug}`}
                className="inline-flex items-center text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold"
              >
                View all on spec sheets page →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          QUOTE FORM SECTION
      ================================================================ */}
      <section className="py-20 sm:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">
            {/* LEFT — form (~60%) */}
            <div>
              <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.2em] uppercase mb-4">Get a Quote</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-3">
                Need a {cat.title.toLowerCase()} tower?
              </h2>
              <p className="text-sm text-white/50 mb-10 leading-relaxed">
                Tell us what you need and we&apos;ll get back to you within 24 hours.
              </p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626] transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company / Site Name"
                  className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626] transition-colors"
                />
                <textarea
                  placeholder="Tell us about your requirements — number of towers, site conditions, duration..."
                  className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626] transition-colors h-28 resize-none"
                />
                <Link
                  href="/quote"
                  className="block w-full text-center px-6 py-4 bg-[#DC2626] hover:bg-[#B91C1C] transition-all duration-200 text-sm font-bold rounded-full tracking-wide"
                >
                  Submit Enquiry
                </Link>
                <p className="text-[11px] text-white/25 text-center">
                  We&apos;ll respond within 24 hours. No spam, ever.
                </p>
              </form>
            </div>

            {/* RIGHT — trust signals card (~40%) */}
            <div className="lg:pt-16">
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-8 space-y-6">
                <p className="text-xs text-white/40 uppercase tracking-[0.12em] font-semibold mb-2">Why Mickala</p>

                {[
                  {
                    icon: <Zap className="w-5 h-5 text-[#DC2626]" />,
                    title: "24hr Response",
                    desc: "Our team responds to every enquiry within one business day — guaranteed.",
                  },
                  {
                    icon: <Wrench className="w-5 h-5 text-[#DC2626]" />,
                    title: "Factory-Trained Team",
                    desc: "Sales and support staff trained directly at our manufacturing facility.",
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-[#DC2626]" />,
                    title: "Australian Made",
                    desc: "Designed and built in Australia for Australian conditions.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                      <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-white/[0.06] pt-6">
                  <p className="text-[11px] text-white/30 leading-relaxed">
                    Or call us directly at{" "}
                    <a href="tel:1300642525" className="text-white/60 hover:text-white transition-colors">
                      1300 642 525
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SITE FOOTER
      ================================================================ */}
      <SiteFooter />
    </div>
  )
}
