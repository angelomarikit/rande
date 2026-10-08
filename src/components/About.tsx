import { siteConfig } from '@/data/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

export function About() {
  return (
    <section id="about" className="scroll-mt-nav bg-ocean-navy py-16 text-warm-white sm:py-24">
      <div className="section-pad mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              light
              eyebrow="Our story"
              title="More than a destination. A memory you’ll keep."
              support="Travel is better when someone helps with the details — routes, timing, and the little things that make a group trip feel easy."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/80">
              <p>
                {siteConfig.companyName} has been helping travelers plan domestic adventures and
                select journeys abroad since {siteConfig.sinceYear}. Based in San Juan, Batangas,
                we work with families, barkadas, and groups who want clear options and a friendly
                hand through the planning process.
              </p>
              <p>
                Whether it’s a half-day heritage walk, a crater-lake trek, a highlands shared tour,
                or a Japan package — we start with where you want to go and build from there.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-sunshine-gold">
                Since {siteConfig.sinceYear}
              </span>
              <Button
                variant="light"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Get to Know Us
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-12 sm:grid-rows-[220px_200px]">
              <div className="overflow-hidden rounded-2xl sm:col-span-7 sm:row-span-2">
                <img
                  src="/images/happy-white-house.jpg"
                  alt="Guests and guide at a heritage site in San Juan"
                  className="h-full min-h-[240px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl sm:col-span-5">
                <img
                  src="/images/happy-casa-soledad.jpg"
                  alt="Tour group at Casa Soledad"
                  className="h-full min-h-[180px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-black sm:col-span-5">
                <video
                  className="h-full min-h-[180px] w-full object-cover"
                  controls
                  preload="metadata"
                  poster="/images/resort-pool.jpg"
                  playsInline
                >
                  <source src="/videos/travel-moments.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
