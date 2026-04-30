import type { Metadata } from 'next'
import { Footer, Navigation } from '@/components'
import { getAllSlugs } from '@/lib/blog/posts'
import { renderPostPage } from '@/lib/blog/render'
import { buildPostMetadata } from '@/lib/blog/seo'

interface PageParams {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs('es').map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageParams): Metadata {
  return buildPostMetadata('es', params.slug)
}

export default function BlogPostPage({ params }: PageParams) {
  return (
    <>
      <Navigation />
      {renderPostPage({ lang: 'es', slug: params.slug })}
      <Footer />
    </>
  )
}
