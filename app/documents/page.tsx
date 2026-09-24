"use client"

import Image from "next/image"
import Link from "next/link"
import { FileText, CreditCard, CalendarCheck, Shield, User } from "lucide-react"
import { useState, useEffect } from "react"

const sections = [
  {
    title: "Quoting & Sales",
    items: [
      { name: "Credit Application", desc: "Credit account application — 9 step online form.", href: "/credit-application" },
      { name: "Create Quote", desc: "Build, print and save professional quotes.", href: "/create-quote" },
      { name: "Quote Register", desc: "2026 Tender & Quote Register — view, search, update status.", href: "/quoting/register" },
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

const STAFF_PIN = "Mickala2026"

export default function DocumentsPage() {
  const [visitor, setVisitor] = useState("")
  const [pin, setPin] = useState("")
  const [pinError, setPinError] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [blocked, setBlocked] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("mickala_visitor")
    const auth = sessionStorage.getItem("mickala_docs_auth")
    if (saved && auth === "1") {
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

  const saveVisitor = () => {
    const name = visitor.trim()
    if (!name) return
    if (pin !== STAFF_PIN) {
      setPinError(true)
      return
    }
    localStorage.setItem("mickala_visitor", name)
    sessionStorage.setItem("mickala_docs_auth", "1")
    setShowPrompt(false)
    setBlocked(false)
    setPinError(false)
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname, visitor: name })
    }).catch(() => {})
  }

  const changeVisitor = () => {
    localStorage.removeItem("mickala_visitor")
    sessionStorage.removeItem("mickala_docs_auth")
    setVisitor("")
    setPin("")
    setPinError(false)
    setBlocked(true)
    setShowPrompt(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Name Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mx-auto mb-4">
                <User className="h-6 w-6 text-red-600" />
              </span>
              <h2 className="text-lg font-bold text-gray-900">Mickala Staff Portal</h2>
              <p className="text-sm text-gray-500 mt-1">Enter your name and staff PIN to access documents</p>
            </div>
            <input
              type="text"
              value={visitor}
              onChange={(e) => setVisitor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveVisitor()}
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 mb-3"
              autoFocus
            />
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false) }}
              onKeyDown={(e) => e.key === "Enter" && saveVisitor()}
              placeholder="Staff PIN"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 mb-1 ${pinError ? "border-red-500 bg-red-50" : "border-gray-200"}`}
            />
            {pinError && <p className="text-xs text-red-600 mb-3">Incorrect PIN. Please check with your manager.</p>}
            {!pinError && <div className="mb-3" />}
            <button
              onClick={saveVisitor}
              disabled={!visitor.trim() || !pin}
              className="w-full rounded-xl bg-red-600 text-white py-3 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Access Documents
            </button>
          </div>
        </div>
      )}

      {/* ===== PAGE CONTENT ===== */}
      {!blocked && (
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
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
        <div className="grid gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">{section.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => {
                  const icons = [FileText, CreditCard, CalendarCheck, Shield]
                  const Icon = icons[Math.floor(Math.random() * icons.length)]
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

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          Mickala Group &middot; 21 Caterpillar Drive, Paget QLD 4740 &middot; 1300 642 525
        </div>
      </div>
      )}
    </div>
  )
}
