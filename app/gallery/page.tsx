"use client"

import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"

const images = Array.from({ length: 70 }, (_, i) => ({
  id: i + 1,
  src: `/site-images/mickala-${i + 1}.jpg`,
}))

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="bg-black text-white">
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section id="gallery" className="relative h-screen min-h-[600px]">
        <Image src="/site-images/mickala-1.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-[1200px] mx-auto px-6 pb-20 sm:pb-28">
          <p className="text-xs text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Image Library
          </p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-4">
            Gallery
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-lg">
            Explore our full collection — products, projects and site installations.
          </p>
        </div>
      </section>

      {/* ===== STAT STRIP ===== */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { label: "Total Photos", value: `${images.length}` },
              { label: "Collection", value: "Full Library" },
              { label: "Format", value: "High Resolution" },
              { label: "Updated", value: "Current" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 sm:py-10 px-6 text-center">
                <p className="text-[11px] text-white/40 font-medium tracking-[0.08em] uppercase whitespace-nowrap">{stat.label}</p>
                <p className="text-sm sm:text-base font-semibold whitespace-nowrap">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMAGE GRID ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelected(img.id)}
                className="relative aspect-[4/3] overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={`Mickala image ${img.id}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`/site-images/mickala-${selected}.jpg`}
              alt={`Mickala image ${selected}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute bottom-6 text-white/50 text-[11px] tracking-wide uppercase">
            {selected} / {images.length}
          </div>
        </div>
      )}

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-4">
            Explore more
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            Back to homepage
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
            View our full range of products, capabilities, and services.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-sm font-semibold rounded-full"
            >
              Home →</Link>
            <a href="tel:1300642525" className="text-sm text-white/70 hover:text-white transition-colors">
              1300 642 525
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
