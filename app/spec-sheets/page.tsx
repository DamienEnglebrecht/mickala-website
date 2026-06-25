"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Download } from "lucide-react"
import Link from "next/link"

const specSheets = [
  {
    title: "MLT-10 Lighting Tower",
    description: "10m pneumatic mast, 4 x 1000W LED floodlights, diesel generator",
    file: "/spec-sheets/mlt-10.pdf",
  },
  {
    title: "MLT-12 Lighting Tower",
    description: "12m pneumatic mast, 6 x 1000W LED floodlights, diesel generator",
    file: "/spec-sheets/mlt-12.pdf",
  },
  {
    title: "MLT-Hybrid Solar/LED Tower",
    description: "Hybrid solar/battery/diesel, 4 x 200W LED, 9m mast",
    file: "/spec-sheets/mlt-hybrid.pdf",
  },
  {
    title: "MLT-LP Low Profile Tower",
    description: "Low profile transport height, 6m mast, 4 x 1000W LED",
    file: "/spec-sheets/mlt-lp.pdf",
  },
  {
    title: "Shield+ Light Tower",
    description: "Premium sound-attenuated enclosure, 10m mast, 6 x 1000W LED",
    file: "/spec-sheets/shield-plus.pdf",
  },
  {
    title: "BTS Ballast Truck System",
    description: "Truck-mounted lighting system, 12m mast, 8 x 1500W LED",
    file: "/spec-sheets/bts.pdf",
  },
  {
    title: "STS Skid Tower System",
    description: "Skid-mounted, 9m mast, 4 x 1000W LED, ideal for remote sites",
    file: "/spec-sheets/sts.pdf",
  },
  {
    title: "Fuel Trailer",
    description: "Bulk fuel storage and dispensing trailer for remote mining operations",
    file: "/spec-sheets/fuel-trailer.pdf",
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
              <Button variant="outline" size="sm" asChild>
                <a href={sheet.file} download>
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </a>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
