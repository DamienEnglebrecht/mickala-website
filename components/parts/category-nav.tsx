"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
}

export function CategoryNav({ categories, activeCategory }: { categories: Category[]; activeCategory?: string }) {
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
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/parts?category=${cat.slug}`}
          className={`flex items-center rounded-lg px-4 py-2.5 text-sm transition-colors ${
            activeCategory === cat.slug
              ? "bg-primary/10 text-primary font-semibold"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {cat.name}
        </Link>
      ))}

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
