"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ArrowLeft, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download } from "lucide-react"
import Link from "next/link"

const TOTAL_PAGES = 21

export default function FuelTrailerPartsManual() {
  const [currentPage, setCurrentPage] = useState(0)
  const [zoom, setZoom] = useState(100)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Force vertical scroll on the iframe once it loads
    const checkLoaded = setInterval(() => {
      if (iframeRef.current?.contentDocument) {
        try {
          const style = iframeRef.current.contentDocument.createElement('style')
          style.innerHTML = `
            html, body { 
              overflow: auto !important; 
              overflow-x: hidden !important; 
              width: 100%; 
              height: auto !important; 
              transform: rotate(90deg);
              transform-origin: center center;
              margin: 0; padding: 0;
            }
          `
          iframeRef.current.contentDocument.head.appendChild(style)
          clearInterval(checkLoaded)
        } catch(e) {}
      }
    }, 100)
    return () => clearInterval(checkLoaded)
  }, [currentPage])

  const getPdfUrl = (pageIndex: number) => {
    if (pageIndex < 10) return `/parts-manuals/fuel-trailer-1.pdf#page=${pageIndex + 1}&view=FitH`
    return `/parts-manuals/fuel-trailer-2.pdf#page=${pageIndex - 9}&view=FitH`
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
          </Link>
          <span className="text-sm font-medium text-foreground hidden sm:inline">Fuel Trailer Parts Manual</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-2">Page {currentPage + 1} of {TOTAL_PAGES}</span>
          <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="rounded-lg border border-border p-1.5 hover:bg-accent"><ZoomOut className="h-4 w-4" /></button>
          <span className="text-xs font-mono w-10 text-center">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="rounded-lg border border-border p-1.5 hover:bg-accent"><ZoomIn className="h-4 w-4" /></button>
          <a href={getPdfUrl(currentPage)} download className="rounded-lg border border-destructive/30 bg-destructive/10 p-1.5 hover:bg-destructive/20"><Download className="h-4 w-4 text-destructive" /></a>
        </div>
      </div>

      {/* PDF viewer - full screen with scroller */}
      <div className="flex-1 bg-muted/30 overflow-auto">
        <div className="w-full h-full flex items-center justify-center p-4" 
             style={{ minHeight: '85vh' }}>
          <iframe
            ref={iframeRef}
            src={getPdfUrl(currentPage)}
            className="border-0 shadow-lg"
            style={{
              width: `${zoom}%`,
              height: `${Math.max(zoom * 1.3, 700)}px`,
              maxWidth: '95%',
            }}
            title={`Fuel Trailer Parts Manual - Page ${currentPage + 1}`}
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t bg-card px-4 py-3 flex items-center justify-between">
        <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-30 hover:bg-accent">
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <div className="flex items-center gap-1 overflow-x-auto max-w-[60%]">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i)}
              className={`w-7 h-7 text-xs rounded-md shrink-0 ${i === currentPage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>
              {i + 1}
            </button>
          ))}
        </div>
        <button onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES - 1, p + 1))} disabled={currentPage === TOTAL_PAGES - 1}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-30 hover:bg-accent">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
