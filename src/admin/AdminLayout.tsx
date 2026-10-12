import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from './AdminAuth'
import { AdminButton } from './ui'

const links = [
  { to: '/admin', end: true, label: 'Dashboard' },
  { to: '/admin/settings', label: 'Site settings' },
  { to: '/admin/sections', label: 'Page sections' },
  { to: '/admin/destinations', label: 'Destinations' },
  { to: '/admin/packages', label: 'Packages' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/faqs', label: 'FAQs' },
]

export function AdminLayout() {
  const { user, loading, configured, signOut } = useAdminAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-muted-bg text-ocean-navy">
        Loading admin…
      </div>
    )
  }

  if (!configured) {
    return <Navigate to="/admin/login" replace />
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-svh bg-muted-bg text-dark-text">
      <header className="border-b border-ocean-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-tropical-green uppercase">
              CMS
            </p>
            <h1 className="font-display text-xl font-bold text-ocean-navy">
              Rande Travel Admin
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-ocean-navy hover:bg-muted-bg"
            >
              View site
            </a>
            <AdminButton variant="secondary" onClick={() => void signOut()}>
              Sign out
            </AdminButton>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${
                  isActive
                    ? 'bg-tropical-green text-white'
                    : 'text-ocean-navy/70 hover:bg-muted-bg hover:text-ocean-navy'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}
