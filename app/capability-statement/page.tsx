"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, MapPin, Phone, Mail, Globe } from "lucide-react"

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
  "Fire Risk Assessment",
  "Mines Safety & Inspection Regulations 1995",
  "AS2790 Transportable Generator Sets",
  "AS3713 Noise Level Emissions",
  "AS3001 Electrical Wiring Rules",
  "AS3010.1 Supply of Generator Set",
  "AS1170.2 Wind Loading Criteria",
  "MDG 41",
  "MDG 15",
]

const clients = [
  "BHP", "Yancoal", "Glencore", "Rio Tinto", "Peabody",
  "Thiess", "Golding", "MacMahon", "MACA Mining", "MacKellar Mining",
]

const capabilities = [
  { title: "OEM Manufacturing", desc: "In-house design and manufacture of ELV LED lighting towers. Every component engineered, tested, and proven in Australian conditions." },
  { title: "Direct Sales", desc: "Purchase direct from the manufacturer. Full warranty, OEM support, and factory-backed service agreements." },
  { title: "Direct Hire", desc: "Short or long-term hire of our fleet. Flexible commercial terms with end-to-end fleet management." },
  { title: "Turnkey Maintenance", desc: "Hire, maintain, service, and refuel \u2014 we manage the full lifecycle of your lighting tower fleet." },
  { title: "Repair & Maintenance Workshop", desc: "Fully equipped workshop for repairs, servicing, and refurbishment of all lighting tower makes and models." },
  { title: "Mobile Support", desc: "Factory-trained technicians deployed on-site for warranty, maintenance, and breakdown support \u2014 24/7." },
]

const reasons = [
  { title: "Cost Effective", desc: "Australian designed and engineered for the harshest operating conditions. 100% supply chain control means lower costs passed directly to you." },
  { title: "Quality Guaranteed", desc: "12 months or 1500 hours warranty as standard. Extended warranty available through Mickala Service Agreements (MSA)." },
  { title: "Latest Technology", desc: "Industry leaders in design innovation. We deliver tomorrow\u2019s technology today." },
  { title: "Built for Mining", desc: "Engineered to mine specifications with a proven service life of 10\u201315 years in the most demanding environments." },
  { title: "24/7 Breakdown Support", desc: "Factory-trained OEM technicians on call. Minimal disruption to your operations." },
  { title: "Experienced Personnel", desc: "Continuous in-house and external training keeps our team ahead of the latest service, diagnostic, and repair standards." },
  { title: "OEM Supply Chain", desc: "Full control of product quality, inventory levels, and dispatch timeframes across NSW and Central Queensland." },
  { title: "Standard Parts", desc: "Interchangeable components across all models \u2014 reduces inventory complexity and downtime." },
]

const equipment = [
  "3kW Laser Cutter", "CNC Press", "2 x 5-Axis Robots",
  "6 Laser Align Weld Benches", "TIG & MIG Welding", "CNC Pipe Bender",
]

export default function CapabilityStatement() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          body { background: white !important; font-size: 10pt; line-height: 1.35; color: #000 !important; }
          * { background: transparent !important; background-color: white !important; color: black !important; text-shadow: none !important; box-shadow: none !important; }
          nav, button, .no-print, header, footer, .fixed, .sticky { display: none !important; }
          img { max-width: 100% !important; page-break-inside: avoid; display: block !important; }
          .print-section { page-break-inside: avoid; }
          .print-break { page-break-after: always; }
          h1 { font-size: 22pt !important; margin-top: 0; page-break-after: avoid; }
          h2 { font-size: 14pt !important; page-break-after: avoid; }
          h3 { font-size: 11pt !important; page-break-after: avoid; }
          table { width: 100% !important; border-collapse: collapse !important; font-size: 8pt !important; }
          th { background-color: #222 !important; color: white !important; padding: 4pt 6pt !important; text-align: left !important; border: 1px solid #ccc !important; }
          td { padding: 3pt 6pt !important; border: 1px solid #ccc !important; }
          tr { page-break-inside: avoid; }
          .max-w-6xl, .max-w-4xl, .max-w-3xl { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .grid { display: block !important; }
          .grid > * { display: block !important; margin-bottom: 6pt !important; }
          .md\\:grid-cols-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10pt !important; }
          .md\\:grid-cols-2 > * { margin-bottom: 0 !important; }
          .cover-section { min-height: 0 !important; padding: 2cm 0 !important; }
          .cover-section .absolute { display: none !important; }
        }
      `}</style>

      {/* NAV - print hidden */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 no-print">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
          <Link href="/documents" className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <button onClick={() => window.print()} className="inline-flex items-center gap-1 text-xs bg-gray-900 text-white px-3 py-1.5 hover:bg-gray-800 transition-colors">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>
      </div>

      {/* ======== COVER PAGE ======== */}
      <section className="cover-section relative bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-4">Since 2007</div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
              Mickala Lighting<span className="text-red-500">.</span>
              <br />
              <span className="text-3xl sm:text-4xl font-normal text-gray-300">Capability Statement</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
              Australia&rsquo;s leading privately owned OEM manufacturer of Extra Low Voltage LED lighting towers &mdash; engineered for Australian conditions since 2007.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {["OEM Manufacturer", "ELV LED Lighting", "Mining Certified", "24/7 Support"].map((tag) => (
                <span key={tag} className="border border-gray-600 text-gray-300 px-4 py-1.5 text-xs tracking-wide">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======== QUICK STATS ======== */}
      <section className="border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gray-900">2000+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Lighting Towers Delivered</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gray-900">Global</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Supply &amp; Support Network</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Technical Support</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Years of Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== ABOUT US ======== */}
      <section className="print-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">About Us</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">Innovation Through Continuous Improvement</h2>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>Mickala Group is Australia&rsquo;s leading privately owned OEM manufacturer of Extra Low Voltage (ELV) LED lighting towers. Since 2007, we have built our reputation on long-term client partnerships, operational reliability, and continuous innovation &mdash; not transactional supply.</p>
                <p>Every tower we manufacture is designed, engineered, and tested in-house. Our factory-trained technicians deliver maintenance and breakdown support across Australia&rsquo;s most demanding mining, civil, and industrial sites. We do not outsource service. We do not compromise on quality.</p>
                <p>Our commitment to safety, quality assurance, environmental compliance, and continuous improvement is embedded across every function &mdash; from procurement and fabrication through to field support and fleet management. This integrated approach sets Mickala apart in a competitive industry.</p>
                <p>With 100% control of our supply chain, we reduce costs without reducing quality &mdash; and pass that value directly to our clients.</p>
              </div>
            </div>
            <div className="bg-gray-100">
              <Image src="/capability-images/capability_image1.jpeg" alt="Mickala lighting tower fleet" width={600} height={800} className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== CORE CAPABILITIES ======== */}
      <section className="print-section py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Core Capabilities</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Do</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, i) => (
              <div key={i} className="border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== VISION ======== */}
      <section className="print-section py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Our Vision</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Delivering Year-on-Year Cost Reductions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-base">Every product, every service, and every innovation is measured against one standard: does it improve our client&rsquo;s position?</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
            {[
              "Innovation through continuous improvement &mdash; delivering tomorrow&rsquo;s technology today",
              "Reduce administration costs and carbon footprint for our clients",
              "Achieve preferred supplier status through proven capability and performance",
              "Deliver safe, cost-effective project solutions and services",
              "Maintain the highest standards of professionalism and safety across our workforce",
              "Build lasting business partnerships with clients and the broader community",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-red-400 mt-0.5 shrink-0">&bull;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== WHY MICKALA ======== */}
      <section className="print-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Why Mickala</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Built for the Mining Industry</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((item, i) => (
              <div key={i} className="border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CLIENTS ======== */}
      <section className="print-section py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Our Clients</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Major Mining Companies</h2>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <span key={c} className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SUPPLY CHAIN ======== */}
      <section className="print-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100">
              <Image src="/capability-images/capability_image15.jpeg" alt="Mickala supply chain and manufacturing" width={600} height={450} className="w-full h-auto object-cover" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Supply Chain</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">International Supply Chain</h2>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>Mickala Group operates within an international OEM supply chain. Approximately 90% of all component procurement for each ELV LED lighting tower is managed within the Group &mdash; giving us control over quality, cost, and lead time that competitors cannot match.</p>
                <p>This integrated supply model gives our clients confidence that Mickala can provide service, labour, components, and technical support for the full life of the asset.</p>
                <p>Every component fitted to a Mickala tower is proven through comprehensive field testing on our own hire fleet before reaching a client site.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== DESIGN & CERTIFICATION ======== */}
      <section className="print-section py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Design &amp; Certification</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">Engineered for Australian Conditions</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">Mickala LED lighting towers are designed and engineered in Australia for the toughest operating environments &mdash; mining, civil, rail, local government, and metropolitan infrastructure. All design and engineering is carried out within the Mickala Group and certified by our Managing Director.</p>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((c) => (
                  <span key={c} className="text-xs bg-white border border-gray-200 px-3 py-2 text-gray-600">{c}</span>
                ))}
              </div>
            </div>
            <div className="bg-gray-100">
              <Image src="/capability-images/capability_image35.jpeg" alt="Mickala lighting tower in operation" width={600} height={450} className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== FABRICATION ======== */}
      <section className="print-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100">
              <Image src="/capability-images/capability_image12.jpeg" alt="Mickala fabrication facility" width={600} height={450} className="w-full h-auto object-cover" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Fabrication</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">Modern Manufacturing Facility</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">Our modern manufacturing facility has the capacity to produce in excess of 500 LED lighting towers per annum, with semi-autonomous production supported by skilled trades.</p>
              <div className="grid grid-cols-2 gap-2">
                {equipment.map((item, i) => (
                  <div key={i} className="border border-gray-200 px-3 py-2 text-sm text-gray-700">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== PROTECTION (PAINT) ======== */}
      <section className="print-section py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Protection</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">3-Stage Paint Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">Every fabricated component is hydrostatically e-coated, baked at 180&deg;C, and finished with two coats of 2K polyurethane. The result is corrosion protection that outlasts the equipment warranty.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["E-Coat Submersion", "Baked at 180\u00b0C", "2K Polyurethane Top Coat", "Lifetime Protection"].map((s, i) => (
              <span key={i} className="border border-gray-600 text-gray-300 px-4 py-1.5 text-xs tracking-wide">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== STANDARD FEATURES ======== */}
      <section className="print-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Standard Features</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Every Tower Comes With</h2>
          </div>
          <div className="border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left p-3 font-semibold">Feature</th>
                  <th className="text-center p-3 font-semibold w-20">S/O</th>
                  <th className="text-left p-3 font-semibold">Benefit</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 font-medium text-gray-900 border-t border-gray-200">{f.feature}</td>
                    <td className="p-3 text-center border-t border-gray-200">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold ${f.status === "Standard" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{f.status === "Standard" ? "S" : "O"}</span>
                    </td>
                    <td className="p-3 text-gray-600 border-t border-gray-200">{f.benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======== GALLERY ======== */}
      <section className="print-section py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Gallery</div>
            <h2 className="text-2xl font-bold text-gray-900">Our Fleet in Action</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-gray-100">
                <Image src={`/capability-images/capability_image${n}.jpeg`} alt={`Mickala lighting tower ${n}`} width={400} height={300} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== LOCATIONS ======== */}
      <section className="print-section py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Our Locations</div>
            <h2 className="text-2xl font-bold">National Presence</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { city: "Mackay", addr: "21 Caterpillar Drive\nPaget QLD 4740", phone: "07 4998 5447" },
              { city: "Muswellbrook", addr: "37 Thomas Mitchell Drive\nMuswellbrook NSW 2333", phone: "02 5542 0000" },
            ].map((loc, i) => (
              <div key={i} className="text-center border border-gray-700 p-6">
                <h3 className="font-bold text-lg mb-1">{loc.city}</h3>
                <p className="text-sm text-gray-400 whitespace-pre-line mb-1">{loc.addr}</p>
                <p className="text-sm text-gray-400">{loc.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CONTACT ======== */}
      <section className="print-section py-12 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Let&rsquo;s Work Together</h2>
          <p className="text-red-100 mb-6 max-w-xl mx-auto text-sm">Contact us to discuss your lighting tower requirements. We will provide a competitive, tailored solution for your site and application.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1300 642 525</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> management@mickala.com.au</span>
            <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> www.mickalagroup.com.au</span>
          </div>
        </div>
      </section>

      {/* ======== FOOTER ======== */}
      <div className="bg-gray-900 text-gray-500 text-[10px] py-3 text-center border-t border-gray-800">
        Mickala Group  |  Document: Capability Statement  |  Rev 1.0  |  Innovation Through Continuous Improvement
      </div>
    </div>
  )
}
