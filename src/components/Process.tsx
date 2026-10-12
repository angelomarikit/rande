import { useSiteContent } from '@/context/ContentContext'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function Process() {
  const { content } = useSiteContent()
  const process = content.sections.process

  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={process.eyebrow}
            title={process.title}
            support={process.support}
            className="mx-auto"
          />
        </Reveal>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          <div
            className="pointer-events-none absolute top-10 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-tropical-green/35 to-transparent md:block"
            aria-hidden
          />
          {process.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <li className="relative text-center md:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted-bg font-display text-xl font-bold text-tropical-green md:mx-0">
                  {step.num}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ocean-navy">{step.title}</h3>
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
