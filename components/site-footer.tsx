import Link from "next/link"

const productLinks = [
  { label: "Parts & Spares", href: "/parts" },
  { label: "Single Axle Towers", href: "/lighting-towers/single-axle" },
  { label: "Dual Axle Towers", href: "/lighting-towers/dual-axle" },
  { label: "Sled Mount Towers", href: "/lighting-towers/sled-mount" },
  { label: "Long Range Towers", href: "/lighting-towers/long-range" },
  { label: "Fuel Trailers", href: "/fuel-trailers" },
  { label: "Custom Fabrication", href: "/custom-fabrication" },
]

const companyLinks = [
  { label: "About Us", href: "/our-story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact-us" },
  { label: "Quote Request", href: "/quote" },
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
            <p className="text-lg font-bold tracking-tight">Mickala Group</p>
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
                <a href="tel:1300642525" className="hover:text-[#DC2626] transition-colors">
                  1300 642 525
                </a>
              </p>
              <p>
                <a
                  href="mailto:management@mickalagroup.com.au"
                  className="hover:text-[#DC2626] transition-colors"
                >
                  management@mickalagroup.com.au
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/mickala-group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#DC2626] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@MickalaGroup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#DC2626] transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/mickalagroup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#DC2626] transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[#DC2626]"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[#DC2626]"
                  >
                    {link.label}
                  </Link>
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
            <div className="mt-6 space-y-1 text-xs text-white/50">
              <p>ABN 92 180 218 353</p>
              <p>ISO 9001 Certified &middot; Registered Labour Hire Provider</p>
            </div>
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
