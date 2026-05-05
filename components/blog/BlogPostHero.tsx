import Image from 'next/image'
import Link from 'next/link'
import {
  BLOG_PATH,
  BlogPostMeta,
  CATEGORY_LABELS,
  UI_LABELS,
} from '@/lib/blog/types'

interface BlogPostHeroProps {
  post: BlogPostMeta
}

function formatDate(date: string, lang: 'es' | 'en'): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  const labels = UI_LABELS[post.lang]
  const categoryLabel = CATEGORY_LABELS[post.lang][post.category]
  const blogHref = `${BLOG_PATH[post.lang]}/`

  return (
    <header className="pt-28 md:pt-32 pb-10 md:pb-14 border-b border-gray-200 bg-gradient-to-b from-primary-50/40 to-white">
      <div className="container-custom px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link
              href={blogHref}
              className="text-sm text-primary-700 hover:text-primary-800 font-medium"
            >
              {labels.backToBlog}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5 text-xs">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-600 text-white font-semibold uppercase tracking-wider">
              {categoryLabel}
            </span>
            <time
              dateTime={post.date}
              className="text-gray-600 font-medium"
            >
              {formatDate(post.date, post.lang)}
            </time>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">
              {labels.readingTime(post.readingMinutes)}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5 text-balance">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-balance">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`${blogHref}?tag=${encodeURIComponent(tag)}`}
                className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-800 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {post.coverImage && (
            <div className="mt-10 relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
