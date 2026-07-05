"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  BarChart3, ClipboardList, Package, Wrench, Building2, Truck, 
  Fuel, Lightbulb, Settings, FileText, Shield, 
  ChevronRight, ArrowLeft, Calendar, Shirt, MapPin, Car, Search,
  Lock
} from "lucide-react"

const sections = [
  {
    title: "Operations Dashboard",
    forms: [
      { name: "Quote Register", href: "/quote-register", icon: BarChart3, desc: "All quotes created through the system" },
      { name: "Daily Pre-Start Meeting", href: "/operations/pre-start-meeting", icon: Calendar, desc: "Daily team pre-start and task allocation" },
      { name: "Safety Interaction", href: "/operations/safety-interaction", icon: FileText, desc: "Record safety observations" },
      { name: "Pre-Delivery Checklist", href: "/pre-delivery-checklist", icon: ClipboardList, desc: "Pre-delivery inspection checklist" },
      { name: "Pre Hire Inspection Report", href: "/operations/pre-hire-inspection", icon: Search, desc: "Pre-hire condition assessment" },
      { name: "500 Hour Plant Service Report", href: "/operations/500-hour-service", icon: Settings, desc: "500/1000/1500/2000hr scheduled service record" },
      { name: "LED Lighting Tower Onsite Audit", href: "/operations/onsite-audit", icon: Shield, desc: "Site compliance audit" },
      { name: "LED Lighting Tower Build Record", href: "/operations/build-record", icon: Lightbulb, desc: "New build record for each tower" },
      { name: "Motor Vehicle Inspection Report", href: "/operations/vehicle-inspection", icon: Car, desc: "Daily vehicle safety inspection" },
      { name: "Fuel Trailer Servicing Report", href: "/operations/fuel-trailer-service", icon: Fuel, desc: "6-weekly service inspection" },
      { name: "GPS Equipment Installation Report", href: "/operations/gps-installation", icon: MapPin, desc: "GPS install and commissioning record" },
      { name: "Uniform Request Form", href: "/operations/uniform-request", icon: Shirt, desc: "Staff uniform ordering" },
      { name: "Parts Request Form", href: "/operations/parts-request", icon: Package, desc: "Request parts from stores" },
      { name: "Repair Report", href: "/operations/repair-report", icon: Wrench, desc: "Record repairs completed on equipment" },
      { name: "MLT Crib Huts / Shipping Containers", href: "/operations/crib-huts", icon: Building2, desc: "Crib hut inventory and dispatch" },
      { name: "Consignment Note", href: "/operations/consignment", icon: Truck, desc: "Goods dispatch record" },
      { name: "Manufacturing Parts Assemblies", href: "/operations/parts-assemblies", icon: Settings, desc: "Parts and assembly tracking" },
    ]
  }
]

export default function OperationsPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("mickala_ops_auth")
    if (stored === "true") setAuthed(true)
    setLoading(false)
  }, [])

  const handleLogin = () => {
    const storedPw = localStorage.getItem("mickala_ops_password") || "Mickala2026"
    if (pw === storedPw) {
      localStorage.setItem("mickala_ops_auth", "true")
      setAuthed(true)
    } else {
      alert("Incorrect password")
    }
  }

  if (loading) return null

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-center mb-1">Mickala Operations</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Staff access only — enter password</p>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-red-600"
          />
          <button onClick={handleLogin} className="w-full bg-red-600 text-white rounded-full py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors">
            Unlock
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">Mickala Group — Staff Only</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/documents" className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <span className="text-xs text-gray-400">|</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600">Mickala Operations</span>
          <span className="ml-auto">
            <button onClick={() => { localStorage.removeItem("mickala_ops_auth"); setAuthed(false) }} className="text-[10px] text-gray-400 hover:text-red-600">
              Lock
            </button>
          </span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Image src="/logo-mickala.png" alt="Mickala" width={48} height={48} className="h-12 w-auto" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Operations App</h1>
            <p className="text-sm text-gray-500">Field-ready forms for your team — tablet & phone friendly</p>
          </div>
        </div>

        {/* Form Cards */}
        <div className="space-y-3">
          {sections[0].forms.map((form) => (
            <Link
              key={form.href}
              href={form.href}
              className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                <form.icon className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">{form.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{form.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
