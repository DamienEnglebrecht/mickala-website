"use client"

import { useState } from "react"
import Image from "next/image"

const ALL_MODELS = [
  "MLT 1280-4LED Single Axle", "MLT 1280-6LED Single Axle", "MLT 1920-LED Single Axle", "MLT 2560-LED Single Axle",
  "MLT 2560-LED Dual Axle", "MLT 3200-LED Dual Axle", "MLT 3840-LED Dual Axle",
  "MLS 2560-LED Sled Mount", "MLS 3200-LED Sled Mount", "MLS 3840-LED Sled Mount",
  "MLR 4800-LED Long Range", "MLR 7200-LED Long Range",
  "Fuel Trailer Single Axle", "Fuel Trailer Dual Axle",
  "Mobilisation", "Demobilisation", "Filter Kits", "Labour",
]

const RESPONSIBILITIES = [
  { desc: "Pre Hire and Post Hire Inspection", cat: "mickala" },
  { desc: "Site Compliance (Pre Hire Commencement Date)", cat: "mickala" },
  { desc: "Site Compliance (Post Hire) Changes", cat: "hirer" },
  { desc: "Equipment Inspection at Commencement of Hire", cat: "mickala" },
  { desc: "Equipment Inspection at Completion of Hire", cat: "mickala" },
  { desc: "Mobilisation and Demobilisation", cat: "hirer" },
  { desc: "Holding Bay", cat: "hirer" },
  { desc: "Daily Inspections (Labour, Oils, Grease)", cat: "hirer" },
  { desc: "Wash Bay Facilities", cat: "hirer" },
  { desc: "Cleaning for Scheduled Servicing", cat: "hirer" },
  { desc: "Scheduled 500 Hour Services", cat: "mickala" },
  { desc: "Filter Kits (9 per asset per year)", cat: "mickala" },
  { desc: "Batteries", cat: "mickala" },
  { desc: "Repairs - Abuse/Negligence/Operator Error", cat: "hirer" },
  { desc: "Panel and Glass Damage and Replacement", cat: "hirer" },
  { desc: "Tyre Damage or Repairs", cat: "hirer" },
  { desc: "Tow Chain/Slings/Hook/Shackle/Lights", cat: "hirer" },
  { desc: "GET Plates Sled Mount (Transport to Mackay)", cat: "hirer" },
  { desc: "Biannual Fire Extinguisher (Service/Refill)", cat: "mickala" },
  { desc: "Annual Compliance Costs", cat: "mickala" },
  { desc: "Brake Testing Costs", cat: "mickala" },
  { desc: "Fuel", cat: "hirer" },
  { desc: "Weed and Seed Removal", cat: "hirer" },
  { desc: "Insurance (COC or 12% of total hire)", cat: "hirer" },
  { desc: "Environmental Charge (1% of total hire)", cat: "hirer" },
  { desc: "Additional Hours >13.5hrs per day", cat: "hirer" },
  { desc: "Hourly Labour Rate - Damages $125.98", cat: "na" },
]

export default function HireSchedulePage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    supplier: "Mickala Mining Maintenance Pty Ltd as trustee for the DC Bright Discretionary Trust",
    supplierAddr: "21 Caterpillar Drive, Paget QLD 4740",
    hirer: "", hirerAddr: "", hirerPhone: "", hirerEmail: "", hirerContact: "",
    guarantorName: "", guarantorAddr: "",
    site: "",
    invoicing: "Weekly", paymentTerms: "30 days EOM", creditLimit: "",
  })
  const [equipment, setEquipment] = useState([{ model: "", serial: "", duration: "", start: "", rate: "", insured: "" }])
  const [responsibilities, setResponsibilities] = useState(RESPONSIBILITIES.map(r => ({ ...r, selected: r.cat })))
  const [specialConditions, setSpecialConditions] = useState("")

  const addEquipment = () => setEquipment([...equipment, { model: "", serial: "", duration: "", start: "", rate: "", insured: "" }])
  const removeEquipment = (i: number) => { if (equipment.length > 1) setEquipment(equipment.filter((_, j) => j !== i)) }

  const h = (k: string, v: any) => setForm({ ...form, [k]: v })

  const handlePrint = () => {
    document.title = `Mickala Equipment Hire Schedule - ${form.hirer || "New"}`
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-mickala.png" alt="Mickala Group" width={48} height={48} className="h-10 w-auto" priority />
            <div>
              <div className="text-2xl font-extrabold tracking-tight">MICKALA<span className="text-primary ml-1">GROUP</span></div>
              <div className="text-xs text-gray-500 mt-1">Equipment Hire Schedule</div>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 leading-relaxed">
            <div>21 Caterpillar Drive, Paget QLD 4740</div>
            <div className="font-semibold text-primary">1300 642 525</div>
            <div>management@mickala.com.au</div>
          </div>
        </div>

        <hr className="border-primary mb-6" />
        <h1 className="text-2xl font-extrabold text-primary mb-6">Equipment Hire Schedule</h1>

        {/* STEP NAV */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["Parties", "Equipment", "Responsibilities", "Conditions & Sign"].map((s, i) => (
            <button key={s} onClick={() => setStep(i+1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${step === i+1 ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"}`}>
              {i+1}. {s}
            </button>
          ))}
          <div className="flex-1" />
          <button onClick={handlePrint} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors print:hidden">
            Print / Save PDF
          </button>
        </div>

        {/* STEP 1: PARTIES */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-bold">Parties</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="text-xs font-semibold text-gray-500">Supplier</label><input value={form.supplier} onChange={e => h("supplier", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div className="col-span-2"><label className="text-xs font-semibold text-gray-500">Supplier Address</label><input value={form.supplierAddr} onChange={e => h("supplierAddr", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div className="col-span-2"><label className="text-xs font-semibold text-gray-500">Hirer (full legal name + ACN)</label><input value={form.hirer} onChange={e => h("hirer", e.target.value)} placeholder="e.g. ABC Mining Pty Ltd ACN ..." className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Address</label><input value={form.hirerAddr} onChange={e => h("hirerAddr", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Phone</label><input value={form.hirerPhone} onChange={e => h("hirerPhone", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Email</label><input type="email" value={form.hirerEmail} onChange={e => h("hirerEmail", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Principal Contact</label><input value={form.hirerContact} onChange={e => h("hirerContact", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Guarantor Name(s)</label><input value={form.guarantorName} onChange={e => h("guarantorName", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Guarantor Address(es)</label><input value={form.guarantorAddr} onChange={e => h("guarantorAddr", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
            </div>
            <div className="flex justify-end pt-4"><button onClick={() => setStep(2)} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold">Next →</button></div>
          </div>
        )}

        {/* STEP 2: EQUIPMENT */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">Equipment</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="bg-gray-100">
                  <th className="text-left p-2 font-semibold">Model</th>
                  <th className="text-left p-2 font-semibold">Serial No</th>
                  <th className="text-left p-2 font-semibold">Duration</th>
                  <th className="text-left p-2 font-semibold">Start Date</th>
                  <th className="text-left p-2 font-semibold">Rate</th>
                  <th className="text-left p-2 font-semibold">Insured Value</th>
                  <th className="p-2"></th>
                </tr></thead>
                <tbody>
                  {equipment.map((eq, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-1">
                        <select value={eq.model} onChange={e => { const e2 = [...equipment]; e2[i].model = e.target.value; setEquipment(e2) }} className="w-full border border-gray-200 rounded px-1 py-1 text-xs">
                          <option value="">Select...</option>
                          {ALL_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </td>
                      <td className="p-1"><input value={eq.serial} onChange={e => { const e2 = [...equipment]; e2[i].serial = e.target.value; setEquipment(e2) }} className="w-full border-b border-gray-200 py-1 text-xs" /></td>
                      <td className="p-1"><input value={eq.duration} onChange={e => { const e2 = [...equipment]; e2[i].duration = e.target.value; setEquipment(e2) }} className="w-full border-b border-gray-200 py-1 text-xs" placeholder="e.g. 12 months" /></td>
                      <td className="p-1"><input type="date" value={eq.start} onChange={e => { const e2 = [...equipment]; e2[i].start = e.target.value; setEquipment(e2) }} className="w-full border-b border-gray-200 py-1 text-xs" /></td>
                      <td className="p-1"><input value={eq.rate} onChange={e => { const e2 = [...equipment]; e2[i].rate = e.target.value; setEquipment(e2) }} className="w-full border-b border-gray-200 py-1 text-xs" placeholder="$" /></td>
                      <td className="p-1"><input value={eq.insured} onChange={e => { const e2 = [...equipment]; e2[i].insured = e.target.value; setEquipment(e2) }} className="w-full border-b border-gray-200 py-1 text-xs" placeholder="$" /></td>
                      <td className="p-1"><button onClick={() => removeEquipment(i)} className="text-red-500 text-xs px-1">✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={addEquipment} className="mt-3 text-sm text-primary font-semibold hover:underline">+ Add Equipment</button>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">← Back</button>
              <button onClick={() => setStep(3)} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold">Next →</button>
            </div>
          </div>
        )}

        {/* STEP 3: RESPONSIBILITIES */}
        {step === 3 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">Site &amp; Responsibilities</h2>
            <div className="mb-4"><label className="text-xs font-semibold text-gray-500">Site</label><input value={form.site} onChange={e => h("site", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm focus:outline-none focus:border-primary" /></div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div><label className="text-xs font-semibold text-gray-500">Invoicing</label><select value={form.invoicing} onChange={e => h("invoicing", e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"><option>Weekly</option><option>Monthly</option></select></div>
              <div><label className="text-xs font-semibold text-gray-500">Payment Terms</label><input value={form.paymentTerms} onChange={e => h("paymentTerms", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Credit Limit</label><input value={form.creditLimit} onChange={e => h("creditLimit", e.target.value)} className="w-full border-b border-gray-300 py-1.5 text-sm" /></div>
            </div>
            <h3 className="text-sm font-bold mb-2">Responsibility Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="bg-gray-100"><th className="text-left p-2 font-semibold">Item</th><th className="text-center p-2 font-semibold w-20">Mickala</th><th className="text-center p-2 font-semibold w-20">Hirer</th><th className="text-center p-2 font-semibold w-20">N/A</th></tr></thead>
                <tbody>
                  {responsibilities.map((r, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-2">{r.desc}</td>
                      {(["mickala","hirer","na"] as const).map(cat => (
                        <td key={cat} className="text-center p-2">
                          <input type="radio" name={`resp-${i}`} checked={r.selected === cat} onChange={() => { const r2 = [...responsibilities]; r2[i].selected = cat; setResponsibilities(r2) }} className="text-primary" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Custom responsibility input */}
            <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Need something not listed? Add a custom responsibility:</p>
              <div className="flex gap-2">
                <input type="text" id="customResp" placeholder="Type custom item..." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <button onClick={() => {
                  const inp = document.getElementById('customResp') as HTMLInputElement
                  if (inp && inp.value.trim()) {
                    setResponsibilities([...responsibilities, { desc: inp.value.trim(), selected: 'mickala' as const }])
                    inp.value = ''
                  }
                }} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">Add +</button>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">← Back</button>
              <button onClick={() => setStep(4)} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold">Next →</button>
            </div>
          </div>
        )}

        {/* STEP 4: CONDITIONS & SIGN */}
        {step === 4 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-bold">Special Conditions &amp; Execution</h2>
            <div><label className="text-xs font-semibold text-gray-500">Special Conditions</label>
              <textarea value={specialConditions} onChange={e => setSpecialConditions(e.target.value)} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Any special conditions..." /></div>

            <h3 className="text-sm font-bold">Helpful Reminders</h3>
            <div className="text-xs text-gray-600 space-y-2 bg-gray-50 rounded-lg p-4">
              <p><strong>Insurance:</strong> If you are responsible for insurance, comply with clause 12 of the Master Agreement and supply a certificate of currency.</p>
              <p><strong>Cross-Hire:</strong> If cross-hiring (sub-hire), you must obtain written consent, advise details of the sub-hirer, and ensure PPSR registration.</p>
              <p><strong>Disclaimer:</strong> These reminders are a summary only — seek your own legal advice.</p>
            </div>

            <h3 className="text-sm font-bold">Execution</h3>
            <div className="grid grid-cols-2 gap-8">
              <div><p className="text-xs font-semibold mb-2">Signed for the Hirer</p><div className="border-b border-gray-300 py-4 mb-2" /><div className="text-xs text-gray-400">Signature</div><div className="border-b border-gray-300 py-4 mb-2 mt-4" /><div className="text-xs text-gray-400">Name</div><div className="border-b border-gray-300 py-4 mb-2 mt-4" /><div className="text-xs text-gray-400">Date</div></div>
              <div><p className="text-xs font-semibold mb-2">Signed for the Supplier</p><div className="border-b border-gray-300 py-4 mb-2" /><div className="text-xs text-gray-400">Signature</div><div className="border-b border-gray-300 py-4 mb-2 mt-4" /><div className="text-xs text-gray-400">Name</div><div className="border-b border-gray-300 py-4 mb-2 mt-4" /><div className="text-xs text-gray-400">Date</div></div>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(3)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">← Back</button>
              <button onClick={handlePrint} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold">Print / Save PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
