import { MEDIUM_URL } from '@/lib/blog/config'
import { BlogLang, UI_LABELS } from '@/lib/blog/types'

interface NewsletterCTAProps {
  lang: BlogLang
  variant?: 'default' | 'compact'
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

export function NewsletterCTA({ lang, variant = 'default' }: NewsletterCTAProps) {
  const labels = UI_LABELS[lang]

  if (variant === 'compact') {
    return (
      <div className="rounded-xl border border-primary-200 bg-primary-50 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <p className="font-semibold text-primary-900">{labels.newsletterTitle}</p>
          <p className="text-sm text-primary-800/80">{labels.newsletterDesc}</p>
        </div>
        <a
          href={MEDIUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap"
        >
          <MediumIcon className="w-4 h-4" />
          {labels.newsletterCta}
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 p-8 md:p-10 text-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <MediumIcon className="w-5 h-5" />
        </div>
        <h3 className="font-heading text-2xl font-bold">
          {labels.newsletterTitle}
        </h3>
      </div>
      <p className="text-white/90 mb-6 max-w-lg leading-relaxed">
        {labels.newsletterDesc}
      </p>
      <a
        href={MEDIUM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary-700 font-semibold hover:bg-gray-100 transition-colors"
      >
        <MediumIcon className="w-4 h-4" />
        {labels.newsletterCta}
      </a>
    </div>
  )
}
