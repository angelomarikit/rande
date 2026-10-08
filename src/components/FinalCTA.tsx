import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'

interface FinalCTAProps {
  onPlanTrip: () => void
  onExplore: () => void
}

export function FinalCTA({ onPlanTrip, onExplore }: FinalCTAProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <img
        src="/images/resort-pool.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ocean-navy/75" />
      <div className="section-pad relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-sunshine-gold uppercase">
            Ready when you are
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4.5vw,3rem)] font-bold text-balance text-white">
            Ready to make your next great memory?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Tell us where you want to go. We’ll help you take the first step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" onClick={onPlanTrip}>
              Plan My Trip
            </Button>
            <Button variant="ghost" size="lg" onClick={onExplore}>
              Explore Destinations
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
