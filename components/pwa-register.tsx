'use client'

import { useEffect } from 'react'

export function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silent fail — not critical
      })

      // Listen for beforeinstallprompt (Android Chrome)
      let deferredPrompt: any
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt = e
        // Could show a custom install button here
      })
    }
  }, [])

  return null
}
