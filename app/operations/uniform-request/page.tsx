"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Plus, Trash2 } from "lucide-react"

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

interface LineItem {
  code: string
  name: string
  selected: boolean
  qty: string
  size: string
}

interface CategoryProps {
  title: string
  items: LineItem[]
  setItems: (items: LineItem[]) => void
  hasYesNo: YesNoNa
  setHasYesNo: (v: YesNoNa) => void
}

function CategorySection({ title, items, setItems, hasYesNo, setHasYesNo }: CategoryProps) {
  const toggleItem = (code: string) => setItems(items.map(i => i.code === code ? { ...i, selected: !i.selected } : i))
  const updateItem = (code: string, field: keyof LineItem, val: any) => setItems(items.map(i => i.code === code ? { ...i, [field]: val } : i))

  return (
    <div className="bg-white border rounded-lg p-4 mb-4">
      <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">{title}</h2>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-gray-600">Required?</span>
        <Toggle value={hasYesNo} onChange={setHasYesNo} />
      </div>
      {hasYesNo === "yes" && (
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.code} className={`border rounded-lg p-3 text-xs ${item.selected ? "border-primary/30 bg-primary/5" : "border-gray-100"}`}>
              <label className="flex items-start gap-2 cursor-pointer mb-2">
                <input type="checkbox" checked={item.selected} onChange={() => toggleItem(item.code)}
                  className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary h-3.5 w-3.5" />
                <div>
                  <span className="font-semibold text-gray-700">{item.code}</span>
                  <span className="text-gray-500 ml-1">{item.name}</span>
                </div>
              </label>
              {item.selected && (
                <div className="flex gap-2 ml-6">
                  <div className="flex-1">
                    <label className="text-[9px] text-gray-500 block">Qty</label>
                    <input type="text" value={item.qty} onChange={e => updateItem(item.code, "qty", e.target.value)}
                      className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] text-gray-500 block">Size</label>
                    <input type="text" value={item.size} onChange={e => updateItem(item.code, "size", e.target.value)}
                      className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function UniformRequestPage() {
  const [preparedBy, setPreparedBy] = useState("")
  const [date, setDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))

  const [shirtsNeeded, setShirtsNeeded] = useState<YesNoNa>(undefined)
  const [shirts, setShirts] = useState<LineItem[]>([
    { code: "WSP201", name: "HIVIS MICROMESH POLO W POCKET S/SLEEVE", selected: false, qty: "", size: "" },
    { code: "BS6896", name: "BISLEY L/SLEEVE L/WEIGHT 2 TONE SHIRT WITH R/TAPE", selected: false, qty: "", size: "" },
    { code: "BCP900MS", name: "MENS GALAZY POLOS", selected: false, qty: "", size: "" },
    { code: "BCP900LS", name: "LADIES GALAZY POLOS", selected: false, qty: "", size: "" },
  ])

  const [pantsNeeded, setPantsNeeded] = useState<YesNoNa>(undefined)
  const [pants, setPants] = useState<LineItem[]>([
    { code: "BP6007", name: "TROUSER PLEAT BP6007 COTTON DRILL PANTS", selected: false, qty: "", size: "" },
    { code: "BPC6008", name: "BISLEY STRETCH COTTON DRILL CARGO PANTS", selected: false, qty: "", size: "" },
    { code: "BP6050", name: "BISLEY ROUGHRIDER DENIM WORK JEANS", selected: false, qty: "", size: "" },
    { code: "BP6712", name: "BISLEY LADIES STRETCH DENIM JEANS", selected: false, qty: "", size: "" },
    { code: "BPC6007T", name: "BISLEY 8 POCKET COTTON DRILL CARGO PANT WITH R/TAPE", selected: false, qty: "", size: "" },
    { code: "06DNC2", name: "DNC MENS COTTON DRILL CARGO SHORTS", selected: false, qty: "", size: "" },
  ])

  const [bootsNeeded, setBootsNeeded] = useState<YesNoNa>(undefined)
  const [boots, setBoots] = useState<LineItem[]>([
    { code: "FXD-LACE", name: "FXD LACE UP / ZIP SIDED COMPOSITE TOE SAFETY BOOTS (BLACK)", selected: false, qty: "", size: "" },
    { code: "O45632Z", name: "OLIVER AT55'S LACE UP / ZIP SIDED COMPOSITE TOE SAFETY BOOTS (WHEAT)", selected: false, qty: "", size: "" },
  ])

  const [comments, setComments] = useState("")
  const [supervisorSig, setSupervisorSig] = useState("")

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
            <div>MM-OPS-TP-004</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">Uniform Request Form</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala Group — Staff Uniform Order</p>

        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Prepared by", v: preparedBy, s: setPreparedBy },
            { l: "Date", v: date, s: (e: any) => setDate(e.target?.value || e) },
          ].map(({ l, v, s }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600">{l}:</span>
              <input type="text" value={v} onChange={e => s(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-40 px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          ))}
        </div>

        <CategorySection title="Shirts" items={shirts} setItems={setShirts} hasYesNo={shirtsNeeded} setHasYesNo={setShirtsNeeded} />
        <CategorySection title="Pants / Shorts" items={pants} setItems={setPants} hasYesNo={pantsNeeded} setHasYesNo={setPantsNeeded} />
        <CategorySection title="Boots" items={boots} setItems={setBoots} hasYesNo={bootsNeeded} setHasYesNo={setBootsNeeded} />

        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-2 uppercase tracking-wider">Comments</h2>
          <textarea value={comments} onChange={e => setComments(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[60px] focus:outline-none focus:border-primary" />
        </div>

        <div className="border rounded-lg p-4 text-xs">
          <h2 className="font-bold text-primary text-sm mb-2">Office Use — Supervisor Sign-Off</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Mickala Supervisor Signature</label>
              <input type="text" value={supervisorSig} onChange={e => setSupervisorSig(e.target.value)}
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
          <span>Document: MM-OPS-TP-004</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
