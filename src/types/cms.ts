import type {
  Destination,
  FaqItem,
  GalleryItem,
  Testimonial,
  TourPackage,
} from '@/types'

export type SectionKey =
  | 'hero'
  | 'trip_finder'
  | 'destinations'
  | 'packages'
  | 'why_rande'
  | 'about'
  | 'process'
  | 'happy_travelers'
  | 'gallery'
  | 'faqs'
  | 'final_cta'
  | 'contact'

export interface HeroContent {
  eyebrow: string
  heading: string
  support: string
  primaryCta: string
  secondaryCta: string
  destinationLabel: string
  image: string
  imageAlt: string
}

export interface SectionHeadingContent {
  eyebrow?: string
  title: string
  support?: string
}

export interface WhyFeature {
  title: string
  body: string
}

export interface WhyRandeContent extends SectionHeadingContent {
  image: string
  imageAlt: string
  badgeTitle: string
  badgeBody: string
  features: WhyFeature[]
  accreditationImage?: string
}

export interface AboutContent extends SectionHeadingContent {
  paragraphs: string[]
  ctaLabel: string
  imagePrimary: string
  imageSecondary: string
  videoPoster: string
  videoSrc: string
}

export interface ProcessStep {
  num: string
  title: string
  body: string
}

export interface ProcessContent extends SectionHeadingContent {
  steps: ProcessStep[]
}

export interface FinalCtaContent {
  eyebrow: string
  title: string
  support: string
  primaryCta: string
  secondaryCta: string
  image: string
}

export interface TripFinderContent {
  title: string
  support: string
  ctaLabel: string
}

export interface ContactSectionContent extends SectionHeadingContent {
  formNote: string
}

export type PageSections = {
  hero: HeroContent
  trip_finder: TripFinderContent
  destinations: SectionHeadingContent
  packages: SectionHeadingContent
  why_rande: WhyRandeContent
  about: AboutContent
  process: ProcessContent
  happy_travelers: SectionHeadingContent
  gallery: SectionHeadingContent
  faqs: SectionHeadingContent
  final_cta: FinalCtaContent
  contact: ContactSectionContent
}

export interface SiteSettings {
  companyName: string
  legalName: string
  sinceYear: number
  tagline: string
  description: string
  phone: string
  phoneDisplay: string
  phoneSecondary: string
  email: string
  messengerUrl: string
  facebookUrl: string
  instagramUrl: string
  whatsappNumber: string
  businessAddress: string
  googleMapsUrl: string
  pickupNote: string
  ogImagePath: string
  siteUrl: string
  logoUrl: string
  dotAccreditation: {
    number: string
    classification: string
    entityName: string
    image: string
  }
}

export interface SiteContent {
  settings: SiteSettings
  sections: PageSections
  destinations: Destination[]
  packages: TourPackage[]
  gallery: GalleryItem[]
  faqs: FaqItem[]
  testimonials: Testimonial[]
  source: 'supabase' | 'static'
}
