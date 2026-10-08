interface SectionHeadingProps {
  eyebrow?: string
  title: string
  support?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  support,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold tracking-[0.18em] uppercase ${
            light ? 'text-sunshine-gold' : 'text-tropical-green'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-balance font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] ${
          light ? 'text-warm-white' : 'text-ocean-navy'
        }`}
      >
        {title}
      </h2>
      {support ? (
        <p
          className={`mt-3 text-pretty text-base leading-relaxed sm:text-lg ${
            light ? 'text-white/80' : 'text-dark-text/70'
          }`}
        >
          {support}
        </p>
      ) : null}
    </div>
  )
}
