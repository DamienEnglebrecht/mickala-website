     1|"use client"
     2|
     3|import Image from "next/image"
     4|import Link from "next/link"
     5|import { ArrowLeft, Printer, MapPin, Phone, Mail, ChevronDown, ChevronUp, Check, Shield, Award, Settings, Wrench, Truck, HeadphonesIcon, Factory, Lightbulb, Star, TrendingUp, Users, Globe, Clock, Layers, Zap, Thermometer, Droplets, Laptop, Lock, Flame, Hammer } from "lucide-react"
     6|import { useState } from "react"
     7|
     8|const features = [
     9|  { feature: "Tier IV Engines", status: "Standard", benefit: "Lower emissions. Complies with Australian standards." },
    10|  { feature: "Extra Low Voltage (24/48VDC)", status: "Standard", benefit: "Any auto electrician or fitter can service them. No high-voltage risk." },
    11|  { feature: "Remote Start & Stop (Timer Mode)", status: "Standard", benefit: "Reduces fuel consumption and unnecessary engine hours." },
    12|  { feature: "Self Bunded — All Contaminants Contained", status: "Standard", benefit: "Zero environmental spill risk. Complies with site requirements." },
    13|  { feature: "LED Low-Level Fuel Beacon", status: "Standard", benefit: "24-hour low-fuel alert emailed to your central network. Never run out on site." },
    14|  { feature: "Lockable Starter & Battery Isolators", status: "Standard", benefit: "Complies with mining safety standards. Prevents unauthorised operation." },
    15|  { feature: "LED Tail Lights & Beacons", status: "Standard", benefit: "Lower maintenance and longer service life compared to incandescent lighting." },
    16|  { feature: "Jump Start Receptacle", status: "Standard", benefit: "Eliminates the risk of battery explosion from jumper leads." },
    17|  { feature: "Emergency Stop x 2", status: "Standard", benefit: "Dual emergency stops. Complies with the highest mining safety standards." },
    18|  { feature: "MDG15 & MDG41 Compliant", status: "Standard", benefit: "NSW-compliant. Movement across state borders without compromise." },
    19|  { feature: "GPS Remote Monitoring", status: "Option", benefit: "Real-time GPS tracking of location, machine health, and operational status." },
    20|  { feature: "Remote Control Operation", status: "Option", benefit: "Enables continuous operations during shift changes without on-site intervention." },
    21|  { feature: "3-Stage Paint Process", status: "Standard", benefit: "E-coated and baked at 180°C with two coats of 2K polyurethane. Lifetime corrosion protection." },
    22|  { feature: "Fire Extinguisher (4.5–9kg)", status: "Standard", benefit: "Complies with site safety requirements." },
    23|  { feature: "Air Pre-Cleaner", status: "Standard", benefit: "Extends air filter life in dusty mining environments." },
    24|]
    25|
    26|const certifications = ["Fire Risk Assessment", "Mines Safety & Inspection Regulations 1995", "AS2790 Transportable Generator Sets", "AS3713 Noise Level Emissions", "AS3001 Electrical Wiring Rules", "AS3010.1 Supply of Generator Set", "AS1170.2 Wind Loading Criteria", "MDG 41", "MDG 15"]
    27|
    28|const stats = [
    29|  { icon: Users, value: "500+", label: "Lighting Towers Delivered" },
    30|  { icon: Globe, value: "Global", label: "Supply & Support Network" },
    31|  { icon: Clock, value: "24/7", label: "Technical Support" },
    32|  { icon: Star, value: "15+", label: "Years of Innovation" },
    33|]
    34|
    35|const clients = ["BHP", "Yancoal", "Glencore", "Rio Tinto", "Peabody", "Thiess", "Golding", "MacMahon", "MACA Mining", "MacKellar Mining"]
    36|
    37|const sections = [
    38|  { id: "about", title: "About Us", icon: Users },
    39|  { id: "vision", title: "Our Vision", icon: TrendingUp },
    40|  { id: "why", title: "Why Mickala", icon: Star },
    41|  { id: "capabilities", title: "Capabilities", icon: Settings },
    42|  { id: "features", title: "Standard Features", icon: Zap },
    43|  { id: "fabrication", title: "Fabrication", icon: Factory },
    44|  { id: "clients", title: "Clients", icon: Users },
    45|]
    46|
    47|export default function CapabilityStatement() {
    48|  const [activeSection, setActiveSection] = useState<string | null>(null)
    49|
    50|  return (
    51|    <div className="bg-white">
    52|      {/* NAV - print hidden */}
    53|      <div className="sticky top-0 z-50 bg-white border-b no-print">
    54|        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
    55|          <Link href="/documents" className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1">
    56|            <ArrowLeft className="h-3 w-3" /> Back
    57|          </Link>
    58|          <div className="flex items-center gap-3">
    59|            <button onClick={() => window.print()} className="inline-flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1.5 rounded-full hover:bg-red-700 transition-colors">
    60|              <Printer className="h-3 w-3" /> Print / PDF
    61|            </button>
    62|          </div>
    63|        </div>
    64|      </div>
    65|
    66|      {/* ======== COVER PAGE ======== */}
    67|      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
    68|        <div className="absolute inset-0 opacity-10">
    69|          <Image src="/hero-towers.webp" alt="" fill className="object-cover" />
    70|        </div>
    71|        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/20 to-transparent" />
    72|        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
    73|          <div className="max-w-3xl">
    74|            <div className="flex items-center gap-3 mb-6">
    75|              <div className="w-12 h-0.5 bg-red-500" />
    76|              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Since 2007</span>
    77|            </div>
    78|            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
    79|              Mickala Lighting<span className="text-red-500">.</span>
    80|              <br />
    81|              <span className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-300">Capability Statement</span>
    82|            </h1>
    83|            <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
    84|              Australia's leading privately owned OEM manufacturer of Extra Low Voltage LED lighting towers — engineered for Australian conditions since 2007.
    85|            </p>
    86|            <div className="flex flex-wrap gap-3 text-sm">
    87|              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
    88|                <Check className="h-3.5 w-3.5 text-red-400" /> OEM Manufacturer
    89|              </span>
    90|              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
    91|                <Check className="h-3.5 w-3.5 text-red-400" /> ELV LED Lighting
    92|              </span>
    93|              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
    94|                <Check className="h-3.5 w-3.5 text-red-400" /> Mining Certified
    95|              </span>
    96|              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-300">
    97|                <Check className="h-3.5 w-3.5 text-red-400" /> 24/7 Support
    98|              </span>
    99|            </div>
   100|          </div>
   101|        </div>
   102|      </section>
   103|
   104|      {/* ======== QUICK STATS ======== */}
   105|      <section className="bg-gray-900 border-t border-gray-800">
   106|        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
   107|          {stats.map(s => (
   108|            <div key={s.label} className="text-center">
   109|              <s.icon className="h-6 w-6 text-red-500 mx-auto mb-2" />
   110|              <div className="text-3xl font-bold text-white">{s.value}</div>
   111|              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
   112|            </div>
   113|          ))}
   114|        </div>
   115|      </section>
   116|
   117|      {/* ======== ABOUT US ======== */}
   118|      <section className="py-20 sm:py-28">
   119|        <div className="max-w-6xl mx-auto px-6">
   120|          <div className="grid md:grid-cols-2 gap-16 items-center">
   121|            <div>
   122|              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">About Us</span>
   123|              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">Innovation Through Continuous Improvement</h2>
   124|              <div className="space-y-4 text-gray-600 leading-relaxed">
   125|                <p>Mickala Group is Australia's leading privately owned OEM manufacturer of Extra Low Voltage (ELV) LED lighting towers. Since 2007, we have built our reputation on long-term client partnerships, operational reliability, and continuous innovation — not transactional supply.</p>
   126|                <p>Every tower we manufacture is designed, engineered, and tested in-house. Our factory-trained technicians deliver maintenance and breakdown support across Australia's most demanding mining, civil, and industrial sites. We do not outsource service. We do not compromise on quality.</p>
   127|                <p>Our commitment to safety, quality assurance, environmental compliance, and continuous improvement is embedded across every function — from procurement and fabrication through to field support and fleet management. This integrated approach sets Mickala apart in a competitive industry.</p>
   128|                <p>With 100% control of our supply chain, we reduce costs without reducing quality — and pass that value directly to our clients.</p>
   129|              </div>
   130|            </div>
   131|            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl">
   132|              <Image src="/capability-images/capability_image1.jpeg" alt="Mickala lighting tower fleet" fill className="object-cover" />
   133|            </div>
   134|          </div>
   135|        </div>
   136|      </section>
   137|
   138|      {/* ======== CORE BUSINESS ======== */}
   139|      <section className="py-20 bg-gray-50">
   140|        <div className="max-w-6xl mx-auto px-6">
   141|          <div className="text-center mb-14">
   142|            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Core Business</span>
   143|            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">What We Do</h2>
   144|          </div>
   145|          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
   146|            {[
   147|              { icon: Lightbulb, title: "OEM Manufacturing", desc: "In-house design and manufacture of ELV LED lighting towers. Every component engineered, tested, and proven in Australian conditions." },
   148|              { icon: TrendingUp, title: "Direct Sales", desc: "Purchase direct from the manufacturer. Full warranty, OEM support, and factory-backed service agreements." },
   149|              { icon: Truck, title: "Direct Hire", desc: "Short or long-term hire of our fleet. Flexible commercial terms with end-to-end fleet management." },
   150|              { icon: HeadphonesIcon, title: "Turnkey Maintenance", desc: "Hire, maintain, service, and refuel — we manage the full lifecycle of your lighting tower fleet." },
   151|              { icon: Wrench, title: "Repair & Maintenance Workshop", desc: "Fully equipped workshop for repairs, servicing, and refurbishment of all lighting tower makes and models." },
   152|              { icon: Settings, title: "Mobile Support", desc: "Factory-trained technicians deployed on-site for warranty, maintenance, and breakdown support — 24/7." },
   153|            ].map((item, i) => (
   154|              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
   155|                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 mb-4">
   156|                  <item.icon className="h-5 w-5" />
   157|                </span>
   158|                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
   159|                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
   160|              </div>
   161|            ))}
   162|          </div>
   163|        </div>
   164|      </section>
   165|
   166|      {/* ======== VISION ======== */}
   167|      <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
   168|        <div className="max-w-4xl mx-auto px-6 text-center">
   169|          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Our Vision</span>
   170|          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">Delivering Year-on-Year Cost Reductions</h2>
   171|          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">Every product, every service, and every innovation is measured against one standard: does it improve our client's position?</p>
   172|          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
   173|            {[
   174|              "Innovation through continuous improvement — supply tomorrow's technology today",
   175|              "Reduce administration costs for our clients as well as carbon footprint",
   176|              "Achieve preferred supplier status through proven capability and performance",
   177|              "Supply safe and cost-effective project solutions and services",
   178|              "Ensure our employees always represent us in a professional and safety-conscious manner",
   179|              "Build business partnerships with clients and the wider community",
   180|            ].map((item, i) => (
   181|              <div key={i} className="flex items-start gap-3">
   182|                <Check className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
   183|                <span className="text-sm text-gray-300">{item}</span>
   184|              </div>
   185|            ))}
   186|          </div>
   187|        </div>
   188|      </section>
   189|
   190|      {/* ======== WHY MICKALA ======== */}
   191|      <section className="py-20 sm:py-28">
   192|        <div className="max-w-6xl mx-auto px-6">
   193|          <div className="text-center mb-14">
   194|            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Why Mickala</span>
   195|            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Built for the Mining Industry</h2>
   196|          </div>
   197|          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
   198|            {[
   199|              { icon: TrendingUp, title: "Cost Effective", desc: "Australian designed and engineered for the harshest Australian operating conditions. 100% supply chain control means lower costs passed to you." },
   200|              { icon: Shield, title: "Quality Guaranteed", desc: "12 months or 1500 hours warranty. Extended warranty available with Mickala Service Agreements (MSA)." },
   201|              { icon: Zap, title: "Latest Technology", desc: "Industry leaders in design improvements. We supply tomorrow's technology today." },
   202|              { icon: Hammer, title: "Built for Mining", desc: "Industry knowledge guarantees our towers are built tough to mine specifications with a lifespan of 10–15 years." },
   203|              { icon: Clock, title: "24/7 Breakdown Support", desc: "Factory trained OEM technicians on call to ensure little or no disruption to your operations." },
   204|              { icon: Users, title: "Experienced Personnel", desc: "In-house and external training ensures our employees are continually up-skilled in servicing, diagnostics and repairs." },
   205|              { icon: Layers, title: "OEM Supply Chain", desc: "100% control of product quality, inventory levels and minimal dispatch timeframes across NSW and Central Queensland." },
   206|              { icon: Wrench, title: "Standard Parts", desc: "Every model regardless of size has interchangeable components — reduces inventory complexity." },
   207|            ].map((item, i) => (
   208|              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
   209|                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 mb-4">
   210|                  <item.icon className="h-5 w-5" />
   211|                </span>
   212|                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
   213|                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
   214|              </div>
   215|            ))}
   216|          </div>
   217|        </div>
   218|      </section>
   219|
   220|      {/* ======== CLIENTS ======== */}
   221|      <section className="py-16 bg-gray-50">
   222|        <div className="max-w-6xl mx-auto px-6 text-center">
   223|          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Our Clients</span>
   224|          <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-10">Trusted by Major Mining Companies</h2>
   225|          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
   226|            {clients.map(c => (
   227|              <span key={c} className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{c}</span>
   228|            ))}
   229|          </div>
   230|        </div>
   231|      </section>
   232|
   233|      {/* ======== SUPPLY CHAIN ======== */}
   234|      <section className="py-20 sm:py-28">
   235|        <div className="max-w-6xl mx-auto px-6">
   236|          <div className="grid md:grid-cols-2 gap-16 items-center">
   237|            <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
   238|              <Image src="/capability-images/capability_image15.jpeg" alt="Mickala supply chain and manufacturing" fill className="object-cover" />
   239|            </div>
   240|            <div className="order-1 md:order-2">
   241|              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Supply Chain</span>
   242|              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">International Supply Chain</h2>
   243|              <div className="space-y-4 text-gray-600 leading-relaxed">
   244|                <p>Mickala Lighting Towers is part of an international OEM group of companies and supply chain. This allows us to fulfil customer demands through 90% of all component procurement for each Mickala ELV LED Lighting Tower within the Mickala Group of companies.</p>
   245|                <p>This offers our clients security that Mickala Lighting Towers are able to provide valuable service, support through labour, components and technical support for the life of the asset.</p>
   246|                <p>Every single part that is utilised on each tower has been through comprehensive field testing on our own hire fleet.</p>
   247|              </div>
   248|            </div>
   249|          </div>
   250|        </div>
   251|      </section>
   252|
   253|      {/* ======== DESIGN & CERTIFICATION ======== */}
   254|      <section className="py-20 bg-gray-50">
   255|        <div className="max-w-6xl mx-auto px-6">
   256|          <div className="grid md:grid-cols-2 gap-16 items-center">
   257|            <div>
   258|              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Design & Certification</span>
   259|              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">Engineered for Australian Conditions</h2>
   260|              <p className="text-gray-600 leading-relaxed mb-6">Mickala's LED Lighting Tower models have been designed and engineered to tackle various business sectors — Mining, Civil, Rail, Local Government and Metro — for the toughest Australian environments. All design and engineering is carried out within the Mickala Group of companies and certified by our Managing Director.</p>
   261|              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
   262|                {certifications.map(c => (
   263|                  <span key={c} className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600">{c}</span>
   264|                ))}
   265|              </div>
   266|            </div>
   267|            <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl">
   268|              <Image src="/capability-images/capability_image35.jpeg" alt="Mickala lighting tower in operation" fill className="object-cover" />
   269|            </div>
   270|          </div>
   271|        </div>
   272|      </section>
   273|
   274|      {/* ======== FABRICATION ======== */}
   275|      <section className="py-20 sm:py-28">
   276|        <div className="max-w-6xl mx-auto px-6">
   277|          <div className="grid md:grid-cols-2 gap-16 items-center">
   278|            <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
   279|              <Image src="/capability-images/capability_image12.jpeg" alt="Mickala fabrication facility" fill className="object-cover" />
   280|            </div>
   281|            <div className="order-1 md:order-2">
   282|              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Fabrication</span>
   283|              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">Modern Manufacturing Facility</h2>
   284|              <p className="text-gray-600 leading-relaxed mb-6">Mickala's international semi-autonomous modern-day facility has the capacity to produce in excess of 500 LED lighting towers per annum.</p>
   285|              <div className="grid grid-cols-2 gap-3">
   286|                {[
   287|                  { icon: Zap, label: "3kW Laser Cutter" },
   288|                  { icon: Settings, label: "CNC Press" },
   289|                  { icon: Settings, label: "2 x 5-Axis Robots" },
   290|                  { icon: Wrench, label: "6 Laser Align Weld Benches" },
   291|                  { icon: Flame, label: "TIG & MIG Welding" },
   292|                  { icon: Settings, label: "CNC Pipe Bender" },
   293|                ].map((item, i) => (
   294|                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
   295|                    <item.icon className="h-4 w-4 text-red-600 shrink-0" />
   296|                    <span className="text-sm text-gray-700">{item.label}</span>
   297|                  </div>
   298|                ))}
   299|              </div>
   300|            </div>
   301|          </div>
   302|        </div>
   303|      </section>
   304|
   305|      {/* ======== PROTECTION (PAINT) ======== */}
   306|      <section className="py-16 bg-gray-900 text-white">
   307|        <div className="max-w-4xl mx-auto px-6 text-center">
   308|          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Protection</span>
   309|          <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-4">3-Stage Paint Process</h2>
   310|          <p className="text-gray-400 max-w-2xl mx-auto">All raw fabricated components are hydrostatically submerged in paint to ensure long lasting protection. Each component is then baked at 180°C to ensure each part is protected for life.</p>
   311|          <div className="flex flex-wrap justify-center gap-4 mt-8">
   312|            {["E-Coat Submersion", "Baked at 180°C", "2K Polyurethane Top Coat", "Lifetime Protection"].map((s, i) => (
   313|              <span key={i} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-300">
   314|                <Check className="h-3.5 w-3.5 text-red-400" /> {s}
   315|              </span>
   316|            ))}
   317|          </div>
   318|        </div>
   319|      </section>
   320|
   321|      {/* ======== STANDARD FEATURES ======== */}
   322|      <section className="py-20 sm:py-28 bg-gray-50">
   323|        <div className="max-w-6xl mx-auto px-6">
   324|          <div className="text-center mb-14">
   325|            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Standard Features</span>
   326|            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">What Every Tower Comes With</h2>
   327|          </div>
   328|          <div className="overflow-x-auto rounded-xl border border-gray-200">
   329|            <table className="w-full text-sm">
   330|              <thead>
   331|                <tr className="bg-gray-900 text-white">
   332|                  <th className="text-left p-4 font-semibold">Feature</th>
   333|                  <th className="text-center p-4 font-semibold w-24">S/O</th>
   334|                  <th className="text-left p-4 font-semibold">Benefit</th>
   335|                </tr>
   336|              </thead>
   337|              <tbody>
   338|                {features.map((f, i) => (
   339|                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
   340|                    <td className="p-4 font-medium text-gray-900">{f.feature}</td>
   341|                    <td className="p-4 text-center">
   342|                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${f.status === "Standard" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{f.status === "Standard" ? "S" : "O"}</span>
   343|                    </td>
   344|                    <td className="p-4 text-gray-600">{f.benefit}</td>
   345|                  </tr>
   346|                ))}
   347|              </tbody>
   348|            </table>
   349|          </div>
   350|        </div>
   351|      </section>
   352|
   353|      {/* ======== GALLERY ======== */}
   354|      <section className="py-16">
   355|        <div className="max-w-6xl mx-auto px-6">
   356|          <div className="text-center mb-10">
   357|            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Gallery</span>
   358|            <h2 className="text-2xl font-bold text-gray-900 mt-3">Our Fleet in Action</h2>
   359|          </div>
   360|          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
   361|            {[2,3,4,5,6,7,8,9,10,11,13,14,16,17,18,19,20,21,22,24].map(n => (
   362|              <div key={n} className="relative aspect-[4/3] rounded-lg overflow-hidden">
   363|                <Image src={`/capability-images/capability_image${n}.jpeg`} alt={`Mickala lighting tower ${n}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
   364|              </div>
   365|            ))}
   366|          </div>
   367|        </div>
   368|      </section>
   369|
   370|      {/* ======== LOCATIONS ======== */}
   371|      <section className="py-16 bg-gray-900 text-white">
   372|        <div className="max-w-4xl mx-auto px-6">
   373|          <div className="text-center mb-10">
   374|            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Our Locations</span>
   375|            <h2 className="text-2xl font-bold mt-3">National Presence</h2>
   376|          </div>
   377|          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
   378|            {[
   379|              { city: "Mackay", addr: "21 Caterpillar Drive\nPaget QLD 4740", phone: "07 4998 5447" },
   380|              { city: "Muswellbrook", addr: "37 Thomas Mitchell Drive\nMuswellbrook NSW 2333", phone: "02 5542 0000" },
   381|            ].map((loc, i) => (
   382|              <div key={i} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
   383|                <MapPin className="h-5 w-5 text-red-400 mx-auto mb-3" />
   384|                <h3 className="font-bold text-lg mb-1">{loc.city}</h3>
   385|                <p className="text-sm text-gray-400 whitespace-pre-line mb-2">{loc.addr}</p>
   386|                <p className="text-sm text-gray-400">{loc.phone}</p>
   387|              </div>
   388|            ))}
   389|          </div>
   390|        </div>
   391|      </section>
   392|
   393|      {/* ======== CONTACT ======== */}
   394|      <section className="py-16 bg-red-600 text-white">
   395|        <div className="max-w-4xl mx-auto px-6 text-center">
   396|          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let's Work Together</h2>
   397|          <p className="text-red-100 mb-8 max-w-xl mx-auto">Contact us to discuss your lighting tower requirements. We will provide a competitive, tailored solution for your site and application.</p>
   398|          <div className="flex flex-wrap justify-center gap-6 text-sm">
   399|            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> 1300 642 525</span>
   400|            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> management@mickala.com.au</span>
   401|            <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" /> www.mickalagroup.com.au</span>
   402|          </div>
   403|        </div>
   404|      </section>
   405|
   406|      {/* ======== FOOTER ======== */}
   407|      <div className="bg-gray-900 text-gray-500 text-[10px] py-4 text-center border-t border-gray-800">
   408|        Mickala Group  |  Document: Capability Statement  |  Rev 1.0  |  &ldquo;Innovation Through Continuous Improvement&rdquo;
   409|      </div>
   410|    </div>
   411|  )
   412|}
   413|