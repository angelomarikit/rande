import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteContent } from '@/context/ContentContext'
import { syncStaticDefaultsToSupabase } from '@/lib/content'
import { isSupabaseConfigured } from '@/lib/supabase'
import { AdminButton, AdminCard, StatusBanner } from './ui'

export function DashboardPage() {
  const { content, refresh } = useSiteContent()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const sync = async () => {
    setBusy(true)
    setMessage('')
    setError('')
    const result = await syncStaticDefaultsToSupabase()
    if (result.ok) {
      setMessage('Website defaults synced to Supabase. Refreshing…')
      await refresh()
    } else {
      setError(result.error)
    }
    setBusy(false)
  }

  return (
    <div className="grid gap-6">
      <AdminCard title="Overview">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Content source', content.source],
            ['Packages', String(content.packages.length)],
            ['Destinations', String(content.destinations.length)],
            ['Gallery items', String(content.gallery.length)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-muted-bg px-4 py-3">
              <p className="text-xs tracking-wide text-ocean-navy/60 uppercase">{label}</p>
              <p className="mt-1 font-display text-xl font-bold text-ocean-navy">{value}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard
        title="First-time setup"
        actions={
          <AdminButton onClick={() => void sync()} disabled={busy || !isSupabaseConfigured}>
            {busy ? 'Syncing…' : 'Sync website defaults to Supabase'}
          </AdminButton>
        }
      >
        <p className="text-sm text-dark-text/70">
          After creating tables in Supabase, click sync once to copy the current landing page
          content into the CMS. Then edit anything from the admin menus.
        </p>
        {message ? (
          <div className="mt-4">
            <StatusBanner tone="ok">{message}</StatusBanner>
          </div>
        ) : null}
        {error ? (
          <div className="mt-4">
            <StatusBanner tone="error">{error}</StatusBanner>
          </div>
        ) : null}
      </AdminCard>

      <AdminCard title="Quick links">
        <div className="flex flex-wrap gap-2">
          {[
            ['/admin/settings', 'Site settings'],
            ['/admin/sections', 'Page sections'],
            ['/admin/packages', 'Packages'],
            ['/admin/gallery', 'Gallery'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="rounded-xl bg-muted-bg px-4 py-2 text-sm font-semibold text-ocean-navy hover:bg-tropical-green/10"
            >
              {label}
            </Link>
          ))}
        </div>
      </AdminCard>
    </div>
  )
}
