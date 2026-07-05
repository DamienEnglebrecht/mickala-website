"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

const trackedPaths = [
  "/documents", "/operations", "/quote", "/credit-application", "/hire-schedule",
  "/master-hire", "/warranty", "/warranty-procedure", "/purchase-warranty",
  "/pre-delivery-checklist", "/capability-statement", "/risk-assessment/design",
  "/risk-assessment/operational", "/gallery", "/payments", "/parts-manuals/fuel-trailer",
  "/spec-sheets", "/tracking-report", "/personal",
]

export function NameGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [name, setName] = useState<string | null>(null)
  const [inputName, setInputName] = useState("")
  const [showPrompt, setShowPrompt] = useState(false)
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("mickala_name")
    if (stored) {
      setName(stored)
      if (!trackedPaths.some(p => pathname.startsWith(p))) return
      if (logged) return
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pathname, visitor: stored })
      }).catch(() => {})
      setLogged(true)
    } else if (trackedPaths.some(p => pathname.startsWith(p))) {
      setShowPrompt(true)
    }
  }, [pathname])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = inputName.trim()
    if (!n) return
    localStorage.setItem("mickala_name", n)
    localStorage.setItem("visitor_name", n)
    setName(n)
    setShowPrompt(false)
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, visitor: n })
    }).catch(() => {})
  }

  const handleChange = () => {
    const n = prompt("Change name:", name || "")
    if (n && n.trim()) {
      localStorage.setItem("mickala_name", n.trim())
      localStorage.setItem("visitor_name", n.trim())
      setName(n.trim())
    }
  }

  if (showPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <Image src="/logo-mickala.png" alt="Mickala" width={56} height={56} className="h-14 w-auto mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-1">Mickala Documents</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your name to access company documents. This helps us track who's viewing what.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={inputName}
              onChange={e => setInputName(e.target.value)}
              placeholder="Your name"
              autoFocus
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button type="submit" className="w-full rounded-full bg-red-600 text-white py-3 text-sm font-semibold hover:bg-red-700 transition-colors">
              Continue
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      {name && (
        <div className="fixed bottom-3 left-3 z-50 no-print">
          <button
            onClick={handleChange}
            className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 text-[10px] text-gray-500 hover:text-gray-800 shadow-sm hover:shadow transition-all"
            title="Click to change name"
          >
            <span className="h-2 w-2 rounded-full bg-green-400" />
            {name}
          </button>
        </div>
      )}
      {children}
    </>
  )
}
