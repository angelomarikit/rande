import { galleryItems } from '@/data/gallery'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

const happyPhotos = galleryItems.filter((item) => item.src.includes('happy-')).slice(0, 6)

interface HappyTravelersProps {
  onOpenGallery: () => void
}

/** Photo social proof only — no fabricated quotes or star ratings. */
export function HappyTravelers({ onOpenGallery }: HappyTravelersProps) {
  if (!happyPhotos.length) return null

  return (
    <section id="happy-travelers" className="section-pad scroll-mt-nav py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Happy travelers"
              title="Real trips. Real smiles."
              support="Moments from tours with Rande Travel and Tours — no staged stock quotes, just photos from the road."
            />
            <Button variant="secondary" onClick={onOpenGallery}>
              View full gallery
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {happyPhotos.map((photo, i) => (
            <Reveal key={photo.id} delay={Math.min(i * 0.05, 0.2)}>
              <figure className="group relative overflow-hidden rounded-2xl">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                    i === 0 ? 'aspect-[4/5] md:aspect-[5/6]' : 'aspect-[4/3]'
                  }`}
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-navy/75 to-transparent px-3 pt-10 pb-3 text-sm font-medium text-white">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
