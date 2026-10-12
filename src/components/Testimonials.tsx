import { useSiteContent } from '@/context/ContentContext'
import { SectionHeading } from './ui/SectionHeading'

/**
 * Hidden automatically when no verified testimonials are supplied.
 * Do not populate with fabricated reviews.
 */
export function Testimonials() {
  const { content } = useSiteContent()
  const testimonials = content.testimonials

  if (!testimonials.length) return null

  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          title="Words from fellow travelers"
          support="Verified guest feedback."
          className="mx-auto"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-2xl border border-ocean-navy/8 bg-white p-6 shadow-sm"
            >
              <p className="text-dark-text/80">“{item.quote}”</p>
              <footer className="mt-4 text-sm font-semibold text-ocean-navy">
                {item.name}
                {item.trip ? (
                  <span className="mt-1 block font-normal text-dark-text/55">{item.trip}</span>
                ) : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
