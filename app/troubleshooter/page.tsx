"use client"

import { useState, useRef, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { Wrench, MessageSquare, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb, Search } from "lucide-react"

// Knowledge base: symptom → diagnosis tree
const knowledgeBase: Record<string, {
  title: string
  questions: { q: string; yes: string; no: string }[]
  solutions: { label: string; steps: string[]; part?: string }[]
}> = {
  "wont start": {
    title: "Tower Won't Start",
    questions: [
      { q: "Does the panel show power (display lit)?", yes: "check_battery", no: "check_mains" },
      { q: "Does the engine crank when you press start?", yes: "check_fuel", no: "check_starter" },
      { q: "Do you hear the fuel pump prime?", yes: "check_air", no: "check_fuel_pump" },
    ],
    solutions: [
      { label: "Dead Battery", steps: ["Check battery voltage at terminals (min 24V)", "Check battery isolator switch is ON", "Jump start via Andersen receptacle", "If battery won't hold charge — replace"], part: "Battery 24V" },
      { label: "Blown Fuse", steps: ["Locate main fuse panel", "Check 15A engine control fuse", "Replace if blown", "Investigate cause if it blows again"], part: "Fuse 15A — Engine Control" },
      { label: "Starter Motor Fault", steps: ["Check starter solenoid wiring", "Tap starter gently with insulated tool", "Check earth strap connections", "If no response — replace starter"], part: "Starter Motor — Kubota Z482-E" },
      { label: "Fuel System — Air Lock", steps: ["Open bleed screw on fuel filter head", "Prime with hand primer until solid fuel flows", "Tighten bleed screw", "Crank engine — should start within 10 seconds"], part: "Fuel Filter — Kubota" },
      { label: "Fuel Pump Failure", steps: ["Listen for prime on key-on (2 sec buzz)", "Check 12V at fuel pump connector", "Tap pump lightly", "Replace if silent + has power"], part: "Fuel Pump — 12V Kubota" },
    ],
  },
  "shutting down": {
    title: "Tower Starts Then Shuts Down",
    questions: [
      { q: "Does it run for 30+ seconds before shutting down?", yes: "check_sensors", no: "check_fuel_supply" },
      { q: "Does the controller show an error code?", yes: "check_error_code", no: "check_air_filter" },
      { q: "Does it smoke before shutting down?", yes: "check_fuel_quality", no: "check_exhaust" },
    ],
    solutions: [
      { label: "Fuel Starvation", steps: ["Check fuel level in tank", "Check for blocked fuel line", "Replace fuel filter", "Bleed air from system"], part: "Fuel Filter Element" },
      { label: "Safety Shutdown Active", steps: ["Check low oil pressure sensor", "Check high coolant temp sensor", "Check emergency stop buttons (both positions)", "Reset controller — power cycle"], part: "Oil Pressure Switch" },
      { label: "Blocked Air Filter", steps: ["Remove air filter element", "Hold up to light — can you see through it?", "Replace if blocked", "Check pre-cleaner bowl for debris"], part: "Air Filter Element" },
      { label: "Controller / Sensor Fault", steps: ["Note error code on Smartgen display", "Reference code in manual", "Check wiring to sending units", "Replace faulty sensor"], part: "Smartgen ALC700 Controller" },
    ],
  },
  "lights flicker": {
    title: "Lights Flickering or Dim",
    questions: [
      { q: "Do all lights flicker, or just some?", yes: "check_driver", no: "check_individual" },
      { q: "Does the flickering change with engine speed?", yes: "check_generator", no: "check_connections" },
      { q: "Are the lights dimmer than normal?", yes: "check_voltage", no: "check_led_driver" },
    ],
    solutions: [
      { label: "LED Driver Fault", steps: ["Check input voltage at LED driver", "Look for LED code on driver (blinking = fault)", "Replace driver module", "Test lights after replacement"], part: "LED Driver — 320W" },
      { label: "Loose Connection", steps: ["Check cannon plug at mast base", "Check each light head connector", "Tighten all terminal screws in junction box", "Apply dielectric grease to connectors"], part: "Cannon Plug Kit" },
      { label: "Generator Output Fluctuation", steps: ["Check engine speed is stable (1500 RPM)", "Check AVR (Auto Voltage Regulator)", "Measure DC output voltage — should be 24-28V", "Replace AVR if voltage unstable"], part: "AVR — Sincro Generator" },
      { label: "Individual LED Failure", steps: ["Identify which light head is flickering", "Swap with known-good light head", "If fault moves — it's the light head", "If stays — it's the wiring/cable"], part: "LED Light Head — 320W" },
    ],
  },
  "mast wont raise": {
    title: "Mast Won't Raise / Lower",
    questions: [
      { q: "Does the hydraulic pump run when you press raise?", yes: "check_hydraulic_oil", no: "check_pump_power" },
      { q: "Is the handbrake released?", yes: "check_mast_bind", no: "release_handbrake" },
      { q: "Is the machine on level ground?", yes: "check_hydraulic_cylinder", no: "level_machine" },
    ],
    solutions: [
      { label: "Low Hydraulic Oil", steps: ["Check oil level in hydraulic tank", "Top up with ISO 32 hydraulic oil", "Check for leaks at cylinder seals", "Bleed air from system"], part: "Hydraulic Oil — ISO 32 (20L)" },
      { label: "Hydraulic Pump Failure", steps: ["Listen for pump running (electric motor sound)", "Check 24V at pump motor", "Check relay and fuse", "Replace pump motor if no operation"], part: "Hydraulic Pump Motor — 24VDC" },
      { label: "Mast Binding / Mechanical Block", steps: ["Check mast sections for debris", "Lubricate mast sections with CRC", "Check for bent sections (visible),", "Do not force — call service if binding"], part: "CRC Heavy Duty Lubricant" },
      { label: "Safety Limit Switch Active", steps: ["Check limit switch 1 (LHS — below 2.2m)", "Check limit switch 2 (RHS — series with L1)", "Check limit switch 4 (legs extended)", "All three must be satisfied for mast operation"], part: "Limit Switch Assembly" },
    ],
  },
  "no power": {
    title: "No Power / Panel Dead",
    questions: [
      { q: "Is the battery isolator switch turned ON?", yes: "check_battery_voltage", no: "turn_on_isolator" },
      { q: "Does the panel light up briefly then go dark?", yes: "check_battery_charge", no: "check_main_fuse" },
      { q: "Are any other electrical loads working?", yes: "check_wiring", no: "check_battery_connections" },
    ],
    solutions: [
      { label: "Battery Isolator Off", steps: ["Locate battery isolator switch", "Turn to ON position", "Panel should power up", "If not — check battery condition"] },
      { label: "Main Fuse Blown", steps: ["Locate main fuse (50A near battery)", "Check with multimeter", "Replace with same rating", "If blows again — short circuit investigation"], part: "Main Fuse — 50A" },
      { label: "Battery Flat", steps: ["Measure battery voltage (<22V = flat)", "Jump start via Andersen receptacle", "Run engine for 2 hours to recharge", "If battery won't hold charge — replace"], part: "Battery — 24V Deep Cycle" },
      { label: "Battery Connection Corroded", steps: ["Check terminals for white/green corrosion", "Clean with terminal cleaner tool", "Tighten terminal bolts", "Apply vaseline to prevent recurrence"] },
    ],
  },
  "fuel leak": {
    title: "Fuel Leak",
    questions: [
      { q: "Is the leak from the tank area?", yes: "check_tank", no: "check_lines" },
      { q: "Is the leak active while engine is running?", yes: "check_injector", no: "check_connections" },
      { q: "Can you see where it's dripping from?", yes: "assess_leak", no: "clean_inspect" },
    ],
    solutions: [
      { label: "Loose Fuel Line Connection", steps: ["Trace leak to fitting", "Tighten banjo bolt or hose clamp", "Clean area with degreaser", "Run engine and re-check"], part: "Fuel Line Banjo Washers" },
      { label: "Fuel Filter Housing Leak", steps: ["Check filter housing O-ring", "Tighten filter bowl", "Replace O-ring if damaged", "Bleed system after replacement"], part: "Fuel Filter Housing O-Ring Kit" },
      { label: "Injector Line Leak", steps: ["Identify which injector is leaking", "Tighten line nut at injector", "Check for cracked line", "Replace line if cracked"], part: "Injector Line — Kubota Z482-E" },
      { label: "Tank Damage / Crack", steps: ["Identify source (tank body vs fitting)", "Small leaks: use fuel tank repair putty", "Large leaks: tank replacement required", "Contact Mickala for replacement unit"], part: "Fuel Tank — contact for part number" },
    ],
  },
  "overheating": {
    title: "Engine Overheating",
    questions: [
      { q: "Is the coolant level low?", yes: "check_coolant_level", no: "check_airflow" },
      { q: "Is the radiator / oil cooler blocked?", yes: "clean_radiator", no: "check_fan_belt" },
      { q: "Does the fan spin freely?", yes: "check_water_pump", no: "check_fan_belt_tension" },
    ],
    solutions: [
      { label: "Low Coolant", steps: ["Check overflow tank level", "Check radiator core for leaks", "Top up with 50/50 coolant mix", "Check for external leaks"], part: "Coolant — 50/50 Premix 5L" },
      { label: "Blocked Radiator / Oil Cooler", steps: ["Remove debris from radiator fins", "Use compressed air (blow from back to front)", "Check radiator for bent fins", "If severely blocked — professional clean"], part: "Radiator Cleaning Service" },
      { label: "Fan Belt Slipping / Broken", steps: ["Check belt tension (1/2\" deflection)", "Check for cracks or glazing", "Tension or replace", "Check fan pulley for damage"], part: "Fan Belt — Kubota Z482-E" },
      { label: "Water Pump Failure", steps: ["Check for coolant leak at pump weep hole", "Feel top radiator hose (should be hot)", "Bottom hose should be cooler (temp differential)", "Replace water pump if leaking or seized"], part: "Water Pump — Kubota Z482-E" },
    ],
  },
  "battery flat": {
    title: "Battery Not Charging / Keeps Going Flat",
    questions: [
      { q: "Does the engine charge when running? (26-28V at battery)", yes: "check_parasitic_draw", no: "check_charging_system" },
      { q: "Has the tower been sitting unused for 2+ weeks?", yes: "battery_self_discharge", no: "check_daily_use" },
      { q: "Are any accessories left on?", yes: "turn_off_loads", no: "check_alternator_wiring" },
    ],
    solutions: [
      { label: "Alternator / Charging Fault", steps: ["Measure battery voltage with engine running (should be 26-28V)", "Check alternator belt tension", "Check alternator wiring", "Replace alternator if no output"], part: "Alternator — 24V 40A" },
      { label: "Parasitic Draw", steps: ["Disconnect battery negative terminal", "Measure current draw with multimeter (should be <50mA)", "Pull fuses one at a time to find circuit", "Repair or isolate faulty circuit"] },
      { label: "Battery End of Life", steps: ["Check battery age (mark on terminal)", "Load test battery", "If voltage drops below 20V under load — replace", "Replace both batteries if dual bank system"], part: "Battery — 24V Deep Cycle" },
      { label: "Auto Start/Stop Draining Battery", steps: ["Check timer settings", "Reduce overnight runtime if not needed", "Check battery charge state", "Install solar charger if in remote location"], part: "Solar Battery Charger Kit" },
    ],
  },
}

const symptoms = Object.keys(knowledgeBase).map(key => ({
  id: key,
  title: knowledgeBase[key].title,
}))

export default function TroubleshooterPage() {
  const [input, setInput] = useState("")
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null)
  const [step, setStep] = useState<"input" | "diagnosing" | "result">("input")
  const [currentQ, setCurrentQ] = useState(0)
  const [results, setResults] = useState<{ label: string; steps: string[]; part?: string }[]>([])
  const [showAllSolutions, setShowAllSolutions] = useState(false)
  const [feedback, setFeedback] = useState<"helpful" | "not_helpful" | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const kb = selectedSymptom ? knowledgeBase[selectedSymptom] : null

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentQ, results])

  const handleInput = () => {
    const lower = input.toLowerCase()
    let match: string | null = null
    for (const [key, val] of Object.entries(knowledgeBase)) {
      if (lower.includes(key) || lower.includes(val.title.toLowerCase())) {
        match = key
        break
      }
    }
    // Check partial matches
    if (!match) {
      for (const [key, val] of Object.entries(knowledgeBase)) {
        const words = val.title.toLowerCase().split(" ")
        if (words.some(w => lower.includes(w))) {
          match = key
          break
        }
      }
    }
    if (match) {
      setSelectedSymptom(match)
      setCurrentQ(0)
      setResults([])
      setStep("diagnosing")
      setFeedback(null)
    } else {
      // No match — show all symptoms
      setStep("result")
      setResults([])
    }
  }

  const answerQuestion = (answer: "yes" | "no") => {
    if (!kb) return
    const question = kb.questions[currentQ]
    const nextKey = answer === "yes" ? question.yes : question.no
    
    // Check if it maps to a solution
    const matchingSolution = kb.solutions.find(s => 
      s.label.toLowerCase().includes(nextKey.replace("_", " ")) ||
      nextKey.includes(s.label.toLowerCase().slice(0, 5))
    )

    if (matchingSolution || currentQ >= kb.questions.length - 1) {
      // Show the most relevant solution
      const relevantSolutions = matchingSolution 
        ? [matchingSolution, ...kb.solutions.filter(s => s.label !== matchingSolution.label)]
        : kb.solutions
      setResults(relevantSolutions)
      setStep("result")
    } else {
      setCurrentQ(prev => Math.min(prev + 1, kb.questions.length - 1))
    }
  }

  const resetAll = () => {
    setInput("")
    setSelectedSymptom(null)
    setStep("input")
    setCurrentQ(0)
    setResults([])
    setShowAllSolutions(false)
    setFeedback(null)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <Wrench className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">AI Technical Troubleshooter</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">What&apos;s going wrong?</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-2xl">
          Describe the problem with your Mickala lighting tower. Our AI will guide you through diagnosis step by step.
        </p>

        {/* Input stage */}
        {step === "input" && (
          <div>
            <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm px-4 py-3 focus-within:border-[#DC2626] transition-colors mb-4">
              <Search className="h-4 w-4 text-white/30 shrink-0" />
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleInput()}
                placeholder='Describe the problem: "mast wont raise", "lights flickering", "engine shuts down"...'
                className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none"
              />
              <button onClick={handleInput}
                className="px-5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-xs font-semibold rounded-sm shrink-0">
                Diagnose
              </button>
            </div>

            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Or select a common issue:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {symptoms.map(s => (
                <button key={s.id} onClick={() => { setSelectedSymptom(s.id); setCurrentQ(0); setStep("diagnosing"); setResults([]); setFeedback(null) }}
                  className="text-left p-3 border border-white/[0.06] hover:border-[#DC2626]/50 rounded-sm transition-colors">
                  <p className="text-xs font-medium">{s.title}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Diagnosing — Q&A */}
        {step === "diagnosing" && kb && (
          <div className="border border-white/[0.06] rounded-sm">
            {/* Chat-style header */}
            <div className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
                  <Wrench className="h-3 w-3 text-[#DC2626]" />
                </div>
                <p className="text-xs font-semibold">Diagnosing: {kb.title}</p>
              </div>
            </div>

            {/* Question */}
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DC2626]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="h-3 w-3 text-[#DC2626]" />
                </div>
                <div>
                  <p className="text-sm mb-3">{kb.questions[currentQ].q}</p>
                  <div className="flex gap-2">
                    <button onClick={() => answerQuestion("yes")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-700/30 text-emerald-400 text-xs rounded-sm transition-colors">
                      <ThumbsUp className="h-3 w-3" /> Yes
                    </button>
                    <button onClick={() => answerQuestion("no")}
                      className="inline-flex items-center gap-1.5 px-4 py-3 bg-white/[0.06] hover:bg-white/[0.1] text-xs rounded-sm transition-colors">
                      <ThumbsDown className="h-3 w-3" /> No
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="pt-3 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/[0.06] rounded-full">
                    <div className="h-full bg-[#DC2626] rounded-full transition-all"
                      style={{ width: `${((currentQ + 1) / kb.questions.length) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-white/30">Question {currentQ + 1} of {kb.questions.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {step === "result" && (
          <div className="space-y-4">
            {results.length > 0 ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
                  <p className="text-xs text-[#DC2626] font-semibold uppercase tracking-wider">
                    {kb ? `Diagnosis: ${kb.title}` : "Possible Issues"}
                  </p>
                </div>

                {/* Show first solution expanded */}
                {results.slice(0, showAllSolutions ? results.length : 1).map((sol, i) => (
                  <div key={i} className="border border-white/[0.06] rounded-sm">
                    <div className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{sol.label}</p>
                        {sol.part && <span className="text-[9px] text-[#DC2626] uppercase tracking-wider">Part: {sol.part}</span>}
                      </div>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-2">
                        {sol.steps.map((step, si) => (
                          <li key={si} className="flex items-start gap-2 text-xs text-white/70">
                            <span className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center text-[9px] text-white/40 shrink-0 mt-0.5">{si + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}

                {/* Toggle more solutions */}
                {results.length > 1 && (
                  <button onClick={() => setShowAllSolutions(!showAllSolutions)}
                    className="w-full py-3 border border-white/[0.06] hover:border-white/20 rounded-sm text-xs text-white/50 transition-colors">
                    {showAllSolutions ? "Show fewer" : `Show all ${results.length} possible causes →`}
                  </button>
                )}

                {/* No match */}
                {!kb && (
                  <div className="border border-white/[0.06] rounded-sm p-6 text-center">
                    <p className="text-sm text-white/60 mb-2">I couldn&apos;t match your description to a known issue.</p>
                    <p className="text-xs text-white/40 mb-4">Try rephrasing or select from the common issues list above.</p>
                    <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold rounded-sm transition-colors">
                      Try Again
                    </button>
                  </div>
                )}

                {/* Feedback */}
                {kb && (
                  <div className="p-4 border border-white/[0.06] rounded-sm">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Was this helpful?</p>
                    <div className="flex gap-2">
                      <button onClick={() => setFeedback("helpful")}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs rounded-sm transition-colors ${
                          feedback === "helpful" ? "bg-emerald-900/30 text-emerald-400 border border-emerald-700/30" : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
                        }`}>
                        <ThumbsUp className="h-3 w-3" /> Yes
                      </button>
                      <button onClick={() => setFeedback("not_helpful")}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs rounded-sm transition-colors ${
                          feedback === "not_helpful" ? "bg-[#DC2626]/20 text-[#DC2626] border border-[#DC2626]/30" : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
                        }`}>
                        <ThumbsDown className="h-3 w-3" /> No
                      </button>
                    </div>
                    {feedback === "not_helpful" && (
                      <p className="text-xs text-white/40 mt-3">Call our service team: <a href="tel:1300642525" className="text-[#DC2626] hover:underline">1300 642 525</a> — 24/7 support available.</p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-3 border border-white/[0.1] hover:border-white/30 text-xs rounded-sm transition-colors">
                    <RotateCcw className="h-3 w-3" /> Diagnose Another Issue
                  </button>
                  <a href="tel:1300642525" className="text-xs text-white/40 hover:text-white ml-auto">Need help? 1300 642 525</a>
                </div>
              </>
            ) : (
              <div className="border border-white/[0.06] rounded-sm p-8 text-center">
                <p className="text-sm text-white/60 mb-2">No specific diagnosis available for that description.</p>
                <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold rounded-sm transition-colors mt-4">
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="mt-10 p-4 border border-white/[0.06] text-[10px] text-white/30 leading-relaxed">
          <p className="font-semibold text-white/50 mb-1">How this works</p>
          <p>The AI Troubleshooter uses a knowledge base built from Mickala service manuals and field data. Answer the questions to narrow down the cause. Parts shown are common replacements — contact Mickala to verify compatibility for your specific model.</p>
          <p className="mt-2">For urgent breakdowns: <a href="tel:1300642525" className="text-[#DC2626] hover:underline">1300 642 525</a> — 24/7 service support.</p>
        </div>
      </div>
    </div>
  )
}
