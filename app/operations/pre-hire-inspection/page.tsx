"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, CheckCircle, XCircle, Minus } from "lucide-react"

type YesNoNa = "yes" | "no" | "na" | undefined

function Toggle({ value, onChange }: { value: YesNoNa; onChange: (v: YesNoNa) => void }) {
  const btn = (v: YesNoNa, label: string, color: string) => (
    <button onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v ? `${color} text-white border-transparent` : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}>{label}</button>
  )
  return <div className="flex gap-1 no-print">{btn("yes", "Yes", "bg-green-500")}{btn("no", "No", "bg-red-500")}{btn("na", "N/A", "bg-gray-400")}</div>
}

function TwoToggle({ value, onChange }: { value: "yes" | "no" | undefined; onChange: (v: "yes" | "no" | undefined) => void }) {
  const btn = (v: "yes" | "no", label: string, color: string) => (
    <button onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v ? `${color} text-white border-transparent` : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}>{label}</button>
  )
  return <div className="flex gap-1 no-print">{btn("yes", "Yes", "bg-green-500")}{btn("no", "No", "bg-red-500")}</div>
}

interface CheckRowProps {
  label: string
  value: YesNoNa
  onChange: (v: YesNoNa) => void
  indent?: boolean
  showNa?: boolean
}

function CheckRow({ label, value, onChange, indent }: CheckRowProps) {
  return (
    <div className={`flex items-center justify-between p-2 rounded text-[11px] border ${
      value === "no" ? "border-red-200 bg-red-50" : value === "yes" ? "border-green-200 bg-green-50" : value === "na" ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"
    } ${indent ? "ml-6" : ""}`}>
      <span className={
        value === "no" ? "text-red-700" : value === "yes" ? "text-green-700" : value === "na" ? "text-gray-400" : "text-gray-700"
      }>{label}</span>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}

interface CheckboxItemProps {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}

function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded text-[11px] text-gray-700 hover:bg-gray-50">
      <input type="checkbox" checked={checked} onChange={() => onChange(!checked)}
        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
      {label}
    </label>
  )
}

export default function PreHireInspectionPage() {
  const [siteConducted, setSiteConducted] = useState("")
  const [conductedOn, setConductedOn] = useState("")
  const [preparedBy, setPreparedBy] = useState("")
  const [selectAsset, setSelectAsset] = useState("")
  const [engineHours, setEngineHours] = useState("")
  const [modelNumber, setModelNumber] = useState("")
  const [dispatchDate, setDispatchDate] = useState("")
  const [signature, setSignature] = useState("")
  const [authDate, setAuthDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))

  // Condition Checklist (Y/N/N/A)
  const [equipmentFreeDamage, setEquipmentFreeDamage] = useState<"yes" | "no" | undefined>(undefined)
  const [machineCleanTidy, setMachineCleanTidy] = useState<YesNoNa>(undefined)
  const [doorsWorkStruts, setDoorsWorkStruts] = useState<YesNoNa>(undefined)
  const [drawbarChainsFitted, setDrawbarChainsFitted] = useState<YesNoNa>(undefined)
  const [towHooksFitted, setTowHooksFitted] = useState<YesNoNa>(undefined)
  const [fireExtinguisherSecure, setFireExtinguisherSecure] = useState<YesNoNa>(undefined)
  const [jumpStartReceptacle, setJumpStartReceptacle] = useState<YesNoNa>(undefined)

  // Damage detail fields (shown when equipmentFreeDamage === "no")
  const [damageAction, setDamageAction] = useState("")
  const [damageEvidence, setDamageEvidence] = useState("")
  const [damageDescribe, setDamageDescribe] = useState("")

  // Mast section (checkboxes)
  const [mastHydraulics, setMastHydraulics] = useState(false)
  const [mastStabilisers, setMastStabilisers] = useState(false)
  const [mastOutriggers, setMastOutriggers] = useState(false)

  // Light Heads
  const [lightsWorking, setLightsWorking] = useState<"yes" | "no" | undefined>(undefined)

  // Mechanical
  const [engineOperation, setEngineOperation] = useState<YesNoNa>(undefined)
  const [coolantLevel, setCoolantLevel] = useState<YesNoNa>(undefined)
  const [oilLevel, setOilLevel] = useState<YesNoNa>(undefined)
  const [hydraulicLevel, setHydraulicLevel] = useState<YesNoNa>(undefined)
  const [fuelLevel, setFuelLevel] = useState<YesNoNa>(undefined)
  const [fuelLevelPct, setFuelLevelPct] = useState("")
  const [noLeaks, setNoLeaks] = useState<YesNoNa>(undefined)
  const [lightsSecurityBar, setLightsSecurityBar] = useState<YesNoNa>(undefined)
  const [lightsLenses, setLightsLenses] = useState<YesNoNa>(undefined)
  const [lightsSeals, setLightsSeals] = useState<YesNoNa>(undefined)
  const [lightsReflectors, setLightsReflectors] = useState<YesNoNa>(undefined)
  const [lastServiceDate, setLastServiceDate] = useState("")
  const [machineNeedsServicing, setMachineNeedsServicing] = useState<YesNoNa>(undefined)

  // Controls
  const [emergencyStop, setEmergencyStop] = useState<YesNoNa>(undefined)
  const [isolatorOperation, setIsolatorOperation] = useState<YesNoNa>(undefined)

  // Tyres & Towing
  const [wheelChocks, setWheelChocks] = useState<YesNoNa>(undefined)
  const [tyresInflated, setTyresInflated] = useState<YesNoNa>(undefined)
  const [mastTieDownStraps, setMastTieDownStraps] = useState<YesNoNa>(undefined)
  const [jockeyWheel, setJockeyWheel] = useState<YesNoNa>(undefined)
  const [sevenPinPlug, setSevenPinPlug] = useState<YesNoNa>(undefined)
  const [parkBrake, setParkBrake] = useState<YesNoNa>(undefined)
  const [drawbarCondition, setDrawbarCondition] = useState<YesNoNa>(undefined)
  const [lowFuelBeacon, setLowFuelBeacon] = useState<YesNoNa>(undefined)
  const [towBeacon, setTowBeacon] = useState<YesNoNa>(undefined)

  // Operating Instructions
  const [inspectionBooklet, setInspectionBooklet] = useState<YesNoNa>(undefined)
  const [operatingManual, setOperatingManual] = useState<YesNoNa>(undefined)
  const [compliancePaperwork, setCompliancePaperwork] = useState<YesNoNa>(undefined)

  // Authorisation
  const [authName, setAuthName] = useState("")

  // Helper — count yes/no for summary
  const allToggles: YesNoNa[] = [
    machineCleanTidy, doorsWorkStruts, drawbarChainsFitted, towHooksFitted,
    fireExtinguisherSecure, jumpStartReceptacle, engineOperation,
    coolantLevel, oilLevel, hydraulicLevel, fuelLevel, noLeaks,
    lightsSecurityBar, lightsLenses, lightsSeals, lightsReflectors,
    machineNeedsServicing, emergencyStop, isolatorOperation,
    wheelChocks, tyresInflated, mastTieDownStraps, jockeyWheel,
    sevenPinPlug, parkBrake, drawbarCondition, lowFuelBeacon, towBeacon,
    inspectionBooklet, operatingManual, compliancePaperwork,
  ]
  const passCount = allToggles.filter(v => v === "yes").length +
    (equipmentFreeDamage === "yes" ? 1 : 0) +
    (lightsWorking === "yes" ? 1 : 0)
  const failCount = allToggles.filter(v => v === "no").length +
    (equipmentFreeDamage === "no" ? 1 : 0) +
    (lightsWorking === "no" ? 1 : 0)

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
            <div>MM-OPS-TP-005</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">Pre Hire Inspection Report</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala LED Lighting Towers — Pre-Hire Condition Assessment</p>

        {/* Info bar */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Site conducted", v: siteConducted, s: setSiteConducted, w: "w-36" },
            { l: "Conducted on", v: conductedOn, s: (e: any) => setConductedOn(e.target?.value || e), w: "w-32", type: "date" },
            { l: "Prepared By", v: preparedBy, s: setPreparedBy, w: "w-36" },
            { l: "Select Asset", v: selectAsset, s: setSelectAsset, w: "w-36" },
            { l: "Engine Hours/KMS", v: engineHours, s: setEngineHours, w: "w-28" },
          ].map(({ l, v, s, w, type }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600 whitespace-nowrap">{l}:</span>
              <input type={type || "text"} value={v} onChange={e => s(e.target.value)}
                className={`border-b border-dashed border-gray-300 bg-transparent ${w || "w-28"} px-1 py-0.5 focus:outline-none focus:border-primary`} />
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="flex gap-3 mb-3 text-[10px]">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">{passCount} Pass</span>
          {failCount > 0 && <span className="text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">{failCount} Fail</span>}
        </div>

        {/* ── Inspection Section ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Inspection</h2>
          <div className="flex flex-wrap gap-2 mb-3 text-[10px]">
            {[
              { l: "Model Number", v: modelNumber, s: setModelNumber, w: "w-36" },
              { l: "Dispatch Date", v: dispatchDate, s: (e: any) => setDispatchDate(e.target?.value || e), w: "w-32", type: "date" },
            ].map(({ l, v, s, w, type }) => (
              <div key={l} className="flex items-center gap-1">
                <span className="font-semibold text-gray-600">{l}:</span>
                <input type={type || "text"} value={v} onChange={e => s(e.target.value)}
                  className={`border-b border-dashed border-gray-300 bg-transparent ${w || "w-28"} px-1 py-0.5 focus:outline-none focus:border-primary`} />
              </div>
            ))}
          </div>
          {/* Photo slots */}
          <div className="text-[10px] text-gray-500 mb-2 font-semibold">Photos required: 4</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="border-2 border-dashed border-gray-200 rounded-lg h-20 flex items-center justify-center text-[9px] text-gray-400 bg-gray-50">
                Photo {n}
              </div>
            ))}
          </div>
        </div>

        {/* ── Condition Checklist ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Condition Checklist</h2>
          <div className="space-y-1">
            {/* Equipment free from damage — Yes/No only (no N/A) */}
            <div className={`flex items-center justify-between p-2 rounded text-[11px] border ${
              equipmentFreeDamage === "no" ? "border-red-200 bg-red-50" : equipmentFreeDamage === "yes" ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
            }`}>
              <span className={equipmentFreeDamage === "no" ? "text-red-700" : equipmentFreeDamage === "yes" ? "text-green-700" : "text-gray-700"}>
                Is equipment free from damage?
              </span>
              <TwoToggle value={equipmentFreeDamage} onChange={setEquipmentFreeDamage} />
            </div>

            {equipmentFreeDamage === "no" && (
              <div className="ml-6 p-3 bg-red-50 border border-red-200 rounded space-y-2 text-[10px]">
                <div>
                  <label className="font-semibold text-red-700 block mb-0.5">Required action</label>
                  <input type="text" value={damageAction} onChange={e => setDamageAction(e.target.value)}
                    className="w-full border-b border-dashed border-red-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="font-semibold text-red-700 block mb-0.5">Evidence</label>
                  <input type="text" value={damageEvidence} onChange={e => setDamageEvidence(e.target.value)}
                    className="w-full border-b border-dashed border-red-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="font-semibold text-red-700 block mb-0.5">Describe damage</label>
                  <textarea value={damageDescribe} onChange={e => setDamageDescribe(e.target.value)}
                    className="w-full border border-red-300 rounded p-2 min-h-[50px] focus:outline-none focus:border-red-500 bg-white" />
                </div>
              </div>
            )}

            <CheckRow label="Machine clean & tidy" value={machineCleanTidy} onChange={setMachineCleanTidy} />
            <CheckRow label="Doors work / struts" value={doorsWorkStruts} onChange={setDoorsWorkStruts} />
            <CheckRow label="Drawbar chains fitted" value={drawbarChainsFitted} onChange={setDrawbarChainsFitted} />
            <CheckRow label="3.15T Tow hooks fitted" value={towHooksFitted} onChange={setTowHooksFitted} />
            <CheckRow label="Fire extinguisher secure" value={fireExtinguisherSecure} onChange={setFireExtinguisherSecure} />
            <CheckRow label="Jump start receptacle" value={jumpStartReceptacle} onChange={setJumpStartReceptacle} />
          </div>
        </div>

        {/* ── Mast Section ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Mast Section</h2>
          <div className="space-y-1">
            <CheckboxItem label="Check hydraulic cylinders / hoses" checked={mastHydraulics} onChange={setMastHydraulics} />
            <CheckboxItem label="Check stabilisers" checked={mastStabilisers} onChange={setMastStabilisers} />
            <CheckboxItem label="Check outriggers" checked={mastOutriggers} onChange={setMastOutriggers} />
          </div>
        </div>

        {/* ── Light Heads ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Light Heads</h2>
          <div className={`flex items-center justify-between p-2 rounded text-[11px] border ${
            lightsWorking === "no" ? "border-red-200 bg-red-50" : lightsWorking === "yes" ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
          }`}>
            <span className={lightsWorking === "no" ? "text-red-700" : lightsWorking === "yes" ? "text-green-700" : "text-gray-700"}>
              Lights in working condition?
            </span>
            <TwoToggle value={lightsWorking} onChange={setLightsWorking} />
          </div>
        </div>

        {/* ── Mechanical ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Mechanical</h2>
          <div className="space-y-1">
            <CheckRow label="Check engine operation" value={engineOperation} onChange={setEngineOperation} />

            <div className="text-[10px] font-semibold text-gray-500 pl-2 pt-1">Fluid levels</div>
            <CheckRow label="Coolant" value={coolantLevel} onChange={setCoolantLevel} indent />
            <CheckRow label="Oil" value={oilLevel} onChange={setOilLevel} indent />
            <CheckRow label="Hydraulic" value={hydraulicLevel} onChange={setHydraulicLevel} indent />
            <CheckRow label="Fuel" value={fuelLevel} onChange={setFuelLevel} indent />
            <div className="ml-6 flex items-center gap-2 text-[10px] pt-1">
              <span className="font-semibold text-gray-600">Fuel level %:</span>
              <input type="number" min="0" max="100" value={fuelLevelPct} onChange={e => setFuelLevelPct(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-16 px-1 py-0.5 text-center focus:outline-none focus:border-primary" />
              <span className="text-gray-400">%</span>
            </div>

            <CheckRow label="Ensure no leaks" value={noLeaks} onChange={setNoLeaks} />

            <div className="text-[10px] font-semibold text-gray-500 pl-2 pt-1">Lights security</div>
            <CheckRow label="Light bar" value={lightsSecurityBar} onChange={setLightsSecurityBar} indent />
            <CheckRow label="Lenses" value={lightsLenses} onChange={setLightsLenses} indent />
            <CheckRow label="Seals" value={lightsSeals} onChange={setLightsSeals} indent />
            <CheckRow label="Reflectors" value={lightsReflectors} onChange={setLightsReflectors} indent />

            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px]">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-600">Last service date:</span>
                <input type="date" value={lastServiceDate} onChange={e => setLastServiceDate(e.target.value)}
                  className="border-b border-dashed border-gray-300 bg-transparent w-32 px-1 py-0.5 focus:outline-none focus:border-primary" />
              </div>
            </div>

            <CheckRow label="Does machine need servicing?" value={machineNeedsServicing} onChange={setMachineNeedsServicing} />
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Controls</h2>
          <div className="space-y-1">
            <CheckRow label="Emergency stop" value={emergencyStop} onChange={setEmergencyStop} />
            <CheckRow label="Isolator operation" value={isolatorOperation} onChange={setIsolatorOperation} />
          </div>
        </div>

        {/* ── Tyres & Towing ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Tyres &amp; Towing</h2>
          <div className="space-y-1">
            <CheckRow label="Wheel chocks" value={wheelChocks} onChange={setWheelChocks} />
            <CheckRow label="Tyres inflated 40 PSI" value={tyresInflated} onChange={setTyresInflated} />
            <CheckRow label="Mast tie down straps" value={mastTieDownStraps} onChange={setMastTieDownStraps} />
            <CheckRow label="Jockey wheel fitted" value={jockeyWheel} onChange={setJockeyWheel} />
            <CheckRow label="7 pin plug" value={sevenPinPlug} onChange={setSevenPinPlug} />
            <CheckRow label="Park brake" value={parkBrake} onChange={setParkBrake} />
            <CheckRow label="Drawbar condition" value={drawbarCondition} onChange={setDrawbarCondition} />
            <CheckRow label="Low fuel beacon" value={lowFuelBeacon} onChange={setLowFuelBeacon} />
            <CheckRow label="Tow beacon" value={towBeacon} onChange={setTowBeacon} />
          </div>
        </div>

        {/* ── Operating Instructions ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Operating Instructions</h2>
          <div className="space-y-1">
            <CheckRow label="Inspection booklet" value={inspectionBooklet} onChange={setInspectionBooklet} />
            <CheckRow label="Operating manual" value={operatingManual} onChange={setOperatingManual} />
            <CheckRow label="Compliance paperwork" value={compliancePaperwork} onChange={setCompliancePaperwork} />
          </div>
        </div>

        {/* ── Authorisation ── */}
        <div className="border rounded-lg p-4 text-xs">
          <h2 className="font-bold text-primary text-sm mb-2">Authorisation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Name</label>
              <input type="text" value={authName} onChange={e => setAuthName(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Signature</label>
              <input type="text" value={signature} onChange={e => setSignature(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                placeholder="Sign here" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Date</label>
              <input type="date" value={authDate} onChange={e => setAuthDate(e.target.value || new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-005</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
