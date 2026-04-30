import Link from 'next/link'
import { BLOG_PATH, BlogLang, BlogPostMeta, UI_LABELS } from '@/lib/blog/types'

interface LanguageSwitcherProps {
  post: BlogPostMeta
  translation: BlogPostMeta | null
}

export function LanguageSwitcher({ post, translation }: LanguageSwitcherProps) {
  const otherLang: BlogLang = post.lang === 'es' ? 'en' : 'es'
  const labels = UI_LABELS[post.lang]

  if (translation) {
    const href = `${BLOG_PATH[otherLang]}/${translation.slug}/`
    return (
      <Link
        href={href}
        hrefLang={otherLang}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
        aria-label={labels.languageOtherFull}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        {labels.languageOther}
      </Link>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-dashed border-gray-300 text-gray-400 cursor-not-allowed"
      title={labels.translationNotAvailable}
      aria-label={labels.translationNotAvailable}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
      {labels.languageOther}
    </span>
  )
}
