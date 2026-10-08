import { BadgeCheck, CalendarHeart, Headphones, Map, Sparkles } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const features = [
  {
    icon: CalendarHeart,
    title: `Established since ${siteConfig.sinceYear}`,
    body: 'Years of helping travelers from San Juan, Batangas and beyond plan trips that actually happen.',
  },
  {
    icon: BadgeCheck,
    title: 'DOT Basic Accredited',
    body: `${siteConfig.dotAccreditation.classification}. Accreditation No. ${siteConfig.dotAccreditation.number}.`,
  },
  {
    icon: Sparkles,
    title: 'Personalized travel assistance',
    body: 'Private day tours, shared departures, resort stays, or a custom plan — we tailor the conversation to your group.',
  },
  {
    icon: Map,
    title: 'Convenient trip planning',
    body: 'Clear inclusions, sensible routes, and pickup options so you’re not piecing everything together alone.',
  },
  {
    icon: Headphones,
    title: 'Support through the process',
    body: 'From first inquiry to final arrangements, you’ll have someone to ask when details need sorting out.',
  },
]

export function WhyRande() {
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/images/happy-bautista-house.jpg"
                alt="Happy travelers and staff at Bautista House"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                loading="lazy"
              />
            </div>
            <div className="absolute -right-2 -bottom-4 max-w-[240px] overflow-hidden rounded-2xl bg-white p-2 shadow-xl sm:right-6 sm:bottom-6">
              <img
                src={siteConfig.dotAccreditation.image}
                alt="DOT Basic Accreditation announcement for Rande Travel and Tour"
                className="h-auto w-full rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Why travel with us"
            title="Your journey matters to us."
            support="We’re here to make planning feel lighter — so you can focus on the places and people you’ll remember."
          />
          <ul className="mt-8 space-y-5">
            {features.map((f) => (
              <li key={f.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted-bg text-tropical-green">
                  <f.icon size={20} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ocean-navy">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-dark-text/70 sm:text-base">
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
