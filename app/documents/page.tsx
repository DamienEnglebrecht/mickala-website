"use client"

import Image from "next/image"
import Link from "next/link"
import { FileText, CreditCard, CalendarCheck, Shield } from "lucide-react"
import { useState } from "react"

const STAFF_PIN = "Mickala2026"

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

export default function DocumentsPage() {
  const [pin, setPin] = useState("")
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState("")

  const handlePin = () => {
    if (pin === STAFF_PIN) {
      setAuthed(true)
      setError("")
    } else {
      setError("Incorrect PIN. Contact Damien for access.")
      setPin("")
    }
  }

  if (!authed) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-border">
        <div className="text-center mb-6">
          <Image src="/logo-mickala.png" alt="Mickala Group" width={56} height={56} className="h-14 w-auto mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900">Mickala Staff Portal</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your staff PIN to access documents</p>
        </div>
        <input
          type="password"
          value={pin}
          onChange={e => { setPin(e.target.value); setError("") }}
          onKeyDown={e => e.key === "Enter" && handlePin()}
          placeholder="Staff PIN"
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 mb-1 ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
          autoFocus
        />
        {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
        {!error && <div className="mb-3" />}
        <button
          onClick={handlePin}
          disabled={!pin.trim()}
          className="w-full rounded-xl bg-red-600 text-white py-3 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          Access Portal
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-3">Mickala Group staff access only</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">

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
