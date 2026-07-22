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
    { name: "Fuel Trailer Single Axle 1200 Litre", desc: "Single axle fuel trailer" },
    { name: "Fuel Trailer Dual Axle 2000 Litre", desc: "Dual axle fuel trailer" },
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
  "This quotation is bound by the Mickala Standard Terms and Conditions available at mickalagroup.com.au/standard-terms",
  "No allowance for mobilisation / demobilisation to site.",
  "Payment terms: 30 days EOM.",
  "Prices may be reviewed annually and adjusted in line with CPI or operating cost increases, subject to agreement by both parties.",
  "All pricing is GST exclusive.",
]

const purchaseClarifications = [
  "The pricing provided is based on the quantities outlined in the quotation. Should these quantities change, our pricing may vary.",
  "Service kits to be purchased through Mickala for the duration of the warranty period (12 months or 1500 hours). Mickala offers extended warranty if Mickala Service Agreement (MSA) is applied. Extended warranty period would be 36 months or 6000 hours with MSA.",
  "The pricing provided is based on the specifications supplied. Should the specifications change, our pricing may vary.",
  "Mickala provides full OEM support of Mickala LED Lighting Towers. Mickala will provide factory trained technician for any technical support required.",
  "Areas of responsibility (Service, Repair and Maintenance) are in accordance with Mickala Lighting Tower standard conditions. Please contact our office if you wish to obtain a copy.",
  "Any changes in site compliance requirements and costs after the quotation date will be the responsibility of the client.",
  "This quotation remains valid for a period of 30 days from the date specified and is subject to adjustment thereafter.",
  "This quotation is bound by the Mickala Standard Terms and Conditions available at mickalagroup.com.au/standard-terms",
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
  const [customTerms, setCustomTerms] = useState("")
  const [useCustomTerms, setUseCustomTerms] = useState(false)
  const [preparedBy, setPreparedBy] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const [specModel, setSpecModel] = useState<string | null>(null)
  const [quoteType, setQuoteType] = useState("Purchase Quote")
  const [status, setStatus] = useState("New")
  const [focusedPrice, setFocusedPrice] = useState<number | null>(null)
  const [displayPrice, setDisplayPrice] = useState<Record<number, string>>({})
  const [showLoadPanel, setShowLoadPanel] = useState(false)
  const [savedQuotes, setSavedQuotes] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [delivery, setDelivery] = useState("FOB Paget QLD Depot")

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
      const items = {
        line_items: rows.map(r => ({ desc: r.desc, qty: r.qty, price: r.price })),
        _meta: {
          hire_from: hireFrom,
          hire_to: hireTo,
          payment_terms: paymentTerms,
          delivery: delivery,
        }
      }
      await fetch('/api/save-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: quoteNum, customer, customer_contact: customerContact, date, quote_type: quoteType, items, total: subtotal, prepared_by: preparedBy, status, delivery }),
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
    setHireFrom("")
    setHireTo("")
    setPaymentTerms("Payment: 100% prior to delivery / 30 days from invoice (subject to approved credit terms).")
    setCustomTerms("")
    setUseCustomTerms(false)
    setPreparedBy("")
    setStatus("New")
    setQuoteType("Purchase Quote")
    setDelivery("FOB Paget QLD Depot")
  }

  const loadQuotes = async () => {
    try {
      const res = await fetch("/api/quotes?limit=100")
      const data = await res.json()
      if (Array.isArray(data)) {
        setSavedQuotes(data)
        setShowLoadPanel(true)
        setSearchTerm("")
      }
    } catch (_) { /* silently fail */ }
  }

  const applyQuote = (q: any) => {
    setQuoteNum(q.id)
    setCustomer(q.customer || "")
    setCustomerContact(q.customer_contact || "")
    setDate(q.date || "")
    setQuoteType(q.quote_type || "Purchase Quote")
    setPreparedBy(q.prepared_by || "")
    setStatus(q.status || "New")
    setDelivery(q.delivery || "FOB Paget QLD Depot")
    // Extract items and metadata from the items JSONB field
    if (q.items) {
      let itemsData: any = q.items
      // Normalize: support multiple storage formats that may exist in the DB
      if (Array.isArray(itemsData)) {
        // Format 1: Plain array (oldest format)
        itemsData = { line_items: itemsData, _meta: {} }
      } else if (typeof itemsData === 'object' && !itemsData.line_items && !itemsData._meta) {
        // Format 2: Object without line_items/_meta — unlikely but handle gracefully
        itemsData = { line_items: [itemsData], _meta: {} }
      }
      // Format 3: { line_items: [...], _meta: {...} } — correct format, use as-is

      // Handle legacy double-wrapped data (buggy save API used to wrap items again):
      // If line_items is an object with its own line_items, it was double-wrapped
      if (typeof itemsData.line_items === 'object' && !Array.isArray(itemsData.line_items) && itemsData.line_items?.line_items) {
        // Extract from double-wrapped: { line_items: { line_items: [...], _meta: {...} }, _meta: {} }
        const inner = itemsData.line_items
        itemsData = {
          line_items: inner.line_items || [],
          _meta: inner._meta || itemsData._meta || {}
        }
      }

      const meta = itemsData._meta || {}
      const lineItems = Array.isArray(itemsData.line_items) ? itemsData.line_items : (Array.isArray(q.items) ? q.items : [])
      setHireFrom(meta.hire_from || "")
      setHireTo(meta.hire_to || "")
      setPaymentTerms(meta.payment_terms || "Payment: 100% prior to delivery / 30 days from invoice (subject to approved credit terms).")
      setDelivery(meta.delivery || q.delivery || "FOB Paget QLD Depot")
      setRows(lineItems.map((item: any, i: number) => ({ id: i + 1, desc: item.desc || "", qty: item.qty || 1, price: item.price || 0 })))
    } else {
      setHireFrom("")
      setHireTo("")
      setPaymentTerms("Payment: 100% prior to delivery / 30 days from invoice (subject to approved credit terms).")
      setRows([{ id: 1, desc: "", qty: 1, price: 0 }])
    }
    setShowLoadPanel(false)
  }

  const subtotal = rows.reduce((s, r) => s + r.qty * Number(r.price), 0)

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white print:p-0">
      <style>{`
        @media print{@page{margin:12mm 8mm}body{min-width:auto!important}
          .quote-content table, .quote-content tr, .quote-content td, .quote-content th,
          .quote-content input, .quote-content select, .quote-content textarea { border: none !important; }
          .quote-content td, .quote-content th { padding: 2px 4px !important; }
        }
        .quote-content * { font-optical-sizing: auto !important; font-variation-settings: 'slnt' 0 !important; }
        .quote-content { font-optical-sizing: auto; }
        .quote-content input, .quote-content textarea, .quote-content select, .quote-content td { font-size: 9px !important; }
        .quote-content th { font-size: 9px !important; }
      `}</style>
      <div className="quote-content max-w-5xl mx-auto p-4 sm:p-8 print:max-w-full print:mx-0 print:px-4 print:py-2">

      {/* Print / Details Buttons */}
        <div className="flex gap-3 mb-6 print:hidden">
          <button onClick={handlePrint} className="rounded-full bg-primary text-white px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">Print / Save PDF</button>
          <button onClick={newQuote} className="rounded-full bg-green-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-green-700 transition-colors">+ New Quote</button>
          <button onClick={loadQuotes} className="rounded-full bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors">📂 Load Quote</button>
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
            onChange={async e => {
              const newStatus = e.target.value
              setStatus(newStatus)
              // Also persist to database
              try {
                const itemsPayload = {
                  line_items: rows.map(r => ({ desc: r.desc, qty: r.qty, price: r.price })),
                  _meta: {
                    hire_from: hireFrom,
                    hire_to: hireTo,
                    payment_terms: paymentTerms,
                    delivery: delivery,
                  }
                }
                await fetch('/api/save-quote', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: quoteNum, customer, customer_contact: customerContact, date, quote_type: quoteType, items: itemsPayload, total: subtotal, prepared_by: preparedBy, status: newStatus, delivery }),
                })
              } catch (_) { /* silently fail */ }
            }}
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
            <tr><td className="font-semibold py-1 pr-4 w-40">Quote Reference</td><td className="text-left">MMMQ{new Date().getFullYear()}-<input type="number" value={quoteNum} onChange={e => setQuoteNum(Number(e.target.value))} className="border-b border-dashed border-gray-300 bg-transparent w-20 px-1 py-0.5 text-sm font-semibold text-primary focus:outline-none focus:border-primary print:border-none inline" style={{width:"3rem"}} /></td></tr>
            <tr><td className="font-semibold py-1 pr-4">Date</td><td className="text-left">{date}</td></tr>
            {quoteType === "Hire Quote" && (
              <>
                <tr><td className="font-semibold py-1 pr-4">Hire Period From</td><td className="text-left"><input type="date" value={hireFrom} onChange={e => setHireFrom(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary print:border-none" /></td></tr>
                <tr><td className="font-semibold py-1 pr-4">Hire Period To</td><td className="text-left"><input type="date" value={hireTo} onChange={e => setHireTo(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary print:border-none" /></td></tr>
              </>
            )}
            <tr><td className="font-semibold py-1 pr-4">Prepared For</td>
              <td className="text-left"><input type="text" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Customer name" className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary print:border-none text-left" /></td></tr>
            <tr><td className="font-semibold py-1 pr-4">Customer Contact</td>
              <td className="text-left"><input type="text" value={customerContact} onChange={e => setCustomerContact(e.target.value)} placeholder="Contact name" className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary print:border-none text-left" /></td></tr>
            <tr><td className="font-semibold py-1 pr-4">Valid Until</td><td className="text-left">{new Date(Date.now() + 30*86400000).toLocaleDateString("en-AU", {day:"numeric", month:"long", year:"numeric"})}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Payment Terms</td>
              <td className="text-left">
                {useCustomTerms ? (
                  <input type="text" value={customTerms} onChange={e => { setCustomTerms(e.target.value); setPaymentTerms(e.target.value) }} placeholder="Type custom payment terms..." className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary print:border-none text-left" />
                ) : (
                  <select value={paymentTerms} onChange={e => {
                    if (e.target.value === "Custom...") {
                      setUseCustomTerms(true)
                      setPaymentTerms("")
                    } else {
                      setPaymentTerms(e.target.value)
                    }
                  }} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary cursor-pointer print:border-none text-left">
                    <option value="Payment 100% Prior To Delivery">Payment 100% Prior To Delivery</option>
                    <option value="30 Days from Invoice Date">30 Days from Invoice Date</option>
                    <option value="7 Days">7 Days</option>
                    <option value="Cash Sale">Cash Sale</option>
                    <option value="Custom...">Custom...</option>
                  </select>
                )}
                {useCustomTerms && (
                  <button onClick={() => { setUseCustomTerms(false); setPaymentTerms("Payment 100% Prior To Delivery") }} className="text-xs text-primary hover:underline mt-1">← Back to presets</button>
                )}
              </td></tr>
            <tr><td className="font-semibold py-1 pr-4">Delivery</td>
              <td className="text-left">
                <select value={delivery} onChange={e => setDelivery(e.target.value)} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary cursor-pointer print:border-none text-left">
                  <option value="FOB Paget QLD Depot">FOB Paget QLD Depot</option>
                  <option value="Delivered — Site (Quoted Separately)">Delivered — Site (Quoted Separately)</option>
                  <option value="Ex-Works — China">Ex-Works — China</option>
                  <option value="FOB Shanghai">FOB Shanghai</option>
                  <option value="CIF — Australian Port">CIF — Australian Port</option>
                  <option value="DDP — Customer Site">DDP — Customer Site</option>
                  <option value="Customer Pick Up">Customer Pick Up</option>
                  <option value="Custom...">Custom...</option>
                </select>
                {delivery === "Custom..." && (
                  <input type="text" value="" onChange={e => setDelivery(e.target.value)} placeholder="Type delivery terms..." className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-sm focus:outline-none focus:border-primary print:border-none mt-1 text-left" autoFocus />
                )}
              </td></tr>
          </tbody>
        </table>

        <hr className="border-primary mb-6" />

        {/* PRICING TABLE */}
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 text-center">Quoted Items</h2>
        <table className="w-full text-xs mb-6 border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="text-left p-2 font-semibold w-8">#</th>
              <th className="text-left p-2 font-semibold">Description</th>
              <th className="text-center p-2 font-semibold w-20">Qty</th>
              <th className="text-center p-2 font-semibold w-28">Unit Price</th>
              <th className="text-center p-2 font-semibold w-28">Total</th>
              <th className="w-8 p-2 print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b border-gray-200">
                <td className="p-1.5 text-gray-400">{i + 1}</td>
                <td className="p-1.5">
                  <div className="flex gap-1">
                    <input type="text" value={r.desc} onChange={e => updateRow(r.id, "desc", e.target.value)} placeholder="Select or type..." list={"models-" + r.id} className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 text-xs focus:outline-none focus:border-primary print:border-none" />
                    <datalist id={"models-" + r.id}>
                      {allItems.map(m => (
                        <option key={m.name} value={m.name} />
                      ))}
                    </datalist>
                  </div>
                </td>
                <td className="p-1.5 text-center"><input type="number" value={r.qty} onChange={e => updateRow(r.id, "qty", parseInt(e.target.value) || 0)} className="w-16 text-center border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-primary print:border-none" /></td>
                <td className="p-1.5 text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-gray-400">$</span>
                    <input type="text" inputMode="decimal"
                      value={focusedPrice === r.id ? displayPrice[r.id] ?? (r.price === 0 ? '' : String(r.price)) : (r.price === 0 ? '' : r.price.toFixed(2))}
                      onChange={e => {
                        // Allow commas and periods, convert commas to periods
                        let v = e.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.');
                        // Only keep first decimal point
                        const dot = v.indexOf('.');
                        if (dot >= 0) v = v.slice(0, dot + 1) + v.slice(dot + 1).replace(/\./g, '');
                        // Store raw display value so cursor doesn't jump
                        setDisplayPrice(prev => ({...prev, [r.id]: v}));
                        updateRow(r.id, "price", v === '' ? 0 : parseFloat(v) || 0);
                      }}
                      onFocus={() => { setFocusedPrice(r.id); }}
                      onBlur={() => { setFocusedPrice(null); setDisplayPrice(prev => { const n = {...prev}; delete n[r.id]; return n; }); }}
                      className="w-20 text-center border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-primary print:border-none" />
                  </div>
                </td>
                <td className="p-1.5 text-center font-medium">${(r.qty * Number(r.price)).toFixed(2)}</td>
                <td className="p-1.5 print:hidden">
                  <button onClick={() => removeRow(r.id)} className="text-red-500 hover:text-red-700 text-xs">&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={4} className="p-2 text-left font-bold">Subtotal (ex GST)</td>
              <td className="p-2 text-center font-bold">${subtotal.toFixed(2)}</td>
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

      {/* ===== LOAD QUOTE PANEL ===== */}
      {showLoadPanel && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm pt-12">
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Load Existing Quote</h2>
              <button onClick={() => setShowLoadPanel(false)} className="text-gray-400 hover:text-gray-700 text-xl font-bold">&times;</button>
            </div>
            <input
              type="text"
              placeholder="Search by quote number, customer name, or contact..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
              autoFocus
            />
            <div className="flex-1 overflow-y-auto space-y-2">
              {savedQuotes
                .filter((q: any) =>
                  !searchTerm ||
                  String(q.id).includes(searchTerm) ||
                  (q.customer || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (q.customer_contact || "").toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a: any, b: any) => b.id - a.id)
                .map((q: any) => (
                  <div
                    key={q.id}
                    onClick={() => applyQuote(q)}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-primary hover:bg-red-50 transition-all"
                  >
                    <div>
                      <span className="font-semibold text-sm">#{q.id}</span>
                      <span className="text-sm text-gray-500 ml-3">{q.customer || "No customer"}</span>
                      {(q.customer_contact) && <span className="text-xs text-gray-400 ml-2">— {q.customer_contact}</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${
                        q.status === "Won" ? "bg-green-100 text-green-700" :
                        q.status === "Lost" ? "bg-red-100 text-red-700" :
                        q.status === "Sent" ? "bg-blue-100 text-blue-700" :
                        q.status === "Following Up" ? "bg-amber-100 text-amber-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{q.status || "New"}</span>
                      <span>{q.date || ""}</span>
                      <span className="font-medium text-gray-700">${(q.total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              {savedQuotes.filter((q: any) =>
                !searchTerm ||
                String(q.id).includes(searchTerm) ||
                (q.customer || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (q.customer_contact || "").toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
                <p className="text-center text-gray-400 py-8 text-sm">No quotes found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
