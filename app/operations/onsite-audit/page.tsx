"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, CheckCircle, XCircle, Minus, Camera } from "lucide-react"

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
  note?: string
}

function ToggleRow({ label, value, onChange, note }: ToggleRowProps) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded border text-[11px] ${
      value === "no" ? "border-red-200 bg-red-50" : value === "yes" ? "border-green-200 bg-green-50" : "border-gray-100 bg-white"
    }`}>
      <div>
        <span className={`font-medium ${value === "no" ? "text-red-700" : value === "yes" ? "text-green-700" : "text-gray-700"}`}>
          {label}
        </span>
        {note && <span className="text-[9px] text-gray-400 block">{note}</span>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}

interface PhotoRowProps {
  label: string
  value: string
  onChange: (v: string) => void
}

function PhotoRow({ label, value, onChange }: PhotoRowProps) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded border border-gray-100 bg-white text-[11px]">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) onChange(file.name)
          }}
          className="hidden"
          id={`photo-${label.replace(/\s+/g, "-").toLowerCase()}`}
        />
        <label
          htmlFor={`photo-${label.replace(/\s+/g, "-").toLowerCase()}`}
          className="flex items-center gap-1 px-3 py-1 rounded text-[10px] font-semibold border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 cursor-pointer no-print"
        >
          <Camera className="h-3 w-3" />
          {value ? "Change" : "Capture"}
        </label>
        {value && <span className="text-[9px] text-gray-400 truncate max-w-[120px]">{value}</span>}
      </div>
    </div>
  )
}

export default function OnsiteAuditPage() {
  // Header info
  const [siteConducted, setSiteConducted] = useState("")
  const [conductedOn, setConductedOn] = useState("")
  const [preparedBy, setPreparedBy] = useState("")
  const [location, setLocation] = useState("")
  const [asset, setAsset] = useState("")

  // Audit header
  const [ppeCompliant, setPpeCompliant] = useState<CompliantNa>(undefined)

  // Plant Details
  const [modelNo, setModelNo] = useState("")
  const [serialNo, setSerialNo] = useState("")
  const [callSign, setCallSign] = useState("")
  const [inspectDate, setInspectDate] = useState("")
  const [engineHours, setEngineHours] = useState("")
  const [sitePlant, setSitePlant] = useState("")

  // General
  const [damageFree, setDamageFree] = useState<YesNoNa>(undefined)
  const [damageDesc, setDamageDesc] = useState("")
  const [cleanTidy, setCleanTidy] = useState<YesNoNa>(undefined)
  const [doorsWork, setDoorsWork] = useState<YesNoNa>(undefined)
  const [drawbarChains, setDrawbarChains] = useState<YesNoNa>(undefined)
  const [towHook, setTowHook] = useState<YesNoNa>(undefined)
  const [brakeAway, setBrakeAway] = useState<YesNoNa>(undefined)
  const [fireExtinguisher, setFireExtinguisher] = useState<YesNoNa>(undefined)
  const [nextServiceDue, setNextServiceDue] = useState("")
  const [handBrake, setHandBrake] = useState<YesNoNa>(undefined)

  // Media checks
  const [drawbarPaintPhoto, setDrawbarPaintPhoto] = useState("")
  const [reflectiveTapePhoto, setReflectiveTapePhoto] = useState("")
  const [gearBoxBoltsPhoto, setGearBoxBoltsPhoto] = useState("")
  const [machinePhotos, setMachinePhotos] = useState<string[]>(["", "", "", "", "", "", ""])
  const [allLightsPhoto, setAllLightsPhoto] = useState("")
  const [boomCradleBolts, setBoomCradleBolts] = useState<YesNoNa>(undefined)
  const [anacondaCondition, setAnacondaCondition] = useState<YesNoNa>(undefined)

  // Engine & Generator
  const [operateHydraulicsNoEngine, setOperateHydraulicsNoEngine] = useState<YesNoNa>(undefined)
  const [hydraulicSolenoidPhoto, setHydraulicSolenoidPhoto] = useState("")
  const [howManyLights, setHowManyLights] = useState("")
  const [whatTypeLights, setWhatTypeLights] = useState("")

  // Start machine
  const [engineRpmUnloaded, setEngineRpmUnloaded] = useState("")
  const [engineRpmLoaded, setEngineRpmLoaded] = useState("")
  const [genVoltageUnloaded, setGenVoltageUnloaded] = useState("")
  const [genVoltageLoaded, setGenVoltageLoaded] = useState("")

  // Hydraulics
  const [cylinderOperation, setCylinderOperation] = useState<YesNoNa>(undefined)

  // Controls
  const [emergencyStop, setEmergencyStop] = useState<YesNoNa>(undefined)
  const [isolator, setIsolator] = useState<YesNoNa>(undefined)
  const [estopBoxes, setEstopBoxes] = useState<YesNoNa>(undefined)

  // Tyres & Towing
  const [wheelChocks, setWheelChocks] = useState<YesNoNa>(undefined)
  const [jockeyWheel, setJockeyWheel] = useState<YesNoNa>(undefined)
  const [sevenPinPlug, setSevenPinPlug] = useState<YesNoNa>(undefined)
  const [wheelNutIndicator, setWheelNutIndicator] = useState<YesNoNa>(undefined)

  // Operating Instructions
  const [inspectionBooklet, setInspectionBooklet] = useState<YesNoNa>(undefined)

  // BMA Specific Compliance
  const [inspectionPaperwork, setInspectionPaperwork] = useState<CompliantNa>(undefined)
  const [bmaDueDate, setBmaDueDate] = useState("")

  // Comments
  const [comments, setComments] = useState("")

  // Authorisation
  const [authSignature, setAuthSignature] = useState("")
  const [authDate, setAuthDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))

  // Admin Use Only
  const [adminDateReceived, setAdminDateReceived] = useState("")
  const [adminReceivedBy, setAdminReceivedBy] = useState("")
  const [adminSignature, setAdminSignature] = useState("")

  const updateMachinePhoto = (idx: number, val: string) => {
    const updated = [...machinePhotos]
    updated[idx] = val
    setMachinePhotos(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Navigation & Print */}
        <div className="flex justify-between items-start mb-4 no-print">
          <Link href="/operations" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Operations
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        {/* Logo & Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" />
            <div className="mt-1">
              <span className="text-xl font-extrabold">MICKALA</span>
              <span className="text-xl font-extrabold text-primary ml-1">GROUP</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-500">
            <div>MM-OPS-TP-007</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">LED Lighting Tower — Onsite Audit</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala Group — Site Compliance Audit (MM-OPS-TP-007)</p>

        {/* Info bar */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Site conducted", v: siteConducted, s: setSiteConducted },
            { l: "Conducted on", v: conductedOn, s: setConductedOn, type: "date" },
            { l: "Prepared by", v: preparedBy, s: setPreparedBy },
            { l: "Location", v: location, s: setLocation },
            { l: "Asset", v: asset, s: setAsset },
          ].map(({ l, v, s, type }: any) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600 whitespace-nowrap">{l}:</span>
              <input type={type || "text"} value={v} onChange={(e: any) => s(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-28 px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          ))}
        </div>

        {/* Audit Header — PPE */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Audit Header</h2>
          <div className="flex items-center justify-between py-2 px-3 rounded border border-gray-100 bg-white text-[11px]">
            <span className="font-medium text-gray-700">ENSURE APPROPRIATE PPE</span>
            <CompliantToggle value={ppeCompliant} onChange={setPpeCompliant} />
          </div>
        </div>

        {/* Plant Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Plant Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { l: "Model No", v: modelNo, s: setModelNo },
              { l: "Serial No", v: serialNo, s: setSerialNo },
              { l: "Call Sign", v: callSign, s: setCallSign },
              { l: "Inspect Date", v: inspectDate, s: setInspectDate, type: "date" },
              { l: "Engine Hours", v: engineHours, s: setEngineHours },
              { l: "Site", v: sitePlant, s: setSitePlant },
            ].map(({ l, v, s, type }: any) => (
              <div key={l}>
                <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">{l}</label>
                <input type={type || "text"} value={v} onChange={(e: any) => s(e.target.value)}
                  className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* General */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">General</h2>
          <div className="space-y-2 mb-3">
            <div className={`flex items-center justify-between py-2 px-3 rounded border text-[11px] ${
              damageFree === "no" ? "border-red-200 bg-red-50" : damageFree === "yes" ? "border-green-200 bg-green-50" : "border-gray-100 bg-white"
            }`}>
              <span className={`font-medium ${damageFree === "no" ? "text-red-700" : damageFree === "yes" ? "text-green-700" : "text-gray-700"}`}>
                Equipment free from damage
              </span>
              <Toggle value={damageFree} onChange={setDamageFree} />
            </div>
            {damageFree === "no" && (
              <div className="ml-4">
                <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Describe damage</label>
                <textarea value={damageDesc} onChange={e => setDamageDesc(e.target.value)}
                  className="w-full border rounded-lg p-2 text-xs min-h-[50px] focus:outline-none focus:border-primary"
                  placeholder="Describe the damage..." />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <ToggleRow label="Machine clean & tidy" value={cleanTidy} onChange={setCleanTidy} />
            <ToggleRow label="Doors work / struts" value={doorsWork} onChange={setDoorsWork} />
            <ToggleRow label="Drawbar chains fitted" value={drawbarChains} onChange={setDrawbarChains} />
            <ToggleRow label="Tow hook fitted" value={towHook} onChange={setTowHook} />
            <ToggleRow label="Brake away switch condition" value={brakeAway} onChange={setBrakeAway} />
            <ToggleRow label="Fire extinguisher secure" value={fireExtinguisher} onChange={setFireExtinguisher} />
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Next service due</label>
              <input type="date" value={nextServiceDue} onChange={e => setNextServiceDue(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="mt-2">
            <ToggleRow label="Hand brake adjusted / working" value={handBrake} onChange={setHandBrake} />
          </div>
        </div>

        {/* Media Checks */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Media Checks</h2>
          <div className="space-y-2">
            <PhotoRow label="Drawbar paint photo" value={drawbarPaintPhoto} onChange={setDrawbarPaintPhoto} />
            <PhotoRow label="Reflective tape photo" value={reflectiveTapePhoto} onChange={setReflectiveTapePhoto} />
            <PhotoRow label="Gear box bolts photo" value={gearBoxBoltsPhoto} onChange={setGearBoxBoltsPhoto} />
            {machinePhotos.map((photo, idx) => (
              <PhotoRow key={idx} label={`Machine photo ${idx + 1}`} value={photo} onChange={(v) => updateMachinePhoto(idx, v)} />
            ))}
            <PhotoRow label="All lights working photo" value={allLightsPhoto} onChange={setAllLightsPhoto} />
            <ToggleRow label="Boom cradle bolts" value={boomCradleBolts} onChange={setBoomCradleBolts} />
            <ToggleRow label="Anaconda condition" value={anacondaCondition} onChange={setAnacondaCondition} />
          </div>
        </div>

        {/* Engine & Generator */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Engine & Generator</h2>
          <div className="space-y-2 mb-3">
            <ToggleRow label="Operate hydraulics without engine" value={operateHydraulicsNoEngine} onChange={setOperateHydraulicsNoEngine} />
            <PhotoRow label="Hydraulic solenoid photo" value={hydraulicSolenoidPhoto} onChange={setHydraulicSolenoidPhoto} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">How many lights</label>
              <input type="number" value={howManyLights} onChange={e => setHowManyLights(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">What type of lights</label>
              <input type="text" value={whatTypeLights} onChange={e => setWhatTypeLights(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Start Machine */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Start Machine</h2>
          <div className="space-y-2">
            <PhotoRow label="Engine RPM — Unloaded" value={engineRpmUnloaded} onChange={setEngineRpmUnloaded} />
            <PhotoRow label="Engine RPM — Loaded" value={engineRpmLoaded} onChange={setEngineRpmLoaded} />
            <PhotoRow label="Generator Voltage — Unloaded" value={genVoltageUnloaded} onChange={setGenVoltageUnloaded} />
            <PhotoRow label="Generator Voltage — Loaded" value={genVoltageLoaded} onChange={setGenVoltageLoaded} />
          </div>
        </div>

        {/* Hydraulics */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Hydraulics</h2>
          <ToggleRow label="Check cylinder operation" value={cylinderOperation} onChange={setCylinderOperation} />
        </div>

        {/* Controls */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Controls</h2>
          <div className="space-y-2">
            <ToggleRow label="Emergency stop" value={emergencyStop} onChange={setEmergencyStop} />
            <ToggleRow label="Isolator" value={isolator} onChange={setIsolator} />
            <ToggleRow label="E-stop boxes installed" value={estopBoxes} onChange={setEstopBoxes} />
          </div>
        </div>

        {/* Tyres & Towing */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Tyres & Towing</h2>
          <div className="space-y-2">
            <ToggleRow label="Wheel chocks" value={wheelChocks} onChange={setWheelChocks} />
            <ToggleRow label="Jockey wheel" value={jockeyWheel} onChange={setJockeyWheel} />
            <ToggleRow label="7 pin plug" value={sevenPinPlug} onChange={setSevenPinPlug} />
            <ToggleRow label="Wheel nut indicator" value={wheelNutIndicator} onChange={setWheelNutIndicator} />
          </div>
        </div>

        {/* Operating Instructions */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Operating Instructions</h2>
          <ToggleRow label="Inspection booklet available" value={inspectionBooklet} onChange={setInspectionBooklet} />
        </div>

        {/* BMA Specific Compliance */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">BMA Specific Compliance</h2>
          <div className="flex items-center justify-between py-2 px-3 rounded border border-gray-100 bg-white text-[11px] mb-3">
            <span className="font-medium text-gray-700">Inspection paperwork in date</span>
            <CompliantToggle value={inspectionPaperwork} onChange={setInspectionPaperwork} />
          </div>
          <div>
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Due Date</label>
            <input type="date" value={bmaDueDate} onChange={e => setBmaDueDate(e.target.value)}
              className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-2 uppercase tracking-wider">Comments</h2>
          <textarea value={comments} onChange={e => setComments(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[80px] focus:outline-none focus:border-primary"
            placeholder="Additional comments or observations..." />
        </div>

        {/* Authorisation */}
        <div className="border rounded-lg p-4 text-xs mb-4">
          <h2 className="font-bold text-primary text-sm mb-2">Authorisation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Signature</label>
              <input type="text" value={authSignature} onChange={e => setAuthSignature(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                placeholder="Sign here" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Date</label>
              <input type="text" value={authDate} onChange={e => setAuthDate(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Admin Use Only */}
        <div className="border rounded-lg p-4 text-xs border-dashed border-gray-300">
          <h2 className="font-bold text-gray-500 text-sm mb-2 uppercase tracking-wider">Admin Use Only</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-500">Date Received</label>
              <input type="date" value={adminDateReceived} onChange={e => setAdminDateReceived(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-gray-400 text-gray-600" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-500">Received by</label>
              <input type="text" value={adminReceivedBy} onChange={e => setAdminReceivedBy(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-gray-400 text-gray-600" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-500">Signature</label>
              <input type="text" value={adminSignature} onChange={e => setAdminSignature(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-gray-400 font-script text-sm text-gray-600"
                placeholder="Sign here" />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-007</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
