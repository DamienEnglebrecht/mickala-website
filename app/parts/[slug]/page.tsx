import { notFound } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AddToCartButton } from "@/components/parts/add-to-cart-button"

export default async function PartPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: part } = await supabase
    .from("parts")
    .select("*, parts_categories(name, slug)")
    .eq("slug", slug)
    .single()

  if (!part) notFound()

  const specs = part.specs as Record<string, string> | null
  const categoryName = (part.parts_categories as { name: string; slug: string } | null)?.name

  return (
    <div className="min-h-screen bg-neutral-950">
      <SiteHeader />
      <div className="pt-16 lg:pt-20">
        <div className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/parts" className="hover:text-foreground">Parts</a>
            <span>/</span>
            {categoryName && (
              <>
                <a href={`/parts?category=${slug}`} className="hover:text-foreground">{categoryName}</a>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{part.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <Image
                src={part.image_url || "/placeholder.svg"}
                alt={part.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{part.sku}</p>
              <h1 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-foreground">
                {part.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {part.description}
              </p>

              {/* Price */}
              <div className="mt-6 border-y border-border py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-bold text-foreground">
                    ${part.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">per {part.unit}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Min. order: {part.min_order_qty} {part.unit}
                  {part.min_order_qty > 1 ? "s" : ""}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-4 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${
                  part.stock_quantity > 10 ? "bg-emerald-500" :
                  part.stock_quantity > 0 ? "bg-amber-500" : "bg-red-500"
                }`} />
                <span className="text-sm text-muted-foreground">
                  {part.stock_quantity > 10
                    ? "In stock"
                    : part.stock_quantity > 0
                      ? "Only ${part.stock_quantity} left"
                      : "Out of stock"}
                </span>
              </div>

              <AddToCartButton part={part} />

              {/* Compatible with */}
              {part.compatible_with && part.compatible_with.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground">Compatible With</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {part.compatible_with.map((model: string) => (
                      <span
                        key={model}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {specs && Object.keys(specs).length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground">Specifications</h3>
                  <dl className="mt-2 divide-y divide-border rounded-lg border border-border">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between px-4 py-2.5">
                        <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {key.replace(/_/g, " ")}
                        </dt>
                        <dd className="text-xs font-semibold text-foreground">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <SiteFooter />
  </div>
  )
}
