"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Download } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const specSheets = [
  // Single Axle
  { title: "MLT 1280-4LED Single Axle", description: "4-LED single axle lighting tower — compact, easy to tow and deploy for smaller sites", file: "/spec-sheets/single-axle-1280-4led.pdf", lightSim: "/spec-sheets/single-axle-1280-4led-lightsim.pdf", category: "single-axle", image: "/product-images/doc_f9ffe13e2ce8_mlt-1280-4led-single-axle-tower.png" },
  { title: "MLT 1280-6LED Single Axle", description: "6-LED single axle lighting tower — higher output for medium-sized work areas", file: "/spec-sheets/single-axle-1280-6led.pdf", lightSim: "/spec-sheets/single-axle-1280-6led-lightsim.pdf", category: "single-axle", image: "/product-images/doc_675019b64b3f_mlt-1280-6led-single-axle-tower.png" },
  { title: "MLT 1920-LED Single Axle", description: "1920-LED single axle lighting tower — maximum illumination for large-scale operations", file: "/spec-sheets/single-axle-1920-led.pdf", lightSim: "/spec-sheets/single-axle-1920-led-lightsim.pdf", category: "single-axle", image: "/product-images/doc_9db394285565_mlt-1920-led-single-axle-tower.png" },
  { title: "MLT 2560-LED Single Axle", description: "2560-LED single axle lighting tower — extreme output for the largest work sites", file: "/spec-sheets/single-axle-2560-led.pdf", lightSim: "/spec-sheets/single-axle-2560-led-lightsim.pdf", category: "single-axle", image: "/product-images/doc_ca1d46669f30_mlt-2560-led-single-axle-tower.png" },

  // Dual Axle
  { title: "MLT 2560-LED Dual Axle", description: "2560-LED dual axle lighting tower — enhanced stability and payload for demanding conditions", file: "/spec-sheets/dual-axle-2560-led.pdf", lightSim: "/spec-sheets/dual-axle-2560-led-lightsim.pdf", category: "dual-axle", image: "/product-images/doc_caaa568cee08_mlt-2560-led-dual-axle-tower.png" },
  { title: "MLT 3200-LED Dual Axle", description: "3200-LED dual axle lighting tower — high-output lighting for large industrial sites", file: "/spec-sheets/dual-axle-3200-led.pdf", lightSim: "/spec-sheets/dual-axle-3200-led-lightsim.pdf", category: "dual-axle", image: "/product-images/doc_0db128540ed1_mlt-3200-led-dual-axle-tower.png" },
  { title: "MLT 3840-LED Dual Axle", description: "3840-LED dual axle lighting tower — maximum coverage and illumination", file: "/spec-sheets/dual-axle-3840-led.pdf", lightSim: "/spec-sheets/dual-axle-3840-led-lightsim.pdf", category: "dual-axle", image: "/product-images/doc_830a8f6c08db_mlt-3840-led-dual-axle-tower.png" },

  // Sled Mount
  { title: "MLS 2560-LED Sled Mount", description: "2560-LED sled mounted lighting tower — skid-mounted design for extreme terrain", file: "/spec-sheets/sled-mount-2560-led.pdf", lightSim: "/spec-sheets/sled-mount-2560-led-lightsim.pdf", category: "sled-mount", image: "/product-images/doc_9ba284db2a30_mls-2560-led-sled-mounted-tower.png" },
  { title: "MLS 3200-LED Sled Mount", description: "3200-LED sled mounted lighting tower — high-output skid-mounted for remote sites", file: "/spec-sheets/sled-mount-3200-led.pdf", lightSim: "/spec-sheets/sled-mount-3200-led-lightsim.pdf", category: "sled-mount", image: "/product-images/doc_fdeca1e9b4f9_mls-3200-led-sled-mounted-tower.png" },
  { title: "MLS 3840-LED Sled Mount", description: "3840-LED sled mounted lighting tower — maximum illumination for remote operations", file: "/spec-sheets/sled-mount-3840-led.pdf", lightSim: "/spec-sheets/sled-mount-3840-led-lightsim.pdf", category: "sled-mount", image: "/product-images/doc_abd280e3fc3c_mls-3840-led-sled-mounted-tower.png" },

  // Long Range
  { title: "MLR 4800-LED Long Range", description: "4800-LED long range lighting tower — extended runtime and coverage for large-scale operations", file: "/spec-sheets/long-range-4800-led.pdf", lightSim: "/spec-sheets/long-range-4800-led-lightsim.pdf", category: "long-range", image: "/product-images/doc_8391d0d6a389_mlr-4800-led-sled-mounted-tower.png" },
  { title: "MLR 7200-LED Long Range", description: "7200-LED long range lighting tower — maximum coverage for the largest mining and industrial sites", file: "/spec-sheets/long-range-7200-led.pdf", lightSim: "/spec-sheets/long-range-7200-led-lightsim.pdf", category: "long-range", image: "/product-images/doc_b1045367b1fd_mlr-7200-led-sled-mounted-tower.png" },

  // Fuel Trailers
  { title: "Fuel Trailers", description: "Bulk fuel storage and dispensing trailers for remote mining and industrial operations", file: "/spec-sheets/fuel-trailers.pdf", category: "fuel-trailers" },

  // Generators
  { title: "Generators", description: "Industrial diesel generators — reliable prime and standby power for mining and construction", file: "/spec-sheets/generators.pdf", category: "generators" },
]

const categories = [
  { id: "single-axle", label: "Single Axle" },
  { id: "dual-axle", label: "Dual Axle" },
  { id: "sled-mount", label: "Sled Mount" },
  { id: "long-range", label: "Long Range" },
  { id: "fuel-trailers", label: "Fuel Trailers" },
  { id: "generators", label: "Generators" },
]

function SpecSheetsContent() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") || "all"

  const filtered = activeCategory === "all"
    ? specSheets
    : specSheets.filter(s => s.category === activeCategory)

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
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Product Spec Sheets</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Download detailed specification sheets and light simulation data for our full range of lighting towers and mining equipment.
          </p>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/spec-sheets"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/spec-sheets?category=${cat.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 max-w-3xl mx-auto">
          {filtered.map((sheet) => (
            <div
              key={sheet.file}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {sheet.image ? (
                  <img
                    src={sheet.image}
                    alt={sheet.title}
                    className="h-16 w-12 object-contain rounded shrink-0"
                  />
                ) : (
                  <FileText className="h-6 w-6 text-primary mt-1 shrink-0" />
                )}
                <div>
                  <h3 className="font-semibold">{sheet.title}</h3>
                  <p className="text-sm text-muted-foreground">{sheet.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={sheet.file}
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
                >
                  <Download className="h-4 w-4" />
                  Spec Sheet
                </a>
                {sheet.lightSim && (
                  <a
                    href={sheet.lightSim}
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-500/20"
                  >
                    <Download className="h-4 w-4" />
                    Light Sim
                  </a>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No spec sheets available for this category yet. Coming soon.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default function SpecSheetsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SpecSheetsContent />
    </Suspense>
  )
}
