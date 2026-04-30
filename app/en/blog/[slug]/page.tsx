import type { Metadata } from 'next'
import { Footer, Navigation } from '@/components'
import { getAllSlugs } from '@/lib/blog/posts'
import { renderPostPage } from '@/lib/blog/render'
import { buildPostMetadata } from '@/lib/blog/seo'

interface PageParams {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs('en').map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageParams): Metadata {
  return buildPostMetadata('en', params.slug)
}

export default function BlogPostPageEn({ params }: PageParams) {
  return (
    <>
      <Navigation />
      {renderPostPage({ lang: 'en', slug: params.slug })}
      <Footer />
    </>
  )
}
