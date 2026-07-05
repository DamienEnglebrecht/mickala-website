"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"

export default function PurchaseWarrantyPage() {
  const [owner, setOwner] = useState({ name: "", address: "", phone: "", email: "" })
  const [machine, setMachine] = useState({ make: "Mickala", model: "", serial: "", delivery: "", hours: "", engine: "", gen: "", controller: "", mast: "" })
  const [witness, setWitness] = useState({ name: "", company: "", date: "" })
  const [inspector, setInspector] = useState({ name: "", date: "" })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 print:p-2">
        <div className="flex justify-between items-center mb-6 no-print">
          <Link href="/documents" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="mr-1 h-3 w-3" /> Back</Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1"><Printer className="h-3 w-3" /> Print / PDF</button>
        </div>

        {/* ============ PAGE 1 ============ */}
        <div className="print:break-after-page mb-6">
          <div className="flex justify-between items-start mb-4">
            <div><Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto mb-1" /><p className="text-[10px] text-muted-foreground">ABN: 92 180 218 353</p></div>
            <div className="text-right text-[10px] text-muted-foreground"><div className="font-semibold text-primary">1300 642 525</div><div>management@mickala.com.au</div><div>21 Caterpillar Dr, Paget QLD 4740</div></div>
          </div>
          <h1 className="text-xl font-bold text-primary text-center mb-1">Purchase Letter &amp; Warranty</h1>
          <p className="text-[10px] text-muted-foreground text-center mb-4">Document: MM-OP-TP-010 | Version 1.4</p>

          <p className="text-xs mb-4">Congratulations on the purchase of your Mickala lighting tower. Please find below a list of documents to be provided upon delivery. All documents are to be signed off by the owner/operator.</p>

          <h2 className="text-sm font-bold mb-2">Documents Provided Upon Delivery</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] mb-4">
            {["Operator Manual x 2", "Service Log Book", "Test and Tag Certificate", "ELV Test Certificate", "Declaration of Conformity", "Engine Manual", "Mickala Spare Parts Manual USB", "Road Worthy Certificate (QLD)"].map((d, i) => (
              <label key={i} className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-3 w-3" /><span>{d}</span></label>
            ))}
          </div>

          <h3 className="text-xs font-bold mb-2">Servicing</h3>
          <p className="text-[11px] mb-4">Mickala recommends an authorised Mickala technical service centre for your lighting tower servicing requirements to ensure your warranty remains valid. Service intervals at 500 hours or 12 months.</p>

          <h3 className="text-xs font-bold mb-2">Parts</h3>
          <p className="text-[11px] mb-4">Only Mickala approved parts should be used when servicing to ensure your warranty remains valid. To order parts, please contact Mickala on <strong>1300 642 525</strong>.</p>

          <div className="border rounded-lg p-3 mb-4">
            <h3 className="text-xs font-bold mb-2">Owner / Operator Declaration</h3>
            <p className="text-[10px] text-muted-foreground mb-2">I acknowledge receipt of the above documents and understand the servicing and parts requirements to maintain warranty.</p>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div><label className="font-semibold block mb-0.5">Owner Name</label><input value={owner.name} onChange={e => setOwner(p => ({ ...p, name: e.target.value }))} className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="font-semibold block mb-0.5">Date</label><input type="date" className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div className="col-span-2"><label className="font-semibold block mb-0.5">Signature</label><div className="border-b border-gray-300 h-8"></div></div>
            </div>
          </div>
        </div>

        {/* ============ PAGE 2: WARRANTY REGISTRATION ============ */}
        <div className="print:break-after-page mb-6">
          <div className="flex justify-between items-start mb-4">
            <div><Image src="/logo-mickala.png" alt="Mickala" width={50} height={50} className="h-10 w-auto" /></div>
            <h2 className="text-sm font-bold text-primary">Warranty Registration</h2>
            <div className="text-right text-[10px] text-muted-foreground">MM-OP-TP-010 v1.4</div>
          </div>

          <h3 className="text-xs font-bold mb-2">Owner Details</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] mb-4">
            {[{ label: "Company / Owner Name", key: "name" }, { label: "Address", key: "address" }, { label: "Phone", key: "phone" }, { label: "Email", key: "email" }].map(f => (
              <div key={f.key}><label className="font-semibold block mb-0.5">{f.label}</label><input value={(owner as any)[f.key]} onChange={e => setOwner(p => ({ ...p, [f.key]: e.target.value }))} className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
            ))}
          </div>

          <h3 className="text-xs font-bold mb-2">Machine Details</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] mb-2">
            {[{ label: "Make", key: "make" }, { label: "Model", key: "model" }, { label: "Serial Number", key: "serial" }, { label: "Delivery Date", key: "delivery" }, { label: "SMU Hours", key: "hours" }, { label: "Engine Serial", key: "engine" }, { label: "Generator Serial", key: "gen" }, { label: "Controller Serial", key: "controller" }, { label: "Mast Type / Height", key: "mast" }, { label: "Build Date", key: "" }].map(f => (
              <div key={f.key || "build"}><label className="font-semibold block mb-0.5">{f.label}</label><input value={(machine as any)[f.key] || ""} onChange={e => setMachine(p => ({ ...p, [f.key]: e.target.value }))} className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mb-4">Please attach copy of delivery docket or invoice.</p>

          <div className="border-t pt-3">
            <h3 className="text-xs font-bold mb-2">Warranty</h3>
            <p className="text-[10px] mb-2">Mickala warrants the lighting tower for a period of <strong>12 months or 1,500 hours</strong> (whichever occurs first) from date of delivery, subject to the terms and conditions overleaf.</p>
            <p className="text-[10px]">Extended warranty to <strong>36 months or 6,000 hours</strong> available with Mickala Service Agreement (MSA).</p>
          </div>
        </div>

        {/* ============ PAGES 3-5: TERMS & CONDITIONS ============ */}
        <div className="print:break-after-page mb-6">
          <h2 className="text-sm font-bold text-primary mb-3">Warranty Terms &amp; Conditions</h2>

          <div className="text-[10px] space-y-3">
            <div><h3 className="font-bold text-[11px]">1. Definitions</h3><p className="mt-0.5">"Client" means the purchaser named on the delivery docket. "Mickala" means Mickala Group Pty Ltd. "Equipment" means the lighting tower described on the delivery docket. "Warranty Period" means 12 months or 1,500 hours from delivery date, whichever occurs first.</p></div>

            <div><h3 className="font-bold text-[11px]">2. Scope of Warranty</h3>
            <p className="mt-0.5">2.1 Mickala warrants that the Equipment will be free from defects in materials and workmanship under normal use and service for the Warranty Period.</p>
            <p>2.2 This warranty extends only to the original purchaser and is not transferable.</p>
            <p>2.3 Mickala's sole obligation under this warranty is limited to repairing or replacing, at Mickala's option, any part found to be defective.</p></div>

            <div><h3 className="font-bold text-[11px]">3. Warranty Claim Process</h3>
            <p className="mt-0.5">3.1 The Client must notify Mickala in writing within 7 days of discovering a defect.</p>
            <p>3.2 The Client must complete a Warranty Claim Form (MM-OP-TP-003) and submit to Mickala.</p>
            <p>3.3 Mickala will assess the claim and may require the equipment to be returned to a Mickala service centre for inspection.</p>
            <p>3.4 Approved warranty repairs will be carried out by Mickala or an authorised Mickala service centre.</p>
            <p>3.5 The Client is responsible for transport costs to and from the service centre unless otherwise agreed in writing.</p></div>

            <div><h3 className="font-bold text-[11px]">4. Exclusions</h3>
            <p className="mt-0.5">This warranty does not cover:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              {["Normal wear and tear", "Consumable items (filters, belts, fluids, bulbs, tyres)", "Damage caused by misuse, abuse, negligence or accident", "Damage from failure to follow operating or maintenance instructions", "Damage from unauthorised modifications or repairs", "Damage from contaminated or incorrect fuel, oil or lubricants", "Damage from environmental conditions (lightning, flood, fire, corrosive atmosphere)", "Damage during transport or storage", "Equipment operated beyond rated capacity", "Equipment where serial number has been altered or removed", "Equipment not serviced per Mickala schedule", "Parts not approved by Mickala", "Failure to comply with site compliance requirements", "Any indirect or consequential loss"].map((e, i) => <li key={i}>{e}</li>)}
            </ul></div>

            <div><h3 className="font-bold text-[11px]">5. Limitation of Liability</h3>
            <p className="mt-0.5">5.1 Mickala's liability under this warranty is limited to repair or replacement of defective parts.</p>
            <p>5.2 Mickala shall not be liable for any loss of profits, production, or other consequential loss.</p>
            <p>5.3 To the extent permitted by law, all other warranties and conditions are excluded.</p></div>

            <div><h3 className="font-bold text-[11px]">6. Owner's Responsibilities</h3>
            <p className="mt-0.5">The owner is responsible for:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Operating the equipment in accordance with the operator's manual</li>
              <li>Performing scheduled maintenance at 500 hour / 12 month intervals</li>
              <li>Using only Mickala approved parts</li>
              <li>Keeping all maintenance records</li>
              <li>Ensuring only trained personnel operate the equipment</li>
            </ul></div>
          </div>
        </div>

        {/* ============ PAGE 6: SIGN-OFF ============ */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-primary mb-3">Final Sign-Off</h2>

          <p className="text-[10px] mb-3">I/we acknowledge that I/we have received the purchase letter, warranty registration and understand the terms and conditions outlined above.</p>

          <div className="grid grid-cols-2 gap-4 text-[11px] mb-4">
            <div className="border rounded-lg p-3">
              <h3 className="font-bold mb-2">Mickala Representative</h3>
              <div className="space-y-2">
                <div><label className="font-semibold block mb-0.5">Name</label><input value={inspector.name} onChange={e => setInspector(p => ({ ...p, name: e.target.value }))} className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
                <div><label className="font-semibold block mb-0.5">Date</label><input type="date" className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
                <div><label className="font-semibold block mb-0.5">Signature</label><div className="border-b border-gray-300 h-8"></div></div>
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <h3 className="font-bold mb-2">Owner / Client</h3>
              <div className="space-y-2">
                <div><label className="font-semibold block mb-0.5">Name</label><input value={witness.name} onChange={e => setWitness(p => ({ ...p, name: e.target.value }))} className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
                <div><label className="font-semibold block mb-0.5">Company</label><input value={witness.company} onChange={e => setWitness(p => ({ ...p, company: e.target.value }))} className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
                <div><label className="font-semibold block mb-0.5">Date</label><input type="date" className="w-full border-b border-gray-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></div>
                <div><label className="font-semibold block mb-0.5">Signature</label><div className="border-b border-gray-300 h-8"></div></div>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-muted-foreground text-center border-t pt-3">
            <p>Mickala Group | 1300 642 525 | management@mickala.com.au | www.mickalagroup.com.au</p>
            <p className="mt-0.5">MM-OP-TP-010 Rev 1.4 | Uncontrolled if printed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
