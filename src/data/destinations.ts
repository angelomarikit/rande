import type { Destination } from '@/types'

/**
 * Featured destinations for discovery.
 * Entries marked sampleContent are inspiration placements — not a claim of active inventory.
 */
export const destinations: Destination[] = [
  {
    id: 'san-juan-batangas',
    name: 'San Juan',
    location: 'Batangas, Philippines',
    description:
      'Heritage homes, craft workshops, and parish landmarks — a hometown favorite for private day tours.',
    image: '/images/happy-bautista-house.jpg',
    size: 'large',
    tags: ['Heritage', 'Private tours'],
    relatedPackageIds: ['san-juan-fullday', 'san-juan-halfday', 'eddielita-resort'],
  },
  {
    id: 'palawan',
    name: 'El Nido & Puerto Princesa',
    location: 'Palawan, Philippines',
    description:
      'Limestone lagoons and island stops — featured in our flyers and cruise routes. Inquire for dates.',
    image: '/images/hero-palawan.jpg',
    size: 'large',
    tags: ['Islands', 'Cruise'],
    relatedPackageIds: ['costa-serena-cruise'],
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    location: 'Hanoi · Sapa · Ha Long Bay',
    description: 'Charter and Clark departures covering Sapa, Fansipan, and Ha Long Bay cruises.',
    image: '/images/flyer-vietnam-sapa-charter.jpg',
    size: 'medium',
    tags: ['International', 'Group'],
    relatedPackageIds: ['vietnam-sapa-charter', 'vietnam-clark'],
  },
  {
    id: 'thailand',
    name: 'Thailand',
    location: 'Bangkok · Pattaya',
    description: 'Legendary Thailand packages with temples, gardens, markets, and city nights.',
    image: '/images/flyer-thailand-legendary.jpg',
    size: 'medium',
    tags: ['International', 'Group'],
    relatedPackageIds: ['thailand-legendary', 'asia-allin-starter'],
  },
  {
    id: 'korea',
    name: 'South Korea',
    location: 'Seoul & surrounds',
    description: 'Winter Daebak Korea and other all-in Seoul adventures.',
    image: '/images/flyer-korea-daebak.jpg',
    size: 'small',
    tags: ['International', 'Winter'],
    relatedPackageIds: ['korea-daebak', 'asia-allin-starter'],
  },
  {
    id: 'japan',
    name: 'Osaka · Kyoto · Nara',
    location: 'Japan',
    description: 'Temples, deer park, and city nights — an all-in international package via Cebu Pacific.',
    image: '/images/flyer-japan-osaka.jpg',
    size: 'medium',
    tags: ['International', 'Group'],
    relatedPackageIds: ['japan-osaka-kyoto-nara'],
  },
  {
    id: 'greece-turkey',
    name: 'Greece & Turkey',
    location: 'Santorini · Athens · Cappadocia',
    description: 'A premium 14-day seasonal itinerary with Qatar Airways.',
    image: '/images/flyer-greece-turkey.jpg',
    size: 'small',
    tags: ['International', 'Premium'],
    relatedPackageIds: ['greece-turkey'],
  },
  {
    id: 'bali',
    name: 'Bali',
    location: 'Indonesia',
    description: 'Rice terraces, temple gates, and beach evenings — ask about cruise and custom options.',
    image: '/images/promo-bali-where.jpg',
    size: 'small',
    tags: ['International', 'Custom'],
    relatedPackageIds: ['costa-serena-cruise'],
  },
  {
    id: 'boracay',
    name: 'Boracay',
    location: 'Aklan, Philippines',
    description: 'White-sand favorites featured in our destination and cruise promotions.',
    image: '/images/promo-ph-destinations.jpg',
    size: 'small',
    tags: ['Beach', 'Cruise'],
    relatedPackageIds: ['costa-serena-cruise'],
  },
  {
    id: 'cordillera',
    name: 'Cordillera Highlands',
    location: 'Baguio · Sagada · Buscalan',
    description: 'Flower farms, caves, and mountain villages on a shared highlands circuit.',
    image: '/images/flyer-highlands.jpg',
    size: 'small',
    tags: ['Mountains', 'Culture'],
    relatedPackageIds: ['highlands-adventure', 'elyu-baguio'],
  },
]

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id)
}
