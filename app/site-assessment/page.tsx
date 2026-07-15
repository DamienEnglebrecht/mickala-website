"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { MapPin, Crosshair, Sparkles, ChevronRight, RefreshCw } from "lucide-react"

type CoverageMap = {
  lat: number
  lng: number
  name: string
  areaHa: number
}

const towerData = [
  { name: "MLT 1280-4LED Single Axle", coverage: 3, price: "$38,500", image: "/product-images/doc_f9ffe13e2ce8_mlt-1280-4led-single-axle-tower.png" },
  { name: "MLT 1280-6LED Single Axle", coverage: 4, price: "$39,500", image: "/product-images/doc_675019b64b3f_mlt-1280-6led-single-axle-tower.png" },
  { name: "MLT 1920-LED Single Axle", coverage: 5, price: "$52,500", image: "/product-images/doc_9db394285565_mlt-1920-led-single-axle-tower.png" },
  { name: "MLT 2560-LED Dual Axle", coverage: 8, price: "$62,500", image: "/product-images/doc_ca1d46669f30_mlt-2560-led-single-axle-tower.png" },
  { name: "MLT 2560 Sled Mount", coverage: 10, price: "$58,000", image: "/product-images/doc_ca1d46669f30_mlt-2560-led-single-axle-tower.png" },
  { name: "MLT 7200 Sled Long Range", coverage: 18, price: "$89,500", image: "/product-images/doc_ca1d46669f30_mlt-2560-led-single-axle-tower.png" },
]

// Real Australian mine site coordinates with approximate areas
const knownSites: Record<string, CoverageMap> = {
  "peak downs": { lat: -22.1683, lng: 148.0937, name: "Peak Downs Mine — BMA", areaHa: 95 },
  "goonyella": { lat: -21.7400, lng: 147.9700, name: "Goonyella Riverside — BMA", areaHa: 75 },
  "saraji": { lat: -22.3100, lng: 148.0500, name: "Saraji Mine — BMA", areaHa: 60 },
  "hail creek": { lat: -21.4833, lng: 148.0333, name: "Hail Creek Mine — Glencore", areaHa: 42 },
  "clermont": { lat: -22.7000, lng: 147.6300, name: "Clermont Mine — Glencore", areaHa: 37 },
  "daunia": { lat: -21.8700, lng: 148.1400, name: "Daunia Mine — Whitehaven", areaHa: 26 },
  "poitrel": { lat: -21.8900, lng: 148.0700, name: "Poitrel Mine — Stanmore", areaHa: 30 },
  "bengalla": { lat: -32.1483, lng: 150.9289, name: "Bengalla Mine — New Hope", areaHa: 30 },
  "four mile": { lat: -32.6700, lng: 151.2500, name: "Four Mile Mine — Bloomfield", areaHa: 23 },
  "ensham": { lat: -23.3200, lng: 148.4000, name: "Ensham Mine — Idemitsu", areaHa: 18 },
  "yarrabee": { lat: -23.5800, lng: 148.4800, name: "Yarrabee Mine — Yancoal", areaHa: 15 },
  "mackellar": { lat: -22.0800, lng: 147.8500, name: "MacKellar Carmichael — Bravus", areaHa: 30 },
  "carmichael": { lat: -22.0800, lng: 147.8500, name: "Carmichael Mine — Bravus", areaHa: 30 },
  "new acland": { lat: -27.3000, lng: 151.9000, name: "New Acland Mine — New Hope", areaHa: 12 },
  "hvo": { lat: -32.4200, lng: 150.9800, name: "Hunter Valley Operations — HVO", areaHa: 20 },
  "mt carbine": { lat: -16.5200, lng: 145.2800, name: "Mt Carbine — EQ Resources", areaHa: 10 },
  "paget": { lat: -21.1716, lng: 149.1658, name: "Mickala HQ — Paget QLD", areaHa: 2 },
  "muswellbrook": { lat: -32.2733, lng: 150.8894, name: "Mickala NSW — Muswellbrook", areaHa: 1 },
}

export default function SiteAssessmentPage() {
  const [input, setInput] = useState("")
  const [assessing, setAssessing] = useState(false)
  const [result, setResult] = useState<{
    site: string
    areaHa: number
    lat: number
    lng: number
    recommendations: { name: string; units: number; coverage: number; price: string }[]
  } | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const assessSite = (query: string) => {
    setAssessing(true)
    setResult(null)
    
    setTimeout(() => {
      const lower = query.toLowerCase()
      
      // Check known sites
      let site: CoverageMap | null = null
      for (const [key, s] of Object.entries(knownSites)) {
        if (lower.includes(key)) {
          site = s
          break
        }
      }
      
      // Parse custom area from input (e.g. "30 hectares Pilbara")
      const areaMatch = query.match(/(\d+)\s*(?:ha|hectare|hectares|acres?)/i)
      const areaHa = areaMatch ? parseInt(areaMatch[1]) : (site?.areaHa || 20)
      
      // Parse coordinates from input
      const coordMatch = query.match(/(-?\d+\.?\d*)\s*[, ]\s*(-?\d+\.?\d*)/)
      const lat = coordMatch ? parseFloat(coordMatch[1]) : (site?.lat || -22.0)
      const lng = coordMatch ? parseFloat(coordMatch[2]) : (site?.lng || 148.0)
      
      const siteName = site?.name || (areaMatch ? `${areaMatch[1]} ha site` : "Your site")
      
      // Calculate recommendations
      const recommendations = towerData
        .map(t => ({ ...t, units: Math.ceil(areaHa / t.coverage) }))
        .sort((a, b) => a.units * parseInt(a.price.replace(/[$,]/g, '')) - b.units * parseInt(b.price.replace(/[$,]/g, '')))
        .filter(t => t.units >= 1)
        .slice(0, 3)
      
      setResult({
        site: siteName,
        areaHa,
        lat,
        lng,
        recommendations,
      })
      setMapReady(true)
      setAssessing(false)
    }, 1800)
  }

  const handleSubmit = () => {
    if (!input.trim()) return
    assessSite(input.trim())
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[1000px] mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <MapPin className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">AI Site Assessment</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Assess your site in seconds.</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-xl">Enter a mine name, address, coordinates, or site area. Our AI calculates coverage, tower placement, and provides a complete equipment list with pricing.</p>

        {/* Input */}
        <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm px-4 py-3 focus-within:border-[#DC2626] transition-colors mb-4">
          <Crosshair className="h-4 w-4 text-white/30 shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder='Try: "Peak Downs", "30 hectares Pilbara WA", or "-22.168, 148.093"'
            className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none"
          />
          <button onClick={handleSubmit} disabled={assessing} className="px-5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 transition-colors text-xs font-semibold rounded-sm">
            {assessing ? "Assessing..." : "Assess"}
          </button>
        </div>

        {/* Quick examples */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["Peak Downs", "Hail Creek", "Bengalla", "Carmichael", "30 ha Pilbara"].map((ex) => (
            <button
              key={ex}
              onClick={() => { setInput(ex); assessSite(ex) }}
              className="px-3 py-1.5 text-[11px] border border-white/[0.1] hover:border-[#DC2626]/50 transition-colors rounded-sm text-white/40 hover:text-white"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Results */}
        {assessing && (
          <div className="border border-white/[0.06] rounded-sm p-10 text-center">
            <RefreshCw className="h-6 w-6 text-[#DC2626] mx-auto mb-3 animate-spin" />
            <p className="text-sm text-white/50">Analysing site and calculating coverage...</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Site Info */}
            <div className="border border-white/[0.06] rounded-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#DC2626]" />
                    <p className="text-xs text-[#DC2626] font-semibold tracking-wide uppercase">Assessment Complete</p>
                  </div>
                  <p className="text-xl font-bold">{result.site}</p>
                  <p className="text-sm text-white/50 mt-1">
                    <span className="text-white font-semibold">{result.areaHa} ha</span> · Coordinates: {result.lat.toFixed(4)}, {result.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Coverage Map Visualisation */}
              <div className="relative w-full h-[200px] bg-white/[0.02] border border-white/[0.06] rounded-sm overflow-hidden mb-4">
                {/* Grid visualization */}
                <div className="absolute inset-0 p-4">
                  <div className="w-full h-full relative">
                    {/* Site boundary */}
                    <div className="absolute inset-[10%] border-2 border-dashed border-[#DC2626]/50 rounded-sm flex items-center justify-center">
                      <p className="text-xs text-white/30">{result.areaHa} ha site</p>
                    </div>
                    
                    {/* Coverage circles */}
                    {result.recommendations[0] && Array.from({ length: Math.min(result.recommendations[0].units, 8) }).map((_, i) => {
                      const angle = (i / result.recommendations[0].units) * Math.PI * 2
                      const radius = 30
                      const cx = 50 + Math.cos(angle) * radius
                      const cy = 50 + Math.sin(angle) * radius
                      const coverageSize = Math.min(25, 15 + result.recommendations[0].coverage)
                      return (
                        <div
                          key={i}
                          className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/5"
                          style={{ left: `${cx}%`, top: `${cy}%` }}
                        >
                          <div className="absolute inset-2 rounded-full bg-[#DC2626]/10" />
                        </div>
                      )
                    })}
                    
                    {/* Centre point */}
                    <div className="absolute top-1/2 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-[#DC2626] rounded-full">
                      <div className="absolute inset-1 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
                <p className="absolute bottom-2 right-2 text-[9px] text-white/20">{result.lat.toFixed(4)}, {result.lng.toFixed(4)}</p>
              </div>

              <p className="text-xs text-white/30">Visualisation: site boundary with recommended tower coverage overlay</p>
            </div>

            {/* Recommendations */}
            <p className="text-xs text-white/40 tracking-[0.15em] uppercase">Recommended Configuration</p>
            <div className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <div key={i} className={`border rounded-sm p-4 ${i === 0 ? 'border-[#DC2626]/30 bg-[#DC2626]/5' : 'border-white/[0.06]'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      {i === 0 && <p className="text-[10px] text-[#DC2626] font-semibold tracking-wide uppercase mb-1">Best Match</p>}
                      <p className="text-sm font-semibold">{rec.name}</p>
                      <p className="text-xs text-white/50">{rec.units} units · {rec.coverage} ha coverage each</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">From {rec.price}</p>
                      <p className="text-[11px] text-white/40">per unit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1"><ChevronRight className="h-3 w-3 text-[#DC2626]" />{rec.units * rec.coverage} ha total coverage</span>
                    <span>${(rec.units * parseInt(rec.price.replace(/[$,]/g, ''))).toLocaleString()} total investment</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 pt-4">
              <a href="/quote" className="inline-flex items-center px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full">Get Formal Quote</a>
              <a href="tel:1300642525" className="inline-flex items-center px-6 py-3 border border-white/20 hover:border-white/40 transition-colors text-sm font-semibold rounded-full">1300 642 525</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
