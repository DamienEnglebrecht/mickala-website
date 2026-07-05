"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ArrowLeft, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCw, Download, FileText } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const manuals: { [key: string]: { title: string; totalPages: number; parts: { label: string; file: string }[] } } = {
  "fuel-trailer": {
    title: "Fuel Trailer Parts Manual",
    totalPages: 21,
    parts: [
      { label: "Part 1 (Pages 1-10)", file: "/parts-manuals/fuel-trailer-1.pdf" },
      { label: "Part 2 (Pages 11-21)", file: "/parts-manuals/fuel-trailer-2.pdf" },
    ],
  },
}

export default function PartsViewer() {
  const params = useParams()
  const slug = params.slug as string
  const manual = manuals[slug]
  const [currentPage, setCurrentPage] = useState(0)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setLoading(true)
    setRotation(0)
  }, [currentPage])

  const getPdfUrl = (pageIndex: number) => {
    if (pageIndex < 10) {
      return `/parts-manuals/fuel-trailer-1.pdf#page=${pageIndex + 1}`
    }
    return `/parts-manuals/fuel-trailer-2.pdf#page=${pageIndex - 9}`
  }

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(0, p - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(manual.totalPages - 1, p + 1))
  }, [manual?.totalPages])

  const handleDownload = useCallback(() => {
    const link = document.createElement("a")
    const url = currentPage < 10 ? "/parts-manuals/fuel-trailer-1.pdf" : "/parts-manuals/fuel-trailer-2.pdf"
    link.href = url
    link.download = `fuel-trailer-parts-manual-${currentPage < 10 ? "1" : "2"}.pdf`
    link.click()
  }, [currentPage])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    },
    [handlePrev, handleNext]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!manual) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Manual not found</p>
        <Link href="/" className="text-sm text-primary hover:underline">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/parts" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Parts
          </Link>
          <span className="text-sm font-medium text-foreground hidden sm:inline">{manual.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-2">
            Page {currentPage + 1} of {manual.totalPages}
          </span>
          <button
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="rounded-lg border border-border p-1.5 hover:bg-accent transition-colors"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono w-10 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="rounded-lg border border-border p-1.5 hover:bg-accent transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="rounded-lg border border-border p-1.5 hover:bg-accent transition-colors"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleDownload}
            className="rounded-lg border border-destructive/30 bg-destructive/10 p-1.5 hover:bg-destructive/20 transition-colors"
          >
            <Download className="h-4 w-4 text-destructive" />
          </button>
        </div>
      </div>

      {/* Main viewer */}
      <div className="flex-1 relative overflow-hidden bg-muted/30">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}
        <div
          className="w-full h-full flex items-start justify-center overflow-auto p-4 transition-all duration-200"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <iframe
            ref={iframeRef}
            src={getPdfUrl(currentPage)}
            className="border border-border rounded-lg shadow-lg bg-white transition-all"
            style={{
              width: `${zoom}%`,
              height: `${Math.min(zoom * 1.4, 95)}vh`,
              minHeight: "500px",
            }}
            onLoad={() => setLoading(false)}
            title={`${manual.title} - Page ${currentPage + 1}`}
          />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t bg-card px-4 py-3 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-30 hover:bg-accent transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: manual.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-7 h-7 text-xs rounded-md transition-colors ${
                i === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === manual.totalPages - 1}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-30 hover:bg-accent transition-colors"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
