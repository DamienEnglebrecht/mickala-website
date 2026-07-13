"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface QuoteItem {
  qty: number
  desc: string
  price: number
}

interface Quote {
  id: number
  customer: string
  customer_contact: string
  date: string
  quote_type: string
  prepared_by: string
  status: string
  items: QuoteItem[]
  total: number
  created_at: string
  delivery?: string
}

export default function TenderQuoteRegister() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sortField, setSortField] = useState<"id" | "customer" | "date" | "total" | "status">("id")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/quotes?limit=500")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setQuotes(data)
        else if (data.error) setError(data.error)
        setLoading(false)
      })
      .catch(() => { setError("Failed to load quotes"); setLoading(false) })
  }, [])

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(d => d === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const updateStatus = async (id: number, status: string) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q))
    try {
      await fetch("/api/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
    } catch (_) {}
  }

  const formatItems = (items: QuoteItem[]): string => {
    if (!items || items.length === 0) return "—"
    if (items.length === 1) {
      const i = items[0]
      return `${i.qty} x ${i.desc}`
    }
    // Group same items
    const descCount: Record<string, { qty: number; desc: string }> = {}
    items.forEach(i => {
      const key = i.desc
      if (descCount[key]) descCount[key].qty += i.qty
      else descCount[key] = { qty: i.qty, desc: i.desc }
    })
    return Object.values(descCount).map(g => `${g.qty} x ${g.desc}`).join("; ")
  }

  // Infer site from customer name
  const inferSite = (customer: string, items: QuoteItem[]): string => {
    const c = (customer || "").toLowerCase()
    if (c.includes("goonyella")) return "Goonyella"
    if (c.includes("saraji")) return "Saraji"
    if (c.includes("peak downs") || c.includes("peakdowns")) return "Peak Downs"
    if (c.includes("hail creek")) return "Hail Creek"
    if (c.includes("poitrel")) return "Poitrel"
    if (c.includes("bengalla")) return "Bengalla"
    if (c.includes("blair athol") || c.includes("terracom")) return "Blair Athol"
    if (c.includes("clermont")) return "Clermont"
    if (c.includes("walz")) return "—"
    return "—"
  }

  // Infer quote team from prepared_by initials
  const inferTeam = (pb: string): string => {
    if (!pb) return ""
    const l = pb.toLowerCase()
    if (l.includes("letisha") || l === "le") return "LE"
    if (l.includes("debbie") || l === "dp") return "DP"
    if (l.includes("damien") || l === "de") return "DE"
    if (l.includes("vern") || l === "vn") return "VN"
    if (l.includes("nick") || l === "nd") return "ND"
    return pb.substring(0, 2).toUpperCase()
  }

  const filtered = quotes.filter(q => {
    if (statusFilter !== "all" && q.status !== statusFilter) return false
    if (typeFilter !== "all") {
      const isHire = q.quote_type?.toLowerCase().includes("hire")
      if (typeFilter === "hire" && !isHire) return false
      if (typeFilter === "purchase" && isHire) return false
    }
    if (search) {
      const s = search.toLowerCase()
      const match = String(q.id).includes(s) ||
        (q.customer || "").toLowerCase().includes(s) ||
        (q.customer_contact || "").toLowerCase().includes(s)
      if (!match) return false
    }
    return true
  }).sort((a, b) => {
    let cmp = 0
    if (sortField === "id") cmp = a.id - b.id
    else if (sortField === "customer") cmp = (a.customer || "").localeCompare(b.customer || "")
    else if (sortField === "date") cmp = (a.date || "").localeCompare(b.date || "")
    else if (sortField === "total") cmp = (a.total || 0) - (b.total || 0)
    else if (sortField === "status") cmp = (a.status || "").localeCompare(b.status || "")
    return sortDir === "asc" ? cmp : -cmp
  })

  const totalValue = filtered.reduce((s, q) => s + (q.total || 0), 0)
  const wonValue = filtered.filter(q => q.status === "Won").reduce((s, q) => s + (q.total || 0), 0)

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading register...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/operations" className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <Image src="/logo-mickala.png" alt="Mickala" width={36} height={36} className="h-8 w-auto" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">QUOTE REGISTER</h1>
              <p className="text-xs text-gray-400">2026 Tender &amp; Quote Register</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">${totalValue.toLocaleString()}</div>
            <div className="text-xs text-gray-400">{filtered.length} quotes · ${wonValue.toLocaleString()} won</div>
          </div>
        </div>

        <button onClick={() => window.print()} className="mb-4 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 print:hidden">🖨️ Print</button>

        {/* FILTERS */}
        <div className="flex gap-3 mb-4 flex-wrap print:hidden">
          <input
            type="text"
            placeholder="Search by ref, customer, contact..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
            <option value="all">All Statuses</option>
            <option value="New">🆕 New</option>
            <option value="Sent">📤 Sent</option>
            <option value="Following Up">📞 Following Up</option>
            <option value="Won">✅ Won</option>
            <option value="Lost">❌ Lost</option>
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
            <option value="all">All Types</option>
            <option value="hire">Hire</option>
            <option value="purchase">Purchase</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-900 text-white">
                  {[
                    { key: "id", label: "MMM Ref No", w: "w-28" },
                    { key: "customer", label: "Client", w: "" },
                    { key: "customer", label: "Site", w: "w-28" },
                    { key: "customer", label: "Client Rep", w: "w-32" },
                    { key: "quote_type", label: "Type", w: "w-16" },
                    { key: "customer", label: "Quote Request Details", w: "min-w-[200px]" },
                    { key: "date", label: "Due Date", w: "w-24" },
                    { key: "prepared_by", label: "Team", w: "w-14" },
                    { key: "total", label: "Value", w: "w-20 text-right" },
                    { key: "status", label: "Status", w: "w-24" },
                  ].map(col => (
                    <th key={col.key}
                      onClick={() => toggleSort(col.key as any)}
                      className={`${col.w} text-left p-2 font-semibold cursor-pointer hover:bg-gray-800 select-none`}>
                      {col.label}
                      {sortField === col.key && <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={10} className="text-center py-12 text-gray-400 text-sm">No quotes found</td></tr>
                ) : (
                  filtered.map((q, i) => (
                    <tr key={q.id} className={`border-t border-gray-100 hover:bg-gray-50 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                      <td className="p-2 font-medium text-primary">MMMQ2026-{String(q.id).padStart(2, "0")}</td>
                      <td className="p-2 font-medium">{q.customer?.trim() || "—"}</td>
                      <td className="p-2 text-gray-500">{inferSite(q.customer || "", q.items || [])}</td>
                      <td className="p-2 text-gray-500">{q.customer_contact?.trim() || "—"}</td>
                      <td className="p-2">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          q.quote_type?.toLowerCase().includes("hire")
                            ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {q.quote_type?.includes("Hire") ? "Hire" : "Purchase"}
                        </span>
                      </td>
                      <td className="p-2 text-gray-600 max-w-[300px] truncate" title={formatItems(q.items || [])}>
                        {formatItems(q.items || [])}
                      </td>
                      <td className="p-2 text-gray-500">{q.date || "—"}</td>
                      <td className="p-2 text-gray-500">{inferTeam(q.prepared_by)}</td>
                      <td className="p-2 text-right font-semibold">${(q.total || 0).toLocaleString()}</td>
                      <td className="p-2">
                        <select
                          value={q.status || "New"}
                          onChange={e => { e.stopPropagation(); updateStatus(q.id, e.target.value) }}
                          onClick={e => e.stopPropagation()}
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border focus:outline-none cursor-pointer ${
                            (q.status || "New") === "Won" ? "bg-green-50 text-green-700 border-green-200" :
                            (q.status || "New") === "Lost" ? "bg-red-50 text-red-700 border-red-200" :
                            (q.status || "New") === "Following Up" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-gray-50 text-gray-600 border-gray-200"
                          }`}>
                          <option value="New">🆕 New</option>
                          <option value="Sent">📤 Sent</option>
                          <option value="Following Up">📞 Following Up</option>
                          <option value="Won">✅ Won</option>
                          <option value="Lost">❌ Lost</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER SUMMARY */}
        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-500 grid grid-cols-4 gap-4">
          <div><span className="font-semibold text-gray-700">Total Quotes:</span> {filtered.length}</div>
          <div><span className="font-semibold text-gray-700">Total Value:</span> ${totalValue.toLocaleString()}</div>
          <div><span className="font-semibold text-gray-700">Won:</span> ${wonValue.toLocaleString()}</div>
          <div><span className="font-semibold text-gray-700">Updated:</span> from create-quote tool</div>
        </div>
      </div>
    </div>
  )
}
