"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Printer, CheckCircle, Clock, Wrench, Phone, FileText, Plus, X } from "lucide-react"

const steps = [
  { icon: FileText, title: "Request Received", desc: "Client submits warranty claim via online form or email." },
  { icon: CheckCircle, title: "Form Checked", desc: "Mickala verifies claim details and equipment eligibility." },
  { icon: Wrench, title: "Inspection", desc: "Equipment inspected and failure assessed by technician." },
  { icon: Wrench, title: "Repairs Completed", desc: "Approved repairs carried out by authorised personnel." },
  { icon: Phone, title: "Client Contacted", desc: "Client advised of outcome and any follow-up required." },
  { icon: Clock, title: "Claim Closed", desc: "Job costs captured, documentation filed, claim closed." },
]

export default function WarrantyPage() {
  const [claimNum, setClaimNum] = useState("")
  const [claimDate, setClaimDate] = useState("")
  const [contactName, setContactName] = useState("")
  const [client, setClient] = useState("")
  const [clientContact, setClientContact] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [location, setLocation] = useState("")
  const [delivery, setDelivery] = useState("")
  const [make, setMake] = useState("Mickala")
  const [model, setModel] = useState("")
  const [serial, setSerial] = useState("")
  const [hours, setHours] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [failureDate, setFailureDate] = useState("")
  const [failureDesc, setFailureDesc] = useState("")
  const [repairDesc, setRepairDesc] = useState("")
  const [parts, setParts] = useState<{part:string,desc:string,qty:number}[]>([])
  const [labour, setLabour] = useState<{desc:string,hours:number}[]>([])
  const [pPart, setPPart] = useState("")
  const [pDesc, setPDesc] = useState("")
  const [pQty, setPQty] = useState(1)
  const [lDesc, setLDesc] = useState("")
  const [lHours, setLHours] = useState(0)

  const addPart = () => { if(pPart){setParts([...parts,{part:pPart,desc:pDesc,qty:pQty}]);setPPart("");setPDesc("");setPQty(1)} }
  const addLabour = () => { if(lDesc){setLabour([...labour,{desc:lDesc,hours:lHours}]);setLDesc("");setLHours(0)} }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 print:p-2">
        {/* TOP */}
        <div className="flex justify-between items-start mb-6 no-print">
          <Link href="/documents" className="text-xs text-muted-foreground hover:text-foreground">&larr; Back</Link>
          <button onClick={()=>window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-mickala.png" alt="Mickala" width={50} height={50} className="h-10 w-auto" />
            <div>
              <div className="text-sm font-bold">MICKALA GROUP</div>
              <div className="text-[10px] text-muted-foreground">Warranty Claim Form</div>
            </div>
          </div>
          <div className="text-right text-[10px] text-muted-foreground">
            <div>Document: MM-OP-TP-003 | Rev 1.4</div>
          </div>
        </div>

        {/* EMERGENCY CONTACTS */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6">
          <div className="text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">Emergency Contacts</div>
          <div className="text-[10px] text-muted-foreground">
            Technical Support: <span className="font-semibold text-foreground">(07) 4998 5447</span> or <span className="font-semibold text-foreground">1300 624 525</span>
            &nbsp;|&nbsp; Email: <span className="font-semibold text-foreground">maintenance@mickala.com.au</span>
          </div>
        </div>

        {/* SECTION 1 - PROCESS */}
        <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Warranty Claim Process</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {steps.map((s,i) => (
            <div key={i} className="border rounded-lg p-2 text-center">
              <s.icon className="h-4 w-4 text-primary mx-auto mb-1" />
              <div className="text-[9px] font-bold text-foreground">{s.title}</div>
              <div className="text-[8px] text-muted-foreground leading-tight mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>

        <hr className="border-border mb-6" />

        {/* SECTION 2 - CLAIM DETAILS */}
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Claim Form</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div><label className="text-[10px] font-semibold text-muted-foreground">Claim Number</label><input type="text" value={claimNum} onChange={e=>setClaimNum(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Date of Claim</label><input type="date" value={claimDate} onChange={e=>setClaimDate(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Mickala Contact</label><input type="text" value={contactName} onChange={e=>setContactName(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
        </div>

        <h3 className="text-[11px] font-bold text-foreground mb-2">Client Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div><label className="text-[10px] font-semibold text-muted-foreground">Client</label><input type="text" value={client} onChange={e=>setClient(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Contact Name</label><input type="text" value={clientContact} onChange={e=>setClientContact(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Phone</label><input type="text" value={clientPhone} onChange={e=>setClientPhone(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Email</label><input type="text" value={clientEmail} onChange={e=>setClientEmail(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Location</label><input type="text" value={location} onChange={e=>setLocation(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Parts Delivery Address</label><input type="text" value={delivery} onChange={e=>setDelivery(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
        </div>

        <h3 className="text-[11px] font-bold text-foreground mb-2">Equipment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div><label className="text-[10px] font-semibold text-muted-foreground">Make</label><input type="text" value={make} onChange={e=>setMake(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Model</label><input type="text" value={model} onChange={e=>setModel(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Serial Number</label><input type="text" value={serial} onChange={e=>setSerial(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">SMU Hours</label><input type="text" value={hours} onChange={e=>setHours(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Delivery Date</label><input type="date" value={deliveryDate} onChange={e=>setDeliveryDate(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground">Failure Date</label><input type="date" value={failureDate} onChange={e=>setFailureDate(e.target.value)} className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
        </div>

        <h3 className="text-[11px] font-bold text-foreground mb-2">Failure Description</h3>
        <textarea value={failureDesc} onChange={e=>setFailureDesc(e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg bg-transparent p-2 text-xs focus:outline-none focus:border-primary mb-4" placeholder="Describe the failure and circumstances..." />

        <h3 className="text-[11px] font-bold text-foreground mb-2">Repair Description</h3>
        <textarea value={repairDesc} onChange={e=>setRepairDesc(e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg bg-transparent p-2 text-xs focus:outline-none focus:border-primary mb-4" placeholder="Describe measurements, repairs and testing..." />

        <h3 className="text-[11px] font-bold text-foreground mb-2">Parts Required</h3>
        <div className="flex gap-2 mb-2">
          <input type="text" value={pPart} onChange={e=>setPPart(e.target.value)} placeholder="Part No" className="flex-1 border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
          <input type="text" value={pDesc} onChange={e=>setPDesc(e.target.value)} placeholder="Description" className="flex-1 border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
          <input type="number" value={pQty} onChange={e=>setPQty(Number(e.target.value))} className="w-16 border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
          <button onClick={addPart} className="rounded bg-primary text-white px-2 py-0.5 text-xs font-bold hover:bg-primary/90"><Plus className="h-3 w-3" /></button>
        </div>
        {parts.map((p,i)=>(
          <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1 bg-muted/30 p-1 rounded">
            <span className="font-mono font-bold">{p.part}</span><span>{p.desc}</span><span className="text-foreground font-semibold">x{p.qty}</span>
            <button onClick={()=>setParts(parts.filter((_,j)=>j!==i))} className="ml-auto text-red-500"><X className="h-3 w-3" /></button>
          </div>
        ))}

        <h3 className="text-[11px] font-bold text-foreground mb-2 mt-4">Labour Required</h3>
        <div className="flex gap-2 mb-2">
          <input type="text" value={lDesc} onChange={e=>setLDesc(e.target.value)} placeholder="Description" className="flex-1 border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
          <input type="number" value={lHours} onChange={e=>setLHours(Number(e.target.value))} placeholder="Hours" className="w-24 border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
          <button onClick={addLabour} className="rounded bg-primary text-white px-2 py-0.5 text-xs font-bold hover:bg-primary/90"><Plus className="h-3 w-3" /></button>
        </div>
        {labour.map((l,i)=>(
          <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1 bg-muted/30 p-1 rounded">
            <span>{l.desc}</span><span className="text-foreground font-semibold">{l.hours}h</span>
            <button onClick={()=>setLabour(labour.filter((_,j)=>j!==i))} className="ml-auto text-red-500"><X className="h-3 w-3" /></button>
          </div>
        ))}

        <hr className="border-border mt-6 mb-4" />

        <h3 className="text-[11px] font-bold text-foreground mb-2">Photo Upload</h3>
        <input type="file" accept="image/*" multiple className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 mb-4" />

        <h3 className="text-[11px] font-bold text-muted-foreground mb-2">Required Attachments</h3>
        <ul className="text-[10px] space-y-1 list-disc pl-4 text-muted-foreground mb-6">
          <li>Photographs of the failure</li>
          <li>Any other necessary supporting information</li>
        </ul>

        <hr className="border-border mt-4 mb-4" />

        {/* SIGN OFF */}
        <h3 className="text-[11px] font-bold text-foreground mb-3">Sign Off</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-3">Mickala Representative</div>
            <div className="mb-3"><label className="text-[10px] font-semibold text-muted-foreground">Name</label><input type="text" className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
            <div><label className="text-[10px] font-semibold text-muted-foreground">Date</label><input type="date" className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-3">Client Representative</div>
            <div className="mb-3"><label className="text-[10px] font-semibold text-muted-foreground">Name</label><input type="text" className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
            <div><label className="text-[10px] font-semibold text-muted-foreground">Date</label><input type="date" className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" /></div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 pt-4 border-t text-[10px] text-muted-foreground flex justify-between">
          <span>Document: MM-OP-TP-003 | Rev 1.4</span>
          <span>Mickala Group — Warranty Claim</span>
        </div>
      </div>
    </div>
  )
}
