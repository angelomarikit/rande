import { getStaticSiteContent } from '@/data/defaults'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type {
  PageSections,
  SectionKey,
  SiteContent,
  SiteSettings,
} from '@/types/cms'
import type {
  Destination,
  FaqItem,
  GalleryItem,
  Testimonial,
  TourPackage,
} from '@/types'

function rowData<T>(rows: { id?: string; key?: string; data?: unknown; content?: unknown; sort_order?: number }[] | null): T[] {
  if (!rows?.length) return []
  return [...rows]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((row) => {
      const payload = (row.data ?? row.content) as T
      return payload
    })
}

function normalizeDestination(item: Destination): Destination {
  return {
    ...item,
    name: item.name ?? '',
    location: item.location ?? '',
    description: item.description ?? '',
    image: item.image ?? '',
    size: item.size ?? 'medium',
    tags: item.tags ?? [],
    relatedPackageIds: item.relatedPackageIds ?? [],
  }
}

function normalizePackage(item: TourPackage): TourPackage {
  return {
    ...item,
    title: item.title ?? '',
    destination: item.destination ?? '',
    summary: item.summary ?? '',
    image: item.image ?? '',
    category: item.category ?? [],
    highlights: item.highlights ?? [],
    inclusions: item.inclusions ?? [],
    exclusions: item.exclusions ?? [],
    travelDates: item.travelDates ?? [],
    itinerary: (item.itinerary ?? []).map((day) => ({
      day: day.day ?? '',
      items: day.items ?? [],
    })),
  }
}

function normalizeGalleryItem(item: GalleryItem): GalleryItem {
  return {
    ...item,
    src: item.src ?? '',
    alt: item.alt ?? '',
    caption: item.caption ?? '',
    aspect: item.aspect ?? 'landscape',
  }
}

function normalizeFaq(item: FaqItem): FaqItem {
  return {
    ...item,
    question: item.question ?? '',
    answer: item.answer ?? '',
  }
}

export async function loadSiteContent(): Promise<SiteContent> {
  const fallback = getStaticSiteContent()

  if (!isSupabaseConfigured || !supabase) {
    return fallback
  }

  try {
    const [
      settingsRes,
      sectionsRes,
      destinationsRes,
      packagesRes,
      galleryRes,
      faqsRes,
      testimonialsRes,
    ] = await Promise.all([
      supabase.from('site_settings').select('data').eq('id', 1).maybeSingle(),
      supabase.from('page_sections').select('key, content'),
      supabase.from('destinations').select('id, data, sort_order').order('sort_order'),
      supabase.from('packages').select('id, data, sort_order').order('sort_order'),
      supabase.from('gallery_items').select('id, data, sort_order').order('sort_order'),
      supabase.from('faqs').select('id, data, sort_order').order('sort_order'),
      supabase.from('testimonials').select('id, data, sort_order').order('sort_order'),
    ])

    const hasAnyCmsData =
      settingsRes.data ||
      (sectionsRes.data && sectionsRes.data.length > 0) ||
      (destinationsRes.data && destinationsRes.data.length > 0) ||
      (packagesRes.data && packagesRes.data.length > 0)

    if (!hasAnyCmsData) {
      return fallback
    }

    const settings: SiteSettings = settingsRes.data?.data
      ? { ...fallback.settings, ...(settingsRes.data.data as SiteSettings) }
      : fallback.settings

    const sections: PageSections = { ...fallback.sections }
    for (const row of sectionsRes.data ?? []) {
      const key = row.key as SectionKey
      if (key in sections) {
        // Merge CMS JSON over defaults per section key
        Object.assign(sections[key], row.content as object)
      }
    }

    const destinations =
      destinationsRes.data?.length
        ? rowData<Destination>(destinationsRes.data).map(normalizeDestination)
        : fallback.destinations

    const packages =
      packagesRes.data?.length
        ? rowData<TourPackage>(packagesRes.data).map(normalizePackage)
        : fallback.packages

    const gallery =
      galleryRes.data?.length
        ? rowData<GalleryItem>(galleryRes.data).map(normalizeGalleryItem)
        : fallback.gallery

    const faqs =
      faqsRes.data?.length
        ? rowData<FaqItem>(faqsRes.data).map(normalizeFaq)
        : fallback.faqs

    const testimonials =
      testimonialsRes.data?.length
        ? rowData<Testimonial>(testimonialsRes.data)
        : fallback.testimonials

    return {
      settings,
      sections,
      destinations,
      packages,
      gallery,
      faqs,
      testimonials,
      source: 'supabase',
    }
  } catch (error) {
    console.warn('Failed to load CMS content; using static fallback.', error)
    return fallback
  }
}

/** Push current static website defaults into Supabase (first-time setup). */
export async function syncStaticDefaultsToSupabase(): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured.' }
  }

  const content = getStaticSiteContent()

  const { error: settingsError } = await supabase.from('site_settings').upsert({
    id: 1,
    data: content.settings,
  })
  if (settingsError) return { ok: false, error: settingsError.message }

  const sectionRows = Object.entries(content.sections).map(([key, sectionContent]) => ({
    key,
    content: sectionContent,
  }))
  const { error: sectionsError } = await supabase.from('page_sections').upsert(sectionRows)
  if (sectionsError) return { ok: false, error: sectionsError.message }

  const { error: destError } = await supabase.from('destinations').upsert(
    content.destinations.map((item, index) => ({
      id: item.id,
      data: item,
      sort_order: index,
    })),
  )
  if (destError) return { ok: false, error: destError.message }

  const { error: pkgError } = await supabase.from('packages').upsert(
    content.packages.map((item, index) => ({
      id: item.id,
      data: item,
      sort_order: index,
    })),
  )
  if (pkgError) return { ok: false, error: pkgError.message }

  const { error: galleryError } = await supabase.from('gallery_items').upsert(
    content.gallery.map((item, index) => ({
      id: item.id,
      data: item,
      sort_order: index,
    })),
  )
  if (galleryError) return { ok: false, error: galleryError.message }

  const { error: faqError } = await supabase.from('faqs').upsert(
    content.faqs.map((item, index) => ({
      id: item.id,
      data: item,
      sort_order: index,
    })),
  )
  if (faqError) return { ok: false, error: faqError.message }

  if (content.testimonials.length) {
    const { error: testimonialError } = await supabase.from('testimonials').upsert(
      content.testimonials.map((item, index) => ({
        id: item.id,
        data: item,
        sort_order: index,
      })),
    )
    if (testimonialError) return { ok: false, error: testimonialError.message }
  }

  return { ok: true }
}

export async function uploadMedia(file: File, folder = 'uploads'): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error

  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}
