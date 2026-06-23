import { Clock, Wrench, BadgeCheck } from "lucide-react"
import { SectionHeading } from "./section-heading"

const pillars = [
  {
    icon: Clock,
    title: "Support",
    headline: "24 / 7 / 365",
    description:
      "Our global support network is ready around the clock to keep your lighting tower fleet running. Expert advice over the phone, any time, any day.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    headline: "Up to 70% savings",
    description:
      "Our service programs have removed an estimated AUD $250M from customers' bottom lines while significantly cutting our global carbon footprint.",
  },
  {
    icon: BadgeCheck,
    title: "Warranty",
    headline: "3-year / 60,000 hrs",
    description:
      "Every LED is covered by our 3-year warranty and rated for up to 60,000 hours. Cover extends further when our factory staff maintain your assets.",
  },
]

export function Support() {
  return (
    <section id="support" className="relative bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Support That Never Sleeps"
          title="Backed For The Long Haul"
          description="When you run Mickala assets, you get a partner committed to uptime — from the first deployment through years of reliable service."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-neutral-950 p-8 lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <pillar.icon className="h-6 w-6" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/50">
                {pillar.title}
              </p>
              <p className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-white">
                {pillar.headline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
