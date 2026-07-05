import Image from "next/image"

const clients = [
  { name: "Anglo American", image: "/anglo.webp" },
  { name: "Bengalla", image: "/bengalla.webp" },
  { name: "BHP", image: "/bhp.webp" },
  { name: "Bloomfield Group", image: "/bloomfield.png" },
  { name: "EPSA", image: "/eps.webp" },
  { name: "Glencore", image: "/glencore.webp" },
  { name: "Golding", image: "/golding.webp" },
  { name: "Stanmore Resources", image: "/stanmore_logo.png" },
  { name: "Terracom", image: "/terracom.webp" },
  { name: "Whitehaven", image: "/whitehaven.webp" },
  { name: "Yancoal", image: "/yancoal.webp" },
]

const accreditations = ["ISO 9001 Certified", "Registered Labour Hire Provider"]

export function Clients() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by some of our valued clients
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex h-20 w-44 items-center justify-center rounded-lg border border-border bg-card px-6">
                {client.image && (
                  <Image
                    src={client.image}
                    alt={`${client.name} logo`}
                    width={140}
                    height={60}
                    className="max-h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-4 border-t border-border pt-8">
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