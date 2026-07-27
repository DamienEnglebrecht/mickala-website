"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Calculator, TrendingDown, DollarSign } from "lucide-react"

export default function TCOCalculatorPage() {
  const [towers, setTowers] = useState(20)
  const [hours, setHours] = useState(13)
  const [rate, setRate] = useState<"mickala" | "competitor">("mickala")
  const [interval, setInterval] = useState<250 | 500>(500)

  // Calculate savings
  const servicesPerYear = (hours * 365) / interval
  const specialistCost = servicesPerYear * 2 * 200 * towers
  const elvCost = servicesPerYear * 1 * 100 * towers
  const serviceLabourSaved = Math.round(specialistCost - elvCost)
  const partsSaved = towers * 600
  const totalSaved = serviceLabourSaved + partsSaved
  const fiveYearSaved = totalSaved * 5

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[900px] mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <Calculator className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">ROI Calculator</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Total Cost of Ownership</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-10 max-w-xl">See the real cost difference. Mickala&apos;s ELV 24VDC towers can be serviced by a Mickala Factory Trained Technician — competitors require a Competitor Technician.</p>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="text-[11px] text-white/40 tracking-wide uppercase mb-3 block">Number of Towers</label>
              <input type="range" min={1} max={100} value={towers} onChange={(e) => setTowers(parseInt(e.target.value))} className="w-full accent-[#DC2626]" />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>1</span>
                <span className="text-white font-semibold">{towers}</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-white/40 tracking-wide uppercase mb-3 block">Operating Hours per Day</label>
              <input type="range" min={8} max={24} value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full accent-[#DC2626]" />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>8</span>
                <span className="text-white font-semibold">{hours}h</span>
                <span>24</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-white/40 tracking-wide uppercase mb-3 block">Service Interval</label>
              <div className="flex gap-2">
                <button onClick={() => setInterval(250)} className={`flex-1 py-3 text-xs border rounded-sm transition-colors ${
                  interval === 250 ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
                }`}>250 hrs (Competitor standard)</button>
                <button onClick={() => setInterval(500)} className={`flex-1 py-3 text-xs border rounded-sm transition-colors ${
                  interval === 500 ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
                }`}>500 hrs (Mickala ELV)</button>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-white/40 tracking-wide uppercase mb-3 block">Service Technician Type</label>
              <div className="flex gap-2">
                <button onClick={() => setRate("mickala")} className={`flex-1 py-3 text-xs border rounded-sm transition-colors ${
                  rate === "mickala" ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
                }`}>Mickala Factory Trained Technician</button>
                <button onClick={() => setRate("competitor")} className={`flex-1 py-3 text-xs border rounded-sm transition-colors ${
                  rate === "competitor" ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
                }`}>Competitor Technician</button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="border border-white/[0.06] rounded-sm p-6">
            <p className="text-[11px] text-white/40 tracking-[0.15em] uppercase mb-4">Estimated Savings</p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                <span className="text-xs text-white/50">Service Labour</span>
                <span className="text-sm text-[#DC2626] font-semibold">${serviceLabourSaved.toLocaleString()} saved per year</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                <span className="text-xs text-white/50">Parts & Consumables</span>
                <span className="text-sm text-[#DC2626] font-semibold">${partsSaved.toLocaleString()} saved per year</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                <span className="text-xs text-white/50 font-semibold">Total Annual</span>
                <span className="text-sm text-[#DC2626] font-bold">${totalSaved.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-white/50 font-semibold">Over 5 years with {towers} towers</span>
                <span className="text-base text-[#DC2626] font-bold">${fiveYearSaved.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-white/30 mb-4">saved with Mickala ELV 24VDC</p>
            <div className="flex gap-2">
              <a href="/quote" className="flex-1 text-center py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-xs font-semibold rounded-sm">Get a Quote</a>
              <a href="tel:1300642525" className="flex-1 text-center py-3 border border-white/20 hover:border-white/40 transition-colors text-xs font-semibold rounded-sm">1300 642 525</a>
            </div>
          </div>
        </div>

        {/* Why it matters */}
        <div className="border-t border-white/[0.06] pt-10">
          <p className="text-[11px] text-[#DC2626] tracking-[0.15em] uppercase mb-4">Why ELV 24VDC?</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: "Factory Trained Technician", desc: "No competitor technician required. Our factory trained technicians know the ELV 24VDC system inside out." },
              { label: "500hr Service Interval", desc: "Extended service intervals mean fewer maintenance days and more uptime on site." },
              { label: "Fewer Parts, Lower Cost", desc: "Simpler electrical system means fewer components that can fail. Less inventory to carry." },
            ].map((item) => (
              <div key={item.label} className="p-4 border border-white/[0.06]">
                <p className="text-sm font-semibold mb-1">{item.label}</p>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
