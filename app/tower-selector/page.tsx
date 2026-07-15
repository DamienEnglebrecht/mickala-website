import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

export default function TowerSelectorPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
        <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">AI Tool</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Tower Selector</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-10">Tell us about your site. We&apos;ll recommend the exact tower, coverage plan, and estimated cost.</p>

        <TowerSelectorForm />
      </div>
    </div>
  )
}

function TowerSelectorForm() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Site Area (hectares)</label>
          <select className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]">
            <option value="">Select area</option>
            <option value="5">Up to 5 ha</option>
            <option value="10">5 – 10 ha</option>
            <option value="20">10 – 20 ha</option>
            <option value="30">20 – 30 ha</option>
            <option value="50">30 – 50 ha</option>
            <option value="100">50+ ha</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Operating Hours</label>
          <select className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]">
            <option value="">Select hours</option>
            <option value="12">12 hours / day</option>
            <option value="24">24 hours / day</option>
            <option value="intermittent">Intermittent / on-demand</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Terrain</label>
          <select className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]">
            <option value="">Select terrain</option>
            <option value="flat">Flat / cleared</option>
            <option value="undulating">Undulating</option>
            <option value="pit">Open pit / highwall</option>
            <option value="road">Road / linear</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Environment</label>
          <select className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#DC2626]">
            <option value="">Select environment</option>
            <option value="dusty">Dusty (mine site)</option>
            <option value="wet">Wet / humid</option>
            <option value="corrosive">Corrosive (salt / chemicals)</option>
            <option value="standard">Standard construction</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-[11px] text-white/40 tracking-wide uppercase mb-2 block">Additional Requirements</label>
        <div className="flex flex-wrap gap-3">
          {["GPS Monitoring", "Remote Control", "Generator Backup", "Extra Fuel Capacity", "High Wind Rating"].map((req) => (
            <label key={req} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#DC2626]" />
              <span className="text-sm text-white/60">{req}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06]">
        <h3 className="text-sm font-semibold mb-4">Contact Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Name" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
          <input type="email" placeholder="Email Address" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
          <input type="tel" placeholder="Phone" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
          <input type="text" placeholder="Company Name" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#DC2626]" />
        </div>
      </div>

      <button className="w-full py-4 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-sm">
        Get My Recommendation
      </button>

      <p className="text-xs text-white/30 text-center">We&apos;ll analyse your requirements and send a personalised recommendation to your inbox.</p>
    </div>
  )
}
