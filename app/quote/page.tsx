"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const models = [
  { category: "Single Axle", items: [
    { name: "MLT 1280-4LED Single Axle", desc: "Single axle, 4 LED lights, compact deployment" },
    { name: "MLT 1280-6LED Single Axle", desc: "Single axle, 6 LED lights, medium coverage" },
    { name: "MLT 1920-LED Single Axle", desc: "Single axle, high-output, large area coverage" },
    { name: "MLT 2560-LED Single Axle", desc: "Single axle, 2560W output, maximum portability" },
  ]},
  { category: "Dual Axle", items: [
    { name: "MLT 2560-LED Dual Axle", desc: "Dual axle, 2560W, enhanced stability" },
    { name: "MLT 3200-LED Dual Axle", desc: "Dual axle, 3200W, high output" },
    { name: "MLT 3840-LED Dual Axle", desc: "Dual axle, 3840W, maximum coverage" },
  ]},
  { category: "Sled Mount", items: [
    { name: "MLS 2560-LED Sled Mount", desc: "Sled mount, 2560W, extreme terrain" },
    { name: "MLS 3200-LED Sled Mount", desc: "Sled mount, 3200W, remote operations" },
    { name: "MLS 3840-LED Sled Mount", desc: "Sled mount, 3840W, large-scale remote" },
  ]},
  { category: "Long Range", items: [
    { name: "MLR 4800-LED Long Range", desc: "Long range, 4800W, extended coverage" },
    { name: "MLR 7200-LED Long Range", desc: "Long range, 7200W, max distance" },
  ]},
  { category: "Services", items: [
    { name: "Mobilisation", desc: "Mobilisation of equipment to site" },
    { name: "Demobilisation", desc: "Demobilisation from site" },
    { name: "Filter Kits", desc: "Service filter kits" },
    { name: "Labour", desc: "Labour (per hour)" },
  ]},
  { category: "Other", items: [
    { name: "Fuel Trailer Single Axle 1,200 Litre", desc: "Single axle fuel trailer" },
    { name: "Fuel Trailer Dual Axle 2,000 Litre", desc: "Dual axle fuel trailer" },
    { name: "Generators", desc: "Industrial diesel generators" },
  ]},
]

const features = [
  "Extra Low Voltage (ELV) — operates at less than 50V DC for maximum safety",
  "Tier IV compliant diesel engines — reduced emissions, lower fuel consumption",
  "Auto start/stop system — extends engine life and reduces fuel waste",
  "MDG 15 and MDG 41 compliant — suitable for NSW mining operations",
  "Hydraulic mast system with safety valves on all rams",
  "Lockable starter and battery isolators",
  "Full bunding of all contaminants — no spill risk on site",
  "LED tail lights and beacons",
  "Jump start receptacle",
  "Fail-safe shutdown system",
]

const hireClarifications = [
  "Minimum hire period is subject to this quotation.",
  "All machines hired for less than contract term or outside of contract will be charged at $80 per day.",
  "Maintained rate includes travel.",
  "Accommodation and meals are the responsibility of client unless agreed in writing.",
  "Service kits additional to quoted quantity when used due to auto start stop function not being used correctly.",
  "The pricing provided is based on the specifications supplied. Should the specifications change, our pricing may vary.",
  "All damages through negligence will be charged to the client.",
  "Mickala provides full OEM support of Mickala LED Lighting Towers.",
  "Areas of responsibility (Service, Repair and Maintenance) are in accordance with Mickala Lighting Towers standard conditions. Please contact our office if you wish to obtain a copy.",
  "Where Mickala is engaged for the maintenance of the lighting towers, Mickala will carry out all scheduled servicing on a 6-week rotation. No 3rd party is to maintain any Mickala Lighting Towers unless authorised by a Mickala representative in writing.",
  "All communication in relation to Mickala LED Lighting Towers must be channelled through Mickala to facilitate, and not through any third party. No costs will be incurred by Mickala if this process is not adhered to.",
  "Any changes in site compliance requirements after the quotation date will be at the cost of customer.",
  "The pricing provided is based on the quantities and durations outlined in the quotation. Should these quantities or durations change, our pricing may vary.",
  "This quotation remains valid for a period of 30 days from the date specified and is subject to adjustment thereafter.",
  "This quotation is bound by the Mickala Standard Terms &amp; Conditions available at mickalagroup.com.au/standard-terms",
  "No allowance for mobilisation / demobilisation to site.",
  "Payment terms: 30 days EOM.",
  "Prices may be reviewed annually and adjusted in line with CPI or operating cost increases, subject to agreement by both parties.",
  "All pricing is GST exclusive.",
]

const purchaseClarifications = [
  "The pricing provided is based on the quantities outlined in the quotation. Should these quantities change, our pricing may vary.",
  "Service kits to be purchased through Mickala for the duration of the warranty period (12 months or 1,500 hours). Mickala offers extended warranty if Mickala Service Agreement (MSA) is applied. Extended warranty period would be 36 months or 6,000 hours with MSA.",
  "The pricing provided is based on the specifications supplied. Should the specifications change, our pricing may vary.",
  "Mickala provides full OEM support of Mickala LED Lighting Towers. Mickala will provide factory trained technician for any technical support required.",
  "Areas of responsibility (Service, Repair and Maintenance) are in accordance with Mickala Lighting Tower standard conditions. Please contact our office if you wish to obtain a copy.",
  "Any changes in site compliance requirements and costs after the quotation date will be the responsibility of the client.",
  "This quotation remains valid for a period of 30 days from the date specified and is subject to adjustment thereafter.",
  "This quotation is bound by the Mickala Standard Terms &amp; Conditions available at mickalagroup.com.au/standard-terms",
  "Payment: 100% prior to delivery.",
  "All machines must be signed off by an authorised site representative before delivery.",
  "All pricing is GST exclusive.",
]

const allItems = models.flatMap(cat => cat.items)

export default function QuotePage() {
  const [quoteNum, setQuoteNum] = useState(0)
  const [rows, setRows] = useState([{ id: 1, desc: "", qty: 1, price: 0 }])
  const [customer, setCustomer] = useState("")
  const [customerContact, setCustomerContact] = useState("")
  const [date, setDate] = useState("")
  const [hireFrom, setHireFrom] = useState("")
  const [hireTo, setHireTo] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("Payment: 100% prior to delivery / 30 days from invoice (subject to approved credit terms).")
  const [preparedBy, setPreparedBy] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const [specModel, setSpecModel] = useState<string | null>(null)
  const [quoteType, setQuoteType] = useState("Purchase Quote")
  const [status, setStatus] = useState("New")

  useEffect(() => {
    const saved = localStorage.getItem("mickala_quote_counter")
    if (saved) {
      setQuoteNum(parseInt(saved))
    } else {
      localStorage.setItem("mickala_quote_counter", "119")
      setQuoteNum(119)
    }
    setDate(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  }, [])

  useEffect(() => {
    document.title = `Mickala LED Lighting Tower Quote #${quoteNum}`
  }, [quoteNum])

  const handlePrint = async () => {
    document.title = `Mickala LED Lighting Tower Quote #${quoteNum}`
    // Save quote to database
    try {
      const items = rows.map(r => ({ desc: r.desc, qty: r.qty, price: r.price }))
      await fetch('/api/save-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: quoteNum, customer, customer_contact: customerContact, date, quote_type: quoteType, items, total: subtotal, prepared_by: preparedBy, status }),
      })
    } catch (_) { /* silently fail */ }
    setTimeout(() => window.print(), 200)
  }

  const addRow = () => setRows([...rows, { id: rows.length + 1, desc: "", qty: 1, price: 0 }])

  const updateRow = (id: number, field: string, value: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  const removeRow = (id: number) => {
    if (rows.length > 1) setRows(rows.filter(r => r.id !== id))
  }

  const newQuote = () => {
    const next = quoteNum + 1
    localStorage.setItem("mickala_quote_counter", String(next))
    setQuoteNum(next)
    setCustomer("")
    setCustomerContact("")
    setRows([{ id: 1, desc: "", qty: 1, price: 0 }])
    setPaymentTerms("Payment: 100% prior to delivery / 30 days from invoice (subject to approved credit terms).")
  }

  const subtotal = rows.reduce((s, r) => s + r.qty * Number(r.price), 0)

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white print:p-0">
      <style>{`
        @media print{@page{margin:12mm 8mm}body{min-width:auto!important}}
        .quote-content * { font-optical-sizing: auto !important; font-variation-settings: 'slnt' 0 !important; }
        .quote-content { font-optical-sizing: auto; }
      `}</style>
      <div className="quote-content max-w-5xl mx-auto p-4 sm:p-8 print:max-w-full print:mx-0 print:px-4 print:py-2">

      {/* Print / Details Buttons */}
        <div className="flex gap-3 mb-6 print:hidden">
          <button onClick={handlePrint} className="rounded-full bg-primary text-white px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">Print / Save PDF</button>
          <button onClick={newQuote} className="rounded-full bg-green-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-green-700 transition-colors">+ New Quote</button>
          <button onClick={() => setShowDetails(!showDetails)} className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-accent transition-colors">
            {showDetails ? "Simple View" : "Full Details"}
          </button>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <Image src="/logo-mickala.png" alt="Mickala Group" width={80} height={80} className="h-20 w-auto" priority />
            <div className="mt-1">
              <span className="text-2xl font-extrabold tracking-tight">MICKALA</span>
              <span className="text-2xl font-extrabold tracking-tight text-primary ml-1">GROUP</span>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 leading-relaxed">
            <div>ABN: 92 180 218 353</div>
            <div>21 Caterpillar Drive, Paget QLD 4740</div>
            <div className="font-semibold text-primary">1300 642 525</div>
            <div>management@mickala.com.au</div>
          </div>
        </div>

        <hr className="border-primary mb-6" />

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-primary text-center mb-1">PRODUCT SUPPLY QUOTATION</h1>
        <p className="text-center text-gray-600 text-sm mb-2">Lighting Tower Supply &amp; Hire</p>

        {/* QUOTE TYPE TOGGLE */}
        <div className="flex justify-center gap-4 mb-6 print:hidden">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="quoteType" checked={quoteType === "Purchase Quote"} onChange={() => setQuoteType("Purchase Quote")} className="text-primary" />
            <span className="text-sm font-medium">Purchase Quote</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="quoteType" checked={quoteType === "Hire Quote"} onChange={() => setQuoteType("Hire Quote")} className="text-primary" />
            <span className="text-sm font-medium">Hire Quote</span>
          </label>
          <span className="text-xs text-gray-400 self-center italic">{quoteType}</span>
        </div>

        {/* Status Selector */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-primary"
          >
            <option value="New">🆕 New</option>
            <option value="Sent">📤 Sent</option>
            <option value="Following Up">📞 Following Up</option>

            <option value="Won">✅ Won</option>
            <option value="Lost">❌ Lost</option>
          </select>
        </div>

        {/* META TABLE */}
        <table className="w-full text-xs mb-6">
          <tbody>
            <tr><td className="font-semibold py-1 pr-4 w-40">Quote Reference</td><td>MMMQ{new Date().getFullYear()}-<input type="number" value={quoteNum} onChange={e => setQuoteNum(Number(e.target.value))} className="border-b border-dashed border-gray-300 bg-transparent w-20 px-1 py-0.5 text-sm font-semibold text-primary focus:outline-none focus:border-primary print:border-none inline" style={{width:"3rem"}} /></td></tr>
            <tr><td className="font-semibold py-1 pr-4">Date</td><td>{date}</td></tr>
            {quoteType === "Hire Quote" && (
              <>
                <tr><td className="font-semibold py-1 pr-4">Hire Period From</td><td><input type="date" value={hireFrom} onChange={e => setHireFrom(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></td></tr>
                <tr><td className="font-semibold py-1 pr-4">Hire Period To</td><td><input type="date" value={hireTo} onChange={e => setHireTo(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></td></tr>
              </>
            )}
            <tr><td className="font-semibold py-1 pr-4">Prepared For</td>
              <td><input type="text" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Customer name" className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></td></tr>
            <tr><td className="font-semibold py-1 pr-4">Customer Contact</td>
              <td><input type="text" value={customerContact} onChange={e => setCustomerContact(e.target.value)} placeholder="Contact name" className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></td></tr>
            <tr><td className="font-semibold py-1 pr-4">Valid Until</td><td>{new Date(Date.now() + 30*86400000).toLocaleDateString("en-AU", {day:"numeric", month:"long", year:"numeric"})}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Payment Terms</td>
              <td><input type="text" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary" /></td></tr>
            <tr><td className="font-semibold py-1 pr-4">Delivery</td><td>FOB Paget QLD Depot</td></tr>
          </tbody>
        </table>

        <hr className="border-primary mb-6" />

        {/* PRICING TABLE */}
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Quoted Items</h2>
        <table className="w-full text-xs mb-6 border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="text-left p-2 font-semibold w-8">#</th>
              <th className="text-left p-2 font-semibold">Description</th>
              <th className="text-right p-2 font-semibold w-20">Qty</th>
              <th className="text-right p-2 font-semibold w-28">Unit Price</th>
              <th className="text-right p-2 font-semibold w-28">Total</th>
              <th className="w-8 p-2 print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b border-gray-200">
                <td className="p-1.5 text-gray-400">{i + 1}</td>
                <td className="p-1.5">
                  <div className="flex gap-1">
                    <input type="text" value={r.desc} onChange={e => updateRow(r.id, "desc", e.target.value)} placeholder="Select or type..." list={"models-" + r.id} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
                    <datalist id={"models-" + r.id}>
                      {allItems.map(m => (
                        <option key={m.name} value={m.name} />
                      ))}
                    </datalist>
                  </div>
                </td>
                <td className="p-1.5"><input type="number" value={r.qty} onChange={e => updateRow(r.id, "qty", parseInt(e.target.value) || 0)} className="w-16 text-right border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-primary" /></td>
                <td className="p-1.5"><input type="number" value={r.price} onChange={e => updateRow(r.id, "price", parseFloat(e.target.value) || 0)} className="w-24 text-right border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-primary" /></td>
                <td className="p-1.5 text-right font-medium">${(r.qty * Number(r.price)).toLocaleString()}</td>
                <td className="p-1.5 print:hidden">
                  <button onClick={() => removeRow(r.id)} className="text-red-500 hover:text-red-700 text-xs">&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={4} className="p-2 text-right font-bold">Subtotal (ex GST)</td>
              <td className="p-2 text-right font-bold">${subtotal.toLocaleString()}</td>
              <td className="print:hidden"></td>
            </tr>
          </tfoot>
        </table>

        <button onClick={addRow} className="text-xs text-primary hover:underline mb-6 print:hidden">+ Add item</button>

        {/* PRODUCT MODELS - only in full details */}
        {showDetails && (
          <>
            <hr className="border-primary mb-6" />
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Product Specifications</h2>
            <p className="text-xs text-gray-500 mb-4">Click any model to view its full spec sheet and light simulation data.</p>

            <div className="space-y-6 mb-8">
              {models.map(cat => (
                <div key={cat.category}>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{cat.category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {cat.items.map(m => (
                      <Link key={m.name} href={`/spec-sheets?category=${cat.category.toLowerCase().replace(/ /g,'-')}`}
                        className="block p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-red-50 transition-colors"
                        onMouseEnter={() => setSpecModel(m.name)}
                        onMouseLeave={() => setSpecModel(null)}>
                        <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{m.desc}</div>
                        <div className="text-xs text-primary mt-1 font-medium">View Spec Sheet &rarr;</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {specModel && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-400">Showing spec sheet for: <span className="font-semibold text-gray-700">{specModel}</span></p>
                <p className="text-xs text-gray-400">View at <Link href="/spec-sheets" className="text-primary hover:underline">Spec Sheets page</Link></p>
              </div>
            )}
          </>
        )}

        <hr className="border-primary mb-6" />

        {/* STANDARD FEATURES */}
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Standard Features</h2>
        <ul className="text-xs text-gray-700 space-y-1 mb-6 list-disc pl-4">
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>

        {/* CLARIFICATIONS */}
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Clarifications &amp; Conditions</h2>
        <ol className="text-xs text-gray-700 space-y-1 mb-6 list-decimal pl-4">
          {(quoteType === "Hire Quote" ? hireClarifications : purchaseClarifications).map((c, i) => <li key={i}>{c}</li>)}
        </ol>

        <hr className="border-primary mb-6" />

        {/* PREPARED BY */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Prepared By</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-700">Quote by:</span>
            <input
              type="text"
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
              placeholder="Enter name"
              className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-primary print:border-none print:p-0 print:text-gray-900 print:font-medium"
            />
          </div>
        </div>

        <hr className="border-primary mb-6" />

        {/* CONTACTS */}
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Contacts</h2>
        <div className="grid grid-cols-2 gap-6 mb-6 text-xs">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-gray-900">Damien Englebrecht</p>
            <p className="text-gray-600 mt-1">Damien@mickala.com.au</p>
            <p className="text-gray-600">0408 248 507</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-gray-900">Debbie Pedersen</p>
            <p className="text-gray-600 mt-1">Debbie@mickala.com.au</p>
            <p className="text-gray-600">0427 503 041</p>
          </div>
        </div>

        <hr className="border-primary mb-6" />

        {/* ACCEPTANCE */}
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Payment &amp; Acceptance</h2>
        <p className="text-xs text-gray-700 mb-4">{paymentTerms}</p>
        <p className="text-xs text-gray-700 mb-4">To accept this quotation, please sign below and return to <span className="text-primary">management@mickala.com.au</span></p>

        <table className="w-full text-xs mb-8">
          <tbody>
            <tr><td className="font-semibold py-2 pr-4 w-40">Accepted by (name):</td><td className="border-b border-gray-300"></td></tr>
            <tr><td className="font-semibold py-2 pr-4">Signature:</td><td className="border-b border-gray-300"></td></tr>
            <tr><td className="font-semibold py-2 pr-4">Date:</td><td className="border-b border-gray-300"></td></tr>
          </tbody>
        </table>

        <hr className="border-primary mb-4" />
        <p className="text-center text-xs text-gray-400">Mickala Group | 1300 642 525 | management@mickala.com.au | www.mickalagroup.com.au</p>
      </div>
    </div>
  )
}
