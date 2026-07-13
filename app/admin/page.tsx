"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const STAFF_KEY = "mickala_staff_list"
const SESSION_KEY = "mickala_session"

interface StaffMember {
  id: number
  username: string
  displayName: string
  password: string
}

export default function AdminPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [newName, setNewName] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) { window.location.href = "/login"; return }
    const sess = JSON.parse(raw)
    if (sess.role !== "admin" || sess.expires < Date.now()) {
      window.location.href = "/login"
      return
    }
    const stored = localStorage.getItem(STAFF_KEY)
    if (stored) setStaff(JSON.parse(stored))
    setLoading(false)
  }, [])

  const addStaff = () => {
    if (!newName || !newUsername || !newPassword) return
    const updated = [...staff, {
      id: Date.now(),
      username: newUsername.toLowerCase(),
      displayName: newName,
      password: newPassword
    }]
    setStaff(updated)
    localStorage.setItem(STAFF_KEY, JSON.stringify(updated))
    setNewName(""); setNewUsername(""); setNewPassword("")
  }

  const removeStaff = (id: number) => {
    const updated = staff.filter(s => s.id !== id)
    setStaff(updated)
    localStorage.setItem(STAFF_KEY, JSON.stringify(updated))
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    window.location.href = "/login"
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image src="/logo-mickala.png" alt="Mickala" width={40} height={40} className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-400">Manage staff access and documents</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Admin</span>
            <button onClick={logout} className="text-xs text-red-600 hover:text-red-700">Sign Out</button>
          </div>
        </div>

        {/* Add Staff */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Add Staff Member</h2>
          <div className="grid sm:grid-cols-4 gap-3 mb-3">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full name" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400" />
            <input value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="Username" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400" />
            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Password" type="password" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400" />
            <button onClick={addStaff} className="bg-red-600 text-white rounded-lg px-5 py-2 text-sm font-semibold hover:bg-red-700 transition-colors">
              Add Staff
            </button>
          </div>

          {/* Staff List */}
          {staff.length > 0 && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Current Staff ({staff.length})</p>
              <div className="flex flex-wrap gap-2">
                {staff.map(s => (
                  <div key={s.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs">
                    <span className="font-medium text-gray-700">{s.displayName}</span>
                    <span className="text-gray-400">@{s.username}</span>
                    <button onClick={() => removeStaff(s.id)} className="text-red-500 hover:text-red-700 ml-1">✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Document Links */}
        <h2 className="font-semibold text-gray-900 mb-4">Documents</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Quote Register", href: "/quoting/register", desc: "View and manage all quotes" },
            { name: "Create Quote", href: "/quote", desc: "Build and print professional quotes" },
            { name: "EHS Hire Schedule", href: "/hire-schedule", desc: "Equipment hire schedule forms" },
            { name: "Operations Forms", href: "/operations", desc: "Field forms and checklists" },
            { name: "Parts Store", href: "/parts", desc: "Browse and order parts" },
            { name: "Spec Sheets", href: "/spec-sheets", desc: "Product specification sheets" },
            { name: "Parts Manuals", href: "/parts-manuals", desc: "Interactive parts catalogs" },
            { name: "Documents", href: "/documents", desc: "All company documents" },
            { name: "Risk Assessments", href: "/risk-assessment/design", desc: "Design and operational risk assessments" },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
