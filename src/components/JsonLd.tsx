import { useSiteContent } from '@/context/ContentContext'

/** TravelAgency schema using only verified company details. */
export function JsonLd() {
  const { content } = useSiteContent()
  const settings = content.settings

  const data = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: settings.companyName,
    description: settings.description,
    foundingDate: String(settings.sinceYear),
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.businessAddress,
      addressLocality: 'San Juan',
      addressRegion: 'Batangas',
      addressCountry: 'PH',
    },
    identifier: settings.dotAccreditation.number,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
