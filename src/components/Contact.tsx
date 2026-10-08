import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ClipboardCopy, Mail, MessageCircle, Phone } from 'lucide-react'
import { destinations } from '@/data/destinations'
import { siteConfig } from '@/data/site'
import {
  buildInquiryMessage,
  buildMailtoLink,
  buildWhatsAppLink,
  prefillToDetails,
  type InquiryPayload,
} from '@/lib/inquiry'
import type { InquiryPrefill } from '@/types'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  mobile: z
    .string()
    .min(10, 'Enter a valid mobile number')
    .regex(/^[0-9+\-\s()]+$/, 'Use digits and common phone characters only'),
  preferredDestination: z.string().min(1, 'Select a destination or Not sure yet'),
  travelType: z.enum(['domestic', 'international', 'custom'], {
    message: 'Select travel type',
  }),
  preferredDate: z.string().optional(),
  travelers: z.number({ message: 'Enter number of travelers' }).min(1).max(40),
  details: z.string().max(2000).optional(),
  contactMethod: z.enum(['email', 'phone', 'whatsapp']),
  packageName: z.string().optional(),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: 'Please confirm before sending your inquiry',
    }),
})

type FormValues = z.infer<typeof schema>

interface ContactProps {
  prefill?: InquiryPrefill
}

export function Contact({ prefill }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'ready' | 'copied' | 'error'>('idle')
  const [draft, setDraft] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      preferredDestination: '',
      travelType: undefined,
      preferredDate: '',
      travelers: 2,
      details: '',
      contactMethod: 'whatsapp',
      packageName: '',
      consent: false,
    },
  })

  useEffect(() => {
    if (!prefill) return
    if (prefill.destination) {
      const match = destinations.find(
        (d) => d.name === prefill.destination || d.id === prefill.destination,
      )
      setValue('preferredDestination', match?.id ?? 'not-sure')
    }
    if (prefill.travelType) setValue('travelType', prefill.travelType)
    if (prefill.travelDate) setValue('preferredDate', prefill.travelDate)
    if (prefill.travelers) setValue('travelers', prefill.travelers)
    if (prefill.packageName) setValue('packageName', prefill.packageName)
    setValue('details', prefillToDetails(prefill))
  }, [prefill, setValue])

  const onSubmit = async (values: FormValues) => {
    setStatus('idle')
    const destLabel =
      values.preferredDestination === 'not-sure'
        ? 'Not sure yet'
        : destinations.find((d) => d.id === values.preferredDestination)?.name ??
          values.preferredDestination

    const payload: InquiryPayload = {
      fullName: values.fullName,
      email: values.email,
      mobile: values.mobile,
      preferredDestination: destLabel,
      travelType: values.travelType,
      preferredDate: values.preferredDate ?? '',
      travelers: values.travelers,
      details: values.details ?? '',
      contactMethod: values.contactMethod,
      packageName: values.packageName,
      consent: true,
    }

    const message = buildInquiryMessage(payload)
    setDraft(message)

    if (values.contactMethod === 'whatsapp' && siteConfig.whatsappNumber) {
      const url = buildWhatsAppLink(message)
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer')
        setStatus('ready')
        return
      }
    }

    if (values.contactMethod === 'email' && siteConfig.email) {
      const mailto = buildMailtoLink(payload)
      if (mailto) {
        window.location.href = mailto
        setStatus('ready')
        return
      }
    }

    if (values.contactMethod === 'phone' && siteConfig.phone) {
      window.location.href = `tel:${siteConfig.phone}`
      setStatus('ready')
      return
    }

    try {
      await navigator.clipboard.writeText(message)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="scroll-mt-nav bg-muted-bg py-16 sm:py-24">
      <div className="section-pad mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Plan my trip"
            title="Tell us about your trip."
            support="Share a few details and we’ll follow up. This form does not auto-book — it helps us prepare a quotation."
          />

          <ul className="mt-8 space-y-4">
            {siteConfig.phone ? (
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ocean-navy transition hover:bg-white/80"
                >
                  <Phone className="text-tropical-green" size={18} aria-hidden />
                  <span>
                    <span className="block text-xs text-dark-text/55">Phone / WhatsApp</span>
                    {siteConfig.phoneDisplay}
                  </span>
                </a>
              </li>
            ) : null}
            {siteConfig.phoneSecondary ? (
              <li className="px-4 text-sm text-dark-text/65">
                Landline: {siteConfig.phoneSecondary}
              </li>
            ) : null}
            {siteConfig.email ? (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ocean-navy transition hover:bg-white/80"
                >
                  <Mail className="text-tropical-green" size={18} aria-hidden />
                  <span>
                    <span className="block text-xs text-dark-text/55">Email</span>
                    {siteConfig.email}
                  </span>
                </a>
              </li>
            ) : null}
            {siteConfig.whatsappNumber ? (
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ocean-navy transition hover:bg-white/80"
                >
                  <MessageCircle className="text-tropical-green" size={18} aria-hidden />
                  <span>
                    <span className="block text-xs text-dark-text/55">WhatsApp</span>
                    Message us on WhatsApp
                  </span>
                </a>
              </li>
            ) : null}
          </ul>

          <p className="mt-6 text-sm text-dark-text/55">{siteConfig.pickupNote}</p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-ocean-navy/8 bg-white p-5 shadow-sm sm:p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Full name *
                </span>
                <input
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
                  autoComplete="name"
                  {...register('fullName')}
                />
                {errors.fullName ? (
                  <span className="text-xs text-red-600">{errors.fullName.message}</span>
                ) : null}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Email
                </span>
                <input
                  type="email"
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
                  autoComplete="email"
                  {...register('email')}
                />
                {errors.email ? (
                  <span className="text-xs text-red-600">{errors.email.message}</span>
                ) : null}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Mobile number *
                </span>
                <input
                  type="tel"
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
                  autoComplete="tel"
                  {...register('mobile')}
                />
                {errors.mobile ? (
                  <span className="text-xs text-red-600">{errors.mobile.message}</span>
                ) : null}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Preferred destination *
                </span>
                <select
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
                  {...register('preferredDestination')}
                >
                  <option value="">Select…</option>
                  <option value="not-sure">Not sure yet</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {errors.preferredDestination ? (
                  <span className="text-xs text-red-600">
                    {errors.preferredDestination.message}
                  </span>
                ) : null}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Domestic or international *
                </span>
                <select
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
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

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Preferred travel date
                </span>
                <input
                  type="date"
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
                  {...register('preferredDate')}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Number of travelers *
                </span>
                <input
                  type="number"
                  min={1}
                  max={40}
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
                  {...register('travelers', { valueAsNumber: true })}
                />
              </label>

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Package (if any)
                </span>
                <input
                  className="h-12 rounded-xl border border-ocean-navy/15 px-3 text-sm outline-none focus:border-tropical-green"
                  placeholder="e.g. Mt. Pinatubo / San Juan Local Tour"
                  {...register('packageName')}
                />
              </label>

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Additional travel details
                </span>
                <textarea
                  rows={4}
                  className="rounded-xl border border-ocean-navy/15 px-3 py-3 text-sm outline-none focus:border-tropical-green"
                  placeholder="Dates flexibility, special requests, pickup needs…"
                  {...register('details')}
                />
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
                  Preferred contact method
                </legend>
                <div className="mt-2 flex flex-wrap gap-3">
                  {(
                    [
                      ['whatsapp', 'WhatsApp', Boolean(siteConfig.whatsappNumber)],
                      ['email', 'Email draft', Boolean(siteConfig.email)],
                      ['phone', 'Phone call', Boolean(siteConfig.phone)],
                    ] as const
                  ).map(([value, label, enabled]) => (
                    <label
                      key={value}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                        enabled
                          ? 'border-ocean-navy/15 cursor-pointer'
                          : 'cursor-not-allowed border-ocean-navy/5 opacity-40'
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        disabled={!enabled}
                        {...register('contactMethod')}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="flex items-start gap-3 sm:col-span-2">
                <input
                  type="checkbox"
                  className="mt-1"
                  {...register('consent')}
                />
                <span className="text-sm text-dark-text/70">
                  I agree to be contacted about this inquiry. We’ll only use these details to
                  respond to your trip request.
                  {/* Replace with a link when a Privacy Policy page is published. */}
                </span>
              </label>
              {errors.consent ? (
                <span className="text-xs text-red-600 sm:col-span-2">{errors.consent.message}</span>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                Send Inquiry
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => {
                  reset()
                  setStatus('idle')
                  setDraft('')
                }}
              >
                Clear
              </Button>
            </div>

            {status === 'ready' ? (
              <p className="mt-4 rounded-xl bg-tropical-green/10 px-4 py-3 text-sm text-tropical-green-dark">
                We opened your preferred contact channel with a drafted message. If nothing opened,
                copy the inquiry below and send it manually.
              </p>
            ) : null}
            {status === 'copied' ? (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-tropical-green/10 px-4 py-3 text-sm text-tropical-green-dark">
                <Check size={16} aria-hidden /> Inquiry copied — paste it into email or Messenger.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                Couldn’t open a channel or copy automatically. Please message us using the contact
                details on the left.
              </p>
            ) : null}

            {draft ? (
              <div className="mt-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-ocean-navy/60 uppercase">
                    Inquiry draft
                  </p>
                  <button
                    type="button"
                    onClick={copyDraft}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-tropical-green"
                  >
                    <ClipboardCopy size={14} aria-hidden /> Copy
                  </button>
                </div>
                <pre className="mt-2 max-h-40 overflow-auto rounded-xl bg-muted-bg p-3 text-xs whitespace-pre-wrap text-dark-text/75">
                  {draft}
                </pre>
              </div>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
