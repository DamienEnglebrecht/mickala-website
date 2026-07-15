"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Send, Sparkles, Bot, ChevronRight } from "lucide-react"

type Message = {
  role: "assistant" | "user"
  content: string
}

type TowerRec = {
  name: string
  match: string
  units: number
  specs: string[]
}

export default function TowerSelectorPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Tell me about your site and I'll recommend the perfect lighting tower.\n\nFor example:\n*\"I need to light 30 hectares at an iron ore mine in the Pilbara. 24/7 operation, dusty conditions, need GPS monitoring.\"*\n\nOr just answer a few quick questions:" }
  ])
  const [showQuestions, setShowQuestions] = useState(true)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ area: "", hours: "", terrain: "", environment: "", gps: false, remote: false })
  const [recommendation, setRecommendation] = useState<TowerRec | null>(null)
  const [thinking, setThinking] = useState(false)

  const questions = [
    { key: "area", label: "Site area in hectares?", options: ["Up to 5 ha", "5-10 ha", "10-20 ha", "20-30 ha", "30-50 ha", "50+ ha"] },
    { key: "hours", label: "Operating hours?", options: ["12 hours/day", "24 hours/day", "Intermittent / on-demand"] },
    { key: "terrain", label: "Terrain type?", options: ["Flat / cleared", "Undulating", "Open pit / highwall", "Road / linear"] },
    { key: "environment", label: "Environmental conditions?", options: ["Dusty (mine site)", "Wet / humid", "Corrosive", "Standard"] },
  ]

  const handleQuestionAnswer = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    const msg = `${questions[step].label}: ${value}`
    setMessages(prev => [...prev, { role: "user", content: msg }])
    
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowQuestions(false)
      generateRecommendation({ ...form, [key]: value })
    }
  }

  const generateRecommendation = (f: typeof form) => {
    setThinking(true)
    setTimeout(() => {
      let tower, match, units
      const area = parseInt(f.area) || 20
      
      if (f.environment?.includes("Dusty") || f.terrain?.includes("Pit")) {
        tower = "MLT 2560-LED Sled Mount"
        match = "94%"
        units = Math.ceil(area / 8)
      } else if (f.terrain?.includes("Road") || area <= 10) {
        tower = "MLT 1280-6LED Single Axle"
        match = "91%"
        units = Math.ceil(area / 4)
      } else if (area > 20 || f.hours?.includes("24")) {
        tower = "MLT 2560-LED Dual Axle"
        match = "96%"
        units = Math.ceil(area / 10)
      } else {
        tower = "MLT 1920-LED Dual Axle"
        match = "88%"
        units = Math.ceil(area / 6)
      }

      setRecommendation({
        name: tower,
        match,
        units,
        specs: ["ELV 24VDC — any auto electrician can service", "GPS monitoring available", "MDG15/41 compliant", "3-stage e-coat paint system", "24/7/365 support nationwide"]
      })
      setMessages(prev => [...prev, { role: "assistant", content: `Based on your requirements, I recommend **${tower}**. I'd suggest ${units} units to cover ${f.area || "your"} site. This is a ${match} match.\n\nKey advantages:\n• ELV 24VDC — any auto electrician can service\n• GPS monitoring available\n• MDG15/41 compliant\n• 3-stage e-coat paint system\n• 24/7/365 support nationwide\n\nWould you like a detailed quote or to speak with our team?` }])
      setThinking(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: "user", content: input }])
    setInput("")
    setThinking(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Thanks for your question. Based on what you've described, I'd recommend looking at our MLT 2560-LED range. These are our most popular units for large-scale mine site operations.\n\nWould you like me to:\n1. Send you a detailed spec sheet\n2. Connect you with our sales team\n3. Generate a formal quote" 
      }])
      setThinking(false)
    }, 1000)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[900px] mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <Bot className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">AI Tower Selector</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Find your tower in seconds.</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-10 max-w-xl">Describe your site requirements and our AI recommends the exact tower, quantity, and coverage plan.</p>

        {/* Chat Area */}
        <div className="space-y-4 mb-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-sm p-4 ${
                msg.role === "user" 
                  ? "bg-[#DC2626]/10 border border-[#DC2626]/20" 
                  : "bg-white/[0.03] border border-white/[0.06]"
              }`}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3 w-3 text-[#DC2626]" />
                    <span className="text-[10px] text-white/30 tracking-wide uppercase">AI Recommendation</span>
                  </div>
                )}
                <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex justify-start">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
                  <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {showQuestions && (
          <div className="border border-white/[0.06] rounded-sm p-6 mb-6">
            <p className="text-xs text-white/40 tracking-[0.15em] uppercase mb-4">Quick Questions ({step + 1}/{questions.length})</p>
            <p className="text-sm font-semibold mb-4">{questions[step].label}</p>
            <div className="flex flex-wrap gap-2">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleQuestionAnswer(questions[step].key, opt)}
                  className="px-4 py-2 text-sm border border-white/[0.1] hover:border-[#DC2626]/50 transition-colors rounded-sm text-white/60 hover:text-white"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation CTA */}
        {recommendation && (
          <div className="border border-[#DC2626]/30 rounded-sm p-6 mb-6 bg-[#DC2626]/5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-[#DC2626]" />
              <p className="text-xs text-[#DC2626] font-semibold tracking-wide uppercase">Recommended Solution</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-2xl font-bold mb-1">{recommendation.name}</p>
                <p className="text-sm text-white/50 mb-2">{recommendation.units} units recommended · {recommendation.match} match</p>
                <p className="text-xs text-[#DC2626]">Purchase from $62,500 · Hire available</p>
              </div>
              <div className="space-y-1.5">
                {recommendation.specs.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/50">
                    <ChevronRight className="h-3 w-3 text-[#DC2626] mt-0.5 shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <a href="/quote" className="inline-flex items-center px-5 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-xs font-semibold rounded-full">Get a Quote</a>
              <a href="/lighting-towers/single-axle" className="inline-flex items-center px-5 py-2.5 border border-white/20 hover:border-white/40 transition-colors text-xs font-semibold rounded-full">View Spec Sheet</a>
              <a href="tel:1300642525" className="text-xs text-white/40 hover:text-white ml-auto">1300 642 525</a>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm px-4 py-3 focus-within:border-[#DC2626] transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask about a specific site requirement..."
            className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none"
          />
          <button onClick={handleSendMessage} className="text-white/30 hover:text-white transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-white/20 mt-2">This AI is trained on Mickala&apos;s full product range, spec sheets, and compliance data.</p>
      </div>
    </div>
  )
}
