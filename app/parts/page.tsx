import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PartsGrid } from "@/components/parts/parts-grid"
import { CategoryNav } from "@/components/parts/category-nav"

export default async function PartsPage(props: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await props.searchParams
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabaseAny: any = supabase

  const { data: categories } = await supabaseAny.from("parts_categories").select("*").order("sort_order")

  let parts = null
  if (category) {
    const { data: cat } = await supabaseAny.from("parts_categories").select("id").eq("slug", category).single()
    if (cat) {
      const { data: filteredParts } = await supabaseAny
        .from("parts")
        .select("*, parts_categories(name, slug)")
        .eq("category_id", cat.id)
        .eq("is_available", true)
        .order("name")
      parts = filteredParts
    }
  } else {
    const { data: allParts } = await supabaseAny
      .from("parts")
      .select("*, parts_categories(name, slug)")
      .eq("is_available", true)
      .order("name")
    parts = allParts
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-neutral-950 pt-16 lg:pt-20">
        <div className="bg-neutral-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-white">
            Parts &amp; Spares
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
              Genuine Mickala replacement parts and accessories for your lighting tower fleet.
              Maintain uptime with OEM-quality components.
            </p>
          </div>
        </div>

        <div className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="w-full shrink-0 lg:w-64">
              <CategoryNav categories={categories ?? []} activeCategory={category} />
            </aside>
            <main className="flex-1">
              <PartsGrid parts={parts ?? []} />
            </main>
          </div>
        </div>
      </div>
    </main>
      <SiteFooter />
    </>
  )
}
