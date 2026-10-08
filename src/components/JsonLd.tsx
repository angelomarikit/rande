import { siteConfig } from '@/data/site'

/** TravelAgency schema using only verified company details. */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.companyName,
    description: siteConfig.description,
    foundingDate: String(siteConfig.sinceYear),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '05 General Luna St., Brgy. Poblacion',
      addressLocality: 'San Juan',
      addressRegion: 'Batangas',
      addressCountry: 'PH',
    },
    identifier: siteConfig.dotAccreditation.number,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
