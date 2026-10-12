import { useEffect, useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { X } from 'lucide-react'
import { uploadMedia } from '@/lib/content'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string
  children: ReactNode
  hint?: string
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-xs font-semibold tracking-wide text-ocean-navy/70 uppercase">
        {label}
      </span>
      {children}
      {hint ? <span className="text-xs text-dark-text/55">{hint}</span> : null}
    </label>
  )
}

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-11 rounded-xl border border-ocean-navy/15 bg-white px-3 text-sm outline-none focus:border-tropical-green ${props.className ?? ''}`}
    />
  )
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`rounded-xl border border-ocean-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-tropical-green ${props.className ?? ''}`}
    />
  )
}

export function AdminButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
}) {
  const styles =
    variant === 'primary'
      ? 'bg-tropical-green text-white hover:bg-tropical-green-dark'
      : variant === 'danger'
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-ocean-navy text-white hover:bg-[#0c2442]'

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = 'uploads',
}: {
  label: string
  value: string
  onChange: (url: string) => void
  folder?: string
}) {
  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const url = await uploadMedia(file, folder)
      onChange(url)
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <AdminField label={label} hint="Paste a URL or upload to Supabase Storage (bucket: media).">
      <div className="flex flex-col gap-2 sm:flex-row">
        <AdminInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/... or https://..."
          className="flex-1"
        />
        <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-muted-bg px-4 py-2 text-sm font-semibold text-ocean-navy">
          Upload
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
      </div>
      {value ? (
        <img
          src={value}
          alt=""
          className="mt-2 h-28 w-full max-w-xs rounded-xl object-cover"
        />
      ) : null}
    </AdminField>
  )
}

export function AdminCard({
  title,
  children,
  actions,
}: {
  title: string
  children: ReactNode
  actions?: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-ocean-navy/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-ocean-navy">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  )
}

export function StatusBanner({
  tone,
  children,
}: {
  tone: 'ok' | 'error' | 'info'
  children: ReactNode
}) {
  const styles =
    tone === 'ok'
      ? 'bg-tropical-green/10 text-tropical-green-dark'
      : tone === 'error'
        ? 'bg-red-50 text-red-700'
        : 'bg-muted-bg text-ocean-navy'

  return <div className={`rounded-xl px-4 py-3 text-sm ${styles}`}>{children}</div>
}

export function AdminModal({
  open,
  title,
  children,
  onClose,
  footer,
}: {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}) {
  const titleId = useId()
  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ocean-navy/55 backdrop-blur-[1px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-warm-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-ocean-navy/10 px-5 py-4 sm:px-6">
          <div>
            <h2 id={titleId} className="font-display text-xl font-bold text-ocean-navy">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted-bg text-ocean-navy"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer ? (
          <div className="flex shrink-0 flex-col gap-2 border-t border-ocean-navy/10 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
