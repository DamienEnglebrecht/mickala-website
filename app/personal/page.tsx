"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, FileText, BookOpen, Scale, Users, Gavel, Headphones, Phone, Mail, MapPin, Lock, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

const PASSWORD = "Englebrecht2026"

type Item = { label: string; href?: string; file?: string; note?: string }
type Section = { title: string; icon: any; items: Item[] }

const sections: Section[] = [
  {
    title: "Credentials & Passwords",
    icon: Shield,
    items: [
      { label: "All Login Details", href: "/personal/credentials", desc: "Passwords for all platforms" },
      { label: "Staff Login", href: "/login", desc: "Operations app access" },
      { label: "Admin Panel", href: "/admin", desc: "Manage staff access" },
    ]
  },
  {
    title: "Costs Application",
    icon: Scale,
    items: [
      { label: "Costs Submission v4", href: "/costs-submission-v4" },
      { label: "Costs Submission v8 (Updated — LSC Referral Added)", file: "costs/Costs Submission - Draft v8.docx" },
      { label: "Affidavit of Damien Englebrecht (85 paragraphs)", file: "costs/Affidavit_of_Damien_Englebrecht_Costs.docx" },
      { label: "Cross-Examination Brief (Hirst 11 themes, Hackett 6, Nicole 8)", file: "costs/Cross_Examination_Brief.docx" },
      { label: "Calderbank Offer (Dec 2022)", file: "20221209 - Settlement Offer (BarryNilsson to Stone Group).pdf" },
      { label: "Draft Final Orders (v2)", file: "2026.06.24 - Draft Final Orders (v2).pdf" },
    ],
  },
  {
    title: "Trial & Evidence",
    icon: Gavel,
    items: [
      { label: "Judgment — Englebrecht (No 3)", file: "Englebrecht & Englebrecht (No 3) [2026] FedCFamC1F 394.pdf" },
      { label: "GT Report — Single Expert Valuation", href: "/gt-report" },
      { label: "Trial Transcript (8 Jul 2025)", href: "/transcript-8-jul" },
      { label: "Trial Transcript (9 Jul 2025)", href: "/transcript-9-jul" },
      { label: "Trial Transcript (10 Jul 2025)", href: "/transcript-10-jul" },
      { label: "Worsley Recording 1 — Transcript", file: "Worsley Recording - Transcript.docx" },
      { label: "Worsley Recording 2 — Transcript", file: "Worsley Recording 2 - Transcript.docx" },
    ],
  },
  {
    title: "Court Registry",
    icon: BookOpen,
    items: [
      { label: "CCP Documents", href: "/ccp-documents" },
      { label: "Plenti Loan Documents", href: "/plenti-docs" },
      { label: "Subpoenas & Orders", href: "/subpoenas" },
      { label: "Hirst Correspondence (2023)", href: "/hirst-correspondence" },
    ],
  },
  {
    title: "Legal Precedents",
    icon: Shield,
    items: [
      { label: "White Industries v Flower & Hart", href: "/cases/white-industries" },
      { label: "Calderbank v Calderbank", href: "/cases/calderbank" },
      { label: "Briginshaw v Briginshaw", href: "/cases/briginshaw" },
      { label: "[2006] LPT 015 — LSC v Hackett (Misleading Affidavit)", file: "costs/Hackett_LPT_2006_Decision.pdf" },
      { label: "BD 1249/20 — Conley v Hirst (Negligence Claim)", file: "costs/C636 DOC 12.pdf" },
    ],
  },
  {
    title: "Patent Case (Worsley)",
    icon: FileText,
    items: [
      { label: "Trial Judgment [2025] FCA 1363", file: "Southern_Cross_Industrial_Group_Pty_Ltd_v_Mickala_Mining_Maintenance.pdf" },
      { label: "Costs Order [2025] FCA 1465", file: "Southern_Cross_Industrial_Group_Pty_Ltd_v_Mickala_Mining_Maintenance.pdf" },
      { label: "Strike Out [2022] FCA 598", file: "SX_Pty_Ltd_v_MLT_Pty_Ltd_Judgment_of_Downes_J_23_5_2022_FCA_598.PDF" },
    ],
  },
  {
    title: "Mickala Group",
    icon: Users,
    items: [
      { label: "Quote Template", href: "/quote" },
      { label: "Capability Statement", href: "/capability-statement" },
      { label: "Master Hire Agreement", href: "/master-hire" },
      { label: "Purchase Letter & Warranty", href: "/purchase-warranty" },
      { label: "Pre-Delivery Checklist", href: "/pre-delivery-checklist" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Contact",
    icon: Headphones,
    items: [
      { label: "Damien Greer Lawyers", href: "#", note: "dgreer@damiengreer.com.au" },
      { label: "Stefan Schonell (Barrister)", href: "#", note: "Chambers 33, Brisbane" },
      { label: "Mickala Group Legal", href: "#", note: "management@mickala.com.au" },
    ],
  },
  {
    title: "Analytics",
    icon: Shield,
    items: [
      { label: "Document Tracking Report", href: "/tracking-report" },
    ],
  },
  {
    title: "Credentials & Passwords",
    icon: Lock,
    items: [
      { label: "Website Hosting (Vercel)", note: "mickala.vercel.app - token saved" },
      { label: "Database (Supabase)", note: "fntqwckvrdbemjadcpcz" },
      { label: "Personal Page", note: "pw: Englebrecht2026" },
      { label: "Staff Admin Panel", href: "/admin" },
      { label: "Document Tracking", href: "/tracking-report" },
    ],
  },
]

const courtFiles = [
  "Appeal books",
  "Consent orders",
  "Wife's Financial Statements",
  "Husband's Financial Statements",
  "Subpoena returns",
  "Wife's trial affidavit (700+ pages)",
  "Husband's trial affidavit (250+ pages)",
  "Exhibits 1-85 (800+ pages)",
  "ICL documents",
  "Costs notices",
]

export default function PersonalPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const handleLogin = () => {
    const stored = localStorage.getItem("mickala_personal_password") || "Englebrecht2026"
    if (pw === stored) setAuthed(true)
    else alert("Incorrect password")
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Damien Personal</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Enter password to access</p>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-red-600"
          />
          <button onClick={handleLogin} className="w-full bg-red-600 text-white rounded-full py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors">Unlock</button>
          <p className="text-xs text-gray-400 text-center mt-4">For Damien Englebrecht only</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
              <Shield className="h-4 w-4" />
            </span>
            <div>
              <span className="font-bold text-sm">Damien Personal</span>
              <span className="text-[10px] text-gray-400 ml-2">— Private & Confidential</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/documents" className="text-xs text-gray-500 hover:text-gray-800">Mickala Page →</Link>
            <button onClick={() => setAuthed(false)} className="text-xs text-red-600 hover:text-red-700">Lock</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Case Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Englebrecht & Englebrecht — BRC5588/2022</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Documents Filed", value: "140+" },
            { label: "Legal Reps (Costs Target)", value: "Hirst & Hackett" },
            { label: "Worth of Calderbank Gap", value: "$2.25M" },
            { label: "Days Since Nov 2022", value: "1,335" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="text-lg font-bold text-gray-900">{s.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map(section => {
            const isOpen = openSections[section.title] ?? true
            return (
              <div key={section.title} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenSections({ ...openSections, [section.title]: !isOpen })} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <section.icon className="h-4 w-4" />
                    </span>
                    <span className="font-semibold text-sm">{section.title}</span>
                  </div>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-1">
                    {section.items.map((item: any) => (
                      item.href?.startsWith("/") ? (
                        <Link key={item.label} href={item.href} className="flex items-center justify-between text-sm text-gray-600 hover:text-red-600 py-1.5 px-2 rounded-lg hover:bg-red-50 transition-colors">
                          <span>{item.label}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : (
                        <div key={item.label} className="flex items-center justify-between text-sm text-gray-600 py-1.5 px-2">
                          <span>{item.label}</span>
                          <span className="text-[10px] text-gray-400">{item.note || "Local file"}</span>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Court Registry Access */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-bold mb-3">Court Registry Access</h3>
          <div className="flex flex-wrap gap-2">
            {courtFiles.map(f => (
              <span key={f} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">{f}</span>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-4 w-4 text-red-600" />
            <h3 className="font-bold text-sm text-gray-900">Change Personal Password</h3>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              placeholder="Enter new password"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
            <button onClick={() => { const newVal = newPw || "Englebrecht2026"; localStorage.setItem("mickala_personal_password", newVal); alert("Password updated to: " + newVal); window.location.reload(); }} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shrink-0">Save</button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Current password: <span className="font-mono bg-gray-100 px-1 rounded">{localStorage.getItem("mickala_personal_password") || "Englebrecht2026"}</span></p>
        </div>

        {/* Contact */}
        <div className="mt-6 bg-red-600 text-white rounded-xl p-5 text-center">
          <p className="text-sm font-semibold mb-2">Need urgent assistance with your matter?</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> 1300 642 525</span>
            <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> management@mickala.com.au</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-[10px] text-gray-400">
          Damien Personal — Private & Confidential — Damien Englebrecht only
        </div>
      </div>
    </div>
  )
}
