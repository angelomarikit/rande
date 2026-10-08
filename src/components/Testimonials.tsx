import { testimonials } from '@/data/gallery'
import { SectionHeading } from './ui/SectionHeading'

/**
 * Hidden automatically when no verified testimonials are supplied.
 * Do not populate with fabricated reviews.
 */
export function Testimonials() {
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
        {/* Render carousel here once verified testimonials exist */}
      </div>
    </section>
  )
}
