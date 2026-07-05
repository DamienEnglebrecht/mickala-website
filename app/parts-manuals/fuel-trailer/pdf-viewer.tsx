"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface PartInfo {
  name: string
  category: string
}

interface Hotspot {
  partNo: string
  page: number
  x: number
  y: number
}

interface PdfViewerProps {
  pdfFile: string
  pdfPageNum: number
  currentPage: number
  zoom: number
  partsInfo: Record<string, PartInfo>
}

export default function PdfViewer({ pdfFile, pdfPageNum, currentPage, zoom, partsInfo }: PdfViewerProps) {
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [selectedPart, setSelectedPart] = useState<{ partNo: string } | null>(null)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  // Load hotspots from JSON on mount
  useEffect(() => {
    fetch("/fuel-trailer-hotspots.json")
      .then((res) => res.json())
      .then((data) => setHotspots(data))
      .catch(() => {})
  }, [])

  // Reset selection and loading on page change
  useEffect(() => {
    setSelectedPart(null)
    setSelectedHotspot(null)
    setLoading(true)
  }, [currentPage])

  const currentHotspots = hotspots.filter((h) => h.page === currentPage + 1)

  const handleHotspotClick = useCallback(
    (h: Hotspot) => {
      setSelectedHotspot(h)
      const info = partsInfo[h.partNo]
      if (info) {
        setSelectedPart({ partNo: h.partNo, ...info })
      } else {
        setSelectedPart({ partNo: h.partNo })
      }
    },
    [partsInfo]
  )

  const closePopup = useCallback(() => {
    setSelectedPart(null)
    setSelectedHotspot(null)
  }, [])

  return (
    <div ref={containerRef} className="relative" style={{ width: `${zoom}%`, margin: "0 auto", maxWidth: "1200px" }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-20" style={{ minHeight: "600px" }}>
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      )}
      <div className="relative">
        {/* Render hotspots only after PDF loads */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {currentHotspots.map((h, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleHotspotClick(h)
              }}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                left: `${h.x}%`,
                top: `${h.y}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto",
                zIndex: 15,
                cursor: "pointer",
              }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-destructive text-destructive-foreground text-[11px] font-bold shadow-lg border-2 border-white hover:scale-125 transition-transform"
              title={`Part ${h.partNo}`}
            >
              {h.partNo}
            </button>
          ))}
        </div>
        <iframe
          ref={iframeRef}
          src={`${pdfFile}#page=${pdfPageNum}&toolbar=0&navpanes=0&scrollbar=0&zoom=${Math.round(zoom * 1.2)}`}
          className="border-0"
          style={{
            width: "100%",
            height: "90vh",
            minHeight: "700px",
          }}
          onLoad={() => setLoading(false)}
          title={`Fuel Trailer Parts Manual - Page ${currentPage + 1}`}
        />
      </div>

      {/* Selected Part Popup */}
      {selectedPart && selectedHotspot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={closePopup}
        >
          <div
            className="bg-card rounded-xl border shadow-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">Part {selectedPart.partNo}</h3>
              <button onClick={closePopup} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>
            {partsInfo[selectedHotspot.partNo] && (
              <>
                <p className="text-sm font-medium mb-1">{partsInfo[selectedHotspot.partNo].name}</p>
                <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {partsInfo[selectedHotspot.partNo].category}
                </span>
              </>
            )}
            <div className="mt-4 flex gap-2">
              <a
                href={`/parts?search=${selectedHotspot.partNo}`}
                className="flex-1 text-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Order Part
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
