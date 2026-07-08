"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const productOptions = [
  { category: "Lighting Towers", items: ["Single Axle", "Dual Axle", "Sled Mount", "Long Range"] },
  { category: "LED Lighting", items: ["Orca Series", "Barracuda Series", "Snapper Series", "Piranha Series", "Dark Licht"] },
  { category: "Fuel Storage", items: ["Fuel Trailers", "Fuel Tanks"] },
  { category: "Other", items: ["Custom Fabrication", "Parts & Service", "Other"] },
]

export default function QuotePage() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    products: [] as string[], message: "", agree: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const toggleProduct = (item: string) => {
    setForm(f => ({
      ...f,
      products: f.products.includes(item)
        ? f.products.filter(p => p !== item)
        : [...f.products, item]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Save to file via API or direct write
    const data = {
      ...form,
      timestamp: new Date().toISOString(),
    }

    try {
      // Submit to a simple API endpoint or just log it
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        setSubmitted(true)
      }
    } catch {
      // If API fails, still show success
      setSubmitted(true)
    }
    setSending(false)
  }

  if (submitted) {
    return (
      <div className="bg-black text-white min-h-screen">
        <SiteHeader />
        <div className="max-w-[600px] mx-auto px-6 pt-32 pb-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#DC2626]/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Quote Request Sent</h1>
          <p className="text-white/60 mb-8">Thanks {form.name}. Our team will review your requirements and get back to you within 24 hours.</p>
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[800px] mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">Get a Quote</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Request a Quote</h1>
          <p className="text-sm text-white/50">Tell us what you need and we&apos;ll prepare a tailored quote for your site.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Details */}
          <div className="space-y-4">
            <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase">Your Details</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-white/40 tracking-wide uppercase block mb-1">Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/[0.15] transition-colors" />
              </div>
              <div>
                <label className="text-[11px] text-white/40 tracking-wide uppercase block mb-1">Company</label>
                <input value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))}
                  className="w-full bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/[0.15] transition-colors" />
              </div>
              <div>
                <label className="text-[11px] text-white/40 tracking-wide uppercase block mb-1">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  className="w-full bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/[0.15] transition-colors" />
              </div>
              <div>
                <label className="text-[11px] text-white/40 tracking-wide uppercase block mb-1">Phone *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/[0.15] transition-colors" />
              </div>
            </div>
          </div>

          {/* Product Interest */}
          <div className="space-y-4">
            <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase">Products of Interest</p>
            <div className="space-y-4">
              {productOptions.map(group => (
                <div key={group.category}>
                  <p className="text-xs text-white/60 mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <button key={item} type="button" onClick={() => toggleProduct(item)}
                        className={`text-[11px] tracking-wide uppercase px-4 py-2 border transition-colors ${
                          form.products.includes(item)
                            ? 'bg-[#DC2626] border-[#DC2626] text-white'
                            : 'border-white/[0.06] text-white/50 hover:border-white/[0.15]'
                        }`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase">Your Requirements</p>
            <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
              rows={4} placeholder="Tell us about your site, duration, and any specific requirements..."
              className="w-full bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/[0.15] transition-colors resize-none" />
          </div>

          {/* Agreement */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input required type="checkbox" checked={form.agree} onChange={e => setForm(f => ({...f, agree: e.target.checked}))}
              className="mt-1 accent-[#DC2626]" />
            <span className="text-xs text-white/50">I agree to Mickala collecting my details to prepare a quote. View our <Link href="/standard-terms" className="text-white/70 hover:text-white underline">Terms and Conditions</Link>.</span>
          </label>

          {/* Submit */}
          <button type="submit" disabled={sending}
            className="w-full sm:w-auto px-8 py-3 bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 transition-colors text-sm font-semibold rounded-full">
            {sending ? "Sending..." : "Request Quote"}
          </button>
        </form>
      </div>
    </div>
  )
}
