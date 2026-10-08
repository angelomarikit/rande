import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Search } from 'lucide-react'
import { destinations } from '@/data/destinations'
import { packages } from '@/data/packages'
import type { InquiryPrefill, TravelType } from '@/types'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'

const schema = z.object({
  destination: z.string().min(1, 'Choose a destination or “Not sure yet”'),
  travelType: z.enum(['domestic', 'international', 'custom'], {
    message: 'Select a travel type',
  }),
  travelDate: z.string().optional(),
  travelers: z
    .number({ message: 'Enter number of travelers' })
    .min(1, 'At least 1 traveler')
    .max(40, 'Please inquire for large groups'),
})

type FormValues = z.infer<typeof schema>

interface TripFinderProps {
  onMatchPackages: (ids: string[]) => void
  onInquiry: (prefill: InquiryPrefill) => void
}

export function TripFinder({ onMatchPackages, onInquiry }: TripFinderProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      destination: '',
      travelType: undefined,
      travelDate: '',
      travelers: 2,
    },
  })

  const onSubmit = (values: FormValues) => {
    const dest = destinations.find((d) => d.id === values.destination)
    const related = dest?.relatedPackageIds?.filter(Boolean) ?? []

    const typeMatched = packages.filter((p) => {
      if (values.travelType === 'custom') return p.category.includes('custom')
      return p.category.includes(values.travelType)
    })

    let matchedIds = related.length
      ? related
      : typeMatched.map((p) => p.id)

    if (related.length && values.travelType !== 'custom') {
      matchedIds = related.filter((id) => {
        const pkg = packages.find((p) => p.id === id)
        return pkg?.category.includes(values.travelType as TravelType)
      })
      if (!matchedIds.length) matchedIds = related
    }

    if (matchedIds.length) {
      onMatchPackages(matchedIds)
      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    onInquiry({
      destination: dest?.name ?? (values.destination === 'not-sure' ? 'Not sure yet' : values.destination),
      travelType: values.travelType,
      travelDate: values.travelDate,
      travelers: values.travelers,
      details: 'Found via Trip Finder — please suggest suitable options.',
    })
  }

  return (
    <section id="trip-finder" className="section-pad scroll-mt-nav relative z-20 -mt-10 pb-6 sm:-mt-14">
      <Reveal>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-ocean-navy/8 bg-white shadow-[0_20px_50px_-28px_rgba(16,46,82,0.35)]">
          <div className="border-b border-muted-bg bg-muted-bg/60 px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tropical-green/10 text-tropical-green">
                <MapPin size={20} aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-ocean-navy sm:text-2xl">
                  Where will your next journey take you?
                </h2>
                <p className="mt-1 text-sm text-dark-text/65">
                  Tell us a few details — we’ll point you to matching packages or open an inquiry.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-5 lg:items-end"
            noValidate
          >
            <label className="flex flex-col gap-1.5 text-left lg:col-span-1">
              <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                Destination
              </span>
              <select
                className="h-12 rounded-xl border border-ocean-navy/15 bg-warm-white px-3 text-sm text-dark-text outline-none transition focus:border-tropical-green"
                {...register('destination')}
              >
                <option value="">Select…</option>
                <option value="not-sure">Not sure yet</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.destination ? (
                <span className="text-xs text-red-600">{errors.destination.message}</span>
              ) : null}
            </label>

            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                Travel type
              </span>
              <select
                className="h-12 rounded-xl border border-ocean-navy/15 bg-warm-white px-3 text-sm text-dark-text outline-none transition focus:border-tropical-green"
                {...register('travelType')}
              >
                <option value="">Select…</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
                <option value="custom">Custom Trip</option>
              </select>
              {errors.travelType ? (
                <span className="text-xs text-red-600">{errors.travelType.message}</span>
              ) : null}
            </label>

            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                Preferred date
              </span>
              <input
                type="date"
                className="h-12 rounded-xl border border-ocean-navy/15 bg-warm-white px-3 text-sm text-dark-text outline-none transition focus:border-tropical-green"
                {...register('travelDate')}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                Travelers
              </span>
              <input
                type="number"
                min={1}
                max={40}
                className="h-12 rounded-xl border border-ocean-navy/15 bg-warm-white px-3 text-sm text-dark-text outline-none transition focus:border-tropical-green"
                {...register('travelers', { valueAsNumber: true })}
              />
              {errors.travelers ? (
                <span className="text-xs text-red-600">{errors.travelers.message}</span>
              ) : null}
            </label>

            <Button type="submit" size="lg" className="h-12 w-full">
              <Search size={18} aria-hidden />
              Find My Trip
            </Button>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
