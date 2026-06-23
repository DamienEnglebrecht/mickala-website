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

export function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <nav className="space-y-1">
      <Link
        href="/parts"
        className="flex items-center rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary"
      >
        All Parts
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/parts?category=${cat.slug}`}
          className="flex items-center rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
