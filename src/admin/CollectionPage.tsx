import { useEffect, useMemo, useState } from 'react'
import { useSiteContent } from '@/context/ContentContext'
import { supabase } from '@/lib/supabase'
import type { Destination, FaqItem, GalleryItem, TourPackage, TravelCategory } from '@/types'
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminModal,
  AdminTextarea,
  ImageUploadField,
  StatusBanner,
} from './ui'

type CollectionKind = 'destinations' | 'packages' | 'gallery' | 'faqs'
type CollectionItem = Destination | TourPackage | GalleryItem | FaqItem

const tableMap: Record<CollectionKind, string> = {
  destinations: 'destinations',
  packages: 'packages',
  gallery: 'gallery_items',
  faqs: 'faqs',
}

const kindMeta: Record<
  CollectionKind,
  { title: string; tip: string; addLabel: string; modalTitle: string; modalHelp: string }
> = {
  destinations: {
    title: 'Destinations',
    tip: 'These appear in the “Places you’ll fall in love with” section and Trip Finder. Use a clear photo and short description.',
    addLabel: 'Add destination',
    modalTitle: 'Add a destination',
    modalHelp:
      'Fill in the details below, then click Save. The destination will appear on the website after saving.',
  },
  packages: {
    title: 'Tour packages',
    tip: 'These appear in Tour Packages. Put one item per line for lists like highlights and inclusions.',
    addLabel: 'Add package',
    modalTitle: 'Add a tour package',
    modalHelp:
      'Enter the package details customers should see. You can edit more later from the list on the left.',
  },
  gallery: {
    title: 'Gallery photos',
    tip: 'These appear in the Travel Gallery and Happy Travelers areas.',
    addLabel: 'Add photo',
    modalTitle: 'Add a gallery photo',
    modalHelp: 'Upload a photo and add a short caption so guests know what they’re looking at.',
  },
  faqs: {
    title: 'FAQs',
    tip: 'These appear in the Questions accordion near the bottom of the page.',
    addLabel: 'Add FAQ',
    modalTitle: 'Add a FAQ',
    modalHelp: 'Write the question the way customers ask it, then add a clear answer.',
  },
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

function linesToList(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function listToLines(value?: string[]): string {
  return (value ?? []).join('\n')
}

function itemLabel(item: CollectionItem): string {
  if ('name' in item && item.name) return item.name
  if ('title' in item && item.title) return item.title
  if ('question' in item && item.question) return item.question
  if ('caption' in item && item.caption) return item.caption
  return item.id
}

function createEmptyDraft(kind: CollectionKind): CollectionItem {
  const stamp = Date.now()

  if (kind === 'destinations') {
    return {
      id: `des-${stamp}`,
      name: '',
      location: '',
      description: '',
      image: '',
      size: 'medium',
      tags: [],
      relatedPackageIds: [],
    }
  }

  if (kind === 'packages') {
    return {
      id: `pac-${stamp}`,
      title: '',
      destination: '',
      duration: '',
      category: ['domestic'],
      image: '',
      summary: '',
      highlights: [],
      inclusions: [],
      exclusions: [],
      travelDates: [],
      featured: false,
    }
  }

  if (kind === 'gallery') {
    return {
      id: `gal-${stamp}`,
      src: '',
      alt: '',
      caption: '',
      aspect: 'landscape',
    }
  }

  return {
    id: `faq-${stamp}`,
    question: '',
    answer: '',
  }
}

function finalizeId(kind: CollectionKind, item: CollectionItem): string {
  if (kind === 'destinations') {
    const dest = item as Destination
    return slugify(dest.name) || dest.id
  }
  if (kind === 'packages') {
    const pkg = item as TourPackage
    return slugify(pkg.title) || pkg.id
  }
  if (kind === 'faqs') {
    const faq = item as FaqItem
    return slugify(faq.question) || faq.id
  }
  return item.id
}

function validateItem(kind: CollectionKind, item: CollectionItem): string | null {
  if (kind === 'destinations') {
    const dest = item as Destination
    if (!dest.name.trim()) return 'Please enter a destination name.'
    if (!dest.location.trim()) return 'Please enter the location.'
    if (!dest.description.trim()) return 'Please enter a short description.'
    if (!dest.image.trim()) return 'Please upload or paste a photo.'
    return null
  }

  if (kind === 'packages') {
    const pkg = item as TourPackage
    if (!pkg.title.trim()) return 'Please enter a package title.'
    if (!pkg.destination.trim()) return 'Please enter the destination.'
    if (!pkg.summary.trim()) return 'Please enter a short summary.'
    if (!pkg.image.trim()) return 'Please upload or paste a package photo.'
    if (!pkg.category.length) return 'Please choose at least one category.'
    return null
  }

  if (kind === 'gallery') {
    const photo = item as GalleryItem
    if (!photo.src.trim()) return 'Please upload or paste a photo.'
    if (!photo.caption?.trim() && !photo.alt.trim()) {
      return 'Please add a caption or alt text.'
    }
    return null
  }

  const faq = item as FaqItem
  if (!faq.question.trim()) return 'Please enter a question.'
  if (!faq.answer.trim()) return 'Please enter an answer.'
  return null
}

export function CollectionPage({ kind }: { kind: CollectionKind }) {
  const { content, refresh } = useSiteContent()
  const meta = kindMeta[kind]
  const [items, setItems] = useState<CollectionItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draft, setDraft] = useState<CollectionItem | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [addDraft, setAddDraft] = useState<CollectionItem | null>(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [modalError, setModalError] = useState('')
  const [saving, setSaving] = useState(false)

  const sourceItems = useMemo(() => {
    if (kind === 'destinations') return content.destinations
    if (kind === 'packages') return content.packages
    if (kind === 'gallery') return content.gallery
    return content.faqs
  }, [content, kind])

  useEffect(() => {
    setItems(sourceItems)
    if (!selectedId && sourceItems[0]) {
      setSelectedId(sourceItems[0].id)
      setDraft({ ...sourceItems[0] })
    }
  }, [sourceItems, selectedId])

  const selectItem = (id: string) => {
    const item = items.find((entry) => entry.id === id)
    if (!item) return
    setSelectedId(id)
    setDraft({ ...item })
    setStatus('')
    setError('')
  }

  const openAddModal = () => {
    setAddDraft(createEmptyDraft(kind))
    setModalError('')
    setAddOpen(true)
  }

  const closeAddModal = () => {
    setAddOpen(false)
    setAddDraft(null)
    setModalError('')
  }

  const patchDraft = (patch: Record<string, unknown>) => {
    setDraft((prev) => (prev ? ({ ...prev, ...patch } as CollectionItem) : prev))
  }

  const patchAddDraft = (patch: Record<string, unknown>) => {
    setAddDraft((prev) => (prev ? ({ ...prev, ...patch } as CollectionItem) : prev))
  }

  const persistItem = async (
    item: CollectionItem,
    options?: { replaceId?: string; sortOrder?: number },
  ) => {
    if (!supabase) throw new Error('Supabase is not configured. Connect it first, then try again.')

    const nextId = finalizeId(kind, item)
    const payload = { ...item, id: nextId } as CollectionItem
    const sortOrder = options?.sortOrder ?? 0

    const { error: saveError } = await supabase.from(tableMap[kind]).upsert({
      id: nextId,
      data: payload,
      sort_order: sortOrder,
    })
    if (saveError) throw saveError

    if (options?.replaceId && options.replaceId !== nextId) {
      await supabase.from(tableMap[kind]).delete().eq('id', options.replaceId)
    }

    return payload
  }

  const saveExisting = async () => {
    if (!selectedId || !draft) return
    const validationError = validateItem(kind, draft)
    if (validationError) {
      setError(validationError)
      return
    }

    setSaving(true)
    setStatus('')
    setError('')

    try {
      const sortOrder = items.findIndex((entry) => entry.id === selectedId)
      const payload = await persistItem(draft, {
        replaceId: selectedId,
        sortOrder: sortOrder < 0 ? 0 : sortOrder,
      })
      setItems((prev) => prev.map((entry) => (entry.id === selectedId ? payload : entry)))
      setSelectedId(payload.id)
      setDraft(payload)
      setStatus('Saved. Refresh the website to see the update.')
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }

    setSaving(false)
  }

  const saveNewFromModal = async () => {
    if (!addDraft) return
    const validationError = validateItem(kind, addDraft)
    if (validationError) {
      setModalError(validationError)
      return
    }

    setSaving(true)
    setModalError('')

    try {
      // New items go to the top
      const payload = await persistItem(addDraft, { sortOrder: 0 })

      // Shift existing sort orders lightly by re-upserting current list after prepend
      const nextItems = [payload, ...items.filter((entry) => entry.id !== payload.id)]
      await Promise.all(
        nextItems.map((entry, index) =>
          supabase!.from(tableMap[kind]).upsert({
            id: entry.id,
            data: entry,
            sort_order: index,
          }),
        ),
      )

      setItems(nextItems)
      setSelectedId(payload.id)
      setDraft(payload)
      setStatus(`${itemLabel(payload)} added successfully.`)
      closeAddModal()
      await refresh()
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Could not save. Please try again.')
    }

    setSaving(false)
  }

  const remove = async () => {
    if (!supabase || !selectedId) return
    if (!window.confirm('Delete this item? This cannot be undone.')) return

    setSaving(true)
    setError('')
    const { error: deleteError } = await supabase
      .from(tableMap[kind])
      .delete()
      .eq('id', selectedId)

    if (deleteError) {
      setError(deleteError.message)
      setSaving(false)
      return
    }

    const remaining = items.filter((entry) => entry.id !== selectedId)
    setItems(remaining)
    if (remaining[0]) {
      setSelectedId(remaining[0].id)
      setDraft({ ...remaining[0] })
    } else {
      setSelectedId(null)
      setDraft(null)
    }
    setStatus('Deleted.')
    await refresh()
    setSaving(false)
  }

  return (
    <div className="grid gap-6">
      <StatusBanner tone="info">{meta.tip}</StatusBanner>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-ocean-navy/10 bg-white p-3">
          <div className="mb-3 flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-semibold tracking-wide text-ocean-navy/55 uppercase">
              {meta.title}
            </p>
            <AdminButton onClick={openAddModal}>{meta.addLabel}</AdminButton>
          </div>
          <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-2 py-3 text-sm text-dark-text/55">
                No items yet. Click “{meta.addLabel}” to create one.
              </p>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectItem(item.id)}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                    selectedId === item.id
                      ? 'bg-tropical-green text-white'
                      : 'text-ocean-navy/75 hover:bg-muted-bg'
                  }`}
                >
                  {itemLabel(item)}
                </button>
              ))
            )}
          </div>
        </aside>

        <AdminCard
          title={draft ? `Edit: ${itemLabel(draft)}` : 'Select an item'}
          actions={
            draft ? (
              <div className="flex gap-2">
                <AdminButton variant="danger" onClick={() => void remove()} disabled={saving}>
                  Delete
                </AdminButton>
                <AdminButton onClick={() => void saveExisting()} disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </AdminButton>
              </div>
            ) : (
              <AdminButton onClick={openAddModal}>{meta.addLabel}</AdminButton>
            )
          }
        >
          {!draft ? (
            <p className="text-sm text-dark-text/60">
              Choose an item on the left, or click “{meta.addLabel}” to create a new one in a form.
            </p>
          ) : (
            <ItemFields kind={kind} item={draft} onChange={patchDraft} />
          )}

          {status ? (
            <div className="mt-4">
              <StatusBanner tone="ok">{status}</StatusBanner>
            </div>
          ) : null}
          {error ? (
            <div className="mt-4">
              <StatusBanner tone="error">{error}</StatusBanner>
            </div>
          ) : null}
        </AdminCard>
      </div>

      <AdminModal
        open={addOpen}
        title={meta.modalTitle}
        onClose={closeAddModal}
        footer={
          <>
            <AdminButton variant="secondary" onClick={closeAddModal} disabled={saving}>
              Cancel
            </AdminButton>
            <AdminButton onClick={() => void saveNewFromModal()} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </AdminButton>
          </>
        }
      >
        <div className="mb-4">
          <StatusBanner tone="info">{meta.modalHelp}</StatusBanner>
        </div>
        {addDraft ? (
          <ItemFields kind={kind} item={addDraft} onChange={patchAddDraft} mode="create" />
        ) : null}
        {modalError ? (
          <div className="mt-4">
            <StatusBanner tone="error">{modalError}</StatusBanner>
          </div>
        ) : null}
      </AdminModal>
    </div>
  )
}

function ItemFields({
  kind,
  item,
  onChange,
  mode = 'edit',
}: {
  kind: CollectionKind
  item: CollectionItem
  onChange: (patch: Record<string, unknown>) => void
  mode?: 'create' | 'edit'
}) {
  if (kind === 'destinations') {
    return <DestinationFields item={item as Destination} onChange={onChange} mode={mode} />
  }
  if (kind === 'packages') {
    return <PackageFields item={item as TourPackage} onChange={onChange} mode={mode} />
  }
  if (kind === 'gallery') {
    return <GalleryFields item={item as GalleryItem} onChange={onChange} />
  }
  return <FaqFields item={item as FaqItem} onChange={onChange} />
}

function DestinationFields({
  item,
  onChange,
  mode,
}: {
  item: Destination
  onChange: (patch: Record<string, unknown>) => void
  mode: 'create' | 'edit'
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <p className="sm:col-span-2 text-sm text-dark-text/65">
        Required: name, location, description, and photo.
      </p>
      <AdminField label="Destination name *">
        <AdminInput
          value={item.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Boracay"
        />
      </AdminField>
      <AdminField label="Location / country *">
        <AdminInput
          value={item.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="e.g. Aklan, Philippines"
        />
      </AdminField>
      <div className="sm:col-span-2">
        <AdminField label="Short description *">
          <AdminTextarea
            rows={3}
            value={item.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="1–2 sentences about this place"
          />
        </AdminField>
      </div>
      <div className="sm:col-span-2">
        <ImageUploadField
          label="Photo *"
          value={item.image}
          folder="destinations"
          onChange={(url) => onChange({ image: url })}
        />
      </div>
      <AdminField label="Card size on homepage">
        <select
          className="h-11 rounded-xl border border-ocean-navy/15 bg-white px-3 text-sm"
          value={item.size}
          onChange={(e) => onChange({ size: e.target.value })}
        >
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
      </AdminField>
      <AdminField label="Tags (comma separated)" hint="Example: Beach, Group">
        <AdminInput
          value={item.tags.join(', ')}
          onChange={(e) =>
            onChange({
              tags: e.target.value
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean),
            })
          }
          placeholder="Beach, Custom"
        />
      </AdminField>
      {mode === 'edit' ? (
        <div className="sm:col-span-2">
          <AdminField
            label="Related package IDs (comma separated)"
            hint="Optional. Connect this destination to packages."
          >
            <AdminInput
              value={(item.relatedPackageIds ?? []).join(', ')}
              onChange={(e) =>
                onChange({
                  relatedPackageIds: e.target.value
                    .split(',')
                    .map((id) => id.trim())
                    .filter(Boolean),
                })
              }
            />
          </AdminField>
        </div>
      ) : null}
      <label className="flex items-center gap-2 text-sm text-ocean-navy sm:col-span-2">
        <input
          type="checkbox"
          checked={Boolean(item.sampleContent)}
          onChange={(e) => onChange({ sampleContent: e.target.checked })}
        />
        Mark as inspiration only (not an active package claim)
      </label>
    </div>
  )
}

function PackageFields({
  item,
  onChange,
  mode,
}: {
  item: TourPackage
  onChange: (patch: Record<string, unknown>) => void
  mode: 'create' | 'edit'
}) {
  const categories = item.category ?? []

  const toggleCategory = (value: TravelCategory) => {
    const next = categories.includes(value)
      ? categories.filter((c) => c !== value)
      : [...categories, value]
    onChange({ category: next })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <p className="sm:col-span-2 text-sm text-dark-text/65">
        Required: title, destination, summary, photo, and at least one category.
        {mode === 'create' ? ' You can add more details after saving.' : null}
      </p>
      <AdminField label="Package title *">
        <AdminInput
          value={item.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. San Juan Local Tour"
        />
      </AdminField>
      <AdminField label="Destination shown on card *">
        <AdminInput
          value={item.destination}
          onChange={(e) => onChange({ destination: e.target.value })}
          placeholder="e.g. San Juan, Batangas"
        />
      </AdminField>
      <AdminField label="Region (optional)">
        <AdminInput
          value={item.region ?? ''}
          onChange={(e) => onChange({ region: e.target.value })}
        />
      </AdminField>
      <AdminField label="Duration">
        <AdminInput
          value={item.duration ?? ''}
          onChange={(e) => onChange({ duration: e.target.value })}
          placeholder="e.g. 3 days / 2 nights"
        />
      </AdminField>
      <div className="sm:col-span-2">
        <AdminField label="Short summary *">
          <AdminTextarea
            rows={3}
            value={item.summary}
            onChange={(e) => onChange({ summary: e.target.value })}
            placeholder="What makes this trip special?"
          />
        </AdminField>
      </div>
      <div className="sm:col-span-2">
        <ImageUploadField
          label="Package photo *"
          value={item.image}
          folder="packages"
          onChange={(url) => onChange({ image: url })}
        />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
          Categories *
        </legend>
        <div className="flex flex-wrap gap-3">
          {(['domestic', 'international', 'group', 'custom'] as TravelCategory[]).map((cat) => (
            <label key={cat} className="inline-flex items-center gap-2 text-sm capitalize">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </fieldset>
      <AdminField label="Starting price amount" hint="Optional. Leave blank for Request a Quote.">
        <AdminInput
          type="number"
          value={item.fromPrice?.amount ?? ''}
          onChange={(e) => {
            const amount = e.target.value === '' ? undefined : Number(e.target.value)
            if (amount == null || Number.isNaN(amount)) {
              onChange({ fromPrice: undefined })
              return
            }
            onChange({
              fromPrice: {
                amount,
                currency: item.fromPrice?.currency ?? 'PHP',
                note: item.fromPrice?.note ?? 'Per person',
              },
            })
          }}
        />
      </AdminField>
      <AdminField label="Currency">
        <select
          className="h-11 rounded-xl border border-ocean-navy/15 bg-white px-3 text-sm"
          value={item.fromPrice?.currency ?? 'PHP'}
          onChange={(e) => {
            if (!item.fromPrice) {
              onChange({
                fromPrice: {
                  amount: 0,
                  currency: e.target.value as 'PHP' | 'USD',
                  note: 'Per person',
                },
              })
              return
            }
            onChange({
              fromPrice: {
                ...item.fromPrice,
                currency: e.target.value as 'PHP' | 'USD',
              },
            })
          }}
        >
          <option value="PHP">PHP</option>
          <option value="USD">USD</option>
        </select>
      </AdminField>
      <div className="sm:col-span-2">
        <AdminField label="Price note">
          <AdminInput
            value={item.fromPrice?.note ?? ''}
            onChange={(e) => {
              if (!item.fromPrice) return
              onChange({ fromPrice: { ...item.fromPrice, note: e.target.value } })
            }}
            placeholder="e.g. Per person · rates may change"
          />
        </AdminField>
      </div>
      <div className="sm:col-span-2">
        <AdminField label="Highlights (one per line)">
          <AdminTextarea
            rows={4}
            value={listToLines(item.highlights)}
            onChange={(e) => onChange({ highlights: linesToList(e.target.value) })}
            placeholder={'Roundtrip transfer\nTour guide\nEntrance fees'}
          />
        </AdminField>
      </div>
      <div className="sm:col-span-2">
        <AdminField label="Inclusions (one per line)">
          <AdminTextarea
            rows={4}
            value={listToLines(item.inclusions)}
            onChange={(e) => onChange({ inclusions: linesToList(e.target.value) })}
          />
        </AdminField>
      </div>
      <div className="sm:col-span-2">
        <AdminField label="Exclusions (one per line)">
          <AdminTextarea
            rows={4}
            value={listToLines(item.exclusions)}
            onChange={(e) => onChange({ exclusions: linesToList(e.target.value) })}
          />
        </AdminField>
      </div>
      {mode === 'edit' ? (
        <>
          <div className="sm:col-span-2">
            <AdminField label="Travel dates (one per line)">
              <AdminTextarea
                rows={3}
                value={listToLines(item.travelDates)}
                onChange={(e) => onChange({ travelDates: linesToList(e.target.value) })}
                placeholder="e.g. December 12, 2026"
              />
            </AdminField>
          </div>
          <AdminField label="Pickup point">
            <AdminInput
              value={item.pickupPoint ?? ''}
              onChange={(e) => onChange({ pickupPoint: e.target.value })}
            />
          </AdminField>
          <label className="flex items-center gap-2 text-sm text-ocean-navy">
            <input
              type="checkbox"
              checked={Boolean(item.featured)}
              onChange={(e) => onChange({ featured: e.target.checked })}
            />
            Featured package
          </label>
          <div className="sm:col-span-2">
            <AdminField
              label="Itinerary (optional)"
              hint="Format each day as: Day 1 | Stop one; Stop two; Stop three"
            >
              <AdminTextarea
                rows={5}
                value={(item.itinerary ?? [])
                  .map((day) => `${day.day} | ${day.items.join('; ')}`)
                  .join('\n')}
                onChange={(e) =>
                  onChange({
                    itinerary: e.target.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line) => {
                        const [day, rest = ''] = line.split('|')
                        return {
                          day: day.trim(),
                          items: rest
                            .split(';')
                            .map((itemText) => itemText.trim())
                            .filter(Boolean),
                        }
                      }),
                  })
                }
              />
            </AdminField>
          </div>
        </>
      ) : null}
    </div>
  )
}

function GalleryFields({
  item,
  onChange,
}: {
  item: GalleryItem
  onChange: (patch: Record<string, unknown>) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <p className="sm:col-span-2 text-sm text-dark-text/65">
        Required: photo, plus a caption or alt text.
      </p>
      <div className="sm:col-span-2">
        <ImageUploadField
          label="Photo *"
          value={item.src}
          folder="gallery"
          onChange={(url) => onChange({ src: url })}
        />
      </div>
      <AdminField label="Caption">
        <AdminInput
          value={item.caption ?? ''}
          onChange={(e) => onChange({ caption: e.target.value })}
          placeholder="e.g. White House San Juan"
        />
      </AdminField>
      <AdminField label="Photo shape">
        <select
          className="h-11 rounded-xl border border-ocean-navy/15 bg-white px-3 text-sm"
          value={item.aspect}
          onChange={(e) => onChange({ aspect: e.target.value })}
        >
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
          <option value="square">Square</option>
        </select>
      </AdminField>
      <div className="sm:col-span-2">
        <AdminField label="Alt text" hint="Describe the photo for accessibility.">
          <AdminInput
            value={item.alt}
            onChange={(e) => onChange({ alt: e.target.value })}
            placeholder="e.g. Guests smiling at White House San Juan"
          />
        </AdminField>
      </div>
    </div>
  )
}

function FaqFields({
  item,
  onChange,
}: {
  item: FaqItem
  onChange: (patch: Record<string, unknown>) => void
}) {
  return (
    <div className="grid gap-4">
      <p className="text-sm text-dark-text/65">Required: question and answer.</p>
      <AdminField label="Question *">
        <AdminInput
          value={item.question}
          onChange={(e) => onChange({ question: e.target.value })}
          placeholder="e.g. Can I request a customized itinerary?"
        />
      </AdminField>
      <AdminField label="Answer *">
        <AdminTextarea
          rows={6}
          value={item.answer}
          onChange={(e) => onChange({ answer: e.target.value })}
          placeholder="Write a clear answer customers can trust."
        />
      </AdminField>
    </div>
  )
}
