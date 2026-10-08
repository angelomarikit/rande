import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/data/faqs'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)
  const baseId = useId()
  const reduce = useReducedMotion()

  return (
    <section id="faqs" className="section-pad scroll-mt-nav py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading
            eyebrow="FAQs"
            title="Questions before you take off?"
            support="Straight answers about inquiries — without inventing policies we haven’t published yet."
          />
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.08}>
          <div className="divide-y divide-ocean-navy/10 rounded-2xl border border-ocean-navy/8 bg-white">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id
              const panelId = `${baseId}-${faq.id}-panel`
              const buttonId = `${baseId}-${faq.id}-button`
              return (
                <div key={faq.id}>
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                    >
                      <span className="font-display text-base font-semibold text-ocean-navy sm:text-lg">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`shrink-0 text-tropical-green transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        size={20}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-dark-text/70 sm:px-6 sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
