"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Camera } from "lucide-react"

// ── Types ──
type YesNoNa = "yes" | "no" | "na" | undefined
type CncNa = "C" | "NC" | "NA" | undefined

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
function InlineField({ label, value, onChange, type, width, suffix }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; width?: string; suffix?: string
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-semibold text-gray-600 whitespace-nowrap">{label}:</span>
      <input type={type || "text"} value={value} onChange={e => onChange(e.target.value)}
        className={`border-b border-dashed border-gray-300 bg-transparent ${width || "w-28"} px-1 py-0.5 focus:outline-none focus:border-primary`} />
      {suffix && <span className="text-gray-400 text-[10px]">{suffix}</span>}
    </div>
  )
}

// ── Section heading ──
function SectionHeading({ title }: { title: string }) {
  return <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">{title}</h2>
}

// ── Main Page ──
export default function VehicleInspectionPage() {
  // ── Title Page Info Fields ──
  const [siteConducted, setSiteConducted] = useState("")
  const [conductedOn, setConductedOn] = useState("")
  const [preparedBy, setPreparedBy] = useState("")
  const [selectAsset, setSelectAsset] = useState("")
  const [odometer, setOdometer] = useState("")

  // ── Vehicle Details ──
  const [registrationNo, setRegistrationNo] = useState("")
  const [vehicleMake, setVehicleMake] = useState("")
  const [serviceDueKms, setServiceDueKms] = useState("")

  // ── Cleanliness ──
  const [cleanTidy, setCleanTidy] = useState<YesNoNa>(undefined)
  const [cleanPhoto, setCleanPhoto] = useState("")

  // ── Retorque Wheel Nuts (First Day of Swing) ──
  const [retorquePhoto, setRetorquePhoto] = useState("")

  // ── Tyres (C/NC/N/A) ──
  const [tyresRetorqued, setTyresRetorqued] = useState<CncNa>(undefined)
  const [nutIndicators, setNutIndicators] = useState<CncNa>(undefined)
  const [tread, setTread] = useState<CncNa>(undefined)
  const [treadPhoto, setTreadPhoto] = useState("")
  const [mudFlaps, setMudFlaps] = useState<CncNa>(undefined)
  const [spareTyre, setSpareTyre] = useState<CncNa>(undefined)
  const [wheelStuds, setWheelStuds] = useState<CncNa>(undefined)

  // ── Exterior (C/NC/N/A) ──
  const [numberPlates, setNumberPlates] = useState<CncNa>(undefined)
  const [towBar, setTowBar] = useState<CncNa>(undefined)
  const [flag, setFlag] = useState<CncNa>(undefined)
  const [fireExtinguisher, setFireExtinguisher] = useState<CncNa>(undefined)
  const [fireExtEvidence, setFireExtEvidence] = useState("")
  const [fireExtStampedDate, setFireExtStampedDate] = useState("")
  const [fireExtExpiryDate, setFireExtExpiryDate] = useState("")
  const [bullBar, setBullBar] = useState<CncNa>(undefined)
  const [lights, setLights] = useState<CncNa>(undefined)
  const [reverseAlarm, setReverseAlarm] = useState<CncNa>(undefined)
  const [turnSignals, setTurnSignals] = useState<CncNa>(undefined)
  const [wheelChocks, setWheelChocks] = useState<CncNa>(undefined)
  const [flashingLight, setFlashingLight] = useState<CncNa>(undefined)
  const [stickersDecals, setStickersDecals] = useState<CncNa>(undefined)
  const [windscreen, setWindscreen] = useState<CncNa>(undefined)
  const [wipers, setWipers] = useState<CncNa>(undefined)
  const [generalCondition, setGeneralCondition] = useState<CncNa>(undefined)

  // ── Under Bonnet (C/NC/N/A) ──
  const [batteryIsolator, setBatteryIsolator] = useState<CncNa>(undefined)
  const [bonnetGeneral, setBonnetGeneral] = useState<CncNa>(undefined)

  // ── Interior ──
  // Yes/No/N/A items
  const [seatCovers, setSeatCovers] = useState<YesNoNa>(undefined)
  const [fuelCardPin, setFuelCardPin] = useState<YesNoNa>(undefined)
  const [mats, setMats] = useState<YesNoNa>(undefined)
  const [vehicleJack, setVehicleJack] = useState<YesNoNa>(undefined)
  const [interiorGeneral, setInteriorGeneral] = useState<YesNoNa>(undefined)
  const [triangles, setTriangles] = useState<YesNoNa>(undefined)
  const [inspectionBookUpdated, setInspectionBookUpdated] = useState<YesNoNa>(undefined)
  const [uhfRadio, setUhfRadio] = useState<YesNoNa>(undefined)
  const [mineRadio, setMineRadio] = useState<YesNoNa>(undefined)
  // C/NC/N/A items
  const [seatBelts, setSeatBelts] = useState<CncNa>(undefined)
  const [firstAidKit, setFirstAidKit] = useState<CncNa>(undefined)
  const [firstAidExpiry, setFirstAidExpiry] = useState("")
  const [horn, setHorn] = useState<CncNa>(undefined)
  const [fuelLevel, setFuelLevel] = useState<CncNa>(undefined)
  const [gauges, setGauges] = useState<CncNa>(undefined)
  const [glass, setGlass] = useState<CncNa>(undefined)
  const [heaterDefroster, setHeaterDefroster] = useState<CncNa>(undefined)
  const [interiorLights, setInteriorLights] = useState<CncNa>(undefined)
  const [beacon, setBeacon] = useState<CncNa>(undefined)
  const [oilLevel, setOilLevel] = useState<CncNa>(undefined)
  const [steering, setSteering] = useState<CncNa>(undefined)

  // ── Body (C/NC/N/A) ──
  const [body, setBody] = useState<CncNa>(undefined)
  const [bodyDamagePhoto, setBodyDamagePhoto] = useState("")
  const [doors, setDoors] = useState<CncNa>(undefined)
  const [backupLights, setBackupLights] = useState<CncNa>(undefined)
  const [spillKit, setSpillKit] = useState<CncNa>(undefined)

  // ── Comments ──
  const [comments, setComments] = useState("")

  // ── Completion ──
  const [driverName, setDriverName] = useState("")
  const [driverSignature, setDriverSignature] = useState("")
  const [completionDate, setCompletionDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))

  // ── Summary counts ──
  const allYesNoNa: YesNoNa[] = [
    cleanTidy, seatCovers, fuelCardPin, mats, vehicleJack, interiorGeneral,
    triangles, inspectionBookUpdated, uhfRadio, mineRadio,
  ]
  const allCncNa: CncNa[] = [
    tyresRetorqued, nutIndicators, tread, mudFlaps, spareTyre, wheelStuds,
    numberPlates, towBar, flag, fireExtinguisher, bullBar, lights,
    reverseAlarm, turnSignals, wheelChocks, flashingLight, stickersDecals,
    windscreen, wipers, generalCondition, batteryIsolator, bonnetGeneral,
    seatBelts, firstAidKit, horn, fuelLevel, gauges, glass, heaterDefroster,
    interiorLights, beacon, oilLevel, steering, body, doors, backupLights, spillKit,
  ]
  const passCount = allYesNoNa.filter(v => v === "yes").length + allCncNa.filter(v => v === "C").length
  const failCount = allYesNoNa.filter(v => v === "no").length + allCncNa.filter(v => v === "NC").length

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
            <div>MM-OPS-TP-009</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">Motor Vehicle Inspection Report</h1>
        <p className="text-xs text-gray-500 mb-3">Daily Vehicle Condition &amp; Safety Checklist</p>

        {/* ── Info Bar ── */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          <InlineField label="Site conducted" value={siteConducted} onChange={setSiteConducted} width="w-36" />
          <InlineField label="Conducted on" value={conductedOn} onChange={e => setConductedOn(e.target?.value || e)} width="w-32" type="date" />
          <InlineField label="Prepared by" value={preparedBy} onChange={setPreparedBy} width="w-36" />
          <InlineField label="Select Asset" value={selectAsset} onChange={setSelectAsset} width="w-36" />
          <InlineField label="Vehicle Odometer" value={odometer} onChange={setOdometer} width="w-24" type="number" suffix="km" />
        </div>

        {/* ── Summary ── */}
        <div className="flex gap-3 mb-3 text-[10px]">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">{passCount} Pass</span>
          {failCount > 0 && <span className="text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">{failCount} Fail</span>}
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── VEHICLE DETAILS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Vehicle Details" />
          <div className="flex flex-wrap gap-2 text-[10px]">
            <InlineField label="Registration Number" value={registrationNo} onChange={setRegistrationNo} width="w-36" />
            <InlineField label="Vehicle Make" value={vehicleMake} onChange={setVehicleMake} width="w-36" />
            <InlineField label="Service Due Kms" value={serviceDueKms} onChange={setServiceDueKms} width="w-24" type="number" suffix="km" />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── CLEANLINESS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Cleanliness" />
          <div className="space-y-2">
            <CheckRow label="Is the Vehicle Clean and Tidy?" value={cleanTidy} onChange={setCleanTidy} />
            {cleanTidy === "no" && (
              <div className="ml-6 p-3 bg-red-50 border border-red-200 rounded space-y-2">
                <PhotoInput label="Evidence Photo (required)" value={cleanPhoto} onChange={setCleanPhoto} />
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── RETORQUE WHEEL NUTS ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Retorque Wheel Nuts (First Day of Swing)" />
          <PhotoInput label="Photo / Media" value={retorquePhoto} onChange={setRetorquePhoto} />
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── TYRES ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Tyres" />
          <div className="space-y-1">
            <CompliantRow label="Retorqued Wheel Nuts" value={tyresRetorqued} onChange={setTyresRetorqued} />
            <CompliantRow label="All Nut Indicators" value={nutIndicators} onChange={setNutIndicators} />
            <CompliantRow label="Tread" value={tread} onChange={setTread} extra="Photos Required" />
            {tread === "NC" && (
              <div className="ml-6 p-3 bg-red-50 border border-red-200 rounded">
                <PhotoInput label="Tread Condition Photo" value={treadPhoto} onChange={setTreadPhoto} />
              </div>
            )}
            <CompliantRow label="Mud Flaps" value={mudFlaps} onChange={setMudFlaps} />
            <CompliantRow label="Spare Tyre" value={spareTyre} onChange={setSpareTyre} />
            <CompliantRow label="Wheel Studs" value={wheelStuds} onChange={setWheelStuds} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── EXTERIOR ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Exterior" />
          <div className="space-y-1">
            <CompliantRow label="Number Plates" value={numberPlates} onChange={setNumberPlates} extra="front &amp; back" />
            <CompliantRow label="Tow Bar" value={towBar} onChange={setTowBar} />
            <CompliantRow label="Flag" value={flag} onChange={setFlag} />
            <CompliantRow label="Fire Extinguisher" value={fireExtinguisher} onChange={setFireExtinguisher} extra="green &amp; current tag" />
            {/* Fire Extinguisher conditional fields */}
            {fireExtinguisher === "NC" && (
              <div className="ml-6 p-3 bg-red-50 border border-red-200 rounded space-y-2 text-[10px]">
                <PhotoInput label="Evidence Photo" value={fireExtEvidence} onChange={setFireExtEvidence} />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600">Stamped Date:</span>
                  <input type="text" value={fireExtStampedDate} onChange={e => setFireExtStampedDate(e.target.value)}
                    placeholder="MM/YY"
                    className="border-b border-dashed border-red-300 bg-transparent w-20 px-1 py-0.5 focus:outline-none focus:border-red-500 text-center" />
                </div>
              </div>
            )}
            {fireExtinguisher === "C" && (
              <div className="ml-6 p-3 bg-green-50 border border-green-200 rounded space-y-2 text-[10px]">
                <PhotoInput label="Evidence Photo" value={fireExtEvidence} onChange={setFireExtEvidence} />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600">Expiry Date:</span>
                  <input type="text" value={fireExtExpiryDate} onChange={e => setFireExtExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    className="border-b border-dashed border-green-300 bg-transparent w-20 px-1 py-0.5 focus:outline-none focus:border-green-500 text-center" />
                </div>
              </div>
            )}

            <CompliantRow label="Bull Bar" value={bullBar} onChange={setBullBar} />
            <CompliantRow label="Lights" value={lights} onChange={setLights} extra="front/back/indicators/hazards" />
            <CompliantRow label="Reverse Alarm" value={reverseAlarm} onChange={setReverseAlarm} />
            <CompliantRow label="Turn Signals" value={turnSignals} onChange={setTurnSignals} />
            <CompliantRow label="Wheel Chocks" value={wheelChocks} onChange={setWheelChocks} />
            <CompliantRow label="Flashing Light" value={flashingLight} onChange={setFlashingLight} />
            <CompliantRow label="Stickers &amp; Decals" value={stickersDecals} onChange={setStickersDecals} />
            <CompliantRow label="Windscreen" value={windscreen} onChange={setWindscreen} extra="cracks, stone chips" />
            <CompliantRow label="Wipers &amp; Wiper Blades" value={wipers} onChange={setWipers} />
            <CompliantRow label="General Condition" value={generalCondition} onChange={setGeneralCondition} extra="dents, scratches" />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── UNDER BONNET ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Under Bonnet" />
          <div className="space-y-1">
            <CompliantRow label="Battery Isolator" value={batteryIsolator} onChange={setBatteryIsolator} />
            <CompliantRow label="General Condition" value={bonnetGeneral} onChange={setBonnetGeneral} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── INTERIOR ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Interior" />

          {/* Yes/No/N/A items */}
          <div className="text-[10px] font-semibold text-gray-500 mb-1">General Items</div>
          <div className="space-y-1">
            <CheckRow label="Seat Covers" value={seatCovers} onChange={setSeatCovers} />
            <CompliantRow label="Seat Belts" value={seatBelts} onChange={setSeatBelts} />
            <CheckRow label="Fuel Card and Pin No" value={fuelCardPin} onChange={setFuelCardPin} />
            <CheckRow label="Mats" value={mats} onChange={setMats} />
            <CheckRow label="Vehicle Jack" value={vehicleJack} onChange={setVehicleJack} />
            <CheckRow label="General Condition" value={interiorGeneral} onChange={setInteriorGeneral} />
            <CheckRow label="Triangles" value={triangles} onChange={setTriangles} />
          </div>

          <div className="text-[10px] font-semibold text-gray-500 mb-1 mt-3">Safety &amp; Equipment</div>
          <div className="space-y-1">
            <CompliantRow label="First Aid Kit" value={firstAidKit} onChange={setFirstAidKit} />
            {/* First Aid conditional */}
            {(firstAidKit === "C" || firstAidKit === "NC") && (
              <div className="ml-6 p-3 bg-blue-50 border border-blue-200 rounded text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600">Expiry Date:</span>
                  <input type="text" value={firstAidExpiry} onChange={e => setFirstAidExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="border-b border-dashed border-blue-300 bg-transparent w-20 px-1 py-0.5 focus:outline-none focus:border-blue-500 text-center" />
                </div>
              </div>
            )}

            <CheckRow label="Inspection Book Updated" value={inspectionBookUpdated} onChange={setInspectionBookUpdated} />
            <CheckRow label="UHF Radio - Check Operation" value={uhfRadio} onChange={setUhfRadio} />
            <CompliantRow label="Horn" value={horn} onChange={setHorn} />
            <CheckRow label="Mine Radio Fitted - Check Operation" value={mineRadio} onChange={setMineRadio} />
            <CompliantRow label="Fuel Level" value={fuelLevel} onChange={setFuelLevel} />
            <CompliantRow label="Gauges" value={gauges} onChange={setGauges} />
            <CompliantRow label="Glass" value={glass} onChange={setGlass} />
            <CompliantRow label="Heater / Defroster" value={heaterDefroster} onChange={setHeaterDefroster} />
            <CompliantRow label="Lights" value={interiorLights} onChange={setInteriorLights} />
            <CompliantRow label="Beacon" value={beacon} onChange={setBeacon} />
            <CompliantRow label="Oil Level" value={oilLevel} onChange={setOilLevel} />
            <CompliantRow label="Steering" value={steering} onChange={setSteering} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── BODY ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <SectionHeading title="Body" />
          <div className="space-y-1">
            <CompliantRow label="Body" value={body} onChange={setBody} />
            {body === "NC" && (
              <div className="ml-6 p-3 bg-red-50 border border-red-200 rounded space-y-2 text-[10px]">
                <PhotoInput label="Body Damage Photo (required)" value={bodyDamagePhoto} onChange={setBodyDamagePhoto} />
                <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-yellow-800">
                  <span className="font-semibold">ⓘ Notify:</span> Debbie / Shaun Pedersen
                </div>
              </div>
            )}
            <CompliantRow label="Doors" value={doors} onChange={setDoors} />
            <CompliantRow label="Backup Lights" value={backupLights} onChange={setBackupLights} />
            <CompliantRow label="Spill Kit" value={spillKit} onChange={setSpillKit} />
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
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* ── COMPLETION / SIGN-OFF ── */}
        {/* ════════════════════════════════════════════════════════ */}
        <div className="border rounded-lg p-4 text-xs">
          <SectionHeading title="Completion" />
          <p className="text-gray-500 mb-3 text-[10px]">I confirm that this vehicle has been inspected and all items noted above are accurate.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Driver Name</label>
              <input type="text" value={driverName} onChange={e => setDriverName(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Signature</label>
              <input type="text" value={driverSignature} onChange={e => setDriverSignature(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                placeholder="Sign here" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Date</label>
              <input type="text" value={completionDate} onChange={e => setCompletionDate(e.target.value || new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-009</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
