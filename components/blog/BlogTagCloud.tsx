'use client'

import { BLOG_PATH, BlogLang, UI_LABELS } from '@/lib/blog/types'
import Link from 'next/link'

interface BlogTagCloudProps {
  lang: BlogLang
  tags: { tag: string; count: number }[]
  activeTag?: string | null
}

export function BlogTagCloud({ lang, tags, activeTag }: BlogTagCloudProps) {
  const labels = UI_LABELS[lang]
  const blogHref = `${BLOG_PATH[lang]}/`

  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 mr-1">
        {labels.filterByTag}:
      </span>
      {activeTag ? (
        <Link
          href={blogHref}
          className="text-xs px-2.5 py-1 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          {labels.clearFilters}
        </Link>
      ) : null}
      {tags.map(({ tag, count }) => {
        const isActive = activeTag === tag
        return (
          <Link
            key={tag}
            href={`${blogHref}?tag=${encodeURIComponent(tag)}`}
            className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
              isActive
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-800'
            }`}
          >
            #{tag}
            <span className={`ml-1 ${isActive ? 'text-primary-100' : 'text-gray-400'}`}>
              {count}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
