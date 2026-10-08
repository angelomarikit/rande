import { navLinks, siteConfig } from '@/data/site'
import { destinations } from '@/data/destinations'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ocean-navy text-warm-white">
      <div className="section-pad mx-auto grid max-w-7xl gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <div className="inline-block">
            <img
              src="/images/logo-rande.png"
              alt={`${siteConfig.companyName} logo`}
              className="h-14 w-auto object-contain brightness-110"
              width={180}
              height={56}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
          <p className="mt-3 text-sm text-sunshine-gold">Since {siteConfig.sinceYear}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
            Explore
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/70 transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
            Destinations
          </h3>
          <ul className="mt-4 space-y-2">
            {destinations.slice(0, 6).map((d) => (
              <li key={d.id}>
                <a
                  href="#destinations"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {d.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {siteConfig.phoneDisplay ? (
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
            ) : null}
            {siteConfig.email ? (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            ) : null}
            {siteConfig.businessAddress ? <li>{siteConfig.businessAddress}</li> : null}
            <li className="pt-2 text-sunshine-gold/90">
              DOT Accr. {siteConfig.dotAccreditation.number}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-pad mx-auto flex max-w-7xl flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.companyName}. All rights reserved.
          </p>
          <p>Rates and schedules subject to change and availability.</p>
        </div>
      </div>
    </footer>
  )
}
