import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Users, Factory, Lightbulb, HeadphonesIcon } from "lucide-react"

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* 18 Years Strong */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">18 Years Strong</h2>
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-6">
                  Mickala&apos;s Ongoing Dedication to Local Success
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Mickala would like to sincerely thank all of our clients, as well as our past and present employees,
                    for their incredible support over the past 18 years. We wouldn&apos;t be where we are today without you.
                  </p>
                  <p>
                    At Mickala, we believe in the power of strong partnerships and long-term relationships. Our philosophy
                    has always centred around building close alliances with our clients, and it&apos;s these connections that
                    have driven our success.
                  </p>
                  <p>
                    At the heart of our philosophy is a deep understanding that long-term sustainability as a leading
                    service contractor relies on consistent performance, uncompromising quality, and dependable reliability
                    — all driven by a culturally strong and united team. At Mickala, we believe our people are our
                    greatest asset, and our clients are a valued gift — offering the opportunity for shared success.
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-2xl border overflow-hidden min-h-[300px]">
                <Image
                  src="/18-years-strong.webp"
                  alt="Mickala Group Dual Axle Lighting Towers group of 6"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">320+</div>
              <div className="text-sm text-primary-foreground/80 mt-1">Employees Globally</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">1,500+</div>
              <div className="text-sm text-primary-foreground/80 mt-1">Units Manufactured</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">100%</div>
              <div className="text-sm text-primary-foreground/80 mt-1">In-House Design</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">18</div>
              <div className="text-sm text-primary-foreground/80 mt-1">Years of Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Narrative */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-card rounded-2xl border overflow-hidden min-h-[300px]">
                  <Image
                    src="/our-story-photo.webp"
                    alt="Mickala Sled Mounted Lighting Tower"
                    width={500}
                    height={700}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Every business begins with a spark</strong> — an idea, a challenge,
                    or a need waiting to be met. Ours was no different.
                  </p>
                  <p>
                    Founded on the belief that quality and integrity go hand in hand, Mickala started with a simple goal:
                    to create something meaningful, lasting, and truly valuable for our customers.
                  </p>
                  <p>
                    From our humble beginnings in a single office with a big vision, we&apos;ve grown into a team of
                    passionate professionals, committed to excellence in everything we do. Along the way, we&apos;ve built
                    strong relationships with our clients, partners, and communities, always guided by the same principles
                    that sparked our journey.
                  </p>
                  <p>
                    Today, we&apos;re proud of how far we&apos;ve come — but we&apos;re even more excited about where we&apos;re going.
                    Our story is still being written, and we&apos;re glad you&apos;re a part of it.
                  </p>
                  <p>
                    In 2011, Mickala expanded into LED lighting towers. After five years of searching for the ideal
                    solution, we made the decision to design and manufacture our own. Since then, we&apos;ve perfected the art
                    of lighting tower solutions.
                  </p>
                  <p>
                    With full in-house design and manufacturing capabilities, Mickala delivers reliable, high-performance
                    lighting towers that provide real value across all industries.
                  </p>
                  <p>
                    Mickala&apos;s commitment to &ldquo;Innovation through continuous improvement&rdquo; has led to the
                    development of an industry-specific LED lighting tower designed to reduce operational costs through our
                    proven model. Each unit is thoroughly inspected by our factory-trained technicians, ensuring seamless
                    integration and zero disruption to site productivity upon mobilisation.
                  </p>
                  <div className="bg-card border rounded-xl p-6 mt-6">
                    <h3 className="text-xl font-bold mb-3">The Mickala Group Today</h3>
                    <p className="mb-3">
                      <strong>As a group, Mickala now employs over 320 people globally.</strong> We are proud to be the
                      largest privately owned OEM of LED lighting towers, having manufactured over 1,500 units to date.
                    </p>
                    <p className="mb-3">
                      At Mickala, we design and develop <strong>100% of our assets in-house.</strong> This end-to-end
                      control ensures we maintain ownership of our intellectual property and, most importantly, uphold the
                      highest standards of quality across every product we deliver.
                    </p>
                    <p>
                      As we look ahead, we&apos;re excited about what the next 18 years hold for the Mickala Group, our
                      dedicated team, and our valued clients around the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-medium italic text-foreground leading-relaxed">
              &ldquo;We thrive in dynamic markets by staying adaptable and building strong partnerships with our clients,
              ensuring mutual success through shared goals.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Since 2007 */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Since 2007</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
              Since 2007, we have built long-standing relationships founded on honesty, integrity, and trust
              in everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Support & Maintenance */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <HeadphonesIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">Support 24/7/365</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Our global support network is always ready to assist you — 24 hours a day, 7 days a week, 365 days a
                  year. Whether you need technical advice or troubleshooting help, we&apos;re just a phone call away to keep
                  your lighting tower fleet running smoothly.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Factory className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">Maintenance</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Our Mickala Service Programs can help reduce operational expenditure by up to 70%. We&apos;ve already
                  saved our customers an estimated AUD $250 million — while also making a significant impact on reducing
                  the global carbon footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Want to know more about our lighting solutions?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Contact our team today for spec sheets, technical support, or a quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-8 py-3.5 font-semibold hover:bg-white/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
