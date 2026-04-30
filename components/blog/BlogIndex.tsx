'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import {
  BLOG_PATH,
  BlogCategory,
  BlogLang,
  BlogPostMeta,
  CATEGORY_LABELS,
  UI_LABELS,
} from '@/lib/blog/types'
import { BlogTagCloud } from './BlogTagCloud'

interface BlogIndexProps {
  lang: BlogLang
  posts: BlogPostMeta[]
  tags: { tag: string; count: number }[]
  categories: { category: BlogCategory; count: number }[]
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

export function BlogIndex({ lang, posts, tags, categories }: BlogIndexProps) {
  const labels = UI_LABELS[lang]
  const params = useSearchParams()
  const activeTag = params.get('tag')
  const activeCategory = params.get('category') as BlogCategory | null

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false
      if (activeCategory && p.category !== activeCategory) return false
      return true
    })
  }, [posts, activeTag, activeCategory])

  const blogHref = `${BLOG_PATH[lang]}/`

  return (
    <div className="container-custom px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 md:mb-14">
          <p className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
            {labels.blog} · Inverse Neural Lab
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 text-balance">
            {lang === 'es'
              ? 'Notas técnicas desde el laboratorio'
              : 'Technical notes from the lab'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {lang === 'es'
              ? 'IA, blockchain, ciberseguridad e infraestructura descentralizada — escrito por alguien que las construye, no por alguien que las explica.'
              : 'AI, blockchain, cybersecurity and decentralized infrastructure — written by someone building them, not just explaining them.'}
          </p>
        </header>

        {categories.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 mr-1">
              {labels.filterByCategory}:
            </span>
            <Link
              href={blogHref}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                !activeCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {labels.allPosts}
            </Link>
            {categories.map(({ category, count }) => {
              const isActive = activeCategory === category
              return (
                <Link
                  key={category}
                  href={`${blogHref}?category=${encodeURIComponent(category)}`}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {CATEGORY_LABELS[lang][category]} ({count})
                </Link>
              )
            })}
          </div>
        ) : null}

        <div className="mb-10">
          <BlogTagCloud lang={lang} tags={tags} activeTag={activeTag} />
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-500 border border-dashed border-gray-300 rounded-xl">
            {posts.length === 0 ? labels.noPostsFound : labels.noResults}
          </div>
        ) : (
          <ul className="space-y-8">
            {filtered.map((post, i) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link
                  href={`${blogHref}${post.slug}/`}
                  className="group block p-6 md:p-8 rounded-2xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-100 text-primary-800 font-semibold uppercase tracking-wider">
                      {CATEGORY_LABELS[post.lang][post.category]}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-gray-500 font-medium"
                    >
                      {formatDate(post.date, post.lang)}
                    </time>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500">
                      {labels.readingTime(post.readingMinutes)}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary-800 leading-snug mb-2 text-balance">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
