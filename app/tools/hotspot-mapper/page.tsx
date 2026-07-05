"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"

export default function HotspotMapper() {
  const [currentPage, setCurrentPage] = useState(0)
  const [hotspots, setHotspots] = useState<{ page: number; x: number; y: number; partNo: string }[]>([])
  const [partNo, setPartNo] = useState("")
  const [isPlacing, setIsPlacing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const totalPages = 21

  const getPdfUrl = (page: number) => {
    if (page < 10) return `/parts-manuals/fuel-trailer-1.pdf#page=${page + 1}`
    return `/parts-manuals/fuel-trailer-2.pdf#page=${page - 9}`
  }

  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!partNo.trim() || !isPlacing) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setHotspots(prev => [...prev, {
      page: currentPage,
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      partNo: partNo.trim(),
    }])
    setPartNo("")
    setIsPlacing(false)
  }, [currentPage, partNo, isPlacing])

  const deleteHotspot = useCallback((index: number) => {
    setHotspots(prev => prev.filter((_, i) => i !== index))
  }, [])

  const removeLastOnPage = useCallback(() => {
    const pageIndices = hotspots
      .map((h, i) => (h.page === currentPage ? i : -1))
      .filter(i => i !== -1)
    if (pageIndices.length > 0) {
      setHotspots(prev => prev.filter((_, i) => i !== pageIndices[pageIndices.length - 1]))
    }
  }, [hotspots, currentPage])

  const exportJSON = useCallback(() => {
    const data = JSON.stringify(hotspots, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "fuel-trailer-hotspots.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [hotspots])

  const pageHotspots = hotspots.filter(h => h.page === currentPage)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b bg-card px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/parts-manuals/fuel-trailer" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
          <span className="text-sm font-medium">🎯 Click to place hotspots on the actual PDF</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main PDF area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page nav */}
          <div className="bg-muted/50 px-4 py-2 flex items-center justify-between border-b shrink-0">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
                className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-accent">← Prev</button>
              <span className="text-sm font-medium">Page {currentPage + 1} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1}
                className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-accent">Next →</button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{hotspots.length} hotspots total</span>
              <button onClick={removeLastOnPage} disabled={pageHotspots.length === 0}
                className="text-xs text-destructive hover:underline disabled:opacity-30">Undo last</button>
              <button onClick={exportJSON} disabled={hotspots.length === 0}
                className="bg-primary text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-primary/90 disabled:opacity-30">
                📥 Export JSON
              </button>
            </div>
          </div>

          {/* PDF + hotspots overlay */}
          <div className="flex-1 overflow-auto bg-muted/30 p-4">
            <div
              ref={containerRef}
              onClick={handleContainerClick}
              className={`relative mx-auto ${isPlacing ? "cursor-crosshair" : "cursor-default"}`}
              style={{ maxWidth: "900px" }}
            >
              <iframe
                key={currentPage}
                src={getPdfUrl(currentPage)}
                className="w-full border rounded-lg shadow-lg bg-white pointer-events-none"
                style={{ height: "80vh", minHeight: "500px" }}
                title={`Page ${currentPage + 1}`}
              />
              {/* Hotspot markers overlay */}
              {pageHotspots.map((h, i) => (
                <div
                  key={i}
                  onClick={(e) => { e.stopPropagation(); deleteHotspot(i) }}
                  className="absolute w-8 h-8 rounded-full bg-primary/80 text-white flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-destructive hover:scale-110 transition-all shadow-lg border-2 border-white"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
                  title={`${h.partNo} — click to remove`}
                >
                  {h.partNo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-72 border-l bg-card p-4 overflow-auto shrink-0">
          <h3 className="text-sm font-bold mb-3">Place Hotspot</h3>
          <div className="space-y-2 mb-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Part Number</label>
              <input type="text" placeholder="e.g. 1001" value={partNo} onChange={e => setPartNo(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm" autoFocus />
            </div>
            <button
              onClick={() => setIsPlacing(true)}
              disabled={!partNo.trim()}
              className={`w-full rounded px-3 py-2 text-sm font-semibold text-white transition-colors ${
                isPlacing ? "bg-green-600 animate-pulse" : "bg-primary hover:bg-primary/90"
              } disabled:opacity-30`}
            >
              {isPlacing ? "🖱️ Click on the PDF now" : "✏️ Place Hotspot"}
            </button>
            {isPlacing && (
              <p className="text-xs text-green-700 bg-green-50 rounded p-2">
                Click on the PDF where part <strong>{partNo}</strong> appears, then repeat for the next number.
              </p>
            )}
          </div>

          <hr className="my-4" />
          <h3 className="text-sm font-bold mb-2">Page {currentPage + 1} ({pageHotspots.length})</h3>
          <div className="space-y-1 text-xs max-h-60 overflow-auto">
            {pageHotspots.map((h, i) => (
              <div key={i} className="flex justify-between items-center bg-muted rounded px-2 py-1">
                <span className="font-mono">#{h.partNo}</span>
                <button onClick={() => deleteHotspot(i)} className="text-destructive hover:text-destructive/80 ml-2">✕</button>
              </div>
            ))}
            {pageHotspots.length === 0 && <p className="text-muted-foreground italic">No hotspots on this page</p>}
          </div>

          <hr className="my-4" />
          <p className="text-xs text-muted-foreground">
            <strong>How it works:</strong><br />
            1. Enter a part number<br />
            2. Click <strong>"Place Hotspot"</strong><br />
            3. Click on the PDF where that number sits<br />
            4. Repeat for every number on every page<br />
            5. Export JSON when done
          </p>
        </div>
      </div>
    </div>
  )
}
