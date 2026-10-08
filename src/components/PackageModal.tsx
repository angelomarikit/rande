import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { formatMoney } from '@/data/packages'
import type { InquiryPrefill, TourPackage } from '@/types'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { Button } from './ui/Button'

interface PackageModalProps {
  pkg: TourPackage | null
  onClose: () => void
  onInquire: (prefill: InquiryPrefill) => void
}

export function PackageModal({ pkg, onClose, onInquire }: PackageModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  useBodyScrollLock(Boolean(pkg))

  useEffect(() => {
    if (!pkg) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pkg, onClose])

  return (
    <AnimatePresence>
      {pkg ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ocean-navy/55 backdrop-blur-[2px]"
            aria-label="Close dialog"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-warm-white shadow-2xl sm:rounded-3xl"
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-48 shrink-0 sm:h-56">
              <img
                src={pkg.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-navy/70 to-transparent" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ocean-navy shadow"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-sunshine-gold uppercase">
                  {pkg.destination}
                </p>
                <h3 id={titleId} className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {pkg.title}
                </h3>
              </div>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
              <p className="text-dark-text/80">{pkg.summary}</p>

              {pkg.fromPrice ? (
                <p className="mt-4 rounded-xl bg-muted-bg px-4 py-3 text-sm text-ocean-navy">
                  <span className="font-display text-lg font-bold">
                    From {formatMoney(pkg.fromPrice.amount, pkg.fromPrice.currency)}
                  </span>
                  {pkg.fromPrice.note ? (
                    <span className="ml-2 text-dark-text/60">· {pkg.fromPrice.note}</span>
                  ) : null}
                  <span className="mt-1 block text-xs text-dark-text/55">
                    Rates from client materials — subject to change and availability.
                  </span>
                </p>
              ) : null}

              {pkg.travelDates?.length ? (
                <p className="mt-3 text-sm text-dark-text/70">
                  <strong className="text-ocean-navy">Sample travel dates:</strong>{' '}
                  {pkg.travelDates.join(' · ')}
                </p>
              ) : null}

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-display text-sm font-bold tracking-wide text-tropical-green uppercase">
                    Inclusions
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-dark-text/80">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tropical-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold tracking-wide text-ocean-navy uppercase">
                    Exclusions
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-dark-text/80">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-navy/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {pkg.itinerary?.length ? (
                <div className="mt-6">
                  <h4 className="font-display text-sm font-bold tracking-wide text-ocean-navy uppercase">
                    Itinerary
                  </h4>
                  <div className="mt-3 space-y-3">
                    {pkg.itinerary.map((day) => (
                      <div key={day.day} className="rounded-xl border border-ocean-navy/8 bg-white p-4">
                        <p className="font-semibold text-tropical-green">{day.day}</p>
                        <ul className="mt-1.5 space-y-1 text-sm text-dark-text/75">
                          {day.items.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {pkg.options?.length ? (
                <div className="mt-6">
                  <h4 className="font-display text-sm font-bold tracking-wide text-ocean-navy uppercase">
                    Package options & rates (per person)
                  </h4>
                  <div className="mt-3 space-y-4">
                    {pkg.options.map((opt) => (
                      <div key={opt.id} className="rounded-xl border border-ocean-navy/8 bg-white p-4">
                        <p className="font-semibold text-ocean-navy">{opt.name}</p>
                        {opt.stops?.length ? (
                          <p className="mt-1 text-xs text-dark-text/60">{opt.stops.join(' · ')}</p>
                        ) : null}
                        {opt.pricing?.length ? (
                          <div className="mt-3 overflow-x-auto">
                            <table className="w-full min-w-[280px] text-left text-xs sm:text-sm">
                              <thead>
                                <tr className="border-b border-ocean-navy/10 text-ocean-navy/70">
                                  <th className="py-2 pr-3 font-medium">Guests</th>
                                  <th className="py-2 pr-3 font-medium">With van</th>
                                  <th className="py-2 font-medium">Without van</th>
                                </tr>
                              </thead>
                              <tbody>
                                {opt.pricing.map((row) => (
                                  <tr key={row.guests} className="border-b border-ocean-navy/5">
                                    <td className="py-2 pr-3">{row.guests}</td>
                                    <td className="py-2 pr-3">
                                      {row.withTransfer != null
                                        ? formatMoney(row.withTransfer, 'PHP')
                                        : '—'}
                                    </td>
                                    <td className="py-2">
                                      {row.withoutTransfer != null
                                        ? formatMoney(row.withoutTransfer, 'PHP')
                                        : '—'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {pkg.roomRates?.length ? (
                <div className="mt-6">
                  <h4 className="font-display text-sm font-bold tracking-wide text-ocean-navy uppercase">
                    Room rates (per person)
                  </h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {pkg.roomRates.map((room) => (
                      <div
                        key={room.name}
                        className="rounded-xl border border-ocean-navy/8 bg-white p-4"
                      >
                        <p className="font-semibold text-ocean-navy">{room.name}</p>
                        <p className="text-xs text-dark-text/55">{room.capacity}</p>
                        <p className="mt-2 text-sm">
                          Mon–Thu:{' '}
                          <strong>{formatMoney(room.weekdayRate, room.currency)}</strong>
                        </p>
                        <p className="text-sm">
                          Fri–Sun:{' '}
                          <strong>{formatMoney(room.weekendRate, room.currency)}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {pkg.discounts?.length || pkg.addOns?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {pkg.discounts?.length ? (
                    <div>
                      <h4 className="font-display text-sm font-bold text-ocean-navy uppercase">
                        Discounts
                      </h4>
                      <ul className="mt-2 space-y-1 text-sm text-dark-text/75">
                        {pkg.discounts.map((d) => (
                          <li key={d}>• {d}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {pkg.addOns?.length ? (
                    <div>
                      <h4 className="font-display text-sm font-bold text-ocean-navy uppercase">
                        Optional add-ons
                      </h4>
                      <ul className="mt-2 space-y-1 text-sm text-dark-text/75">
                        {pkg.addOns.map((d) => (
                          <li key={d}>• {d}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-t border-ocean-navy/8 bg-white px-5 py-4 sm:flex-row sm:px-8">
              <Button
                className="flex-1"
                size="lg"
                onClick={() => {
                  onInquire({
                    packageName: pkg.title,
                    destination: pkg.destination,
                    travelType: pkg.category.includes('international')
                      ? 'international'
                      : pkg.category.includes('custom')
                        ? 'custom'
                        : 'domestic',
                  })
                  onClose()
                }}
              >
                Request a Quote
              </Button>
              <Button variant="secondary" className="flex-1" size="lg" onClick={onClose}>
                Keep browsing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
