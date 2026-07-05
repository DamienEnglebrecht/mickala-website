"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"

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

function ToggleRow({ label, value, onChange }: { label: string; value: YesNoNa; onChange: (v: YesNoNa) => void }) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded border text-[11px] ${
      value === "no" ? "border-red-200 bg-red-50" : value === "yes" ? "border-green-200 bg-green-50" : "border-gray-100 bg-white"
    }`}>
      <span className={`font-medium ${value === "no" ? "text-red-700" : value === "yes" ? "text-green-700" : "text-gray-700"}`}>{label}</span>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}

export default function BuildRecordPage() {
  const [site, setSite] = useState("")
  const [date, setDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [machineId, setMachineId] = useState("")
  const [location, setLocation] = useState("")
  const [asset, setAsset] = useState("")
  const [serialNo, setSerialNo] = useState("")
  const [vinNo, setVinNo] = useState("")
  const [machineModel, setMachineModel] = useState("")
  const [mickalaAssetNo, setMickalaAssetNo] = useState("")
  const [sledOrTrailer, setSledOrTrailer] = useState("")
  const [owner, setOwner] = useState("")
  const [callSign, setCallSign] = useState("")
  const [engineType, setEngineType] = useState("Kubota (Z482-E)")
  const [engineSerial, setEngineSerial] = useState("")
  const [genType, setGenType] = useState("")
  const [genSerial, setGenSerial] = useState("")
  const [slewGearbox, setSlewGearbox] = useState("")
  const [controllerType, setControllerType] = useState("")
  const [controllerSerial, setControllerSerial] = useState("")
  const [lightType, setLightType] = useState("")
  const [lightSerials, setLightSerials] = useState<string[]>(["", "", "", "", "", "", "", "", "", "", "", ""])
  const [waterTempSender, setWaterTempSender] = useState("M00151")
  const [lowLevelSender, setLowLevelSender] = useState("E00217A")
  const [speedSensor, setSpeedSensor] = useState("M00152")
  const [oilPressureSender, setOilPressureSender] = useState("M00150")
  const [radiatorType, setRadiatorType] = useState("")
  const [gpsSerial, setGpsSerial] = useState("")
  const [fireExtDate, setFireExtDate] = useState("")
  const [banlaw, setBanlaw] = useState<YesNoNa>(undefined)
  const [wiggins, setWiggins] = useState<YesNoNa>(undefined)
  const [wigginsFlow, setWigginsFlow] = useState("")
  const [remoteType, setRemoteType] = useState("")
  const [remotePartNo, setRemotePartNo] = useState("")
  const [remoteFreq, setRemoteFreq] = useState("")
  const [remoteId, setRemoteId] = useState("")
  const [redBeacon, setRedBeacon] = useState("")
  const [amberBeacon, setAmberBeacon] = useState("")
  const [axleType, setAxleType] = useState("")
  const [wheelType, setWheelType] = useState("")
  const [personCompleting, setPersonCompleting] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 print:p-2">
        <div className="flex justify-between items-start mb-4 no-print">
          <Link href="/operations" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Operations
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" />
            <div className="mt-1">
              <span className="text-xl font-extrabold">MICKALA</span>
              <span className="text-xl font-extrabold text-primary ml-1">GROUP</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-500">
            <div>MM-OPS-TP-008</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">LED Lighting Tower Build Record</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala Group — New Build Configuration</p>

        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Machine ID", v: machineId, s: setMachineId }, { l: "Date", v: date, s: (e: any) => setDate(e.target?.value || e) },
            { l: "Location", v: location, s: setLocation }, { l: "Asset", v: asset, s: setAsset },
          ].map(({ l, v, s }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600">{l}:</span>
              <input type="text" value={v} onChange={e => s(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-28 px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          ))}
        </div>

        {/* Machine Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Machine Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Machine Serial Number</label>
              <input type="text" value={serialNo} onChange={e => setSerialNo(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Machine VIN No</label>
              <input type="text" value={vinNo} onChange={e => setVinNo(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Machine Model</label>
              <select value={machineModel} onChange={e => setMachineModel(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:border-primary bg-white">
                <option value="">Select model...</option>
                <option>MLT2560-LED Single Axle</option>
                <option>MLT2560-LED Dual Axle</option>
                <option>MLS2560-LED Sled Mount</option>
                <option>MLT3840-LED Dual Axle</option>
                <option>MLT3200-LED Dual Axle</option>
                <option>MLS3200-LED Sled Mount</option>
                <option>MLS3840-LED Sled Mount</option>
                <option>MLT1920-LED Single Axle</option>
                <option>MLT1280-LED Single Axle</option>
                <option>MLS7200-LED Long Range</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Mickala Asset No</label>
              <input type="text" value={mickalaAssetNo} onChange={e => setMickalaAssetNo(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Build Configuration */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Build Configuration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Sled or Trailer</label>
              <select value={sledOrTrailer} onChange={e => setSledOrTrailer(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:border-primary bg-white">
                <option value="">Select...</option><option>Trailer</option><option>Skid</option><option>N/A</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Owner</label>
              <input type="text" value={owner} onChange={e => setOwner(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Call Sign</label>
              <input type="text" value={callSign} onChange={e => setCallSign(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Engine Type</label>
              <select value={engineType} onChange={e => setEngineType(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:border-primary bg-white">
                <option>Kubota (Z482-E)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Engine Serial Number</label>
              <input type="text" value={engineSerial} onChange={e => setEngineSerial(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Generator Type</label>
              <select value={genType} onChange={e => setGenType(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:border-primary bg-white">
                <option value="">Select...</option><option>Sincro</option><option>RFL</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Generator Serial Number</label>
              <input type="text" value={genSerial} onChange={e => setGenSerial(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Slew Gearbox</label>
              <input type="text" value={slewGearbox} onChange={e => setSlewGearbox(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Controller Type</label>
              <input type="text" value={controllerType} onChange={e => setControllerType(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Controller Serial No</label>
              <input type="text" value={controllerSerial} onChange={e => setControllerSerial(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Type of Lights</label>
              <input type="text" value={lightType} onChange={e => setLightType(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Light Serial Numbers */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Light Serial Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["Light 1","Light 2","Light 3","Light 4","Light 5","Light 6","Light 7","Light 8","Light 9","Light 10","Light 11","Light 12"].map((label, i) => (
              <div key={label}>
                <label className="font-semibold text-[9px] text-gray-500 block">{label}</label>
                <input type="text" value={lightSerials[i]} onChange={e => {
                  const copy = [...lightSerials]; copy[i] = e.target.value; setLightSerials(copy);
                }} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-[10px] focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Components */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Components & Sensors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Water Temp Sender</label>
              <select value={waterTempSender} onChange={e => setWaterTempSender(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-white focus:outline-none focus:border-primary">
                <option>M00151</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Low Level Sender</label>
              <select value={lowLevelSender} onChange={e => setLowLevelSender(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-white focus:outline-none focus:border-primary">
                <option>E00217A</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Speed Sensor</label>
              <select value={speedSensor} onChange={e => setSpeedSensor(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-white focus:outline-none focus:border-primary">
                <option>M00152</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Oil Pressure Sender</label>
              <select value={oilPressureSender} onChange={e => setOilPressureSender(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-white focus:outline-none focus:border-primary">
                <option>M00150</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Radiator Type</label>
              <input type="text" value={radiatorType} onChange={e => setRadiatorType(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">GPS Serial Number</label>
              <input type="text" value={gpsSerial} onChange={e => setGpsSerial(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Fire Extinguisher Stamp (MM/YY)</label>
              <input type="text" value={fireExtDate} onChange={e => setFireExtDate(e.target.value)} placeholder="MM/YY"
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Options</h2>
          <div className="space-y-2 mb-3">
            <ToggleRow label="Banlaw Oil Evacuation System" value={banlaw} onChange={setBanlaw} />
            <ToggleRow label="Wiggins Quick Fill" value={wiggins} onChange={setWiggins} />
          </div>
          {wiggins === "yes" && (
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Flow rate (litres per minute)</label>
              <input type="number" value={wigginsFlow} onChange={e => setWigginsFlow(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary max-w-[120px]" />
            </div>
          )}
        </div>

        {/* Remote Control */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Remote Control</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Type</label>
              <input type="text" value={remoteType} onChange={e => setRemoteType(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Part Number</label>
              <input type="text" value={remotePartNo} onChange={e => setRemotePartNo(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Frequency</label>
              <input type="text" value={remoteFreq} onChange={e => setRemoteFreq(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">ID</label>
              <input type="text" value={remoteId} onChange={e => setRemoteId(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Beacons / Axle */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Beacons & Running Gear</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Red Beacon Type</label>
              <input type="text" value={redBeacon} onChange={e => setRedBeacon(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Amber Beacon Type</label>
              <input type="text" value={amberBeacon} onChange={e => setAmberBeacon(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Axle Type</label>
              <select value={axleType} onChange={e => setAxleType(e.target.value)}
                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-white focus:outline-none focus:border-primary">
                <option value="">Select...</option><option>Single Axle</option><option>Dual Axle</option><option>N/A</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Wheel Type</label>
              <input type="text" value={wheelType} onChange={e => setWheelType(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Sign-off */}
        <div className="border rounded-lg p-4 text-xs">
          <h2 className="font-bold text-primary text-sm mb-2">Authorised Person Completing Form</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Name / Signature</label>
              <input type="text" value={personCompleting} onChange={e => setPersonCompleting(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                placeholder="Sign here" />
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Date</label>
              <span className="block py-0.5 text-gray-700">{date}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-008</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
