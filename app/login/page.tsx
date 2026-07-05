"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const STAFF_KEY = "mickala_staff_list"
const SESSION_KEY = "mickala_session"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      const parsed = JSON.parse(session)
      if (parsed.expires > Date.now()) {
        window.location.href = "/documents"
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Admin default
    if (username === "admin" && password === "Mickala2026") {
      const sess = { user: "Admin", role: "admin", expires: Date.now() + 86400000 * 7 }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sess))
      window.location.href = "/admin"
      return
    }

    // Check staff list
    const raw = localStorage.getItem(STAFF_KEY)
    if (raw) {
      const staff = JSON.parse(raw)
      const found = staff.find((s: any) => s.username === username && s.password === password)
      if (found) {
        const sess = { user: found.displayName, role: "staff", expires: Date.now() + 86400000 * 7 }
        localStorage.setItem(SESSION_KEY, JSON.stringify(sess))
        window.location.href = "/documents"
        return
      }
    }

    setError("Invalid username or password")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8">
        <div className="text-center mb-8">
          <Image src="/logo-mickala.png" alt="Mickala" width={80} height={80} className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900">Mickala Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username" required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
          />
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
          />
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          <button type="submit" className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-red-700 transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
