import { Handshake, ShieldCheck, TrendingUp } from "lucide-react"
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

export function WhyMickala() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Mickala"
          title="Your Powerful Solution"
          description="A privately owned group of companies delivering innovative solutions to Australia's leading businesses across multiple sectors and countries."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
