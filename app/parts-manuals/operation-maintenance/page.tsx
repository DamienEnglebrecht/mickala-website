"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft, Printer, Download, ChevronDown, ChevronUp,
  BookOpen, Settings, AlertTriangle, Phone, Mail, MapPin, FileText
} from "lucide-react"

const sections = [
  { id: "owner-details", title: "Owner & Equipment Details" },
  { id: "company-summary", title: "Company Summary" },
  { id: "introduction", title: "Introduction & Product Details" },
  { id: "components", title: "Components of Lighting Tower" },
  { id: "standard-inclusions", title: "Standard Inclusions" },
  { id: "operating-instructions", title: "Operating Instructions" },
  { id: "pre-start-checks", title: "Pre-Start Checks" },
  { id: "operation-procedure", title: "Lighting Tower Operation Procedure" },
  { id: "start-up-procedure", title: "Start Up Procedure" },
  { id: "shutdown-procedure", title: "Shutdown Procedure" },
  { id: "engine-specifications", title: "Engine Specifications" },
  { id: "servicing", title: "Servicing & Maintenance" },
  { id: "engine-tune", title: "Engine Tune Specifications" },
  { id: "rpm-adjustment", title: "Engine RPM Adjustment" },
  { id: "hydraulic-relief", title: "Hydraulic Relief Pressure" },
  { id: "grease-points", title: "Grease Points" },
  { id: "safety-general", title: "Safety — General" },
  { id: "safety-handling", title: "Safety — Handling & Towing" },
  { id: "safety-setup", title: "Safety — Set Up" },
  { id: "safety-operating", title: "Safety — Operating" },
  { id: "safety-hazards", title: "Safety — Hazards" },
  { id: "safety-first-aid", title: "First Aid for Electrical Injuries" },
  { id: "fault-diagnosis", title: "Fault Diagnosis" },
]

export default function OperationMaintenancePage() {
  const [tocOpen, setTocOpen] = useState(true)

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3">
          <Link href="/documents" className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <span className="text-[10px] text-gray-300">|</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Operation &amp; Maintenance Manual</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => window.open("/documents/MM-OP-BI-001_Operation_Maintenance_Manual.pdf")}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary/5 transition-colors"
            >
              <Download className="h-3 w-3" /> PDF
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-600 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors"
            >
              <Printer className="h-3 w-3" /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ===== TITLE / COVER ===== */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-mickala.png"
              alt="Mickala Group"
              width={72}
              height={72}
              className="h-16 w-auto"
              priority
            />
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            Mickala Lighting Towers
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Operation &amp; Maintenance Manual
          </h1>
          <p className="font-heading text-xl sm:text-2xl font-semibold text-gray-700 mt-2">
            MLT LED Series
          </p>
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-gray-500">
            <span>MM-OP-BI-001</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Rev 1.3</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>25 November 2014</span>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["MLT1920-LED", "MLT2560-LED", "MLS2560-LED", "MLS3200-LED", "MLT3840-LED", "MLS3840-LED"].map(m => (
              <span key={m} className="text-[11px] font-mono bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md border border-gray-200">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* ===== TABLE OF CONTENTS ===== */}
        <div className="mb-12 border border-gray-200 rounded-xl overflow-hidden print:border-none">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition-colors print:hidden"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <BookOpen className="h-4 w-4 text-primary" />
              Table of Contents
            </span>
            {tocOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
          </button>
          {/* Always visible in print */}
          <div className={`${tocOpen ? "block" : "hidden"} print:block`}>
            <nav className="px-5 py-3 divide-y divide-gray-100">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ===== DOCUMENT REF HEADER ===== */}
        <div className="text-[10px] text-gray-400 tracking-wider uppercase text-center mb-8 print:hidden">
          Document MM-OP-BI-001 · Rev 1.3 · Uncontrolled if printed
        </div>

        {/* ===== OWNER & EQUIPMENT DETAILS ===== */}
        <section id="owner-details" className="mb-14">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-4">Owner &amp; Equipment Details</h2>
            <p className="text-sm text-gray-600 mb-6">Complete this section on your new Lighting Tower:</p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Owner Details</h3>
                <div className="space-y-3">
                  {["Owner", "Owner's Representative", "Phone No", "Address", "Email"].map(label => (
                    <div key={label}>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-0.5">{label}:</p>
                      <input
                        type="text"
                        placeholder="Enter here..."
                        className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-1 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Equipment Details</h3>
                <div className="space-y-3">
                  {["Delivery Date", "Machine Model", "Machine Serial No", "Call Sign No", "Engine Type", "Engine Serial No", "Generator Type", "Generator Serial No", "Controller Type", "Controller Serial No", "GPS Serial No", "Light Type and Qty"].map(label => (
                    <div key={label}>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-0.5">{label}:</p>
                      <input
                        type="text"
                        placeholder={label === "Delivery Date" ? "DD/MM/YYYY" : "As Per Compliance Documents"}
                        className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-1 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                In order to receive maximum benefit from your Mickala product, please read this manual carefully and follow the operating instructions.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mt-2">
                All information (including illustrations and pictures) contained in this manual are correct at the time of publication. Mickala Lighting Towers reserves the right to make changes in this manual at any time without prior notice. Mickala Mining Maintenance takes no responsibility for the accuracy or otherwise of the information contained within this document.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COMPANY SUMMARY ===== */}
        <section id="company-summary" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Company Summary</h2>
          </div>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              Mickala Lighting Towers business philosophy highlights the importance of forming close alliances and long term relationships with our clients. At the core of this philosophy is a complete understanding that a sustainable long-term business relationship can only be sustained with a strong commitment to providing a high quality service.
            </p>
            <p>
              In such a highly competitive industry, Mickala Mining Maintenance values its personal touch and combined with our attention to safety, quality, environment and continuous improvement this sets Mickala Mining Maintenance apart from its competitors.
            </p>
            <p>
              Mickala Lighting Towers has a team dedicated to providing exceptional service to ensure that experiences with Mickala Mining Maintenance are an enjoyable and unforgettable one. We pride ourselves on exceptional service to all of our clients and we will go above and beyond to ensure client satisfaction. Our services will be provided in a safe, ethical and highly professional manner.
            </p>
            <p>
              At Mickala Lighting Towers we strive to continually provide the highest standard of service to our clients through process management.
            </p>
            <p className="font-semibold">In doing so we aim to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Ensure that our safety performance is of the highest standard for both our clients and our people</li>
              <li>Assist our clients to achieve their own goals</li>
              <li>Respond to our client's needs promptly and appropriately</li>
              <li>Anticipate our clients requirements ahead of time and ahead of our competitors</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="mt-8 bg-primary/5 border border-primary/10 rounded-xl p-5 sm:p-6">
            <h3 className="font-heading text-base font-bold text-primary mb-4">Our Contact Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider mb-1">Sales and Enquiries</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-gray-700"><span className="font-semibold">QLD:</span> 21 Caterpillar Drive, Mackay QLD 4740</p>
                      <p className="text-gray-700"><span className="font-semibold">NSW:</span> 37 Thomas Mitchell Drive, MUSWELLBROOK NSW 2333</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-gray-700 font-medium">1300 642 525</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-gray-700"><span className="font-semibold">F:</span> 07 4998 5449</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a href="mailto:management@mickala.com.au" className="text-primary hover:underline">management@mickala.com.au</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a href="https://www.mickala.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.mickala.com.au</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== INTRODUCTION ===== */}
        <section id="introduction" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Introduction &amp; Product Details</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Safety</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Please familiarise yourself with the safety precautions and the Lighting Tower operation procedures contained within this manual prior to using the equipment. Failure to do so may cause operational problems, which could affect your warranty and/or result in serious injury. Mickala Mining Maintenance can conduct safety training for personnel who are required to operate this equipment. Please contact us if you require company specific training.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">General</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                For many years, Mickala Lighting Towers has been perfecting the art of Lighting Tower solutions. We have the ability to design and manufacture our own reliable Lighting Towers that we know truly benefits the mining industry. We guarantee our Lighting Towers are advanced in technology and that they are capable of handling any situation.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                Mickala Lighting Towers is very serious about what we do. We are that serious it has taken many years of experience in the mining industry to allow us to design and engineer our own Mickala Lighting Towers. Our Lighting Towers are more efficient, easily maintained, robust and cost-effective while offering the highest environmental sensitivity possible.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                Our Lighting Towers are engineered and certified to suit Australian Mining conditions. Mickala's Lighting Towers comply with the following Australian and Mining standards:
              </p>
              <div className="grid sm:grid-cols-2 gap-1.5 mt-3">
                {[
                  "Mines Safety and Inspection Regulations 1995",
                  "AS2790 Transportable Generator Sets",
                  "AS3713 Noise Level Emissions",
                  "AS3001 Electrical Wiring Rules",
                  "AS3010.1 Supply of Generator Set",
                  "AS1170.2 Wind Loading Criteria",
                  "MDG 41",
                  "MDG 15",
                ].map((std, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                    {std}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                This Operation Manual has been prepared to assist in the operation of your Mickala Lighting Tower. Using this manual in conjunction with the Parts Manual (available separately) will help to ensure that the Lighting Tower operates at maximum performance and efficiency for many years.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
                Please note that in dirty or dusty environments more attention must be paid to frequent servicing to keep the Lighting Tower running efficiently.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 text-sm mb-2">Spare Parts and Support</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                In all correspondence with Mickala Lighting Towers, always have the machine serial number available to allow our company to assist you promptly.
              </p>
              <p className="text-sm text-amber-700 leading-relaxed mt-2">
                Always ensure that adjustments and repairs are done by personnel who are authorised to do the work and have been properly trained. Carrying out unauthorised works or modifying your Lighting Tower without Mickala's authority can void your warranty. Mickala Lighting Towers is able to supply all parts, labour and service items required for any of our Lighting Towers.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COMPONENTS ===== */}
        <section id="components" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Settings className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Components of Lighting Tower</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4 italic">MLT3840-LED model displayed for illustration purposes</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Light Head Assembly",
              "Light Head Rotating Assembly",
              "Mast Assembly",
              "Engine / Generator Module",
              "Spare Tyre (optional)",
              "Control Panel (Electrical / Hydraulic)",
              "Hydraulic Outrigger Assembly",
              "Jockey Wheel",
              "3t Tow Hitch",
            ].map((component) => (
              <div key={component} className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-primary/50 shrink-0" />
                {component}
              </div>
            ))}
          </div>

          {/* Component diagram image */}
          <div className="mt-8 flex justify-center">
            <img
              src="/lighting-tower-components.jpg"
              alt="MLT LED Lighting Tower component diagram"
              className="max-w-full h-auto rounded-xl border border-gray-200 shadow-sm"
              style={{ maxHeight: 600 }}
            />
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">MLT LED Series component diagram &mdash; <em>MLT3840-LED model displayed for illustration purposes</em></p>
        </section>

        {/* ===== STANDARD INCLUSIONS ===== */}
        <section id="standard-inclusions" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Standard Inclusions</h2>
          <p className="text-sm text-gray-600 mb-4">The MLT LED Series include the following features as standard inclusions:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[
              "Pressure Relief Radiator Cap",
              "Starter and Battery Isolator",
              "Jump Start Receptacle",
              "E Stop",
              "Auto Start/Stop",
              "Low Level Fuel Beacon",
              "Safety Valves on all Hydraulic Rams",
              "Wheel Chocks",
              "Durable bump and wear packages for sled mounted towers",
              "Amber Flashing Light",
              "Red Low Fuel Beacon",
              "Fail Safe Shutdown System",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-100 rounded-lg px-3 py-2 hover:border-gray-200 transition-colors">
                <span className="text-primary text-xs">◆</span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Fail Safe Shutdown monitors:</p>
            <div className="flex flex-wrap gap-2">
              {["Engine Temperature", "Coolant Temperature", "Oil Level"].map((item) => (
                <span key={item} className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded-full px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
            {["LED Tail Lights", "4.5kg Fire Extinguisher", "LED Work Lights", "MDG15/41 Compliant", "3 Stage Electronic Paint Protection"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-primary text-xs">◆</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* ===== OPERATING INSTRUCTIONS ===== */}
        <section id="operating-instructions" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Settings className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Operating Instructions</h2>
          </div>

          <h3 className="font-heading text-base font-semibold text-gray-800 mb-3">Control Panel Identification</h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {["Lighting Tower Controller", "Outrigger Operations", "Boom Operations"].map((item) => (
              <div key={item} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 font-medium text-center">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* ===== PRE-START CHECKS ===== */}
        <section id="pre-start-checks" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Pre-Start Checks</h2>
          <ol className="space-y-3">
            {[
              "Check filter service is up to date (500 hour service intervals). If changing, write last service hours on filter",
              "Check engine oil level",
              "Check radiator coolant",
              "Check hydraulics fluid level",
              "Check machine for damage",
              "Check for leaks",
              "Visually inspect electrical conduits for damage",
              "Ensure lenses are clean",
              "Check operation of all machine functions",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-5 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Important</p>
                <p className="text-sm text-red-700 leading-relaxed mt-1">
                  Any issues found in steps 1–8 must be rectified by a qualified tradesperson before performing step 9. If the Lighting Tower fails any checks, follow site specific procedures for tagging the machine <strong>"OUT OF SERVICE"</strong> and call for a service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OPERATION PROCEDURE ===== */}
        <section id="operation-procedure" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Lighting Tower Operation Procedure</h2>

          <ol className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
              <div>
                <span>Lower all 4 outriggers until level site glass bubble is centred</span>
                <p className="text-xs text-gray-500 mt-1 italic">Note — Do not forget to remove the travel strap from mast</p>
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
              <span>Raise mast until it is in a vertical position. For full scope extension, boom must be vertical</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
              <span>Raise telescopic ram until fully raised (or preferred height)</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">4</span>
              <span>Tilt light head until in a vertical position</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">5</span>
              <span>Rotate light head until desired position is reached</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">6</span>
              <span>Commence Start Up procedure as detailed below</span>
            </li>
          </ol>
        </section>

        {/* ===== START UP ===== */}
        <section id="start-up-procedure" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Start Up Procedure</h2>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-800 uppercase">Warning</p>
                <ul className="text-sm text-red-700 list-disc pl-4 mt-2 space-y-1">
                  <li>Authorised personnel only to operate</li>
                  <li>Ensure that the Lighting Tower is positioned on level ground at all times and is fundamentally stable</li>
                  <li>Ensure all personnel are clear of the engine when starting</li>
                  <li>Be aware of overhead power lines</li>
                  <li>Do not operate lighting tower unless the daily pre-start has been carried out</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">To Start Engine (Manual)</h3>
              <p className="text-xs text-gray-500 mb-3 italic">Note: Ensure both Battery and Starter Isolators are turned on</p>
              <ol className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                  Press Manual Start button
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                  Press green Start button
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                  Press Light On button to turn lights on. Continue to press button until all lights are activated
                </li>
              </ol>
            </div>

            {/* Manual start diagram */}
            <div className="flex justify-center mt-4 mb-2">
              <img
                src="/start-engine-manual.jpg"
                alt="Manual start control panel diagram"
                className="max-w-full h-auto rounded-xl border border-gray-200 shadow-sm"
                style={{ maxHeight: 400 }}
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">To Start With Auto Timer Mode</h3>
              <p className="text-xs text-gray-500 mb-3 italic">Note: Ensure both Battery and Starter Isolators are turned on</p>
              <ol className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                  Press Auto button
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                  Select 01 — Auto Timer Mode (using arrow buttons)
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                  Press Auto button
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                  Select 01 — Timer Start
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">5</span>
                  Press Auto button
                </li>
              </ol>
              <p className="text-sm text-gray-600 mt-3 font-medium">Machine will start in Auto Timer Mode.</p>
            </div>

            {/* Auto timer diagram */}
            <div className="flex justify-center mt-4 mb-2">
              <img
                src="/start-engine-auto.jpg"
                alt="Auto timer mode control panel diagram"
                className="max-w-full h-auto rounded-xl border border-gray-200 shadow-sm"
                style={{ maxHeight: 380 }}
              />
            </div>
          </div>
        </section>

        {/* ===== SHUTDOWN ===== */}
        <section id="shutdown-procedure" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Shutdown Procedure</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">To Stop Engine and Shutdown Lights:</h3>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
              <span className="text-sm text-gray-700">Press Stop button</span>
            </div>

            <div className="flex justify-center mt-5">
              <img
                src="/shutdown-procedure.jpg"
                alt="Shutdown procedure control panel diagram"
                className="max-w-full h-auto rounded-xl border border-gray-200 shadow-sm"
                style={{ maxHeight: 380 }}
              />
            </div>
          </div>
        </section>

        {/* ===== ENGINE SPECIFICATIONS ===== */}
        <section id="engine-specifications" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Settings className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Engine Specifications</h2>
          </div>
          <p className="text-sm text-gray-500 italic mb-5">Refer to engine manufacturer's documentation for detailed specifications.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-sm text-gray-600">
            <p>Detailed engine specification tables are available in the complete PDF document.</p>
            <p className="mt-2">
              <a href="https://kubota.com.au/product/engine-z482" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Kubota Z482 Engine Specifications →
              </a>
              <span className="text-xs text-gray-400 ml-2">(external link)</span>
            </p>
          </div>
        </section>

        {/* ===== SERVICING ===== */}
        <section id="servicing" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Settings className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Servicing &amp; Maintenance</h2>
          </div>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              Mickala Lighting Towers requires each Lighting Tower to be serviced every 500 hours. The 500 Hour Service Report outlines the necessary inspection requirements to maximise the life of the Lighting Tower.
            </p>
            <p>
              Mickala Lighting Towers requires a copy of the completed 500 Hour Service Report (up to the earlier of either — 12 months from the date of delivery or 1500 hours of operation) as outlined in the warranty conditions.
            </p>
            <p>
              If you require additional copies of the Service Report please contact us on <strong>(07) 4998 5447</strong>.
            </p>
          </div>

          <h3 className="font-semibold text-gray-800 text-sm mt-6 mb-3">Filter Locations</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ["External Oil Filter", "Changed every 500 hours"],
              ["Fuel Filter", "Changed every 500 hours"],
              ["Air Filter", "Changed every 500 hours"],
              ["Hydraulic Return Filter", "Changed every 2000 hours"],
              ["Oil Filter", "Changed every 500 hours"],
            ].map(([name, interval]) => (
              <div key={name} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {name === "External Oil Filter" ? "1" : name === "Fuel Filter" ? "2" : name === "Air Filter" ? "3" : name === "Hydraulic Return Filter" ? "4" : "5"}
                </span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{interval}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ENGINE TUNE SPECS ===== */}
        <section id="engine-tune" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Engine Tune Specifications</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-900 text-white px-4 py-2.5">
                <h3 className="text-sm font-bold">MLT3200-LED Skid</h3>
                <p className="text-[10px] text-gray-400">Sincro Generator</p>
              </div>
              <div className="p-4 space-y-2.5">
                {[
                  ["Engine RPM (Unloaded)", "2480"],
                  ["Engine RPM (Loaded)", "2260"],
                  ["Generator Voltage (Unloaded)", "34.6 V"],
                  ["Generator Voltage (Loaded)", "26.1 V"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-mono font-semibold text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-900 text-white px-4 py-2.5">
                <h3 className="text-sm font-bold">MLT2560-LED Dual Axle Trailer</h3>
                <p className="text-[10px] text-gray-400">Sincro Generator</p>
              </div>
              <div className="p-4 space-y-2.5">
                {[
                  ["Engine RPM (Unloaded)", "2450"],
                  ["Engine RPM (Loaded)", "2260"],
                  ["Generator Voltage (Unloaded)", "34.3 V"],
                  ["Generator Voltage (Loaded)", "27.6 V"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-mono font-semibold text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SHUTDOWN PARAMETERS / RPM ADJUSTMENT / HYDRAULIC RELIEF / GREASE ===== */}
        <section id="rpm-adjustment" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Engine RPM Adjustment</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Settings className="h-4 w-4 text-gray-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">Engine RPM Adjustment Bolt</p>
                <p className="text-xs text-gray-500 mt-1">Located on the engine governor. Refer to engine manual for adjustment procedure.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="hydraulic-relief" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Hydraulic Relief Pressure</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Hydraulic Pressure Test Port</p>
                <div className="h-8 border-b border-dashed border-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Hydraulic Relief Adjustment</p>
                <p className="text-lg font-mono font-bold text-primary">180–190 Bar</p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 text-sm mt-5 mb-3">Grease Points</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-800">Hydraulic Gearbox Grease Points</p>
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Caution — Excessive Grease will pop front seal out
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-800">Cross Over Relief Pressure</p>
              <p className="text-xs text-gray-500 mt-1">Gearbox Grease Relief</p>
            </div>
          </div>

          <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Settings className="h-4 w-4 text-gray-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">Wheel Bearings</p>
                <p className="text-xs text-gray-500 mt-1">Grease at each service interval per the 500 Hour Service Report.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SAFETY ===== */}
        <section id="safety-general" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Safety</h2>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
            <p className="text-sm text-red-700 leading-relaxed">
              <strong>This section is for information purposes only and is not a safety manual.</strong> Mickala Lighting Towers encourages thorough training and maintenance of high safety standards in the use of this equipment. Responsibility for compiling proper safety instructions rests with the owner of the product. For any further information, contact Mickala Mining Maintenance.
            </p>
          </div>

          <h3 className="font-semibold text-gray-800 text-sm mb-3">General Safety</h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            The Lighting Tower is designed to be safe when used in the correct manner. Responsibility for safety however, rests with the personnel who install, use and maintain the Lighting Tower. The following safety precautions, if followed, will minimise the possibility of accidents. Before performing any procedure or operating technique, it is up to the user to ensure that it is safe.
          </p>
          <p className="text-sm text-gray-600 mb-3">The Lighting Tower should only be operated by personnel who are authorised and trained.</p>

          <div className="space-y-2">
            {[
              "Read and understand all safety precautions and warnings before operating or performing maintenance on the Lighting Tower",
              "Failure to follow the instructions, procedures, and safety precautions in this manual may increase the possibility of accidents and injuries",
              "Never start the Lighting Tower unless it is safe to do so",
              "Install and operate this Lighting Tower only in full compliance with relevant National, Local, or Federal Codes, Standards or other requirements",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HANDLING & TOWING ===== */}
        <section id="safety-handling" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Safety — Handling &amp; Towing</h2>
          <p className="text-sm text-gray-600 mb-4">This manual should be read before moving/lifting the Lighting Tower, or towing a mobile Lighting Tower.</p>

          <h3 className="font-semibold text-gray-800 text-sm mb-3">Lifting</h3>
          <div className="space-y-2 mb-5">
            {[
              "Do not lift Lighting Tower with a forklift",
              "Only qualified personnel are to use lifting equipment",
              "Do not lift the Lighting Tower by the mast. (Use ALL lifting points provided)",
              "Ensure the lifting equipment is in good condition and has a capacity suitable for the load",
              "Keep all personnel away from Lighting Tower when it is suspended. Use a tag line from the pintle hook to assist in stabilising the equipment",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gray-800 text-sm mb-3">Securing Positions</h3>
          <div className="space-y-2 mb-5">
            {[
              "Lighting Tower should only be secured to a carrying vehicle by restraining around tyres and tie down lugs fitted to the underside of the Lighting Tower chassis",
              "Do not chain or sling across the drawbar or mast as damage may occur",
              "Ensure the lifting, rigging and supporting structure is in good condition and has a capacity suitable for the load",
              "Keep all personnel away from the Lighting Tower when it is suspended. DO NOT STAND UNDER SUSPENDED LOAD",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gray-800 text-sm mb-3">Before Towing</h3>
          <div className="space-y-2 mb-5">
            {[
              "Take care not to reverse vehicle into Lighting Tower, as this may damage brake components. Use a Spotter at all times",
              "Check vehicle towing hitch load rating and ball/hitch size and type are compatible with Lighting Tower (this can be found on the compliance/manufacture plate)",
              "Check mast is in the mast support, that it is fully retracted and that the transport strap is secured",
              "Check doors are latched",
              "Check tyres are correctly inflated and that the tread is roadworthy. Check tyre placard or tyre sidewalls for recommended cold inflation pressures",
              "Check all stabiliser legs are raised",
              "Connect hitch, towing chains and electrical plug (if fitted) to vehicle",
              "Check jockey wheel is fully retracted and secured horizontally",
              "Store wheel chocks (if supplied)",
              "Check that the brake reversing lock tab on hitch is open (if brakes are fitted)",
              "Check brake operation, cables are not frayed, and that adjustment is correct",
              "Check tail light operation",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
            <div className="space-y-2 text-sm">
              <p className="text-amber-800">
                <strong>When towing a mobile Lighting Tower, observe all Codes, Standards or other regulations and traffic laws.</strong> These include those regulations specifying required equipment and maximum and minimum speeds.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-amber-700">
                <li>Maximum recommended towing speed on <strong>sealed surfaces</strong> is <strong>80 km/h</strong> (dependent on conditions and local limits)</li>
                <li>Maximum recommended towing speed on <strong>unsealed surfaces</strong> is <strong>40 km/h</strong> (dependent on conditions, local limits and site conditions)</li>
                <li>Maximum recommended towing speed for <strong>skid mounted plant</strong> is <strong>15 km/h</strong></li>
              </ul>
              <p className="text-amber-800 mt-2">
                Do not permit personnel to ride in or on the Lighting Tower. Do not permit personnel to stand or ride on the drawbar or to stand or walk between the Lighting Tower and the towing vehicle.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 text-sm mb-3">Unhitching Lighting Tower</h3>
          <div className="space-y-2">
            {[
              "Check that the ground is level, the surface secure, and the position is not too close to a dropping embankment",
              "Check parking brake is applied on the towing vehicle, and apply parking brake on Lighting Tower",
              "Install wheel chocks (if supplied) ensuring that the Lighting Tower will not roll down any incline — park machine in a fundamentally stable location",
              "Remove chains and electrical plug (if fitted)",
              "Set the jockey wheel in place ensuring that the swivel plate locks into the vertical position",
              "Raise Lighting Tower from hitch using the jockey wheel",
              "Lower stabiliser legs",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              Ensure a Pre-Start checklist is completed before each use. Requirements will vary based on the location of application.
            </p>
          </div>
        </section>

        {/* ===== SET UP ===== */}
        <section id="safety-setup" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Safety — Set Up</h2>
          <p className="text-sm text-gray-700 mb-4">
            To receive optimum Lighting Tower performance set the Lighting Tower 40 to 60 metres from the work area.
          </p>

          <h3 className="font-semibold text-gray-800 text-sm mb-3">Before Starting Engine</h3>
          <div className="space-y-2">
            {[
              "Check all conduits for splits, bare wires or unsecured conduit fittings",
              "Check that all circuit breaker boards are secure and sealed",
              "Check that all covers and caps are secure on alternator, cooling fan/radiator, engine and fuel tank",
              "Check Lighting Tower is level on secure ground and stabiliser legs are down, with wheel chocks in place (if fitted)",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== OPERATING SAFETY ===== */}
        <section id="safety-operating" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Safety — Operating</h2>
          <div className="space-y-2 mb-4">
            {[
              "Before lowering mast, be sure inner mast is fully retracted",
              "Do not operate within a confined space",
              "Do not move Lighting Tower with generator running, or before the mast is retracted in its cradle",
              "Ensure operating area is clear of overhead power lines and any other obstruction before raising mast",
              "Do not operate with a damaged or missing lens or an open light, otherwise skin/eye damage can occur",
              "Avoid looking directly at lights or standing within 8 metres of lights when operating",
              "Do not attempt to operate the Lighting Tower with a known unsafe condition. If the Lighting Tower is unsafe, tag the machine out of service (per site procedures) and isolate the battery (using battery isolator) so that it cannot be started until the condition is corrected",
              "Do not operate the Lighting Tower in any classification of hazardous environment",
              "Do not operate the Lighting Tower if there is risk of wind gusts greater than 100 km/h",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HAZARDS ===== */}
        <section id="safety-hazards" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Safety — Hazards</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-amber-700 text-[10px] font-bold">!</span>
                Fire and Explosion
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Fuels and fumes associated with Lighting Towers can be flammable and potentially explosive. Proper care in handling these materials can dramatically limit the risk of fire or explosion. However, safety dictates that fully charged fire extinguishers are kept on hand. Personnel must know how to operate them.
              </p>
              <div className="space-y-1.5">
                {[
                  "Never store flammable liquids near the engine",
                  "Do not leave rags inside the engine compartment",
                  "Do not smoke or allow sparks, flames or other sources of ignition around fuel or batteries",
                  "Fuel vapours are explosive. Hydrogen gas generated by charging batteries is also explosive",
                  "Turn off or disconnect the power to the battery charger before making or breaking connections with the battery",
                  "Keep grounded conductive objects, such as tools, away from exposed live electrical parts, such as terminals, to avoid arcing. Sparks and arcing might ignite fuel or vapours",
                  "Do not refill the fuel tank while the engine is running",
                  "Do not attempt to operate the Lighting Tower with any known leaks in the fuel system",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2">Mechanical Hazards</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                The Lighting Tower is designed with guards for protection from moving parts. Care must still be taken to protect personnel and equipment from other mechanical hazards when working around the Lighting Tower.
              </p>
              <div className="space-y-1.5">
                {[
                  "Do not attempt to operate the Lighting Tower with any safety guards or panels removed",
                  "During operation, do not attempt to reach under or around the guards for any reason",
                  "Ensure that the engine is operated only from the control panel or from the operators position by one person only",
                  "Keep hands, arms, long hair, loose clothing and jewellery away from pulleys, belts and other moving parts",
                  "Caution — Some moving parts cannot be seen clearly when the set is running",
                  "Keep access doors on enclosures, if equipped, closed and locked when not required to be open",
                  "Avoid contact with hot oil, hot coolant, hot exhaust gases, hot surfaces and sharp edges and corners",
                  "If your skin comes into contact with high pressure fuel, obtain medical assistance immediately",
                  "If your skin comes into contact with high pressure hydraulic oil, obtain medical assistance immediately",
                  "Wear protective clothing including gloves and hat when working around the Lighting Tower",
                  "Do not remove the radiator filler cap until the coolant has cooled. Then loosen the cap slowly to relieve any excess pressure before removing the cap completely",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2">Chemical Hazards</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Fuels, oils, coolants, lubricants and battery electrolyte used in this Lighting Tower are typical of the industry. However, they can be hazardous to personnel if not treated properly.
              </p>
              <div className="space-y-1.5">
                {[
                  "Do not swallow or have skin contact with fuel, oil, coolant lubricants or battery electrolyte. If swallowed, seek medical treatment immediately",
                  "Do not induce vomiting if fuel is swallowed. For skin contact, wash with soap and water",
                  "Do not wear clothing that has been contaminated by fuel or lube oil",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2">Noise Hazards</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                Lighting Towers that are not equipped with sound attenuating enclosures can produce noise levels in excess of 85 dBA. Prolonged exposure to noise levels above 85 dBA is hazardous to hearing.
              </p>
              <div className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                <span>Ear protection should be worn when operating or working around the Lighting Tower</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2">Electrical Hazards</h3>
              <div className="space-y-1.5">
                {[
                  "Do not attempt to connect or disconnect load while standing in water or on wet or unstable ground",
                  "Be sure all electrical power is isolated from electrical equipment being serviced",
                  "Keep all electrical equipment clean and dry",
                  "Replace any wiring where the insulation is cracked, cut, frayed or otherwise degraded",
                  "Replace terminals that are worn, discoloured or corroded. Keep terminals clean and tight",
                  "Use only fire extinguishers suitable for electrical fires",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FIRST AID ===== */}
        <section id="safety-first-aid" className="mb-14">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">First Aid for Electrical Injuries</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5">
            <p className="text-sm text-blue-700 leading-relaxed">
              <strong>This section is included for information purposes only and is not a First Aid manual.</strong> Medical advice should always be sought in the preparation of procedures and as soon as possible in an emergency. While Mickala Mining Maintenance encourages thorough training of First Aid personnel, responsibility for compiling adequate First Aid instructions rests with the owner of the product. For any further information, contact Mickala Mining Maintenance.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Shock</h3>
              <p className="text-sm text-gray-700 mb-2">Most injured people show the signs and symptoms of shock. These are:</p>
              <div className="grid sm:grid-cols-2 gap-2 mb-3">
                {[
                  "Pale, cool, moist skin",
                  "A weak, rapid pulse",
                  "Altered conscious states",
                  "Rapid breathing",
                  "Nausea / vomiting",
                  "Restlessness / irritability",
                  "Extreme thirst",
                ].map((symptom) => (
                  <div key={symptom} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="text-green-600 font-bold shrink-0">✓</span>
                    {symptom}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Do not give any food, fluids or stimulants. Where possible, the conscious victim should be assisted to lie down in the most comfortable position with all injured parts supported. If injuries permit, raise both legs to boost the circulation to the heart and brain. The unconscious victim should be placed in the recovery position. Maintain the victim's body temperature.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Burns</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Electrical burns are often deep, and the victim will have both an entrance and exit wound. Although these wounds may look superficial, the tissues below may be severely damaged.
              </p>
              <p className="text-sm font-semibold text-gray-700 mb-2">After ensuring the scene is safe:</p>
              <div className="space-y-2">
                {[
                  "Cool burns by flushing with cool water",
                  "Remove victims rings and jewellery (metal retains heat)",
                  "Cover the burn with a dry, sterile dressing",
                  "Take steps to minimise shock",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="text-green-600 font-bold shrink-0">✓</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-bold text-red-800">In all emergencies call Emergency Services as soon as possible.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAULT DIAGNOSIS ===== */}
        <section id="fault-diagnosis" className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <AlertTriangle className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-heading text-xl font-bold text-gray-900">Fault Diagnosis</h2>
          </div>

          <p className="text-sm text-gray-600 mb-5">
            In the event of experiencing difficulty in operating your Mickala Lighting Tower, refer to the table below. If the difficulty persists or is not a listed item, contact Mickala Mining Maintenance on <strong>(07) 4998 5447</strong> for further support information.
          </p>

          {[
            {
              symptom: "Engine not starting",
              solutions: [
                "Check both isolators are in the ON position",
                "Check Emergency Stops are not engaged",
                "Check battery is charged. Charge or replace as required",
                "Check sufficient fuel in tank",
                "Check fuel tank for water contamination",
                "If tank has previously been emptied, the fuel system may require priming",
              ],
            },
            {
              symptom: "Engine shutting down",
              solutions: [
                "Check control panel for any faults",
                "Engine Over/Under speed",
                "High Temp",
                "Low Level Coolant",
                "Check engine fluid levels",
                "Engine and alternator will be very hot after running. Allow to cool before checking fluid levels",
                "Check sufficient fuel in tank",
              ],
            },
            {
              symptom: "Lights Strobing / Blinking",
              solutions: [
                "Low Voltage",
                "High Voltage",
              ],
            },
            {
              symptom: "Circuit breakers tripping",
              solutions: [
                "Turn engine off. Visually check for damaged cables. If no damage apparent, reset circuit breakers. Follow start up procedure",
                "If fault persists after resetting, do not operate tower and call for service",
              ],
            },
            {
              symptom: "Lights fail to illuminate",
              solutions: [
                "Check for damage to lighting circuitry",
                "Check all light indicators are Green. If circuit is red, call for Service",
              ],
            },
            {
              symptom: "Hydraulic pump and motor does not operate",
              solutions: [
                "Engine not running",
                "Check battery isolator is in ON position",
                "Check main hydraulic fuse",
              ],
            },
          ].map((fault) => (
            <div key={fault.symptom} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 text-sm">{fault.symptom}</h3>
              </div>
              <div className="px-4 py-3 space-y-1.5">
                {fault.solutions.map((sol, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-primary text-xs mt-0.5">•</span>
                    <span>{sol}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-amber-800 font-medium">
              If the difficulty persists or is not a listed item, do not hesitate — contact Mickala Mining Maintenance on <strong>(07) 4998 5447</strong>.
            </p>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <div className="mt-16 pt-8 border-t border-gray-200 print:border-gray-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <Image src="/logo-mickala.png" alt="Mickala" width={24} height={24} className="h-5 w-auto" />
              <span>Mickala Lighting Towers</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono">MM-OP-BI-001</span>
              <span>Rev 1.3</span>
              <span>25 November 2014</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-3 w-3" />
              <span>1300 642 525</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-gray-400">
            <span>21 Caterpillar Drive, Mackay QLD 4740</span>
            <span>37 Thomas Mitchell Drive, MUSWELLBROOK NSW 2333</span>
            <a href="mailto:management@mickala.com.au" className="hover:text-primary transition-colors">management@mickala.com.au</a>
            <a href="https://www.mickala.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">www.mickala.com.au</a>
          </div>
          <p className="mt-4 text-center text-[10px] text-gray-400">
            Uncontrolled if printed. Controlled copy available on Mickala Intranet.
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 1.5cm;
            size: A4;
          }
          body {
            background: white !important;
            font-size: 10pt;
            line-height: 1.4;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          section {
            page-break-inside: avoid;
          }
          h1, h2, h3, h4 {
            page-break-after: avoid;
          }
          a {
            color: black !important;
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  )
}
