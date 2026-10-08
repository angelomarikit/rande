import type { GalleryItem, Testimonial } from '@/types'

/** Real traveler moments from client-provided photos — captions are descriptive, not reviews. */
export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    src: '/images/happy-bautista-house.jpg',
    alt: 'Guests and staff inside Bautista House during a San Juan tour',
    caption: 'Bautista House',
    aspect: 'landscape',
  },
  {
    id: 'g2',
    src: '/images/happy-white-house.jpg',
    alt: 'Travelers and guide at White House San Juan',
    caption: 'White House San Juan',
    aspect: 'landscape',
  },
  {
    id: 'g3',
    src: '/images/happy-casa-soledad.jpg',
    alt: 'Tour group posing at Casa Soledad',
    caption: 'Casa Soledad',
    aspect: 'landscape',
  },
  {
    id: 'g4',
    src: '/images/happy-hongkong-family.jpg',
    alt: 'Family smiling at a Hong Kong harbour viewpoint',
    caption: 'Hong Kong views',
    aspect: 'landscape',
  },
  {
    id: 'g5',
    src: '/images/happy-hanoi-couple.jpg',
    alt: 'Couple posing on Hanoi Train Street',
    caption: 'Hanoi Train Street',
    aspect: 'portrait',
  },
  {
    id: 'g6',
    src: '/images/happy-statues-group.jpg',
    alt: 'Travelers giving thumbs up beside cultural statues',
    caption: 'Highland adventures',
    aspect: 'landscape',
  },
  {
    id: 'g7',
    src: '/images/happy-family-van.jpg',
    alt: 'Family with tour van after a day trip',
    caption: 'Ready for the road',
    aspect: 'landscape',
  },
  {
    id: 'g8',
    src: '/images/happy-obligars.jpg',
    alt: 'Team and guests at Obligar’s Pottery with decorated tour van',
    caption: 'Obligar’s Pottery',
    aspect: 'landscape',
  },
  {
    id: 'g9',
    src: '/images/travelers-night-boat.jpg',
    alt: 'Travelers smiling on a boat deck at night',
    caption: 'Night views on the water',
    aspect: 'landscape',
  },
  {
    id: 'g10',
    src: '/images/hero-palawan.jpg',
    alt: 'Aerial view of a turquoise lagoon surrounded by limestone cliffs',
    caption: 'Island waters',
    aspect: 'portrait',
  },
  {
    id: 'g11',
    src: '/images/promo-bali-top5.jpg',
    alt: 'Collage of popular Bali experiences',
    caption: 'Bali moments',
    aspect: 'landscape',
  },
  {
    id: 'g12',
    src: '/images/promo-ph-destinations.jpg',
    alt: 'Promotional collage of El Nido, Legazpi, and Boracay',
    caption: 'Philippine favorites',
    aspect: 'landscape',
  },
]

/**
 * Only verified written testimonials should be added here.
 * Happy-customer photos live in the gallery — do not invent quotes.
 */
export const testimonials: Testimonial[] = []
