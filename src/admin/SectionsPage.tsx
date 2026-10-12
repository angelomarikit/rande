import { useEffect, useState } from 'react'
import { useSiteContent } from '@/context/ContentContext'
import { supabase } from '@/lib/supabase'
import type { PageSections, SectionKey } from '@/types/cms'
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminTextarea,
  ImageUploadField,
  StatusBanner,
} from './ui'

const sectionLabels: Record<SectionKey, string> = {
  hero: 'Hero',
  trip_finder: 'Trip finder',
  destinations: 'Destinations heading',
  packages: 'Packages heading',
  why_rande: 'Why travel with us',
  about: 'About',
  process: 'Process',
  happy_travelers: 'Happy travelers',
  gallery: 'Gallery heading',
  faqs: 'FAQs heading',
  final_cta: 'Final CTA',
  contact: 'Contact heading',
}

export function SectionsPage() {
  const { content, refresh } = useSiteContent()
  const [active, setActive] = useState<SectionKey>('hero')
  const [sections, setSections] = useState<PageSections>(content.sections)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setSections(content.sections)
  }, [content.sections])

  const current = sections[active]

  const updateCurrent = (patch: Record<string, unknown>) => {
    setSections((prev) => ({
      ...prev,
      [active]: { ...prev[active], ...patch },
    }))
  }

  const save = async () => {
    if (!supabase) {
      setError('Supabase is not configured.')
      return
    }
    setSaving(true)
    setStatus('')
    setError('')
    const { error: saveError } = await supabase.from('page_sections').upsert({
      key: active,
      content: sections[active],
    })
    if (saveError) setError(saveError.message)
    else {
      setStatus(`${sectionLabels[active]} saved.`)
      await refresh()
    }
    setSaving(false)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-ocean-navy/10 bg-white p-3">
        <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-ocean-navy/55 uppercase">
          Sections
        </p>
        <div className="flex flex-col gap-1">
          {(Object.keys(sectionLabels) as SectionKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                active === key
                  ? 'bg-tropical-green text-white'
                  : 'text-ocean-navy/75 hover:bg-muted-bg'
              }`}
            >
              {sectionLabels[key]}
            </button>
          ))}
        </div>
      </aside>

      <AdminCard
        title={sectionLabels[active]}
        actions={
          <AdminButton onClick={() => void save()} disabled={saving}>
            {saving ? 'Saving…' : 'Save section'}
          </AdminButton>
        }
      >
        <div className="grid gap-4">
          {'eyebrow' in current && typeof current.eyebrow === 'string' ? (
            <AdminField label="Eyebrow">
              <AdminInput
                value={current.eyebrow ?? ''}
                onChange={(e) => updateCurrent({ eyebrow: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'title' in current && typeof (current as { title?: string }).title === 'string' ? (
            <AdminField label="Title">
              <AdminInput
                value={(current as { title: string }).title}
                onChange={(e) => updateCurrent({ title: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'heading' in current ? (
            <AdminField label="Heading">
              <AdminInput
                value={(current as { heading: string }).heading}
                onChange={(e) => updateCurrent({ heading: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'support' in current ? (
            <AdminField label="Support text">
              <AdminTextarea
                rows={3}
                value={(current as { support?: string }).support ?? ''}
                onChange={(e) => updateCurrent({ support: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'ctaLabel' in current ? (
            <AdminField label="CTA label">
              <AdminInput
                value={(current as { ctaLabel: string }).ctaLabel}
                onChange={(e) => updateCurrent({ ctaLabel: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'primaryCta' in current ? (
            <AdminField label="Primary CTA">
              <AdminInput
                value={(current as { primaryCta: string }).primaryCta}
                onChange={(e) => updateCurrent({ primaryCta: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'secondaryCta' in current ? (
            <AdminField label="Secondary CTA">
              <AdminInput
                value={(current as { secondaryCta: string }).secondaryCta}
                onChange={(e) => updateCurrent({ secondaryCta: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'destinationLabel' in current ? (
            <AdminField label="Destination label">
              <AdminInput
                value={(current as { destinationLabel: string }).destinationLabel}
                onChange={(e) => updateCurrent({ destinationLabel: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'formNote' in current ? (
            <AdminField label="Form note">
              <AdminInput
                value={(current as { formNote: string }).formNote}
                onChange={(e) => updateCurrent({ formNote: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'image' in current ? (
            <ImageUploadField
              label="Section image"
              value={(current as { image: string }).image}
              folder="sections"
              onChange={(url) => updateCurrent({ image: url })}
            />
          ) : null}
          {'imageAlt' in current ? (
            <AdminField label="Image alt">
              <AdminInput
                value={(current as { imageAlt: string }).imageAlt}
                onChange={(e) => updateCurrent({ imageAlt: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'imagePrimary' in current ? (
            <ImageUploadField
              label="Primary image"
              value={(current as { imagePrimary: string }).imagePrimary}
              folder="sections"
              onChange={(url) => updateCurrent({ imagePrimary: url })}
            />
          ) : null}
          {'imageSecondary' in current ? (
            <ImageUploadField
              label="Secondary image"
              value={(current as { imageSecondary: string }).imageSecondary}
              folder="sections"
              onChange={(url) => updateCurrent({ imageSecondary: url })}
            />
          ) : null}
          {'videoPoster' in current ? (
            <ImageUploadField
              label="Video poster"
              value={(current as { videoPoster: string }).videoPoster}
              folder="sections"
              onChange={(url) => updateCurrent({ videoPoster: url })}
            />
          ) : null}
          {'videoSrc' in current ? (
            <AdminField label="Video URL">
              <AdminInput
                value={(current as { videoSrc: string }).videoSrc}
                onChange={(e) => updateCurrent({ videoSrc: e.target.value })}
              />
            </AdminField>
          ) : null}
          {'paragraphs' in current ? (
            <AdminField label="Paragraphs (one per line)">
              <AdminTextarea
                rows={5}
                value={((current as { paragraphs: string[] }).paragraphs ?? []).join('\n')}
                onChange={(e) =>
                  updateCurrent({
                    paragraphs: e.target.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean),
                  })
                }
              />
            </AdminField>
          ) : null}
          {'features' in current ? (
            <AdminField label="Features (title | body per line)">
              <AdminTextarea
                rows={8}
                value={((current as { features: { title: string; body: string }[] }).features ?? [])
                  .map((f) => `${f.title} | ${f.body}`)
                  .join('\n')}
                onChange={(e) =>
                  updateCurrent({
                    features: e.target.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line) => {
                        const [title, ...rest] = line.split('|')
                        return {
                          title: title.trim(),
                          body: rest.join('|').trim(),
                        }
                      }),
                  })
                }
              />
            </AdminField>
          ) : null}
          {'steps' in current ? (
            <AdminField label="Steps (num | title | body per line)">
              <AdminTextarea
                rows={6}
                value={((
                  current as { steps: { num: string; title: string; body: string }[] }
                ).steps ?? [])
                  .map((s) => `${s.num} | ${s.title} | ${s.body}`)
                  .join('\n')}
                onChange={(e) =>
                  updateCurrent({
                    steps: e.target.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line) => {
                        const [num, title, ...rest] = line.split('|')
                        return {
                          num: (num ?? '').trim(),
                          title: (title ?? '').trim(),
                          body: rest.join('|').trim(),
                        }
                      }),
                  })
                }
              />
            </AdminField>
          ) : null}
          {'accreditationImage' in current ? (
            <ImageUploadField
              label="Accreditation image"
              value={(current as { accreditationImage?: string }).accreditationImage ?? ''}
              folder="sections"
              onChange={(url) => updateCurrent({ accreditationImage: url })}
            />
          ) : null}
        </div>
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
  )
}
