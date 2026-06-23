const clients = ["Bloomfield Group", "Bengalla", "Stanmore Resources"]
const accreditations = ["ISO 9001 Certified", "Registered Labour Hire Provider"]

export function Clients() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by some of our valued clients
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((client) => (
            <span
              key={client}
              className="font-heading text-xl font-bold uppercase tracking-tight text-foreground/40 transition-colors hover:text-foreground/70 sm:text-2xl"
            >
              {client}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-4 border-t border-border pt-8">
          {accreditations.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
