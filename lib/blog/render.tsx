import { notFound } from 'next/navigation'
import {
  BlogPostContent,
  BlogPostFooter,
  BlogPostHero,
} from '@/components/blog'
import { getPostBySlug, getRelatedPosts, getTranslation } from './posts'
import { buildJsonLdArticle, getPostUrl } from './seo'
import { BlogLang } from './types'

interface RenderPostPageProps {
  lang: BlogLang
  slug: string
}

export function renderPostPage({ lang, slug }: RenderPostPageProps) {
  const post = getPostBySlug(lang, slug)
  if (!post) notFound()

  const translation = getTranslation(post)
  const related = getRelatedPosts(post, 3)
  const url = getPostUrl(post)
  const jsonLd = buildJsonLdArticle(post)

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is sanitized JSON; safe to inject as a string.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
        integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
        crossOrigin="anonymous"
      />
      <main>
        <BlogPostHero post={post} />
        <article lang={post.lang}>
          <BlogPostContent source={post.source} />
          <BlogPostFooter
            post={post}
            translation={translation}
            related={related}
            url={url}
          />
        </article>
      </main>
    </>
  )
}
