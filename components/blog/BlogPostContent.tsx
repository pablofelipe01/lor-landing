import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/lib/blog/mdx-components'
import {
  mdxRehypePlugins,
  mdxRemarkPlugins,
} from '@/lib/blog/mdx-pipeline'

interface BlogPostContentProps {
  source: string
}

export function BlogPostContent({ source }: BlogPostContentProps) {
  return (
    <div className="container-custom px-4 md:px-8 py-12 md:py-16">
      <article className="max-w-3xl mx-auto prose prose-lg">
        <MDXRemote
          source={source}
          components={mdxComponents}
          options={{
            mdxOptions: {
              // Plugin generics from unified are notoriously narrow; the
              // pipeline module already constrains shape, so we widen here.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              remarkPlugins: mdxRemarkPlugins as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rehypePlugins: mdxRehypePlugins as any,
            },
          }}
        />
      </article>
    </div>
  )
}
