import type { Metadata } from 'next'
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from './config'
import { getPostBySlug, getTranslation } from './posts'
import { BLOG_PATH, BlogLang, BlogPostMeta } from './types'

function ogImageUrl(post: BlogPostMeta): string {
  if (post.coverImage) {
    if (/^https?:\/\//.test(post.coverImage)) return post.coverImage
    return `${SITE_URL}${post.coverImage.startsWith('/') ? '' : '/'}${post.coverImage}`
  }
  const params = new URLSearchParams({
    title: post.title,
    category: post.category,
    lang: post.lang,
  })
  return `${SITE_URL}/og/?${params.toString()}`
}

function postUrl(post: BlogPostMeta): string {
  return `${SITE_URL}${BLOG_PATH[post.lang]}/${post.slug}/`
}

export function buildPostMetadata(
  lang: BlogLang,
  slug: string
): Metadata {
  const post = getPostBySlug(lang, slug)
  if (!post) return {}

  const translation = getTranslation(post)
  const url = postUrl(post)
  const og = ogImageUrl(post)

  const languages: Record<string, string> = {
    [post.lang]: url,
    'x-default': url,
  }
  if (translation) {
    languages[translation.lang] = postUrl(translation)
  }

  return {
    title: `${post.title} — ${SITE_NAME}`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: SITE_NAME,
      locale: post.lang === 'es' ? 'es_LA' : 'en_US',
      images: [
        {
          url: og,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [og],
    },
    alternates: {
      canonical: url,
      languages,
    },
    other: {
      'content-language': post.lang,
    },
  }
}

export function buildIndexMetadata(lang: BlogLang): Metadata {
  const url = `${SITE_URL}${BLOG_PATH[lang]}/`
  const otherLang: BlogLang = lang === 'es' ? 'en' : 'es'
  const otherUrl = `${SITE_URL}${BLOG_PATH[otherLang]}/`

  const title =
    lang === 'es'
      ? `Blog — ${SITE_NAME}`
      : `Blog — ${SITE_NAME}`
  const description =
    lang === 'es'
      ? 'Notas técnicas sobre IA, blockchain, infraestructura descentralizada y conectividad rural por Pablo F. Acebedo.'
      : 'Technical notes on AI, blockchain, decentralized infrastructure and rural connectivity by Pablo F. Acebedo.'

  return {
    title,
    description,
    authors: [{ name: AUTHOR_NAME }],
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: SITE_NAME,
      locale: lang === 'es' ? 'es_LA' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        [lang]: url,
        [otherLang]: otherUrl,
        'x-default': url,
      },
    },
    other: {
      'content-language': lang,
    },
  }
}

export function buildJsonLdArticle(post: BlogPostMeta): string {
  const url = postUrl(post)
  const og = ogImageUrl(post)
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.excerpt,
    image: [og],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://www.linkedin.com/in/pablo-f-acebedo/',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/encabezado.png`,
      },
    },
    keywords: post.tags.join(', '),
    inLanguage: post.lang,
  }
  return JSON.stringify(data)
}

export function getPostUrl(post: BlogPostMeta): string {
  return postUrl(post)
}
