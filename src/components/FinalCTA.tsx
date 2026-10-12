import { useSiteContent } from '@/context/ContentContext'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'

interface FinalCTAProps {
  onPlanTrip: () => void
  onExplore: () => void
}

export function FinalCTA({ onPlanTrip, onExplore }: FinalCTAProps) {
  const { content } = useSiteContent()
  const cta = content.sections.final_cta

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <img
        src={cta.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ocean-navy/75" />
      <div className="section-pad relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-sunshine-gold uppercase">
            {cta.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4.5vw,3rem)] font-bold text-balance text-white">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">{cta.support}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" onClick={onPlanTrip}>
              {cta.primaryCta}
            </Button>
            <Button variant="ghost" size="lg" onClick={onExplore}>
              {cta.secondaryCta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
