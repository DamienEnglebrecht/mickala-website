const stats = [
  { value: "2007", label: "Australian-owned since" },
  { value: "1000+", label: "Towers manufactured" },
  { value: "200+", label: "Mine sites served" },
  { value: "100%", label: "Designed & built in-house" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-8 lg:px-8 lg:py-12">
            <div className="font-heading text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
