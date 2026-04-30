import Link from 'next/link'
import { LINKEDIN_URL, AUTHOR_NAME } from '@/lib/blog/config'
import {
  BLOG_PATH,
  BlogPostMeta,
  CATEGORY_LABELS,
  UI_LABELS,
} from '@/lib/blog/types'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NewsletterCTA } from './NewsletterCTA'
import { ShareButtons } from './ShareButtons'

interface BlogPostFooterProps {
  post: BlogPostMeta
  translation: BlogPostMeta | null
  related: BlogPostMeta[]
  url: string
}

function formatDate(date: string, lang: 'es' | 'en'): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function BlogPostFooter({
  post,
  translation,
  related,
  url,
}: BlogPostFooterProps) {
  const labels = UI_LABELS[post.lang]
  const blogHref = `${BLOG_PATH[post.lang]}/`
  const homeHref = post.lang === 'es' ? '/' : '/#'

  return (
    <footer className="container-custom px-4 md:px-8 pb-16">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Share + language switcher */}
        <div className="flex flex-wrap items-center gap-4 justify-between pt-6 border-t border-gray-200">
          <ShareButtons url={url} title={post.title} lang={post.lang} />
          <LanguageSwitcher post={post} translation={translation} />
        </div>

        {/* About INL */}
        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold mb-3 text-gray-900">
            {labels.aboutInl}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            {labels.aboutBio}{' '}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-primary-300 underline-offset-2"
            >
              {AUTHOR_NAME}
            </a>
            .
          </p>
          <p className="text-gray-700 leading-relaxed">
            {labels.ctaSoft}{' '}
            <Link
              href={homeHref}
              className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-primary-300 underline-offset-2"
            >
              {labels.ctaSoftLink}
            </Link>{' '}
            {labels.ctaSoftOr}{' '}
            <Link
              href={post.lang === 'es' ? '/#empresas' : '/#empresas'}
              className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-primary-300 underline-offset-2"
            >
              {labels.ctaSoftDemo}
            </Link>
            .
          </p>
        </section>

        {/* Newsletter */}
        <NewsletterCTA lang={post.lang} />

        {/* Related */}
        {related.length > 0 ? (
          <section>
            <h2 className="font-heading text-xl font-bold mb-4 text-gray-900">
              {labels.relatedPosts}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`${blogHref}${r.slug}/`}
                  className="group block p-5 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50/40 transition-colors"
                >
                  <p className="text-xs uppercase tracking-wider font-semibold text-primary-700 mb-2">
                    {CATEGORY_LABELS[r.lang][r.category]}
                  </p>
                  <p className="font-semibold text-gray-900 group-hover:text-primary-800 mb-2 leading-snug">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(r.date, r.lang)} ·{' '}
                    {labels.readingTime(r.readingMinutes)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="pt-6 border-t border-gray-200">
          <Link
            href={blogHref}
            className="text-primary-700 hover:text-primary-800 font-medium"
          >
            {labels.backToBlog}
          </Link>
        </div>
      </div>
    </footer>
  )
}
