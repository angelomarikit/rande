import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks, siteConfig } from '@/data/site'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { Button } from './ui/Button'

interface HeaderProps {
  onPlanTrip: () => void
}

export function Header({ onPlanTrip }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  useBodyScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  const linkClass = solid
    ? 'text-ocean-navy/80 hover:text-tropical-green'
    : 'text-white/90 hover:text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-ocean-navy/8 bg-warm-white/95 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <div className="section-pad mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 lg:h-[4.75rem]">
        <a href="#home" className="relative z-10 shrink-0 rounded-md">
          <img
            src="/images/logo-rande.png"
            alt={`${siteConfig.companyName} logo`}
            className="h-12 w-auto max-w-[9.5rem] object-contain object-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:h-14 sm:max-w-[11rem]"
            width={176}
            height={56}
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative px-3 py-2 text-sm font-medium transition-colors ${linkClass}`}
            >
              {link.label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 ${
                  solid ? 'bg-tropical-green' : 'bg-sunshine-gold'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            variant={solid ? 'primary' : 'light'}
            size="md"
            onClick={onPlanTrip}
          >
            Plan My Trip
          </Button>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl lg:hidden ${
            solid ? 'bg-muted-bg text-ocean-navy' : 'bg-white/15 text-white backdrop-blur'
          }`}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 top-[4.25rem] z-40 bg-warm-white lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-pad flex h-full flex-col gap-2 py-6">
              <button ref={closeRef} type="button" className="sr-only">
                Menu open
              </button>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3.5 text-lg font-semibold text-ocean-navy transition hover:bg-muted-bg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 border-t border-ocean-navy/10 pt-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setOpen(false)
                    onPlanTrip()
                  }}
                >
                  Plan My Trip
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
