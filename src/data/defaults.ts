import { destinations } from '@/data/destinations'
import { faqs } from '@/data/faqs'
import { galleryItems, testimonials } from '@/data/gallery'
import { packages } from '@/data/packages'
import { siteConfig } from '@/data/site'
import type { PageSections, SiteContent, SiteSettings } from '@/types/cms'

export function getDefaultSettings(): SiteSettings {
  return {
    companyName: siteConfig.companyName,
    legalName: siteConfig.legalName,
    sinceYear: siteConfig.sinceYear,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phoneDisplay,
    phoneSecondary: siteConfig.phoneSecondary,
    email: siteConfig.email,
    messengerUrl: siteConfig.messengerUrl,
    facebookUrl: siteConfig.facebookUrl,
    instagramUrl: siteConfig.instagramUrl,
    whatsappNumber: siteConfig.whatsappNumber,
    businessAddress: siteConfig.businessAddress,
    googleMapsUrl: siteConfig.googleMapsUrl,
    pickupNote: siteConfig.pickupNote,
    ogImagePath: siteConfig.ogImagePath,
    siteUrl: siteConfig.siteUrl,
    logoUrl: '/images/logo-rande.png',
    dotAccreditation: { ...siteConfig.dotAccreditation },
  }
}

export function getDefaultSections(): PageSections {
  return {
    hero: {
      eyebrow: 'Your next adventure starts here',
      heading: 'The world is waiting. Let’s go explore.',
      support:
        'From island escapes to unforgettable journeys abroad, discover travel experiences worth remembering with Rande Travel and Tours.',
      primaryCta: 'Explore Tour Packages',
      secondaryCta: 'Plan My Trip',
      destinationLabel: 'Discover Palawan, Philippines',
      image: '/images/hero-palawan.jpg',
      imageAlt:
        'Aerial view of a turquoise lagoon framed by limestone cliffs in Palawan',
    },
    trip_finder: {
      title: 'Where will your next journey take you?',
      support:
        'Tell us a few details — we’ll point you to matching packages or open an inquiry.',
      ctaLabel: 'Find My Trip',
    },
    destinations: {
      eyebrow: 'Featured destinations',
      title: 'Places you’ll fall in love with.',
      support:
        'Find your next escape, near or far. Some spots below are active tour routes; others are inspiration for custom trips.',
    },
    packages: {
      eyebrow: 'Tour packages',
      title: 'Thoughtfully planned. Beautifully experienced.',
      support:
        'Less time planning. More time making memories. Rates below come from our tour materials and may change — inquire to confirm.',
    },
    why_rande: {
      eyebrow: 'Why travel with us',
      title: 'Your journey matters to us.',
      support:
        'We’re here to make planning feel lighter — so you can focus on the places and people you’ll remember.',
      image: '/images/happy-bautista-house.jpg',
      imageAlt: 'Happy travelers and staff at Bautista House',
      badgeTitle: `Since ${siteConfig.sinceYear}`,
      badgeBody: 'Real tours, real travelers, planned with care.',
      accreditationImage: siteConfig.dotAccreditation.image,
      features: [
        {
          title: `Established since ${siteConfig.sinceYear}`,
          body: 'Years of helping travelers from San Juan, Batangas and beyond plan trips that actually happen.',
        },
        {
          title: 'DOT Basic Accredited',
          body: `${siteConfig.dotAccreditation.classification}. Accreditation No. ${siteConfig.dotAccreditation.number}.`,
        },
        {
          title: 'Personalized travel assistance',
          body: 'Private day tours, shared departures, resort stays, or a custom plan — we tailor the conversation to your group.',
        },
        {
          title: 'Convenient trip planning',
          body: 'Clear inclusions, sensible routes, and pickup options so you’re not piecing everything together alone.',
        },
        {
          title: 'Support through the process',
          body: 'From first inquiry to final arrangements, you’ll have someone to ask when details need sorting out.',
        },
      ],
    },
    about: {
      eyebrow: 'Our story',
      title: 'More than a destination. A memory you’ll keep.',
      support:
        'Travel is better when someone helps with the details — routes, timing, and the little things that make a group trip feel easy.',
      paragraphs: [
        `${siteConfig.companyName} has been helping travelers plan domestic adventures and select journeys abroad since ${siteConfig.sinceYear}. Based in San Juan, Batangas, we work with families, barkadas, and groups who want clear options and a friendly hand through the planning process.`,
        'Whether it’s a half-day heritage walk, a crater-lake trek, a highlands shared tour, or a Japan package — we start with where you want to go and build from there.',
      ],
      ctaLabel: 'Get to Know Us',
      imagePrimary: '/images/happy-white-house.jpg',
      imageSecondary: '/images/happy-casa-soledad.jpg',
      videoPoster: '/images/resort-pool.jpg',
      videoSrc: '/videos/travel-moments.mp4',
    },
    process: {
      eyebrow: 'How it works',
      title: 'Your next getaway in three simple steps.',
      support:
        'An inquiry is only a request until we respond and confirm the details with you.',
      steps: [
        {
          num: '01',
          title: 'Choose Your Adventure',
          body: 'Browse destinations or tell us where you dream of going.',
        },
        {
          num: '02',
          title: 'Let’s Plan It Together',
          body: 'Share your dates, group size, and travel preferences.',
        },
        {
          num: '03',
          title: 'Get Ready to Explore',
          body: 'Review your personalized travel arrangements and prepare for the trip.',
        },
      ],
    },
    happy_travelers: {
      eyebrow: 'Happy travelers',
      title: 'Real trips. Real smiles.',
      support:
        'Moments from tours with Rande Travel and Tours — no staged stock quotes, just photos from the road.',
    },
    gallery: {
      eyebrow: 'Travel gallery',
      title: 'Moments worth traveling for.',
      support:
        'Happy travelers, heritage stops, and destination favorites from our tours — click any photo to expand.',
    },
    faqs: {
      eyebrow: 'FAQs',
      title: 'Questions before you take off?',
      support:
        'Straight answers about inquiries — without inventing policies we haven’t published yet.',
    },
    final_cta: {
      eyebrow: 'Ready when you are',
      title: 'Ready to make your next great memory?',
      support: 'Tell us where you want to go. We’ll help you take the first step.',
      primaryCta: 'Plan My Trip',
      secondaryCta: 'Explore Destinations',
      image: '/images/resort-pool.jpg',
    },
    contact: {
      eyebrow: 'Plan my trip',
      title: 'Tell us about your trip.',
      support:
        'Share a few details and we’ll follow up. This form does not auto-book — it helps us prepare a quotation.',
      formNote: siteConfig.pickupNote,
    },
  }
}

export function getStaticSiteContent(): SiteContent {
  return {
    settings: getDefaultSettings(),
    sections: getDefaultSections(),
    destinations: [...destinations],
    packages: [...packages],
    gallery: [...galleryItems],
    faqs: [...faqs],
    testimonials: [...testimonials],
    source: 'static',
  }
}
