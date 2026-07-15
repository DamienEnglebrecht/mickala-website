"use client"

import { useState } from "react"
import Image from "next/image"
import { Download, X } from "lucide-react"

type ModelType = {
  name: string
  led: string
  desc: string
  image: string
  slug: string
  priceFrom?: string
  specSheet?: string
  lightSim?: string
}

export function ModelCards({ models }: { models: ModelType[] }) {
  const [selected, setSelected] = useState<ModelType | null>(null)

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3">
        {models.map((m) => (
          <button
            key={m.name}
            onClick={() => setSelected(m)}
            className="group relative aspect-[4/3] overflow-hidden bg-black border border-white/[0.06] hover:border-white/[0.15] transition-colors text-left w-full"
          >
            <Image src={m.image} alt="" fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
              <p className="text-sm font-semibold mb-1">{m.name}</p>
              <p className="text-xs text-white/50">{m.desc}</p>
              {m.priceFrom && <p className="text-[11px] text-[#DC2626] mt-1">From {m.priceFrom}</p>}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-lg w-full bg-[#0A0A0A] border border-white/[0.06] rounded-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative aspect-[4/3] bg-black">
              <Image src={selected.image} alt="" fill className="object-contain p-6" />
            </div>

            {/* Info */}
            <div className="p-6">
              <p className="text-lg font-bold mb-1">{selected.name}</p>
              <p className="text-sm text-white/50 mb-2">{selected.desc}</p>
              {selected.priceFrom && <p className="text-[11px] text-[#DC2626] mb-4">Purchase from {selected.priceFrom} · Hire available</p>}

              <div className="flex items-center gap-3">
                {selected.specSheet && (
                  <a
                    href={selected.specSheet}
                    download
                    className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-full"
                  >
                    <Download className="h-3.5 w-3.5" /> Spec Sheet
                  </a>
                )}
                {selected.lightSim && (
                  <a
                    href={selected.lightSim}
                    download
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-full"
                  >
                    <Download className="h-3.5 w-3.5" /> Light Sim
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
