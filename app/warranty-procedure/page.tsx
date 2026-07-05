"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, Printer, ArrowLeft, FileText, Clock, Users, Wrench, Phone, CheckCircle } from "lucide-react"

const steps = [
  {
    num: "1",
    title: "Request for Warranty Claim",
    section: "2.1",
    details: [
      "Client identifies a fault not caused by misuse or neglect.",
      "Client contacts Mickala via phone or email during business hours.",
      "Mickala may direct the client to fill out a Warranty Claim Form available on the Mickala website.",
      "Mickala enters the claim into the warranty register and allocates a claim number.",
      "The Warranty Claim Process Procedure (this document) is followed for every claim.",
      "A warranty claim form is to be filled out and completed by the client for all warranty claims.",
    ],
  },
  {
    num: "2",
    title: "Warranty Claim Form is Received",
    section: "2.2",
    details: [
      "The completed claim form is received by a Mickala representative.",
      "The Claims Officer (or delegate) determines whether the claim is within warranty based on date of delivery, hours of operation, and nature of fault.",
      "If within warranty, a claim number is issued and the process proceeds to inspection.",
      "If outside warranty, the client is advised and a standard service quotation is provided.",
    ],
  },
  {
    num: "3",
    title: "Inspection of Equipment is Conducted",
    section: "2.3",
    details: [
      "A Mickala representative (or authorised third party) attends the equipment location.",
      "A full inspection is conducted to verify the reported fault.",
      "The warranty claim form is used to record findings.",
      "Photos of the fault are taken and attached to the claim file.",
      "The inspection confirms whether the fault is: a manufacturing or material defect (warranty applicable) or caused by misuse, neglect, or unauthorised modification (not covered).",
      "If the fault is not covered, the client is advised in writing with reasons.",
    ],
  },
  {
    num: "4",
    title: "Repairs to Equipment Completed",
    section: "2.4",
    details: [
      "Authorised repairs are carried out by a Mickala representative or authorised third party.",
      "Parts required are recorded with part numbers, descriptions, and quantities.",
      "Labour hours are recorded with descriptions of work performed.",
      "All repairs are tested to confirm the fault has been rectified.",
      "The warranty claim form is updated with all repair details.",
    ],
  },
  {
    num: "5",
    title: "Client Contacted Post Repairs",
    section: "2.5",
    details: [
      "The client is contacted to confirm the issue has been resolved.",
      "The client is asked to sign off on the warranty claim form.",
      "A copy of the completed claim form is provided to the client.",
      "Client feedback is recorded.",
    ],
  },
  {
    num: "6",
    title: "Warranty Claim is Closed",
    section: "2.6",
    details: [
      "The Claims Officer reviews the completed claim file.",
      "Job costs are captured and recorded against the claim number.",
      "The warranty register is updated.",
      "Claim file is closed and archived.",
      "Trend data is recorded for quality reporting.",
    ],
  },
]

const relatedDocs = [
  { ref: "MM-OP-TP-003", title: "Warranty Claim Form", url: "/warranty" },
  { ref: "MM-FM-HR-012", title: "Leave Form" },
  { ref: "MM-OP-TP-001", title: "Pre-Delivery Inspection Report" },
  { ref: "MM-OP-TP-002", title: "Post-Hire Inspection Report" },
  { ref: "MM-OP-PP-001", title: "Non-Conformance Process Procedure" },
  { ref: "MM-OP-PP-002", title: "Risk Assessment Process Procedure" },
  { ref: "MM-FM-BI-002", title: "Purchase Order Form" },
]

export default function WarrantyProcedurePage() {
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({})
  const [showAll, setShowAll] = useState(false)

  const toggle = (num: string) => setOpenSteps(p => ({ ...p, [num]: !p[num] }))
  const allOpen = showAll || Object.keys(openSteps).length === steps.length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6 no-print">
          <Link href="/documents" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Back to Hub
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Warranty Claim Process Procedure</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Document: MM-OP-PP-003 | Rev 1.4 | Operations</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
          <div className="bg-card border rounded-lg p-3">
            <span className="text-muted-foreground block">Author</span>
            <span className="font-semibold">Operations Manager</span>
          </div>
          <div className="bg-card border rounded-lg p-3">
            <span className="text-muted-foreground block">Approved by</span>
            <span className="font-semibold">General Manager</span>
          </div>
          <div className="bg-card border rounded-lg p-3">
            <span className="text-muted-foreground block">Date Approved</span>
            <span className="font-semibold">06 Mar 2025</span>
          </div>
          <div className="bg-card border rounded-lg p-3">
            <span className="text-muted-foreground block">Revision Due</span>
            <span className="font-semibold">06 Mar 2028</span>
          </div>
        </div>

        {/* Toggle all */}
        <button onClick={() => setShowAll(!showAll)} className="no-print text-xs text-primary hover:underline mb-4 inline-flex items-center gap-1">
          {showAll ? "Collapse all" : "Expand all steps"}
        </button>

        {/* Process Steps */}
        {steps.map(step => {
          const isOpen = openSteps[step.num] ?? false
          return (
            <div key={step.num} className="mb-4 border rounded-lg overflow-hidden print:break-inside-avoid">
              <button
                onClick={() => toggle(step.num)}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  isOpen || showAll ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">{step.num}</span>
                  <div>
                    <span className="text-sm font-bold">{step.title}</span>
                    <span className="text-[10px] opacity-70 ml-2">Section {step.section}</span>
                  </div>
                </div>
                {isOpen || showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {(isOpen || showAll) && (
                <div className="p-4 bg-card">
                  <ul className="space-y-2">
                    {step.details.map((d, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}

        {/* Related Documents */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Related Documents</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {relatedDocs.map(doc => (
              <div key={doc.ref} className="text-xs flex items-center gap-2 bg-card border rounded-lg p-3">
                <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold">{doc.ref}</span>
                  <span className="text-muted-foreground ml-1">— {doc.title}</span>
                  {doc.url && (
                    <Link href={doc.url} className="text-primary hover:underline ml-1">(Open form)</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-[10px] text-muted-foreground flex justify-between print:fixed print:bottom-0 print:left-0 print:right-0 print:p-4">
          <span>Uncontrolled if printed. Controlled copy available on Mickala Intranet.</span>
          <span>MM-OP-PP-003 | Rev 1.4</span>
        </div>
      </div>
    </div>
  )
}
