"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, AlertTriangle, ChevronDown, ChevronUp, Printer, ExternalLink, ArrowLeft } from "lucide-react"

const designData = [
  { phase: "Transport", ref: "DR-01", hazard: "Loading/unloading — tower may be dropped or incorrectly chained", existing: "Only trained operators authorised; chains and dogs used; pre-trip inspection checklists", preRisk: "H", postRisk: "M" },
  { phase: "Transport", ref: "DR-02", hazard: "Tower may shift during transport", existing: "Pre-trip inspection, chains/dogs, driver responsible for load", preRisk: "M", postRisk: "L" },
  { phase: "Transport", ref: "DR-03", hazard: "Tail swing during tight turns", existing: "Drivers instructed; hazard awareness training", preRisk: "M", postRisk: "L" },
  { phase: "Transport", ref: "DR-04", hazard: "Bridge/structure impact — tower height exceeds allowed clearance", existing: "Trip planning; route hazard identification", preRisk: "H", postRisk: "M" },
  { phase: "Moving/Towing", ref: "MM-01", hazard: "Collision with pedestrians or vehicles during towing within yard/site", existing: "Spotters, reversing alarms, designated towing routes", preRisk: "H", postRisk: "M" },
  { phase: "Moving/Towing", ref: "MM-02", hazard: "Tower may overturn on uneven ground", existing: "Only tow on sealed or compacted ground; speed limited to 10km/h", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-01", hazard: "Stabiliser legs retracted or not fully extended — tower may tip", existing: "Operator checklist before raising mast; ground assessment; visual inspection", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-02", hazard: "Stabiliser legs sink into soft ground", existing: "Ground assessment by operator; outrigger pads used on soft ground", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-03", hazard: "Hydraulic hose burst during mast raising", existing: "Hoses inspected pre-start; visual check for wear/damage", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-04", hazard: "Mast raising — powerline contact", existing: "Minimum 6m clearance from powerlines; operator must identify overhead hazards", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-05", hazard: "Tower may overturn in high wind during set up", existing: "Do not raise mast in winds exceeding 20m/s (72km/h)", preRisk: "H", postRisk: "M" },
  { phase: "Start Up", ref: "ST-01", hazard: "Engine overspeed run away", existing: "Pre-start inspection; engine protection shutdown system", preRisk: "M", postRisk: "L" },
  { phase: "Start Up", ref: "ST-02", hazard: "Start-up in confined space — risk of carbon monoxide poisoning", existing: "Only operate in well ventilated areas; CO alarms available", preRisk: "H", postRisk: "M" },
  { phase: "Operation", ref: "OP-01", hazard: "Lighting tower may overturn in high wind", existing: "Wind speed monitoring; operator instructed to lower mast in high winds", preRisk: "H", postRisk: "M" },
  { phase: "Operation", ref: "OP-02", hazard: "Refuelling — fire or explosion risk", existing: "Engine shut down and cooled before refuelling; only trained operators", preRisk: "H", postRisk: "M" },
  { phase: "Operation", ref: "OP-03", hazard: "Hot surfaces — burns to personnel", existing: "Warning labels affixed; guards fitted to hot surfaces", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-04", hazard: "Hydraulic oil leak — environmental contamination", existing: "Bunding on all hydraulic components; spill kit on site", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-05", hazard: "Unauthorised access to tower", existing: "Lockable battery isolator; site safety rules; key control", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-06", hazard: "Noise exposure (engine running)", existing: "Towers designed below 85dB(A) at 7m; hearing PPE provided", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-07", hazard: "Electrical shock — ELV system fault", existing: "ELV (24/48VDC); RCD protection; volt stick test", preRisk: "M", postRisk: "L" },
  { phase: "Shutdown", ref: "SD-01", hazard: "Crush zone during mast lowering", existing: "Operator training; visual check of exclusion zone; two-person procedure", preRisk: "H", postRisk: "M" },
  { phase: "Shutdown", ref: "SD-02", hazard: "Pinch points during stabiliser retraction", existing: "Training; anti-tamper covers on stabiliser moving parts", preRisk: "M", postRisk: "L" },
  { phase: "Shutdown", ref: "SD-03", hazard: "Hydraulic fluid leak post-shutdown", existing: "Visual inspection; isolator lockout/tagout before maintenance", preRisk: "M", postRisk: "L" },
]

const phases = [...new Set(designData.map(d => d.phase))]

function RiskBadge({ level }: { level: string }) {
  const color = level === "H" ? "bg-red-500/20 text-red-600 border-red-200" : level === "M" ? "bg-amber-500/20 text-amber-600 border-amber-200" : "bg-green-500/20 text-green-600 border-green-200"
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${color}`}>{level}</span>
}

export default function DesignRiskAssessment() {
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({})
  const [showAll, setShowAll] = useState(false)

  const toggle = (phase: string) => setOpenPhases(p => ({ ...p, [phase]: !p[phase] }))

  const visiblePhases = showAll ? phases : phases.slice(0, 1)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 no-print">
          <Link href="/" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Back
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        {/* Title */}
        <div className="flex items-start gap-4 mb-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </span>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Image src="/logo-mickala.png" alt="Mickala" width={40} height={40} className="h-8 w-auto" />
              <span className="text-xs text-muted-foreground">MM-OP-BI-003</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Design Risk Assessment</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Mickala LED Lighting Towers — 49 hazards across 6 lifecycle phases</p>
          </div>
        </div>

        {/* Show All toggle */}
        <button onClick={() => setShowAll(!showAll)} className="no-print text-xs text-primary hover:underline mb-4 inline-flex items-center gap-1">
          {showAll ? "Show Transport only" : "Show all phases"} <ExternalLink className="h-3 w-3" />
        </button>

        {/* Risk Matrix Key */}
        <div className="flex items-center gap-4 mb-2 text-[10px] no-print">
          <span className="font-semibold text-muted-foreground">Risk Rating:</span>
          <RiskBadge level="H" /> <span className="text-muted-foreground">= HIGH</span>
          <RiskBadge level="M" /> <span className="text-muted-foreground">= MEDIUM</span>
          <RiskBadge level="L" /> <span className="text-muted-foreground">= LOW</span>
        </div>

        {/* 5x5 Risk Analysis Matrix */}
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

        {/* Phase sections */}
        {visiblePhases.map(phase => {
          const items = designData.filter(d => d.phase === phase)
          const highCount = items.filter(i => i.preRisk === "H").length
          const isOpen = openPhases[phase] ?? false
          return (
            <div key={phase} className="mb-4 border rounded-lg overflow-hidden print:break-inside-avoid">
              <button onClick={() => toggle(phase)} className="w-full flex items-center justify-between p-3 bg-card hover:bg-accent transition-colors no-print">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-wider">{phase}</span>
                  <span className="text-[10px] text-muted-foreground">{items.length} hazards</span>
                  {highCount > 0 && <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">{highCount} high</span>}
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              <div className={`print:block ${isOpen || showAll ? "block" : "hidden"}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-2 font-semibold w-16">Ref</th>
                        <th className="text-left p-2 font-semibold">Hazard / Event</th>
                        <th className="text-left p-2 font-semibold">Existing Controls</th>
                        <th className="text-center p-2 font-semibold w-16">Initial Risk</th>
                        <th className="text-center p-2 font-semibold w-16">Residual Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.ref} className="border-t border-border/50 hover:bg-muted/30">
                          <td className="p-2 font-mono text-[10px] text-muted-foreground">{item.ref}</td>
                          <td className="p-2 font-medium">{item.hazard}</td>
                          <td className="p-2 text-muted-foreground">{item.existing}</td>
                          <td className="p-2 text-center"><RiskBadge level={item.preRisk} /></td>
                          <td className="p-2 text-center"><RiskBadge level={item.postRisk} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        })}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-[10px] text-muted-foreground flex justify-between print:fixed print:bottom-0 print:left-0 print:right-0 print:p-4">
          <span>Document: MM-OP-BI-003 | Rev 1.0</span>
          <span>Mickala Group — Design Risk Assessment</span>
        </div>
      </div>
    </div>
  )
}
