import Link from "next/link"
import { FileText, ArrowLeft } from "lucide-react"

const manuals = [
  {
    title: "Operation & Maintenance Manual — MLT LED Series",
    slug: "operation-maintenance",
    pages: 57,
    partsCount: 0,
    description: "Complete service, maintenance and operation manual for all MLT LED lighting tower models. Document MM-OP-BI-001.",
  },
  {
    title: "Fuel Trailer Parts Manual",
    slug: "fuel-trailer",
    pages: 23,
    partsCount: 178,
    description: "Complete parts listing and diagrams for the Mickala fuel trailer range.",
  },
]

export default function PartsManualsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Parts Manuals</h1>
        <p className="text-muted-foreground mb-8">Interactive parts catalogs for Mickala products.</p>

        <div className="grid gap-4 max-w-2xl">
          {manuals.map((manual) => (
            <Link
              key={manual.slug}
              href={`/parts-manuals/${manual.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h2 className="font-semibold">{manual.title}</h2>
                <p className="text-sm text-muted-foreground">{manual.description}</p>
              </div>
              <span className="text-xs text-muted-foreground">{manual.pages} pages</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
