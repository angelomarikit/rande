import { destinations } from '@/data/destinations'
import type { Destination, InquiryPrefill } from '@/types'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

interface DestinationsProps {
  onSelect: (destination: Destination) => void
  onInquiry: (prefill: InquiryPrefill) => void
}

function DestinationTile({
  destination,
  className,
  onSelect,
}: {
  destination: Destination
  className: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl text-left focus-visible:outline-offset-4 ${className}`}
    >
      <img
        src={destination.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-navy/85 via-ocean-navy/25 to-transparent transition-opacity duration-300 group-hover:from-ocean-navy/90" />
      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white/90 uppercase backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
          {destination.sampleContent ? (
            <span className="rounded-md bg-sunshine-gold/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ocean-navy uppercase">
              Inspiration
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
          {destination.name}
        </h3>
        <p className="text-sm text-white/75">{destination.location}</p>
        <p className="mt-2 line-clamp-2 text-sm text-white/85">{destination.description}</p>
      </div>
    </button>
  )
}

export function Destinations({ onSelect, onInquiry }: DestinationsProps) {
  const [featureA, featureB, ...rest] = destinations

  const handle = (d: Destination) => {
    if (d.relatedPackageIds?.length) {
      onSelect(d)
      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    onInquiry({
      destination: d.name,
      travelType: d.sampleContent ? 'custom' : 'domestic',
      details: `Interested in ${d.name}. Please suggest available options.`,
    })
  }

  return (
    <section id="destinations" className="section-pad scroll-mt-nav py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Featured destinations"
            title="Places you’ll fall in love with."
            support="Find your next escape, near or far. Some spots below are active tour routes; others are inspiration for custom trips."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          {featureA ? (
            <Reveal className="md:col-span-7" delay={0.05}>
              <DestinationTile
                destination={featureA}
                className="h-[280px] w-full md:h-[420px]"
                onSelect={() => handle(featureA)}
              />
            </Reveal>
          ) : null}
          {featureB ? (
            <Reveal className="md:col-span-5" delay={0.1}>
              <DestinationTile
                destination={featureB}
                className="h-[260px] w-full md:h-[420px]"
                onSelect={() => handle(featureB)}
              />
            </Reveal>
          ) : null}
          {rest.map((d, i) => (
            <Reveal key={d.id} className="md:col-span-4" delay={0.08 + i * 0.04}>
              <DestinationTile
                destination={d}
                className="h-[220px] w-full"
                onSelect={() => handle(d)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
