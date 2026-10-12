import { useState, type FormEvent } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAdminAuth } from './AdminAuth'
import { AdminButton, AdminField, AdminInput, StatusBanner } from './ui'

export function LoginPage() {
  const { user, loading, configured, signIn } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await signIn(email.trim(), password)
    if (result.error) setError(result.error)
    setSubmitting(false)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-ocean-navy px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl bg-warm-white p-6 shadow-xl sm:p-8"
      >
        <p className="text-xs font-semibold tracking-[0.16em] text-tropical-green uppercase">
          Admin CMS
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ocean-navy">Sign in</h1>
        <p className="mt-2 text-sm text-dark-text/65">
          Manage landing page content, photos, packages, and site details.
        </p>

        {!configured ? (
          <div className="mt-6">
            <StatusBanner tone="error">
              Supabase is not configured. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to
              `.env.local`, then restart the dev server. See `docs/ADMIN_CMS_SETUP.md`.
            </StatusBanner>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            <AdminField label="Email">
              <AdminInput
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Password">
              <AdminInput
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </AdminField>
            {error ? <StatusBanner tone="error">{error}</StatusBanner> : null}
            <AdminButton type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </AdminButton>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-dark-text/55">
          <Link to="/" className="font-semibold text-tropical-green">
            Back to website
          </Link>
        </p>
      </form>
    </div>
  )
}
