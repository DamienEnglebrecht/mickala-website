import { SiteHeader } from "@/components/site-header"

export default function TCOCalculatorPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
        <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">AI Tool</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">TCO / ROI Calculator</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-6">See the real cost difference. Mickala&apos;s ELV 24VDC towers can be serviced by any auto electrician — competitors require specialist technicians at $200+/hr.</p>

        <TCOForm />
      </div>
    </div>
  )
}

function TCOForm() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Number of Towers</label>
          <input type="number" defaultValue={20} className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]" />
        </div>
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Hours per Day</label>
          <input type="number" defaultValue={20} className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]" />
        </div>
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Service Interval (hours)</label>
          <select className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]">
            <option value="250">250 hrs (competitor standard)</option>
            <option value="500">500 hrs (Mickala standard)</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Technician Rate</label>
          <select className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]">
            <option value="200">$200/hr — Competitor (specialist)</option>
            <option value="100">$100/hr — Auto electrician (ELV)</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="border border-white/[0.06] p-6 space-y-4 mt-8">
        <p className="text-xs text-white/40 tracking-[0.15em] uppercase">Estimated Annual Savings</p>
        <div className="grid sm:grid-cols-3 gap-4 divide-x divide-white/[0.06]">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#DC2626]">$38,400</p>
            <p className="text-[11px] text-white/40 mt-1">Service Labour</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#DC2626]">$12,000</p>
            <p className="text-[11px] text-white/40 mt-1">Parts & Consumables</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#DC2626]">$50,400</p>
            <p className="text-[11px] text-white/40 mt-1">Total Annual Savings</p>
          </div>
        </div>
        <p className="text-xs text-white/30 text-center">Over 5 years: <span className="text-white/60 font-semibold">$252,000 saved</span> with Mickala ELV 24VDC towers.</p>
      </div>

      <div className="pt-4 border-t border-white/[0.06]">
        <h3 className="text-sm font-semibold mb-4">Get the full breakdown</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Name" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
          <input type="email" placeholder="Email Address" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
          <input type="tel" placeholder="Phone" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
          <input type="text" placeholder="Company Name" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
        </div>
      </div>

      <button className="w-full py-4 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-sm">
        Send Me the Full Report
      </button>
    </div>
  )
}
