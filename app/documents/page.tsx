"use client"

import Image from "next/image"
import Link from "next/link"
import { FileText, CreditCard, CalendarCheck, Shield, User, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"

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

const sections = [
  {
    title: "Quoting & Sales",
    items: [
      { name: "Credit Application", desc: "Credit account application — 8 step online form.", href: "/credit-application" },
      { name: "Create Quote", desc: "Build, print and save professional quotes.", href: "/create-quote" },
      { name: "Hire Schedule", desc: "Equipment hire agreement — 4 step online form.", href: "/hire-schedule" },
    ],
  },
  {
    title: "Risk Assessments",
    items: [
      { name: "Design Risk Assessment", desc: "49 hazards across 6 lifecycle phases.", href: "/risk-assessment/design" },
      { name: "Operational Risk Assessment", desc: "27 hazards across 3 operational phases.", href: "/risk-assessment/operational" },
    ],
  },
  {
    title: "Lighting Tower Documents",
    items: [
      { name: "Standard Terms & Conditions", desc: "Mickala hire terms — cleaning, damage, return conditions. MM-LE-TP-001.", href: "/standard-terms" },
      { name: "Operation & Maintenance Manual (MLT LED)", desc: "57-page service, maintenance and operation guide. MM-OP-BI-001.", href: "/parts-manuals/operation-maintenance" },
      { name: "Warranty Claim", desc: "Submit a warranty claim — online form.", href: "/warranty" },
      { name: "Warranty Procedure", desc: "Internal warranty claim process.", href: "/warranty-procedure" },
      { name: "Purchase Letter & Warranty", desc: "Purchase letter, warranty registration.", href: "/purchase-warranty" },
      { name: "Pre-Delivery Checklist", desc: "Pre-delivery inspection checklist.", href: "/pre-delivery-checklist" },
      { name: "Capability Statement", desc: "Full company capability statement.", href: "/capability-statement" },
    ],
  },
  {
    title: "Sincro / Alternator",
    items: [
      { name: "DC Alternators — Sincro Manual", desc: "DC alternator installation, operation and maintenance manual. PDF download.", href: "/documents/DC-ALTERNATORS-SINCRO-MANUAL.pdf" },
    ],
  },
]

export default function DocumentsPage() {
  const [visitor, setVisitor] = useState("")
  const [showPrompt, setShowPrompt] = useState(false)
  const [blocked, setBlocked] = useState(true)

  // Quote register state
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loadingQuotes, setLoadingQuotes] = useState(true)
  const [error, setError] = useState("")
  const [sortField, setSortField] = useState<"id" | "customer" | "date" | "total" | "status">("id")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [registerOpen, setRegisterOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("mickala_visitor")
    if (saved) {
      setVisitor(saved)
      setBlocked(false)
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname, visitor: saved })
      }).catch(() => {})
    } else {
      setShowPrompt(true)
      setBlocked(true)
    }
  }, [])

  useEffect(() => {
    if (!blocked && registerOpen) {
      setLoadingQuotes(true)
      fetch("/api/quotes?limit=500")
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) setQuotes(data)
          else if (data.error) setError(data.error)
          setLoadingQuotes(false)
        })
        .catch(() => { setError("Failed to load quotes"); setLoadingQuotes(false) })
    }
  }, [blocked, registerOpen])

  const saveVisitor = () => {
    const name = visitor.trim()
    if (name) {
      localStorage.setItem("mickala_visitor", name)
      setShowPrompt(false)
      setBlocked(false)
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname, visitor: name })
      }).catch(() => {})
    }
  }

  const changeVisitor = () => {
    localStorage.removeItem("mickala_visitor")
    setVisitor("")
    setBlocked(true)
    setShowPrompt(true)
  }

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
    const descCount: Record<string, { qty: number; desc: string }> = {}
    items.forEach(i => {
      const key = i.desc
      if (descCount[key]) descCount[key].qty += i.qty
      else descCount[key] = { qty: i.qty, desc: i.desc }
    })
    return Object.values(descCount).map(g => `${g.qty} x ${g.desc}`).join("; ")
  }

  const inferSite = (customer: string): string => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Name Prompt Modal — BLOCKING */}
      {showPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mx-auto mb-4">
                <User className="h-6 w-6 text-red-600" />
              </span>
              <h2 className="text-lg font-bold text-gray-900">Welcome to Mickala Documents</h2>
              <p className="text-sm text-gray-500 mt-1">Enter your name to access company documents</p>
            </div>
            <input
              type="text"
              value={visitor}
              onChange={(e) => setVisitor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveVisitor()}
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 mb-4"
              autoFocus
            />
            <button
              onClick={saveVisitor}
              disabled={!visitor.trim()}
              className="w-full rounded-xl bg-red-600 text-white py-3 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ===== PAGE CONTENT ===== */}
      {!blocked && (
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        {/* Visitor badge */}
        {visitor && (
          <div className="flex items-center justify-end gap-2 mb-4 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{visitor}</span>
            <button
              onClick={changeVisitor}
              className="underline hover:text-red-600 ml-2"
            >
              Change
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <Image src="/logo-mickala.png" alt="Mickala Group" width={60} height={60} className="mb-4 mx-auto" priority />
          <h1 className="text-4xl font-extrabold tracking-tight">Mickala Group</h1>
          <p className="text-lg text-muted-foreground mt-2">Documents &amp; Tools</p>
        </div>

        {/* Document grid */}
        <div className="grid gap-8 max-w-5xl mx-auto">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">{section.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => {
                  const Icon = [FileText, CreditCard, CalendarCheck, Shield][Math.floor(Math.random() * 4)] || FileText
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        fetch("/api/track", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ page: item.href, visitor })
                        }).catch(() => {})
                      }}
                      className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ====== QUOTE REGISTER SECTION ====== */}
        <div className="mt-12 border-t border-border pt-8">
          <button
            onClick={() => setRegisterOpen(!registerOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">Quote Register</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {registerOpen ? "Click to hide" : "Click to open — 2026 Tender & Quote Register"}
              </p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {registerOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </span>
          </button>

          {registerOpen && (
            <div className="mt-6">
              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-400">Total Quotes</p>
                  <p className="text-xl font-bold text-gray-900">{loadingQuotes ? "..." : filtered.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-400">Total Value</p>
                  <p className="text-xl font-bold text-primary">{loadingQuotes ? "..." : `$${totalValue.toLocaleString()}`}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-400">Won Value</p>
                  <p className="text-xl font-bold text-green-600">{loadingQuotes ? "..." : `$${wonValue.toLocaleString()}`}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-400">Updated</p>
                  <p className="text-xl font-bold text-gray-900">Live</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3 mb-4 flex-wrap">
                <input
                  type="text"
                  placeholder="Search by ref, customer, contact..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Sent">Sent</option>
                  <option value="Following Up">Following Up</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                  <option value="all">All Types</option>
                  <option value="hire">Hire</option>
                  <option value="purchase">Purchase</option>
                </select>
                <button onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90">
                  Print
                </button>
              </div>

              {/* Table */}
              {loadingQuotes ? (
                <div className="text-center py-12 text-gray-400 text-sm">Loading register...</div>
              ) : error ? (
                <div className="text-center py-12 text-red-500 text-sm">{error}</div>
              ) : (
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
                            { key: "customer", label: "Details", w: "min-w-[200px]" },
                            { key: "date", label: "Due Date", w: "w-24" },
                            { key: "prepared_by", label: "Team", w: "w-14" },
                            { key: "total", label: "Value", w: "w-20" },
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
                              <td className="p-2 text-gray-500">{inferSite(q.customer || "")}</td>
                              <td className="p-2 text-gray-500">{q.customer_contact?.trim() || "—"}</td>
                              <td className="p-2">
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                  q.quote_type?.toLowerCase().includes("hire")
                                    ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                                }`}>
                                  {q.quote_type?.includes("Hire") ? "Hire" : "Purchase"}
                                </span>
                              </td>
                              <td className="p-2 text-gray-600 max-w-[280px] truncate" title={formatItems(q.items || [])}>
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
                                  <option value="New">New</option>
                                  <option value="Sent">Sent</option>
                                  <option value="Following Up">Following Up</option>
                                  <option value="Won">Won</option>
                                  <option value="Lost">Lost</option>
                                </select>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          Mickala Group &middot; 21 Caterpillar Drive, Paget QLD 4740 &middot; 1300 642 525
        </div>
      </div>
      )}
    </div>
  )
}
