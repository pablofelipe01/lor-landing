import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Footer, Navigation } from '@/components'
import { BlogIndex } from '@/components/blog'
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
} from '@/lib/blog/posts'
import { buildIndexMetadata } from '@/lib/blog/seo'

export const metadata: Metadata = buildIndexMetadata('es')

export default function BlogIndexPage() {
  const posts = getAllPosts('es')
  const tags = getAllTags('es')
  const categories = getAllCategories('es')

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <Suspense
          fallback={
            <div className="container-custom px-4 md:px-8 py-16 text-gray-500">
              Cargando…
            </div>
          }
        >
          <BlogIndex
            lang="es"
            posts={posts}
            tags={tags}
            categories={categories}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
