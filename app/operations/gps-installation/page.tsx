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
      <span className={`font-medium ${value === "no" ? "text-red-700" : value === "yes" ? "text-green-700" : "text-gray-700"}`}>
        {label}
      </span>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}

export default function GpsInstallationPage() {
  // Basic Info
  const [siteConducted, setSiteConducted] = useState("")
  const [conductedOn, setConductedOn] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [preparedBy, setPreparedBy] = useState("")
  const [location, setLocation] = useState("")
  const [machineId, setMachineId] = useState("")
  const [asset, setAsset] = useState("")

  // Equipment Details
  const [vehicleType, setVehicleType] = useState<"" | "led" | "vehicle" | "other">("")
  const [vehicleTypeOther, setVehicleTypeOther] = useState("")
  const [modelNo, setModelNo] = useState("")
  const [serialRego, setSerialRego] = useState("")
  const [hoursKms, setHoursKms] = useState("")
  const [owner, setOwner] = useState("")
  const [comments, setComments] = useState("")

  // GPS Details
  const [gpsModelNo, setGpsModelNo] = useState("")
  const [gpsSerialNo, setGpsSerialNo] = useState("")
  const [aerialModelNo, setAerialModelNo] = useState("")
  const [aerialSerialNo, setAerialSerialNo] = useState("")
  const [installDate, setInstallDate] = useState("")

  // Ancillary Equipment
  const [ancillaryEquipment, setAncillaryEquipment] = useState("")

  // Installer Details
  const [installerName, setInstallerName] = useState("")
  const [installerCompany, setInstallerCompany] = useState("")
  const [installerPosition, setInstallerPosition] = useState("")

  // Process Details
  const [approvalSought, setApprovalSought] = useState<YesNoNa>(undefined)
  const [installedToOem, setInstalledToOem] = useState<YesNoNa>(undefined)
  const [providerContacted, setProviderContacted] = useState<YesNoNa>(undefined)
  const [softwareTested, setSoftwareTested] = useState<YesNoNa>(undefined)
  const [serialInSpreadsheet, setSerialInSpreadsheet] = useState<YesNoNa>(undefined)

  // Authorisation
  const [installerSig, setInstallerSig] = useState("")
  const [installerSigDate, setInstallerSigDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [managerSig, setManagerSig] = useState("")
  const [managerSigDate, setManagerSigDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [adminSig, setAdminSig] = useState("")
  const [adminSigDate, setAdminSigDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Header controls */}
        <div className="flex justify-between items-start mb-4 no-print">
          <Link href="/operations" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Operations
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        {/* Logo & doc info */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" />
            <div className="mt-1">
              <span className="text-xl font-extrabold">MICKALA</span>
              <span className="text-xl font-extrabold text-primary ml-1">GROUP</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-500">
            <div>MM-OPS-TP-006</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">GPS Equipment Installation Report</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala Group — GPS Installation Record</p>

        {/* Basic Info Bar */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Site conducted at", v: siteConducted, s: setSiteConducted, w: "w-32" },
            { l: "Conducted on", v: conductedOn, s: (e: any) => setConductedOn(e.target?.value || e), w: "w-32" },
            { l: "Prepared By", v: preparedBy, s: setPreparedBy, w: "w-28" },
            { l: "Location", v: location, s: setLocation, w: "w-28" },
            { l: "Machine ID", v: machineId, s: setMachineId, w: "w-28" },
            { l: "Asset", v: asset, s: setAsset, w: "w-28" },
          ].map(({ l, v, s, w }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600">{l}:</span>
              <input type="text" value={v} onChange={e => s(e.target.value)}
                className={`border-b border-dashed border-gray-300 bg-transparent ${w} px-1 py-0.5 focus:outline-none focus:border-primary`} />
            </div>
          ))}
        </div>

        {/* Equipment Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Equipment Details</h2>

          {/* Vehicle Type */}
          <div className="mb-3">
            <label className="font-semibold text-[10px] text-gray-600 block mb-1">Vehicle Type</label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: "led" as const, label: "LED Lighting Tower" },
                { value: "vehicle" as const, label: "Vehicle" },
                { value: "other" as const, label: "Other" },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="vehicleType" checked={vehicleType === value}
                    onChange={() => setVehicleType(value)}
                    className="accent-primary h-3.5 w-3.5" />
                  <span className="text-xs text-gray-700">{label}</span>
                </label>
              ))}
            </div>
            {vehicleType === "other" && (
              <input type="text" value={vehicleTypeOther} onChange={e => setVehicleTypeOther(e.target.value)}
                placeholder="Please specify..."
                className="mt-2 w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {[
              { l: "Model No", v: modelNo, s: setModelNo },
              { l: "Serial/Rego No/Call Sign", v: serialRego, s: setSerialRego },
              { l: "Hours/Kms", v: hoursKms, s: setHoursKms, type: "number" },
              { l: "Owner", v: owner, s: setOwner },
            ].map(({ l, v, s, type }) => (
              <div key={l}>
                <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">{l}</label>
                <input type={type || "text"} value={v} onChange={e => s(e.target.value)}
                  className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>

          <div>
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Comments</label>
            <textarea value={comments} onChange={e => setComments(e.target.value)}
              className="w-full border rounded-lg p-2 text-xs min-h-[50px] focus:outline-none focus:border-primary" />
          </div>
        </div>

        {/* GPS Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">GPS Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { l: "GPS Model No", v: gpsModelNo, s: setGpsModelNo },
              { l: "GPS Serial No", v: gpsSerialNo, s: setGpsSerialNo },
              { l: "Aerial Model No", v: aerialModelNo, s: setAerialModelNo },
              { l: "Aerial Serial No", v: aerialSerialNo, s: setAerialSerialNo },
              { l: "Install Date", v: installDate, s: setInstallDate, type: "date" },
            ].map(({ l, v, s, type }) => (
              <div key={l}>
                <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">{l}</label>
                <input type={type || "text"} value={v} onChange={e => s(e.target.value)}
                  className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Ancillary Equipment */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Ancillary Equipment</h2>
          <input type="text" value={ancillaryEquipment} onChange={e => setAncillaryEquipment(e.target.value)}
            className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary"
            placeholder="List any ancillary equipment installed..." />
        </div>

        {/* Installer Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Installer Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { l: "Name", v: installerName, s: setInstallerName },
              { l: "Company", v: installerCompany, s: setInstallerCompany },
              { l: "Position", v: installerPosition, s: setInstallerPosition },
            ].map(({ l, v, s }) => (
              <div key={l}>
                <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">{l}</label>
                <input type="text" value={v} onChange={e => s(e.target.value)}
                  className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Process Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Process Details — Commercial / Installation / Admin</h2>
          <div className="space-y-2">
            <ToggleRow label="Ensure approval sought for installation" value={approvalSought} onChange={setApprovalSought} />
            <ToggleRow label="GPS installed to OEM specs" value={installedToOem} onChange={setInstalledToOem} />
            <ToggleRow label="Equipment provider contacted to commission" value={providerContacted} onChange={setProviderContacted} />
            <ToggleRow label="Software test conducted" value={softwareTested} onChange={setSoftwareTested} />
            <ToggleRow label="GPS serial entered into spreadsheet" value={serialInSpreadsheet} onChange={setSerialInSpreadsheet} />
          </div>

          {/* Photos placeholder */}
          <div className="mt-3 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Photos of Installation</p>
            <p className="text-[9px] text-gray-300 mt-1">Attach installation photos when printed</p>
          </div>
        </div>

        {/* Authorisation */}
        <div className="border rounded-lg p-4 text-xs">
          <h2 className="font-bold text-primary text-sm mb-3">Authorisation</h2>
          <div className="space-y-4">
            {/* Installer */}
            <div>
              <h3 className="font-semibold text-gray-600 text-[10px] uppercase tracking-wider mb-2">Installer</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-500 text-[10px]">Signature</label>
                  <input type="text" value={installerSig} onChange={e => setInstallerSig(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                    placeholder="Sign here" />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-500 text-[10px]">Date</label>
                  <span className="block py-0.5 text-gray-700">{installerSigDate}</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Manager/Supervisor */}
            <div>
              <h3 className="font-semibold text-gray-600 text-[10px] uppercase tracking-wider mb-2">Manager / Supervisor</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-500 text-[10px]">Signature</label>
                  <input type="text" value={managerSig} onChange={e => setManagerSig(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                    placeholder="Sign here" />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-500 text-[10px]">Date</label>
                  <input type="text" value={managerSigDate} onChange={e => setManagerSigDate(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary text-xs" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Administration */}
            <div>
              <h3 className="font-semibold text-gray-600 text-[10px] uppercase tracking-wider mb-2">Administration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-500 text-[10px]">Signature</label>
                  <input type="text" value={adminSig} onChange={e => setAdminSig(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                    placeholder="Sign here" />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-500 text-[10px]">Date</label>
                  <input type="text" value={adminSigDate} onChange={e => setAdminSigDate(e.target.value)}
                    className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary text-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-006</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
