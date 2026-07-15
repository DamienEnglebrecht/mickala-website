"use client"

import dynamic from "next/dynamic"

const AIChatClient = dynamic(() => import("@/components/ai-chat"), { ssr: false })

export function AIChatWrapper() {
  return <AIChatClient />
}
