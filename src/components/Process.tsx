import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const steps = [
  {
    num: '01',
    title: 'Choose Your Adventure',
    body: 'Browse destinations or tell us where you dream of going.',
  },
  {
    num: '02',
    title: 'Let’s Plan It Together',
    body: 'Share your dates, group size, and travel preferences.',
  },
  {
    num: '03',
    title: 'Get Ready to Explore',
    body: 'Review your personalized travel arrangements and prepare for the trip.',
  },
]

export function Process() {
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="Your next getaway in three simple steps."
            support="An inquiry is only a request until we respond and confirm the details with you."
            className="mx-auto"
          />
        </Reveal>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          <div
            className="pointer-events-none absolute top-10 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-tropical-green/35 to-transparent md:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <li className="relative text-center md:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted-bg font-display text-xl font-bold text-tropical-green md:mx-0">
                  {step.num}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ocean-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-text/70 sm:text-base">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
