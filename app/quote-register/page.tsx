"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, FileText, User, ChevronDown, ChevronUp, CalendarDays, Calendar, Clock, Filter } from "lucide-react"

interface QuoteItem {
  qty: number
  desc: string
  price: number
}

interface Quote {
  id: number
  customer: string
  date: string
  quote_type: string
  prepared_by: string
  status?: string
  items: QuoteItem[]
  total: number
  created_at: string
}

function parseDate(str: string): Date | null {
  if (!str) return null
  try {
    const d = new Date(str)
    if (!isNaN(d.getTime())) return d
  } catch {}
  return null
}

function inPeriod(dateStr: string, period: string): boolean {
  const d = parseDate(dateStr)
  if (!d) return period === "all"
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffDays = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))

  switch (period) {
    case "daily": return diffDays >= 0 && diffDays <= 1
    case "weekly": return diffDays >= 0 && diffDays <= 7
    case "monthly": return diffDays >= 0 && diffDays <= 30
    case "annual": return d.getFullYear() === now.getFullYear()
    default: return true
  }
}

const periods = [
  { key: "all", label: "All Time", icon: CalendarDays },
  { key: "daily", label: "Today", icon: Clock },
  { key: "weekly", label: "This Week", icon: Calendar },
  { key: "monthly", label: "This Month", icon: Calendar },
  { key: "annual", label: "This Year", icon: CalendarDays },
]

export default function QuoteRegisterPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")
  const [customerFilter, setCustomerFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
  const [updatingStatus, setUpdatingStatus] = useState<Record<number, boolean>>({})

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

  const customers = useMemo(() => {
    const set = new Set(quotes.map(q => q.customer?.trim() || "Unknown"))
    return ["all", ...Array.from(set).sort()]
  }, [quotes])

  const filtered = useMemo(() => {
    return quotes.filter(q => {
      const customer = q.customer?.trim() || "Unknown"
      if (customerFilter !== "all" && customer !== customerFilter) return false
      if (typeFilter !== "all" && !q.quote_type?.toLowerCase().includes(typeFilter)) return false
      if (statusFilter !== "all" && (q.status || "New") !== statusFilter) return false
      if (!inPeriod(q.date, periodFilter)) return false
      return true
    })
  }, [quotes, customerFilter, typeFilter, periodFilter])

  const totalValue = filtered.reduce((sum, q) => sum + (Number(q.total) || 0), 0)
  const typeCounts = useMemo(() => {
    const h = filtered.filter(q => q.quote_type?.toLowerCase().includes("hire")).length
    const p = filtered.filter(q => q.quote_type?.toLowerCase().includes("purchase")).length
    return { hire: h, purchase: p }
  }, [filtered])

  const periodCounts = useMemo(() => {
    const result: Record<string, number> = {}
    for (const p of periods) {
      result[p.key] = quotes.filter(q => inPeriod(q.date, p.key)).length
    }
    return result
  }, [quotes])

  const toggleExpand = (id: number) => setExpanded(p => ({ ...p, [id]: !p[id] }))

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdatingStatus(p => ({ ...p, [id]: true }))
    try {
      await fetch("/api/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q))
    } catch {}
    setUpdatingStatus(p => ({ ...p, [id]: false }))
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Nav */}
        <div className="flex justify-between items-center mb-6 no-print">
          <Link href="/operations" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-800">
            <ArrowLeft className="h-3 w-3 mr-1" /> Back to Operations
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FileText className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Image src="/logo-mickala.png" alt="Mickala" width={40} height={40} className="h-8 w-auto" />
                <span className="text-xs text-gray-400">Quote Register</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Register</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {customerFilter !== "all" ? `${customerFilter} — ` : ""}
                {filtered.length} quote{filtered.length !== 1 ? "s" : ""} · ${totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-lg font-bold text-gray-900">{filtered.length}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Filtered</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-lg font-bold text-green-700">${totalValue.toLocaleString()}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Total Value</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-lg font-bold text-blue-700">{typeCounts.purchase}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Purchase</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-lg font-bold text-amber-700">{typeCounts.hire}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Hire</div>
          </div>
        </div>

        {/* Period Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 p-3 mb-4 no-print">
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2 uppercase tracking-wider font-semibold">
            <CalendarDays className="h-3 w-3" /> Period
          </div>
          <div className="flex flex-wrap gap-1.5">
            {periods.map(p => {
              const count = periodCounts[p.key] ?? 0
              return (
                <button
                  key={p.key}
                  onClick={() => setPeriodFilter(p.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    periodFilter === p.key
                      ? "bg-primary text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <p.icon className="h-3 w-3" />
                  <span>{p.label}</span>
                  <span className={`text-[10px] ml-0.5 ${periodFilter === p.key ? "text-white/70" : "text-gray-400"}`}>
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-3 mb-4 no-print">
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2 uppercase tracking-wider font-semibold">
            <Filter className="h-3 w-3" /> Status
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: "all", label: "All" },
              { key: "New", label: "🆕 New" },
              { key: "Sent", label: "📤 Sent" },
              { key: "Following Up", label: "📞 Following Up" },
              { key: "Won", label: "✅ Won" },
              { key: "Lost", label: "❌ Lost" },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setStatusFilter(s.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === s.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Customer & Type Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 no-print">
          {/* Customer Filter */}
          <div className="bg-white rounded-xl border border-gray-100 p-3">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2 uppercase tracking-wider font-semibold">
              <User className="h-3 w-3" /> Customer
            </div>
            <div className="flex flex-wrap gap-1.5">
              {customers.map(c => {
                const count = c === "all" ? quotes.length : quotes.filter(q => (q.customer?.trim() || "Unknown") === c).length
                const label = c === "all" ? "All Customers" : c === "Unknown" ? "(No customer)" : c
                return (
                  <button
                    key={c}
                    onClick={() => setCustomerFilter(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      customerFilter === c
                        ? "bg-primary text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {label}
                    <span className={`text-[10px] ml-1 ${customerFilter === c ? "text-white/70" : "text-gray-400"}`}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Type Filter */}
          <div className="bg-white rounded-xl border border-gray-100 p-3">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2 uppercase tracking-wider font-semibold">
              <Filter className="h-3 w-3" /> Quote Type
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: "all", label: "All" },
                { key: "purchase", label: "Purchase" },
                { key: "hire", label: "Hire" },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    typeFilter === f.key
                      ? "bg-primary text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quote List */}
        {loading ? (
          <div className="text-center py-12 text-sm text-gray-400">Loading quotes...</div>
        ) : error ? (
          <div className="text-center py-12 text-sm text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No quotes match the current filters</p>
            <button onClick={() => { setPeriodFilter("all"); setCustomerFilter("all"); setTypeFilter("all") }}
              className="mt-3 text-xs text-primary hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((quote) => {
              const items = Array.isArray(quote.items) ? quote.items : []
              const isOpen = expanded[quote.id]

              return (
                <div key={quote.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                  <button
                    onClick={() => toggleExpand(quote.id)}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-bold text-primary">#{quote.id}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          quote.quote_type?.toLowerCase().includes("hire")
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {quote.quote_type || "Quote"}
                        </span>
                        <select
                          value={quote.status || "New"}
                          onChange={e => { e.stopPropagation(); updateStatus(quote.id, e.target.value); }}
                          onClick={e => e.stopPropagation()}
                          disabled={updatingStatus[quote.id]}
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border focus:outline-none cursor-pointer ${
                            (quote.status || "New") === "Won" ? "bg-green-50 text-green-700 border-green-200" :
                            (quote.status || "New") === "Lost" ? "bg-red-50 text-red-700 border-red-200" :
                            (quote.status || "New") === "Following Up" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-gray-50 text-gray-600 border-gray-200"
                          } disabled:opacity-50`}
                        >
                          <option value="New">🆕 New</option>
                          <option value="Sent">📤 Sent</option>
                          <option value="Following Up">📞 Following Up</option>

                          <option value="Won">✅ Won</option>
                          <option value="Lost">❌ Lost</option>
                        </select>
                        {items.length > 0 && (
                          <span className="text-[10px] text-gray-400">{items.length} item{items.length !== 1 ? "s" : ""}</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mt-0.5">{quote.customer?.trim() || "Unknown Customer"}</h3>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-400">
                        {quote.prepared_by && (
                          <span className="flex items-center gap-1"><User className="h-2.5 w-2.5" /> {quote.prepared_by}</span>
                        )}
                        <span>{quote.date || "—"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">${Number(quote.total || 0).toLocaleString()}</div>
                      </div>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100">
                      {items.length > 0 ? (
                        <div className="p-4">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-gray-100">
                                <th className="text-left py-1.5 pr-2 font-semibold text-gray-500 w-10">#</th>
                                <th className="text-left py-1.5 pr-2 font-semibold text-gray-500">Description</th>
                                <th className="text-right py-1.5 px-2 font-semibold text-gray-500 w-16">Qty</th>
                                <th className="text-right py-1.5 px-2 font-semibold text-gray-500 w-20">Unit Price</th>
                                <th className="text-right py-1.5 pl-2 font-semibold text-gray-500 w-20">Line Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((item, i) => {
                                const lineTotal = Number(item.qty || 0) * Number(item.price || 0)
                                return (
                                  <tr key={i} className="border-b border-gray-50 last:border-0">
                                    <td className="py-1.5 pr-2 text-gray-400 font-mono">{i + 1}</td>
                                    <td className="py-1.5 pr-2 text-gray-700 font-medium">{item.desc || "—"}</td>
                                    <td className="py-1.5 px-2 text-right text-gray-600">{item.qty || 0}</td>
                                    <td className="py-1.5 px-2 text-right text-gray-600">${Number(item.price || 0).toLocaleString()}</td>
                                    <td className="py-1.5 pl-2 text-right font-semibold text-gray-800">${lineTotal.toLocaleString()}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                            <tfoot>
                              <tr className="border-t border-gray-200">
                                <td colSpan={4} className="py-2 pr-2 text-right font-bold text-gray-800 text-sm">Total</td>
                                <td className="py-2 pl-2 text-right font-bold text-gray-900 text-sm">
                                  ${items.reduce((s, i) => s + (Number(i.qty) * Number(i.price)), 0).toLocaleString()}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      ) : (
                        <div className="p-4 text-[11px] text-gray-400 text-center italic">No item details recorded</div>
                      )}

                      <div className="bg-gray-50 px-4 py-2 flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-gray-500 border-t border-gray-100">
                        <span>Quote #: <strong>{quote.id}</strong></span>
                        <span>Type: <strong>{quote.quote_type || "—"}</strong></span>
                        <span>Date: <strong>{quote.date || "—"}</strong></span>
                        <span>Prepared by: <strong>{quote.prepared_by || "—"}</strong></span>
                        <span>Customer: <strong>{quote.customer?.trim() || "—"}</strong></span>
                        <span className="flex items-center gap-1">Status:
  <select
    value={quote.status || "New"}
    onChange={e => updateStatus(quote.id, e.target.value)}
    disabled={updatingStatus[quote.id]}
    className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 bg-white focus:outline-none focus:border-primary cursor-pointer hover:border-gray-300 disabled:opacity-50"
  >
    <option value="New">🆕 New</option>
    <option value="Sent">📤 Sent</option>
    <option value="Following Up">📞 Following Up</option>

    <option value="Won">✅ Won</option>
    <option value="Lost">❌ Lost</option>
  </select>
  {updatingStatus[quote.id] && <span className="text-[9px] text-gray-400">saving...</span>}
</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-[10px] text-gray-400">
          Mickala Group — Quote Register — Updated in real-time
        </div>
      </div>
    </div>
  )
}
