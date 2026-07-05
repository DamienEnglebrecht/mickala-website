"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Printer, ChevronDown, ChevronUp, Check, AlertTriangle, FileText } from "lucide-react"

export default function MasterHireAgreement() {
  const [date, setDate] = useState("")
  const [supplier, setSupplier] = useState("Mickala Mining Maintenance Pty Ltd as trustee for the Englebrecht Family Trust")
  const [supplierAbn, setSupplierAbn] = useState("92 180 218 353")
  const [supplierAddr, setSupplierAddr] = useState("58-60 Southgate Road, Paget, Queensland 4740")
  const [hirer, setHirer] = useState("")
  const [hirerAbn, setHirerAbn] = useState("")
  const [hirerAcn, setHirerAcn] = useState("")
  const [hirerAddr, setHirerAddr] = useState("")
  const [guarantor, setGuarantor] = useState("")
  const [equipDesc, setEquipDesc] = useState("")
  const [serialVin, setSerialVin] = useState("")
  const [rego, setRego] = useState("")
  const [duration, setDuration] = useState("")
  const [site, setSite] = useState("")
  const [commDate, setCommDate] = useState("")
  const [minUsage, setMinUsage] = useState("")
  const [rate, setRate] = useState("")
  const [insuredValue, setInsuredValue] = useState("")
  const [machineStartHrs, setMachineStartHrs] = useState("")
  const [specialConditions, setSpecialConditions] = useState("")
  const [showClauses, setShowClauses] = useState<Record<string,boolean>>({})

  const toggle = (id: string) => setShowClauses(p => ({...p, [id]: !p[id]}))

  const clauses = [
    {id:"definitions", title:"1. Definitions and Interpretation", text:"1.1 'Agreement' means this Master Agreement for the Hire of Plant and Equipment, as varied or supplemented from time to time.\n1.2 'Business Day' means a day that is not a Saturday, Sunday or public holiday in the relevant place.\n1.3 'Commencement Date' means the date specified in a Schedule.\n1.4 'Commissioning' means the installation or erection of the Equipment and making it ready for operation and use by the Hirer at the Site.\n1.5 'Decommissioning' means the dismantling of the Equipment at the Site and making it ready for transport back to the Supplier.\n1.6 'Event of Default' means any of the events specified in clause 14.\n1.7 'Expenses' means any cost, expense or charge whether paid or liable to be paid.\n1.8 'Equipment' means the plant and equipment listed in a Schedule.\n1.9 'Guarantor' means a party specified as Guarantor herein.\n1.10 'Hirer' means the party specified as such herein or in a Schedule.\n1.11 'Major Repairs' means any repair required in excess of $1,500.00 (excluding scheduled servicing).\n1.12 'Supplier' means the party specified as such herein or in a Schedule.\n1.13 'Parts' means any and all appliances, parts, instruments, appurtenances, accessories and other equipment.\n1.14 'Site' means the location of Equipment described in a Schedule.\n1.15 'Schedule' means the contract hire schedule in the form of Attachment 'A' listing particular Equipment taken for hire.\n1.16 'Term' means the term of hire specified in a Schedule.\n1.17-1.29 contain standard interpretation provisions including singular/plural, gender, legislative references, and business day rules."},
    {id:"hire", title:"2. Hire", text:"2.1 Commencement: On and from the Commencement Date, the Supplier shall hire to the Hirer and the Hirer shall take on hire from the Supplier, the Equipment, for the Term, on the terms and conditions contained in this Agreement in return for payment of the Hire Charge.\n\n2.2 Extension: The Hirer may request an alteration or extension to the Term of Hire by giving the Supplier at least 7 days prior notice in writing. The Supplier may agree to such extension at its absolute discretion."},
    {id:"gst", title:"3. GST", text:"3.1 The consideration for the supply of Equipment and services under this Agreement is exclusive of GST.\n3.2 If either party is liable for GST, the consideration payable shall be increased by the GST amount calculated as A x R where A = consideration payable, R = GST rate.\n3.3 The Supplier shall provide a valid tax invoice at or prior to the time for payment.\n3.4-3.6 contain further GST provisions including reimbursement of expenses and interpretation."},
    {id:"inspection", title:"4. Hirer's Inspection", text:"The Hirer acknowledges that before executing this Agreement, the Hirer inspected the Equipment and was satisfied as to the condition, quality, safety and fitness for purpose. In selecting the Equipment the Hirer has not relied on the Supplier's skill and judgment."},
    {id:"transport", title:"5. Transport & Commissioning", text:"5.1 Responsibility for delivery, commissioning, decommissioning and return shall be as specified in the Schedule. The Supplier will obtain all necessary permits at the Hirer's cost.\n5.2 Expenses for delivery, commissioning, decommissioning and return shall be paid by the party specified in the Schedule.\n5.3 The Hirer must do all that is practicable to facilitate delivery, commissioning, removal or decommissioning.\n5.4 The Supplier will use best endeavours to deliver and commission on time but will not be liable for any delay or non-delivery."},
    {id:"risk", title:"6. Risk & Title", text:"6.1 Risk in the Equipment passes to the Hirer upon delivery and remains with the Hirer until the Equipment is returned to the Supplier.\n6.2 Title in the Equipment remains with the Supplier at all times. The Hirer has no right, title or interest in the Equipment other than as a bailee.\n6.3 The Hirer must keep the Equipment free from any encumbrance and must immediately notify the Supplier of any claim affecting the Equipment."},
    {id:"hirecharges", title:"7. Hire Charges & Invoicing", text:"7.1 The Hirer must pay the Hire Charges specified in the Schedule.\n7.2 Invoicing and payment terms shall be as specified in the Schedule.\n7.3 The Supplier may vary Hire Charges on 30 days written notice.\n7.4 All amounts are payable within the terms specified. Overdue amounts attract interest at 14% per annum."},
    {id:"hirerobligations", title:"8. Hirer's Obligations", text:"8.1 The Hirer must: (a) pay all Hire Charges and other amounts on time; (b) keep the Equipment in good working order; (c) comply with all laws and regulations; (d) not misuse or abuse the Equipment; (e) keep the Equipment clean and tidy; (f) immediately report any damage, fault or malfunction; (g) not make any alterations to the Equipment without written consent; (h) permit the Supplier to inspect the Equipment at any time; (i) provide hour meter readings weekly; (j) comply with all site safety requirements."},
    {id:"maintenance", title:"9. Maintenance & Repairs", text:"9.1 The Hirer must maintain the Equipment in good working order and repair.\n9.2 The Hirer must carry out all routine servicing as specified by the Supplier.\n9.3 The Hirer must notify the Supplier immediately of any breakdown, damage or malfunction.\n9.4 Major Repairs (over $1,500) must be authorised by the Supplier in writing.\n9.5 The Supplier may carry out maintenance or repairs during the Term and the Hirer must provide reasonable access."},
    {id:"indemnity", title:"10. Indemnity", text:"10.1 The Hirer indemnifies the Supplier against all loss, damage, claims, costs and expenses arising from: (a) the Hirer's use, possession or operation of the Equipment; (b) any breach of this Agreement by the Hirer; (c) any negligent act or omission of the Hirer; (d) any damage to the Equipment however caused (except fair wear and tear).\n10.2 This indemnity continues after termination of this Agreement."},
    {id:"hirerobligations2", title:"11. Further Hirer Obligations", text:"11.1-11.18 contain further obligations including: security deposits, proper operation, compliance with manuals, theft notification, no removal from site, compliance with the PPSA, environment, signage, no dealings with Equipment, liens, and hour meter readings."},
    {id:"insurance", title:"12. Insurance", text:"12.1 The responsible party (as specified in the Schedule) shall effect and maintain insurance for the Equipment's full insurable value.\n12.2 The Hirer must maintain: (a) liability insurance pursuant to indemnity; (b) third party risks including damage or injury; (c) public risk insurance of not less than $20,000,000.\n12.3 All policies must be in the joint names of the Supplier and Hirer, with an approved insurer, and contain a 30-day cancellation notice clause."},
    {id:"default", title:"14. Default & Termination", text:"14.1 An Event of Default includes: (a) failure to pay Hire Charges; (b) failure to observe any term; (c) the Hirer becoming insolvent; (d) the Equipment being seized or appropriated; (e) the Hirer suspending payment of debts.\n14.2 If an Event of Default occurs, the Supplier may: (a) enforce performance; or (b) terminate this Agreement and repossess the Equipment.\n14.3 Interest on overdue amounts: 14% per annum, calculated daily."},
    {id:"return", title:"17. Return of Equipment", text:"17.1 Upon expiry or termination, the Hirer must immediately decommission and return the Equipment.\n17.2 If not returned, the Supplier may retake possession without notice and may enter any site to do so.\n17.3 Hire Charges continue until the Supplier gains access to the Equipment.\n17.4 The Equipment must be returned with full fuel and oil.\n17.5 The Equipment must be returned in a clean and tidy condition."},
  ]

  const responsibilities = [
    "Mobilisation / Demobilisation / Assembly / Disassembly Costs",
    "Replacement of Ground Engaging Tools", "Cranage / Tyre Handler", "Machine Inspection (at commencement of rental)",
    "Tyre / Track Inspection (at commencement)", "Operator (fully qualified)", "Use of workshop Facilities for Repairs",
    "Daily Service (labour, top up oils, grease & coolants)", "Scheduled Service (parts, labour, oils)",
    "Minor Repairs (parts, labour & testing to $2,000)", "Modifications for Site Conformance",
    "Major Repairs (not attributed to abuse or negligence)", "Major Repairs attributed to abuse or negligence",
    "Panel / Glass Damage & Replacement", "Track / Tyre Wear (fair wear and tear)",
    "Body / Blade / Bucket / Ripper Damage", "Machine Inspection (at completion of rental)",
    "Tyre / Track Inspection (at completion)", "Weed and Seed Certificate", "Insurance", "Replacement of Tyres",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 print:p-2">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 no-print">
          <Link href="/documents" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-800"><ArrowLeft className="h-3 w-3 mr-1" /> Back</Link>
          <button onClick={() => window.print()} className="inline-flex items-center gap-1 text-xs bg-red-600 text-white px-4 py-1.5 rounded-full hover:bg-red-700"><Printer className="h-3 w-3" /> Print / PDF</button>
        </div>

        {/* Title */}
        <div className="flex items-start gap-3 mb-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600"><FileText className="h-5 w-5" /></span>
          <div>
            <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-10 w-auto mb-1" />
            <h1 className="text-xl font-bold text-gray-900">Master Agreement for the Hire of Plant and Equipment</h1>
            <p className="text-xs text-gray-500 mt-0.5">Document ref: SKB:KED:12024561_046</p>
          </div>
        </div>

        {/* Agreement Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Between</label>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-gray-500">Supplier</span>
                <input type="text" value={supplier} onChange={e => setSupplier(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input type="text" value={supplierAbn} onChange={e => setSupplierAbn(e.target.value)} placeholder="ABN" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs" />
                  <input type="text" value={supplierAddr} onChange={e => setSupplierAddr(e.target.value)} placeholder="Address" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs" />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-gray-500">Hirer</span>
                <input type="text" value={hirer} onChange={e => setHirer(e.target.value)} placeholder="Hirer name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input type="text" value={hirerAbn} onChange={e => setHirerAbn(e.target.value)} placeholder="ABN" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs" />
                  <input type="text" value={hirerAcn} onChange={e => setHirerAcn(e.target.value)} placeholder="ACN (if applicable)" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs" />
                </div>
                <input type="text" value={hirerAddr} onChange={e => setHirerAddr(e.target.value)} placeholder="Address" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs mt-2" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500">Guarantor</span>
                <input type="text" value={guarantor} onChange={e => setGuarantor(e.target.value)} placeholder="Guarantor name (if applicable)" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Check className="h-4 w-4 text-red-600" /> Equipment Schedule</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {label:"Description of Equipment", val:equipDesc, set:setEquipDesc, ph:"JS290 / MLT Lighting Tower"},
              {label:"Serial / VIN No.", val:serialVin, set:setSerialVin, ph:"1421421"},
              {label:"Registration No.", val:rego, set:setRego, ph:"MX02"},
              {label:"Hire Duration", val:duration, set:setDuration, ph:"5 days / ongoing"},
              {label:"Site", val:site, set:setSite, ph:"Location of works"},
              {label:"Commencement Date", val:commDate, set:setCommDate, ph:"dd/mm/yyyy"},
              {label:"Minimum Usage", val:minUsage, set:setMinUsage, ph:"8 hrs per day"},
              {label:"Rate ($/hr, day, week, month)", val:rate, set:setRate, ph:"$110/hr"},
              {label:"Insured Value", val:insuredValue, set:setInsuredValue, ph:"$340,000.00"},
              {label:"Machine Start Hours", val:machineStartHrs, set:setMachineStartHrs, ph:"1237 hrs"},
            ].map(f => (
              <div key={f.label}>
                <label className="text-[10px] font-semibold text-gray-600">{f.label}</label>
                <input type="text" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Preamble */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Preamble</h2>
          <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
            <p>A. The Supplier shall let and the Hirer shall take such Equipment as may from time to time be agreed between the Supplier and the Hirer.</p>
            <p>B. The Supplier and the Hirer are entering into this Master Agreement where they agree to the terms and conditions included in this Master Agreement to facilitate the hiring of such Equipment.</p>
            <p>C. At the time of a specific Equipment hire, the Hirer shall sign a contract hire schedule (the &ldquo;Schedule&rdquo;) in a form substantially similar to Attachment &ldquo;A&rdquo; listing the particular Equipment taken for hire.</p>
            <p>D. Each Schedule shall constitute a separate hire agreement incorporating all of the provisions of this Master Agreement.</p>
          </div>
        </div>

        {/* Clauses (collapsible) */}
        <div className="space-y-2 mb-6">
          <h2 className="text-sm font-bold text-gray-900">Terms and Conditions</h2>
          {clauses.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button onClick={() => toggle(c.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
                <span className="text-sm font-semibold text-gray-800">{c.title}</span>
                {showClauses[c.id] ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
              </button>
              {showClauses[c.id] && (
                <div className="px-4 pb-4">
                  <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{c.text}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Attachment A - Schedule of Responsibilities */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Attachment &ldquo;A&rdquo; — Schedule of Responsibilities</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="bg-gray-900 text-white"><th className="text-left p-2 font-semibold">Item</th><th className="text-center p-2 font-semibold">Supplier</th><th className="text-center p-2 font-semibold">Hirer</th></tr></thead>
              <tbody>
                {responsibilities.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2 text-gray-700">{r}</td>
                    <td className="p-2 text-center"><span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">✓</span></td>
                    <td className="p-2 text-center"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Special Conditions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Special Conditions</h2>
          <textarea value={specialConditions} onChange={e => setSpecialConditions(e.target.value)} rows={2} placeholder="Add any special conditions here..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <p className="text-xs text-gray-500 mt-1">Machine Start hours = {machineStartHrs || "[hours]"} (Official hours will be timed by tracker data report)</p>
        </div>

        {/* Attestation with editable fields */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Execution</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {title:"Signed on behalf of the Hirer", color:"blue"},
              {title:"Signed on behalf of the Supplier", color:"red"},
            ].map((s,i) => (
              <div key={i}>
                <h3 className="text-xs font-semibold text-gray-700 mb-3">{s.title}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-gray-500">Print Name</label>
                    <input type="text" className="w-full border-b border-gray-300 bg-transparent px-1 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500">Signature</label>
                    <div className="border-b border-gray-300 h-8" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500">Date</label>
                    <input type="text" className="w-full border-b border-gray-300 bg-transparent px-1 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500">Capacity</label>
                    <input type="text" className="w-full border-b border-gray-300 bg-transparent px-1 py-1 text-sm" />
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-[10px] text-gray-500">In the presence of — Witness</span>
                    <div>
                      <label className="text-[10px] text-gray-400">Name</label>
                      <input type="text" className="w-full border-b border-gray-300 bg-transparent px-1 py-1 text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Signature</label>
                      <div className="border-b border-gray-300 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-[10px] text-gray-400 text-center border-t border-gray-200 pt-4 mt-6">
          Mickala Group | Document: SKB:KED:12024561_046 | Master Agreement for the Hire of Plant and Equipment
        </div>
      </div>
    </div>
  )
}
