"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, FileText, ChevronDown, ChevronRight } from "lucide-react"

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
}

const subcategories: Record<string, { name: string; slug: string }[]> = {
  "Other Parts": [
    { name: "Fuel Tanks", slug: "fuel-tanks" },
  ],
}

export function CategoryNav({ categories, activeCategory }: { categories: Category[]; activeCategory?: string }) {
  const [expandedParents, setExpandedParents] = useState<Set<string>>(() => {
    // Auto-expand parent if a child is active
    const set = new Set<string>()
    for (const [parent, subs] of Object.entries(subcategories)) {
      if (subs.some((s) => s.slug === activeCategory)) {
        set.add(parent)
      }
    }
    return set
  })

  const toggleParent = (name: string) => {
    setExpandedParents((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <nav className="space-y-1">
      <Link
        href="/parts"
        className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
          !activeCategory
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
      >
        All Parts
      </Link>
      {categories.map((cat) => {
        const subs = subcategories[cat.name]
        const isExpanded = expandedParents.has(cat.name)
        const isActive = activeCategory === cat.slug

        if (subs) {
          // Parent category with sub-items (dropdown)
          const childActive = subs.some((s) => s.slug === activeCategory)
          return (
            <div key={cat.id}>
              <button
                onClick={() => toggleParent(cat.name)}
                className={`w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors ${
                  isActive || childActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{cat.name}</span>
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                )}
              </button>
              {isExpanded && (
                <div className="ml-3 mt-1 space-y-1 border-l-2 border-border pl-3">
                  {subs.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/parts?category=${sub.slug}`}
                      className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                        activeCategory === sub.slug
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }

        // Regular category link
        return (
          <Link
            key={cat.id}
            href={`/parts?category=${cat.slug}`}
            className={`flex items-center rounded-lg px-4 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {cat.name}
          </Link>
        )
      })}

      <Link
        href="/parts-manuals/fuel-trailer"
        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-colors ${
          activeCategory === "fuel-trailers"
            ? "bg-primary/10 text-primary font-semibold"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
      >
        <FileText className="h-4 w-4" />
        Fuel Trailers
      </Link>

      <div className="pt-6">
        <Link
          href="/cart"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <ShoppingCart className="h-4 w-4" />
          View Cart
        </Link>
      </div>
    </nav>
  )
}
