"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    if (pathname.startsWith("/_next") || pathname.startsWith("/api")) return

    const referrer = document.referrer || "direct"
    const tracked = sessionStorage.getItem("tracked_" + pathname)
    
    // Get visitor info from wherever it's stored
    let visitor = ""
    let email = ""
    
    try {
      // Staff login stores user info in mickala_session
      const sessionStr = localStorage.getItem("mickala_session")
      if (sessionStr) {
        const session = JSON.parse(sessionStr)
        if (session.user && session.expires > Date.now()) {
          visitor = session.user
        }
      }
      // Also check direct mickala_user storage
      const userStr = localStorage.getItem("mickala_user")
      if (userStr) {
        const user = JSON.parse(userStr)
        visitor = visitor || user.name || user.visitor || ""
        email = user.email || ""
      }
      // Fall back to name gate
      if (!visitor) {
        visitor = localStorage.getItem("visitor_name") || localStorage.getItem("mickala_name") || ""
      }
    } catch {}

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, referrer, visitor, email }),
    }).catch(() => {})

    sessionStorage.setItem("tracked_" + pathname, "1")
  }, [pathname])

  return null
}
