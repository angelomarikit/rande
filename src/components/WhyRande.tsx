import { BadgeCheck, CalendarHeart, Headphones, Map, Sparkles } from 'lucide-react'
import { useSiteContent } from '@/context/ContentContext'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const featureIcons = [CalendarHeart, BadgeCheck, Sparkles, Map, Headphones]

export function WhyRande() {
  const { content } = useSiteContent()
  const why = content.sections.why_rande

  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={why.image}
                alt={why.imageAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                loading="lazy"
              />
            </div>
            {why.accreditationImage ? (
              <div className="absolute -right-2 -bottom-4 max-w-[240px] overflow-hidden rounded-2xl bg-white p-2 shadow-xl sm:right-6 sm:bottom-6">
                <img
                  src={why.accreditationImage}
                  alt="DOT accreditation"
                  className="h-auto w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="absolute -right-2 -bottom-4 max-w-[220px] rounded-2xl bg-ocean-navy p-4 text-warm-white shadow-xl sm:right-6 sm:bottom-6">
                <p className="font-editorial text-lg italic text-sunshine-gold">{why.badgeTitle}</p>
                <p className="mt-1 text-sm text-white/80">{why.badgeBody}</p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow={why.eyebrow}
            title={why.title}
            support={why.support}
          />
          <ul className="mt-8 space-y-5">
            {why.features.map((f, index) => {
              const Icon = featureIcons[index % featureIcons.length]
              return (
                <li key={f.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted-bg text-tropical-green">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ocean-navy">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-dark-text/70 sm:text-base">
                      {f.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
