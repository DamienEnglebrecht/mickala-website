"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in required fields: Name, Email, and Message.")
      return
    }
    // For now just show success — no backend hooked yet
    setSubmitted(true)
  }

  const locations = [
    { name: "Head Office — Mackay", address: "21 Caterpillar Drive, Paget QLD 4740", phone: "1300 642 525", email: "management@mickalagroup.com.au", hours: "Mon–Fri: 7:00 AM – 5:00 PM" },
    { name: "NSW Depot", address: "37 Thomas Mitchell Dr, Muswellbrook NSW 2333", phone: "1300 642 525", email: "management@mickalagroup.com.au", hours: "Mon–Fri: 7:00 AM – 5:00 PM" },
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[1000px] mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <Mail className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">Contact</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Get in touch.</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-12 max-w-2xl">
          Talk to our team about lighting towers, LED lighting, fuel trailers, custom fabrication, or parts.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="border border-emerald-900/30 bg-emerald-950/10 rounded-sm p-8 text-center">
                <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Thanks, {form.name}.</p>
                <p className="text-sm text-white/50">We&apos;ll review your message and get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", company: "", message: "" }) }}
                  className="mt-6 text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors">
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/40 tracking-wide uppercase mb-1.5 block">Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/40 tracking-wide uppercase mb-1.5 block">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/40 tracking-wide uppercase mb-1.5 block">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/40 tracking-wide uppercase mb-1.5 block">Company / Site</label>
                    <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-white/40 tracking-wide uppercase mb-1.5 block">Message *</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] h-32 resize-none" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-white/30">We&apos;ll respond within 24 hours</p>
                  <button type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full">
                    <Send className="h-3.5 w-3.5" /> Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div className="space-y-8">
            {locations.map((loc) => (
              <div key={loc.name} className="border border-white/[0.06] rounded-sm p-5">
                <p className="text-sm font-semibold mb-3">{loc.name}</p>
                <div className="space-y-2 text-xs text-white/50">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-white/30 mt-0.5 shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-3.5 w-3.5 text-white/30 mt-0.5 shrink-0" />
                    <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{loc.phone}</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-3.5 w-3.5 text-white/30 mt-0.5 shrink-0" />
                    <a href={`mailto:${loc.email}`} className="hover:text-white transition-colors">{loc.email}</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-white/30 mt-0.5 shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="border border-white/[0.06] rounded-sm p-5">
              <p className="text-sm font-semibold mb-3">Emergency / Breakdown</p>
              <p className="text-xs text-white/50 mb-3">24/7 service support for existing customers.</p>
              <a href="tel:1300642525" className="inline-flex items-center gap-2 text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors font-semibold">
                <Phone className="h-3.5 w-3.5" /> 1300 642 525
              </a>
            </div>

            <div className="border border-white/[0.06] rounded-sm p-5">
              <p className="text-sm font-semibold mb-2">Connect</p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/mickala-group" target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-white/40 hover:text-[#DC2626] transition-colors uppercase tracking-wide">LinkedIn</a>
                <a href="https://www.youtube.com/@MickalaGroup" target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-white/40 hover:text-[#DC2626] transition-colors uppercase tracking-wide">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        {/* Map or CTA */}
        <div className="border border-white/[0.06] rounded-sm p-8 text-center">
          <p className="text-xs text-white/40 mb-2">ABN 92 180 218 353 · ISO 9001 Certified</p>
          <p className="text-xs text-white/30">Mickala Group — Australian-owned OEM manufacturer since 2007</p>
        </div>
      </div>
    </div>
  )
}
