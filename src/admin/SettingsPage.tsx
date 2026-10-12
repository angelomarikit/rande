import { useEffect, useState } from 'react'
import { useSiteContent } from '@/context/ContentContext'
import { supabase } from '@/lib/supabase'
import type { SiteSettings } from '@/types/cms'
import { AdminButton, AdminCard, AdminField, AdminInput, AdminTextarea, ImageUploadField, StatusBanner } from './ui'

export function SettingsPage() {
  const { content, refresh } = useSiteContent()
  const [form, setForm] = useState<SiteSettings>(content.settings)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(content.settings)
  }, [content.settings])

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const save = async () => {
    if (!supabase) {
      setError('Supabase is not configured.')
      return
    }
    setSaving(true)
    setStatus('')
    setError('')
    const { error: saveError } = await supabase.from('site_settings').upsert({
      id: 1,
      data: form,
    })
    if (saveError) setError(saveError.message)
    else {
      setStatus('Settings saved.')
      await refresh()
    }
    setSaving(false)
  }

  return (
    <div className="grid gap-6">
      <AdminCard
        title="Company & contact"
        actions={
          <AdminButton onClick={() => void save()} disabled={saving}>
            {saving ? 'Saving…' : 'Save settings'}
          </AdminButton>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Company name">
            <AdminInput value={form.companyName} onChange={(e) => set('companyName', e.target.value)} />
          </AdminField>
          <AdminField label="Legal name">
            <AdminInput value={form.legalName} onChange={(e) => set('legalName', e.target.value)} />
          </AdminField>
          <AdminField label="Since year">
            <AdminInput
              type="number"
              value={form.sinceYear}
              onChange={(e) => set('sinceYear', Number(e.target.value) || form.sinceYear)}
            />
          </AdminField>
          <AdminField label="Tagline">
            <AdminInput value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
          </AdminField>
          <div className="sm:col-span-2">
            <AdminField label="Description">
              <AdminTextarea
                rows={3}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />
            </AdminField>
          </div>
          <AdminField label="Phone">
            <AdminInput value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </AdminField>
          <AdminField label="Phone display">
            <AdminInput value={form.phoneDisplay} onChange={(e) => set('phoneDisplay', e.target.value)} />
          </AdminField>
          <AdminField label="Secondary phone">
            <AdminInput value={form.phoneSecondary} onChange={(e) => set('phoneSecondary', e.target.value)} />
          </AdminField>
          <AdminField label="WhatsApp number (digits)">
            <AdminInput value={form.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} />
          </AdminField>
          <AdminField label="Email">
            <AdminInput value={form.email} onChange={(e) => set('email', e.target.value)} />
          </AdminField>
          <AdminField label="Facebook URL">
            <AdminInput value={form.facebookUrl} onChange={(e) => set('facebookUrl', e.target.value)} />
          </AdminField>
          <AdminField label="Instagram URL">
            <AdminInput value={form.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} />
          </AdminField>
          <AdminField label="Messenger URL">
            <AdminInput value={form.messengerUrl} onChange={(e) => set('messengerUrl', e.target.value)} />
          </AdminField>
          <div className="sm:col-span-2">
            <AdminField label="Business address">
              <AdminInput value={form.businessAddress} onChange={(e) => set('businessAddress', e.target.value)} />
            </AdminField>
          </div>
          <AdminField label="Pickup note">
            <AdminInput value={form.pickupNote} onChange={(e) => set('pickupNote', e.target.value)} />
          </AdminField>
          <AdminField label="Site URL (live domain)">
            <AdminInput value={form.siteUrl} onChange={(e) => set('siteUrl', e.target.value)} />
          </AdminField>
          <AdminField label="DOT number">
            <AdminInput
              value={form.dotAccreditation.number}
              onChange={(e) =>
                set('dotAccreditation', { ...form.dotAccreditation, number: e.target.value })
              }
            />
          </AdminField>
          <AdminField label="DOT classification">
            <AdminInput
              value={form.dotAccreditation.classification}
              onChange={(e) =>
                set('dotAccreditation', {
                  ...form.dotAccreditation,
                  classification: e.target.value,
                })
              }
            />
          </AdminField>
          <div className="sm:col-span-2">
            <ImageUploadField
              label="Logo URL"
              value={form.logoUrl}
              folder="brand"
              onChange={(url) => set('logoUrl', url)}
            />
          </div>
          <div className="sm:col-span-2">
            <ImageUploadField
              label="OG / share image"
              value={form.ogImagePath}
              folder="brand"
              onChange={(url) => set('ogImagePath', url)}
            />
          </div>
          <div className="sm:col-span-2">
            <ImageUploadField
              label="DOT accreditation image"
              value={form.dotAccreditation.image}
              folder="brand"
              onChange={(url) =>
                set('dotAccreditation', { ...form.dotAccreditation, image: url })
              }
            />
          </div>
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
