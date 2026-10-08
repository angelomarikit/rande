import { motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { Button } from './ui/Button'

interface HeroProps {
  onExplorePackages: () => void
  onPlanTrip: () => void
}

export function Hero({ onExplorePackages, onPlanTrip }: HeroProps) {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24 sm:pt-32"
    >
      <div className="absolute inset-0">
        <motion.img
          src="/images/hero-palawan.jpg"
          alt="Aerial view of a turquoise lagoon framed by limestone cliffs in Palawan"
          className="h-full w-full object-cover object-[58%_40%] sm:object-center"
          width={1920}
          height={1080}
          fetchPriority="high"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-navy/80 via-ocean-navy/45 to-ocean-navy/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-navy/70 via-transparent to-black/25" />
      </div>

      <div className="section-pad relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-xl text-left text-warm-white">
          <motion.p
            className="mb-4 text-xs font-semibold tracking-[0.2em] text-sunshine-gold uppercase sm:text-sm"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Your next adventure starts here
          </motion.p>

          <motion.h1
            className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold leading-[1.08] text-balance text-white"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            The world is waiting. Let’s go explore.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
          >
            From island escapes to unforgettable journeys abroad, discover travel
            experiences worth remembering with {siteConfig.companyName}.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button variant="primary" size="lg" onClick={onExplorePackages}>
              Explore Tour Packages
            </Button>
            <Button variant="ghost" size="lg" onClick={onPlanTrip}>
              Plan My Trip
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/75"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
              Since {siteConfig.sinceYear}
            </span>
            <span className="font-editorial text-base italic text-white/90">
              Discover Palawan, Philippines
            </span>
          </motion.div>
        </div>
      </div>

      <a
        href="#trip-finder"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/70 transition hover:text-white sm:flex"
        aria-label="Scroll to trip finder"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="animate-bounce" size={20} aria-hidden />
      </a>
    </section>
  )
}
