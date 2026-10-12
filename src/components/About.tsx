import { useSiteContent } from '@/context/ContentContext'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

export function About() {
  const { content } = useSiteContent()
  const about = content.sections.about
  const sinceYear = content.settings.sinceYear

  return (
    <section id="about" className="scroll-mt-nav bg-ocean-navy py-16 text-warm-white sm:py-24">
      <div className="section-pad mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              light
              eyebrow={about.eyebrow}
              title={about.title}
              support={about.support}
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/80">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-sunshine-gold">
                Since {sinceYear}
              </span>
              <Button
                variant="light"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {about.ctaLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-12 sm:grid-rows-[220px_200px]">
              <div className="overflow-hidden rounded-2xl sm:col-span-7 sm:row-span-2">
                <img
                  src={about.imagePrimary}
                  alt=""
                  className="h-full min-h-[240px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl sm:col-span-5">
                <img
                  src={about.imageSecondary}
                  alt=""
                  className="h-full min-h-[180px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-black sm:col-span-5">
                <video
                  className="h-full min-h-[180px] w-full object-cover"
                  controls
                  preload="metadata"
                  poster={about.videoPoster}
                  playsInline
                >
                  <source src={about.videoSrc} type="video/mp4" />
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
