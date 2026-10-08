import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryItems } from '@/data/gallery'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const titleId = useId()
  const reduce = useReducedMotion()
  useBodyScrollLock(index !== null)

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') setIndex((i) => (i === null ? i : (i + 1) % galleryItems.length))
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  const active = index !== null ? galleryItems[index] : null

  return (
    <section id="gallery" className="scroll-mt-nav bg-muted-bg py-16 sm:py-24">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Travel gallery"
            title="Moments worth traveling for."
            support="Happy travelers, heritage stops, and destination favorites from our tours — click any photo to expand."
          />
        </Reveal>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 0.04, 0.2)} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative w-full overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                    item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                  loading="lazy"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-navy/70 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && index !== null ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ocean-navy/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label="Close lightbox"
              onClick={() => setIndex(null)}
            />
            <button
              type="button"
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ocean-navy"
              onClick={() => setIndex(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <button
              type="button"
              className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ocean-navy sm:left-6"
              onClick={() => setIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length))}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ocean-navy sm:right-6"
              onClick={() => setIndex((i) => (i === null ? i : (i + 1) % galleryItems.length))}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
            <motion.figure
              className="relative z-10 max-h-[85svh] max-w-5xl"
              initial={reduce ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduce ? undefined : { scale: 0.98, opacity: 0 }}
            >
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[75svh] w-auto rounded-xl object-contain"
              />
              <figcaption id={titleId} className="mt-3 text-center text-sm text-white/85">
                {active.caption ?? active.alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
