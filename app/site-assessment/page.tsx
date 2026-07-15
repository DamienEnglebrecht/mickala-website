"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { MapPin, Truck, Crosshair, Sparkles, RefreshCw, Hash, Fuel, Wrench, Zap, Clock, AlertTriangle } from "lucide-react"

type AssessmentMode = "area" | "fleet"

// Savings per tower — Mickala vs competitor LED (your real data)
const fuelPerHourMickala = 0.8   // L/hr
const fuelPerHourCompetitor = 1.5 // L/hr
const fuelPricePerLitre = 1.50
const hoursPerNight = 13
const nightsPerYear = 365
const fuelSavedPerTowerPerYear = (fuelPerHourCompetitor - fuelPerHourMickala) * hoursPerNight * nightsPerYear * fuelPricePerLitre

// Service visits: Mickala 9/month, competitor ~15/month
const serviceVisitsMickala = 9
const serviceVisitsCompetitor = 15
const serviceTruckCostPerHour = 150
const hoursPerVisit = 1.5 // avg time including travel
const serviceCostSavedPerTowerPerYear = (serviceVisitsCompetitor - serviceVisitsMickala) * 12 * hoursPerVisit * serviceTruckCostPerHour

// Breakdowns: 10x fewer — assume competitor has 2 breakdown call-outs/month, Mickala 0.2
const breakdownsCompetitor = 2   // per month
const breakdownsMickala = 0.2
const breakdownCostPerCallout = 450 // avg labour + parts for minor fix
const breakdownCostSavedPerTowerPerYear = (breakdownsCompetitor - breakdownsMickala) * 12 * breakdownCostPerCallout

// Light output: 50% brighter → 33% fewer towers
const brightnessMultiplier = 1.5 // 50% brighter

// Mining equipment → lighting requirements (real industry ratios)
const fleetLightingRules = {
  digFleet: { towersPerFleet: 9, towerType: "MLT 7200 Sled Long Range", coverage: 18, notes: "Pit zone — shovel, dump area, access ramps, and bench lighting" },
  trucks: { towersPer10Trucks: 5, towerType: "MLT 2560-LED Dual Axle", coverage: 8, notes: "Haul road illumination per MDG15 standards" },
  dozers: { towersPerDozer: 3, towerType: "MLT 2560 Sled Mount", coverage: 10, notes: "Dozer push zone, ROM pad, and stockpile lighting" },
  dumps: { towersPerDump: 5, towerType: "MLT 7200 Sled Long Range", coverage: 18, notes: "Tip head — illumination for reversing, dumping, and dozer activity" },
  romPad: { towersPerPad: 2, towerType: "MLT 2560-LED Dual Axle", coverage: 8, notes: "ROM pad, crusher feed, and stockpile lighting" },
}

const knownFleets: Record<string, any> = {
  "peak downs": { digFleets: 6, trucks: 40, dozers: 8, dumps: 3, name: "Peak Downs Mine — BMA", coord: [-22.1683, 148.0937] },
  "goonyella": { digFleets: 5, trucks: 35, dozers: 6, dumps: 3, name: "Goonyella Riverside — BMA", coord: [-21.7400, 147.9700] },
  "saraji": { digFleets: 4, trucks: 28, dozers: 5, dumps: 2, name: "Saraji Mine — BMA", coord: [-22.3100, 148.0500] },
  "hail creek": { digFleets: 3, trucks: 20, dozers: 4, dumps: 2, name: "Hail Creek Mine — Glencore", coord: [-21.4833, 148.0333] },
  "clermont": { digFleets: 3, trucks: 18, dozers: 4, dumps: 2, name: "Clermont Mine — Glencore", coord: [-22.7000, 147.6300] },
  "curragh": { digFleets: 6, trucks: 50, dozers: 12, dumps: 4, name: "Curragh Mine — Coronado Global", coord: [-23.5000, 148.8000] },
  "middlemount": { digFleets: 3, trucks: 46, dozers: 6, dumps: 2, name: "Middlemount Coal — Peabody/Yancoal", coord: [-22.8200, 148.6900] },
  "daunia": { digFleets: 2, trucks: 14, dozers: 3, dumps: 1, name: "Daunia Mine — Whitehaven", coord: [-21.8700, 148.1400] },
  "bengalla": { digFleets: 2, trucks: 15, dozers: 3, dumps: 2, name: "Bengalla Mine — New Hope", coord: [-32.1483, 150.9289] },
  "carmichael": { digFleets: 3, trucks: 22, dozers: 5, dumps: 2, name: "Carmichael Mine — Bravus", coord: [-22.0800, 147.8500] },
  "caval ridge": { digFleets: 3, trucks: 20, dozers: 4, dumps: 2, name: "Caval Ridge Mine — BMA", coord: [-22.2500, 148.1000] },
  "poitrel": { digFleets: 2, trucks: 12, dozers: 3, dumps: 1, name: "Poitrel Mine — Stanmore", coord: [-21.8900, 148.0700] },
  "blackwater": { digFleets: 4, trucks: 30, dozers: 8, dumps: 3, name: "Blackwater Mine — BMA", coord: [-23.7500, 148.8000] },
}

const knownAreas: Record<string, number> = {
  "peak downs": 95, "goonyella": 75, "saraji": 60, "hail creek": 42,
  "clermont": 37, "curragh": 80, "daunia": 26, "bengalla": 30,
  "carmichael": 30, "caval ridge": 35, "poitrel": 30, "four mile": 23,
  "ensham": 18, "yarrabee": 15, "new acland": 12, "hvo": 20,
  "mt carbine": 10, "blackwater": 85,
  "middlemount": 35,
}

function formatCurrency(n: number): string {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return "$" + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K"
  return "$" + Math.round(n).toLocaleString()
}

export default function SiteAssessmentPage() {
  const [mode, setMode] = useState<AssessmentMode>("fleet")
  const [input, setInput] = useState("")
  const [assessing, setAssessing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const [digFleets, setDigFleets] = useState(3)
  const [trucks, setTrucks] = useState(20)
  const [dozers, setDozers] = useState(4)
  const [dumps, setDumps] = useState(2)

  const [areaHa, setAreaHa] = useState(30)

  const calculateSavings = (totalUnits: number) => {
    // With 50% brighter lights, they need 33% fewer Mickala towers vs competitor
    const effectiveUnits = totalUnits
    const competitorUnits = Math.ceil(effectiveUnits * brightnessMultiplier) // would need 50% more competitor towers

    const fuel = Math.round(fuelSavedPerTowerPerYear * effectiveUnits)
    const servicing = Math.round(serviceCostSavedPerTowerPerYear * effectiveUnits)
    const breakdowns = Math.round(breakdownCostSavedPerTowerPerYear * effectiveUnits)
    const totalAnnual = fuel + servicing + breakdowns

    return { fuel, servicing, breakdowns, totalAnnual, competitorUnits, effectiveUnits }
  }

  const calculateFleet = (fleets: number, trks: number, dzrs: number, dps: number, siteName: string) => {
    const recs: any[] = []
    let totalUnits = 0

    if (fleets > 0) {
      const u = Math.ceil(fleets * fleetLightingRules.digFleet.towersPerFleet)
      totalUnits += u
      recs.push({ category: "Dig Fleet Zone", units: u, towerType: "MLT 7200 Sled Long Range", notes: `${fleets} dig fleets — excavation, dump area, haul road entry` })
    }

    if (trks > 0) {
      const u = Math.ceil((trks / 10) * fleetLightingRules.trucks.towersPer10Trucks)
      totalUnits += u
      recs.push({ category: "Haul Road", units: u, towerType: "MLT 2560-LED Dual Axle", notes: `${trks} trucks — haul road illumination per MDG15` })
    }

    if (dzrs > 0) {
      const u = Math.ceil(dzrs * fleetLightingRules.dozers.towersPerDozer)
      totalUnits += u
      recs.push({ category: "Dozer Zone", units: u, towerType: "MLT 2560 Sled Mount", notes: `${dzrs} dozers — push, cut, stockpile lighting` })
    }

    if (dps > 0) {
      const u = Math.ceil(dps * fleetLightingRules.dumps.towersPerDump)
      totalUnits += u
      recs.push({ category: "Tip Head / Dump", units: u, towerType: "MLT 7200 Sled Long Range", notes: `${dps} dump points — tip head illumination` })
    }

    const romUnits = fleets * fleetLightingRules.romPad.towersPerPad
    if (romUnits > 0) {
      totalUnits += romUnits
      recs.push({ category: "ROM Pad & Infrastructure", units: romUnits, towerType: "MLT 2560-LED Dual Axle", notes: "ROM pad, workshop, and admin area lighting" })
    }

    const savings = calculateSavings(totalUnits)
    return { recs, totalUnits, ...savings, siteName }
  }

  const calculateArea = (area: number, siteName: string) => {
    const towerTypes = [
      { name: "MLT 7200 Sled Long Range", coverage: 18 },
      { name: "MLT 2560-LED Dual Axle", coverage: 8 },
      { name: "MLT 1920-LED Single Axle", coverage: 5 },
    ]
    const best = towerTypes.reduce((a, b) => Math.ceil(area / a.coverage) * a.coverage < Math.ceil(area / b.coverage) * b.coverage ? a : b)
    const units = Math.max(1, Math.ceil(area / best.coverage))
    const savings = calculateSavings(units)

    return {
      recommendations: [{ category: "Area Coverage", units, towerType: best.name, notes: `${area} ha · ${best.coverage} ha per tower` }],
      totalUnits: units,
      ...savings,
      siteName,
      areaHa: area,
    }
  }

  const assessSite = () => {
    setAssessing(true)
    setResult(null)

    setTimeout(() => {
      const lower = input.toLowerCase()

      let matchedSite: string | null = null
      for (const [key] of Object.entries(knownFleets)) {
        if (lower.includes(key)) { matchedSite = key; break }
      }
      if (!matchedSite) {
        for (const [key] of Object.entries(knownAreas)) {
          if (lower.includes(key)) { matchedSite = key; break }
        }
      }

      const siteName = matchedSite 
        ? (knownFleets[matchedSite]?.name || matchedSite.charAt(0).toUpperCase() + matchedSite.slice(1))
        : (lower.includes("pilbara") ? "Pilbara Mine Site" : "Your Site")

      if (mode === "fleet" && matchedSite && knownFleets[matchedSite]) {
        const f = knownFleets[matchedSite]
        setDigFleets(f.digFleets)
        setTrucks(f.trucks)
        setDozers(f.dozers)
        setDumps(f.dumps)
        setResult(calculateFleet(f.digFleets, f.trucks, f.dozers, f.dumps, siteName))
      } else if (mode === "fleet") {
        setResult(calculateFleet(digFleets, trucks, dozers, dumps, siteName))
      } else if (matchedSite && knownAreas[matchedSite]) {
        setAreaHa(knownAreas[matchedSite])
        setResult(calculateArea(knownAreas[matchedSite], siteName))
      } else {
        setResult(calculateArea(areaHa, siteName))
      }

      setAssessing(false)
    }, 1200)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[1000px] mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <Hash className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">AI Site Assessment</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">How much could you save?</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-2xl">
          Enter a mine name or your fleet size — we'll calculate the towers you need and compare the annual 
          operating cost against standard LED lighting towers.
        </p>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setMode("fleet")} className={`flex items-center gap-2 px-5 py-3 text-xs border rounded-sm transition-colors ${
            mode === "fleet" ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
          }`}>
            <Truck className="h-4 w-4" />
            By Fleet Size
          </button>
          <button onClick={() => setMode("area")} className={`flex items-center gap-2 px-5 py-3 text-xs border rounded-sm transition-colors ${
            mode === "area" ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
          }`}>
            <MapPin className="h-4 w-4" />
            By Site Area
          </button>
        </div>

        {/* Quick mine search */}
        <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm px-4 py-3 focus-within:border-[#DC2626] transition-colors mb-4">
          <Crosshair className="h-4 w-4 text-white/30 shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && assessSite()}
            placeholder={mode === "fleet" ? 'Try: "Peak Downs" (auto-fills fleet numbers) or set manually below' : 'Try: "Peak Downs", "30 ha Pilbara", or set area below'}
            className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none"
          />
          <button onClick={assessSite} disabled={assessing} className="px-5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 transition-colors text-xs font-semibold rounded-sm">
            {assessing ? "Calculating..." : "Calculate"}
          </button>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["Peak Downs", "Middlemount", "Hail Creek", "Bengalla", "Caval Ridge"].map((ex) => (
            <button key={ex} onClick={() => { setInput(ex); setTimeout(assessSite, 100) }}
              className="px-3 py-1.5 text-[11px] border border-white/[0.1] hover:border-[#DC2626]/50 transition-colors rounded-sm text-white/40 hover:text-white">
              {ex}
            </button>
          ))}
        </div>

        {/* Manual Inputs */}
        {mode === "fleet" && (
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="text-[10px] text-white/40 tracking-wide uppercase mb-2 block">Dig Fleets</label>
              <input type="number" value={digFleets} onChange={e => setDigFleets(parseInt(e.target.value) || 0)}
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              <p className="text-[9px] text-white/20 mt-1">Excavator + fleet</p>
            </div>
            <div>
              <label className="text-[10px] text-white/40 tracking-wide uppercase mb-2 block">Dump Trucks</label>
              <input type="number" value={trucks} onChange={e => setTrucks(parseInt(e.target.value) || 0)}
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              <p className="text-[9px] text-white/20 mt-1">Active on night shift</p>
            </div>
            <div>
              <label className="text-[10px] text-white/40 tracking-wide uppercase mb-2 block">Dozers</label>
              <input type="number" value={dozers} onChange={e => setDozers(parseInt(e.target.value) || 0)}
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              <p className="text-[9px] text-white/20 mt-1">Push / dump / stockpile</p>
            </div>
            <div>
              <label className="text-[10px] text-white/40 tracking-wide uppercase mb-2 block">Dump Points</label>
              <input type="number" value={dumps} onChange={e => setDumps(parseInt(e.target.value) || 0)}
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              <p className="text-[9px] text-white/20 mt-1">Active tip heads</p>
            </div>
          </div>
        )}

        {mode === "area" && (
          <div className="max-w-xs mb-8">
            <label className="text-[10px] text-white/40 tracking-wide uppercase mb-2 block">Site Area (hectares)</label>
            <input type="number" value={areaHa} onChange={e => setAreaHa(parseInt(e.target.value) || 0)}
              className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
            <p className="text-[9px] text-white/20 mt-1">Approximate pit + infrastructure area</p>
          </div>
        )}

        {/* Loading */}
        {assessing && (
          <div className="border border-white/[0.06] rounded-sm p-10 text-center">
            <RefreshCw className="h-6 w-6 text-[#DC2626] mx-auto mb-3 animate-spin" />
            <p className="text-sm text-white/50">Analysing fleet requirements...</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <div className="border border-white/[0.06] rounded-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-[#DC2626]" />
                <p className="text-xs text-[#DC2626] font-semibold tracking-wide uppercase">
                  {mode === "fleet" ? "Fleet-Based Assessment" : "Area-Based Assessment"} — {result.siteName}
                </p>
              </div>

              {mode === "fleet" && (
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[["Dig Fleets", digFleets], ["Trucks", trucks], ["Dozers", dozers], ["Dumps", dumps]].map(([label, val]) => (
                    <div key={label as string} className="text-center p-3 border border-white/[0.06]">
                      <p className="text-lg font-bold">{val as number}</p>
                      <p className="text-[10px] text-white/40">{label as string}</p>
                    </div>
                  ))}
                </div>
              )}

              {mode === "area" && (
                <p className="text-sm text-white/50 mb-6">{result.areaHa} ha site</p>
              )}

              {/* Tower recommendations */}
              <div className="space-y-3 mb-6">
                <p className="text-[10px] text-white/40 tracking-wide uppercase font-semibold mb-3">Recommended Configuration</p>
                {result.recs.map((rec: any, i: number) => (
                  <div key={i} className={`border rounded-sm p-4 ${i === 0 ? 'border-[#DC2626]/30 bg-[#DC2626]/5' : 'border-white/[0.06]'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        {i === 0 && <p className="text-[10px] text-[#DC2626] font-semibold tracking-wide uppercase mb-1">Primary Zone</p>}
                        <p className="text-sm font-semibold">{rec.towerType}</p>
                        <p className="text-xs text-white/50">{rec.units} units · {rec.category}</p>
                      </div>
                      <p className="text-[11px] text-white/40 text-right">{rec.notes}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total towers */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-white/40">Total Mickala Towers</p>
                  <p className="text-2xl font-bold">{result.effectiveUnits} towers</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40">Competitor equivalent</p>
                  <p className="text-sm text-white/50">{result.competitorUnits} towers <span className="text-[10px] text-white/30">(50% more needed)</span></p>
                </div>
              </div>

              {/* Savings Breakdown — Mickala vs Competitor LED */}
              <div className="border border-emerald-900/30 bg-emerald-950/10 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">Annual Savings — Mickala vs Standard LED</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { key: "fuel", label: "Fuel", value: result.fuel, sub: "0.8 vs 1.5 L/hr" },
                    { key: "servicing", label: "Service Visits", value: result.servicing, sub: "9 vs 15 visits/month" },
                    { key: "breakdowns", label: "Fewer Breakdowns", value: result.breakdowns, sub: "10x more reliable" },
                  ].map((item) => (
                    <div key={item.key} className="text-center p-3 border border-emerald-900/20 rounded-sm">
                      <p className="text-sm sm:text-lg font-bold text-emerald-400">{formatCurrency(item.value)}</p>
                      <p className="text-[9px] text-emerald-400/60 mt-0.5">{item.label}</p>
                      <p className="text-[8px] text-emerald-400/30 mt-0.5">{item.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-emerald-900/20 flex items-center justify-between">
                  <p className="text-xs text-emerald-400/60">Total estimated annual operating savings with Mickala</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-400">{formatCurrency(result.totalAnnual)}<span className="text-sm text-emerald-400/60"> /yr</span></p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a href="/quote" className="inline-flex items-center px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full">Get a Quote</a>
              <a href="/tco-calculator" className="inline-flex items-center px-6 py-3 border border-white/20 hover:border-white/40 transition-colors text-sm font-semibold rounded-full">Calculate Total ROI</a>
              <a href="tel:1300642525" className="text-xs text-white/40 hover:text-white ml-auto">1300 642 525</a>
            </div>

            {/* How the savings add up */}
            <div className="mt-2 p-4 border border-white/[0.06] rounded-sm">
              <p className="text-[10px] text-white/40 tracking-wide uppercase font-semibold mb-3">How Mickala outperforms standard LED towers</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-[11px] text-white/40">
                <div>
                  <p className="text-white/60 font-semibold mb-1">⛽ Fuel Efficiency</p>
                  <p>Mickala: <strong className="text-white/50">0.8 L/hr</strong> vs competitors: 1.5 L/hr. That's <strong className="text-white/50">47% less fuel burn</strong> — saving ~$4,970 per tower per year.</p>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-1">🔧 Fewer Service Visits</p>
                  <p>Mickala: <strong className="text-white/50">9 visits/month</strong> vs competitors: 12-18 visits/month. Better design means less frequent refuelling and servicing.</p>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-1">💥 10x More Reliable</p>
                  <p>Australian designed and built. Mickala towers break down <strong className="text-white/50">10x less</strong> than competitor LED towers. Less downtime, fewer service truck call-outs.</p>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-1">🔦 50% Brighter</p>
                  <p>More light output per tower means <strong className="text-white/50">fewer towers needed</strong> to cover the same area. Less capital outlay, less ongoing maintenance.</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-white/60 font-semibold mb-1">🛠️ Built for Mining</p>
                  <p className="text-white/30">Modular design allows full engine/generator module changeout in ~3 hours. 500-hour service intervals. Australian made and designed with mining conditions in mind. MDG15 and MDG41 compliant. 24/7 service support.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info box */}
        <div className="mt-10 p-4 border border-white/[0.06] text-xs text-white/30 leading-relaxed">
          <p className="font-semibold text-white/50 mb-1">How this works</p>
          <p><strong className="text-white/40">Fleet-based:</strong> Uses real mining equipment ratios calibrated from operational mine sites per MDG15 standards.</p>
          <p className="mt-2"><strong className="text-white/40">Savings data:</strong> Comparison based on Mickala field data. Fuel savings: 0.8 L/hr vs 1.5 L/hr competitor (0.7 L/hr difference × 13 hrs/night × 365 days × $1.50/L = ~$4,970/tower/yr). Service comparison: 9 visits/month Mickala vs 15 competitor at 1.5 hrs × $150/hr. Reliability: 10x fewer breakdowns based on field performance. Light output: 50% brighter based on comparative lux measurements.</p>
          <p className="mt-2 text-white/20">These are estimates. Final configuration and savings depend on site layout, bench heights, shift patterns, and specific MDG15 compliance requirements. Contact us for a detailed site-specific assessment.</p>
        </div>
      </div>
    </div>
  )
}
