"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Camera } from "lucide-react"

// ── Types ──
type YesNoNa = "yes" | "no" | "na" | undefined
type CncNa = "C" | "NC" | "NA" | undefined
type PassFailNa = "pass" | "fail" | "na" | undefined
type ServiceSize = "500hr" | "1000hr" | "1500hr" | "2000hr" | undefined

// ── Toggle: Yes / No / N/A ──
function Toggle({ value, onChange }: { value: YesNoNa; onChange: (v: YesNoNa) => void }) {
  const btn = (v: YesNoNa, label: string, color: string) => (
    <button onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v ? `${color} text-white border-transparent` : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}>{label}</button>
  )
  return <div className="flex gap-1 no-print">{btn("yes", "Yes", "bg-green-500")}{btn("no", "No", "bg-red-500")}{btn("na", "N/A", "bg-gray-400")}</div>
}

// ── CompliantToggle: Compliant / Non-Compliant / N/A ──
function CompliantToggle({ value, onChange }: { value: CncNa; onChange: (v: CncNa) => void }) {
  const btn = (v: CncNa, label: string, color: string) => (
    <button onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v ? `${color} text-white border-transparent` : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}>{label}</button>
  )
  return <div className="flex gap-1 no-print">{btn("C", "C", "bg-green-500")}{btn("NC", "NC", "bg-red-500")}{btn("NA", "N/A", "bg-gray-400")}</div>
}

// ── PassFailToggle: Pass / Fail / N/A ──
function PassFailToggle({ value, onChange }: { value: PassFailNa; onChange: (v: PassFailNa) => void }) {
  const btn = (v: PassFailNa, label: string, color: string) => (
    <button onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v ? `${color} text-white border-transparent` : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}>{label}</button>
  )
  return <div className="flex gap-1 no-print">{btn("pass", "Pass", "bg-green-500")}{btn("fail", "Fail", "bg-red-500")}{btn("na", "N/A", "bg-gray-400")}</div>
}

// ── Row with Yes/No/N/A toggle ──
function CheckRow({ label, value, onChange }: { label: string; value: YesNoNa; onChange: (v: YesNoNa) => void }) {
  return (
    <div className={`flex items-center justify-between p-2 rounded text-[11px] border ${
      value === "no" ? "border-red-200 bg-red-50" : value === "yes" ? "border-green-200 bg-green-50" : value === "na" ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"
    }`}>
      <span className={
        value === "no" ? "text-red-700" : value === "yes" ? "text-green-700" : value === "na" ? "text-gray-400" : "text-gray-700"
      }>{label}</span>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}

// ── Row with Yes/No/N/A toggle and an optional right-aligned extra field ──
function CheckRowWithExtra({ label, value, onChange, extra }: { label: string; value: YesNoNa; onChange: (v: YesNoNa) => void; extra?: React.ReactNode }) {
  return (
    <div className={`flex items-center justify-between p-2 rounded text-[11px] border ${
      value === "no" ? "border-red-200 bg-red-50" : value === "yes" ? "border-green-200 bg-green-50" : value === "na" ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"
    }`}>
      <span className={
        value === "no" ? "text-red-700" : value === "yes" ? "text-green-700" : value === "na" ? "text-gray-400" : "text-gray-700"
      }>{label}</span>
      <div className="flex items-center gap-2">
        {value === "yes" && extra}
        <Toggle value={value} onChange={onChange} />
      </div>
    </div>
  )
}

// ── Row with Compliant/Non-Compliant/N/A toggle ──
function CompliantRow({ label, value, onChange, extra }: { label: string; value: CncNa; onChange: (v: CncNa) => void; extra?: string }) {
  return (
    <div className={`flex items-center justify-between p-2 rounded text-[11px] border ${
      value === "NC" ? "border-red-200 bg-red-50" : value === "C" ? "border-green-200 bg-green-50" : value === "NA" ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"
    }`}>
      <span className={
        value === "NC" ? "text-red-700" : value === "C" ? "text-green-700" : value === "NA" ? "text-gray-400" : "text-gray-700"
      }>{label}{extra ? <span className="text-gray-400 ml-1">({extra})</span> : null}</span>
      <CompliantToggle value={value} onChange={onChange} />
    </div>
  )
}

// ── Row with Pass/Fail/N/A toggle ──
function PassFailRow({ label, value, onChange }: { label: string; value: PassFailNa; onChange: (v: PassFailNa) => void }) {
  return (
    <div className={`flex items-center justify-between p-2 rounded text-[11px] border ${
      value === "fail" ? "border-red-200 bg-red-50" : value === "pass" ? "border-green-200 bg-green-50" : value === "na" ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"
    }`}>
      <span className={
        value === "fail" ? "text-red-700" : value === "pass" ? "text-green-700" : value === "na" ? "text-gray-400" : "text-gray-700"
      }>{label}</span>
      <PassFailToggle value={value} onChange={onChange} />
    </div>
  )
}

// ── Photo input ──
function PhotoInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="text-[10px]">
      <label className="font-semibold text-gray-600 block mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-1 text-[10px] bg-gray-100 hover:bg-gray-200 rounded px-3 py-1.5 text-gray-600 border border-dashed border-gray-300">
          <Camera className="h-3.5 w-3.5" />
          <span>Take Photo</span>
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={e => {
            const file = e.target.files?.[0]
            if (file) onChange(URL.createObjectURL(file))
          }} />
        </label>
        {value && (
          <button onClick={() => onChange("")} className="text-red-500 hover:text-red-700 text-[10px]">Remove</button>
        )}
      </div>
      {value && (
        <div className="mt-1 relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="h-20 w-20 object-cover rounded border" />
        </div>
      )}
    </div>
  )
}

// ── Inline text field ──
function InlineField({ label, value, onChange, type, width, suffix, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; width?: string; suffix?: string; placeholder?: string
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-semibold text-gray-600 whitespace-nowrap">{label}:</span>
      <input type={type || "text"} value={value} onChange={e => onChange(e.target.value)}
        className={`border-b border-dashed border-gray-300 bg-transparent ${width || "w-28"} px-1 py-0.5 focus:outline-none focus:border-primary`}
        placeholder={placeholder} />
      {suffix && <span className="text-gray-400 text-[10px]">{suffix}</span>}
    </div>
  )
}

// ── Section heading ──
function SectionHeading({ title }: { title: string }) {
  return <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">{title}</h2>
}

// ── SubSection heading ──
function SubSectionHeading({ title }: { title: string }) {
  return <h3 className="font-semibold text-xs text-gray-500 mt-3 mb-2 uppercase tracking-wider">{title}</h3>
}

// ── Service Size Radio Buttons ──
function ServiceSizeRadio({ value, onChange }: { value: ServiceSize; onChange: (v: ServiceSize) => void }) {
  const sizes: ServiceSize[] = ["500hr", "1000hr", "1500hr", "2000hr"]
  return (
    <div className="flex gap-2 no-print">
      {sizes.map(s => (
        <button key={s} onClick={() => onChange(s)}
          className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
            value === s ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
          }`}>{s}</button>
      ))}
    </div>
  )
}

// ── Conditional inline text within a CheckRow ──
function SmallInlineField({ label, value, onChange, type, width, suffix, placeholder }: {
  label?: string; value: string; onChange: (v: string) => void; type?: string; width?: string; suffix?: string; placeholder?: string
}) {
  return (
    <div className="flex items-center gap-1">
      {label && <span className="font-semibold text-gray-500 text-[10px] whitespace-nowrap">{label}:</span>}
      <input type={type || "text"} value={value} onChange={e => onChange(e.target.value)}
        className={`border-b border-dashed border-gray-300 bg-transparent ${width || "w-16"} px-1 py-0.5 text-[10px] focus:outline-none focus:border-primary`}
        placeholder={placeholder} />
      {suffix && <span className="text-gray-400 text-[9px]">{suffix}</span>}
    </div>
  )
}

// ════════════════════════════════════════════════════════
// ── MAIN PAGE ──
// ════════════════════════════════════════════════════════
export default function FiveHundredHourServicePage() {
  // ── Title Page Info Fields ──
  const [siteConducted, setSiteConducted] = useState("")
  const [conductedOn, setConductedOn] = useState("")
  const [preparedBy, setPreparedBy] = useState("")
  const [assetId, setAssetId] = useState("")
  const [engineHours, setEngineHours] = useState("")
  const [serviceSize, setServiceSize] = useState<ServiceSize>("500hr")
  const [reviewedBy, setReviewedBy] = useState("")
  const [workOrderNo, setWorkOrderNo] = useState("")

  // ── Audit ──
  const [ppeWorn, setPpeWorn] = useState<CncNa>(undefined)
  const [fitForWork, setFitForWork] = useState<YesNoNa>(undefined)
  const [turnIsolatorsTest, setTurnIsolatorsTest] = useState<PassFailNa>(undefined)

  // ── Plant Details ──
  const [lastServiceHours, setLastServiceHours] = useState("")

  // ── Battery Charging System (all Yes/No) ──
  const [batteryTerminals, setBatteryTerminals] = useState<YesNoNa>(undefined)
  const [batteryVoltage, setBatteryVoltage] = useState<YesNoNa>(undefined)
  const [batteryVoltageValue, setBatteryVoltageValue] = useState("")
  const [batteryHoldDownClamps, setBatteryHoldDownClamps] = useState<YesNoNa>(undefined)

  // ── Engine and Alternator ──
  const [turnIsolatorsOff, setTurnIsolatorsOff] = useState<YesNoNa>(undefined)
  const [changeEngineOil, setChangeEngineOil] = useState<YesNoNa>(undefined)
  const [oilAmountUsed, setOilAmountUsed] = useState("")
  const [changeOilFilter, setChangeOilFilter] = useState<YesNoNa>(undefined)
  const [changeRemoteMountOilFilter, setChangeRemoteMountOilFilter] = useState<YesNoNa>(undefined)
  const [checkAirCleaner, setCheckAirCleaner] = useState<YesNoNa>(undefined)
  const [checkRadiatorCoolant, setCheckRadiatorCoolant] = useState<YesNoNa>(undefined)
  const [coolantUsed, setCoolantUsed] = useState("")
  const [checkFuelLevel, setCheckFuelLevel] = useState<YesNoNa>(undefined)
  const [fuelLevelPercent, setFuelLevelPercent] = useState("")
  const [coolantTempController, setCoolantTempController] = useState("")
  const [oilPressurePsi, setOilPressurePsi] = useState("")
  const [checkEngineBreather, setCheckEngineBreather] = useState<YesNoNa>(undefined)
  const [alternatorChargingVoltage, setAlternatorChargingVoltage] = useState("")
  const [checkEngineMounts, setCheckEngineMounts] = useState<YesNoNa>(undefined)
  const [checkLooseMountingBolts, setCheckLooseMountingBolts] = useState<YesNoNa>(undefined)
  const [inspectStarterMotor, setInspectStarterMotor] = useState<YesNoNa>(undefined)
  const [engineRpmNoLights, setEngineRpmNoLights] = useState("")
  const [engineRpmAllLights, setEngineRpmAllLights] = useState("")

  // ── Fuel System (all Y/N) ──
  const [fuelBreather, setFuelBreather] = useState<YesNoNa>(undefined)
  const [fuelLeaks, setFuelLeaks] = useState<YesNoNa>(undefined)
  const [fuelPumps, setFuelPumps] = useState<YesNoNa>(undefined)
  const [changeFuelFilters, setChangeFuelFilters] = useState<YesNoNa>(undefined)
  const [primeFuelSystem, setPrimeFuelSystem] = useState<YesNoNa>(undefined)

  // ── Cooling System (all Y/N) ──
  const [coolantLeaks, setCoolantLeaks] = useState<YesNoNa>(undefined)
  const [hosesClamps, setHosesClamps] = useState<YesNoNa>(undefined)
  const [waterPumpLeaks, setWaterPumpLeaks] = useState<YesNoNa>(undefined)
  const [fanDrivePulleyBelt, setFanDrivePulleyBelt] = useState<YesNoNa>(undefined)
  const [radiatorMounts, setRadiatorMounts] = useState<YesNoNa>(undefined)
  const [fanGuardSecurity, setFanGuardSecurity] = useState<YesNoNa>(undefined)
  const [radiatorCapSeal, setRadiatorCapSeal] = useState<YesNoNa>(undefined)
  const [cleanRadiatorCore, setCleanRadiatorCore] = useState<YesNoNa>(undefined)

  // ── Engine Exhaust System (all Y/N) ──
  const [exhaustGuardsShields, setExhaustGuardsShields] = useState<YesNoNa>(undefined)
  const [exhaustMounts, setExhaustMounts] = useState<YesNoNa>(undefined)
  const [exhaustLeaks, setExhaustLeaks] = useState<YesNoNa>(undefined)
  const [manifoldBolts, setManifoldBolts] = useState<YesNoNa>(undefined)

  // ── Coupling System (all Y/N) ──
  const [couplingNoiseVibration, setCouplingNoiseVibration] = useState<YesNoNa>(undefined)
  const [couplingOilLeaks, setCouplingOilLeaks] = useState<YesNoNa>(undefined)
  const [couplingLooseBolts, setCouplingLooseBolts] = useState<YesNoNa>(undefined)

  // ── Engine Protection Shutdown Alarms (Pass/Fail/N/A) ──
  const [shutdownLowOilPressure, setShutdownLowOilPressure] = useState<PassFailNa>(undefined)
  const [shutdownLowCoolant, setShutdownLowCoolant] = useState<PassFailNa>(undefined)
  const [shutdownHighCoolantTemp, setShutdownHighCoolantTemp] = useState<PassFailNa>(undefined)
  const [shutdownEStop, setShutdownEStop] = useState<PassFailNa>(undefined)
  const [shutdownLowHighVoltage, setShutdownLowHighVoltage] = useState<PassFailNa>(undefined)
  const [shutdownOverUnderSpeed, setShutdownOverUnderSpeed] = useState<PassFailNa>(undefined)
  const [shutdownFuelSolenoid, setShutdownFuelSolenoid] = useState<PassFailNa>(undefined)

  // ── Lights (all Y/N) ──
  const [individualLeds, setIndividualLeds] = useState<YesNoNa>(undefined)
  const [flickeringStrobing, setFlickeringStrobing] = useState<YesNoNa>(undefined)
  const [lightMountBolts, setLightMountBolts] = useState<YesNoNa>(undefined)
  const [junctionBoxConnections, setJunctionBoxConnections] = useState<YesNoNa>(undefined)

  // ── Control Panel (all Y/N) ──
  const [controlPanelIngress, setControlPanelIngress] = useState<YesNoNa>(undefined)

  // ── General (all Y/N) ──
  const [generalCleanliness, setGeneralCleanliness] = useState<YesNoNa>(undefined)
  const [cleanDripTrays, setCleanDripTrays] = useState<YesNoNa>(undefined)
  const [removeRagsDebris, setRemoveRagsDebris] = useState<YesNoNa>(undefined)
  const [hosesCablesSecured, setHosesCablesSecured] = useState<YesNoNa>(undefined)
  const [tyresWear, setTyresWear] = useState<YesNoNa>(undefined)
  const [wheelStudsSecure, setWheelStudsSecure] = useState<YesNoNa>(undefined)
  const [wheelNutIndicators, setWheelNutIndicators] = useState<YesNoNa>(undefined)
  const [suspensionIntegrity, setSuspensionIntegrity] = useState<YesNoNa>(undefined)
  const [uBoltsTension, setUBoltsTension] = useState<YesNoNa>(undefined)
  const [brakePadsWear, setBrakePadsWear] = useState<YesNoNa>(undefined)
  const [handBrakeAdj, setHandBrakeAdj] = useState<YesNoNa>(undefined)
  const [towChainsHooks, setTowChainsHooks] = useState<YesNoNa>(undefined)
  const [jockeyWheel, setJockeyWheel] = useState<YesNoNa>(undefined)
  const [wheelChocksFitted, setWheelChocksFitted] = useState<YesNoNa>(undefined)
  const [aFrameBolts, setAFrameBolts] = useState<YesNoNa>(undefined)
  const [mainBoomPivot, setMainBoomPivot] = useState<YesNoNa>(undefined)
  const [pivotPinsGrease, setPivotPinsGrease] = useState<YesNoNa>(undefined)

  // ── Fire Extinguisher ──
  const [fireExtStampedMonthPhoto, setFireExtStampedMonthPhoto] = useState("")
  const [fireExtFittedCharged, setFireExtFittedCharged] = useState<YesNoNa>(undefined)
  const [fireExtStampedMonth, setFireExtStampedMonth] = useState("")
  const [fireExtCompliance, setFireExtCompliance] = useState<YesNoNa>(undefined)
  const [fireExtComplianceDate, setFireExtComplianceDate] = useState("")

  // ── Generator (all Y/N, some text) ──
  const [genTerminalConnections, setGenTerminalConnections] = useState<YesNoNa>(undefined)
  const [genVoltageAdjustAvr, setGenVoltageAdjustAvr] = useState<YesNoNa>(undefined)
  const [genMainVoltage, setGenMainVoltage] = useState("")
  const [genMountingBolts, setGenMountingBolts] = useState<YesNoNa>(undefined)
  const [genAirVents, setGenAirVents] = useState<YesNoNa>(undefined)
  const [genBlowOut, setGenBlowOut] = useState<YesNoNa>(undefined)

  // ── Wheel Hub ──
  const [hubRemoveWheels, setHubRemoveWheels] = useState<YesNoNa>(undefined)
  const [hubCleanMud, setHubCleanMud] = useState<YesNoNa>(undefined)
  const [hubUBoltsTension, setHubUBoltsTension] = useState<YesNoNa>(undefined)
  const [hubSuspensionIntegrity, setHubSuspensionIntegrity] = useState<YesNoNa>(undefined)
  const [hubVisualInspect, setHubVisualInspect] = useState<YesNoNa>(undefined)
  const [hubPhotos, setHubPhotos] = useState("")
  const [hubCheckBrakeShoes, setHubCheckBrakeShoes] = useState<YesNoNa>(undefined)
  const [hubAdjustBrakes, setHubAdjustBrakes] = useState<YesNoNa>(undefined)
  const [hubReplaceWheel, setHubReplaceWheel] = useState<YesNoNa>(undefined)
  const [hubTorqueWheel, setHubTorqueWheel] = useState<YesNoNa>(undefined)

  // ── Gearbox ──
  const [gbMountBolts, setGbMountBolts] = useState<YesNoNa>(undefined)
  const [gbCracksDamage, setGbCracksDamage] = useState<YesNoNa>(undefined)
  const [gbGrease, setGbGrease] = useState<YesNoNa>(undefined)
  const [gbTightenAllenBolts, setGbTightenAllenBolts] = useState<YesNoNa>(undefined)
  const [gbRaiseMastProx, setGbRaiseMastProx] = useState<YesNoNa>(undefined)
  const [gbTiltHeadProx, setGbTiltHeadProx] = useState<YesNoNa>(undefined)

  // ── Comments & Machine Hours ──
  const [comments, setComments] = useState("")
  const [machineHoursOver20k, setMachineHoursOver20k] = useState<YesNoNa>(undefined)
  const [gearboxChangedBefore, setGearboxChangedBefore] = useState<YesNoNa>(undefined)

  // ── Damage Details ──
  const [damagePhotos, setDamagePhotos] = useState("")
  const [allAroundPhotos, setAllAroundPhotos] = useState("")

  // ── Filters, Parts and Consumables Used ──
  const [filterKit500hr, setFilterKit500hr] = useState<YesNoNa>(undefined)
  const [filterKit500hrPhoto, setFilterKit500hrPhoto] = useState("")
  const [filterKit1000hr, setFilterKit1000hr] = useState<YesNoNa>(undefined)
  const [filterKit1000hrPhoto, setFilterKit1000hrPhoto] = useState("")
  const [filterKit2000hr, setFilterKit2000hr] = useState<YesNoNa>(undefined)
  const [filterKit2000hrPhoto, setFilterKit2000hrPhoto] = useState("")
  const [filterOil, setFilterOil] = useState<YesNoNa>(undefined)
  const [filterOilPhoto, setFilterOilPhoto] = useState("")
  const [filterExternalOil, setFilterExternalOil] = useState<YesNoNa>(undefined)
  const [filterExternalOilPhoto, setFilterExternalOilPhoto] = useState("")
  const [filterFuel, setFilterFuel] = useState<YesNoNa>(undefined)
  const [filterFuelPhoto, setFilterFuelPhoto] = useState("")
  const [filterAir, setFilterAir] = useState<YesNoNa>(undefined)
  const [filterAirPhoto, setFilterAirPhoto] = useState("")
  const [filterReturn10Micron, setFilterReturn10Micron] = useState<YesNoNa>(undefined)
  const [filterReturn10MicronPhoto, setFilterReturn10MicronPhoto] = useState("")
  const [fuelTankBreather, setFuelTankBreather] = useState<YesNoNa>(undefined)
  const [fuelTankBreatherPhoto, setFuelTankBreatherPhoto] = useState("")

  // ── Sign Off ──
  const [mickalaRepName, setMickalaRepName] = useState("")
  const [mickalaRepSignature, setMickalaRepSignature] = useState("")
  const [mickalaRepDate, setMickalaRepDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [clientRepName, setClientRepName] = useState("")
  const [clientRepSignature, setClientRepSignature] = useState("")
  const [clientRepDate, setClientRepDate] = useState("")

  // ── Conditional Filter Part Row ──
  function FilterPartRow({ label, partNo, value, photoValue, onValueChange, onPhotoChange }: {
    label: string; partNo: string; value: YesNoNa; photoValue: string;
    onValueChange: (v: YesNoNa) => void; onPhotoChange: (v: string) => void
  }) {
    return (
      <div className="border-b border-gray-100 pb-2 mb-2 last:border-b-0 last:mb-0 last:pb-0">
        <CheckRowWithExtra
          label={`${label} (${partNo})`}
          value={value}
          onChange={onValueChange}
          extra={value === "yes" ? (
            <div className="flex items-center gap-1">
              <PhotoInput label="" value={photoValue} onChange={onPhotoChange} />
            </div>
          ) : undefined}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 print:p-2">
        {/* ── Toolbar ── */}
        <div className="flex justify-between items-start mb-4 no-print">
          <Link href="/operations" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Operations
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" />
            <div className="mt-1">
              <span className="text-xl font-extrabold">MICKALA</span>
              <span className="text-xl font-extrabold text-primary ml-1">GROUP</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-500">
            <div>MM-OPS-TP-011</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">500 Hour LED Lighting Plant Service Report</h1>
        <p className="text-xs text-gray-500 mb-3">LED Lighting Plant Service &amp; Maintenance Checklist</p>

        {/* ── Info Bar ── */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          <InlineField label="Site conducted" value={siteConducted} onChange={setSiteConducted} width="w-36" />
          <InlineField label="Conducted on" value={conductedOn} onChange={setConductedOn} width="w-32" type="date" />
          <InlineField label="Prepared by" value={preparedBy} onChange={setPreparedBy} width="w-36" />
          <InlineField label="Asset ID" value={assetId} onChange={setAssetId} width="w-32" />
          <InlineField label="Engine Hours" value={engineHours} onChange={setEngineHours} width="w-24" type="number" suffix="hrs" />
        </div>

        {/* ── Service Size + Reviewed By + Work Order ── */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Service Information" />
          <div className="flex flex-wrap items-center gap-4 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-600">Service Size:</span>
              <ServiceSizeRadio value={serviceSize} onChange={setServiceSize} />
              <span className="text-gray-400 ml-1 print-only">{serviceSize}</span>
            </div>
            <InlineField label="Reviewed by" value={reviewedBy} onChange={setReviewedBy} width="w-36" />
            <InlineField label="Work Order / Job Cost No" value={workOrderNo} onChange={setWorkOrderNo} width="w-36" />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── AUDIT ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Audit" />
          <div className="space-y-2">
            <CompliantRow label="PPE Worn" value={ppeWorn} onChange={setPpeWorn} />
            <CheckRow label="Fit for Work?" value={fitForWork} onChange={setFitForWork} />
            <PassFailRow label="Turn Isolators Off and Test" value={turnIsolatorsTest} onChange={setTurnIsolatorsTest} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── PLANT DETAILS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Plant Details" />
          <div className="flex flex-wrap gap-2 text-[10px]">
            <InlineField label="Last Service Hours" value={lastServiceHours} onChange={setLastServiceHours} width="w-24" type="number" suffix="hrs" />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── BATTERY CHARGING SYSTEM ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Battery Charging System" />
          <div className="space-y-2">
            <CheckRow label="Check terminals for tightness and corrosion" value={batteryTerminals} onChange={setBatteryTerminals} />
            <CheckRowWithExtra
              label="Check battery voltage"
              value={batteryVoltage}
              onChange={setBatteryVoltage}
              extra={batteryVoltage === "yes" && (
                <SmallInlineField value={batteryVoltageValue} onChange={setBatteryVoltageValue} width="w-14" suffix="V" placeholder="volts" />
              )}
            />
            <CheckRow label="Check security of battery hold down clamps" value={batteryHoldDownClamps} onChange={setBatteryHoldDownClamps} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── ENGINE AND ALTERNATOR ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Engine and Alternator" />
          <div className="space-y-2">
            <CheckRow label="Turn isolators to off position" value={turnIsolatorsOff} onChange={setTurnIsolatorsOff} />
            <CheckRowWithExtra
              label="Change engine oil"
              value={changeEngineOil}
              onChange={setChangeEngineOil}
              extra={changeEngineOil === "yes" && (
                <SmallInlineField label="Amount used" value={oilAmountUsed} onChange={setOilAmountUsed} width="w-16" suffix="L" placeholder="litres" />
              )}
            />
            <CheckRow label="Change engine oil filter" value={changeOilFilter} onChange={setChangeOilFilter} />
            <CheckRow label="Change remote mount oil filter at 1000hrs" value={changeRemoteMountOilFilter} onChange={setChangeRemoteMountOilFilter} />
            <CheckRow label="Check air cleaner elements and replace" value={checkAirCleaner} onChange={setCheckAirCleaner} />
            <CheckRowWithExtra
              label="Check radiator coolant level and top up"
              value={checkRadiatorCoolant}
              onChange={setCheckRadiatorCoolant}
              extra={checkRadiatorCoolant === "yes" && (
                <SmallInlineField label="Coolant used" value={coolantUsed} onChange={setCoolantUsed} width="w-16" suffix="L" placeholder="litres" />
              )}
            />
            <CheckRowWithExtra
              label="Check and record fuel level"
              value={checkFuelLevel}
              onChange={setCheckFuelLevel}
              extra={checkFuelLevel === "yes" && (
                <SmallInlineField value={fuelLevelPercent} onChange={setFuelLevelPercent} width="w-14" suffix="%" placeholder="%" />
              )}
            />
            <div className="flex flex-wrap gap-3 mt-2 text-[10px]">
              <SmallInlineField label="Coolant Temp (Controller)" value={coolantTempController} onChange={setCoolantTempController} width="w-16" suffix="°C" placeholder="temp" />
              <SmallInlineField label="Oil Pressure" value={oilPressurePsi} onChange={setOilPressurePsi} width="w-16" suffix="PSI" placeholder="psi" />
              <SmallInlineField label="Alt Charging Voltage" value={alternatorChargingVoltage} onChange={setAlternatorChargingVoltage} width="w-16" suffix="V" placeholder="volts" />
              <SmallInlineField label="RPM (No Lights)" value={engineRpmNoLights} onChange={setEngineRpmNoLights} width="w-16" suffix="rpm" placeholder="rpm" />
              <SmallInlineField label="RPM (All Lights)" value={engineRpmAllLights} onChange={setEngineRpmAllLights} width="w-16" suffix="rpm" placeholder="rpm" />
            </div>
            <CheckRow label="Check and clean engine breather" value={checkEngineBreather} onChange={setCheckEngineBreather} />
            <CheckRow label="Check engine mounts" value={checkEngineMounts} onChange={setCheckEngineMounts} />
            <CheckRow label="Check loose mounting bolts" value={checkLooseMountingBolts} onChange={setCheckLooseMountingBolts} />
            <CheckRow label="Visually inspect starter motor" value={inspectStarterMotor} onChange={setInspectStarterMotor} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── FUEL SYSTEM ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Fuel System" />
          <div className="space-y-2">
            <CheckRow label="Check/replace fuel breather (2000hr only)" value={fuelBreather} onChange={setFuelBreather} />
            <CheckRow label="Check for fuel leaks" value={fuelLeaks} onChange={setFuelLeaks} />
            <CheckRow label="Check fuel 12V pump and lift pump" value={fuelPumps} onChange={setFuelPumps} />
            <CheckRow label="Change fuel filters - primary and secondary" value={changeFuelFilters} onChange={setChangeFuelFilters} />
            <CheckRow label="Prime fuel system" value={primeFuelSystem} onChange={setPrimeFuelSystem} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── COOLING SYSTEM ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Cooling System" />
          <div className="space-y-2">
            <CheckRow label="Check coolant leaks" value={coolantLeaks} onChange={setCoolantLeaks} />
            <CheckRow label="Check condition of hoses and clamps" value={hosesClamps} onChange={setHosesClamps} />
            <CheckRow label="Check water pump for leaks" value={waterPumpLeaks} onChange={setWaterPumpLeaks} />
            <CheckRow label="Check fan drive pulley and belt" value={fanDrivePulleyBelt} onChange={setFanDrivePulleyBelt} />
            <CheckRow label="Check radiator mounts condition" value={radiatorMounts} onChange={setRadiatorMounts} />
            <CheckRow label="Check fan guard security" value={fanGuardSecurity} onChange={setFanGuardSecurity} />
            <CheckRow label="Check radiator cap seal and function" value={radiatorCapSeal} onChange={setRadiatorCapSeal} />
            <CheckRow label="Clean radiator core with low pressure hose" value={cleanRadiatorCore} onChange={setCleanRadiatorCore} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── ENGINE EXHAUST SYSTEM ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Engine Exhaust System" />
          <div className="space-y-2">
            <CheckRow label="Check exhaust guards/shield" value={exhaustGuardsShields} onChange={setExhaustGuardsShields} />
            <CheckRow label="Check all mounts" value={exhaustMounts} onChange={setExhaustMounts} />
            <CheckRow label="Check exhaust for leaks" value={exhaustLeaks} onChange={setExhaustLeaks} />
            <CheckRow label="Check manifold bolts" value={manifoldBolts} onChange={setManifoldBolts} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── COUPLING SYSTEM ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Coupling System" />
          <div className="space-y-2">
            <CheckRow label="Check for noise/vibration changes" value={couplingNoiseVibration} onChange={setCouplingNoiseVibration} />
            <CheckRow label="Check oil leaks at shaft seals" value={couplingOilLeaks} onChange={setCouplingOilLeaks} />
            <CheckRow label="Check for loose bolts/nuts/guards" value={couplingLooseBolts} onChange={setCouplingLooseBolts} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── ENGINE PROTECTION SHUTDOWN ALARMS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Engine Protection Shutdown Alarms" />
          <div className="space-y-2">
            <PassFailRow label="Low oil pressure" value={shutdownLowOilPressure} onChange={setShutdownLowOilPressure} />
            <PassFailRow label="Low coolant level" value={shutdownLowCoolant} onChange={setShutdownLowCoolant} />
            <PassFailRow label="High coolant temperature" value={shutdownHighCoolantTemp} onChange={setShutdownHighCoolantTemp} />
            <PassFailRow label="E-stops shut down engine" value={shutdownEStop} onChange={setShutdownEStop} />
            <PassFailRow label="Low/high voltage shutdown" value={shutdownLowHighVoltage} onChange={setShutdownLowHighVoltage} />
            <PassFailRow label="Engine over/under speed shutdown" value={shutdownOverUnderSpeed} onChange={setShutdownOverUnderSpeed} />
            <PassFailRow label="Fuel shut down solenoid function" value={shutdownFuelSolenoid} onChange={setShutdownFuelSolenoid} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── LIGHTS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Lights" />
          <div className="space-y-2">
            <CheckRow label="Check individual LEDs working" value={individualLeds} onChange={setIndividualLeds} />
            <CheckRow label="Check lights not flickering/strobing" value={flickeringStrobing} onChange={setFlickeringStrobing} />
            <CheckRow label="Check all mount bolts" value={lightMountBolts} onChange={setLightMountBolts} />
            <CheckRow label="Check connections in junction box and back of each light" value={junctionBoxConnections} onChange={setJunctionBoxConnections} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── CONTROL PANEL ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Control Panel" />
          <div className="space-y-2">
            <CheckRow label="Visually inspect for ingress of dirt/water" value={controlPanelIngress} onChange={setControlPanelIngress} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── GENERAL ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="General" />
          <div className="space-y-2">
            <CheckRow label="Check cleanliness" value={generalCleanliness} onChange={setGeneralCleanliness} />
            <CheckRow label="Clean drip trays" value={cleanDripTrays} onChange={setCleanDripTrays} />
            <CheckRow label="Remove rags and debris" value={removeRagsDebris} onChange={setRemoveRagsDebris} />
            <CheckRow label="Hoses and cables secured" value={hosesCablesSecured} onChange={setHosesCablesSecured} />
            <CheckRow label="Check tyres for wear" value={tyresWear} onChange={setTyresWear} />
            <CheckRow label="Wheel studs secure" value={wheelStudsSecure} onChange={setWheelStudsSecure} />
            <CheckRow label="Wheel nut indicators fitted" value={wheelNutIndicators} onChange={setWheelNutIndicators} />
            <CheckRow label="Check suspension integrity" value={suspensionIntegrity} onChange={setSuspensionIntegrity} />
            <CheckRow label="Check U bolts tension" value={uBoltsTension} onChange={setUBoltsTension} />
            <CheckRow label="Check brake pads wear" value={brakePadsWear} onChange={setBrakePadsWear} />
            <CheckRow label="Hand brake adjustment and cable" value={handBrakeAdj} onChange={setHandBrakeAdj} />
            <CheckRow label="Tow chains and hooks security" value={towChainsHooks} onChange={setTowChainsHooks} />
            <CheckRow label="Jockey wheel function" value={jockeyWheel} onChange={setJockeyWheel} />
            <CheckRow label="Wheel chocks fitted" value={wheelChocksFitted} onChange={setWheelChocksFitted} />
            <CheckRow label="A frame mount bolts tight" value={aFrameBolts} onChange={setAFrameBolts} />
            <CheckRow label="Main boom pivot point" value={mainBoomPivot} onChange={setMainBoomPivot} />
            <CheckRow label="All pivot pins grease/lock plates" value={pivotPinsGrease} onChange={setPivotPinsGrease} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── FIRE EXTINGUISHER ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Fire Extinguisher" />
          <div className="space-y-3">
            <PhotoInput label="Stamped Month Photo" value={fireExtStampedMonthPhoto} onChange={setFireExtStampedMonthPhoto} />
            <CheckRowWithExtra
              label="Fitted, charged, in test date"
              value={fireExtFittedCharged}
              onChange={setFireExtFittedCharged}
              extra={fireExtFittedCharged === "yes" && (
                <SmallInlineField value={fireExtStampedMonth} onChange={setFireExtStampedMonth} width="w-16" placeholder="MM/YY" />
              )}
            />
            <CheckRowWithExtra
              label="Compliance paperwork check"
              value={fireExtCompliance}
              onChange={setFireExtCompliance}
              extra={fireExtCompliance === "yes" && (
                <SmallInlineField value={fireExtComplianceDate} onChange={setFireExtComplianceDate} width="w-20" placeholder="compliance date" />
              )}
            />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── GENERATOR ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Generator" />
          <div className="space-y-2">
            <CheckRow label="Check terminal connections" value={genTerminalConnections} onChange={setGenTerminalConnections} />
            <CheckRow label="Check voltage output and adjust AVR" value={genVoltageAdjustAvr} onChange={setGenVoltageAdjustAvr} />
            <div className="flex items-center gap-2 text-[10px] ml-1">
              <SmallInlineField label="Main Generator Voltage" value={genMainVoltage} onChange={setGenMainVoltage} width="w-16" suffix="V" placeholder="volts" />
            </div>
            <CheckRow label="Check mounting bolts" value={genMountingBolts} onChange={setGenMountingBolts} />
            <CheckRow label="Check air vents" value={genAirVents} onChange={setGenAirVents} />
            <CheckRow label="Blow out with compressed air" value={genBlowOut} onChange={setGenBlowOut} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── WHEEL HUB ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Wheel Hub" />
          <div className="space-y-2">
            <CheckRow label="Remove wheels" value={hubRemoveWheels} onChange={setHubRemoveWheels} />
            <CheckRow label="Clean mud from hub" value={hubCleanMud} onChange={setHubCleanMud} />
            <CheckRow label="Check U bolts tension" value={hubUBoltsTension} onChange={setHubUBoltsTension} />
            <CheckRow label="Check suspension integrity" value={hubSuspensionIntegrity} onChange={setHubSuspensionIntegrity} />
            <CheckRowWithExtra
              label="Visually inspect hub"
              value={hubVisualInspect}
              onChange={setHubVisualInspect}
              extra={hubVisualInspect === "yes" && (
                <div className="flex items-center gap-2">
                  <PhotoInput label="" value={hubPhotos} onChange={setHubPhotos} />
                  <CheckRow label="Check brake shoes" value={hubCheckBrakeShoes} onChange={setHubCheckBrakeShoes} />
                </div>
              )}
            />
            <CheckRow label="Adjust brakes" value={hubAdjustBrakes} onChange={setHubAdjustBrakes} />
            <CheckRow label="Replace wheel" value={hubReplaceWheel} onChange={setHubReplaceWheel} />
            <CheckRow label="Torque wheel (100 FT-LB / 135 Nm)" value={hubTorqueWheel} onChange={setHubTorqueWheel} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── GEARBOX ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Gearbox" />
          <div className="space-y-2">
            <CheckRow label="Inspect gearbox mount bolts" value={gbMountBolts} onChange={setGbMountBolts} />
            <CheckRow label="Visually inspect for cracks/damage" value={gbCracksDamage} onChange={setGbCracksDamage} />
            <CheckRow label="Grease gearbox" value={gbGrease} onChange={setGbGrease} />
            <CheckRow label="Tighten all gearbox mount bolts M8 Allen" value={gbTightenAllenBolts} onChange={setGbTightenAllenBolts} />
            <CheckRow label="Raise mast check proximity switches" value={gbRaiseMastProx} onChange={setGbRaiseMastProx} />
            <CheckRow label="Tilt light head check proximity switches" value={gbTiltHeadProx} onChange={setGbTiltHeadProx} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── COMMENTS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Comments" />
          <textarea value={comments} onChange={e => setComments(e.target.value)}
            className="w-full border border-gray-200 rounded p-2 text-xs min-h-[80px] focus:outline-none focus:border-primary bg-white"
            placeholder="Enter any additional comments or notes..." />
          <div className="mt-3 space-y-2">
            <CheckRowWithExtra
              label="Machine hours over 20,000?"
              value={machineHoursOver20k}
              onChange={setMachineHoursOver20k}
              extra={machineHoursOver20k === "yes" && (
                <div className="flex items-center gap-2">
                  <CheckRow label="Gearbox changed before?" value={gearboxChangedBefore} onChange={setGearboxChangedBefore} />
                </div>
              )}
            />
            {machineHoursOver20k === "yes" && gearboxChangedBefore === "no" && (
              <div className="ml-6 p-3 bg-yellow-50 border border-yellow-200 rounded text-[10px] text-yellow-800">
                <span className="font-semibold">ⓘ NOTIFY SUPERVISOR:</span> Gearbox has not been changed in 20,000+ hours
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── DAMAGE DETAILS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Damage Details" />
          <div className="space-y-3">
            <PhotoInput label="Take clear pictures of damages" value={damagePhotos} onChange={setDamagePhotos} />
            <PhotoInput label="Take pictures all around (min 6 pics)" value={allAroundPhotos} onChange={setAllAroundPhotos} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── FILTERS, PARTS AND CONSUMABLES USED ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Filters, Parts and Consumables Used" />
          <p className="text-[9px] text-gray-400 mb-2">If Yes, attach evidence photo</p>
          <div className="space-y-1">
            <FilterPartRow label="KIT 500 HOUR SERVICE" partNo="O00037A" value={filterKit500hr} photoValue={filterKit500hrPhoto} onValueChange={setFilterKit500hr} onPhotoChange={setFilterKit500hrPhoto} />
            <FilterPartRow label="KIT 1000 HOUR SERVICE" partNo="O00037B" value={filterKit1000hr} photoValue={filterKit1000hrPhoto} onValueChange={setFilterKit1000hr} onPhotoChange={setFilterKit1000hrPhoto} />
            <FilterPartRow label="KIT 2000 HOUR SERVICE" partNo="O00037C" value={filterKit2000hr} photoValue={filterKit2000hrPhoto} onValueChange={setFilterKit2000hr} onPhotoChange={setFilterKit2000hrPhoto} />
            <FilterPartRow label="FILTER OIL" partNo="M00132" value={filterOil} photoValue={filterOilPhoto} onValueChange={setFilterOil} onPhotoChange={setFilterOilPhoto} />
            <FilterPartRow label="FILTER EXTERNAL OIL" partNo="M00162" value={filterExternalOil} photoValue={filterExternalOilPhoto} onValueChange={setFilterExternalOil} onPhotoChange={setFilterExternalOilPhoto} />
            <FilterPartRow label="FILTER FUEL" partNo="M00129" value={filterFuel} photoValue={filterFuelPhoto} onValueChange={setFilterFuel} onPhotoChange={setFilterFuelPhoto} />
            <FilterPartRow label="FILTER AIR" partNo="M00165" value={filterAir} photoValue={filterAirPhoto} onValueChange={setFilterAir} onPhotoChange={setFilterAirPhoto} />
            <FilterPartRow label="FILTER RETURN 10 MICRON" partNo="H00034" value={filterReturn10Micron} photoValue={filterReturn10MicronPhoto} onValueChange={setFilterReturn10Micron} onPhotoChange={setFilterReturn10MicronPhoto} />
            <FilterPartRow label="FUEL TANK BREATHER" partNo="M00102" value={fuelTankBreather} photoValue={fuelTankBreatherPhoto} onValueChange={setFuelTankBreather} onPhotoChange={setFuelTankBreatherPhoto} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── SIGN OFF ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="border rounded-lg p-4 mb-4 text-xs">
          <SectionHeading title="Sign Off" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Mickala Rep */}
            <div>
              <h3 className="font-semibold text-gray-700 text-[11px] mb-2 uppercase">Mickala Representative</h3>
              <div className="space-y-2">
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600 text-[10px]">Name</label>
                  <input type="text" value={mickalaRepName} onChange={e => setMickalaRepName(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600 text-[10px]">Signature</label>
                  <input type="text" value={mickalaRepSignature} onChange={e => setMickalaRepSignature(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                    placeholder="Sign here" />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600 text-[10px]">Date</label>
                  <input type="text" value={mickalaRepDate} onChange={e => setMickalaRepDate(e.target.value || new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
            {/* Client Rep */}
            <div>
              <h3 className="font-semibold text-gray-700 text-[11px] mb-2 uppercase">Client Representative</h3>
              <div className="space-y-2">
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600 text-[10px]">Name</label>
                  <input type="text" value={clientRepName} onChange={e => setClientRepName(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600 text-[10px]">Signature</label>
                  <input type="text" value={clientRepSignature} onChange={e => setClientRepSignature(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                    placeholder="Sign here" />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600 text-[10px]">Date</label>
                  <input type="text" value={clientRepDate} onChange={e => setClientRepDate(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-011</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
