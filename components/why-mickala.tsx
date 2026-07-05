import { Handshake, ShieldCheck, TrendingUp, Wrench, Gauge, Clock } from "lucide-react"
import { SectionHeading } from "./section-heading"

const values = [
  {
    icon: ShieldCheck,
    title: "Exceptional Service",
    description:
      "Skilled, professional people from diverse backgrounds, committed to delivering exceptional service on every job. That's our guarantee.",
  },
  {
    icon: Handshake,
    title: "Long-Term Relationships",
    description:
      "Since 2007 we've built lasting partnerships founded on honesty and integrity in everything we do.",
  },
  {
    icon: TrendingUp,
    title: "Adapt To Market",
    description:
      "Our strength is adapting to an ever-changing market and partnering with clients so both parties achieve their goals.",
  },
]

const badges = [
  { label: "MDG15 Compliant", icon: ShieldCheck },
  { label: "ELV Safety Rated", icon: Gauge },
  { label: "Australian Made", icon: Wrench },
  { label: "24/7 Support", icon: Clock },
]

export function WhyMickala() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Mickala"
          title="Built For Mining. Proven On Site."
          description="A privately owned group of companies delivering innovative LED lighting solutions to Australia's leading mining and industrial operations."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              <badge.icon className="h-3.5 w-3.5" />
              {badge.label}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-background p-8 transition-colors hover:border-primary/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <value.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-heading text-xl font-bold uppercase tracking-tight text-foreground">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
