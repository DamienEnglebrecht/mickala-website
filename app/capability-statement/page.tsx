"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, MapPin, Phone, Mail, Globe, Check, Shield, TrendingUp, Clock, Users, Layers, Wrench, Zap, Hammer, Settings, Factory, Lightbulb, HeadphonesIcon, Star, Award, Truck } from "lucide-react"

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
  { feature: "3-Stage Paint Process", status: "Standard", benefit: "E-coated and baked at 180\u00b0C with two coats of 2K polyurethane. Lifetime corrosion protection." },
  { feature: "Fire Extinguisher (4.5\u20139kg)", status: "Standard", benefit: "Complies with site safety requirements." },
  { feature: "Air Pre-Cleaner", status: "Standard", benefit: "Extends air filter life in dusty mining environments." },
]

const certifications = [
  "Fire Risk Assessment", "Mines Safety & Inspection Regulations 1995",
  "AS2790 Transportable Generator Sets", "AS3713 Noise Level Emissions",
  "AS3001 Electrical Wiring Rules", "AS3010.1 Supply of Generator Set",
  "AS1170.2 Wind Loading Criteria", "MDG 41", "MDG 15",
]

const clients = ["BHP", "Yancoal", "Glencore", "Rio Tinto", "Peabody", "Thiess", "Golding", "MacMahon", "MACA Mining", "MacKellar Mining"]

const capabilities = [
  { icon: Lightbulb, title: "OEM Manufacturing", desc: "In-house design and manufacture of ELV LED lighting towers. Every component engineered, tested, and proven in Australian conditions." },
  { icon: TrendingUp, title: "Direct Sales", desc: "Purchase direct from the manufacturer. Full warranty, OEM support, and factory-backed service agreements." },
  { icon: Truck, title: "Direct Hire", desc: "Short or long-term hire of our fleet. Flexible commercial terms with end-to-end fleet management." },
  { icon: HeadphonesIcon, title: "Turnkey Maintenance", desc: "Hire, maintain, service, and refuel \u2014 we manage the full lifecycle of your lighting tower fleet." },
  { icon: Wrench, title: "Repair & Maintenance Workshop", desc: "Fully equipped workshop for repairs, servicing, and refurbishment of all lighting tower makes and models." },
  { icon: Settings, title: "Mobile Support", desc: "Factory-trained technicians deployed on-site for warranty, maintenance, and breakdown support \u2014 24/7." },
]

const reasons = [
  { icon: TrendingUp, title: "Cost Effective", desc: "Australian designed and engineered for the harshest operating conditions. 100% supply chain control means lower costs passed directly to you." },
  { icon: Shield, title: "Quality Guaranteed", desc: "12 months or 1500 hours warranty as standard. Extended warranty available through Mickala Service Agreements (MSA)." },
  { icon: Zap, title: "Latest Technology", desc: "Industry leaders in design innovation. We deliver tomorrow\u2019s technology today." },
  { icon: Hammer, title: "Built for Mining", desc: "Engineered to mine specifications with a proven service life of 10\u201315 years in the most demanding environments." },
  { icon: Clock, title: "24/7 Breakdown Support", desc: "Factory-trained OEM technicians on call. Minimal disruption to your operations." },
  { icon: Users, title: "Experienced Personnel", desc: "Continuous in-house and external training keeps our team ahead of the latest service, diagnostic, and repair standards." },
  { icon: Layers, title: "OEM Supply Chain", desc: "Full control of product quality, inventory levels, and dispatch timeframes across NSW and Central Queensland." },
  { icon: Wrench, title: "Standard Parts", desc: "Interchangeable components across all models \u2014 reduces inventory complexity and downtime." },
]

const equipment = ["3kW Laser Cutter", "CNC Press", "2 x 5-Axis Robots", "6 Laser Align Weld Benches", "TIG & MIG Welding", "CNC Pipe Bender"]

export default function CapabilityStatement() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          body { background: white !important; font-size: 10pt; line-height: 1.35; color: #000 !important; }
          * { background: transparent !important; background-color: white !important; color: black !important; text-shadow: none !important; box-shadow: none !important; }
          nav, button, .fixed, .sticky, .no-print, iframe, video { display: none !important; }
          img { max-width: 100% !important; page-break-inside: avoid; display: block !important; }
          .print-section { page-break-inside: avoid; }
          h1 { font-size: 22pt !important; margin-top: 0; page-break-after: avoid; }
          h2 { font-size: 14pt !important; page-break-after: avoid; }
          h3 { font-size: 11pt !important; page-break-after: avoid; }
          table { width: 100% !important; border-collapse: collapse !important; font-size: 8pt !important; }
          th { background-color: #222 !important; color: white !important; padding: 4pt 6pt !important; text-align: left !important; border: 1px solid #ccc !important; }
          td { padding: 3pt 6pt !important; border: 1px solid #ccc !important; }
          tr { page-break-inside: avoid; }
          .max-w-6xl, .max-w-4xl { max-width: 100% !important; margin: 0 !important; padding: 0.5cm 0 !important; }
          .print-hide { display: none !important; }
          .cover-bg, .cover-gradient { display: none !important; }
          [class*="bg-gradient"] { background: none !important; }
          .cover-content { padding: 1cm 0 !important; }
          .grid { display: block !important; }
          .grid > * { display: block !important; margin-bottom: 6pt !important; }
          .md\\:grid-cols-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10pt !important; }
          .md\\:grid-cols-2 > * { margin-bottom: 0 !important; }
          .card-icon { display: none !important; }
          [class*="rounded-"] { border-radius: 0 !important; }
          [class*="shadow"] { box-shadow: none !important; }
        }
      `}</style>

      {/* NAV */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 no-print">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
          <Link href="/documents" className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 no-print">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-800 transition-colors">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>
      </div>

      {/* COVER */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] cover-bg">
          <Image src="/hero-towers.webp" alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/10 to-transparent cover-gradient" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full cover-content">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-red-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">Since 2007</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              Mickala Lighting<span className="text-red-500">.</span>
              <br />
              <span className="text-3xl sm:text-4xl font-normal text-gray-300">Capability Statement</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Australia&rsquo;s leading privately owned OEM manufacturer of Extra Low Voltage LED lighting towers &mdash; engineered for Australian conditions since 2007.
            </p>
            <div className="flex flex-wrap gap-3">
              {["OEM Manufacturer", "ELV LED Lighting", "Mining Certified", "24/7 Support"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-xs text-gray-300">
                  <Check className="h-3 w-3 text-red-400" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: "2000+", label: "Lighting Towers Delivered", icon: Award },
              { value: "Global", label: "Supply & Support Network", icon: Globe },
              { value: "24/7", label: "Technical Support", icon: Clock },
              { value: "15+", label: "Years of Innovation", icon: TrendingUp },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="h-5 w-5 text-red-600 mx-auto mb-2 card-icon" />
                <div className="text-3xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="print-section py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">Innovation Through Continuous Improvement</h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>Mickala Group is Australia&rsquo;s leading privately owned OEM manufacturer of Extra Low Voltage (ELV) LED lighting towers. Since 2007, we have built our reputation on long-term client partnerships, operational reliability, and continuous innovation &mdash; not transactional supply.</p>
                <p>Every tower we manufacture is designed, engineered, and tested in-house. Our factory-trained technicians deliver maintenance and breakdown support across Australia&rsquo;s most demanding mining, civil, and industrial sites.</p>
                <p>Our commitment to safety, quality assurance, environmental compliance, and continuous improvement is embedded across every function. With 100% control of our supply chain, we reduce costs without reducing quality &mdash; and pass that value directly to our clients.</p>
              </div>
            </div>
            <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
              <Image src="/capability-images/capability_image1.jpeg" alt="Mickala lighting tower fleet" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="print-section py-20 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Do</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors">
                <item.icon className="h-5 w-5 text-red-600 mb-3 card-icon" />
                <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="print-section py-20 sm:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-400 mb-3 block">Our Vision</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Delivering Year-on-Year Cost Reductions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-base">Every product, every service, and every innovation is measured against one standard: does it improve our client&rsquo;s position?</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
            {[
              "Innovation through continuous improvement \u2014 delivering tomorrow\u2019s technology today",
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

      {/* WHY MICKALA */}
      <section className="print-section py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Why Mickala</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Built for the Mining Industry</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors">
                <item.icon className="h-5 w-5 text-red-600 mb-3 card-icon" />
                <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="print-section py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Our Clients</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Trusted by Major Mining Companies</h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-5">
            {clients.map((c) => (
              <span key={c} className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLY CHAIN */}
      <section className="print-section py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="relative h-[350px] sm:h-[450px] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
              <Image src="/capability-images/capability_image15.jpeg" alt="Mickala supply chain and manufacturing" fill className="object-cover" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Supply Chain</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">International Supply Chain</h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>Mickala Group operates within an international OEM supply chain. Approximately 90% of all component procurement for each ELV LED lighting tower is managed within the Group &mdash; giving us control over quality, cost, and lead time that competitors cannot match.</p>
                <p>This integrated supply model gives our clients confidence that Mickala can provide service, labour, components, and technical support for the full life of the asset.</p>
                <p>Every component fitted to a Mickala tower is proven through comprehensive field testing on our own hire fleet before reaching a client site.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN & CERTIFICATION */}
      <section className="print-section py-20 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Design &amp; Certification</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">Engineered for Australian Conditions</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">Mickala LED lighting towers are designed and engineered in Australia for the toughest operating environments &mdash; mining, civil, rail, local government, and metropolitan infrastructure. All design and engineering is carried out within the Mickala Group and certified by our Managing Director.</p>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((c) => (
                  <span key={c} className="text-xs bg-white border border-gray-200 rounded px-3 py-2 text-gray-600">{c}</span>
                ))}
              </div>
            </div>
            <div className="relative h-[350px] sm:h-[450px] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
              <Image src="/capability-images/capability_image35.jpeg" alt="Mickala lighting tower in operation" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FABRICATION */}
      <section className="print-section py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="relative h-[350px] sm:h-[450px] rounded-lg overflow-hidden bg-gray-100 shadow-sm order-2 md:order-1">
              <Image src="/capability-images/capability_image12.jpeg" alt="Mickala fabrication facility" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Fabrication</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">Modern Manufacturing Facility</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">Our modern manufacturing facility has the capacity to produce in excess of 500 LED lighting towers per annum, with semi-autonomous production supported by skilled trades.</p>
              <div className="grid grid-cols-2 gap-3">
                {equipment.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                    <Settings className="h-4 w-4 text-red-600 shrink-0 card-icon" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAINT */}
      <section className="print-section py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-400 mb-3 block">Protection</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">3-Stage Paint Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">Every fabricated component is hydrostatically e-coated, baked at 180&deg;C, and finished with two coats of 2K polyurethane. The result is corrosion protection that outlasts the equipment warranty.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["E-Coat Submersion", "Baked at 180\u00b0C", "2K Polyurethane Top Coat", "Lifetime Protection"].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm text-gray-300">
                <Check className="h-3.5 w-3.5 text-red-400" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STANDARD FEATURES */}
      <section className="print-section py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Standard Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Every Tower Comes With</h2>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-900 border-t border-gray-100">{f.feature}</td>
                    <td className="p-4 text-center border-t border-gray-100">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${f.status === "Standard" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{f.status === "Standard" ? "S" : "O"}</span>
                    </td>
                    <td className="p-4 text-gray-600 border-t border-gray-100">{f.benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="print-section py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600 mb-3 block">Gallery</span>
            <h2 className="text-2xl font-bold text-gray-900">Our Fleet in Action</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <div key={n} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image src={`/capability-images/capability_image${n}.jpeg`} alt={`Mickala lighting tower ${n}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="print-section py-14 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-400 mb-3 block">Our Locations</span>
            <h2 className="text-2xl font-bold">National Presence</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { city: "Mackay", addr: "21 Caterpillar Drive\nPaget QLD 4740", phone: "07 4998 5447" },
              { city: "Muswellbrook", addr: "37 Thomas Mitchell Drive\nMuswellbrook NSW 2333", phone: "02 5542 0000" },
            ].map((loc, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <MapPin className="h-5 w-5 text-red-400 mx-auto mb-3 card-icon" />
                <h3 className="font-bold text-lg mb-1">{loc.city}</h3>
                <p className="text-sm text-gray-400 whitespace-pre-line mb-1">{loc.addr}</p>
                <p className="text-sm text-gray-400">{loc.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="print-section py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let&rsquo;s Work Together</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto text-sm">Contact us to discuss your lighting tower requirements. We will provide a competitive, tailored solution for your site and application.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> 1300 642 525</span>
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> management@mickala.com.au</span>
            <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" /> www.mickalagroup.com.au</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="bg-gray-900 text-gray-500 text-[10px] py-4 text-center border-t border-gray-800">
        Mickala Group  |  Document: Capability Statement  |  Rev 1.0  |  Innovation Through Continuous Improvement
      </div>
    </div>
  )
}
