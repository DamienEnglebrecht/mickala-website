"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, MapPin, Phone, Mail, ChevronDown, ChevronUp, Check, Shield, Award, Settings, Wrench, Truck, HeadphonesIcon, Factory, Lightbulb, Star, TrendingUp, Users, Globe, Clock, Layers, Zap, Thermometer, Droplets, Laptop, Lock, Flame, Hammer } from "lucide-react"
import { useState } from "react"

const features = [
  { feature: "Tier IV Engines", status: "Standard", benefit: "Lower emissions. Complies with Australian standards." },
  { feature: "Extra Low Voltage (24/48VDC)", status: "Standard", benefit: "Any auto electrician or fitter can service them. No high-voltage risk." },
  { feature: "Remote Start & Stop (Timer Mode)", status: "Standard", benefit: "Reduces fuel consumption and unnecessary engine hours." },
  { feature: "Self Bunded — All Contaminants Contained", status: "Standard", benefit: "Zero environmental spill risk. Complies with site requirements." },
  { feature: "LED Low-Level Fuel Beacon", status: "Standard", benefit: "24-hour low-fuel alert sent to your central network. Never run out on site." },
  { feature: "Lockable Starter & Battery Isolators", status: "Standard", benefit: "Complies with mining safety standards. Prevents unauthorised operation." },
  { feature: "LED Tail Lights & Beacons", status: "Standard", benefit: "Lower maintenance and longer service life compared to incandescent lighting." },
  { feature: "Jump Start Receptacle", status: "Standard", benefit: "Eliminates the risk of battery explosion from jumper leads." },
  { feature: "Emergency Stop x 2", status: "Standard", benefit: "Dual emergency stops. Complies with the highest mining safety standards." },
  { feature: "MDG15 & MDG41 Compliant", status: "Standard", benefit: "NSW-compliant. Movement across state borders without compromise." },
  { feature: "GPS Remote Monitoring", status: "Option", benefit: "Real-time GPS tracking of location, machine health, and operational status." },
  { feature: "Remote Control Operation", status: "Option", benefit: "Enables continuous operations during shift changes without on-site intervention." },
  { feature: "3-Stage Paint Process", status: "Standard", benefit: "E-coated and baked at 180°C with two coats of 2K polyurethane. Lifetime corrosion protection." },
  { feature: "Fire Extinguisher (4.5–9kg)", status: "Standard", benefit: "Complies with site safety requirements." },
  { feature: "Air Pre-Cleaner", status: "Standard", benefit: "Extends air filter life in dusty mining environments." },
]

const certifications = ["Fire Risk Assessment", "Mines Safety & Inspection Regulations 1995", "AS2790 Transportable Generator Sets", "AS3713 Noise Level Emissions", "AS3001 Electrical Wiring Rules", "AS3010.1 Supply of Generator Set", "AS1170.2 Wind Loading Criteria", "MDG 41", "MDG 15"]

const stats = [
  { icon: Users, value: "500+", label: "Lighting Towers Delivered" },
  { icon: Globe, value: "Global", label: "Supply & Support Network" },
  { icon: Clock, value: "24/7", label: "Technical Support" },
  { icon: Star, value: "15+", label: "Years of Innovation" },
]

const clients = ["BHP", "Yancoal", "Glencore", "Rio Tinto", "Peabody", "Thiess", "Golding", "MacMahon", "MACA Mining", "MacKellar Mining"]

const sections = [
  { id: "about", title: "About Us", icon: Users },
  { id: "vision", title: "Our Vision", icon: TrendingUp },
  { id: "why", title: "Why Mickala", icon: Star },
  { id: "capabilities", title: "Capabilities", icon: Settings },
  { id: "features", title: "Standard Features", icon: Zap },
  { id: "fabrication", title: "Fabrication", icon: Factory },
  { id: "clients", title: "Clients", icon: Users },
]

export default function CapabilityStatement() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <div className="bg-white">
      {/* NAV - print hidden */}
      <div className="sticky top-0 z-50 bg-white border-b no-print">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
          <Link href="/documents" className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="inline-flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1.5 rounded-full hover:bg-red-700 transition-colors">
              <Printer className="h-3 w-3" /> Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* ======== COVER PAGE ======== */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero-towers.webp" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-red-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Since 2007</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Mickala Lighting<span className="text-red-500">.</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-300">Capability Statement</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Australia's leading privately owned OEM manufacturer of Extra Low Voltage LED lighting towers — engineered for Australian conditions since 2007.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
                <Check className="h-3.5 w-3.5 text-red-400" /> OEM Manufacturer
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
                <Check className="h-3.5 w-3.5 text-red-400" /> ELV LED Lighting
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
                <Check className="h-3.5 w-3.5 text-red-400" /> Mining Certified
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
                <Check className="h-3.5 w-3.5 text-red-400" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======== QUICK STATS ======== */}
      <section className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <s.icon className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ======== ABOUT US ======== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">Innovation Through Continuous Improvement</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Mickala Group is Australia's leading privately owned OEM manufacturer of Extra Low Voltage (ELV) LED lighting towers. Since 2007, we have built our reputation on long-term client partnerships, operational reliability, and continuous innovation — not transactional supply.</p>
                <p>Every tower we manufacture is designed, engineered, and tested in-house. Our factory-trained technicians deliver maintenance and breakdown support across Australia's most demanding mining, civil, and industrial sites. We do not outsource service. We do not compromise on quality.</p>
                <p>Our commitment to safety, quality assurance, environmental compliance, and continuous improvement is embedded across every function — from procurement and fabrication through to field support and fleet management. This integrated approach sets Mickala apart in a competitive industry.</p>
                <p>With 100% control of our supply chain, we reduce costs without reducing quality — and pass that value directly to our clients.</p>
              </div>
            </div>
            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/capability-images/capability_image1.jpeg" alt="Mickala lighting tower fleet" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== CORE BUSINESS ======== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Core Business</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">What We Do</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: "OEM Manufacturing", desc: "In-house design and manufacture of ELV LED lighting towers. Every component engineered, tested, and proven in Australian conditions." },
              { icon: TrendingUp, title: "Direct Sales", desc: "Purchase direct from the manufacturer. Full warranty, OEM support, and factory-backed service agreements." },
              { icon: Truck, title: "Direct Hire", desc: "Short or long-term hire of our fleet. Flexible commercial terms with end-to-end fleet management." },
              { icon: HeadphonesIcon, title: "Turnkey Maintenance", desc: "Hire, maintain, service, and refuel — we manage the full lifecycle of your lighting tower fleet." },
              { icon: Wrench, title: "Repair & Maintenance Workshop", desc: "Fully equipped workshop for repairs, servicing, and refurbishment of all lighting tower makes and models." },
              { icon: Settings, title: "Mobile Support", desc: "Factory-trained technicians deployed on-site for warranty, maintenance, and breakdown support — 24/7." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 mb-4">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== VISION ======== */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Our Vision</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">Delivering Year-on-Year Cost Reductions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">Every product, every service, and every innovation is measured against one standard: does it improve our client's position?</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {[
              "Innovation through continuous improvement — delivering tomorrow's technology today",
              "Reduce administration costs and carbon footprint for our clients",
              "Achieve preferred supplier status through proven capability and performance",
              "Deliver safe, cost-effective project solutions and services",
              "Maintain the highest standards of professionalism and safety across our workforce",
              "Build lasting business partnerships with clients and the broader community",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== WHY MICKALA ======== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Why Mickala</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Built for the Mining Industry</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Cost Effective", desc: "Australian designed and engineered for the harshest operating conditions. 100% supply chain control means lower costs passed directly to you." },
              { icon: Shield, title: "Quality Guaranteed", desc: "12 months or 1500 hours warranty as standard. Extended warranty available through Mickala Service Agreements (MSA)." },
              { icon: Zap, title: "Latest Technology", desc: "Industry leaders in design innovation. We deliver tomorrow's technology today." },
              { icon: Hammer, title: "Built for Mining", desc: "Engineered to mine specifications with a proven service life of 10–15 years in the most demanding environments." },
              { icon: Clock, title: "24/7 Breakdown Support", desc: "Factory-trained OEM technicians on call. Minimal disruption to your operations." },
              { icon: Users, title: "Experienced Personnel", desc: "Continuous in-house and external training keeps our team ahead of the latest service, diagnostic, and repair standards." },
              { icon: Layers, title: "OEM Supply Chain", desc: "Full control of product quality, inventory levels, and dispatch timeframes across NSW and Central Queensland." },
              { icon: Wrench, title: "Standard Parts", desc: "Interchangeable components across all models — reduces inventory complexity and downtime." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 mb-4">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CLIENTS ======== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Our Clients</span>
          <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-10">Trusted by Major Mining Companies</h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {clients.map(c => (
              <span key={c} className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SUPPLY CHAIN ======== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <Image src="/capability-images/capability_image15.jpeg" alt="Mickala supply chain and manufacturing" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Supply Chain</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">International Supply Chain</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Mickala Group operates within an international OEM supply chain. Approximately 90% of all component procurement for each ELV LED lighting tower is managed within the Group — giving us control over quality, cost, and lead time that competitors cannot match.</p>
                <p>This integrated supply model gives our clients confidence that Mickala can provide service, labour, components, and technical support for the full life of the asset.</p>
                <p>Every component fitted to a Mickala tower is proven through comprehensive field testing on our own hire fleet before reaching a client site.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== DESIGN & CERTIFICATION ======== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Design & Certification</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">Engineered for Australian Conditions</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Mickala LED lighting towers are designed and engineered in Australia for the toughest operating environments — mining, civil, rail, local government, and metropolitan infrastructure. All design and engineering is carried out within the Mickala Group and certified by our Managing Director.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {certifications.map(c => (
                  <span key={c} className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600">{c}</span>
                ))}
              </div>
            </div>
            <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/capability-images/capability_image35.jpeg" alt="Mickala lighting tower in operation" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== FABRICATION ======== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <Image src="/capability-images/capability_image12.jpeg" alt="Mickala fabrication facility" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Fabrication</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">Modern Manufacturing Facility</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Our modern manufacturing facility has the capacity to produce in excess of 500 LED lighting towers per annum, with semi-autonomous production supported by skilled trades.</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Zap, label: "3kW Laser Cutter" },
                  { icon: Settings, label: "CNC Press" },
                  { icon: Settings, label: "2 x 5-Axis Robots" },
                  { icon: Wrench, label: "6 Laser Align Weld Benches" },
                  { icon: Flame, label: "TIG & MIG Welding" },
                  { icon: Settings, label: "CNC Pipe Bender" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                    <item.icon className="h-4 w-4 text-red-600 shrink-0" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== PROTECTION (PAINT) ======== */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Protection</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-4">3-Stage Paint Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Every fabricated component is hydrostatically e-coated, baked at 180°C, and finished with two coats of 2K polyurethane. The result is corrosion protection that outlasts the equipment warranty.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["E-Coat Submersion", "Baked at 180°C", "2K Polyurethane Top Coat", "Lifetime Protection"].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-300">
                <Check className="h-3.5 w-3.5 text-red-400" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== STANDARD FEATURES ======== */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Standard Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">What Every Tower Comes With</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold w-24">S/O</th>
                  <th className="text-left p-4 font-semibold">Benefit</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-4 font-medium text-gray-900">{f.feature}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${f.status === "Standard" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{f.status === "Standard" ? "S" : "O"}</span>
                    </td>
                    <td className="p-4 text-gray-600">{f.benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======== GALLERY ======== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Gallery</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-3">Our Fleet in Action</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[2,3,4,5,6,7,8,9,10,11,13,14,16,17,18,19,20,21,22,24].map(n => (
              <div key={n} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={`/capability-images/capability_image${n}.jpeg`} alt={`Mickala lighting tower ${n}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== LOCATIONS ======== */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Our Locations</span>
            <h2 className="text-2xl font-bold mt-3">National Presence</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { city: "Mackay", addr: "21 Caterpillar Drive\nPaget QLD 4740", phone: "07 4998 5447" },
              { city: "Muswellbrook", addr: "37 Thomas Mitchell Drive\nMuswellbrook NSW 2333", phone: "02 5542 0000" },
            ].map((loc, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <MapPin className="h-5 w-5 text-red-400 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">{loc.city}</h3>
                <p className="text-sm text-gray-400 whitespace-pre-line mb-2">{loc.addr}</p>
                <p className="text-sm text-gray-400">{loc.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CONTACT ======== */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">Contact us to discuss your lighting tower requirements. We will provide a competitive, tailored solution for your site and application.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> 1300 642 525</span>
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> management@mickala.com.au</span>
            <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" /> www.mickalagroup.com.au</span>
          </div>
        </div>
      </section>

      {/* ======== FOOTER ======== */}
      <div className="bg-gray-900 text-gray-500 text-[10px] py-4 text-center border-t border-gray-800">
        Mickala Group  |  Document: Capability Statement  |  Rev 1.0  |  &ldquo;Innovation Through Continuous Improvement&rdquo;
      </div>
    </div>
  )
}
