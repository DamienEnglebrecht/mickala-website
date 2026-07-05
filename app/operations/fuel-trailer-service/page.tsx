"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"

type YesNoNa = "yes" | "no" | "na" | undefined
type CompliantNa = "compliant" | "non-compliant" | "na" | undefined

function Toggle({ value, onChange }: { value: YesNoNa; onChange: (v: YesNoNa) => void }) {
  const btn = (v: YesNoNa, label: string, color: string) => (
    <button onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v ? `${color} text-white border-transparent` : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}>{label}</button>
  )
  return <div className="flex gap-1 no-print">{btn("yes", "Yes", "bg-green-500")}{btn("no", "No", "bg-red-500")}{btn("na", "N/A", "bg-gray-400")}</div>
}

function CompliantToggle({ value, onChange }: { value: CompliantNa; onChange: (v: CompliantNa) => void }) {
  const btn = (v: CompliantNa, label: string, color: string) => (
    <button onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v ? `${color} text-white border-transparent` : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}>{label}</button>
  )
  return <div className="flex gap-1 no-print">{btn("compliant", "Compliant", "bg-green-500")}{btn("non-compliant", "Non-Compliant", "bg-red-500")}{btn("na", "N/A", "bg-gray-400")}</div>
}

interface ToggleRowProps {
  label: string
  value: YesNoNa
  onChange: (v: YesNoNa) => void
  indent?: boolean
}

function ToggleRow({ label, value, onChange, indent }: ToggleRowProps) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded border text-[11px] ${
      value === "no" ? "border-red-200 bg-red-50" : value === "yes" ? "border-green-200 bg-green-50" : "border-gray-100 bg-white"
    } ${indent ? "ml-4" : ""}`}>
      <span className={`font-medium ${value === "no" ? "text-red-700" : value === "yes" ? "text-green-700" : "text-gray-700"}`}>
        {label}
      </span>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}

interface CompliantRowProps {
  label: string
  value: CompliantNa
  onChange: (v: CompliantNa) => void
}

function CompliantRow({ label, value, onChange }: CompliantRowProps) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded border text-[11px] ${
      value === "non-compliant" ? "border-red-200 bg-red-50" : value === "compliant" ? "border-green-200 bg-green-50" : "border-gray-100 bg-white"
    }`}>
      <span className={`font-medium ${value === "non-compliant" ? "text-red-700" : value === "compliant" ? "text-green-700" : "text-gray-700"}`}>
        {label}
      </span>
      <CompliantToggle value={value} onChange={onChange} />
    </div>
  )
}

interface SectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    <div className={`bg-white border rounded-lg p-4 mb-4 ${className || ""}`}>
      <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">{title}</h2>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}

export default function FuelTrailerServicePage() {
  const [siteConducted, setSiteConducted] = useState("")
  const [conductedOn, setConductedOn] = useState("")
  const [preparedBy, setPreparedBy] = useState("")
  const [assetId, setAssetId] = useState("")
  const [totalLiters, setTotalLiters] = useState("")
  const [reviewedBy, setReviewedBy] = useState("")
  const [jobCostNumber, setJobCostNumber] = useState("")
  const [asset, setAsset] = useState("")

  // ── Audit Section ──
  const [ppeCompliant, setPpeCompliant] = useState<CompliantNa>(undefined)
  const [fitForWork, setFitForWork] = useState<YesNoNa>(undefined)
  const [turnIsolators, setTurnIsolators] = useState<YesNoNa>(undefined)

  // ── Running Checks ──
  const [electricBrake, setElectricBrake] = useState<YesNoNa>(undefined)
  const [breakAwayPin, setBreakAwayPin] = useState<YesNoNa>(undefined)
  const [trailerLights, setTrailerLights] = useState<YesNoNa>(undefined)
  const [chargeVoltage, setChargeVoltage] = useState<YesNoNa>(undefined)
  const [gpsFunction, setGpsFunction] = useState<YesNoNa>(undefined)
  const [eStopFunction, setEStopFunction] = useState<YesNoNa>(undefined)
  const [pumpOperation, setPumpOperation] = useState<YesNoNa>(undefined)

  // ── Isolated Checks - Tyres and Rims ──
  const [tyresRims, setTyresRims] = useState<YesNoNa>(undefined)
  const [wheelNutIndicators, setWheelNutIndicators] = useState<YesNoNa>(undefined)
  const [wheelNutsTensioned, setWheelNutsTensioned] = useState<YesNoNa>(undefined)

  // ── Suspension ──
  const [leafSprings, setLeafSprings] = useState<YesNoNa>(undefined)
  const [suspensionHanger, setSuspensionHanger] = useState<YesNoNa>(undefined)
  const [grease, setGrease] = useState<YesNoNa>(undefined)

  // ── Wheel Bearings and Brakes ──
  const [wheelBearings, setWheelBearings] = useState<YesNoNa>(undefined)
  const [handbrakeLever, setHandbrakeLever] = useState<YesNoNa>(undefined)
  const [handbrakeCable, setHandbrakeCable] = useState<YesNoNa>(undefined)
  const [handbrakeRetainer, setHandbrakeRetainer] = useState<YesNoNa>(undefined)
  const [adjustHandbrake, setAdjustHandbrake] = useState<YesNoNa>(undefined)
  const [twoPinPlugs, setTwoPinPlugs] = useState<YesNoNa>(undefined)

  // ── Drawbar ──
  const [towHooks, setTowHooks] = useState<YesNoNa>(undefined)
  const [drawbarChains, setDrawbarChains] = useState<YesNoNa>(undefined)
  const [jockeyWheel, setJockeyWheel] = useState<YesNoNa>(undefined)
  const [trailerPlug, setTrailerPlug] = useState<YesNoNa>(undefined)
  const [breakAwayCable, setBreakAwayCable] = useState<YesNoNa>(undefined)
  const [drawbarBolts, setDrawbarBolts] = useState<YesNoNa>(undefined)
  const [towHitch, setTowHitch] = useState<YesNoNa>(undefined)
  const [drawbarLabels, setDrawbarLabels] = useState<YesNoNa>(undefined)

  // ── Panels ──
  const [wheelGuards, setWheelGuards] = useState<YesNoNa>(undefined)
  const [panelsDamage, setPanelsDamage] = useState<YesNoNa>(undefined)
  const [hiVisTape, setHiVisTape] = useState<YesNoNa>(undefined)
  const [callsigns, setCallsigns] = useState<YesNoNa>(undefined)
  const [chockHolders, setChockHolders] = useState<YesNoNa>(undefined)
  const [wheelChocks, setWheelChocks] = useState<YesNoNa>(undefined)
  const [cleanCabinet, setCleanCabinet] = useState<YesNoNa>(undefined)

  // Conditional sub-items for wheel chocks
  const [fireExtinguisher, setFireExtinguisher] = useState<YesNoNa>(undefined)
  const [labelsVisible, setLabelsVisible] = useState<YesNoNa>(undefined)
  const [doorStruts, setDoorStruts] = useState<YesNoNa>(undefined)

  // ── Fuelling System ──
  const [fuelSystemCheck, setFuelSystemCheck] = useState<YesNoNa>(undefined)
  const [fuelHoseCracks, setFuelHoseCracks] = useState<YesNoNa>(undefined)
  const [hoseReelOperation, setHoseReelOperation] = useState<YesNoNa>(undefined)
  const [hoseReelRatchet, setHoseReelRatchet] = useState<YesNoNa>(undefined)
  const [hoseReelMounted, setHoseReelMounted] = useState<YesNoNa>(undefined)
  const [fuelPumpMounted, setFuelPumpMounted] = useState<YesNoNa>(undefined)
  const [fuelPumpLeaks, setFuelPumpLeaks] = useState<YesNoNa>(undefined)
  const [fuelClamps, setFuelClamps] = useState<YesNoNa>(undefined)
  const [flowMeter, setFlowMeter] = useState<YesNoNa>(undefined)
  const [replaceFuelFilter, setReplaceFuelFilter] = useState<YesNoNa>(undefined)
  const [fuelFilterDate, setFuelFilterDate] = useState("")

  // ── Electrical System ──
  const [batteryVoltage, setBatteryVoltage] = useState<YesNoNa>(undefined)
  const [batteryVoltageValue, setBatteryVoltageValue] = useState("")
  const [solarInput, setSolarInput] = useState<YesNoNa>(undefined)
  const [batteriesSecure, setBatteriesSecure] = useState<YesNoNa>(undefined)
  const [terminalCovers, setTerminalCovers] = useState<YesNoNa>(undefined)
  const [terminalsClean, setTerminalsClean] = useState<YesNoNa>(undefined)
  const [gpsWebfleet, setGpsWebfleet] = useState<YesNoNa>(undefined)
  const [replaceFuelFilterElec, setReplaceFuelFilterElec] = useState<YesNoNa>(undefined)
  const [fuelFilterEvidence, setFuelFilterEvidence] = useState("")

  // ── Sign Off ──
  const [mickalaRep, setMickalaRep] = useState("")
  const [signDate, setSignDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [signature, setSignature] = useState("")

  // ── Summary counts ──
  const allToggles: YesNoNa[] = [
    fitForWork, turnIsolators,
    electricBrake, breakAwayPin, trailerLights, chargeVoltage, gpsFunction, eStopFunction, pumpOperation,
    tyresRims, wheelNutIndicators, wheelNutsTensioned,
    leafSprings, suspensionHanger, grease,
    wheelBearings, handbrakeLever, handbrakeCable, handbrakeRetainer, adjustHandbrake, twoPinPlugs,
    towHooks, drawbarChains, jockeyWheel, trailerPlug, breakAwayCable, drawbarBolts, towHitch, drawbarLabels,
    wheelGuards, panelsDamage, hiVisTape, callsigns, chockHolders, wheelChocks, cleanCabinet,
    fireExtinguisher, labelsVisible, doorStruts,
    fuelSystemCheck, fuelHoseCracks, hoseReelOperation, hoseReelRatchet, hoseReelMounted,
    fuelPumpMounted, fuelPumpLeaks, fuelClamps, flowMeter, replaceFuelFilter,
    batteryVoltage, solarInput, batteriesSecure, terminalCovers, terminalsClean, gpsWebfleet, replaceFuelFilterElec,
  ]
  const passCount = allToggles.filter(v => v === "yes").length
  const failCount = allToggles.filter(v => v === "no").length

  const allCompliant: CompliantNa[] = [ppeCompliant]
  const compliantCount = allCompliant.filter(v => v === "compliant").length
  const nonCompliantCount = allCompliant.filter(v => v === "non-compliant").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Toolbar */}
        <div className="flex justify-between items-start mb-4 no-print">
          <Link href="/operations" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Operations
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" />
            <div className="mt-1">
              <span className="text-xl font-extrabold">MICKALA</span>
              <span className="text-xl font-extrabold text-primary ml-1">GROUP</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-500">
            <div>MM-OPS-TP-010</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">Fuel Trailer Servicing Report</h1>
        <p className="text-xs text-gray-500 mb-3">6-Weekly Service Inspection — Fuel Trailer</p>

        {/* Info bar */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Site conducted", v: siteConducted, s: setSiteConducted, w: "w-36" },
            { l: "Conducted on", v: conductedOn, s: (e: any) => setConductedOn(e.target?.value || e), w: "w-32", type: "date" },
            { l: "Prepared by", v: preparedBy, s: setPreparedBy, w: "w-36" },
            { l: "Asset ID", v: assetId, s: setAssetId, w: "w-32" },
          ].map(({ l, v, s, w, type }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600 whitespace-nowrap">{l}:</span>
              <input type={type || "text"} value={v} onChange={e => s(e.target.value)}
                className={`border-b border-dashed border-gray-300 bg-transparent ${w || "w-28"} px-1 py-0.5 focus:outline-none focus:border-primary`} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Total Liters Dispensed", v: totalLiters, s: setTotalLiters, w: "w-28" },
            { l: "Reviewed by Authorised Mickala Rep", v: reviewedBy, s: setReviewedBy, w: "w-40" },
            { l: "Job Cost Number", v: jobCostNumber, s: setJobCostNumber, w: "w-32" },
            { l: "Asset", v: asset, s: setAsset, w: "w-36" },
          ].map(({ l, v, s, w }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600 whitespace-nowrap">{l}:</span>
              <input type="text" value={v} onChange={e => s(e.target.value)}
                className={`border-b border-dashed border-gray-300 bg-transparent ${w || "w-28"} px-1 py-0.5 focus:outline-none focus:border-primary`} />
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="flex gap-3 mb-3 text-[10px] flex-wrap">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">{passCount + compliantCount} Pass</span>
          {(failCount + nonCompliantCount) > 0 && <span className="text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">{failCount + nonCompliantCount} Fail</span>}
        </div>

        {/* ── Audit Section ── */}
        <SectionCard title="Audit">
          <CompliantRow label="ENSURE CORRECT PPE IS WORN (C/NC/N/A)" value={ppeCompliant} onChange={setPpeCompliant} />
          <ToggleRow label="Are you fit for work? (Y/N/N/A)" value={fitForWork} onChange={setFitForWork} />
          <ToggleRow label="Turn isolators to off position and test (Y/N/N/A)" value={turnIsolators} onChange={setTurnIsolators} />
        </SectionCard>

        {/* ── Running Checks ── */}
        <SectionCard title="Running Checks">
          <ToggleRow label="Test electric brake function" value={electricBrake} onChange={setElectricBrake} />
          <ToggleRow label="Pull the pin on the break away and ensure all brakes lock up" value={breakAwayPin} onChange={setBreakAwayPin} />
          <ToggleRow label="Test trailer lights" value={trailerLights} onChange={setTrailerLights} />
          <ToggleRow label="Check charge voltage at battery and solar regulator" value={chargeVoltage} onChange={setChargeVoltage} />
          <ToggleRow label="Test GPS function using webfleet" value={gpsFunction} onChange={setGpsFunction} />
          <ToggleRow label="Test e-stop function" value={eStopFunction} onChange={setEStopFunction} />
          <ToggleRow label="Test pump operation" value={pumpOperation} onChange={setPumpOperation} />
        </SectionCard>

        {/* ── Isolated Checks - Tyres and Rims ── */}
        <SectionCard title="Isolated Checks — Tyres and Rims">
          <ToggleRow label="Inspect tyres for wear and rims for damage" value={tyresRims} onChange={setTyresRims} />
          <ToggleRow label="Check all wheel nut indicators" value={wheelNutIndicators} onChange={setWheelNutIndicators} />
          <ToggleRow label="Check wheel nuts are tensioned correctly" value={wheelNutsTensioned} onChange={setWheelNutsTensioned} />
        </SectionCard>

        {/* ── Suspension ── */}
        <SectionCard title="Suspension">
          <ToggleRow label="Check leaf springs for cracking or damage" value={leafSprings} onChange={setLeafSprings} />
          <ToggleRow label="Inspect centre suspension hanger for cracking or pin movement" value={suspensionHanger} onChange={setSuspensionHanger} />
          <ToggleRow label="Grease" value={grease} onChange={setGrease} />
        </SectionCard>

        {/* ── Wheel Bearings and Brakes ── */}
        <SectionCard title="Wheel Bearings and Brakes">
          <ToggleRow label="Inspect wheel bearings for excessive movement" value={wheelBearings} onChange={setWheelBearings} />
          <ToggleRow label="Inspect handbrake lever" value={handbrakeLever} onChange={setHandbrakeLever} />
          <ToggleRow label="Inspect handbrake cable for tension and fraying" value={handbrakeCable} onChange={setHandbrakeCable} />
          <ToggleRow label="Inspect the handbrake retainer on the backing plates are not seized" value={handbrakeRetainer} onChange={setHandbrakeRetainer} />
          <ToggleRow label="Adjust handbrake" value={adjustHandbrake} onChange={setAdjustHandbrake} />
          <ToggleRow label="Inspect all 2 pin plugs are connected on backing plates" value={twoPinPlugs} onChange={setTwoPinPlugs} />
        </SectionCard>

        {/* ── Drawbar ── */}
        <SectionCard title="Drawbar">
          <ToggleRow label="Inspect tow hooks for damage" value={towHooks} onChange={setTowHooks} />
          <ToggleRow label="Inspect draw bar chains for wear and damage" value={drawbarChains} onChange={setDrawbarChains} />
          <ToggleRow label="Inspect jockey wheel/jack leg for damage" value={jockeyWheel} onChange={setJockeyWheel} />
          <ToggleRow label="Inspect trailer plug for damage and cable is mounted using p clamps" value={trailerPlug} onChange={setTrailerPlug} />
          <ToggleRow label="Inspect brake away and cable for damage" value={breakAwayCable} onChange={setBreakAwayCable} />
          <ToggleRow label="Check drawbar bolts are tight and free from damage" value={drawbarBolts} onChange={setDrawbarBolts} />
          <ToggleRow label="Inspect tow hitch for wear and damage" value={towHitch} onChange={setTowHitch} />
          <ToggleRow label="Inspect drawbar labels (mission brown label and weight label are visible)" value={drawbarLabels} onChange={setDrawbarLabels} />
        </SectionCard>

        {/* ── Panels ── */}
        <SectionCard title="Panels">
          <ToggleRow label="Inspect and take photos of wheel guards" value={wheelGuards} onChange={setWheelGuards} />
          <ToggleRow label="Inspect and take photos of front/back/both sides for damage" value={panelsDamage} onChange={setPanelsDamage} />
          <ToggleRow label="Inspect hi vis tape is visible" value={hiVisTape} onChange={setHiVisTape} />
          <ToggleRow label="Inspect callsigns are visible and legible" value={callsigns} onChange={setCallsigns} />
          <ToggleRow label="Inspect wheel chock holders for damage" value={chockHolders} onChange={setChockHolders} />
          <ToggleRow label="Ensure wheel chocks are fitted" value={wheelChocks} onChange={setWheelChocks} />
          {wheelChocks === "yes" && (
            <div className="ml-4 p-3 bg-green-50 border border-green-200 rounded space-y-1">
              <ToggleRow label="Check fire extinguisher mounted and in date" value={fireExtinguisher} onChange={setFireExtinguisher} indent />
              <ToggleRow label="Check labels visible" value={labelsVisible} onChange={setLabelsVisible} indent />
              <ToggleRow label="Check door struts/latches/hinges" value={doorStruts} onChange={setDoorStruts} indent />
            </div>
          )}
          <ToggleRow label="Clean rear cabinet remove rubbish" value={cleanCabinet} onChange={setCleanCabinet} />
        </SectionCard>

        {/* ── Fuelling System ── */}
        <SectionCard title="Fuelling System">
          <ToggleRow label="Run check fuel system" value={fuelSystemCheck} onChange={setFuelSystemCheck} />
          <ToggleRow label="Inspect fuel hose for cracks or damage (x2)" value={fuelHoseCracks} onChange={setFuelHoseCracks} />
          <ToggleRow label="Inspect hose reel operation" value={hoseReelOperation} onChange={setHoseReelOperation} />
          <ToggleRow label="Check ratchet on hose reel is operating correctly" value={hoseReelRatchet} onChange={setHoseReelRatchet} />
          <ToggleRow label="Check hose reel is mounted securely" value={hoseReelMounted} onChange={setHoseReelMounted} />
          <ToggleRow label="Check fuel pump is mounted securely" value={fuelPumpMounted} onChange={setFuelPumpMounted} />
          <ToggleRow label="Check fuel pump for leaks" value={fuelPumpLeaks} onChange={setFuelPumpLeaks} />
          <ToggleRow label="Check all fuel hose clamps are tight and no leaks visible" value={fuelClamps} onChange={setFuelClamps} />
          <ToggleRow label="Test operation of flow meter" value={flowMeter} onChange={setFlowMeter} />
          <ToggleRow label="Replace fuel filter and write on the date" value={replaceFuelFilter} onChange={setReplaceFuelFilter} />
          {replaceFuelFilter === "yes" && (
            <div className="ml-4 pt-1 flex items-center gap-2 text-[10px]">
              <span className="font-semibold text-gray-600">Fuel filter date:</span>
              <input type="date" value={fuelFilterDate} onChange={e => setFuelFilterDate(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-32 px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          )}
        </SectionCard>

        {/* ── Electrical System ── */}
        <SectionCard title="Electrical System">
          <ToggleRow label="Check battery voltage" value={batteryVoltage} onChange={setBatteryVoltage} />
          {batteryVoltage === "yes" && (
            <div className="ml-4 pt-1 flex items-center gap-2 text-[10px]">
              <span className="font-semibold text-gray-600">How many volts?</span>
              <input type="number" step="0.1" min="0" max="30" value={batteryVoltageValue} onChange={e => setBatteryVoltageValue(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-20 px-1 py-0.5 text-center focus:outline-none focus:border-primary" />
              <span className="text-gray-400">V</span>
            </div>
          )}
          <ToggleRow label="Check solar input using solar regulator" value={solarInput} onChange={setSolarInput} />
          <ToggleRow label="Check batteries are secure" value={batteriesSecure} onChange={setBatteriesSecure} />
          <ToggleRow label="Ensure battery terminal covers are fitted correctly" value={terminalCovers} onChange={setTerminalCovers} />
          <ToggleRow label="Check all terminals are free from heat and corrosion" value={terminalsClean} onChange={setTerminalsClean} />
          <ToggleRow label="Test GPS is functioning on webfleet" value={gpsWebfleet} onChange={setGpsWebfleet} />
          <ToggleRow label="Replace fuel filter (if Yes: evidence photo)" value={replaceFuelFilterElec} onChange={setReplaceFuelFilterElec} />
          {replaceFuelFilterElec === "yes" && (
            <div className="ml-4 pt-1 text-[10px]">
              <div className="border-2 border-dashed border-gray-200 rounded-lg h-16 flex items-center justify-center text-[9px] text-gray-400 bg-gray-50">
                Evidence photo slot — attach photo on print
              </div>
              <input type="text" value={fuelFilterEvidence} onChange={e => setFuelFilterEvidence(e.target.value)}
                placeholder="Photo reference / notes"
                className="mt-1 w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          )}
        </SectionCard>

        {/* ── Sign Off ── */}
        <div className="border rounded-lg p-4 text-xs">
          <h2 className="font-bold text-primary text-sm mb-2 uppercase tracking-wider">Sign Off</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Mickala Representative</label>
              <input type="text" value={mickalaRep} onChange={e => setMickalaRep(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Date</label>
              <input type="date" value={signDate} onChange={e => setSignDate(e.target.value || new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Signature</label>
              <input type="text" value={signature} onChange={e => setSignature(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                placeholder="Sign here" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-010</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
