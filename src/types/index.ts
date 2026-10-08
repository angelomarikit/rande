export type TravelCategory =
  | 'domestic'
  | 'international'
  | 'group'
  | 'custom'

export type TravelType = 'domestic' | 'international' | 'custom'

export interface PricingTier {
  guests: string
  withTransfer?: number
  withoutTransfer?: number
}

export interface PackageOption {
  id: string
  name: string
  description?: string
  stops?: string[]
  pricing?: PricingTier[]
}

export interface RoomRate {
  name: string
  capacity: string
  weekdayRate: number
  weekendRate: number
  currency: 'PHP' | 'USD'
}

export interface TourPackage {
  id: string
  title: string
  destination: string
  region?: string
  duration?: string
  category: TravelCategory[]
  image: string
  summary: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary?: { day: string; items: string[] }[]
  options?: PackageOption[]
  roomRates?: RoomRate[]
  /** Client-supplied starting rate when available */
  fromPrice?: {
    amount: number
    currency: 'PHP' | 'USD'
    note?: string
  }
  travelDates?: string[]
  pickupPoint?: string
  discounts?: string[]
  addOns?: string[]
  featured?: boolean
  sampleContent?: boolean
}

export interface Destination {
  id: string
  name: string
  location: string
  description: string
  image: string
  size: 'large' | 'medium' | 'small'
  tags: string[]
  relatedPackageIds?: string[]
  /** Inspiration-only destinations without a matching client package */
  sampleContent?: boolean
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  caption?: string
  aspect: 'portrait' | 'landscape' | 'square'
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  trip?: string
  photo?: string
  verified: true
}

export interface TripFinderValues {
  destination: string
  travelType: TravelType | ''
  travelDate: string
  travelers: number
}

export interface InquiryPrefill {
  destination?: string
  travelType?: TravelType
  travelDate?: string
  travelers?: number
  packageName?: string
  details?: string
}
