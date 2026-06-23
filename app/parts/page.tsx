import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { PartsGrid } from "@/components/parts/parts-grid"
import { CategoryNav } from "@/components/parts/category-nav"

export default async function PartsPage() {
  const supabase = createClient()

  const [{ data: categories }, { data: parts }] = await Promise.all([
    supabase.from("parts_categories").select("*").order("sort_order"),
    supabase.from("parts").select("*, parts_categories(name, slug)").eq("is_available", true).order("name"),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-foreground">
            Parts &amp; Spares
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Genuine Mickala replacement parts and accessories for your lighting tower fleet.
            Maintain uptime with OEM-quality components.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <CategoryNav categories={categories ?? []} />
          </aside>
          <main className="flex-1">
            <PartsGrid parts={parts ?? []} />
          </main>
        </div>
      </div>
    </div>
  )
}
