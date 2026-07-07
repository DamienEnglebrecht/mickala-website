"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LockKeyhole } from "lucide-react"

export default function PartsAccessPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUnlock = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`/api/parts-access?code=${encodeURIComponent(password)}`)
      if (res.ok) {
        const redirect = new URLSearchParams(window.location.search).get("redirect") || "/parts"
        router.push(redirect)
        router.refresh()
      } else {
        setError(true)
        setPassword("")
      }
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-card border border-border rounded-2xl p-8 shadow-lg text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mx-auto mb-5">
          <LockKeyhole className="h-7 w-7 text-red-600" />
        </span>
        <h2 className="text-xl font-bold text-foreground mb-2">Parts &amp; Spares</h2>
        <p className="text-sm text-muted-foreground mb-6">
          This section is under development. Enter the access code to continue.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
          placeholder="Access code"
          className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background text-center focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 mb-3"
          autoFocus
          disabled={loading}
        />
        {error && (
          <p className="text-xs text-red-600 mb-3">Incorrect code. Try again.</p>
        )}
        <button
          onClick={handleUnlock}
          disabled={!password || loading}
          className="w-full rounded-xl bg-red-600 text-white py-3 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Checking..." : "Unlock"}
        </button>
      </div>
    </div>
  )
}
