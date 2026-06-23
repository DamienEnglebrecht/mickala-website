"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"

const contactDetails = [
  {
    icon: Phone,
    label: "Call us",
    value: "1300 642 525",
    href: "tel:1300642525",
  },
  {
    icon: Mail,
    label: "Email",
    value: "management@mickalagroup.com.au",
    href: "mailto:management@mickalagroup.com.au",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "21 Caterpillar Drive, Paget, Mackay QLD 4740",
  },
  {
    icon: MapPin,
    label: "NSW Branch",
    value: "37 Thomas Mitchell Dr, Muswellbrook NSW 2333",
  },
]

export function ContactCta() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-px w-6 bg-primary" />
              Get In Touch
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
              Need More Information On Our Lighting Products?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Talk to our team about lighting towers, fuel trailers, custom
              fabrication or maintenance agreements. We&apos;ll get back to you
              fast.
            </p>

            <a
              href="tel:1300642525"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Phone className="h-5 w-5" />
              Call us today on 1300 642 525
            </a>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <detail.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">
                      {detail.href ? (
                        <a href={detail.href} className="hover:text-primary">
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            {submitted ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Send className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-bold uppercase tracking-tight text-foreground">
                  Thanks — message sent
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  One of our team will be in touch shortly. For urgent enquiries
                  call 1300 642 525.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-5"
              >
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">
                  Send us a message
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" autoComplete="name" required />
                  <Field label="Company" name="company" autoComplete="organization" />
                  <Field label="Email" name="email" type="email" autoComplete="email" required />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
                    placeholder="Tell us about your project or fleet requirements…"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Send enquiry
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )
}
