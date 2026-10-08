import { siteConfig } from '@/data/site'
import type { InquiryPrefill, TravelType } from '@/types'

export interface InquiryPayload {
  fullName: string
  email: string
  mobile: string
  preferredDestination: string
  travelType: TravelType | ''
  preferredDate: string
  travelers: number
  details: string
  contactMethod: 'email' | 'phone' | 'whatsapp'
  packageName?: string
  consent: boolean
}

export function buildInquiryMessage(data: InquiryPayload): string {
  const lines = [
    `Inquiry for ${siteConfig.companyName}`,
    '',
    `Name: ${data.fullName}`,
    `Email: ${data.email || '—'}`,
    `Mobile: ${data.mobile}`,
    `Preferred destination: ${data.preferredDestination || 'Not sure yet'}`,
    `Travel type: ${data.travelType || '—'}`,
    `Preferred date: ${data.preferredDate || 'Flexible / not set'}`,
    `Travelers: ${data.travelers}`,
    `Preferred contact: ${data.contactMethod}`,
  ]

  if (data.packageName) {
    lines.push(`Package: ${data.packageName}`)
  }

  if (data.details.trim()) {
    lines.push('', 'Additional details:', data.details.trim())
  }

  lines.push('', 'Sent from the website inquiry form.')
  return lines.join('\n')
}

export function buildMailtoLink(data: InquiryPayload): string | null {
  if (!siteConfig.email) return null
  const subject = encodeURIComponent(
    `Trip inquiry${data.packageName ? `: ${data.packageName}` : ''} — ${data.fullName}`,
  )
  const body = encodeURIComponent(buildInquiryMessage(data))
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
}

export function buildWhatsAppLink(message: string): string | null {
  if (!siteConfig.whatsappNumber) return null
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function prefillToDetails(prefill?: InquiryPrefill): string {
  if (!prefill) return ''
  const bits: string[] = []
  if (prefill.packageName) bits.push(`Interested in: ${prefill.packageName}`)
  if (prefill.details) bits.push(prefill.details)
  return bits.join('\n')
}

/**
 * Future integration points (Supabase, Resend, Formspree, custom API).
 * Keep this stub until a delivery endpoint is configured.
 */
export async function submitInquiryToApi(_data: InquiryPayload): Promise<{
  ok: false
  reason: 'not_configured'
}> {
  return { ok: false, reason: 'not_configured' }
}
