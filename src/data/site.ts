/**
 * Central site configuration.
 * Leave optional channels empty until verified — UI will hide unconfigured links.
 */
export const siteConfig = {
  companyName: 'Rande Travel and Tours',
  legalName: 'R and E Travel and Tour',
  sinceYear: 2012,
  tagline: 'Good trips start with great plans.',
  description:
    'A Philippine travel agency helping families, friends, and groups plan domestic tours and select international journeys — carefully, personally, and with local know-how.',
  phone: '09669670568',
  phoneDisplay: '0966 967 0568',
  phoneSecondary: '0927 764 9006',
  email: 'r_ehouseoftravel@yahoo.com',
  /** Set when a verified Messenger page URL is available */
  messengerUrl: '',
  /** Verified from brand banner */
  facebookUrl: 'https://fb.com/randehouseoftravel',
  /** Set when a verified Instagram profile URL is available */
  instagramUrl: '',
  /** Digits only / E.164-ready; derived from verified phone */
  whatsappNumber: '639669670568',
  businessAddress: '#05 General Luna St., Poblacion, San Juan, Batangas, Philippines',
  googleMapsUrl: '',
  pickupNote: 'Common pickup reference: Out San Juan, Batangas',
  /** Share / Open Graph image (absolute URL required by most social crawlers once live) */
  ogImagePath: '/images/og-share.jpg',
  /** Set to your live site origin after deploy, e.g. https://yourdomain.com */
  siteUrl: '',
  /** From client DOT Basic Accreditation certificate */
  dotAccreditation: {
    number: 'DOT-R4A-TTA-01243-2023',
    classification: 'Basic Accreditation — Travel and Tour Agency',
    entityName: 'RANDE TRAVEL AND TOUR',
    image: '/images/trust-dot-accreditation.jpg',
  },
} as const

export type SiteConfig = typeof siteConfig

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Tour Packages', href: '#packages' },
  { label: 'About Us', href: '#about' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
] as const
