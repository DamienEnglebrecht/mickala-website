"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { MapPin, Sparkles, RefreshCw, Hash, Fuel, Wrench, Zap, Clock, AlertTriangle, Mail, Phone, Building2, User, CheckCircle2, Loader2 } from "lucide-react"

/**
 * Blanket tower ratios — generic planning benchmarks only.
 * These are public industry-standard planning estimates, not any
 * customer, site, or model-specific data. No proprietary IP involved.
 */
const fleetLightingRules = {
  digFleet: { towersPerFleet: 12, notes: "Pit zone — shovel, dump area, access ramps, and bench lighting" },
  dozers: { towersPerDozer: 1, notes: "Dozer push zone — additional lighting where dig fleet towers don't reach" },
  dumps: { towersPerDump: 0.5, notes: "Tip head — additional lights for reversing and dumping" },
  romPad: { towersPerPad: 1, notes: "ROM pad, crusher feed, and stockpile lighting" },
  // Sump trucks do NOT add towers themselves — the dig fleet already
  // covers the pit/haul/dump area. Tracked as informational only.
  sumpTrucks: { towersPerTruck: 0 },
}

// Savings per tower — generic benchmark vs standard LED tower
const fuelPerHourMickala = 0.8   // L/hr
const fuelPerHourCompetitor = 1.5 // L/hr
const fuelPricePerLitre = 1.50
const hoursPerNight = 13
const nightsPerYear = 365
const fuelSavedPerTowerPerYear = (fuelPerHourCompetitor - fuelPerHourMickala) * hoursPerNight * nightsPerYear * fuelPricePerLitre

// Service visits: 9 vs 15 per year
const serviceVisitsMickala = 9
const serviceVisitsCompetitor = 15
const serviceTruckCostPerHour = 150
const hoursPerVisit = 1.5 // avg time including travel
const serviceCostSavedPerTowerPerYear = (serviceVisitsCompetitor - serviceVisitsMickala) * hoursPerVisit * serviceTruckCostPerHour

// Breakdowns: 10x fewer — 2 vs 0.2 call-outs per month
const breakdownsCompetitor = 2   // per month
const breakdownsMickala = 0.2
const breakdownCostPerCallout = 450 // avg labour + parts for minor fix
const breakdownCostSavedPerTowerPerYear = (breakdownsCompetitor - breakdownsMickala) * 12 * breakdownCostPerCallout

// Competitor needs 50% more towers to match Mickala's light output
const brightnessMultiplier = 1.5

function formatCurrency(n: number): string {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return "$" + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K"
  return "$" + Math.round(n).toLocaleString()
}

type BusinessType = "corporate" | "abn" | "individual"

export default function SiteAssessmentPage() {
  // Fleet inputs
  const [siteName, setSiteName] = useState("")
  const [digFleets, setDigFleets] = useState(0)
  const [sumpTrucks, setSumpTrucks] = useState(0)
  const [dozers, setDozers] = useState(0)
  const [dumps, setDumps] = useState(0)
  const [other, setOther] = useState(0) // direct blanket tower count (additional towers/areas)

  const [assessing, setAssessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Lead capture form
  const [leadName, setLeadName] = useState("")
  const [leadEmail, setLeadEmail] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [leadCompany, setLeadCompany] = useState("")
  const [leadBusiness, setLeadBusiness] = useState<BusinessType>("corporate")

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const calculateSavings = (totalUnits: number) => {
    const fuel = Math.round(fuelSavedPerTowerPerYear * totalUnits)
    const servicing = Math.round(serviceCostSavedPerTowerPerYear * totalUnits)
    const breakdowns = Math.round(breakdownCostSavedPerTowerPerYear * totalUnits)
    const totalAnnual = fuel + servicing + breakdowns
    return { fuel, servicing, breakdowns, totalAnnual }
  }

  const assessSite = () => {
    setError(null)
    setAssessing(true)
    setResult(null)
    setSubmitted(false)

    setTimeout(() => {
      try {
        const activeSiteName = siteName.trim() || "your site"
        const input = {
          siteName: activeSiteName,
          digFleets: Math.max(0, parseInt(String(digFleets)) || 0),
          sumpTrucks: Math.max(0, parseInt(String(sumpTrucks)) || 0),
          dozers: Math.max(0, parseInt(String(dozers)) || 0),
          dumps: Math.max(0, parseInt(String(dumps)) || 0),
          other: Math.max(0, parseInt(String(other)) || 0),
        }

        // ---- Tower build-up ----
        const recs: any[] = []
        let totalUnits = 0

        // Dig fleets — primary driver, covers pit/haul/dump area
        if (input.digFleets > 0) {
          const u = Math.ceil(input.digFleets * fleetLightingRules.digFleet.towersPerFleet)
          totalUnits += u
          recs.push({ category: "Dig Fleet", units: u, notes: `${input.digFleets} fleet${input.digFleets !== 1 ? "s" : ""} — pit, haul road & dump area` })
        }

        if (input.dozers > 0) {
          const u = Math.ceil(input.dozers * fleetLightingRules.dozers.towersPerDozer)
          totalUnits += u
          recs.push({ category: "Dozer Zone", units: u, notes: `${input.dozers} dozer${input.dozers !== 1 ? "s" : ""} — push, cut, stockpile lighting` })
        }

        if (input.dumps > 0) {
          const u = Math.ceil(input.dumps * fleetLightingRules.dumps.towersPerDump)
          totalUnits += u
          recs.push({ category: "Tip Head / Dump", units: u, notes: `${input.dumps} dump point${input.dumps !== 1 ? "s" : ""} — tip head illumination` })
        }

        // ROM pad scales with dig fleet
        const romUnits = input.digFleets * fleetLightingRules.romPad.towersPerPad
        if (romUnits > 0) {
          totalUnits += romUnits
          recs.push({ category: "ROM Pad & Infrastructure", units: romUnits, notes: "ROM pad, crusher feed, stockpile lighting" })
        }

        // Sump trucks are informational only — they do NOT add towers
        if (input.sumpTrucks > 0) {
          recs.push({ category: "Sump Trucks", units: 0, notes: `${input.sumpTrucks} sump truck${input.sumpTrucks !== 1 ? "s" : ""} — covered by dig fleet lighting` })
        }

        // Other = direct blanket tower count
        if (input.other > 0) {
          totalUnits += input.other
          recs.push({ category: "Other / Additional Areas", units: input.other, notes: "Blanket tower count entered for extra towers or areas" })
        }

        // Safety floor: always recommend at least 1 tower
        if (totalUnits === 0) {
          totalUnits = 1
          recs.unshift({ category: "Minimum Coverage", units: 1, notes: "At least one tower recommended" })
        }

        // ---- Offset / competitor comparison ----
        const mickalaTowers = totalUnits
        const competitorTowers = Math.ceil(mickalaTowers * brightnessMultiplier)
        const offsetTowers = competitorTowers - mickalaTowers

        // ---- Savings on Mickala tower count ----
        const savings = calculateSavings(mickalaTowers)
        const annualSavings = savings.totalAnnual

        setResult({
          input,
          recs,
          mickalaTowers,
          competitorTowers,
          offsetTowers,
          annualSavings,
          totalAnnual: savings.totalAnnual,
          fuel: savings.fuel,
          servicing: savings.servicing,
          breakdowns: savings.breakdowns,
        })
      } catch (e) {
        setError("Something went wrong running the assessment. Please try again.")
      } finally {
        setAssessing(false)
      }
    }, 1100)
  }

  const resetCalculator = () => {
    setSiteName("")
    setDigFleets(0)
    setSumpTrucks(0)
    setDozers(0)
    setDumps(0)
    setOther(0)
    setResult(null)
    setError(null)
    setLeadName("")
    setLeadEmail("")
    setLeadPhone("")
    setLeadCompany("")
    setSubmitted(false)
    setSubmitError(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/site-assessment-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
          company: leadCompany.trim(),
          assessment: {
            siteName: result?.input?.siteName || "",
            digFleets: result?.input?.digFleets ?? 0,
            sumpTrucks: result?.input?.sumpTrucks ?? 0,
            dozers: result?.input?.dozers ?? 0,
            dumps: result?.input?.dumps ?? 0,
            other: result?.input?.other ?? 0,
            mickalaTowers: result?.mickalaTowers ?? 0,
            competitorTowers: result?.competitorTowers ?? 0,
            offsetTowers: result?.offsetTowers ?? 0,
            annualSavings: result?.annualSavings ?? 0,
          },
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.")
      }

      setSubmitted(true)
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const numInput = (value: number) => ({
    className:
      "w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] transition-colors appearance-none",
  })

  const fieldLabel = "text-[10px] text-white/40 tracking-wide uppercase mb-2 block"

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[1000px] mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <Hash className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">AI Site Assessment</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">How much could you save?</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-2xl">
          Name your site and enter your fleet size below — we'll calculate the towers you need, show you how many
          fewer assets Mickala requires vs a standard LED competitor, and estimate your annual operating savings.
        </p>

        {/* Input form */}
        <div className="border border-white/[0.06] rounded-sm p-6 mb-8">
          {/* Site Name */}
          <div className="mb-6">
            <label className={fieldLabel}>Mine Site Name</label>
            <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm bg-white/[0.04] px-4 focus-within:border-[#DC2626] transition-colors">
              <MapPin className="h-4 w-4 text-[#DC2626]" />
              <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)}
                placeholder="e.g. Peak Downs"
                className="w-full bg-transparent py-3 text-sm focus:outline-none placeholder:text-white/25" />
            </div>
          </div>

          {/* Fleet inputs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className={fieldLabel}>Dig Fleet</label>
              <input type="number" min={0} value={digFleets} onChange={e => setDigFleets(parseInt(e.target.value) || 0)} {...numInput(digFleets)} />
              <p className="text-[9px] text-white/20 mt-1">Excavator + fleet · ~12 towers each</p>
            </div>
            <div>
              <label className={fieldLabel}>Sump Trucks</label>
              <input type="number" min={0} value={sumpTrucks} onChange={e => setSumpTrucks(parseInt(e.target.value) || 0)} {...numInput(sumpTrucks)} />
              <p className="text-[9px] text-white/20 mt-1">Covered by dig fleet — no extra towers</p>
            </div>
            <div>
              <label className={fieldLabel}>Dozer Push</label>
              <input type="number" min={0} value={dozers} onChange={e => setDozers(parseInt(e.target.value) || 0)} {...numInput(dozers)} />
              <p className="text-[9px] text-white/20 mt-1">Push / dump / stockpile · 1 tower each</p>
            </div>
            <div>
              <label className={fieldLabel}>Dumps</label>
              <input type="number" min={0} value={dumps} onChange={e => setDumps(parseInt(e.target.value) || 0)} {...numInput(dumps)} />
              <p className="text-[9px] text-white/20 mt-1">Active tip heads · ~0.5 towers each</p>
            </div>
            <div>
              <label className={fieldLabel}>Other</label>
              <input type="number" min={0} value={other} onChange={e => setOther(parseInt(e.target.value) || 0)} {...numInput(other)} />
              <p className="text-[9px] text-white/20 mt-1">Direct tower count — extra areas</p>
            </div>
          </div>

          {/* Calculate CTA */}
          <div className="flex items-center gap-3">
            <button onClick={assessSite} disabled={assessing}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 transition-colors text-sm font-semibold rounded-sm">
              {assessing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Calculating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Assess My Site
                </>
              )}
            </button>
            {result && !assessing && (
              <button onClick={resetCalculator}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs border border-white/20 hover:border-white/40 transition-colors rounded-sm text-white/70">
                <RefreshCw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {assessing && (
          <div className="border border-white/[0.06] rounded-sm p-10 text-center mb-8">
            <RefreshCw className="h-6 w-6 text-[#DC2626] mx-auto mb-3 animate-spin" />
            <p className="text-sm text-white/50">Analysing fleet requirements...</p>
          </div>
        )}

        {/* Error */}
        {error && !assessing && (
          <div className="flex items-center gap-3 border border-[#DC2626]/30 bg-[#DC2626]/5 rounded-sm p-4 mb-8">
            <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
            <p className="text-sm text-white/70">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* OFFSET HEADLINE — the lead hook */}
            <div className="border border-[#DC2626]/30 bg-gradient-to-b from-[#DC2626]/10 to-transparent rounded-sm p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-[#DC2626]" />
                <p className="text-[11px] text-[#DC2626] font-semibold tracking-[0.15em] uppercase">Your Offset Estimate</p>
              </div>
              <p className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-3">
                Mickala needs <span className="text-[#DC2626]">{result.offsetTowers} fewer</span> towers/assets
              </p>
              <p className="text-sm text-white/50">vs a standard LED competitor on {result.input.siteName || "your site"}</p>
            </div>

            {/* Towers compared */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-white/[0.06] rounded-sm p-6 text-center">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Mickala Towers Required</p>
                <p className="text-4xl font-bold text-emerald-400">{result.mickalaTowers}</p>
                <p className="text-[10px] text-white/30 mt-1">50% brighter per tower → fewer needed</p>
              </div>
              <div className="border border-white/[0.06] rounded-sm p-6 text-center">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Competitor Towers Required</p>
                <p className="text-4xl font-bold text-white/80">{result.competitorTowers}</p>
                <p className="text-[10px] text-white/30 mt-1">Standard LED — needs 50% more towers</p>
              </div>
            </div>

            {/* Recommended config */}
            <div className="border border-white/[0.06] rounded-sm p-6">
              <p className="text-[10px] text-white/40 tracking-wide uppercase font-semibold mb-4">Your Input Breakdown</p>
              <div className="space-y-3">
                {result.recs.map((rec: any, i: number) => (
                  <div key={i} className={`border rounded-sm p-4 ${rec.units === 0 ? "border-white/[0.04] bg-white/[0.02]" : "border-white/[0.06]"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{rec.category}</p>
                        <p className="text-xs text-white/50">{rec.units} tower{rec.units !== 1 ? "s" : ""} required</p>
                      </div>
                      <p className="text-[11px] text-white/40 text-right max-w-[55%]">{rec.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings Breakdown */}
            <div className="border border-emerald-900/30 bg-emerald-950/10 rounded-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">Annual Savings — Mickala vs Standard LED</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { key: "fuel", icon: Fuel, label: "Fuel", value: result.fuel, sub: "0.8 vs 1.5 L/hr" },
                  { key: "servicing", icon: Wrench, label: "Service Visits", value: result.servicing, sub: "9 vs 15 visits/yr" },
                  { key: "breakdowns", icon: Clock, label: "Fewer Breakdowns", value: result.breakdowns, sub: "10x more reliable" },
                ].map((item) => (
                  <div key={item.key} className="text-center p-3 border border-emerald-900/20 rounded-sm">
                    <item.icon className="h-4 w-4 text-emerald-400/60 mx-auto mb-1" />
                    <p className="text-sm sm:text-lg font-bold text-emerald-400">{formatCurrency(item.value)}</p>
                    <p className="text-[9px] text-emerald-400/60 mt-0.5">{item.label}</p>
                    <p className="text-[8px] text-emerald-400/30 mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-emerald-900/20 flex items-center justify-between">
                <p className="text-xs text-emerald-400/60">Total estimated annual operating savings with Mickala</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">{formatCurrency(result.totalAnnual)}<span className="text-sm text-emerald-400/60"> /yr</span></p>
              </div>
            </div>

            {/* LEAD CAPTURE — the money */}
            {submitted ? (
              <div className="border border-emerald-900/30 bg-emerald-950/10 rounded-sm p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p className="text-sm text-white/60 mb-1">Your assessment has been submitted.</p>
                <p className="text-sm text-white/40">A lighting specialist will confirm these numbers against your real site and get back to you shortly.</p>
                <button onClick={resetCalculator}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 transition-colors text-sm font-semibold rounded-sm text-white/70">
                  <RefreshCw className="h-4 w-4" /> Run Another Assessment
                </button>
              </div>
            ) : (
              <div className="border border-white/[0.06] rounded-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="h-4 w-4 text-[#DC2626]" />
                  <h3 className="text-lg font-bold">Want us to confirm these numbers?</h3>
                </div>
                <p className="text-sm text-white/50 mb-6 max-w-xl">
                  Leave your details and one of our lighting specialists will review your site and send you a
                  detailed, site-confirmed assessment at no cost.
                </p>

                <form onSubmit={submitLead} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={fieldLabel}>Name *</label>
                      <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm bg-white/[0.04] px-4 focus-within:border-[#DC2626] transition-colors">
                        <User className="h-4 w-4 text-[#DC2626]" />
                        <input type="text" required value={leadName} onChange={e => setLeadName(e.target.value)} placeholder="Your full name"
                          className="w-full bg-transparent py-3 text-sm focus:outline-none placeholder:text-white/25" />
                      </div>
                    </div>
                    <div>
                      <label className={fieldLabel}>Email *</label>
                      <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm bg-white/[0.04] px-4 focus-within:border-[#DC2626] transition-colors">
                        <Mail className="h-4 w-4 text-[#DC2626]" />
                        <input type="email" required value={leadEmail} onChange={e => setLeadEmail(e.target.value)} placeholder="you@company.com"
                          className="w-full bg-transparent py-3 text-sm focus:outline-none placeholder:text-white/25" />
                      </div>
                    </div>
                    <div>
                      <label className={fieldLabel}>Phone (optional)</label>
                      <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm bg-white/[0.04] px-4 focus-within:border-[#DC2626] transition-colors">
                        <Phone className="h-4 w-4 text-[#DC2626]" />
                        <input type="tel" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} placeholder="04xx xxx xxx"
                          className="w-full bg-transparent py-3 text-sm focus:outline-none placeholder:text-white/25" />
                      </div>
                    </div>
                    <div>
                      <label className={fieldLabel}>Company (optional)</label>
                      <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm bg-white/[0.04] px-4 focus-within:border-[#DC2626] transition-colors">
                        <Building2 className="h-4 w-4 text-[#DC2626]" />
                        <input type="text" value={leadCompany} onChange={e => setLeadCompany(e.target.value)} placeholder="Company name"
                          className="w-full bg-transparent py-3 text-sm focus:outline-none placeholder:text-white/25" />
                      </div>
                    </div>
                  </div>

                  {/* Business type selector */}
                  <div className="flex gap-2">
                    {(["corporate", "abn", "individual"] as BusinessType[]).map((type) => (
                      <button type="button" key={type} onClick={() => setLeadBusiness(type)}
                        className={`px-4 py-2 text-xs border rounded-sm transition-colors capitalize ${
                          leadBusiness === type ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]" : "border-white/[0.1] text-white/50 hover:border-white/30"
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-3 border border-[#DC2626]/30 bg-[#DC2626]/5 rounded-sm p-4">
                      <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
                      <p className="text-sm text-white/70">{submitError}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 flex-wrap">
                    <button type="submit" disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 transition-colors text-sm font-semibold rounded-sm">
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" /> Request Discussion
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-white/30">
                      This is an estimate only. A specialist will confirm these numbers against the real site.
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* How the savings add up */}
            <div className="mt-2 p-4 border border-white/[0.06] rounded-sm">
              <p className="text-[10px] text-white/40 tracking-wide uppercase font-semibold mb-3">How Mickala outperforms standard LED towers</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-[11px] text-white/40">
                <div>
                  <p className="text-white/60 font-semibold mb-1">⛽ Fuel Efficiency</p>
                  <p>Mickala: <strong className="text-white/50">0.8 L/hr</strong> vs competitors: 1.5 L/hr. That's <strong className="text-white/50">47% less fuel burn</strong> per tower per year.</p>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-1">🔧 Fewer Service Visits</p>
                  <p>Mickala: <strong className="text-white/50">9 services per annum</strong> vs competitors: ~15. Built for mining, meaning less frequent refuelling and servicing.</p>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-1">💥 10x More Reliable</p>
                  <p>Mickala towers break down <strong className="text-white/50">10x less</strong> than competitor LED towers. Less downtime, fewer service truck call-outs.</p>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-1">🔦 50% Brighter</p>
                  <p>More light output per tower means <strong className="text-white/50">fewer towers needed</strong> to cover the same area — up to 33% fewer assets.</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-white/60 font-semibold mb-1">🛠️ Built for Mining</p>
                  <p className="text-white/30">Australian designed and built. Modular design with quick-changeout capability, minimal service intervals, and 24/7 support designed with mining conditions in mind.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info box */}
        <div className="mt-10 p-4 border border-white/[0.06] text-xs text-white/30 leading-relaxed">
          <p className="font-semibold text-white/50 mb-1">How this works</p>
          <p>This uses generic fleet-to-tower planning benchmarks to estimate lighting requirements per site zone. Sump trucks are tracked but covered by dig-fleet lighting. Contact us for a detailed, site-confirmed assessment.</p>
        </div>
      </div>
    </div>
  )
}
