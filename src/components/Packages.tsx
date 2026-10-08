import { useMemo, useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { formatMoney, packageFilters, packages } from '@/data/packages'
import type { InquiryPrefill, TourPackage } from '@/types'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

interface PackagesProps {
  highlightIds?: string[]
  onViewDetails: (pkg: TourPackage) => void
  onInquire: (prefill: InquiryPrefill) => void
}

export function Packages({ highlightIds, onViewDetails, onInquire }: PackagesProps) {
  const [filter, setFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    let list = packages
    if (filter !== 'all') {
      list = list.filter((p) => p.category.includes(filter as TourPackage['category'][number]))
    }
    if (highlightIds?.length) {
      const set = new Set(highlightIds)
      list = [...list].sort((a, b) => Number(set.has(b.id)) - Number(set.has(a.id)))
    }
    return list
  }, [filter, highlightIds])

  return (
    <section id="packages" className="scroll-mt-nav bg-muted-bg py-16 sm:py-24">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Tour packages"
              title="Thoughtfully planned. Beautifully experienced."
              support="Less time planning. More time making memories. Rates below come from our tour materials and may change — inquire to confirm."
            />
            {highlightIds?.length ? (
              <p className="rounded-xl bg-tropical-green/10 px-4 py-2 text-sm font-medium text-tropical-green-dark">
                Showing matches from your trip finder first
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter packages"
          >
            {packageFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  filter === f.id
                    ? 'bg-ocean-navy text-white'
                    : 'bg-white text-ocean-navy/70 hover:bg-white hover:text-ocean-navy'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((pkg, i) => {
            const highlighted = highlightIds?.includes(pkg.id)
            return (
              <Reveal key={pkg.id} delay={Math.min(i * 0.05, 0.25)}>
                <article
                  className={`flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-24px_rgba(16,46,82,0.35)] transition ${
                    highlighted ? 'ring-2 ring-tropical-green' : ''
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {pkg.category.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="rounded-md bg-warm-white/95 px-2 py-0.5 text-[10px] font-bold tracking-wide text-ocean-navy uppercase"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-1.5 text-xs text-ocean-blue">
                      <MapPin size={14} aria-hidden />
                      {pkg.destination}
                    </div>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-ocean-navy">
                      {pkg.title}
                    </h3>
                    {pkg.duration ? (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-dark-text/60">
                        <Clock size={14} aria-hidden />
                        {pkg.duration}
                      </p>
                    ) : null}
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-dark-text/70">
                      {pkg.summary}
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-dark-text/75">
                      {pkg.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tropical-green" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    {pkg.fromPrice ? (
                      <p className="mt-4 font-display text-lg font-bold text-ocean-navy">
                        From {formatMoney(pkg.fromPrice.amount, pkg.fromPrice.currency)}
                        <span className="ml-1 text-xs font-medium text-dark-text/50">
                          {pkg.fromPrice.note}
                        </span>
                      </p>
                    ) : (
                      <p className="mt-4 text-sm font-semibold text-tropical-green">
                        Request a Quote
                      </p>
                    )}
                    <div className="mt-4 flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => onViewDetails(pkg)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() =>
                          onInquire({
                            packageName: pkg.title,
                            destination: pkg.destination,
                            travelType: pkg.category.includes('international')
                              ? 'international'
                              : 'domestic',
                          })
                        }
                      >
                        Inquire
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {!filtered.length ? (
          <p className="mt-10 text-center text-dark-text/60">
            No packages in this filter yet — try another category or send an inquiry.
          </p>
        ) : null}
      </div>
    </section>
  )
}
