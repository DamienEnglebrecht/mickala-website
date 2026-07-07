"use client"

import { useState } from "react"
import { Check } from "lucide-react"

type Config = {
  configuration: string
  fuelType: string
  pumpOption: string
  mineSpec: string
  extinguisher: string
}

const initialConfig: Config = {
  configuration: "",
  fuelType: "",
  pumpOption: "",
  mineSpec: "",
  extinguisher: "",
}

const options: {
  key: keyof Config
  label: string
  choices: { value: string; label: string; desc?: string }[]
}[] = [
  {
    key: "configuration",
    label: "Configuration",
    choices: [
      { value: "single-axle", label: "Single Axle", desc: "Compact, lighter, easier to tow" },
      { value: "dual-axle", label: "Dual Axle", desc: "Heavy-duty stability, higher payload" },
    ],
  },
  {
    key: "fuelType",
    label: "Fuel Type",
    choices: [
      { value: "diesel", label: "Diesel" },
      { value: "petrol", label: "Petrol" },
      { value: "aviation", label: "Aviation" },
    ],
  },
  {
    key: "pumpOption",
    label: "Pump Option",
    choices: [
      { value: "none", label: "None", desc: "No pump — gravity feed only" },
      { value: "solar", label: "12 V Solar with Twin Battery & Filter", desc: "Complete electric pump system with solar charging" },
    ],
  },
  {
    key: "mineSpec",
    label: "Mine Spec",
    choices: [
      { value: "yes", label: "Yes", desc: "Full mining compliant spec" },
      { value: "no", label: "No", desc: "Standard construction spec" },
    ],
  },
  {
    key: "extinguisher",
    label: "Fire Extinguisher",
    choices: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
]

export function BuildYourOwn() {
  const [config, setConfig] = useState<Config>(initialConfig)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const set = (key: keyof Config, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const allSelected = Object.values(config).every((v) => v !== "")
  const selectedCount = Object.values(config).filter((v) => v !== "").length
  const canSubmit = allSelected && name.trim() && email.trim()

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSaving(true)
    setError("")

    try {
      const res = await fetch("/api/fuel-trailer-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), config }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    }
    setSaving(false)
  }

  const handleReset = () => {
    setConfig(initialConfig)
    setName("")
    setEmail("")
    setPhone("")
    setSubmitted(false)
    setError("")
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DC2626]/10 mx-auto mb-6">
          <Check className="h-8 w-8 text-[#DC2626]" />
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Thanks, {name.split(" ")[0]}!
        </h2>
        <p className="text-sm text-white/50 max-w-md mx-auto mb-6">
          We&apos;ve received your fuel trailer configuration. Our team will be in touch with a custom quote at <span className="text-white/80">{email}</span>.
        </p>
        <p className="text-xs text-white/30 mb-8">
          Reference: <span className="font-mono">FT-{Date.now()}</span>
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-sm"
        >
          Configure Another
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
        Build Your Own
      </p>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-2">
        Configure your fuel trailer.
      </h2>
      <p className="text-sm text-white/50 mb-10 max-w-lg">
        Select your options and enter your details to receive a custom quote.
      </p>

      {/* Options */}
      <div className="space-y-8">
        {options.map((group) => (
          <div key={group.key}>
            <p className="text-xs text-white/40 font-medium tracking-[0.08em] uppercase mb-3">
              {group.label}
              {config[group.key] && (
                <span className="text-[#DC2626] ml-2">· {group.choices.find(c => c.value === config[group.key])?.label}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.choices.map((choice) => {
                const selected = config[group.key] === choice.value
                return (
                  <button
                    key={choice.value}
                    onClick={() => set(group.key, choice.value)}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-sm border text-left transition-all duration-200 ${
                      selected
                        ? "border-[#DC2626] bg-[#DC2626]/10 text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/[0.15] hover:text-white/80"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                      selected ? "border-[#DC2626]" : "border-white/20"
                    }`}>
                      {selected && <span className="w-2 h-2 rounded-full bg-[#DC2626]" />}
                    </span>
                    <div>
                      <span className="text-sm font-medium">{choice.label}</span>
                      {choice.desc && (
                        <p className="text-[11px] text-white/40 mt-0.5">{choice.desc}</p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Details */}
      <div className="mt-8 pt-8 border-t border-white/[0.06]">
        <p className="text-xs text-white/40 font-medium tracking-[0.08em] uppercase mb-4">
          Your Details
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Full name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 rounded-sm focus:outline-none focus:border-white/[0.15] transition-colors"
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 rounded-sm focus:outline-none focus:border-white/[0.15] transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 rounded-sm focus:outline-none focus:border-white/[0.15] transition-colors"
          />
        </div>
      </div>

      {/* Progress + Submit */}
      <div className="mt-8 pt-8 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-white/40">
            {selectedCount} of {options.length} selected
          </p>
          <button
            onClick={handleReset}
            className="text-[11px] text-white/30 hover:text-white transition-colors tracking-wide uppercase"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          {options.map((group, i) => (
            <div
              key={group.key}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                config[group.key] ? "bg-[#DC2626]" : "bg-white/[0.06]"
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-xs text-[#DC2626] mb-3">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || saving}
          className={`w-full py-3 text-sm font-semibold rounded-sm transition-all duration-200 ${
            canSubmit && !saving
              ? "bg-[#DC2626] hover:bg-[#B91C1C] text-white cursor-pointer"
              : "bg-white/[0.04] text-white/20 cursor-not-allowed"
          }`}
        >
          {saving ? "Sending..." : canSubmit ? "Send for Quote →" : "Select all options and enter your details"}
        </button>
      </div>
    </div>
  )
}
