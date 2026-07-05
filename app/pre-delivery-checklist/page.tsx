"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, CheckCircle, XCircle, Minus } from "lucide-react"

const checklistItems = [
  "Build Plate – photo taken", "Engine Serial Number – photo taken", "Generator Serial Number – photo taken",
  "Controller Serial Number – photo taken", "Light 1 Serial Number – photo taken", "Light 2 Serial Number – photo taken",
  "Light 3 Serial Number – photo taken", "Light 4 Serial Number – photo taken",
  "Left hand side of Machine – photo taken", "Right hand side of Machine – photo taken",
  "Plant No recorded", "Date of Inspection recorded", "Serial No recorded",
  "Engine Hours recorded", "Location recorded", "Hydraulic Oil Level Checked",
  "Engine Oil Level Checked", "Coolant Level Checked", "Fuel Level Checked",
  "Wheel Nut Torque Checked", "Tyre Pressure Checked", "All Lights Operational",
  "Mast Raise & Lower Tested", "Stabiliser Legs Operational", "Emergency Stop Tested",
  "Tow Hitch & Safety Chains Checked", "Breakaway System Tested", "Documentation Pack Complete",
]

export default function PreDeliveryPage() {
  const [statuses, setStatuses] = useState<Record<string, "pass"|"fail"|"na">>({})
  const [inspector, setInspector] = useState("")
  const [date, setDate] = useState(new Date().toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"}))
  const [plantNo, setPlantNo] = useState("")
  const [serialNo, setSerialNo] = useState("")
  const [engineHours, setEngineHours] = useState("")
  const [location, setLocation] = useState("")
  const [signature, setSignature] = useState("")

  const set = (k: string, v: "pass"|"fail"|"na") => setStatuses(s => ({...s, [k]: v === s[k] ? undefined as any : v}))

  const passCount = Object.values(statuses).filter(v => v === "pass").length
  const failCount = Object.values(statuses).filter(v => v === "fail").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-8 print:p-2">
        <div className="flex justify-between items-start mb-4 no-print">
          <Link href="/documents" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="mr-1 h-3 w-3" /> Documents</Link>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1"><Printer className="h-3 w-3" /> Print / PDF</button>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div><Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" /><div className="mt-1"><span className="text-xl font-extrabold">MICKALA</span><span className="text-xl font-extrabold text-primary ml-1">GROUP</span></div></div>
          <div className="text-right text-[10px] text-gray-500"><div>MM-OP-TP-001</div><div>ABN: 92 180 218 353</div><div>1300 642 525</div></div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">Pre-Delivery Inspection Checklist</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala LED Lighting Towers</p>

        {/* Info bar */}
        <div className="flex flex-wrap gap-2 mb-3 text-[10px]">
          {[{l:"Inspector",v:inspector,s:setInspector},{l:"Date",v:date,s:e=>setDate(e.target?.value||e)},{l:"Plant No",v:plantNo,s:setPlantNo},{l:"Serial No",v:serialNo,s:setSerialNo},{l:"Engine Hours",v:engineHours,s:setEngineHours},{l:"Location",v:location,s:setLocation}].map(({l,v,s}) => (
            <div key={l} className="flex items-center gap-1"><span className="font-semibold text-gray-600">{l}:</span><input type="text" value={v} onChange={e => s(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-28 px-1 py-0.5 focus:outline-none focus:border-primary" /></div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="flex gap-3 mb-3 text-[10px]">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">{passCount} Pass</span>
          {failCount > 0 && <span className="text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">{failCount} Fail</span>}
        </div>

        {/* Checklist */}
        <div className="space-y-1 mb-4">
          {checklistItems.map(item => {
            const st = statuses[item]
            return (
              <div key={item} className={`flex items-center justify-between p-2 rounded text-[11px] border ${st==="fail"?"border-red-200 bg-red-50":st==="pass"?"border-green-200 bg-green-50":"border-gray-200 bg-white"}`}>
                <span className={st==="fail"?"text-red-700":st==="pass"?"text-green-700":"text-gray-700"}>{item}</span>
                <div className="flex gap-1 no-print">
                  <button onClick={() => set(item,"pass")} className={`p-1 rounded ${st==="pass"?"bg-green-500 text-white":"bg-gray-100 text-gray-400 hover:bg-green-100"}`}><CheckCircle className="h-3.5 w-3.5" /></button>
                  <button onClick={() => set(item,"fail")} className={`p-1 rounded ${st==="fail"?"bg-red-500 text-white":"bg-gray-100 text-gray-400 hover:bg-red-100"}`}><XCircle className="h-3.5 w-3.5" /></button>
                  <button onClick={() => set(item,"na")} className={`p-1 rounded ${st==="na"?"bg-gray-400 text-white":"bg-gray-100 text-gray-400 hover:bg-gray-200"}`}><Minus className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sign-off */}
        <div className="border rounded-lg p-3 text-xs">
          <h2 className="font-bold text-primary text-sm mb-2">Sign-Off</h2>
          <p className="text-gray-500 mb-2">I confirm that this equipment has been inspected and is ready for delivery.</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="font-semibold block mb-0.5 text-gray-600">Inspector Name</label><input type="text" value={signature} onChange={e => setSignature(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary" /></div>
            <div><label className="font-semibold block mb-0.5 text-gray-600">Date</label><span className="block py-0.5 text-gray-700">{date}</span></div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OP-TP-001</span><span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
