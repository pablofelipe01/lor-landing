import { Feed } from 'feed'
import { AUTHOR_NAME, LINKEDIN_URL, SITE_DESCRIPTION, SITE_URL, SITE_NAME } from './config'
import { getAllPosts } from './posts'
import { BlogLang, BLOG_PATH, CATEGORY_LABELS } from './types'

export function generateRssFeed(lang: BlogLang): string {
  const basePath = BLOG_PATH[lang]
  const url = `${SITE_URL}${basePath}/`
  const title =
    lang === 'es'
      ? `${SITE_NAME} — Blog`
      : `${SITE_NAME} — Blog`

  const feed = new Feed({
    title,
    description: SITE_DESCRIPTION[lang],
    id: url,
    link: url,
    language: lang,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${SITE_NAME}`,
    feedLinks: {
      rss2: `${SITE_URL}${basePath}/feed.xml`,
    },
    author: {
      name: AUTHOR_NAME,
      link: LINKEDIN_URL,
    },
  })

  for (const post of getAllPosts(lang)) {
    const postUrl = `${SITE_URL}${basePath}/${post.slug}/`
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      date: new Date(post.date),
      category: [
        ...post.tags.map((t) => ({ name: t })),
        { name: CATEGORY_LABELS[lang][post.category] },
      ],
      author: [
        {
          name: post.author,
          link: LINKEDIN_URL,
        },
      ],
    })
  }

  return feed.rss2()
}
