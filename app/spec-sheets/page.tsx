"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Download } from "lucide-react"
import Link from "next/link"

const specSheets = [
  {
    title: "Single Axle",
    description: "Single axle lighting tower — compact, easy to tow and deploy for smaller sites",
    file: "/spec-sheets/single-axle.pdf",
  },
  {
    title: "Dual Axle",
    description: "Dual axle lighting tower — enhanced stability and payload for demanding conditions",
    file: "/spec-sheets/dual-axle.pdf",
  },
  {
    title: "Sled Mount",
    description: "Sled mounted lighting tower — skid-mounted design for extreme terrain and remote locations",
    file: "/spec-sheets/sled-mount.pdf",
  },
  {
    title: "Long Range",
    description: "Long range lighting tower — extended runtime and coverage for large-scale operations",
    file: "/spec-sheets/long-range.pdf",
  },
  {
    title: "Fuel Trailers",
    description: "Bulk fuel storage and dispensing trailers for remote mining and industrial operations",
    file: "/spec-sheets/fuel-trailers.pdf",
  },
  {
    title: "Generators",
    description: "Industrial diesel generators — reliable prime and standby power for mining and construction",
    file: "/spec-sheets/generators.pdf",
  },
]

export default function SpecSheetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Product Spec Sheets</h1>
          <p className="text-lg text-muted-foreground">
            Download detailed specification sheets for our full range of lighting towers and mining equipment.
            Each spec sheet includes technical data, dimensions, performance figures, and compliance information.
          </p>
        </div>

        <div className="grid gap-4 max-w-3xl mx-auto">
          {specSheets.map((sheet) => (
            <div
              key={sheet.file}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <FileText className="h-6 w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">{sheet.title}</h3>
                  <p className="text-sm text-muted-foreground">{sheet.description}</p>
                </div>
              </div>
              <a
                href={sheet.file}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
              >
                <Download className="h-4 w-4" />
                PDF
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
