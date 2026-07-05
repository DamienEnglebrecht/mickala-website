"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, AlertTriangle, ChevronDown, ChevronUp, Printer, ArrowLeft } from "lucide-react"

const operationalData = [
  { phase: "Pre-Operation", ref: "PO-01", hazard: "Diesel exhaust/fumes — CO poisoning", existing: "ELV design reduces hours; position to face away from workers; CO monitors", extra: "Ensure CO monitors in date", likelihood: 2, consequence: 5, risk: 10 },
  { phase: "Pre-Operation", ref: "PO-02", hazard: "Maintenance — entanglement in moving parts", existing: "Lockout/tagout; belt guards fitted; training", extra: "Use LOTO kit", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-03", hazard: "Maintenance — stored energy (hydraulic/spring)", existing: "Lockout/tagout; training; pressure relief valves", extra: "Isolate hydraulic pressure before maintenance", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-04", hazard: "Repairs — electrical hazard", existing: "ELV system; RCD; lockout/tagout", extra: "Test before touch", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-05", hazard: "Pre-start inspection — cuts/abrasions from guards", existing: "PPE (gloves); inspection training", extra: "", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Pre-Operation", ref: "PO-06", hazard: "Forklift movement — impact/crush", existing: "Training; spotters; segregation", extra: "Maintain clear visibility", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-07", hazard: "Refuelling — fire/explosion", existing: "Engine off; spill kit; training; fire extinguisher", extra: "Fire extinguisher nearby", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Operation", ref: "OP-08", hazard: "Operating in or near water (drown/electrocution)", existing: "Risk assessment required; water exclusion zone", extra: "Establish exclusion zone", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-09", hazard: "Operating on uneven ground (tip over)", existing: "ELV reduces hours; position to face away from workers; CO monitors", extra: "Ground assessment pre-setup", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Operation", ref: "OP-10", hazard: "Operations near powerlines (electrocution)", existing: "Minimum 6m clearance; training; spotter", extra: "Site-specific SWMS required", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-11", hazard: "Operations near overhead hazards (mast strike)", existing: "Identification of overhead hazards; minimum 3m clearance", extra: "Spotter required", likelihood: 1, consequence: 4, risk: 4 },
  { phase: "Operation", ref: "OP-12", hazard: "Parking on unsealed ground (sinking/stability)", existing: "Only park on sealed/compacted ground", extra: "", likelihood: 1, consequence: 3, risk: 3 },
  { phase: "Operation", ref: "OP-13", hazard: "Manual handling (fatigue/injury)", existing: "Training; mechanical aids available", extra: "Use mechanical aids where available", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Operation", ref: "OP-14", hazard: "People walking into tower/stabilisers (trip)", existing: "Barricaded with bunting; high visibility decals", extra: "Inspect barricading before leaving", likelihood: 3, consequence: 1, risk: 3 },
  { phase: "Operation", ref: "OP-15", hazard: "Heat/cold stress to operators", existing: "Hydration policy; PPE; rest breaks", extra: "Monitor weather conditions", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Operation", ref: "OP-16", hazard: "Lightning strike (mast as conductor)", existing: "Training — cease operation during electrical storms; lightning detection", extra: "Monitor BOM weather radar", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-17", hazard: "Bushfire (tower in fire zone)", existing: "Site-specific fire plan; fire extinguisher on tower", extra: "Know evacuation routes", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-18", hazard: "Wind — high speed (collapse of mast)", existing: "Lower mast in winds exceeding 20m/s", extra: "Monitor wind speed regularly", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Operation", ref: "OP-19", hazard: "Oil spill (hydraulic/environmental)", existing: "Bunding; spill kit; training", extra: "Spill kit on hand", likelihood: 2, consequence: 3, risk: 6 },
  { phase: "Post-Operation", ref: "PT-01", hazard: "Mast lowering (crush zone)", existing: "Training; exclusion zone; two-person procedure", extra: "Visual check before lowering", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Post-Operation", ref: "PT-02", hazard: "Stabiliser retraction (pinch points)", existing: "Training; guards; procedures", extra: "Keep hands clear", likelihood: 2, consequence: 3, risk: 6 },
  { phase: "Post-Operation", ref: "PT-03", hazard: "Tow coupling (hands trapped)", existing: "Training; use of coupling aid", extra: "Use coupling aid tool", likelihood: 2, consequence: 3, risk: 6 },
  { phase: "Post-Operation", ref: "PT-04", hazard: "Battery isolator off — no lights (trip/collision)", existing: "Check surrounds before isolator off; warning lights on", extra: "", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Post-Operation", ref: "PT-05", hazard: "Handbrake not fully disengaged before towing (fire)", existing: "Training; tug test before towing", extra: "Perform tug test", likelihood: 1, consequence: 3, risk: 3 },
  { phase: "Post-Operation", ref: "PT-06", hazard: "Spills left behind (environmental)", existing: "Visual inspection before departure; spill kit", extra: "", likelihood: 2, consequence: 2, risk: 4 },
]

const phases = [...new Set(operationalData.map(d => d.phase))]

function RiskScore({ score }: { score: number }) {
  let color = "bg-green-500/20 text-green-700 border-green-200"
  if (score >= 10) color = "bg-red-500/20 text-red-700 border-red-200"
  else if (score >= 6) color = "bg-amber-500/20 text-amber-700 border-amber-200"
  else if (score >= 4) color = "bg-yellow-500/20 text-yellow-700 border-yellow-200"
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${color}`}>{score}</span>
}

export default function OperationalRiskAssessment() {
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({})
  const [showAll, setShowAll] = useState(false)

  const toggle = (phase: string) => setOpenPhases(p => ({ ...p, [phase]: !p[phase] }))
  const visiblePhases = showAll ? phases : phases.slice(0, 1)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 sm:p-8 print:p-2">
        <div className="flex justify-between items-start mb-6 no-print">
          <Link href="/" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Back
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Image src="/logo-mickala.png" alt="Mickala" width={40} height={40} className="h-8 w-auto" />
              <span className="text-xs text-muted-foreground">MM-OP-BI-004</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Operational Risk Assessment</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Mickala LED Lighting Towers — 27 hazards across 3 phases</p>
          </div>
        </div>

        {/* Risk Matrix Key */}
        <div className="flex items-center gap-4 mb-2 text-[10px] no-print">
          <span className="font-semibold text-muted-foreground">Risk Rating:</span>
          <RiskScore score={10} /> <span className="text-muted-foreground">= 10+ HIGH</span>
          <RiskScore score={6} /> <span className="text-muted-foreground">= 6-9 MEDIUM</span>
          <RiskScore score={4} /> <span className="text-muted-foreground">= 4-5 LOW</span>
          <RiskScore score={3} /> <span className="text-muted-foreground">= 1-3 LOW</span>
        </div>

        {/* 5x5 Risk Matrix */}
        <div className="mb-4 no-print overflow-x-auto">
          <h3 className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">Risk Analysis Matrix</h3>
          <table className="text-[10px] border-collapse border border-gray-300">
            <thead>
              <tr>
                <th colSpan={2} className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">LIKELIHOOD</th>
                {[1,2,3,4,5].map(c => <th key={c} className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px] w-10">{c}</th>)}
              </tr>
              <tr>
                <th colSpan={2} className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]"></th>
                {["Minor","Moderate","Serious","Major","Critical"].map(c => <th key={c} className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">5</td>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">Almost Certain</td>
                <td className="border border-gray-300 bg-amber-500 text-white p-1 text-center font-bold text-[11px]">5</td>
                <td className="border border-gray-300 bg-amber-500 text-white p-1 text-center font-bold text-[11px]">10</td>
                <td className="border border-gray-300 bg-red-600 text-white p-1 text-center font-bold text-[11px]">15</td>
                <td className="border border-gray-300 bg-red-600 text-white p-1 text-center font-bold text-[11px]">20</td>
                <td className="border border-gray-300 bg-red-600 text-white p-1 text-center font-bold text-[11px]">25</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">4</td>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">Likely</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">4</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">8</td>
                <td className="border border-gray-300 bg-amber-500 text-white p-1 text-center font-bold text-[11px]">12</td>
                <td className="border border-gray-300 bg-red-600 text-white p-1 text-center font-bold text-[11px]">16</td>
                <td className="border border-gray-300 bg-red-600 text-white p-1 text-center font-bold text-[11px]">20</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">3</td>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">Possible</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">3</td>
                <td className="border border-gray-300 bg-yellow-300 p-1 text-center font-bold text-[11px]">6</td>
                <td className="border border-gray-300 bg-yellow-300 p-1 text-center font-bold text-[11px]">9</td>
                <td className="border border-gray-300 bg-amber-500 text-white p-1 text-center font-bold text-[11px]">12</td>
                <td className="border border-gray-300 bg-amber-500 text-white p-1 text-center font-bold text-[11px]">15</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">2</td>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">Unlikely</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">2</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">4</td>
                <td className="border border-gray-300 bg-yellow-300 p-1 text-center font-bold text-[11px]">6</td>
                <td className="border border-gray-300 bg-yellow-300 p-1 text-center font-bold text-[11px]">8</td>
                <td className="border border-gray-300 bg-amber-500 text-white p-1 text-center font-bold text-[11px]">10</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">1</td>
                <td className="border border-gray-300 bg-gray-100 p-1 text-center font-bold text-[9px]">Rare</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">1</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">2</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">3</td>
                <td className="border border-gray-300 bg-green-400 p-1 text-center font-bold text-[11px]">4</td>
                <td className="border border-gray-300 bg-yellow-300 p-1 text-center font-bold text-[11px]">5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={() => setShowAll(!showAll)} className="no-print text-xs text-primary hover:underline mb-4">
          {showAll ? "Show Pre-Operation only" : "Show all phases"}
        </button>

        {visiblePhases.map(phase => {
          const items = operationalData.filter(d => d.phase === phase)
          const highCount = items.filter(i => i.risk >= 10).length
          const isOpen = openPhases[phase] ?? false
          return (
            <div key={phase} className="mb-4 border rounded-lg overflow-hidden print:break-inside-avoid">
              <button onClick={() => toggle(phase)} className={`w-full flex items-center justify-between p-3 bg-card hover:bg-accent no-print`}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-wider">{phase}</span>
                  <span className="text-[10px] text-muted-foreground">{items.length} hazards</span>
                  {highCount > 0 && <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">{highCount} high</span>}
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              <div className={`hidden print:block p-2 text-sm font-bold uppercase tracking-wider bg-card border-b ${phase}`}>{phase}</div>
              <div className={`print:block ${isOpen || showAll ? "block" : "hidden"}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-2 font-semibold w-14">Ref</th>
                        <th className="text-left p-2 font-semibold">Hazard / Event</th>
                        <th className="text-left p-2 font-semibold">Existing Controls</th>
                        <th className="text-left p-2 font-semibold">Additional Controls</th>
                        <th className="text-center p-2 font-semibold w-14">L</th>
                        <th className="text-center p-2 font-semibold w-14">C</th>
                        <th className="text-center p-2 font-semibold w-16">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.ref} className="border-t border-border/50 hover:bg-muted/30">
                          <td className="p-2 font-mono text-[10px] text-muted-foreground">{item.ref}</td>
                          <td className="p-2 font-medium">{item.hazard}</td>
                          <td className="p-2 text-muted-foreground">{item.existing}</td>
                          <td className="p-2 text-muted-foreground italic">{item.extra || "—"}</td>
                          <td className="p-2 text-center font-mono">{item.likelihood}</td>
                          <td className="p-2 text-center font-mono">{item.consequence}</td>
                          <td className="p-2 text-center"><RiskScore score={item.risk} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        })}

        <div className="mt-8 pt-4 border-t text-[10px] text-muted-foreground flex justify-between print:fixed print:bottom-0 print:left-0 print:right-0 print:p-4">
          <span>Document: MM-OP-BI-004 | Rev 1.0</span>
          <span>Mickala Group — Operational Risk Assessment</span>
        </div>
      </div>
    </div>
  )
}
