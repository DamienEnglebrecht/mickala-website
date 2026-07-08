import Link from "next/link"
import { Logo } from "./logo"

const productLinks = [
  { label: "Parts & Spares", href: "/parts" },
  { label: "Single Axle Towers", href: "#products" },
  { label: "Dual Axle Towers", href: "#products" },
  { label: "Sled Mount Towers", href: "#products" },
  { label: "Long Range Towers", href: "#products" },
  { label: "Fuel Trailers", href: "#other-products" },
  { label: "Custom Fabrication", href: "#other-products" },
]

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Why Mickala", href: "#about" },
  { label: "Support & Service", href: "#support" },
  { label: "Contact", href: "#contact" },
]

const hours = [
  ["Monday – Thursday", "8:00am – 4:30pm"],
  ["Friday", "8:00am – 1:00pm"],
  ["Saturday – Sunday", "Closed"],
  ["Public Holidays", "Closed"],
]

export function SiteFooter() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-white" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Australian-owned OEM manufacturer of extra-low-voltage LED lighting
              towers, fuel trailers and custom fabrication — proudly serving
              mining, construction and industry since 2007.
            </p>
            <div className="mt-6 space-y-1 text-sm text-white/70">
              <p>
                <span className="text-white/50">Head Office:</span> 21 Caterpillar
                Drive, Mackay QLD 4740
              </p>
              <p>
                <span className="text-white/50">NSW:</span> 37 Thomas Mitchell Dr,
                Muswellbrook NSW 2333
              </p>
              <p>
                <a href="tel:1300642525" className="hover:text-primary">
                  1300 642 525
                </a>
              </p>
              <p>
                <a
                  href="mailto:management@mickalagroup.com.au"
                  className="hover:text-primary"
                >
                  management@mickalagroup.com.au
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Opening Hours
            </h3>
            <dl className="mt-4 space-y-2.5">
              {hours.map(([day, time]) => (
                <div
                  key={day}
                  className="flex items-center justify-between border-b border-white/10 pb-2.5 text-sm"
                >
                  <dt className="text-white/70">{day}</dt>
                  <dd className="font-medium text-white">{time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-white/50">
              ISO 9001 Certified &middot; Registered Labour Hire Provider
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Mickala Group. All rights reserved.</p>
          <p>Low Voltage LED Lighting Towers</p>
        </div>
      </div>
    </footer>
  )
}
