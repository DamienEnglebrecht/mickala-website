"use client"

import { useState, useRef, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { Bot, Send, Sparkles, X, MessageCircle } from "lucide-react"

type Message = {
  role: "assistant" | "user"
  content: string
}

const initialMessages: Message[] = [
  { role: "assistant", content: "Hi, I'm Mickala AI. I can help you with:\n\n• Tower recommendations for your site\n• Specs and technical specifications\n• Service intervals and maintenance\n• Parts and spares\n• Warranty information\n• Pricing and quotes\n\nWhat would you like to know?" }
]

const knowledgeBase: Record<string, string> = {
  "voltage": "All Mickala towers run on ELV 24VDC (Extra Low Voltage). This means any auto electrician can service them — no specialist technicians required. It's safer, simpler, and significantly cheaper to maintain than 240V systems.",
  "service": "Mickala towers have a 500-hour service interval. Compare this to the industry standard of 250 hours. That's half the maintenance stops. Each service includes filter kit, oil change, and full inspection.",
  "warranty": "Standard warranty is 12 months or 1500 hours, whichever comes first. Extended warranty options are available. The warranty covers manufacturing defects and workmanship.",
  "compliance": "All Mickala towers comply with MDG15 (Department of Industry — Guidelines for Lighting in Mines) and MDG41 (Electrical Installations on Mine Sites). Full certification documentation is available on request.",
  "paint": "Our paint system is a 3-stage process: e-coated primer, followed by two top coats baked at 180°C. This provides superior corrosion resistance for the harshest mine site conditions.",
  "gps": "Mickala towers can be equipped with GPS monitoring. This provides real-time location tracking, fuel level monitoring, service due date alerts, and remote start/stop capability.",
  "delivery": "Standard lead time is 4-6 weeks from order. Express delivery may be available depending on current production schedule. Contact our sales team for current lead times.",
  "custom": "Yes, we offer custom fabrication. Our in-house design and manufacturing team can modify tower specifications to meet your exact site requirements. Contact us to discuss your needs.",
  "fuel": "Standard fuel capacity provides 200+ hours of runtime. Extended fuel tank options are available. Fuel consumption varies by model — typically 1.5-2.5 L/hour depending on load.",
  "hire": "All towers are available for both purchase and hire. Hire rates vary by model, quantity, and duration. Contact our team for a custom hire quote.",
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase()
  
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lower.includes(key)) {
      return response
    }
  }
  
  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
    return "Our tower pricing ranges from $38,500 for the MLT 1280-4LED entry-level model to $62,500 for the MLT 2560-LED. Volume discounts are available for fleet orders. Hire options also available — contact our team for a custom quote."
  }
  
  if (lower.includes("recommend") || lower.includes("which tower") || lower.includes("what do i need")) {
    return "To recommend the right tower, I need to know:\n1. Site area (hectares)\n2. Operating hours\n3. Terrain type\n4. Environmental conditions\n\nYou can use our AI Tower Selector for a detailed recommendation, or just tell me about your site and I'll advise."
  }
  
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("speak")) {
    return "You can reach us at:\n• Phone: 1300 642 525 (1300 MICKALA)\n• Email: management@mickalagroup.com.au\n• Head Office: 21 Caterpillar Drive, Paget QLD 4740\n• NSW: 37 Thomas Mitchell Dr, Muswellbrook NSW 2333\n\nWe're available Monday-Thursday 8:00am-4:30pm, Friday 8:00am-1:00pm."
  }
  
  if (lower.includes("hello") || lower.includes("hi ") || lower.includes("hey")) {
    return "Hi there! I'm Mickala's AI assistant. I can answer questions about our lighting towers, LED lighting, fuel trailers, and custom fabrication. What are you looking for?"
  }
  
  if (lower.includes("tower selector") || lower.includes("tool")) {
    return "Our AI Tower Selector is at /tower-selector. Describe your site requirements and it will recommend the exact tower, quantity, and coverage plan."
  }
  
  if (lower.includes("tco") || lower.includes("roi") || lower.includes("calculator")) {
    return "Our TCO/ROI Calculator at /tco-calculator shows the real cost difference of ELV 24VDC vs competitor systems. You can adjust tower count, hours, and labour rates to see your specific savings."
  }

  return "That's a great question. I can help with tower specifications, pricing, service intervals, compliance, warranty, parts, and more. Could you rephrase or give me a bit more detail? Or you can call our team on 1300 642 525."
}

export default function AIChatPage() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, thinking])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setThinking(true)
    
    setTimeout(() => {
      const response = getAIResponse(userMsg)
      setMessages(prev => [...prev, { role: "assistant", content: response }])
      setThinking(false)
    }, 800)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] transition-colors flex items-center justify-center shadow-lg shadow-[#DC2626]/20"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] bg-[#0A0A0A] border border-white/[0.1] rounded-sm flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#DC2626]" />
              <span className="text-sm font-semibold">Mickala AI</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-sm p-3 ${
                  msg.role === "user" 
                    ? "bg-[#DC2626]/10 border border-[#DC2626]/20" 
                    : "bg-white/[0.03] border border-white/[0.06]"
                }`}>
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="h-2.5 w-2.5 text-[#DC2626]" />
                      <span className="text-[9px] text-white/20 tracking-wide">AI</span>
                    </div>
                  )}
                  <p className="text-xs text-white/70 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#DC2626] rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-[#DC2626] rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
                    <div className="w-1.5 h-1.5 bg-[#DC2626] rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.1] rounded-sm px-3 py-2 focus-within:border-[#DC2626] transition-colors">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about specs, pricing..."
                className="flex-1 bg-transparent text-xs text-white/80 placeholder:text-white/20 outline-none"
              />
              <button onClick={handleSend} className="text-white/30 hover:text-white">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
