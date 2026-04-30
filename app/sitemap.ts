import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/blog/config'
import { getAllPosts } from '@/lib/blog/posts'
import { BLOG_PATH, BlogLang, BlogPostMeta } from '@/lib/blog/types'

function postSitemapUrl(post: BlogPostMeta): string {
  return `${SITE_URL}${BLOG_PATH[post.lang]}/${post.slug}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const home = `${SITE_URL}/`
  const blogEs = `${SITE_URL}/blog/`
  const blogEn = `${SITE_URL}/en/blog/`

  const entries: MetadataRoute.Sitemap = [
    {
      // The landing page handles ES/EN through a client-side language toggle,
      // so a single canonical URL covers both languages.
      url: home,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: blogEs,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: blogEs,
          en: blogEn,
          'x-default': blogEs,
        },
      },
    },
    {
      url: blogEn,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: blogEs,
          en: blogEn,
          'x-default': blogEs,
        },
      },
    },
  ]

  const langs: BlogLang[] = ['es', 'en']
  const allByLang = new Map<BlogLang, BlogPostMeta[]>()
  for (const lang of langs) {
    allByLang.set(lang, getAllPosts(lang))
  }

  for (const lang of langs) {
    const posts = allByLang.get(lang) ?? []
    for (const post of posts) {
      const languages: Record<string, string> = {
        [lang]: postSitemapUrl(post),
        'x-default': postSitemapUrl(post),
      }
      if (post.translationSlug) {
        const otherLang: BlogLang = lang === 'es' ? 'en' : 'es'
        const otherPosts = allByLang.get(otherLang) ?? []
        const translation = otherPosts.find((p) => p.slug === post.translationSlug)
        if (translation) {
          languages[otherLang] = postSitemapUrl(translation)
        }
      }
      entries.push({
        url: postSitemapUrl(post),
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      })
    }
  }

  return entries
}
