"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"

type YesNoNa = "yes" | "no" | "na" | undefined

function Toggle({ value, onChange }: { value: YesNoNa; onChange: (v: YesNoNa) => void }) {
  const btn = (v: YesNoNa, label: string, color: string) => (
    <button
      onClick={() => onChange(v === value ? undefined : v)}
      className={`px-3 py-1 rounded text-[10px] font-semibold border transition-colors ${
        value === v
          ? `${color} text-white border-transparent`
          : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  )
  return (
    <div className="flex gap-1 no-print">
      {btn("yes", "Yes", "bg-green-500")}
      {btn("no", "No", "bg-red-500")}
      {btn("na", "N/A", "bg-gray-400")}
    </div>
  )
}

function ToggleRow({ label, value, onChange, indent }: { label: string; value: YesNoNa; onChange: (v: YesNoNa) => void; indent?: boolean }) {
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

export default function SafetyInteractionPage() {
  const [site, setSite] = useState("")
  const [preparedBy, setPreparedBy] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [withPerson, setWithPerson] = useState("")
  const [taskDesc, setTaskDesc] = useState("")
  const [areaSecure, setAreaSecure] = useState<YesNoNa>(undefined)
  const [workAuth, setWorkAuth] = useState<YesNoNa>(undefined)
  const [noPlanNoWork, setNoPlanNoWork] = useState<YesNoNa>(undefined)
  const [hazards, setHazards] = useState("")
  const [adequateControls, setAdequateControls] = useState<YesNoNa>(undefined)
  const [whatControls, setWhatControls] = useState("")
  const [additionalHazards, setAdditionalHazards] = useState("")
  const [additionalControls, setAdditionalControls] = useState("")
  const [positiveIsolation, setPositiveIsolation] = useState<YesNoNa>(undefined)
  const [ppeCorrect, setPpeCorrect] = useState<YesNoNa>(undefined)
  const [reviewChange, setReviewChange] = useState<YesNoNa>(undefined)
  const [envHazards, setEnvHazards] = useState<YesNoNa>(undefined)
  const [vehicleInspection, setVehicleInspection] = useState<YesNoNa>(undefined)
  const [signature, setSignature] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-8 print:p-2">
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
            <div>MM-OPS-TP-003</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">Safety Interaction</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala Group — Safety Observation Record</p>

        {/* Info bar */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Prepared by", v: preparedBy, s: setPreparedBy },
            { l: "Date", v: date, s: (e: any) => setDate(e.target?.value || e) },
            { l: "Location", v: location, s: setLocation },
            { l: "Time", v: time, s: setTime },
          ].map(({ l, v, s }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600">{l}:</span>
              <input type="text" value={v} onChange={e => s(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-28 px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          ))}
        </div>

        {/* Interaction Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Interaction Details</h2>
          <div className="mb-3">
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Who was the safety interaction conducted with?</label>
            <input type="text" value={withPerson} onChange={e => setWithPerson(e.target.value)}
              className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-3">
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Task Description</label>
            <textarea value={taskDesc} onChange={e => setTaskDesc(e.target.value)}
              className="w-full border rounded-lg p-2 text-xs min-h-[50px] focus:outline-none focus:border-primary" />
          </div>
          <div className="space-y-2">
            <ToggleRow label="Is the area / work area secure & safe?" value={areaSecure} onChange={setAreaSecure} />
            <ToggleRow label="Work Authorization completed?" value={workAuth} onChange={setWorkAuth} />
            <ToggleRow label="No Plan, No Work Completed?" value={noPlanNoWork} onChange={setNoPlanNoWork} />
          </div>
        </div>

        {/* Hazard Identification */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Hazard Identification</h2>
          <div className="mb-3">
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">What hazards have been identified?</label>
            <textarea value={hazards} onChange={e => setHazards(e.target.value)}
              className="w-full border rounded-lg p-2 text-xs min-h-[50px] focus:outline-none focus:border-primary" />
          </div>
          <ToggleRow label="Have we got adequate controls in place for these hazards?" value={adequateControls} onChange={setAdequateControls} />
          <div className="mt-3">
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">What are these controls?</label>
            <textarea value={whatControls} onChange={e => setWhatControls(e.target.value)}
              className="w-full border rounded-lg p-2 text-xs min-h-[50px] focus:outline-none focus:border-primary" />
          </div>
          <div className="mt-3">
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Are there any additional hazards identified during the interaction?</label>
            <textarea value={additionalHazards} onChange={e => setAdditionalHazards(e.target.value)}
              className="w-full border rounded-lg p-2 text-xs min-h-[50px] focus:outline-none focus:border-primary" />
          </div>
          <div className="mt-3">
            <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">What are the additional hazards and controls?</label>
            <textarea value={additionalControls} onChange={e => setAdditionalControls(e.target.value)}
              className="w-full border rounded-lg p-2 text-xs min-h-[50px] focus:outline-none focus:border-primary" />
          </div>
        </div>

        {/* Safety Checks */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Safety Checks</h2>
          <div className="space-y-2">
            <ToggleRow label="Have we identified positive isolation?" value={positiveIsolation} onChange={setPositiveIsolation} />
            <ToggleRow label="Are we wearing / using the required right PPE?" value={ppeCorrect} onChange={setPpeCorrect} />
            <ToggleRow label="Have you reviewed our task when things change?" value={reviewChange} onChange={setReviewChange} />
            <ToggleRow label="Environmental hazards and controls identified?" value={envHazards} onChange={setEnvHazards} />
            <ToggleRow label="Has a light vehicle inspection report been completed?" value={vehicleInspection} onChange={setVehicleInspection} />
          </div>
        </div>

        {/* Sign-off */}
        <div className="border rounded-lg p-4 text-xs">
          <h2 className="font-bold text-primary text-sm mb-2">Person Completing Form</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Signature</label>
              <input type="text" value={signature} onChange={e => setSignature(e.target.value)}
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
          <span>Document: MM-OPS-TP-003</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
