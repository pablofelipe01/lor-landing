import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import {
  BlogCategory,
  BlogFrontmatter,
  BlogLang,
  BlogPost,
  BlogPostMeta,
} from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')
const FILE_REGEX = /^(.+)\.(es|en)\.mdx$/

const REQUIRED_FIELDS: (keyof BlogFrontmatter)[] = [
  'title',
  'slug',
  'date',
  'lang',
  'excerpt',
  'tags',
  'category',
  'author',
]

const VALID_CATEGORIES: BlogCategory[] = [
  'deep-dive',
  'field-notes',
  'essay',
  'case-study',
]

let cache: BlogPost[] | null = null

function readAllPostsFromDisk(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => FILE_REGEX.test(f))
  const posts: BlogPost[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = matter(raw)
    const data = parsed.data as Partial<BlogFrontmatter>

    for (const field of REQUIRED_FIELDS) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(
          `[blog] Missing required frontmatter field "${field}" in ${file}`
        )
      }
    }

    if (data.lang !== 'es' && data.lang !== 'en') {
      throw new Error(`[blog] Invalid "lang" in ${file}: ${data.lang}`)
    }

    if (!VALID_CATEGORIES.includes(data.category as BlogCategory)) {
      throw new Error(
        `[blog] Invalid "category" in ${file}: ${data.category}. Allowed: ${VALID_CATEGORIES.join(', ')}`
      )
    }

    if (!Array.isArray(data.tags)) {
      throw new Error(`[blog] "tags" must be an array in ${file}`)
    }

    const fileMatch = file.match(FILE_REGEX)
    const fileLang = fileMatch ? fileMatch[2] : null
    if (fileLang && fileLang !== data.lang) {
      throw new Error(
        `[blog] Filename language (${fileLang}) does not match frontmatter lang (${data.lang}) in ${file}`
      )
    }

    const rt = readingTime(parsed.content)

    posts.push({
      title: data.title!,
      slug: data.slug!,
      date: data.date!,
      lang: data.lang as BlogLang,
      translationSlug: data.translationSlug,
      excerpt: data.excerpt!,
      tags: data.tags as string[],
      category: data.category as BlogCategory,
      author: data.author!,
      coverImage: data.coverImage,
      draft: data.draft ?? false,
      readingTime: rt.text,
      readingMinutes: Math.max(1, Math.round(rt.minutes)),
      fileName: file,
      source: parsed.content,
    })
  }

  return posts
}

function readAllPosts(): BlogPost[] {
  if (process.env.NODE_ENV === 'production' && cache) return cache
  const posts = readAllPostsFromDisk()
  if (process.env.NODE_ENV === 'production') cache = posts
  return posts
}

function isVisible(post: BlogPost): boolean {
  if (process.env.NODE_ENV === 'production' && post.draft) return false
  return true
}

function toMeta(post: BlogPost): BlogPostMeta {
  const { source: _source, ...meta } = post
  return meta
}

export function getAllPosts(lang: BlogLang): BlogPostMeta[] {
  return readAllPosts()
    .filter((p) => p.lang === lang && isVisible(p))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(toMeta)
}

export function getPostBySlug(lang: BlogLang, slug: string): BlogPost | null {
  const post = readAllPosts().find(
    (p) => p.lang === lang && p.slug === slug && isVisible(p)
  )
  return post ?? null
}

export function getAllSlugs(lang: BlogLang): string[] {
  return getAllPosts(lang).map((p) => p.slug)
}

export function getTranslation(post: BlogPostMeta): BlogPostMeta | null {
  if (!post.translationSlug) return null
  const otherLang: BlogLang = post.lang === 'es' ? 'en' : 'es'
  const found = readAllPosts().find(
    (p) =>
      p.lang === otherLang &&
      p.slug === post.translationSlug &&
      isVisible(p)
  )
  return found ? toMeta(found) : null
}

export function getRelatedPosts(
  post: BlogPostMeta,
  limit = 3
): BlogPostMeta[] {
  const candidates = getAllPosts(post.lang).filter(
    (p) => p.slug !== post.slug
  )
  return candidates
    .map((p) => ({
      post: p,
      score:
        p.tags.filter((t) => post.tags.includes(t)).length +
        (p.category === post.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((x) => x.post)
}

export function getAllTags(
  lang: BlogLang
): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts(lang)) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function getAllCategories(
  lang: BlogLang
): { category: BlogCategory; count: number }[] {
  const counts = new Map<BlogCategory, number>()
  for (const post of getAllPosts(lang)) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}
