"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, FileText, X, Grid3X3, List, ChevronDown, ChevronUp } from "lucide-react"
import catalog from "@/data/parts/fuel-trailer-catalog.json"

const { parts, categories } = catalog

export default function FuelTrailerPartsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedPart, setSelectedPart] = useState<number | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const matchesCategory = !activeCategory || part.category === activeCategory
      const matchesSearch =
        !searchQuery ||
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.partNo.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const activeCatLabel = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.label
    : null

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 gap-4">
          <Link
            href="/parts-manuals"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground shrink-0"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
          </Link>
          <h1 className="text-sm font-semibold tracking-tight hidden sm:block">Fuel Trailer Parts Manual</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/parts-manuals/fuel-trailer/pdf"
              className="inline-flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> View PDF
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-red-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
              Interactive Parts Catalog
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Fuel Trailer Parts</h1>
          <p className="mt-2 text-gray-400 max-w-xl text-sm sm:text-base">
            Browse {parts.length} genuine Mickala fuel trailer parts with diagrams, part numbers, and descriptions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search parts or part numbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 ${viewMode === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {filteredParts.length} of {parts.length} parts
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Sidebar */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="sticky top-20 space-y-1">
              <button
                onClick={() => { setActiveCategory(null); setExpandedCategory(null) }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !activeCategory
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
                }`}
              >
                All Parts
              </button>
              {categories
                .filter((c) => c.count > 0)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setExpandedCategory(cat.id)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
                    }`}
                  >
                    {cat.label}
                    <span className="ml-2 text-xs opacity-60">({cat.count})</span>
                  </button>
                ))}
            </div>
          </aside>

          {/* Parts Display */}
          <main className="flex-1 min-w-0">
            {activeCategory && activeCatLabel && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-semibold">{activeCatLabel}</span>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-xs text-red-600 hover:text-red-700 ml-1"
                >
                  Clear
                </button>
              </div>
            )}

            {filteredParts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No parts found matching your search.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredParts.map((part, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPart(i)}
                    className="group relative rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:border-red-500/30 transition-all duration-200 text-left"
                  >
                    <div className="relative aspect-square bg-muted/20 overflow-hidden">
                      <Image
                        src={part.image}
                        alt={part.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-2.5">
                      <p className="text-[10px] font-mono text-red-600 font-semibold truncate">{part.partNo}</p>
                      <p className="text-xs text-foreground leading-tight line-clamp-2 mt-0.5">{part.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredParts.map((part, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPart(i)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:shadow-sm hover:border-red-500/30 transition-all duration-200 text-left"
                  >
                    <div className="relative w-16 h-16 shrink-0 bg-muted/20 rounded-lg overflow-hidden">
                      <Image
                        src={part.image}
                        alt={part.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-red-600 font-semibold">{part.partNo}</p>
                      <p className="text-sm text-foreground truncate">{part.name}</p>
                      <p className="text-[11px] text-muted-foreground capitalize">{part.categoryLabel.toLowerCase()}</p>
                    </div>
                    {part.page && (
                      <span className="text-xs text-muted-foreground shrink-0">p.{part.page}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Lightbox / Detail View */}
      {selectedPart !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPart(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-background rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-square sm:aspect-[4/3] bg-muted/20">
              <Image
                src={filteredParts[selectedPart]?.image || ""}
                alt={filteredParts[selectedPart]?.name || ""}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Details */}
            <div className="p-5 border-t">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono text-red-600 font-semibold">
                    {filteredParts[selectedPart]?.partNo}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mt-0.5">
                    {filteredParts[selectedPart]?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize mt-1">
                    Category: {filteredParts[selectedPart]?.categoryLabel.toLowerCase()}
                  </p>
                  {filteredParts[selectedPart]?.page && (
                    <p className="text-sm text-muted-foreground">
                      Manual page: {filteredParts[selectedPart]?.page}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedPart(null)}
                  className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
