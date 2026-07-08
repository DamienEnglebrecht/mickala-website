"use client"

import Image from "next/image"
import Link from "next/link"
import { FileText, CreditCard, CalendarCheck, Shield, ArrowRight, User } from "lucide-react"
import { useState, useEffect } from "react"

const sections = [
  {
    title: "Quoting & Sales",
    items: [
      { name: "Create Quote", desc: "Build, print and save professional quotes.", href: "/create-quote" },
      { name: "Credit Application", desc: "Credit account application — 8 step online form.", href: "/credit-application" },
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

  useEffect(() => {
    const saved = localStorage.getItem("mickala_visitor")
    if (saved) {
      setVisitor(saved)
      // Track this visit
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname, visitor: saved })
      }).catch(() => {})
    } else {
      setShowPrompt(true)
    }
  }, [])

  const saveVisitor = () => {
    const name = visitor.trim()
    if (name) {
      localStorage.setItem("mickala_visitor", name)
      setShowPrompt(false)
      // Track this visit with name
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname, visitor: name })
      }).catch(() => {})
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Name Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mx-auto mb-4">
                <User className="h-6 w-6 text-red-600" />
              </span>
              <h2 className="text-lg font-bold text-gray-900">Welcome to Mickala Documents</h2>
              <p className="text-sm text-gray-500 mt-1">Enter your name to continue</p>
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

      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* Visitor badge */}
        {visitor && (
          <div className="flex items-center justify-end gap-2 mb-4 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{visitor}</span>
            <button
              onClick={() => { localStorage.removeItem("mickala_visitor"); setVisitor(""); setShowPrompt(true) }}
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
          <p className="text-lg text-muted-foreground mt-2">Quoting &amp; Sales Tools</p>
        </div>

        <div className="grid gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">{section.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, idx) => {
                  const Icon = [FileText, CreditCard, CalendarCheck, Shield, Shield][idx] || FileText
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
    </div>
  )
}
