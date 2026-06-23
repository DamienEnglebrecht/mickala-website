import Image from "next/image"
import { SectionHeading } from "./section-heading"

const highlights = [
  "Largest privately owned LED lighting tower OEM",
  "Headquartered in QLD with a second site in NSW",
  "Factory-trained technicians inspect every tower",
]

export function About() {
  return (
    <section id="about" className="bg-card py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl lg:order-first">
          <Image
            src="/hero-fleet.webp"
            alt="A fleet of Mickala LED lighting towers outside the manufacturing facility"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="The Future Of Illumination"
            title="Shining A Light On Australian Innovation"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Founded in 2007 by Damien Englebrecht, Mickala has grown into a
              proud Australian-owned leader in the design and supply of OEM LED
              lighting towers — supporting mining, construction and industrial
              operations across the country and beyond.
            </p>
            <p>
              After five years searching for the perfect lighting tower, we
              decided to build our own. Today we develop{" "}
              <span className="font-semibold text-foreground">
                100% of our assets internally
              </span>
              , letting us control our IP and, most importantly, our quality.
            </p>
            <p>
              Our philosophy of &ldquo;innovation through continuous
              improvement&rdquo; delivers a purpose-built LED lighting tower that
              reduces costs and has zero impact on site production once mobilised.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
