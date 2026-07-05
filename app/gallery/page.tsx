"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { useState, useEffect } from "react"

const images = Array.from({ length: 70 }, (_, i) => ({
  id: i + 1,
  src: `/site-images/mickala-${i + 1}.jpg`,
}))

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [validImages, setValidImages] = useState<typeof images>([])

  useEffect(() => {
    // Check which images actually load
    const checkImages = async () => {
      const valid: typeof images = []
      for (const img of images) {
        try {
          const res = await fetch(img.src, { method: "HEAD" })
          if (res.ok) valid.push(img)
        } catch {}
        if (valid.length >= 70) break
      }
      setValidImages(valid.length > 0 ? valid : images)
    }
    checkImages()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Link>
          <h1 className="text-lg font-bold">Mickala Image Library</h1>
          <span className="text-xs text-muted-foreground">{validImages.length || "..."} images</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {(validImages.length > 0 ? validImages : images).map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img.id)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border hover:border-primary transition-colors group"
            >
              <Image
                src={img.src}
                alt={`Mickala image ${img.id}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full" onClick={e => e.stopPropagation()}>
            <Image
              src={`/site-images/mickala-${selected}.jpg`}
              alt={`Mickala image ${selected}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {selected} / {validImages.length || 70}
          </div>
        </div>
      )}
    </div>
  )
}
