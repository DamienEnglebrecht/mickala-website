"use client"

import { useState, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { FileDown, ChevronDown, ChevronUp, Check, Printer } from "lucide-react"

// Full product database from Mickala spec sheets
const models = [
  {
    id: "mlt1280-4", family: "Single Axle", name: "MLT 1280-4LED",
    desc: "Entry-level single axle. Compact and lightweight for smaller sites.",
    dimensions: { w: 1783, l: 3307, h: 2540 }, weight: 1530,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 135, consumption: 0.8, runtime: 186 },
    lights: { count: 4, wattage: 1280, lumens: 266240, lampLife: 60000 },
    mast: { height: 8.1, rotation: 340, wind: 100 },
    tyres: "235 R16", stabilisers: "4 Hydraulic Legs",
  },
  {
    id: "mlt1280-6", family: "Single Axle", name: "MLT 1280-6LED",
    desc: "Higher lumen output in a compact single-axle package.",
    dimensions: { w: 1783, l: 3307, h: 2540 }, weight: 1560,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 135, consumption: 0.8, runtime: 186 },
    lights: { count: 6, wattage: 1920, lumens: 399360, lampLife: 60000 },
    mast: { height: 8.1, rotation: 340, wind: 100 },
    tyres: "235 R16", stabilisers: "4 Hydraulic Legs",
  },
  {
    id: "mlt1920", family: "Single Axle", name: "MLT 1920-LED",
    desc: "6-LED single axle. Equivalent to 6000W–9000W metal halide.",
    dimensions: { w: 2000, l: 4300, h: 2450 }, weight: 2180,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 185, consumption: 0.8, runtime: 231 },
    lights: { count: 6, wattage: 1920, lumens: 399360, lampLife: 60000 },
    mast: { height: 9.1, rotation: 340, wind: 100 },
    tyres: "235 R16", stabilisers: "4 Hydraulic Legs",
  },
  {
    id: "mlt2560-sa", family: "Single Axle", name: "MLT 2560-LED",
    desc: "8-LED single axle. Equivalent to 12000W–16000W metal halide.",
    dimensions: { w: 2000, l: 4300, h: 2450 }, weight: 2220,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 185, consumption: 0.8, runtime: 231 },
    lights: { count: 8, wattage: 2560, lumens: 532480, lampLife: 60000 },
    mast: { height: 9.1, rotation: 340, wind: 100 },
    tyres: "235 R16", stabilisers: "4 Hydraulic Legs",
  },
  {
    id: "mlt2560-da", family: "Dual Axle", name: "MLT 2560-LED",
    desc: "8-LED dual axle. 240L fuel capacity for extended runtime.",
    dimensions: { w: 2000, l: 5200, h: 2450 }, weight: 2440,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 240, consumption: 0.8, runtime: 300 },
    lights: { count: 8, wattage: 2560, lumens: 532480, lampLife: 60000 },
    mast: { height: 10.5, rotation: 340, wind: 100 },
    tyres: "235 R16", stabilisers: "4 Hydraulic Legs",
  },
  {
    id: "mlt3200", family: "Dual Axle", name: "MLT 3200-LED",
    desc: "10-LED dual axle. High-output for large area coverage.",
    dimensions: { w: 2000, l: 5200, h: 2450 }, weight: 2470,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 240, consumption: 0.85, runtime: 282 },
    lights: { count: 10, wattage: 3200, lumens: 665600, lampLife: 60000 },
    mast: { height: 10.5, rotation: 340, wind: 100 },
    tyres: "235 R16", stabilisers: "4 Hydraulic Legs",
  },
  {
    id: "mlt3840", family: "Dual Axle", name: "MLT 3840-LED",
    desc: "12-LED dual axle. Maximum coverage for the dual axle platform.",
    dimensions: { w: 2000, l: 5200, h: 2450 }, weight: 2500,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 240, consumption: 1.2, runtime: 200 },
    lights: { count: 12, wattage: 3840, lumens: 798720, lampLife: 60000 },
    mast: { height: 10.5, rotation: 340, wind: 100 },
    tyres: "235 R16", stabilisers: "4 Hydraulic Legs",
  },
  {
    id: "mls2560", family: "Sled Mount", name: "MLS 2560-LED",
    desc: "Skid-mounted. Crane and forklift deployable. 277L fuel capacity.",
    dimensions: { w: 2000, l: 6000, h: 2750 }, weight: 5800,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 277, consumption: 0.8, runtime: 346 },
    lights: { count: 8, wattage: 2560, lumens: 532480, lampLife: 60000 },
    mast: { height: 11.2, rotation: 340, wind: 100 },
    skid: { base: "Heavy Duty, 6mm Floor", wear: "20mm BIS80", tow: "16mm Twin Leg" },
  },
  {
    id: "mls3200", family: "Sled Mount", name: "MLS 3200-LED",
    desc: "10-LED sled mount. High output for extreme area coverage.",
    dimensions: { w: 2000, l: 6000, h: 2750 }, weight: 5830,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 277, consumption: 0.85, runtime: 326 },
    lights: { count: 10, wattage: 3200, lumens: 665600, lampLife: 60000 },
    mast: { height: 11.2, rotation: 340, wind: 100 },
    skid: { base: "Heavy Duty, 6mm Floor", wear: "20mm BIS80", tow: "16mm Twin Leg" },
  },
  {
    id: "mls3840", family: "Sled Mount", name: "MLS 3840-LED",
    desc: "12-LED sled mount. Maximum lumen output on a skid base.",
    dimensions: { w: 2000, l: 6000, h: 2750 }, weight: 5860,
    engine: { model: "Kubota Z482-E", cylinders: 2, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 277, consumption: 1.2, runtime: 231 },
    lights: { count: 12, wattage: 3840, lumens: 798720, lampLife: 60000 },
    mast: { height: 11.2, rotation: 340, wind: 100 },
    skid: { base: "Heavy Duty, 6mm Floor", wear: "20mm BIS80", tow: "16mm Twin Leg" },
  },
  {
    id: "mlr4800", family: "Long Range", name: "MLR 4800-LED",
    desc: "Heavy-duty long range. 1200L fuel, 14m mast, 14 days continuous runtime.",
    dimensions: { w: 2500, l: 7000, h: 3000 }, weight: 12800,
    engine: { model: "Kubota D1105", cylinders: 3, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 1200, consumption: 1.9, runtime: 632 },
    lights: { count: 12, wattage: 4800, lumens: 998400, lampLife: 60000 },
    mast: { height: 14, rotation: 340, wind: 100 },
  },
  {
    id: "mlr7200", family: "Long Range", name: "MLR 7200-LED",
    desc: "Flagship long range. 18 LEDs, 1.5M lumens, 25 day runtime.",
    dimensions: { w: 2500, l: 7000, h: 3000 }, weight: 12950,
    engine: { model: "Kubota D1105", cylinders: 3, rpm: 1500, aspiration: "Natural" },
    fuel: { capacity: 1200, consumption: 2.0, runtime: 600 },
    lights: { count: 18, wattage: 7200, lumens: 1497600, lampLife: 60000 },
    mast: { height: 14, rotation: 340, wind: 100 },
  },
]

const families = ["Single Axle", "Dual Axle", "Sled Mount", "Long Range"]

const optionsConfig = [
  { id: "gps", label: "GPS Remote Monitoring", category: "monitoring" },
  { id: "remote", label: "Remote Control Operation", category: "controls" },
  { id: "wiggins", label: "Wiggins Fuel Fill Point", category: "fuel" },
  { id: "extrafilter", label: "External Oil Filter Cartridge (1000hr service)", category: "maintenance" },
  { id: "extracable", label: "Extra Light Cable (50m)", category: "cabling" },
  { id: "paintcustom", label: "Custom Paint Colour", category: "cosmetic" },
  { id: "cctv", label: "CCTV Ready Package", category: "monitoring" },
]

function formatNum(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "")
}

export default function SpecSheetGeneratorPage() {
  const [step, setStep] = useState(1)
  const [family, setFamily] = useState("")
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [options, setOptions] = useState<string[]>([])
  const [contact, setContact] = useState({ name: "", company: "", email: "", phone: "" })
  const [generated, setGenerated] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const toggleOption = (id: string) => {
    setOptions(prev => prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id])
  }

  const filteredModels = models.filter(m => family === "" || m.family === family)

  const generateSpec = () => {
    setGenerated(true)
    setStep(5)
  }

  const handlePrint = () => {
    window.print()
  }

  const resetAll = () => {
    setStep(1)
    setFamily("")
    setSelectedModel(null)
    setOptions([])
    setContact({ name: "", company: "", email: "", phone: "" })
    setGenerated(false)
  }

  const specSection = (label: string, value: string) => (
    <div className="grid grid-cols-[160px_1fr] gap-2 py-1.5 border-b border-white/[0.04] text-[11px]">
      <span className="text-white/40 uppercase tracking-wider">{label}</span>
      <span className="text-white/80 font-medium">{value}</span>
    </div>
  )

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          @page { margin: 1.2cm; size: A4; }
          .print-spec { background: white !important; color: black !important; }
          .print-spec .text-white\\/40, .print-spec .text-white\\/50, .print-spec .text-white\\/80 { color: #666 !important; }
          .print-spec .text-white { color: black !important; }
          .print-spec .border-white\\/\\[0\\.04\\], .print-spec .border-white\\/\\[0\\.06\\] { border-color: #ddd !important; }
          .print-spec .bg-white\\/\\[0\\.02\\] { background: #f9f9f9 !important; }
        }
        .print-only { display: none; }
      `}</style>
      <div className="max-w-[1000px] mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <FileDown className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">Spec Sheet Generator</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Build your spec sheet.</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-2xl">Select a model, configure options, and generate a professional spec sheet to download or print.</p>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-10 no-print">
          {["Model", "Options", "Details", "Generate"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                step >= i + 1 ? "bg-[#DC2626] text-white" : "bg-white/[0.06] text-white/30"
              }`}>{i + 1}</div>
              <span className={`text-[10px] uppercase tracking-wider ${step >= i + 1 ? "text-white/80" : "text-white/30"}`}>{s}</span>
              {i < 3 && <ChevronDown className="h-3 w-3 text-white/20 rotate-[-90deg]" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Family & Model */}
        {step === 1 && (
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-4 font-semibold">1. Choose your tower family</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {families.map(f => (
                <button key={f} onClick={() => setFamily(f)}
                  className={`px-5 py-3 text-xs border rounded-sm transition-colors ${
                    family === f ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
                  }`}>{f}</button>
              ))}
            </div>

            <p className="text-xs text-white/40 uppercase tracking-wider mb-4 font-semibold">2. Select model</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredModels.map(m => (
                <button key={m.id} onClick={() => { setSelectedModel(m); setStep(2) }}
                  className={`text-left p-4 border rounded-sm transition-colors ${
                    selectedModel?.id === m.id ? "border-[#DC2626] bg-[#DC2626]/5" : "border-white/[0.06] hover:border-white/20"
                  }`}>
                  <p className="text-sm font-bold mb-1">{m.name}</p>
                  <p className="text-[10px] text-white/50 leading-relaxed">{m.desc}</p>
                  <div className="flex gap-2 mt-2 text-[10px] text-white/30">
                    <span>{m.lights.count} LEDs</span>
                    <span>·</span>
                    <span>{formatNum(m.lights.lumens)} lm</span>
                    <span>·</span>
                    <span>{m.weight} kg</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Options */}
        {step === 2 && (
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-4 font-semibold">3. Configure options (optional)</p>
            <div className="grid sm:grid-cols-2 gap-2 mb-8">
              {optionsConfig.map(opt => (
                <button key={opt.id} onClick={() => toggleOption(opt.id)}
                  className={`flex items-center gap-3 p-3 border rounded-sm text-left transition-colors ${
                    options.includes(opt.id) ? "border-[#DC2626] bg-[#DC2626]/5" : "border-white/[0.06] hover:border-white/20"
                  }`}>
                  <div className={`w-4 h-4 border rounded-xs flex items-center justify-center shrink-0 ${
                    options.includes(opt.id) ? "bg-[#DC2626] border-[#DC2626]" : "border-white/30"
                  }`}>
                    {options.includes(opt.id) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{opt.label}</p>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider">{opt.category}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-5 py-3 border border-white/[0.1] hover:border-white/30 text-xs rounded-sm transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold rounded-sm transition-colors">Continue</button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-4 font-semibold">4. Your details (for spec sheet header)</p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mb-8">
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Name *</label>
                <input type="text" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              </div>
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Company</label>
                <input type="text" value={contact.company} onChange={e => setContact({...contact, company: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              </div>
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Email</label>
                <input type="email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              </div>
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Phone</label>
                <input type="tel" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-5 py-3 border border-white/[0.1] hover:border-white/30 text-xs rounded-sm transition-colors">Back</button>
              <button onClick={generateSpec} className="px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold rounded-sm transition-colors">Generate Spec Sheet</button>
            </div>
          </div>
        )}

        {/* Step 5: Generated Spec Sheet */}
        {generated && (
          <>
            {/* Print controls */}
            <div className="flex items-center gap-3 mb-6 no-print">
              <button onClick={handlePrint} className="inline-flex items-center gap-2 px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-xs font-semibold rounded-sm">
                <Printer className="h-3.5 w-3.5" /> Print / Save PDF
              </button>
              <button onClick={resetAll} className="px-5 py-3 border border-white/[0.1] hover:border-white/30 text-xs rounded-sm transition-colors">
                Start Over
              </button>
            </div>

            {/* Spec Sheet */}
            <div ref={printRef} className="print-spec border border-white/[0.06] bg-white/[0.02] rounded-sm p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Mickala Group</p>
                  <p className="text-2xl font-bold">{selectedModel.name}</p>
                  <p className="text-xs text-white/50 mt-1">{selectedModel.family}</p>
                </div>
                <div className="text-right text-[10px] text-white/30 leading-relaxed">
                  <p>{contact.name || "—"}</p>
                  <p>{contact.company || "—"}</p>
                  <p>{contact.email || "—"}</p>
                  <p>{contact.phone || "—"}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-white/60 mb-6">{selectedModel.desc}</p>

              {/* Spec Table */}
              <div className="space-y-3">
                <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold">Dimensions & Weight</p>
                {specSection("Width", `${selectedModel.dimensions.w} mm`)}
                {specSection("Length", `${selectedModel.dimensions.l} mm`)}
                {specSection("Height", `${selectedModel.dimensions.h} mm`)}
                {specSection("Net Weight", `${formatNum(selectedModel.weight)} kg`)}

                <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold pt-3">Engine & Generator</p>
                {specSection("Engine Model", selectedModel.engine.model)}
                {specSection("Cylinders", `${selectedModel.engine.cylinders}`)}
                {specSection("Speed", `${selectedModel.engine.rpm} RPM`)}
                {specSection("Aspiration", selectedModel.engine.aspiration)}
                {specSection("Generator", "Sincro — 24 VDC Brushless")}
                {specSection("Electrical System", "24 VDC Extra Low Voltage")}

                <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold pt-3">Fuel System</p>
                {specSection("Fuel Capacity", `${selectedModel.fuel.capacity} L`)}
                {specSection("Consumption", `${selectedModel.fuel.consumption} L/hr`)}
                {specSection("Runtime @ 100% Load", `${formatNum(selectedModel.fuel.runtime)} hours`)}
                {specSection("Days Runtime (12hrs)", `${Math.round(selectedModel.fuel.runtime / 12)} days`)}

                <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold pt-3">Lighting</p>
                {specSection("Type", "LED")}
                {specSection("LED Count", `${selectedModel.lights.count} x 320W`)}
                {specSection("Installed Wattage", `${formatNum(selectedModel.lights.wattage)} W`)}
                {specSection("Total Lumens", `${formatNum(selectedModel.lights.lumens)} lm`)}
                {specSection("Efficacy", `208 lm/W`)}
                {specSection("Lamp Life", `${formatNum(selectedModel.lights.lampLife)} hours`)}

                <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold pt-3">Mast</p>
                {specSection("Type", "Telescopic — Hydraulic")}
                {specSection("Height", `${selectedModel.mast.height} m`)}
                {specSection("Rotation", `${selectedModel.mast.rotation}°`)}
                {specSection("Wind Rating", `${selectedModel.mast.wind} km/h`)}

                <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold pt-3">Chassis</p>
                {specSection("Tyres", selectedModel.tyres)}
                {specSection("Stabilisers", selectedModel.stabilisers)}
                {selectedModel.skid && specSection("Skid Base", selectedModel.skid.base)}
                {selectedModel.skid && specSection("Wear Package", selectedModel.skid.wear)}
                {selectedModel.skid && specSection("Tow Chains", selectedModel.skid.tow)}

                {/* Selected Options */}
                {options.length > 0 && (
                  <>
                    <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold pt-3">Selected Options</p>
                    {options.map(optId => {
                      const opt = optionsConfig.find(o => o.id === optId)
                      return opt ? specSection(opt.category, opt.label) : null
                    })}
                  </>
                )}

                {/* Compliance */}
                <p className="text-[10px] text-[#DC2626] uppercase tracking-wider font-semibold pt-3">Compliance</p>
                {specSection("Standards", "AS3000, AS2790, AS3010.1, AS3713, AS1170.2")}
                {specSection("Mining", "MDG15, MDG41, Mines Safety & Inspection Regulations 1995")}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] text-[9px] text-white/30 leading-relaxed">
                <p>Mickala Group · 21 Caterpillar Drive, Paget QLD 4740 · ABN 92 180 218 353</p>
                <p>1300 642 525 · management@mickalagroup.com.au · mickalagroup.com.au</p>
                <p className="mt-1">Generated {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </>
        )}

        {/* Navigation buttons for steps 1-2 */}
        {step === 1 && (
          <div className="flex justify-end mt-6">
            {selectedModel && (
              <button onClick={() => setStep(2)} className="px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold rounded-sm transition-colors">
                Continue to Options →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
